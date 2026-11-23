import { expect, test } from "vite-plus/test";
import { anordnung, faehnchen, triolen } from "./NotenZeile.ts";
import { dauer, lesen, name, taktLaenge, zeichenMitDauer } from "./Rhythmus.ts";

test("durations in 48ths: dots add half, triplets take two thirds", () => {
  expect(dauer({ wert: 1, punkt: false, triole: false })).toBe(48);
  expect(dauer({ wert: 4, punkt: true, triole: false })).toBe(18);
  expect(dauer({ wert: 16, punkt: false, triole: false })).toBe(3);
  expect(dauer({ wert: 8, punkt: false, triole: true })).toBe(4);
  expect(dauer({ wert: 4, punkt: false, triole: true })).toBe(8);
  expect(taktLaenge(3, 4)).toBe(36);
  expect(taktLaenge(6, 8)).toBe(36);
  expect(zeichenMitDauer(18, true)).toEqual({ wert: 4, pause: true, punkt: true, triole: false });
  expect(zeichenMitDauer(5, false)).toBeUndefined();
});

test("German names and reading them back", () => {
  expect(name({ wert: 2, pause: true, punkt: false })).toBe("halbe Pause");
  expect(name({ wert: 4, pause: false, punkt: true })).toBe("punktierte Viertelnote");
  expect(name({ wert: 16, pause: true, punkt: false })).toBe("Sechzehntelpause");
  expect(lesen("Achtelnote")).toEqual({ wert: 8, pause: false, punkt: false });
  expect(lesen("Halbenote")).toBeUndefined();
});

test("signs stand left to right; triplets group in threes; flags by value", () => {
  const zeichen = [
    { wert: 4, punkt: true, triole: false },
    { wert: 8, punkt: false, triole: true },
    { wert: 8, punkt: false, triole: true },
    { wert: 8, punkt: false, triole: true },
  ];
  const lage = anordnung(zeichen, true, true);
  expect(lage.xs[1] ?? 0).toBeGreaterThan(lage.xs[0] ?? 0);
  expect(lage.lueckeX ?? 0).toBeGreaterThan(lage.xs[3] ?? 0);
  expect(triolen(zeichen)).toEqual([[1, 3]]);
  expect(faehnchen(16)).toBe(2);
  expect(faehnchen(4)).toBe(0);
  const ganze = anordnung([{ wert: 1, punkt: false, triole: false }], false, false, true);
  const achtel = anordnung(
    Array.from({ length: 8 }, () => ({ wert: 8, punkt: false, triole: false })),
    false,
    false,
    true,
  );
  expect(ganze.breite).toBe(achtel.breite);
});
