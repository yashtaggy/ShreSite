export interface ProductSpec {
    [key: string]: string;
}

export interface Product {
    id?: string;
    model: string;
    name: string;
    description?: string;
    customMessage?: string;
    image: string; // URL to primary image in storage
    gallery: string[]; // URLs of other images in storage
    specs: ProductSpec;
    createdAt?: any;
}

// Default Specs for a new product, to maintain decorum
export const DEFAULT_SPECS = {
    technology: '',
    diameter: '',
    turns: '',
    resistance: '',
    electricalAngle: '',
    mechanicalAngle: '',
    tolerance: '',
    linearity: '',
    ipRating: '',
    rotationalLife: ''
};
