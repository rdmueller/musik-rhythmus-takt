import { expect, test } from "vite-plus/test";
import { check, describe, fehler, generate, mistakes, reason, solution, wrong } from "./ZeichenLesen.ts";

const props = {
  aufgabe: "Wie heißt dieses Zeichen?",
  werte: [1, 2, 4, 8, 16],
  art: "beides" as const,
  punkt: true,
  mistakes: ["Wert", "Note/Pause", "ganze/halbe Pause", "Punkt", "weit"],
};

test("the solution is right; wrong answers and each typical mistake are wrong and recognised", () => {
  for (const variante of [
    props,
    { ...props, art: "noten" as const, punkt: false },
    { ...props, art: "pausen" as const },
  ]) {
    for (let seed = 1; seed <= 50; seed++) {
      const task = generate(seed, variante);
      expect(check(task, solution(task))).toBe(true);
      expect(check(task, wrong(task))).toBe(false);
      mistakes(task).forEach((answer, index) => {
        if (answer === undefined) return;
        expect(check(task, answer)).toBe(false);
        expect(fehler(task, answer)).toBe(index);
      });
    }
  }
});

test("an eighth rest; its typical mistakes", () => {
  const task = {
    zeichen: { wert: 8 as const, pause: true, punkt: false, triole: false },
    art: "beides" as const,
    punkt: true,
  };
  expect(solution(task)).toBe("Achtelpause");
  expect(reason(task, "Viertelpause", props)).toBe("Wert");
  expect(reason(task, "Achtelnote", props)).toBe("Note/Pause");
  expect(reason(task, "punktierte Achtelpause", props)).toBe("Punkt");
  const ganze = { ...task, zeichen: { ...task.zeichen, wert: 1 as const } };
  expect(reason(ganze, "halbe Pause", props)).toBe("ganze/halbe Pause");
  expect(describe(task, props, "de").task).toBe(
    "Wie heißt dieses Zeichen? (Pausenzeichen: ein schräger Strich mit einem Haken)",
  );
});
