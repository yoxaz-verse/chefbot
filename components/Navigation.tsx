import { DEMO_HREF } from "@/data/content";

export function Navigation() {
  return (
    <header className="nav" aria-label="Primary navigation">
      <nav className="navInner">
        <a className="brand" href="#top">
          The Chef Code <span>/ Chef Bot</span>
        </a>
        <div className="navLinks">
          <a href="#story">Story</a>
          <a href="#universes">Universes</a>
          <a href="#creations">Creations</a>
          <a className="navDemo" href={DEMO_HREF}>
            Book a demo
          </a>
        </div>
      </nav>
    </header>
  );
}
