'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Trash2, Edit3, LogOut, Package, Image as ImageIcon,
    Settings, Save, X, PlusCircle, CheckCircle2, Loader2, AlertTriangle, ArrowLeft
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import { Product, ProductSpec, DEFAULT_SPECS } from '@/lib/types';
import { DustyParticles } from "@/components/ui/dusty-particles";

export default function AdminDashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'inventory' | 'add'>('inventory');

    // Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        model: '',
        description: '',
        customMessage: '',
        specs: { ...DEFAULT_SPECS }
    });
    const [primaryImage, setPrimaryImage] = useState<File | null>(null);
    const [galleryImages, setGalleryImages] = useState<File[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/admin/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const prods = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Product[];
            setProducts(prods);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const handleLogout = () => {
        auth.signOut();
        router.push('/admin/login');
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            model: product.model,
            description: product.description || '',
            customMessage: product.customMessage || '',
            specs: { ...DEFAULT_SPECS, ...product.specs }
        });
        setPrimaryImage(null);
        setGalleryImages([]);
        setActiveTab('add');
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setFormData({ name: '', model: '', description: '', customMessage: '', specs: { ...DEFAULT_SPECS } });
        setPrimaryImage(null);
        setGalleryImages([]);
        setActiveTab('inventory');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'primary' | 'gallery') => {
        if (e.target.files) {
            if (type === 'primary') {
                setPrimaryImage(e.target.files[0]);
            } else {
                setGalleryImages(Array.from(e.target.files));
            }
        }
    };

    const uploadImage = async (file: File, path: string) => {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct && !primaryImage) {
            setFormError('Primary image is required.');
            return;
        }

        setFormLoading(true);
        setFormError('');

        try {
            // 1. Upload Primary Image if changed
            let primaryUrl = editingProduct?.image || '';
            if (primaryImage) {
                primaryUrl = await uploadImage(primaryImage, `products/${formData.model}/primary_${Date.now()}`);
            }

            // 2. Upload Gallery Images if changed
            let galleryUrls = editingProduct?.gallery || [];
            if (galleryImages.length > 0) {
                const newGalleryUrls = await Promise.all(
                    galleryImages.map((file, i) => uploadImage(file, `products/${formData.model}/gallery_${i}_${Date.now()}`))
                );
                // If editing, we replace the gallery with the new selection + the primary image
                galleryUrls = [primaryUrl, ...newGalleryUrls];
            } else if (primaryImage && editingProduct) {
                // If only primary image changed during edit, update the first item in gallery
                galleryUrls = [primaryUrl, ...galleryUrls.slice(1)];
            } else if (!editingProduct) {
                // For new products, gallery is just primary if no others
                galleryUrls = [primaryUrl];
            }

            // 3. Save to Firestore
            const productData = {
                ...formData,
                image: primaryUrl,
                gallery: galleryUrls,
            };

            if (editingProduct) {
                await updateDoc(doc(db, 'products', editingProduct.id!), {
                    ...productData,
                    updatedAt: serverTimestamp()
                });
            } else {
                await addDoc(collection(db, 'products'), {
                    ...productData,
                    createdAt: serverTimestamp()
                });
            }

            // Reset
            handleCancel();
        } catch (err: any) {
            console.error(err);
            setFormError('Failed to save product details.');
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async (product: Product) => {
        if (!window.confirm(`Are you sure you want to delete product ${product.model}?`)) return;

        try {
            // Logic for deleting images if needed, but for now just delete the doc
            await deleteDoc(doc(db, 'products', product.id!));
        } catch (err) {
            alert('Failed to delete product.');
        }
    };

    const handleSpecChange = (key: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            specs: {
                ...prev.specs,
                [key]: value
            }
        }));
    };

    if (authLoading || !user) return null;

    return (
        <main className="min-h-screen bg-slate-50/10 flex flex-col pt-40 pb-12 overflow-x-hidden">
            {/* ATMOSPHERIC BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
                <DustyParticles />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
                            Admin <span className="text-accent italic">Dashboard</span>
                        </h1>
                        <p className="text-slate-500 font-mono text-[10px] tracking-widest uppercase flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Logged in as: {user.email}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            onClick={() => activeTab === 'add' ? handleCancel() : setActiveTab('add')}
                            className={`h-12 px-6 rounded-sm uppercase text-[10px] font-black tracking-widest gap-2 transition-all ${activeTab === 'add' ? 'bg-slate-200 text-slate-600 hover:bg-slate-300' : 'bg-accent text-white hover:bg-slate-900'}`}
                        >
                            {activeTab === 'add' ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Product</>}
                        </Button>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="h-12 px-6 border-slate-200 rounded-sm uppercase text-[10px] font-black tracking-widest gap-2 text-slate-400 hover:text-red-600 hover:border-red-100 transition-all"
                        >
                            <LogOut size={16} /> Logout
                        </Button>
                    </div>
                </div>

                {/* TABS CONTENT */}
                <AnimatePresence mode="wait">
                    {activeTab === 'inventory' ? (
                        <motion.div
                            key="inventory"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            {isLoading ? (
                                <div className="h-64 flex items-center justify-center">
                                    <Loader2 className="animate-spin text-accent" size={32} />
                                </div>
                            ) : products.length === 0 ? (
                                <div className="bg-white border border-dashed border-slate-200 p-20 text-center rounded-sm">
                                    <Package className="mx-auto text-slate-200 mb-4" size={48} />
                                    <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">No products found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <div key={product.id} className="bg-white border border-slate-200 group relative">
                                            {/* ACCENTS */}
                                            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                                                <div className="absolute top-0 right-0 w-12 h-12 bg-slate-50 rotate-45 translate-x-6 -translate-y-6 border-b border-l border-slate-200" />
                                            </div>

                                            <div className="aspect-square relative flex items-center justify-center p-8 bg-slate-50 border-b border-slate-100">
                                                <Image src={product.image} alt={product.name} fill className="object-contain p-8" />
                                                <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                    <span className="text-[8px] font-mono font-bold bg-slate-900 text-white px-2 py-0.5 tracking-tighter">PN: {product.model}</span>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <div className="mb-6">
                                                    <h3 className="text-lg font-bold text-slate-900 mb-1">{product.name}</h3>
                                                    <p className="text-slate-400 text-xs font-mono tracking-wider">{product.model}</p>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => handleEdit(product)}
                                                        className="flex-1 bg-slate-900 text-white hover:bg-accent transition-all rounded-sm uppercase text-[9px] font-black tracking-widest h-10 gap-2 border-none"
                                                    >
                                                        <Edit3 size={14} /> Edit
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDelete(product)}
                                                        className="flex-1 bg-white border border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all rounded-sm uppercase text-[9px] font-black tracking-widest h-10 gap-2"
                                                    >
                                                        <Trash2 size={14} /> Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="add"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-4xl mx-auto"
                        >
                            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 md:p-12 shadow-xl relative">
                                {/* TECHNICAL HEADER */}
                                <div className="mb-10 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-sm">
                                        {editingProduct ? <Edit3 className="text-accent" size={24} /> : <PlusCircle className="text-accent" size={24} />}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                                        </h2>
                                        <p className="text-slate-400 font-mono text-[9px] uppercase mt-1 tracking-widest">
                                            {editingProduct ? `Updating ${editingProduct.model}` : 'Enter product details below'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 mb-10">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Product Name</label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g., Precision Wire-wound Potentiometer"
                                                required
                                                className="bg-slate-50/50 border-slate-100 focus:border-accent rounded-sm h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Model Number (PN)</label>
                                            <Input
                                                value={formData.model}
                                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                                placeholder="e.g., SY-901001"
                                                required
                                                className="bg-slate-50/50 border-slate-100 focus:border-accent rounded-sm h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Description</label>
                                            <Textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="High-precision sensor for mission critical..."
                                                className="bg-slate-50/50 border-slate-100 focus:border-accent rounded-sm min-h-[100px]"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Custom Note</label>
                                            <Input
                                                value={formData.customMessage}
                                                onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                                                placeholder="Custom modifications available for shaft length..."
                                                className="bg-slate-50/50 border-slate-100 focus:border-accent rounded-sm h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Primary Product Image</label>
                                            <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-100 rounded-sm flex flex-col items-center justify-center p-4 text-center group hover:border-accent transition-colors relative overflow-hidden">
                                                {primaryImage || (editingProduct && editingProduct.image) ? (
                                                    <>
                                                        <Image
                                                            src={primaryImage ? URL.createObjectURL(primaryImage) : editingProduct!.image}
                                                            alt="Preview"
                                                            fill
                                                            className="object-contain"
                                                        />
                                                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                            <p className="text-[8px] font-black text-white uppercase tracking-widest">Click to change</p>
                                                        </div>
                                                        <input type="file" onChange={(e) => handleFileChange(e, 'primary')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                                        {primaryImage && (
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setPrimaryImage(null);
                                                                }}
                                                                className="absolute top-2 right-2 bg-slate-900 text-white p-1 rounded-full z-10"
                                                            >
                                                                <X size={12} />
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        <ImageIcon className="text-slate-200 mb-2 group-hover:text-accent transition-colors" size={32} />
                                                        <p className="text-[9px] font-mono text-slate-400 uppercase">Upload Image (PNG/JPG)</p>
                                                        <input type="file" onChange={(e) => handleFileChange(e, 'primary')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Product Gallery</label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {galleryImages.length > 0 ? (
                                                    galleryImages.map((file, i) => (
                                                        <div key={i} className="aspect-square bg-slate-50 border border-slate-100 rounded-sm relative">
                                                            <Image src={URL.createObjectURL(file)} alt="Preview" fill className="object-contain" />
                                                        </div>
                                                    ))
                                                ) : editingProduct && editingProduct.gallery ? (
                                                    editingProduct.gallery.slice(1).map((url, i) => (
                                                        <div key={i} className="aspect-square bg-slate-50 border border-slate-100 rounded-sm relative">
                                                            <Image src={url} alt="Gallery" fill className="object-contain" />
                                                        </div>
                                                    ))
                                                ) : null}
                                                <div className="aspect-square bg-slate-50 border border-dashed border-slate-200 rounded-sm flex items-center justify-center text-slate-400 hover:border-accent hover:text-accent transition-all relative">
                                                    <Plus size={20} />
                                                    <input type="file" multiple onChange={(e) => handleFileChange(e, 'gallery')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-10 mb-10">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                                        <Settings size={14} /> Product Specifications
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {Object.keys(DEFAULT_SPECS).map((spec) => (
                                            <div key={spec} className="space-y-1">
                                                <label className="text-[9px] font-bold uppercase text-slate-400">{spec.replace(/([A-Z])/g, ' $1')}</label>
                                                <Input
                                                    value={formData.specs?.[spec] || ''}
                                                    onChange={(e) => handleSpecChange(spec, e.target.value)}
                                                    className="h-10 bg-slate-50/30 border-slate-100 text-xs"
                                                    placeholder="--"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {formError && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
                                        <AlertTriangle size={16} /> {formError}
                                    </div>
                                )}

                                <div className="flex justify-end gap-4">
                                    <Button
                                        disabled={formLoading}
                                        type="submit"
                                        className="h-14 px-10 bg-slate-900 hover:bg-accent text-white font-black uppercase tracking-[0.2em] text-[10px] gap-3 rounded-sm min-w-[240px] transition-all"
                                    >
                                        {formLoading ? (
                                            <Loader2 className="animate-spin" size={18} />
                                        ) : (
                                            <>
                                                <Save size={18} />
                                                {editingProduct ? 'Update Product' : 'Save Product'}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* FOOTER */}
            <footer className="mt-auto pt-20 text-center px-6">
                <div className="inline-flex items-center gap-10 border-t border-slate-100 pt-10 pb-10">
                    <span className="text-[8px] font-mono text-slate-300 uppercase tracking-[0.5em]">Shreyash Solutions - Admin Dashboard</span>
                </div>
            </footer>
        </main>
    );
}
