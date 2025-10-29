"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../../style/globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { LanguageProvider } from "@/core/provider/language-provider";
import { Provider } from "react-redux";
import { store } from "@/core/config/redux/store/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <Provider store={store}>
            <Header />
            {children}
            <Footer />
          </Provider>
        </LanguageProvider>
      </body>
    </html>
  );
}
