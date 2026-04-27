import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Engineering Indigenous Reliability',
    description: 'Learn about Shreyash Solutions\' journey since 2017. We are a Pune-based MSME dedicated to Atmanirbhar Bharat, specializing in indigenous engineering of high-precision sensors for mission-critical environments.',
    alternates: {
        canonical: '/about',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
