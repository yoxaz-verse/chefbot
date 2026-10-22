import brandData from "./brand.json";

export type BrandColor = (typeof brandData.colors)[number];
export type UniverseColor = (typeof brandData.universes)[number];
export type TypeStyle = (typeof brandData.typeScale)[number];

export const brand = brandData;
