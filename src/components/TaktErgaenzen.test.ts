import { expect, test } from "vite-plus/test";
import { dauer } from "./Rhythmus.ts";
import { laenge, summe } from "./Takt.ts";
import { check, fehler, generate, mistakes, reason, solution, wrong } from "./TaktErgaenzen.ts";

const props = {
  aufgabe: "Was fehlt noch in diesem Takt?",
  takte: ["2/4", "3/4", "4/4"],
  punkt: true,
  triole: false,
  mistakes: ["zu viel", "zu wenig", "Punkt", "Triole"],
};

test("the bar plus the missing sign is full; mistakes are wrong and recognised", () => {
  for (const variante of [
    props,
    { ...props, takte: ["6/8"], punkt: false },
    { ...props, triole: true, punkt: false },
  ]) {
    for (let seed = 1; seed <= 50; seed++) {
      const task = generate(seed, variante);
      expect(summe(task.zeichen) + task.fehlt).toBe(laenge(task));
      expect(check(task, solution(task))).toBe(true);
      expect(check(task, { ...solution(task), pause: true })).toBe(true);
      expect(check(task, wrong(task))).toBe(false);
      mistakes(task).forEach((answer, index) => {
        if (answer === undefined) return;
        expect(check(task, answer)).toBe(false);
        expect(fehler(task, answer)).toBe(index);
      });
    }
  }
});

test("3/4 with a dotted quarter and an eighth lacks a quarter; forgetting the dot gives an eighth more", () => {
  const task = {
    oben: 3,
    unten: 4,
    zeichen: [
      { wert: 4 as const, pause: false, punkt: true, triole: false },
      { wert: 8 as const, pause: false, punkt: false, triole: false },
    ],
    fehlt: 12,
  };
  expect(dauer({ ...solution(task), triole: false })).toBe(12);
  expect(reason(task, { wert: 4, punkt: true, pause: false }, props)).toBe("Punkt");
  expect(reason(task, { wert: 2, punkt: false, pause: false }, props)).toBe("zu viel");
  expect(reason(task, { wert: 8, punkt: false, pause: false }, props)).toBe("zu wenig");
});
