import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { AuthProvider } from "@/context/AuthContext";
import AuthRedirectWrapper from "@/components/AuthRedirectWrapper";
import StoreProvider from "./StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hi Influencer",
  description: "Connect, Collaborate and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <StoreProvider>
            {/* <AuthProvider> */}
            <AuthRedirectWrapper>{children}</AuthRedirectWrapper>
            {/* </AuthProvider> */}
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
