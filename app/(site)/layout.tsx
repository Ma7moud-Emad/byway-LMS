import GeneralLayout from "@/components/layouts/GeneralLayout";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GeneralLayout>{children}</GeneralLayout>;
}
