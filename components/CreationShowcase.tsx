import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function CreationShowcase() {
  return (
    <section className="creation" id="creations">
      <div className="creationShell">
        <Reveal className="creationCopy">
          <div>
            <span className="kicker">From story to system</span>
            <h2>Discovery, made real.</h2>
          </div>
          <p>
            The Chef Code turns imagination into automated food and beverage
            experiences — from flavoured soda and popping boba to thick shakes,
            protein shakes and ideas still waiting in another universe.
          </p>
        </Reveal>
        <Reveal className="creationCard">
          <div className="machineFrame">
            <div className="machineMeta"><span>Chef Code / Creation 01</span><span>Automated beverage system</span></div>
            <Image
              src="/images/chefbot-machine-wrap-studio.png"
              alt="A premium white and navy Chef Code automated beverage machine with Chef Bot branding"
              width={1536}
              height={1024}
              sizes="(max-width: 1280px) 100vw, 1240px"
            />
          </div>
          <div className="productRail" aria-label="Chef Code product families">
            {[
              ["01", "Flavoured soda", "Fizz Nebula"],
              ["02", "Popping boba", "Pearl Planet"],
              ["03", "Thick shakes", "Velvet Range"],
              ["04", "Protein shakes", "Forge 24"],
            ].map(([index, product, world]) => (
              <article key={product}><span>{index}</span><strong>{product}</strong><small>Inspired by {world}</small></article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
