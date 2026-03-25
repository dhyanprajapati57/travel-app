"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 hover:scale-105 transition-transform duration-300">
          TravelApp
        </h1>
        <div className="space-x-6 flex">
          {[
            { href: "/", label: "Home" },
            { href: "/flights", label: "Flights" },
            { href: "/hotels", label: "Hotels" },
            { href: "/dashboard", label: "Dashboard" },
             { href: "/login", label: "Login" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300
                ${pathname === link.href ? "text-blue-600 font-bold" : ""}
              `}
            >
              {link.label}
              {/* Underline effect on hover */}
              <span
                className={`
                  absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300
                  hover:w-full
                  ${pathname === link.href ? "w-full" : ""}
                `}
              ></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}