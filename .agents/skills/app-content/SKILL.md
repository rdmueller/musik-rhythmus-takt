---
name: app-content
description: Use for any content work in this app - researching, writing, extending, correcting or reviewing its competencies, chapters, pages, rounds, questions, exercises, figures, terms or sources. This app's own content decisions; they take precedence over the generic lernapps content skills. Load it before you change any content.
---

# Content guide of this app

Notation: Notenwerte, Pausen, Punktierung, Notenwerte im Takt, 6/8-Takt, Triolen. Wiederholung und Übung vor einer
Lernkontrolle in Klasse 8; die Selbsteinschätzung ist der Probetest. Archetyp `explainer`, Strang
`musik/rhythmus-takt`, nur Deutsch. Schwester-App: `musik-tonhoehe-harmonik` (gleiche Bauart).

## Curriculum

- Hessen, Gymnasium, Jahrgang 8, Musik. Kein Lehrplan nötig: Strang der Lernlandkarte, Reihenfolge aus `requires`.
- Alle Kompetenzen liegen auf der Karte in Richtstufe 5-6: Wiederholung und Festigung.
- Kein Material des Erstellers; Umfang aus der Karte vorgeschlagen und bestätigt („passt so, Sechzehntel mit
  aufnehmen“).

## Competencies

Ein Kapitel `rhythmus`; Ids und Sätze wörtlich von `https://lernapps.net/apps/map/musik.json`.
- `src/rhythmus/das-brauchst-du.yaml`: recap `musik/tondauer-hoeren`, `musik/taktarten-unterscheiden`,
  `musik/rhythmus-erklaeren`.
- `notenwerte-erkennen` – Ich kann ganze, halbe, Viertel- und Achtelnoten unterscheiden und ihre Dauer vergleichen.
  → `src/rhythmus/notenwerte.yaml` (Musterseite; mit Sechzehnteln, die auf der Karte fehlen).
- `pausen-kennen` – Ich kann Pausenzeichen lesen und weiß, dass eine Pause genauso lange dauert wie die Note mit
  gleichem Namen. → `src/rhythmus/pausen.yaml`.
- `punktierung` – Ich kann punktierte Noten lesen und ihre Dauer berechnen. → `src/rhythmus/punktierung.yaml`.
- `notenwerte-im-takt` – Ich kann Notenwerte und Pausen zusammenzählen und sagen, ob sie in einen Takt passen.
  → `src/rhythmus/notenwerte-im-takt.yaml`.
- `weitere-taktarten` – Ich kann zusammengesetzte Taktarten wie 6/8 erkennen und einen Taktwechsel hören.
  → `src/rhythmus/sechs-achtel-takt.yaml` (Hören fällt weg).
- `triole` – Ich kann eine Triole hören, lesen und klatschen. → `src/rhythmus/triolen.yaml` (nur lesen und rechnen).

## Content structure

- Inhaltsseiten: Abschnitte `einstieg` (kleine Aufgabe vor der Erklärung), `regel` (Erklärung mit `NotenZeile`,
  Kasten „Merke“ bei häufigen Fehlern), `beispiel` (vorgerechnet, jeder Schritt mit Grund), `uebung` (mindestens vier
  Übungen, leicht → schwer). Ziel am Anfang („Auf dieser Seite lernst du …“), am Ende was man kann und was kommt.
- Höchstens 350 Wörter Lesetext; höchstens vier Textblöcke (auch `definition`) am Stück.
- Wiederholungsseite `das-brauchst-du` am Kapitelanfang, ohne Übung. Keine Geschichte.
- Selbsteinschätzung in `src/rhythmus/chapter.yaml`, 2–3 Komponenten oder `generated` je Inhaltsseite.

## Terminology

- Anrede „du“. Notenwerte: ganze Note, halbe Note, Viertelnote, Achtelnote, Sechzehntelnote; Pausen gleichen Namens
  (ganze Pause …). „Taktart“ (3/4-Takt), „Taktangabe“ (die Zahlen am Anfang), „Taktstrich“, „Punktierung“, „punktierte
  Viertel“, „Triole“, „Achteltriole“. Zählen: „1 und 2 und“.
