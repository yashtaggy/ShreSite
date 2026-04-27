import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Industries Served | Aerospace, Defense & Automation',
    description: 'Shreyash Solutions provides mission-critical sensing technology for Aerospace, Defense, Medical Tech, Industrial Automation, and Renewable Energy sectors in India.',
    alternates: {
        canonical: '/industries',
    },
};

export default function IndustriesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
