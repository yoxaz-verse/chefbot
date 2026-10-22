type UniverseBase = Readonly<{
  index: string;
  name: string;
  label: string;
  tone: "fizz" | "pearl" | "velvet" | "forge";
}>;

export type Universe =
  | (UniverseBase & Readonly<{
      status: "discovered";
      product: string;
      outcome: string;
      description: string;
    }>)
  | (UniverseBase & Readonly<{
      status: "undiscovered";
      teaser: string;
    }>);

export type Trait = Readonly<{
  name: string;
  description: string;
}>;

export const DEMO_EMAIL = "popapopzfoods@gmail.com";

export const DEMO_HREF =
  "mailto:popapopzfoods@gmail.com?subject=Book%20a%20Chef%20Bot%20demo";

export const DEMO_HREF_WITH_BODY =
  "mailto:popapopzfoods@gmail.com?subject=Book%20a%20Chef%20Bot%20demo&body=Hello%20The%20Chef%20Code%20team%2C%0A%0AI%27d%20like%20to%20book%20a%20demo.";

export const universes: readonly Universe[] = [
  {
    index: "01",
    name: "The Fizz Nebula",
    label: "Atmospheric flavour currents",
    status: "discovered",
    product: "Flavoured soda systems",
    outcome: "A sparkling recipe composed with speed, balance and a little stardust.",
    description:
      "A sky-city powered by flavour currents teaches Chef Bot how a perfect sparkling drink can be composed in seconds.",
    tone: "fizz",
  },
  {
    index: "02",
    name: "Pearl Planet",
    label: "Orbiting flavour pearls",
    status: "undiscovered",
    teaser: "A distant world of luminous orbs is moving into the Navigator’s range.",
    tone: "pearl",
  },
  {
    index: "03",
    name: "The Velvet Range",
    label: "Cloud-built texture",
    status: "undiscovered",
    teaser: "Soft signals drift from beyond the clouds, but their source remains unknown.",
    tone: "velvet",
  },
  {
    index: "04",
    name: "Forge 24",
    label: "Precision-powered nutrition",
    status: "undiscovered",
    teaser: "A rhythmic energy pulse has been detected. The route is not yet stable.",
    tone: "forge",
  },
] as const;

export const traits: readonly Trait[] = [
  {
    name: "Curious",
    description: "He asks why, then travels far enough to find out.",
  },
  {
    name: "Inventive",
    description: "Every discovery becomes a new way to cook, mix or serve.",
  },
  {
    name: "Generous",
    description: "The adventure is complete only when the creation is shared.",
  },
] as const;
