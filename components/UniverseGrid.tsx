"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { universes } from "@/data/content";

export function UniverseGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = universes[activeIndex];

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
      <div className={`universeExplorer universe-${active.tone}`}>
        <div className="universeTabs" role="tablist" aria-label="Chef Bot universes">
          {universes.map((universe, index) => (
            <button
              type="button"
              role="tab"
              id={`universe-tab-${index}`}
              aria-controls={`universe-panel-${index}`}
              aria-selected={activeIndex === index}
              tabIndex={activeIndex === index ? 0 : -1}
              key={universe.name}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                event.preventDefault();
                const next = event.key === "ArrowRight" ? (index + 1) % universes.length : (index - 1 + universes.length) % universes.length;
                setActiveIndex(next);
                document.getElementById(`universe-tab-${next}`)?.focus();
              }}
            >
              <span>{universe.index}</span><strong>{universe.name}</strong>
            </button>
          ))}
        </div>
        <div className="universeStage" role="tabpanel" id={`universe-panel-${activeIndex}`} aria-labelledby={`universe-tab-${activeIndex}`} tabIndex={0}>
          <div className="universeArt" aria-hidden="true"><i /><i /><i /><span>{active.index}</span></div>
          <div className="universeDetail">
            <p className="universeLabel">{active.label}</p>
            <h3>{active.name}</h3>
            <p className="universeDescription">{active.description}</p>
            <div className="universeOutcome"><span>Discovery</span><p>{active.outcome}</p></div>
            <div className="universeProduct"><span>Inspired creation</span><strong>{active.product}</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}
