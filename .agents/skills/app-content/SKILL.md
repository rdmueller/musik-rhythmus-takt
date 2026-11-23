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
- Glossar (`definition`): Notenwert, Pause, Punktierung, Taktangabe, Taktstrich, Taktart, Hauptschlag,
  zusammengesetzte Taktart, Triole.
- Taktangabe: oben die Zahl der Zählzeiten, unten der Notenwert einer Zählzeit; im 6/8-Takt sechs Zählzeiten, zwei
  Hauptschläge.

## Exercise patterns

Gemeinsame Logik `src/components/Rhythmus.ts`: Dauer als ganze Zahl in 48steln der ganzen Note (Sechzehntel 3,
Achteltriole 4, Achtel 6, Vierteltriole 8, Viertel 12, Halbe 24, Ganze 48; Punkt +Hälfte); Taktlänge = oben × 48 /
unten.

- **Zeichen lesen** (`notenwerte`, `pausen`, `punktierung`): `ZeichenLesen`, Props `werte`, `art` (`noten`,
  `pausen`, `beides`), `punkt`; Antwort per Knöpfe Wert + Note/Pause (+ Punkt). Fehler (Reihenfolge der `mistakes`):
  Nachbarwert, Note/Pause, ganze/halbe Pause, Punkt, weiter daneben. Nur angebotene Werte gelten als Fehler-Antwort.
- **Dauer rechnen**: `generated` aus `src/data/notenwerte.yaml` (Vergleich in Sechzehnteln, `notenwerte#werte-vergleichen`)
  und `src/data/punktiert.yaml` (punktierte Werte mit den Fehlerzahlen „verdoppelt“ und „ohne Punkt“,
  `punktierung#punktiert-rechnen`).
- **Takt ergänzen** (`notenwerte-im-takt`, `sechs-achtel-takt`, `triolen`): `TaktErgaenzen`, Props `takte`
  (z. B. `["2/4", "3/4", "4/4"]`), `punkt`, `triole` (dann immer eine Achteltriole im Takt); der fehlende Wert am
  Taktende, als Note oder Pause; geprüft wird die Dauer. Fehler: zu viel, zu wenig, Punkt vergessen, Triole als drei
  Achtel.
- **Taktstriche setzen**: `TaktstricheSetzen`, Props wie oben plus `anzahl` (Takte) und `lueckenname`; Knöpfe „nach
  Zeichen n“. Fehler: zu früh, zu spät, fehlt, zu viel.
- Takte füllt `src/components/Takt.ts`: Bausteine halbe, Viertel, Achtel und punktierte Viertel (keine Sechzehntel im
  Takt, damit „in Achteln rechnen“ immer aufgeht); Triolen nur auf einem Viertelschlag; 6/8 Gruppe für Gruppe (drei
  Achtel je Gruppe), die Lücke in der letzten Gruppe.
- **Zuordnen, ordnen, entscheiden**: `matching`, `ordering`, `single-choice`, `true-false`, `number`, falsche Option
  mit `info`.

## Figures

- `NotenZeile` (Komponente, Anzeige mit `nojs`): Noten und Pausen auf einer Linie, Hals und Fähnchen (keine Balken),
  Punkte, Taktangabe (`oben`/`unten`, 0 = keine), `taktstriche` (Index des Zeichens davor), Triolenklammer mit „3“,
  `namen` darunter (leere Texte lassen ein Zeichen unbenannt), `proportional` (Abstand nach Dauer: Zeilen gleicher
  Dauer sind gleich breit, so im Notenbaum). Keine Bilddateien.
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

- Der Einstieg muss ohne Raten lösbar sein: Namen als Brüche („halbe“ gegen „Achtel“) geben die Antwort her.
  (Lernenden-Check der Musterseite)
- „Jede Zeile dauert gleich lang“ verlangt Zeilen gleicher Dauer und proportionale Abstände (16 Sechzehntel, nicht 2).
- Übungen, deren Antwort wörtlich im Merke-Kasten steht, durch Aufgaben mit einem Denkschritt ersetzen.
- Aufgaben müssen die Regel der Seite einhalten: 6/8-Takte Gruppe für Gruppe, keine Note über die Taktmitte
  (Lernenden-Check der ganzen App).
- Fehlermeldungen einer Komponente, die Noten und Pausen mischt, sprechen beide an.

Aus `musik-tonhoehe-harmonik` übernommen:
- Erklärfiguren benennen nur Anker; den Rest leiten die Lernenden her, sonst wird die Zuordnung zum Abschreiben.
- Merke-Kästen vor die Figur, die sie erklären.
- Fehlermeldungen nennen nur, was schon erklärt ist.
- Tabellen höchstens zwei lange Spalten (360 px).
