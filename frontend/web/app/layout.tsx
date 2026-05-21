import type { Metadata } from "next";
import { AuthProvider } from "../features/auth/components/auth-provider";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "供应链寻源课程平台",
  description: "供应链寻源课程平台前端重构",
  icons: {
    icon: "/icons/favicon.png",
    shortcut: "/icons/favicon.png",
    apple: "/icons/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
