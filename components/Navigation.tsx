"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
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

  const handleLink = (id: string, event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (id !== "creations") return;
    event.preventDefault();
    window.history.replaceState(null, "", "#creations");
    window.dispatchEvent(new Event("chefbot:show-fizz"));
    window.setTimeout(() => document.getElementById("creations")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
  };

  return (
    <header className="nav" aria-label="Primary navigation">
      <nav className="navInner">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <Image className="brandMark" src="/brand/chefbot-head-3d.png" alt="" width={1200} height={1096} priority />
          <span className="brandName">The Chef Code</span>
          <span className="brandCharacter">/ Chef Bot</span>
        </a>
        <div className={`navLinks ${open ? "isOpen" : ""}`} id="primary-links">
          {links.map((link) => (
            <a href={link.href} key={link.id} aria-current={active === link.id ? "location" : undefined} onClick={(event) => handleLink(link.id, event)}>
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
