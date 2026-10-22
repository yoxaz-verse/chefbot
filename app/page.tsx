import { CharacterTraits } from "@/components/CharacterTraits";
import { ClosingCTA } from "@/components/ClosingCTA";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Story } from "@/components/Story";
import { UniverseGrid } from "@/components/UniverseGrid";

export default function HomePage() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <Story />
        <UniverseGrid />
        <CharacterTraits />
        <ClosingCTA />
      </main>
    </>
  );
}
