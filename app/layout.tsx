import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "당근모바일 🥕 | 우리 동네 1등 공식 온라인 휴대폰 판매점",
  description:
    "이통 3사(SKT/KT/LGU+) 공시지원금 + 당근 단독 추가지원금 최대 43만 원 즉시 할인! 복잡한 발품 없이 3분 비대면 접수 및 당일 무료 퀵배송.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥕</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      data-seed
      data-seed-color-mode="light-only"
      className="h-full antialiased scroll-smooth"
    >
      <head>
        <meta name="color-scheme" content="light" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-gray-50/60 text-gray-900 selection:bg-orange-100 selection:text-[#FF6F0F]">
        {children}
      </body>
    </html>
  );
}
