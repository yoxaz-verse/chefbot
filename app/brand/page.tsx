import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: "Brand Guidelines — The Chef Code",
  description:
    "The visual and verbal identity system for The Chef Code and Chef Bot.",
};

const tokenSnippet = `:root {
  --color-ink: #07080a;
  --color-paper: #f7f8fa;
  --color-navy: #071a33;
  --color-orange: #ff6b22;
  --color-blue: #59b8ff;
  --space-4: 16px;
  --radius-card: 24px;
}`;

export default function BrandPage() {
  return (
    <main className="brandBook">
      <nav className="brandBookNav" aria-label="Brand book navigation">
        <Link className="brand" href="/">
          The Chef Code <span>/ Brand Book</span>
        </Link>
        <div>
          <a href="#foundation">Foundation</a>
          <a href="#system">System</a>
          <a href="/downloads/the-chef-code-brand-book.pdf" download>
            Download PDF
          </a>
        </div>
      </nav>

      <header className="brandHero">
        <div className="brandHeroCopy">
          <p className="brandLabel">Brand guidelines · Version 1.0</p>
          <h1>One Chef.<br /><em>Infinite Worlds.</em></h1>
          <p>
            A practical system for expressing The Chef Code with clarity,
            imagination and consistency - from product interfaces to stories
            set in entirely new universes.
          </p>
          <a className="button brandDownload" href="/downloads/the-chef-code-brand-book.pdf" download>
            Download the brand book <span className="arrow">↓</span>
          </a>
        </div>
        <div className="brandHeroBot">
          <Image
            src="/images/chefbot.png"
            alt="Chef Bot, the central character of The Chef Code"
            width={1254}
            height={1254}
            priority
            sizes="(max-width: 880px) 90vw, 44vw"
          />
        </div>
      </header>

      <section className="brandSection foundation" id="foundation">
        <div className="brandSectionIntro">
          <p className="brandLabel">01 · Foundation</p>
          <h2>A story-driven technology brand.</h2>
          <p>
            The Chef Code transforms discoveries from Chef Bot&apos;s fictional
            culinary universe into automated food and beverage experiences in
            the real world.
          </p>
        </div>
        <div className="foundationGrid">
          <article className="principleCard principleDark">
            <span>Core idea</span>
            <strong>{brand.brand.idea}</strong>
          </article>
          <article className="principleCard">
            <span>Story cycle</span>
            <div className="brandCycle">
              {brand.brand.cycle.map((step, index) => (
                <span key={step}>{step}{index < brand.brand.cycle.length - 1 ? " →" : ""}</span>
              ))}
            </div>
          </article>
          <article className="principleCard">
            <span>Personality</span>
            <div className="personalityList">
              {brand.brand.personality.map((quality) => <strong key={quality}>{quality}</strong>)}
            </div>
          </article>
        </div>
      </section>

      <section className="brandSection characterGuide">
        <div className="brandSectionIntro compact">
          <p className="brandLabel">02 · Character</p>
          <h2>Always Chef Bot.</h2>
          <p>
            Art direction may change across universes. His silhouette,
            curiosity, expressive eyes and friendly chef identity must remain
            immediately recognizable.
          </p>
        </div>
        <div className="characterGuideGrid">
          <div className="characterStage">
            <Image
              src="/images/chefbot-spotlight.png"
              alt="Chef Bot presented with cinematic lighting"
              width={1122}
              height={1402}
              sizes="(max-width: 880px) 100vw, 52vw"
            />
          </div>
          <div className="guidelineStack">
            <article><span className="ruleTag do">Do</span><h3>Protect his silhouette</h3><p>Keep the chef hat, large expressive eyes and compact proportions visible.</p></article>
            <article><span className="ruleTag do">Do</span><h3>Use purposeful light</h3><p>Choose clean studio light or cinematic light that supports the universe.</p></article>
            <article><span className="ruleTag avoid">Avoid</span><h3>Publishing reference sheets</h3><p>Turnarounds and internal angle studies guide production; they are not public campaign artwork.</p></article>
            <article><span className="ruleTag avoid">Avoid</span><h3>Breaking recognition</h3><p>Do not replace core facial, hat or body proportions with unrelated character designs.</p></article>
          </div>
        </div>
      </section>

      <section className="brandSection systemSection" id="system">
        <div className="brandSectionIntro">
          <p className="brandLabel">03 · Color</p>
          <h2>Precision meets possibility.</h2>
          <p>
            Neutral foundations create product clarity. Orange signals action
            and invention; blue signals discovery and technological depth.
          </p>
        </div>
        <div className="colorGrid">
          {brand.colors.map((color) => (
            <article className="colorCard" key={color.name}>
              <div className="swatch" style={{ background: color.hex }} aria-hidden="true" />
              <div><strong>{color.name}</strong><code>{color.hex}</code><p>{color.usage}</p></div>
            </article>
          ))}
        </div>
        <div className="universePalettes">
          {brand.universes.map((universe) => (
            <article key={universe.name}>
              <div style={{ background: `linear-gradient(135deg, ${universe.from}, ${universe.to})` }} />
              <span>{universe.name}</span><code>{universe.from} → {universe.to}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="brandSection typographySection">
        <div className="brandSectionIntro compact">
          <p className="brandLabel">04 · Typography</p>
          <h2>Sora leads. Inter explains.</h2>
          <p>Sora gives the brand a friendly, engineered silhouette. Inter keeps interfaces and long-form guidance highly readable.</p>
        </div>
        <div className="fontSpecimens">
          <article className="soraSpecimen"><span>Display · Sora</span><strong>Infinite<br />worlds.</strong><p>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz 0123456789</p></article>
          <article className="interSpecimen"><span>Body and UI · Inter</span><strong>Curiosity becomes creation.</strong><p>Use Inter for paragraphs, navigation, product interfaces, labels, specifications and data.</p></article>
        </div>
        <div className="typeTable" role="table" aria-label="Type scale">
          {brand.typeScale.map((style) => (
            <div role="row" key={style.name}>
              <strong role="cell">{style.name}</strong><span role="cell">{style.font}</span><code role="cell">{style.size}</code><span role="cell">{style.weight} / {style.lineHeight}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="brandSection spacingSection">
        <div className="brandSectionIntro compact">
          <p className="brandLabel">05 · Space and shape</p>
          <h2>Built on a 4 px rhythm.</h2>
          <p>Use the scale consistently. Tight values belong inside components; large values create cinematic pacing between ideas.</p>
        </div>
        <div className="spacingScale">
          {brand.spacing.map((space) => (
            <div key={space}><span style={{ width: `${Math.max(4, space)}px` }} /><code>{space}</code></div>
          ))}
        </div>
        <div className="shapeGrid">
          {brand.radii.map((radius) => (
            <article key={radius.name} style={{ borderRadius: radius.value }}><strong>{radius.name}</strong><code>{radius.value}</code></article>
          ))}
        </div>
      </section>

      <section className="brandSection uiSection">
        <div className="brandSectionIntro compact">
          <p className="brandLabel">06 · Interface language</p>
          <h2>Clear, warm and quietly futuristic.</h2>
          <p>Interfaces should feel engineered without becoming cold. Use generous space, decisive hierarchy and one primary action at a time.</p>
        </div>
        <div className="uiDemo">
          <div className="uiDemoNav"><strong>The Chef Code</strong><span>Story&nbsp;&nbsp; Universes&nbsp;&nbsp; Creations</span><button type="button">Book a demo</button></div>
          <div className="uiDemoBody"><p className="brandLabel">The next universe</p><h3>Discovery,<br />made real.</h3><div><button type="button">Explore the universe</button><button type="button" className="ghostButton">Learn more</button></div></div>
        </div>
        <div className="motionGrid">
          <article><span>Reveal</span><strong>800 ms</strong><p>Gentle rise with cubic-bezier(0.2, 0.8, 0.2, 1).</p></article>
          <article><span>Hover</span><strong>250 ms</strong><p>Use restrained elevation; never distract from the story.</p></article>
          <article><span>Reduced motion</span><strong>Required</strong><p>Remove animation while preserving hierarchy and meaning.</p></article>
        </div>
      </section>

      <section className="brandSection voiceSection">
        <div className="brandSectionIntro compact">
          <p className="brandLabel">07 · Voice</p>
          <h2>Wonder without noise.</h2>
        </div>
        <div className="voiceGrid">
          <article><span>Curious</span><strong>Invite discovery.</strong><p>“What if a flavour could open a new world?”</p></article>
          <article><span>Inventive</span><strong>Make technology tangible.</strong><p>Show what Chef Bot learns, builds and shares.</p></article>
          <article><span>Friendly</span><strong>Use plain, human language.</strong><p>Explain without jargon, hype or exaggerated claims.</p></article>
          <article><span>Cinematic</span><strong>Write in scenes.</strong><p>Make every line feel ready for animation, packaging or launch film.</p></article>
        </div>
      </section>

      <section className="brandSection developerSection">
        <div className="brandSectionIntro compact">
          <p className="brandLabel">08 · Developer reference</p>
          <h2>Tokens, ready to use.</h2>
          <p>Start with semantic variables. Add universe colors only when the story context calls for them.</p>
        </div>
        <pre><code>{tokenSnippet}</code></pre>
        <div className="brandFinal">
          <p>The Chef Code · Brand system v1.0</p>
          <Link href="/">Return to the universe <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
