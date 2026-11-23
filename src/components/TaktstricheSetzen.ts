// The logic of TaktstricheSetzen.vue: a row of several bars without bar lines; the learner taps the gaps after which
// a bar ends. A task is the time signature and the signs; an answer is the sorted list of gaps (index of the sign
// before the line), the last bar's end not counted. Pure functions, which the build tests over fixed seeds.
import { dauer, name, type Zeichen, zufall, waehle } from "./Rhythmus.ts";
import { fuellen, laenge, type Taktart, taktart } from "./Takt.ts";

export interface Props {
  aufgabe: string;
  takte: string[];
  /** How many bars the row has. */
  anzahl: number;
  punkt: boolean;
  triole: boolean;
  mistakes: string[];
}

export interface Task extends Taktart {
  zeichen: Zeichen[];
}

export type Answer = number[];

export function generate(seed: number, props: Props): Task {
  const next = zufall(seed);
  for (let versuch = 0; versuch < 50; versuch++) {
    const t = taktart(waehle(next, props.takte.length > 0 ? props.takte : ["4/4"]));
    const zeichen: Zeichen[] = [];
    for (let i = 0; i < Math.max(2, props.anzahl); i++)
      zeichen.push(...fuellen(next, laenge(t), props.punkt, props.triole));
    if (zeichen.length <= 12) return { ...t, zeichen };
  }
  return {
    oben: 2,
    unten: 4,
    zeichen: Array.from({ length: 4 }, () => ({ wert: 4, pause: false, punkt: false, triole: false })),
  };
}

/** The gaps where bars end, without the last one. */
export function solution(task: Task): Answer {
  const l = laenge(task);
  const striche: number[] = [];
  let s = 0;
  task.zeichen.forEach((z, i) => {
    s += dauer(z);
    if (s % l === 0 && i < task.zeichen.length - 1) striche.push(i);
  });
  return striche;
}

const gleich = (a: readonly number[], b: readonly number[]) => a.length === b.length && a.every((x, i) => x === b[i]);
const sortiert = (a: readonly number[]) => [...a].sort((x, y) => x - y);

export const check = (task: Task, answer: Answer) => gleich(sortiert(answer), solution(task));

export function wrong(task: Task): Answer {
  return solution(task).slice(1);
}

/** The answer of each typical mistake: first line one sign early, one sign late, a line missing, one too many. */
export function mistakes(task: Task): (Answer | undefined)[] {
  const l = solution(task);
  const erste = l[0];
  if (erste === undefined) return [undefined, undefined, undefined, undefined];
  const frueh = erste > 0 && !l.includes(erste - 1) ? [erste - 1, ...l.slice(1)] : undefined;
  const spaet = !l.includes(erste + 1) && erste + 1 < task.zeichen.length - 1 ? [erste + 1, ...l.slice(1)] : undefined;
  const extra = Array.from({ length: task.zeichen.length - 1 }, (_, i) => i).find((i) => !l.includes(i));
  return [
    frueh,
    spaet,
    l.length > 1 ? l.slice(1) : undefined,
    extra === undefined ? undefined : sortiert([...l, extra]),
  ];
}

export function fehler(task: Task, answer: Answer): number | undefined {
  if (check(task, answer)) return undefined;
  const a = sortiert(answer);
  const l = solution(task);
  if (a.length < l.length) return 2;
  if (a.length > l.length) return 3;
  const erste = a.findIndex((x, i) => x !== l[i]);
  const ist = a[erste];
  const soll = l[erste];
  if (ist === undefined || soll === undefined) return undefined;
  return ist < soll ? 0 : 1;
}

export function reason(task: Task, answer: Answer, props: Props, _lang?: string): string | undefined {
  const index = fehler(task, answer);
  return index === undefined ? undefined : props.mistakes[index];
}

export const zeileInWorten = (task: Task) =>
  `${task.oben}/${task.unten}-Takt, ${task.zeichen.length} Zeichen ohne Taktstriche: ${task.zeichen
    .map((z, i) => `${i + 1}. ${name(z)}${z.triole ? " (Triole)" : ""}`)
    .join(", ")}`;

export function describe(task: Task, props: Props, _lang: string): { task: string; solution: string } {
  return { task: `${props.aufgabe} (${zeileInWorten(task)})`, solution: show(solution(task)) };
}

export function template(props: Props, _lang: string): string {
  return `${props.aufgabe} ({Zeile})`;
}

export function params(task: Task, _props: Props, _lang: string): Record<string, string> {
  return { Zeile: zeileInWorten(task) };
}

export function show(answer: Answer, _task?: Task, _props?: Props, _lang?: string): string {
  return answer.length === 0
    ? "keine Taktstriche"
    : `Taktstriche nach Zeichen ${sortiert(answer)
        .map((i) => i + 1)
        .join(", ")}`;
}

export const about = {
  task: "Eine Zeile aus mehreren Takten mit Taktangabe, aber ohne Taktstriche. Das Kind tippt auf die Knöpfe „nach Zeichen n“, um dort einen Taktstrich zu setzen (noch einmal tippen nimmt ihn weg), und drückt „Prüfen“. Der Strich am Ende der Zeile zählt nicht.",
  answer: "Die Stellen der Taktstriche, als Nummern der Zeichen davor.",
  correct: "Richtig, wenn genau nach jedem vollen Takt ein Strich steht.",
  mistakes: [
    "Einen Taktstrich zu früh gesetzt: der Takt ist noch nicht voll.",
    "Einen Taktstrich zu spät gesetzt: der Takt ist übervoll.",
    "Einen Taktstrich vergessen.",
    "Einen Taktstrich zu viel gesetzt.",
  ],
};
