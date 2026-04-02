"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/", label: "Home" },
    { href: "/flights", label: "Flights" },
    { href: "/hotels", label: "Hotels" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600 hover:scale-105 transition-transform duration-300 cursor-pointer">
          TravelApp
        </h1>

        {/* Links */}
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative text-gray-700 font-medium transition-all duration-300
                hover:text-blue-600
                ${pathname === link.href ? "text-blue-600 font-semibold" : ""}
              `}
            >
              {link.label}

              {/* Underline Animation */}
              <span
                className={`
                  absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all duration-300
                  ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}
                `}
              ></span>
            </Link>
          ))}

          {/* Auth UI */}
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={async () => {
                await fetch("/api/logout");
                router.push("/login");
                router.refresh(); 
              }}
              className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-medium hover:bg-orange-700 transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}