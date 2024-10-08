"use client";
import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import Home from "./home/page";

export default function MainLayout() {
  const path = usePathname();
  const router = useRouter();
  const loginData = useAppSelector((state) => state.login);
  const isAdmin = loginData?.isAdmin;
  const data = loginData?.userData;

  if (data) {
    if (path === "/" || path === "/login" || path === "/signup") {
      return <Home />;
    } else {
      router.push("/signup");
    }
  } else {
    router.push("/login");
  }
}
