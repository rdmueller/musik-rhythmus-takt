// The logic of ZeichenLesen.vue: one note or rest sign is shown; the learner names it with buttons for the value,
// note or rest and, if asked, the dot. A task is the sign; an answer is its German name ("Achtelpause",
// "punktierte Viertelnote"). Pure functions, which the build tests over fixed seeds.
import { lesen, name, type Wert, WERTNAME, waehle, type Zeichen, zufall } from "./Rhythmus.ts";

export interface Props {
  aufgabe: string;
  /** The values that may come. */
  werte: number[];
  /** Notes, rests or both. */
  art: "noten" | "pausen" | "beides";
  /** Whether dotted signs come (and the dot is asked). */
  punkt: boolean;
  /** The app's message for each typical mistake, in the order of about.mistakes. */
  mistakes: string[];
}

export interface Task {
  zeichen: Zeichen;
  art: Props["art"];
  punkt: boolean;
  /** The values the buttons offer. */
  werte: Wert[];
}

export type Answer = string;

const erlaubt = (werte: readonly number[]): Wert[] => ([1, 2, 4, 8, 16] as const).filter((w) => werte.includes(w));

export function generate(seed: number, props: Props): Task {
  const next = zufall(seed);
  const werte = erlaubt(props.werte);
  const wert = waehle<Wert>(next, werte.length > 0 ? werte : [4]);
  const pause = props.art === "pausen" ? true : props.art === "noten" ? false : next() < 0.5;
  const punkt = props.punkt && wert !== 16 && next() < 0.5;
  return {
    zeichen: { wert, pause, punkt, triole: false },
    art: props.art,
    punkt: props.punkt,
    werte: werte.length > 0 ? werte : [4],
  };
}

export const solution = (task: Task): Answer => name(task.zeichen);

export const check = (task: Task, answer: Answer) => answer === solution(task);

const nachbar = (wert: Wert): Wert => (wert === 16 ? 8 : ((wert * 2) as Wert));
/** A value two steps away: four times as long or short. */
const weit = (wert: Wert): Wert => (wert <= 4 ? ((wert * 4) as Wert) : ((wert / 4) as Wert));

export function wrong(task: Task): Answer {
  const anderer = task.werte.find((w) => w !== task.zeichen.wert);
  return anderer === undefined
    ? name({ ...task.zeichen, pause: !task.zeichen.pause })
    : name({ ...task.zeichen, wert: anderer });
}

/** A value if the buttons offer it. */
const angeboten = (task: Task, wert: Wert) => (task.werte.includes(wert) ? wert : undefined);

/** The answer of each typical mistake of about.mistakes, undefined where it cannot happen. */
export function mistakes(task: Task): (Answer | undefined)[] {
  const z = task.zeichen;
  const ganzeHalbePause = z.pause && z.wert <= 2;
  const mit = (wert: Wert | undefined) => (wert === undefined ? undefined : name({ ...z, wert }));
  return [
    ganzeHalbePause ? undefined : mit(angeboten(task, nachbar(z.wert))),
    task.art === "beides" ? name({ ...z, pause: !z.pause }) : undefined,
    ganzeHalbePause ? mit(angeboten(task, z.wert === 1 ? 2 : 1)) : undefined,
    task.punkt && (z.punkt || z.wert !== 16) ? name({ ...z, punkt: !z.punkt }) : undefined,
    mit(angeboten(task, weit(z.wert))),
  ];
}

/** Which typical mistake an answer shows, as its index in about.mistakes. */
export function fehler(task: Task, answer: Answer): number | undefined {
  if (check(task, answer)) return undefined;
  const a = lesen(answer);
  if (!a) return undefined;
  const z = task.zeichen;
  if (a.wert === z.wert && a.pause === z.pause && a.punkt !== z.punkt) return 3;
  if (a.wert === z.wert && a.pause !== z.pause) return 1;
  if (a.pause === z.pause && a.punkt === z.punkt) {
    if (z.pause && z.wert <= 2 && a.wert <= 2) return 2;
    if (a.wert === z.wert * 2 || a.wert * 2 === z.wert) return 0;
    return 4;
  }
  return undefined;
}

export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = fehler(task, answer);
  return index === undefined ? undefined : props.mistakes[index];
}

/** The sign in words, without its name: what a screen reader user is told. */
export function beschreibung(z: Zeichen): string {
  if (z.pause) {
    const form = {
      1: "ein Balken, der unter der Linie hängt",
      2: "ein Balken, der auf der Linie liegt",
      4: "ein Zickzack-Zeichen",
      8: "ein schräger Strich mit einem Haken",
      16: "ein schräger Strich mit zwei Haken",
    }[z.wert];
    return `Pausenzeichen: ${form}${z.punkt ? ", mit Punkt" : ""}`;
  }
  const kopf = z.wert <= 2 ? "hohler" : "gefüllter";
  const hals = z.wert === 1 ? "ohne Hals" : "mit Hals";
  const f = z.wert === 8 ? ", ein Fähnchen" : z.wert === 16 ? ", zwei Fähnchen" : "";
  return `Note: ${kopf} Kopf ${hals}${f}${z.punkt ? ", mit Punkt" : ""}`;
}

export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  return { task: `${props.aufgabe} (${beschreibung(task.zeichen)})`, solution: solution(task) };
}

export function template(props: Props, _lang: string): string {
  return `${props.aufgabe} ({Zeichen})`;
}

export function params(task: Task, _props: Props, _lang: string): Record<string, string> {
  return { Zeichen: beschreibung(task.zeichen) };
}

export const show = (answer: Answer, _task?: Task, _props?: Props, _lang?: string) => answer;

/** The value names in order, for the buttons. */
export const wertnamen = (werte: readonly number[]) => erlaubt(werte).map((w) => ({ wert: w, text: WERTNAME[w] }));

export const about = {
  task: "Ein Noten- oder Pausenzeichen auf einer Linie. Das Kind wählt mit Knöpfen den Notenwert (ganze bis Sechzehntel), Note oder Pause und, wenn gefragt, ob es punktiert ist, und drückt „Prüfen“.",
  answer: "Der Name des Zeichens, z. B. Achtelpause oder punktierte Viertelnote.",
  correct: "Richtig, wenn Wert, Note oder Pause und Punkt stimmen.",
  mistakes: [
    "Einen Wert daneben: ein Fähnchen zu viel oder zu wenig, oder halbe und ganze Note verwechselt.",
    "Note und Pause verwechselt.",
    "Ganze und halbe Pause verwechselt (hängt oder liegt).",
    "Den Punkt übersehen oder einen gesehen, der nicht da ist.",
    "Einen Wert weiter daneben: Kopf, Hals und Fähnchen nicht geprüft.",
  ],
};
