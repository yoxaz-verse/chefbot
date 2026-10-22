import { Reveal } from "@/components/Reveal";
import { DEMO_HREF_WITH_BODY } from "@/data/content";

export function ClosingCTA() {
  return (
    <section className="closing">
      <div className="closingOrbit" aria-hidden="true"><span /><span /></div>
      <Reveal className="closingInner">
        <span className="kicker">The next universe is opening</span>
        <h2>What will Chef Bot<br /><em>discover next?</em></h2>
        <p>
          The Chef Code is building a story-driven future where food,
          imagination and automation meet — one Chef Bot adventure at a time.
        </p>
        <div className="closingActions">
          <a className="button closingButton" href={DEMO_HREF_WITH_BODY}>Book a demo <span className="arrow">↗</span></a>
          <a className="closingStoryLink" href="#story">Restart the story <span aria-hidden="true">↑</span></a>
        </div>
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
