import Image from "next/image";
import { Reveal } from "@/components/Reveal";

export function CreationShowcase() {
  return (
    <section className="creation" id="creations">
      <Reveal className="creationCard">
        <Image
          src="/images/chefbot-machine.png"
          alt="A Chef Bot automated soda dispensing machine"
          width={1672}
          height={941}
          sizes="(max-width: 1280px) 100vw, 1240px"
        />
        <div className="creationCopy">
          <div>
            <span className="kicker">From story to system</span>
            <h2>Discovery, made real.</h2>
          </div>
          <p>
            The Chef Code turns imagination into automated food and beverage
            experiences — from flavoured soda and popping boba to thick shakes,
            protein shakes and ideas still waiting in another universe.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
