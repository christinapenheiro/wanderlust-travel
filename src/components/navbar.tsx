import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "Admin", href: "#admin" },
];

function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold text-[#0d97b1]">
      Wanderlast
    </Link>
  );
}

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="relative flex h-14 items-center justify-between px-4 md:px-8">
        {/* Left: nav links */}
        <ul className="hidden items-center gap-8 text-sm lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "transition-colors hover:text-[#0d97b1]",
                  link.active && "text-[#0d97b1]"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center: logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo />
        </div>

        {/* Right: profile / auth */}
        <div className="flex items-center gap-6 text-sm">
          <Link href="#profile" className="flex items-center gap-1.5 hover:text-[#0d97b1]">
            <User className="size-4" />
            Profile
          </Link>
          <Link href="#login" className="hidden hover:text-[#0d97b1] sm:block">
            Login
          </Link>
          <Link
            href="#signup"
            className="hover:text-[#0d97b1]"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Mobile nav links */}
      <ul className="flex items-center justify-center gap-6 pb-3 text-sm lg:hidden">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={cn(
                "transition-colors hover:text-[#0d97b1]",
                link.active && "text-[#0d97b1]"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
