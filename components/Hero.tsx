import Image from "next/image";
import { DEMO_HREF } from "@/data/content";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="heroGrid">
        <div>
          <p className="eyebrow">The Chef Code Universe</p>
          <h1>
            One Chef. <em>Infinite Worlds.</em>
          </h1>
          <p className="heroCopy">
            Meet Chef Bot — a curious robotic chef who travels beyond the known
            kitchen to discover new flavours, ideas and ways to create.
          </p>
          <div className="actions">
            <a className="button primaryButton" href="#story">
              Explore the universe <span className="arrow">↓</span>
            </a>
            <a className="button secondaryButton" href={DEMO_HREF}>
              Book a demo
            </a>
          </div>
        </div>
        <div className="heroVisual">
          <Image
            src="/images/chefbot.png"
            alt="Chef Bot, a friendly white robotic chef"
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 860px) 92vw, 50vw"
          />
        </div>
      </div>
      <div className="scrollNote" aria-hidden="true">
        Scroll to discover
      </div>
    </section>
  );
}
