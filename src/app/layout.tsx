import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./style/style.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
  },
  title: {
    default: "Taste of Cambodia — Every dish tells a story",
    template: "%s | Taste of Cambodia",
  },
  description:
    "Discover Cambodian dishes, explore traditional recipes, and learn about Khmer food culture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
