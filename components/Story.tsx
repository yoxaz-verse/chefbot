import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const cycle = ["Explore", "Discover", "Create", "Automate", "Share"] as const;

export function Story() {
  return (
    <>
      <section className="intro" id="story">
        <Reveal className="introInner">
          <span className="kicker">The story begins</span>
          <h2>Curiosity is his compass.</h2>
          <p>
            Chef Bot discovers a remarkable navigation device — a key to
            culinary universes, each with its own landscapes, cultures,
            ingredients and technologies.
          </p>
          <div className="cycle" aria-label="Chef Bot's creative cycle">
            {cycle.map((step, index) => (
              <span className="cycleGroup" key={step}>
                <span className="cycleStep">{step}</span>
                {index < cycle.length - 1 ? <i aria-hidden="true">→</i> : null}
              </span>
            ))}
          </div>
        </Reveal>
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
            <small>His constant companion</small>
            The Navigator — a mysterious device that opens a route to the next
            world.
          </div>
        </Reveal>
      </section>
    </>
  );
}
