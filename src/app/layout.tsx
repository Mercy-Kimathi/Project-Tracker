import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Linear — Plan and build products",description:"A calmer way to build products."};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }