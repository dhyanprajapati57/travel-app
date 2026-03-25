
import "./globals.css";
import Providers from "../app/provider";
import Navbar from "../../componenets/Navbar";

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
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}