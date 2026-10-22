import { Reveal } from "@/components/Reveal";
import { DEMO_HREF_WITH_BODY } from "@/data/content";

export function ClosingCTA() {
  return (
    <section className="closing">
      <Reveal className="closingInner">
        <span className="kicker">The next universe is opening</span>
        <h2>Endless creations.</h2>
        <p>
          The Chef Code is building a story-driven future where food,
          imagination and automation meet — one Chef Bot adventure at a time.
        </p>
        <a className="button closingButton" href={DEMO_HREF_WITH_BODY}>
          Book a demo <span className="arrow">↗</span>
        </a>
        <footer>
          <span>© 2026 The Chef Code</span>
          <span className="footerLinks">
            <a href="/brand/">Brand Guidelines</a>
            <span aria-hidden="true">·</span>
            <span>Cook · Create · Explore</span>
          </span>
        </footer>
      </Reveal>
    </section>
  );
}
