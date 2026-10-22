import Image from "next/image";
import { DEMO_HREF } from "@/data/content";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="heroAtmosphere" aria-hidden="true"><span /><span /><span /></div>
      <div className="heroGrid">
        <div className="heroContent">
          <p className="eyebrow">The Chef Code Universe</p>
          <h1>
            <span>One Chef.</span>
            <em>Infinite Worlds.</em>
            <span className="heroFinalLine">Endless Creations.</span>
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
          <div className="heroSystems" aria-label="Chef Code creations">
            <span>Flavoured soda</span><i />
            <span>Popping boba</span><i />
            <span>Shake systems</span>
          </div>
        </div>
        <div className="heroVisual">
          <div className="heroOrbit orbitOne" aria-hidden="true" />
          <div className="heroOrbit orbitTwo" aria-hidden="true" />
          <div className="heroSignal" aria-hidden="true"><span>Navigator signal</span><strong>∞</strong></div>
          <Image
            src="/images/chefbot.png"
            alt="Chef Bot, a friendly white robotic chef"
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 860px) 92vw, 50vw"
          />
          <div className="heroCaption" aria-hidden="true">
            <span>Explorer 01</span><strong>Chef Bot</strong>
          </div>
        </div>
      </div>
      <div className="scrollNote" aria-hidden="true">
        Scroll to discover
      </div>
    </section>
  );
}
