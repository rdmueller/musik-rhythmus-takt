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

/** The plain signs that may fill a bar, by the options. */
export function bausteine(punkt: boolean): Zeichen[] {
  const werte: Wert[] = [2, 4, 8, 16];
  const liste: Zeichen[] = werte.map((wert) => ({ wert, pause: false, punkt: false, triole: false }));
  if (punkt)
    liste.push(
      { wert: 4, pause: false, punkt: true, triole: false },
      { wert: 8, pause: false, punkt: true, triole: false },
    );
  return liste;
}

/** Signs that fill exactly `laenge` 48ths, drawn; with a triplet of eighths (12) where allowed and room. */
export function fuellen(next: () => number, laenge: number, punkt: boolean, triole: boolean): Zeichen[] {
  const zeichen: Zeichen[] = [];
  let rest = laenge;
  let triolen = triole ? 1 : 0;
  while (rest > 0) {
    if (triolen > 0 && rest >= 12 && rest % 6 === 0 && next() < 0.5) {
      for (let i = 0; i < 3; i++) zeichen.push({ wert: 8, pause: false, punkt: false, triole: true });
      rest -= 12;
      triolen--;
      continue;
    }
    // a sign that fits and leaves a rest that the plain values can still fill (multiples of 3)
    const passend = bausteine(punkt).filter((z) => dauer(z) <= rest && (rest - dauer(z)) % 3 === 0);
    const z = waehle<Zeichen>(
      next,
      passend.length > 0 ? passend : [{ wert: 16, pause: false, punkt: false, triole: false }],
    );
    zeichen.push({ ...z, pause: z.wert >= 4 && !z.punkt && next() < 0.15 });
    rest -= dauer(z);
  }
  return zeichen;
}

export const laenge = (t: Taktart) => taktLaenge(t.oben, t.unten);

export const summe = (zeichen: readonly Zeichen[]) => zeichen.reduce((s, z) => s + dauer(z), 0);
