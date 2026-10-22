export type Universe = Readonly<{
  index: string;
  name: string;
  label: string;
  product: string;
  outcome: string;
  description: string;
  tone: "fizz" | "pearl" | "velvet" | "forge";
}>;

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
    product: "Popping-boba systems",
    outcome: "A delicate rhythm for creating, carrying and serving bright flavour orbs.",
    description:
      "In a world of floating flavour orbs, Chef Bot learns the delicate rhythm behind popping-boba creation.",
    tone: "pearl",
  },
  {
    index: "03",
    name: "The Velvet Range",
    label: "Cloud-built texture",
    product: "Thick-shake systems",
    outcome: "A lesson in how temperature and motion turn simple ingredients into velvet.",
    description:
      "Cloud farmers reveal how texture, temperature and motion transform simple ingredients into thick shakes.",
    tone: "velvet",
  },
  {
    index: "04",
    name: "Forge 24",
    label: "Precision-powered nutrition",
    product: "Protein-shake systems",
    outcome: "A seamless ritual where accuracy, energy and nourishment move as one.",
    description:
      "An energetic civilization shows Chef Bot how precision and nutrition can become one seamless protein-shake ritual.",
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
