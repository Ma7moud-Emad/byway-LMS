import GeneralLayout from "@/components/layouts/GeneralLayout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GeneralLayout isFooter={false}>{children}</GeneralLayout>;
}
