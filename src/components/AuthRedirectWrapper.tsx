// components/AuthRedirectWrapper.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import { ProfileCheckRegex } from "@/common/utils";

const AuthRedirectWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const path = usePathname();

  const useProfilePathCheck = () => {
    const profilePathRegex = ProfileCheckRegex;
    return profilePathRegex.test(path);
  };

  const isuserProfile: boolean = useProfilePathCheck();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Authenticated users should not be on login or signup pages
        if (path === "/login" || path === "/signup") {
          router.push("/");
        }
      } else {
        // Unauthenticated users should be redirected to login page
        if (path !== "/login" && path !== "/signup" && !isuserProfile) {
          router.push("/login");
        }
      }
    }
  }, [user, loading, path, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default AuthRedirectWrapper;
