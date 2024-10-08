"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { BaseUrl, ProfileCheckRegex } from "@/common/utils";
import Header from "./header";
import Footer from "./footer";
import { useAppSelector } from "@/lib/hooks";
import { Box } from "@mui/material";
import { getToken } from "firebase/messaging";
import { messaging } from "@/app/firebase";
import ServiceWorkerToast from "./ServiceWorkerToast";
import axios from "axios";
import Loading from "./LoadingSpinner";

const AuthRedirectWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const loginData = useAppSelector((state) => state.login);
  const router = useRouter();
  const path = usePathname();

  const isAdmin = loginData?.isAdmin;
  const data = loginData?.userData;

  const isUserProfile = ProfileCheckRegex.test(path);

  // Function to update FCM token
  const updateFcmToken = async (token: string) => {
    const cred = { email: data?.email, fcmToken: token };

    try {
      const response = await axios.put(`${BaseUrl}/api/update-fcm-token`, cred);
      console.log("Token saved", response);
    } catch (error) {
      console.log("Token save error", error);
    }
  };

  // Request notification permission and handle token
  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
        });
        console.log("Successfully obtained token:", token);
        updateFcmToken(token);
      } catch (error) {
        console.error("Error obtaining token:", error);
      }
    } else {
      console.error("Notification permission not granted");
    }
  };

  // Effect for requesting permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && data?.id) {
      requestPermission();
    }
  }, [data?.id]);

  // Effect for handling redirects based on auth state
  useEffect(() => {
    if (loading) return;

    if (isAdmin && path === "/admin") {
      router.push("/admin/dashboard");
    } else if (!isAdmin && path.startsWith("/admin")) {
      router.push("/admin");
    } else if (data) {
      if (path === "/login" || path === "/signup") {
        router.push("/");
      }
    } else if (!isUserProfile && path !== "/login" && path !== "/signup") {
      router.push("/login");
    }
  }, [user, loading, path, router, isAdmin, isUserProfile]);

  // Show loading spinner while loading
  if (loading) {
    return <Loading loading={loading} />;
  }

  // Allow access to login and signup pages
  if (path === "/login" || path === "/signup") {
    return <>{children}</>;
  }

  // Allow access to chat page with service worker toast
  if (path === "/chat" && data) {
    return (
      <>
        <ServiceWorkerToast />
        {children}
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ServiceWorkerToast />
      <Header />
      <Box sx={{ flexGrow: 1, pt: 10 }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default AuthRedirectWrapper;
