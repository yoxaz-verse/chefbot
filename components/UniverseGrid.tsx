"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { universes } from "@/data/content";

export function UniverseGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = universes[activeIndex];

  useEffect(() => {
    const showFizz = () => setActiveIndex(0);
    window.addEventListener("chefbot:show-fizz", showFizz);
    if (window.location.hash === "#creations") showFizz();
    return () => window.removeEventListener("chefbot:show-fizz", showFizz);
  }, []);

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
              <span>{universe.index}</span>
              <span className="universeTabCopy">
                <strong>{universe.name}</strong>
                <small>{universe.status === "discovered" ? "Discovered" : "Yet to discover"}</small>
              </span>
            </button>
          ))}
        </div>
        {active.status === "discovered" ? (
          <div className="universeStage universeStageDiscovered" role="tabpanel" id={`universe-panel-${activeIndex}`} aria-labelledby={`universe-tab-${activeIndex}`} tabIndex={0}>
            <div className="fizzDiscoveryVisual" id="creations">
              <div className="fizzOrbit" aria-hidden="true"><i /><i /><i /></div>
              <Image className="fizzMachine" src="/images/chefbot-machine-cutout.png" alt="The discovered Chef Code flavoured soda machine in the Fizz Nebula" width={1309} height={1202} sizes="(max-width: 760px) 82vw, 46vw" />
              <Image className="fizzBot" src="/images/chefbot.png" alt="Chef Bot exploring beside the newly discovered machine" width={1254} height={1254} sizes="(max-width: 760px) 25vw, 13vw" />
              <span className="discoveryBadge">Discovery 01 · Complete</span>
            </div>
            <div className="universeDetail">
              <p className="universeLabel">{active.label}</p>
              <h3>{active.name}</h3>
              <p className="universeDescription">{active.description}</p>
              <div className="universeOutcome"><span>Discovery</span><p>{active.outcome}</p></div>
              <div className="universeProduct"><span>Made real</span><strong>{active.product}</strong></div>
            </div>
          </div>
        ) : (
          <div className="universeStage universeStageTeaser" role="tabpanel" id={`universe-panel-${activeIndex}`} aria-labelledby={`universe-tab-${activeIndex}`} tabIndex={0}>
            <div className="universeArt teaserArt" aria-hidden="true"><i /><i /><i /><span>?</span></div>
            <div className="universeDetail teaserDetail">
              <p className="universeLabel">Navigator signal · {active.index}</p>
              <span className="teaserStatus">Yet to discover</span>
              <h3>{active.name}</h3>
              <p className="universeDescription">{active.teaser}</p>
              <p className="teaserNote">Chef Bot has not entered this universe. Its discovery, ingredients and creation remain hidden.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
