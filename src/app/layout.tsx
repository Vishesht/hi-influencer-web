import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { AuthProvider } from "@/context/AuthContext";
import AuthRedirectWrapper from "@/components/AuthRedirectWrapper";
import StoreProvider from "./StoreProvider";
import useBrowser from "@/lib/hooks/useBrowser";

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
  const browser = useBrowser();

  if (browser === "Unknown Browser") {
    return (
      <div>
        Browser not supported. Please open the Url in you default browser
      </div>
    );
  }
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <StoreProvider>
            <AuthProvider>
              <AuthRedirectWrapper>{children}</AuthRedirectWrapper>
            </AuthProvider>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
