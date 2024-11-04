"use client";

import { ConfigProvider, theme } from "antd";

type AppLayoutProps = { children: React.ReactNode };

function AppLayout({ children }: AppLayoutProps) {
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        token: {
          colorPrimary: "#f27a1a",
          colorBgBase: "#22272d",
          wireframe: true,
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AppLayout;
