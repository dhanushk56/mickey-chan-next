"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/videos", label: "Videos" },
    { href: "/#positions", label: "Open Positions" },
    { href: "/#join", label: "Join" },
  ];

  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-4">
      <Link href="/" className="font-orbitron font-bold text-lg tracking-wide gradient-text">
        MICKEY CHAN
      </Link>

      <button
        className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className="block h-0.5 w-full bg-white" />
        <span className="block h-0.5 w-full bg-white" />
        <span className="block h-0.5 w-full bg-white" />
      </button>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-white/80 hover:text-gold-primary transition-colors">
            {link.label}
          </Link>
        ))}
        <a href="#join" className="btn-primary text-sm !py-2 !px-5">
          Subscribe
        </a>
      </nav>

      {open && (
        <nav className="md:hidden absolute top-full left-0 right-0 glass-nav flex flex-col px-6 py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 border-b border-white/10 last:border-none text-white/80 hover:text-gold-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
