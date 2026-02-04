import GeneralLayout from "@/components/layouts/GeneralLayout";

export default function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GeneralLayout>{children}</GeneralLayout>;
}
