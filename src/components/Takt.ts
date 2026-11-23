// Bars for the bar components: drawing a bar of a time signature filled with notes and rests, with dots and triplets
// where allowed. Pure functions, shared by TaktErgaenzen and TaktstricheSetzen.
import { dauer, taktLaenge, waehle, type Wert, type Zeichen } from "./Rhythmus.ts";

export interface Taktart {
  oben: number;
  unten: number;
}

/** "3/4" as a time signature. */
export function taktart(text: string): Taktart {
  const [oben, unten] = text.split("/").map(Number);
  return { oben: oben ?? 4, unten: unten ?? 4 };
}

/** The plain signs that may fill a bar: half, quarter, eighth, and the dotted quarter where allowed. Counting in
 * eighths then always works (no sixteenths in bars). */
export function bausteine(punkt: boolean): Zeichen[] {
  const werte: Wert[] = [2, 4, 8];
  const liste: Zeichen[] = werte.map((wert) => ({ wert, pause: false, punkt: false, triole: false }));
  if (punkt) liste.push({ wert: 4, pause: false, punkt: true, triole: false });
  return liste;
}

/** Signs that fill exactly `laenge` 48ths (a multiple of 6), drawn; with one triplet of eighths (12) on a quarter beat
 * where allowed and room. */
export function fuellen(next: () => number, laenge: number, punkt: boolean, triole: boolean): Zeichen[] {
  if (triole && laenge >= 12) {
    const rest = fuellen(next, laenge - 12, punkt, false);
    const grenzen: number[] = [];
    let s = 0;
    rest.forEach((z, i) => {
      if (s % 12 === 0) grenzen.push(i);
      s += dauer(z);
    });
    if (s % 12 === 0) grenzen.push(rest.length);
    const an = grenzen.length > 0 ? waehle(next, grenzen) : rest.length;
    const gruppe: Zeichen[] = Array.from({ length: 3 }, () => ({ wert: 8, pause: false, punkt: false, triole: true }));
    return [...rest.slice(0, an), ...gruppe, ...rest.slice(an)];
  }
  const zeichen: Zeichen[] = [];
  let rest = laenge;
  while (rest > 0) {
    const passend = bausteine(punkt).filter((z) => dauer(z) <= rest && (rest - dauer(z)) % 6 === 0);
    const z = waehle<Zeichen>(
      next,
      passend.length > 0 ? passend : [{ wert: 8, pause: false, punkt: false, triole: false }],
    );
    zeichen.push({ ...z, pause: z.wert >= 4 && !z.punkt && next() < 0.15 });
    rest -= dauer(z);
  }
  return zeichen;
}

/** Whether a time signature is compound (6/8): its eighths stand in groups of three. */
export const zusammengesetzt = (t: Taktart) => t.unten === 8 && t.oben % 3 === 0;

/** A whole bar, filled; a compound bar group by group (three eighths each), so that no sign crosses a group. */
export function fuellenTakt(next: () => number, t: Taktart, punkt: boolean, triole: boolean): Zeichen[] {
  if (!zusammengesetzt(t)) return fuellen(next, laenge(t), punkt, triole);
  const zeichen: Zeichen[] = [];
  for (let g = 0; g < t.oben / 3; g++) zeichen.push(...fuellen(next, 18, punkt, false));
  return zeichen;
}

export const laenge = (t: Taktart) => taktLaenge(t.oben, t.unten);

export const summe = (zeichen: readonly Zeichen[]) => zeichen.reduce((s, z) => s + dauer(z), 0);
