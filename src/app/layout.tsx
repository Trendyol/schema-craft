import type { Metadata } from "next";

import { AntdRegistry } from "@ant-design/nextjs-registry";

import AppLayout from "@/components/app-layout";

import "./globals.css";

export const metadata: Metadata = {
  title: "SchemaCraft",
  description: "SchemaCraft by Trendyol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <AppLayout>{children}</AppLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
