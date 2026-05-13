
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import KeycloakProvider from "@/components/keycloakProvider";

const inter = Inter({
    subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "HE/CLA",
  description: "TBA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html className={inter.className}>
            <body>
                <KeycloakProvider>
                    {children}
                </KeycloakProvider>
            </body>
        </html>
    );
}
