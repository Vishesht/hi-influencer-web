"use client";
import { ProfileCheckRegex } from "@/common/utils";
import Home from "@/components/Home";
import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout() {
  const path = usePathname();
  const router = useRouter();
  const loginData = useAppSelector((state) => state.login);
  const isAdmin = loginData?.isAdmin;
  const data = loginData?.userData;

  const useProfilePathCheck = () => {
    const profilePathRegex = ProfileCheckRegex;
    return profilePathRegex.test(path);
  };

  const isUserProfile: boolean = useProfilePathCheck();

  useEffect(() => {
    // Handle admin access logic
    if (isAdmin) {
      // If an admin is trying to access /admin, redirect to /admin/dashboard
      if (path === "/admin") {
        router.push("/admin/dashboard");
      }
    } else {
      if (path === "/admin" || path.startsWith("/admin")) {
        router.push("/admin");
      }
    }
    if (!data) {
      if (
        path !== "/login" &&
        path !== "/signup" &&
        !isUserProfile &&
        !path.startsWith("/admin")
      ) {
        router.push("/login");
      }
    }
  }, [path, router, isAdmin, isUserProfile]);

  return <Home />;
}
