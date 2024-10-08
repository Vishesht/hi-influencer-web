"use client";
import { usePathname, useRouter } from "next/navigation";

export default function MainLayout() {
  const path = usePathname();
  const router = useRouter();

  if (path === "/") {
    router.push("/home");
  }
}
