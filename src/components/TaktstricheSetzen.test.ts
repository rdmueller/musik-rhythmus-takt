import { expect, test } from "vite-plus/test";
import { check, fehler, generate, mistakes, reason, show, solution, wrong } from "./TaktstricheSetzen.ts";

const props = {
  aufgabe: "Setze die Taktstriche.",
  takte: ["2/4", "3/4", "4/4"],
  anzahl: 3,
  punkt: true,
  triole: false,
  mistakes: ["früh", "spät", "fehlt", "zu viel"],
};

test("the solution is right; mistakes are wrong and recognised", () => {
  for (const variante of [props, { ...props, takte: ["6/8"] }, { ...props, triole: true, punkt: false }]) {
    for (let seed = 1; seed <= 50; seed++) {
      const task = generate(seed, variante);
      expect(solution(task).length).toBeGreaterThanOrEqual(1);
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

test("two bars of 2/4 in quarters: the line after the 2nd sign", () => {
  const q = { wert: 4 as const, pause: false, punkt: false, triole: false };
  const task = { oben: 2, unten: 4, zeichen: [q, q, q, q] };
  expect(solution(task)).toEqual([1]);
  expect(reason(task, [0], props)).toBe("früh");
  expect(reason(task, [2], props)).toBe("spät");
  expect(reason(task, [0, 1], props)).toBe("zu viel");
  expect(show([1])).toBe("Taktstriche nach Zeichen 2");
});
