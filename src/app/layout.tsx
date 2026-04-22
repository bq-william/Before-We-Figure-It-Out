import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Before We Figure It Out",
  description:
    "The following videos were recovered from a phone left at 14 Ashford Place, Apartment 3B. No further context. No names. No dates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-act="1">
      <body className="min-h-screen" style={{ background: "#0a0908" }}>
        {children}
      </body>
    </html>
  );
}