- Taktangabe: obere Zahl = Zahl der Schläge, untere Zahl = Notenwert eines Schlags.
- Glossar (`definition`): Notenwert, Pause, Punktierung, Taktart, Taktangabe, Triole.

## Exercise patterns

Gemeinsame Logik `src/components/Rhythmus.ts`: Dauer als ganze Zahl in 48steln der ganzen Note (Sechzehntel 3,
Achteltriole 4, Achtel 6, Vierteltriole 8, Viertel 12, Halbe 24, Ganze 48; Punkt +Hälfte); Taktlänge = oben × 48 /
unten.

- **Zeichen lesen** (`notenwerte-erkennen`, `pausen-kennen`, `punktierung`): `ZeichenLesen`; ein Zeichen, Antwort
  Wert + Note/Pause (+ punktiert). Fehler: Fähnchen falsch gezählt, Note/Pause, ganze/halbe Pause, Punkt übersehen.
- **Dauer rechnen**: `generated` aus `src/data/notenwerte.yaml`, `number`. Fehler: Punkt verdoppelt, Punkt ignoriert.
- **Takt ergänzen** (`notenwerte-im-takt`, `weitere-taktarten`, `triole`): `TaktErgaenzen`; der fehlende Wert am
  Taktende, als Note oder Pause; geprüft wird die Dauer. Fehler: Taktangabe falsch gelesen, Punkt vergessen,
  Triole als normale Achtel.
- **Taktstriche setzen**: `TaktstricheSetzen`; Lücken zwischen Noten antippen. Fehler: zu früh/zu spät.
- **Zuordnen, ordnen, entscheiden**: `matching`, `ordering`, `single-choice`, `true-false`, `number`, falsche Option
  mit `info`.

## Figures

- `NotenZeile` (Komponente, Anzeige mit `nojs`): Noten und Pausen auf einer Linie, Hals und Fähnchen (keine Balken),
  Punkte, Taktangabe, Taktstriche, Triolenklammer mit „3“, Namen darunter optional. Keine Bilddateien.
- Konventionen: Hälse nach oben; ganze Pause hängt unter der Linie, halbe liegt darauf (eine Linie steht für die
  4. bzw. 3. Linie des Systems); bei 360 px lesbar; in Aufgaben keine Namen unter den Zeichen.

## Sources

Geöffnet 2026-11-23, CC BY-SA 4.0, nur Fakten:
- Lernlandkarte Musik, https://lernapps.net/apps/map/musik.json.
- „Notenwert“, https://de.wikipedia.org/wiki/Notenwert – Zeichen, Dauern, Pausen, Triolen.
- „Punktierung (Musik)“, https://de.wikipedia.org/wiki/Punktierung_(Musik).
- „Takt (Musik)“, https://de.wikipedia.org/wiki/Takt_(Musik) – Taktangabe, 6/8 zusammengesetzt.
- „Taktstrich“, https://de.wikipedia.org/wiki/Taktstrich.
- Unchecked: Betonung im 6/8-Takt (nur die Gruppierung 3 + 3 Achtel wird gelehrt). „Triole“ ist eine Begriffsklärung.

## Adding a chapter or round

1. Kompetenzen des Strangs `musik/rhythmus-takt` von der Karte (z. B. `synkope`, `auftakt-volltakt`), Reihenfolge
   nach `requires`; neues Kapitel in `src/app.yaml`.
2. Wiederholungsseite für Voraussetzungen, die die App nicht übt.
3. Seiten mit `einstieg`, `regel`, `beispiel`, `uebung`; Komponenten wiederverwenden, neue Fälle in `Rhythmus.ts`
   mit Test; `examples` aus `generate(1, props)`.
4. 1–3 Übungen je Seite in `selfAssessment`.
5. `npx --no -- lernapps check`, Screenshots ansehen, committen.

## Rules learned from mistakes

Aus `musik-tonhoehe-harmonik` übernommen:
- Erklärfiguren benennen nur Anker; den Rest leiten die Lernenden her, sonst wird die Zuordnung zum Abschreiben.
- Merke-Kästen vor die Figur, die sie erklären.
- Fehlermeldungen nennen nur, was schon erklärt ist.
- Tabellen höchstens zwei lange Spalten (360 px).
