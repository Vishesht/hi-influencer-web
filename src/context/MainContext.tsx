"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { AuthProvider } from "./AuthContext";
import AuthRedirectWrapper from "@/components/AuthRedirectWrapper";
import { detectBrowser } from "@/common/utils";

const CommonContext = ({ children }: { children: ReactNode }) => {
  const [browser, setBrowser] = useState("");

  useEffect(() => {
    const detectedBrowser = detectBrowser();
    setBrowser(detectedBrowser);
  }, []);

  if (browser === "Unknown Browser") {
    return <></>;
  }

  return (
    <AuthProvider>
      <AuthRedirectWrapper>{children}</AuthRedirectWrapper>
    </AuthProvider>
  );
};

export default CommonContext;
