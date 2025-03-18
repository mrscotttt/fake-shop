import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import { ShopNavBarContainer } from "@/components/ui/shop-navbar";

const defaultFont = IBM_Plex_Sans_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={defaultFont.className}>
        <ShopNavBarContainer />
        {children}
      </body>
    </html>
  );
}
