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
  const data = useAppSelector((state) => state.login.userData);
  const { user, loading } = useAuth();
  const router = useRouter();
  const path = usePathname();

  const useProfilePathCheck = () => {
    const profilePathRegex = ProfileCheckRegex;
    return profilePathRegex.test(path);
  };

  const isuserProfile: boolean = useProfilePathCheck();

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
