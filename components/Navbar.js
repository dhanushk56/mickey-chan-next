"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/videos", label: "Videos" },
    { href: "/#positions", label: "Open positions" },
    { href: "/#join", label: "Join" },
  ];

  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="brand-mark" aria-label="Mickey Chan home">
          <span className="brand-mark-icon">M</span>
          <span>MICKEY CHAN</span>
        </Link>

        <button
          className="menu-button md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
          ))}
          <a href="#join" className="btn-primary nav-cta">Subscribe <span aria-hidden="true">↗</span></a>
        </nav>

        {open && (
          <nav className="mobile-nav md:hidden">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link py-3" onClick={() => setOpen(false)}>{link.label}</Link>
            ))}
            <a href="#join" className="btn-primary mt-3 text-center" onClick={() => setOpen(false)}>Subscribe</a>
          </nav>
        )}
      </div>
    </header>
  );
}
