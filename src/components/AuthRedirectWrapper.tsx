"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import { BaseUrl, ProfileCheckRegex } from "@/common/utils";
import Header from "./header";
import Footer from "./footer";
import { useAppSelector } from "@/lib/hooks";
import { Box } from "@mui/material";
import { getToken } from "firebase/messaging";
import { messaging } from "@/app/firebase";
import ServiceWorkerToast from "./ServiceWorkerToast";
import axios from "axios";

const AuthRedirectWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const loginData = useAppSelector((state) => state.login);
  const isAdmin = loginData?.isAdmin;
  const data = loginData?.userData;
  const { user, loading } = useAuth();
  const router = useRouter();
  const path = usePathname();

  const useProfilePathCheck = () => {
    const profilePathRegex = ProfileCheckRegex;
    return profilePathRegex.test(path);
  };

  const isUserProfile: boolean = useProfilePathCheck();

  const updateFcmToken = async (token) => {
    const cred = {
      email: data?.email,
      fcmToken: token,
    };

    await axios
      .put(`${BaseUrl}/api/update-fcm-token`, cred)
      .then((res) => console.log("Token saved", res))
      .catch((err) => console.log("Token saved Err", err));
  };

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY, // Ensure VAPID_KEY is correctly set
      });
      updateFcmToken(token);
    } else {
      console.error("Permission not granted for Notification");
    }
  };

  useEffect(() => {
    // Only request permission if in the client
    if (typeof window !== "undefined" && data?.id) {
      requestPermission();
    }
  }, [data?.id]);

  useEffect(() => {
    if (!loading) {
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

      // Redirect logic for logged-in users on login/signup pages
      if (user || data) {
        if (path === "/login" || path === "/signup") {
          router.push("/");
        }
      } else {
        // Redirect non-logged-in users to /login if trying to access protected routes
        if (
          path !== "/login" &&
          path !== "/signup" &&
          !isUserProfile &&
          !path.startsWith("/admin")
        ) {
          router.push("/login");
        }
      }
    }
  }, [user, loading, path, router, isAdmin, isUserProfile]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Allow access to login and signup pages
  if (path === "/login" || path === "/signup") {
    return <>{children}</>;
  }

  // Allow chat access and show ServiceWorkerToast if data is available
  if (path === "/chat" && data) {
    return (
      <>
        <ServiceWorkerToast />
        {children}
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Full height of the viewport
      }}
    >
      <ServiceWorkerToast />
      <Header />
      <Box sx={{ flexGrow: 1, pt: 10 }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default AuthRedirectWrapper;
