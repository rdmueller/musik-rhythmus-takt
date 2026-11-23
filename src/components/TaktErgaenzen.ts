// The logic of TaktErgaenzen.vue: a bar with its time signature lacks its last sign; the learner chooses it from the
// value buttons, as note or rest, dotted or not. A task is the time signature, the given signs and the missing
// duration; an answer is a sign, checked by its duration. Pure functions, which the build tests over fixed seeds.
import { dauer, name, type Wert, type Zeichen, zeichenMitDauer, zufall, waehle } from "./Rhythmus.ts";
import { fuellen, laenge, type Taktart, taktart, zusammengesetzt } from "./Takt.ts";

export interface Props {
  aufgabe: string;
  /** The time signatures that may come, e.g. ["2/4", "3/4", "4/4"]. */
  takte: string[];
  /** Whether dotted notes come in the bar (and as an answer). */
  punkt: boolean;
  /** Whether a triplet of eighths may come in the bar. */
  triole: boolean;
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes: string[];
}

export interface Task extends Taktart {
  zeichen: Zeichen[];
  fehlt: number;
}

export interface Answer {
  wert: number;
  punkt: boolean;
  pause: boolean;
}

/** The durations a missing sign may have: plain values, dotted ones where allowed. */
const fehlende = (punkt: boolean) => [6, 12, 24, ...(punkt ? [18, 36] : [])];

export function generate(seed: number, props: Props): Task {
  const next = zufall(seed);
  for (let versuch = 0; versuch < 50; versuch++) {
    const t = taktart(waehle(next, props.takte.length > 0 ? props.takte : ["4/4"]));
    const l = laenge(t);
    if (zusammengesetzt(t)) {
      // the gap lies in the last group of three eighths; every group before it is full
      const fehlt = waehle(next, props.punkt ? [6, 12, 18] : [6, 12]);
      const zeichen: Zeichen[] = [];
      for (let g = 0; g < t.oben / 3 - 1; g++) zeichen.push(...fuellen(next, 18, props.punkt, false));
      zeichen.push(...fuellen(next, 18 - fehlt, props.punkt, false));
      if (zeichen.length >= 2 && zeichen.length <= 7) return { ...t, zeichen, fehlt };
      continue;
    }
    const fehlt = waehle(
      next,
      fehlende(props.punkt).filter((d) => d < l),
    );
    const zeichen = fuellen(next, l - fehlt, props.punkt, props.triole);
    if (zeichen.length >= 2 && zeichen.length <= 7) return { ...t, zeichen, fehlt };
  }
  return { oben: 4, unten: 4, zeichen: [{ wert: 2, pause: false, punkt: false, triole: false }], fehlt: 24 };
}

export const check = (task: Task, answer: Answer) => dauer({ ...answer, triole: false }) === task.fehlt;

const alsAntwort = (z: Zeichen | undefined): Answer | undefined =>
  z ? { wert: z.wert, punkt: z.punkt, pause: false } : undefined;

export function solution(task: Task): Answer {
  return alsAntwort(zeichenMitDauer(task.fehlt, false)) ?? { wert: 4, punkt: false, pause: false };
}

/** The durations of the typical mistakes: too long, too short, dot forgotten, triplet counted as eighths. */
function fehlerdauern(task: Task): (number | undefined)[] {
  const punkt = task.zeichen.find((z) => z.punkt && !z.pause) ?? task.zeichen.find((z) => z.punkt);
  const mitTriole = task.zeichen.some((z) => z.triole);
  const gibt = (d: number) => (d > 0 && zeichenMitDauer(d, false) ? d : undefined);
  const ohnePunkt = punkt ? gibt(task.fehlt + dauer(punkt) / 3) : undefined;
  const triole = mitTriole ? gibt(task.fehlt - 6) : undefined;
  const lang = gibt(task.fehlt * 2);
  const kurz = task.fehlt % 2 === 0 ? gibt(task.fehlt / 2) : undefined;
  return [
    lang === ohnePunkt || lang === triole ? undefined : lang,
    kurz === ohnePunkt || kurz === triole ? undefined : kurz,
    ohnePunkt === triole ? undefined : ohnePunkt,
    triole,
  ];
}

export function wrong(task: Task): Answer {
  const d = [task.fehlt * 2, task.fehlt / 2, 3, 48].find((x) => x !== task.fehlt && zeichenMitDauer(x, false));
  return alsAntwort(zeichenMitDauer(d ?? 48, false)) ?? { wert: 1, punkt: false, pause: false };
}

export function mistakes(task: Task): (Answer | undefined)[] {
  return fehlerdauern(task).map((d) => (d === undefined ? undefined : alsAntwort(zeichenMitDauer(d, false))));
}

export function fehler(task: Task, answer: Answer): number | undefined {
  if (check(task, answer)) return undefined;
  const d = dauer({ ...answer, triole: false });
  const index = fehlerdauern(task).findIndex((x) => x === d);
  if (index >= 0) return index;
  return d > task.fehlt ? 0 : 1;
}

export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = fehler(task, answer);
  return index === undefined ? undefined : props.mistakes[index];
}

/** The bar in words. */
export const taktInWorten = (task: Task) =>
  `${task.oben}/${task.unten}-Takt: ${task.zeichen
    .map((z) => (z.triole ? `${name(z)} (Triole)` : name(z)))
    .join(", ")}, dann eine Lücke`;

export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  return {
    task: `${props.aufgabe} (${taktInWorten(task)})`,
    solution: `${show(solution(task))} (oder die gleich lange Pause)`,
  };
}

export function template(props: Props, _lang: string): string {
  return `${props.aufgabe} ({Takt})`;
}

export function params(task: Task, _props: Props, _lang: string): Record<string, string> {
  return { Takt: taktInWorten(task) };
}

export function show(answer: Answer, _task?: Task, _props?: Props, _lang?: string): string {
  return name({ wert: answer.wert as Wert, pause: answer.pause, punkt: answer.punkt });
}

export const about = {
  task: "Ein Takt mit Taktangabe, am Ende fehlt ein Zeichen. Das Kind wählt mit Knöpfen den fehlenden Notenwert, Note oder Pause und, wenn angeboten, punktiert, und drückt „Prüfen“. Geprüft wird die Dauer: Note und gleich lange Pause zählen beide.",
  answer: "Ein Notenwert (mit oder ohne Punkt) als Note oder Pause.",
  correct: "Richtig, wenn das Zeichen genau die Dauer hat, die dem Takt noch fehlt.",
  mistakes: [
    "Zu viel: ein Wert, der den Takt überfüllt (doppelt so lang wie nötig).",
    "Zu wenig: ein Wert, der den Takt nicht füllt (halb so lang wie nötig).",
    "Den Punkt einer Note im Takt nicht mitgerechnet.",
    "Die Triole wie drei normale Achtel gezählt.",
  ],
};
