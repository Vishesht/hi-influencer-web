"use client";
import AuthRedirectWrapper from "@/components/AuthRedirectWrapper";
import Home from "@/components/Home/home";
import { AuthProvider } from "@/context/AuthContext";
import React from "react";

export default function MainLayout() {
  return (
    <AuthProvider>
      <AuthRedirectWrapper>
        <Home />
      </AuthRedirectWrapper>
    </AuthProvider>
  );
}
