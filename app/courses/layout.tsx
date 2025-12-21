import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
