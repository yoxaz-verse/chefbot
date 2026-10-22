import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { traits } from "@/data/content";

export function CharacterTraits() {
  return (
    <section className="character">
      <div className="characterInner">
        <Reveal className="characterTop">
          <div className="characterCopy">
            <span className="kicker">Always recognizable</span>
            <h2>
              One Chef.<br />Any world.
            </h2>
            <p>
              Art styles and landscapes may change, but Chef Bot remains the
              heart of every story: expressive, kind, curious and ready to invent.
            </p>
          </div>
          <div className="characterPortrait">
            <span aria-hidden="true">CB / 01</span>
            <Image src="/images/chefbot.png" alt="Chef Bot standing ready for his next adventure" width={1254} height={1254} sizes="(max-width: 860px) 80vw, 40vw" />
          </div>
        </Reveal>
        <div className="traits">
          {traits.map((trait, index) => (
            <Reveal className="trait" key={trait.name}>
              <span className="traitIndex">0{index + 1}</span>
              <strong>{trait.name}</strong>
              <p>{trait.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
