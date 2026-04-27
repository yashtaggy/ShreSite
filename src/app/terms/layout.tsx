import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description: 'Terms and Conditions for doing business with Shreyash Solutions, a precision engineering MSME in Pune.',
    alternates: {
        canonical: '/terms',
    },
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
