import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for Shreyash Solutions. We value your privacy and are committed to protecting your personal data.',
    alternates: {
        canonical: '/privacy',
    },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
