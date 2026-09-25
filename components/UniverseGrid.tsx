import { Reveal } from "@/components/Reveal";
import { universes } from "@/data/content";

export function UniverseGrid() {
  return (
    <section className="worlds" id="universes">
      <Reveal className="sectionHead">
        <div>
          <span className="kicker">Infinite worlds</span>
          <h2>Every creation starts somewhere unexpected.</h2>
        </div>
        <p>
          Each universe is a new adventure with its own visual language,
          characters and culinary logic. What Chef Bot learns there becomes a
          real-world possibility.
        </p>
      </Reveal>
      <div className="worldGrid">
        {universes.map((universe) => (
          <Reveal className={`world world-${universe.tone}`} key={universe.name}>
            <span className="worldIndex">{universe.index}</span>
            <h3>{universe.name}</h3>
            <p>{universe.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
