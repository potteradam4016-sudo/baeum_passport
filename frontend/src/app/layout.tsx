import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "배움여권",
  description: "세계 여러 나라를 여행하며 도장을 수집하는 교육용 웹 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full">
        <div id="root-shell" className="h-screen overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
