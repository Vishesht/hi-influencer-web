"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import { ProfileCheckRegex } from "@/common/utils";
import Header from "./header";
import Footer from "./footer";
import { useAppSelector } from "@/lib/hooks";
import { Box } from "@mui/material";

const AuthRedirectWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const data = useAppSelector((state) => state.login.userData);
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
      if (user || data) {
        if (path === "/login" || path === "/signup") {
          router.push("/");
        }
      } else {
        if (path !== "/login" && path !== "/signup" && !isuserProfile) {
          router.push("/login");
        }
      }
    }
  }, [user, loading, path, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (path === "/login" || path === "/signup") {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full height of the viewport
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1, pt: 10 }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default AuthRedirectWrapper;
