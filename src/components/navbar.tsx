"use client";

import Link from "next/link";
import { ScrollText, Github, Heart } from "lucide-react";

export const Navbar = () => {
  const navLinks = [
    {
      name: "Favorites",
      href: "/favorites",
      icon: <Heart className="h-4 w-4" />,
    },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-md">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center px-4 md:px-8">
        <Link
          href="/"
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
        >
          <ScrollText className="w-5 h-5" />
          <span className="text-lg font-bold text-primary">PapergramN</span>
        </Link>

        {/* Navigation Links */}
        <div className="ml-auto flex items-center space-x-4 md:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-transform duration-200 hover:scale-105 hover:text-primary`}
            >
              <span className="flex items-center gap-1">
                {link.icon}
                {link.name}
              </span>
            </Link>
          ))}

          {/* GitHub Link */}
          <Link
            href="https://github.com/paulbgtr/papergramnext"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="p-2 transition-colors hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
