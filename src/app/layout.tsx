
import "./globals.css";
import Providers from "../app/provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import NavbarWrapper from "./componenets/NavbarWrapper";


const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Travel App",
  description: "Book flights and hotels easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-gray-50 text-gray-800">
        <Providers>
           <NavbarWrapper />
          {children}
        </Providers>
      </body>
    </html>
  );  
}