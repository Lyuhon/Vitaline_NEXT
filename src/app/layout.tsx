// Этот layout нужен только для редиректа на дефолтную локаль
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}