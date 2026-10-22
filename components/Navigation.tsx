"use client";

import { useEffect, useState } from "react";
import { DEMO_HREF } from "@/data/content";

const links = [
  { href: "#story", label: "Story", id: "story" },
  { href: "#universes", label: "Universes", id: "universes" },
  { href: "#creations", label: "Creations", id: "creations" },
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActive(current.target.id);
      },
      { rootMargin: "-35% 0px -55%", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="nav" aria-label="Primary navigation">
      <nav className="navInner">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brandMark" aria-hidden="true">C</span>
          <span className="brandName">The Chef Code</span>
          <span className="brandCharacter">/ Chef Bot</span>
        </a>
        <div className={`navLinks ${open ? "isOpen" : ""}`} id="primary-links">
          {links.map((link) => (
            <a href={link.href} key={link.id} aria-current={active === link.id ? "location" : undefined} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="navActions">
          <a className="navDemo" href={DEMO_HREF}>Book a demo</a>
          <button className="navToggle" type="button" aria-expanded={open} aria-controls="primary-links" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
            <span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}
