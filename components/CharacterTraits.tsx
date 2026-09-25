import { Reveal } from "@/components/Reveal";
import { traits } from "@/data/content";

export function CharacterTraits() {
  return (
    <section className="character">
      <div className="characterInner">
        <Reveal className="characterTop">
          <div>
            <span className="kicker">Always recognizable</span>
            <h2>
              One Chef.<br />Any world.
            </h2>
          </div>
          <p>
            Art styles and landscapes may change, but Chef Bot remains the heart
            of every story: expressive, kind, curious and ready to invent.
          </p>
        </Reveal>
        <div className="traits">
          {traits.map((trait) => (
            <Reveal className="trait" key={trait.name}>
              <strong>{trait.name}</strong>
              <span>{trait.description}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
