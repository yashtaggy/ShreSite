import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Get a Quote for Engineering Solutions',
    description: 'Get in touch with Shreyash Solutions for project inquiries, technical leads, and custom sensor requirements. Start your engineering project with us today.',
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
