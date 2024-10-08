"use client";

import React, { ReactNode } from "react";
import { AuthProvider } from "./AuthContext";
import AuthRedirectWrapper from "@/components/AuthRedirectWrapper";

const CommonContext = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <AuthRedirectWrapper>{children}</AuthRedirectWrapper>
    </AuthProvider>
  );
};

export default CommonContext;
