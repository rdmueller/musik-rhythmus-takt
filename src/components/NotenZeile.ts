// The geometry of a rhythm on one line, drawn as SVG: where each sign stands, how wide it is, where bar lines,
// time signature and triplet brackets go. Pure functions, used by NotenZeile.vue.
import { dauer, type Zeichen } from "./Rhythmus.ts";

/** The y of the line, the height of the drawing, the room for the time signature. */
export const LINIE = 62;
export const HOEHE = 104;
export const VORNE = 16;
export const TAKTANGABE = 30;

/** The width a sign takes: more with a dot or flags. */
export const breite = (z: { wert: number; punkt: boolean }) => 30 + (z.punkt ? 8 : 0) + (z.wert >= 8 ? 4 : 0);

/** The x of every sign and of every gap after a sign, and the width of the whole drawing. */
/** Units of width per 48th of a whole note, when signs stand by their duration. */
export const PRO_48STEL = 6;

export function anordnung(
  zeichen: readonly { wert: number; punkt: boolean; triole: boolean }[],
  mitTakt: boolean,
  luecke: boolean,
  proportional = false,
) {
  let x = VORNE + (mitTakt ? TAKTANGABE : 0) + 12;
  const xs: number[] = [];
  const luecken: number[] = [];
  for (const z of zeichen) {
    xs.push(x);
    x += proportional ? dauer(z) * PRO_48STEL : breite(z);
    luecken.push(x - 10);
  }
  const lueckeX = luecke ? x + 8 : undefined;
  const ende = (luecke ? x + 60 : x) + 8;
  return { xs, luecken, lueckeX, breite: Math.max(120, ende) };
}

/** The runs of consecutive triplet signs, as first and last index. */
export function triolen(zeichen: readonly Pick<Zeichen, "triole">[]): [number, number][] {
  const gruppen: [number, number][] = [];
  zeichen.forEach((z, i) => {
    if (!z.triole) return;
    const letzte = gruppen[gruppen.length - 1];
    if (letzte && letzte[1] === i - 1 && letzte[1] - letzte[0] < 2) letzte[1] = i;
    else gruppen.push([i, i]);
  });
  return gruppen;
}

/** The number of flags of a note value. */
export const faehnchen = (wert: number) => (wert === 8 ? 1 : wert === 16 ? 2 : 0);
