// The rhythm logic shared by the notation components: note values and rests, dots and triplets, their durations as
// whole numbers in 48ths of a whole note (a sixteenth is 3, a triplet eighth 4, an eighth 6, a quarter 12), bars of a
// time signature, and their German names. Pure functions, no view.

/** The note values of the app: 1 whole, 2 half, 4 quarter, 8 eighth, 16 sixteenth. */
export const WERTE = [1, 2, 4, 8, 16] as const;
export type Wert = (typeof WERTE)[number];

export interface Zeichen {
  wert: Wert;
  pause: boolean;
  punkt: boolean;
  triole: boolean;
}

/** The duration in 48ths of a whole note. */
export function dauer(z: { wert: number; punkt: boolean; triole: boolean }): number {
  const grund = 48 / z.wert;
  const mitPunkt = z.punkt ? grund * 1.5 : grund;
  return z.triole ? (mitPunkt * 2) / 3 : mitPunkt;
}

/** The length of a bar in 48ths: upper number times the value of the lower one. */
export const taktLaenge = (oben: number, unten: number) => (oben * 48) / unten;

/** The name of a value as a word part: ganze, halbe, Viertel, Achtel, Sechzehntel. */
export const WERTNAME: Record<Wert, string> = { 1: "ganze", 2: "halbe", 4: "Viertel", 8: "Achtel", 16: "Sechzehntel" };

/** The full German name: "Viertelnote", "ganze Pause", "punktierte Achtelpause". */
export function name(z: Pick<Zeichen, "wert" | "pause" | "punkt">): string {
  const punkt = z.punkt ? "punktierte " : "";
  if (z.wert === 1 || z.wert === 2) return `${punkt}${WERTNAME[z.wert]} ${z.pause ? "Pause" : "Note"}`;
  return `${punkt}${WERTNAME[z.wert]}${z.pause ? "pause" : "note"}`;
}

/** Every sign the app names, for reading an answer back. */
export const ALLE: readonly Pick<Zeichen, "wert" | "pause" | "punkt">[] = WERTE.flatMap((wert) =>
  [false, true].flatMap((pause) => [false, true].map((punkt) => ({ wert, pause, punkt }))),
);

/** The sign of a name, or undefined. */
export const lesen = (text: string) => ALLE.find((z) => name(z) === text);

/** A small seeded random generator (mulberry32). */
export function zufall(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One element of a list, drawn. */
export const waehle = <T>(next: () => number, liste: readonly T[]): T => {
  const element = liste[Math.floor(next() * liste.length)];
  if (element === undefined) throw new Error("empty list");
  return element;
};

/** The plain note or rest of a value with the given duration in 48ths, if one exists (dotted ones too). */
export function zeichenMitDauer(d: number, pause: boolean): Zeichen | undefined {
  for (const wert of WERTE)
    for (const punkt of [false, true]) {
      const z = { wert, pause, punkt, triole: false };
      if (dauer(z) === d) return z;
    }
  return undefined;
}
