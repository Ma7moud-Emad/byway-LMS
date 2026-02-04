import Footer from "./Footer";
import Header from "./Header";

export default function GeneralLayout({
  children,
  isHeader = true,
  isFooter = true,
}: Readonly<{
  children: React.ReactNode;
  isHeader?: boolean;
  isFooter?: boolean;
}>) {
  return (
    <>
      {isHeader && <Header />}
      <main>{children}</main>
      {isFooter && <Footer />}
    </>
  );
}
