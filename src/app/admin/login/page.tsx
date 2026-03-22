'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { DustyParticles } from "@/components/ui/dusty-particles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/hooks/use-auth';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (!authLoading && user) {
            router.push('/admin/dashboard');
        }
    }, [user, authLoading, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/admin/dashboard');
        } catch (err: any) {
            setError('Invalid credentials. Access denied for non-military personnel.');
            setLoading(false);
        }
    };

    if (authLoading) return null;

    return (
        <main className="relative min-h-screen flex flex-col items-center pt-40 pb-12 bg-slate-50/30 overflow-hidden">
            {/* ATMOSPHERIC BACKGROUND */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <DustyParticles />
            </div>

            <div
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md p-8 bg-white border border-slate-200 shadow-2xl rounded-sm"
            >
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 mb-6 rounded-sm">
                        <Lock className="text-accent" size={32} />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                        Admin <span className="text-accent italic">Dashboard</span>
                    </h1>
                    <p className="text-slate-400 font-mono text-[10px] mt-2 tracking-widest uppercase">
                        Please sign in to your account
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <Input
                                type="email"
                                placeholder="admin@shreyash.in"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="pl-10 h-12 bg-slate-50/50 border-slate-200 rounded-sm focus:ring-accent focus:border-accent"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="pl-10 h-12 bg-slate-50/50 border-slate-200 rounded-sm focus:ring-accent focus:border-accent"
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-3 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold uppercase tracking-tight"
                        >
                            {error}
                        </motion.div>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-slate-900 hover:bg-accent text-white font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 rounded-sm group"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <>
                                Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center items-center text-[8px] font-mono text-slate-400 uppercase tracking-widest">
                    <span>Shreyash Solutions - Admin Access</span>
                </div>
            </motion.div>
        </main>
    );
}
