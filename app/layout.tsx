import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "Love is Active | St. Matthias Valentine",
    description: "A warm, joyful, and Christ-centered Valentine celebration.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={clsx(inter.variable, playfair.variable, "font-sans antialiased text-stone-800")}>{children}</body>
        </html>
    );
}
