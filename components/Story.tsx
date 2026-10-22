import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const cycle = ["Explore", "Discover", "Create", "Automate", "Share"] as const;

export function Story() {
  return (
    <>
      <section className="intro" id="story">
        <div className="storyShell">
          <Reveal className="introInner">
            <span className="kicker">The story begins</span>
            <h2>Curiosity is<br /><em>his compass.</em></h2>
            <p>
              Chef Bot discovers the Navigator — a mysterious device that opens
              routes to culinary universes with their own landscapes, cultures,
              ingredients and technologies.
            </p>
          </Reveal>
          <div className="storyJourney" aria-label="Chef Bot's creative cycle">
            {cycle.map((step, index) => (
              <Reveal className="journeyStep" key={step}>
                <span className="journeyIndex">0{index + 1}</span>
                <strong>{step}</strong>
                <p>{[
                  "Step beyond the familiar.",
                  "Learn how another world creates.",
                  "Turn wonder into an idea.",
                  "Engineer a repeatable experience.",
                  "Bring the discovery home.",
                ][index]}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="spotlight" aria-label="Meet Chef Bot">
        <div className="spotlightMedia">
          <Image
            src="/images/chefbot-spotlight.png"
            alt="Chef Bot standing beneath a dramatic spotlight"
            width={1122}
            height={1402}
            sizes="(max-width: 860px) 100vw, 50vw"
          />
          <div className="spotlightTag" aria-hidden="true"><span>The Navigator</span><strong>Route unknown</strong></div>
        </div>
        <Reveal className="spotlightCopy">
          <span className="kicker">Meet the explorer</span>
          <h2>
            Small bot.<br />Big appetite<br />for possibility.
          </h2>
          <p>
            Friendly, inventive and just adventurous enough, Chef Bot learns
            from every civilization he meets. Sometimes he brings home a
            flavour. Sometimes a method. Sometimes an idea no kitchen has tried
            before.
          </p>
          <div className="device">
            <span className="deviceIcon" aria-hidden="true">∞</span>
            <div><small>His constant companion</small>The Navigator points toward a world no recipe book has reached.</div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
