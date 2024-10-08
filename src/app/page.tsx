"use client";
import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";

export default function MainLayout() {
  const path = usePathname();
  const router = useRouter();
  const loginData = useAppSelector((state) => state.login);
  const isAdmin = loginData?.isAdmin;
  const data = loginData?.userData;

  if (data) {
    if (path === "/" || path === "/login" || path === "/signup") {
      router.push("/home");
    } else {
      router.push(path);
    }
  } else {
    router.push("/login");
  }
}
