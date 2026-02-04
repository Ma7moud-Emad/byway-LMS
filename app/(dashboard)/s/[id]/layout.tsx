import Wrapper from "@/components/dashboard/wrapper/Wrapper";
import { ReactNode } from "react";

export default function layout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: ReactNode;
}) {
  return <Wrapper params={params}>{children}</Wrapper>;
}
