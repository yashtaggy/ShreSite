import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Precision Sensors & Datasheets | Industrial Potentiometers',
    description: 'Explore our technical datasheets for indigenous potentiometric sensors, MIL-spec hardware, and custom-engineered sensing solutions for extreme accuracy.',
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
