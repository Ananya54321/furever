import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Furrever",
  description: "The place where love meets pet essentials",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
          className="sized-toaster"
          toastOptions={{
            style: {
              background: "#355E3B",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
