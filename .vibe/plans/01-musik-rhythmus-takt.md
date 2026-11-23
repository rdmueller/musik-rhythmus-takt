---
# Read by the hooks, the review, the evals. Schema: @lernapps/tooling/guidance/plan-front-matter.v1.schema.json
# Written by `lernapps plan` and the hooks. Never change a key or a value by hand.
# Archetype, null until chosen in Explore. Allowed values: explainer, interactive, quiz.
archetype: explainer
# Current phase. Allowed values: explore, plan, code, commit.
phase: explore
# prePushFailures: failed pre-push runs, written by the hook.
prePushFailures: 0
# failedChecks: failed rules and runs, written by lernapps check and the hooks.
failedChecks: {}
---

# Plan: musik-rhythmus-takt, first version

<!--
For you, the assistant. The process is in AGENTS.md; this plan holds the method.
- `npx --no -- lernapps plan next` prints the task to do now, `plan done` ticks it and prints the next one.
- You write only below Goal, Key decisions, Notes, Answers, Entry draft, Content method and Retrospective, in the
  creator's language. Delete the comment of a section once the section is filled.
- Work on the branch `work`, locally: push nothing before Commit.
-->

*Started 2026-11-23. Explore, Plan, Code, Commit.*

## Goal

<!-- 1–2 sentences: what learners do, what they learn. -->

## Key decisions

- Archetyp `explainer`, wie bei `musik-tonhoehe-harmonik`: kurze Erklärseiten, Aufgaben mit neuen Werten bei jedem
  Durchgang (`generated` mit Brüchen), Selbsteinschätzung als Probetest; ein Baustein zeichnet Noten, Pausen und Takte.
  `quiz` ohne Erklärseiten und ohne neu gezogene Aufgaben, `interactive` ohne Erklärseiten und Selbsteinschätzung.
- Name `musik-rhythmus-takt`: Schema `musik-<Strang>` aus der ersten App.

## Notes

### Lernlandkarte Musik (https://lernapps.net/apps/map/musik.json, gelesen 2026-11-23) und Auftrag

Der Ersteller bringt keinen eigenen Inhalt; der Auftrag aus der Karte wurde bestätigt: „passt so, Sechzehntel mit
aufnehmen“.

- Strang `musik/rhythmus-takt`. Alle Kompetenzen in Richtstufe 5-6 (Klasse 8: Wiederholung vor der Lernkontrolle);
  keine übt bisher eine App (`practisedBy` leer).
- Seiten in dieser Reihenfolge (Schritt nach `requires`):
  1. `notenwerte-erkennen` (Schritt 4) – mit Sechzehnteln (steht nicht auf der Karte; Vorschlag an lernapps/apps nötig)
  2. `pausen-kennen` (5)
  3. `punktierung` (5)
  4. `notenwerte-im-takt` (7)
  5. `weitere-taktarten` (7)
  6. `triole` (6; braucht `rhythmus-erklaeren`, steht nach den Taktseiten, weil sie mit Takten rechnet)
- Wiederholung am Kapitelanfang: `tondauer-hoeren`, `taktarten-unterscheiden`, `rhythmus-erklaeren`.
- Was die App nicht kann: Hören und Klatschen (Triolen hören, Taktwechsel hören); keine Geschichte.

### Wie die Lernenden üben (Skill `lernapps-exercise-patterns`; kein Musik-Verweis, nächster: Mathematik)

- Notenwerte und Pausen erkennen: Zeichen gezeigt (gezeichnet), Namen wählen; umgekehrt Name gegeben, Zeichen
  wählen. Fehler: Viertel- und Achtelpause verwechselt, ganze und halbe Pause verwechselt (hängt / liegt).
- Dauer vergleichen und rechnen: `generated` mit Brüchen aus einer Datendatei der Notenwerte („Wie viele Achtel
  dauert eine punktierte Halbe?“). Fehler: Punkt verdoppelt statt die Hälfte addiert; Sechzehntel als halbe Achtel
  vergessen.
- Notenwerte im Takt: ein Takt mit Taktangabe und Noten wird gezeigt; „Passt der Takt?“, „Was fehlt noch?“ (Note
  oder Pause wählen), „Wo gehört der Taktstrich hin?“. Fehler: Taktangabe als Bruch falsch gelesen (3/4 = drei
  Viertel), Punktierung nicht mitgerechnet.
- 6/8: Achtel zählen, Gruppen zu je drei; Vergleich 6/8 und 3/4. Fehler: 6/8 = 3/4 gerechnet (Dauer gleich, Betonung
  anders).
- Triole: drei Noten in der Zeit von zwei; Dauer im Takt rechnen. Fehler: Triolen-Achtel wie normale Achtel gezählt.
- Probetest: Selbsteinschätzung des Kapitels (= der App).

### Strang und Kompetenzen (ein Kapitel `rhythmus`)

Strang `musik/rhythmus-takt`. Sätze wörtlich von der Karte.
- Wiederholung `das-brauchst-du`: recap `tondauer-hoeren` („Ich kann kurze und lange Töne hören und der Dauer nach
  ordnen.“), `taktarten-unterscheiden` („Ich kann den 2/4-, 3/4- und 4/4-Takt am Klang unterscheiden.“),
  `rhythmus-erklaeren` („Ich kann erklären, dass der Rhythmus aus Tempo und Tondauer entsteht, und ihn vom Grundschlag
  unterscheiden.“).
- `notenwerte-erkennen` – Ich kann ganze, halbe, Viertel- und Achtelnoten unterscheiden und ihre Dauer vergleichen.
  (+ Sechzehntel, Wunsch des Erstellers; fehlt auf der Karte.)
- `pausen-kennen` – Ich kann Pausenzeichen lesen und weiß, dass eine Pause genauso lange dauert wie die Note mit
  gleichem Namen.
- `punktierung` – Ich kann punktierte Noten lesen und ihre Dauer berechnen.
- `notenwerte-im-takt` – Ich kann Notenwerte und Pausen zusammenzählen und sagen, ob sie in einen Takt passen.
- `weitere-taktarten` – Ich kann zusammengesetzte Taktarten wie 6/8 erkennen und einen Taktwechsel hören. (Hören fällt
  weg.)
- `triole` – Ich kann eine Triole hören, lesen und klatschen. (Nur lesen und rechnen.)

### Didaktik je Kompetenz (herleiten; welcher Fehler abgefangen wird)

- `notenwerte-erkennen`: Ganze halbieren, Schritt für Schritt (Notenbaum), am Zeichen ablesen: hohl/gefüllt, Hals,
  Zahl der Fähnchen. Fehler: Fähnchen falsch gezählt (Achtel/Sechzehntel), halbe und ganze verwechselt.
- `pausen-kennen`: Jede Pause neben ihrer Note; ganze Pause hängt an der 4. Linie, halbe liegt auf der 3. Fehler:
  ganze/halbe Pause verwechselt, Viertel-/Achtelpause verwechselt.
- `punktierung`: Punkt = die Hälfte des eigenen Werts dazu; mit Achteln als Einheit rechnen. Fehler: verdoppelt
  statt Hälfte dazu, Punkt ignoriert.
- `notenwerte-im-takt`: Taktangabe lesen (oben Zahl der Schläge, unten Notenwert), Takt in Vierteln oder Achteln
  füllen, fehlenden Wert finden, Taktstriche setzen. Fehler: Taktangabe vertauscht gelesen, Pausen nicht mitgezählt,
  Punkt vergessen.
- `weitere-taktarten`: 6/8 = sechs Achtel in zwei Gruppen zu drei, zwei Hauptschläge; Vergleich mit 3/4 (gleiche
  Dauer, andere Gruppierung). Fehler: 6/8 und 3/4 gleichgesetzt.
- `triole`: drei Noten in der Zeit von zwei gleichen, mit „3“ markiert; Dauer im Takt. Fehler: Triolen-Achtel als
  normale Achtel gezählt.

### Umfang

- Drin: Notenwerte ganze bis Sechzehntel, Pausen gleichen Namens, einfache Punktierung (keine Doppelpunktierung),
  Taktarten 2/4, 3/4, 4/4, 6/8 (3/8 und 2/2 nicht, guess), Achtel- und Vierteltriolen, Takte prüfen und ergänzen,
  Taktstriche setzen; Rhythmen nur im Bild (Noten ohne Tonhöhe auf einer Linie, guess).
- Draußen: Hören und Klatschen; Synkope, Auftakt, besondere Taktarten (5/4, 7/8); Haltebogen; Tempo- und
  Lautstärkezeichen. Grund: nicht im bestätigten Auftrag.
- Sprache: nur Deutsch.

### Quellen (geöffnet 2026-11-23, CC BY-SA 4.0; nur Fakten)

- Lernlandkarte Musik, https://lernapps.net/apps/map/musik.json – verified.
- „Notenwert“, https://de.wikipedia.org/wiki/Notenwert – Zeichen und Dauer ganze bis Sechzehntel; Pausen (ganze hängt
  an der 4. Linie, halbe liegt auf der 3.; gleich lang wie die Note); Triolen (drei in der Zeit von zwei, „3“) –
  verified. „Triole“ ist eine Begriffsklärung, nicht verlinken.
- „Punktierung (Musik)“, https://de.wikipedia.org/wiki/Punktierung_(Musik) – Hälfte des eigenen Werts – verified.
- „Takt (Musik)“, https://de.wikipedia.org/wiki/Takt_(Musik) – Taktangabe oben/unten, 2/4, 3/4, 4/4, 6/8
  zusammengesetzt – verified; die Betonung von 6/8 steht dort nicht ausdrücklich (unchecked; nur die Gruppierung
  in zwei Gruppen zu drei Achteln wird gelehrt).
- „Taktstrich“, https://de.wikipedia.org/wiki/Taktstrich – verified.
- Sechzehntel fehlen auf der Lernlandkarte: Vorschlag an lernapps/apps (`map/musik.yaml`) bleibt offen, diese Sitzung
  hat keinen Schreibzugriff dort.

## Explore

<!--
- Find out what the app teaches, for whom, how much and how it looks. Ask; write no code, run no `create`.
- An answer counts only in the creator's words under "Answers". At most 2 questions per message, one topic each.
-->

### Tasks

- [x] Check the start: the folder `.agents/skills/lernapps-app` exists (else stop and tell the creator that the folder
      was not started with `init`), and `git branch --show-current` prints `work` (else `git switch -c work`).
- [x] Load skill `lernapps-app`. Tell the creator in two sentences what a lernapps app is and where it will live: at
      their own address, free and public, and once listed as a copy on lernapps.net. Say that the technical part
      (GitHub) comes at the end and that you do it.
- [x] Interview: ask the topics "Goal" and "Learners" of "Answers".
- [x] Load skill `lernapps-map-assignment` and read the learning map of the subject as it says. The creator brings
      the content themselves (material, a word list, the pages): note under "Notes" which competencies of the map it
      covers. Else write the skill's assignment, with its story; the creator's yes answers the topics Content and
      Amount. A subject without a map: skip this task and say so.
- [x] Load skill `lernapps-exercise-patterns` and read its reference for the subject. Note under "Notes" how learners
      will practise what the goal names.
- [x] Choose the archetype as skill `lernapps-app` says: read the README of each archetype in question, then tell the
      creator in plain words what the chosen one can and cannot do. Write the archetype and its reason under "Key
      decisions".
- [x] Run `npx --no -- lernapps skills --archetype <name>` with the chosen archetype. It installs the archetype's
      skills and adds the archetype's tasks to this plan.
- [x] Load skill `lernapps-explainer-design`. An explainer has the look of the runtime: write "fixed by the
      archetype" under the topic "Look and feel" of "Answers".
- [x] Interview: ask every other topic of "Answers", in order. Leave out only a topic that an answer of the creator
      already covers, and note which answer. A topic nobody answered is asked once before you write an assumption
      with "(guess)".
- [x] Load skill `lernapps-content-research` and research as it says. Write under "Notes": the strand or subject, the
      competencies by chapter with their ids, the sources you opened.
- [x] Write under "Notes" which competency goes on which page and which pages form a chapter, as "Map the content" of
      skill `lernapps-explainer-design` says. Per page, name the prerequisites the app does not practise.
- [x] Write under "Notes", one line per competency: how learners get there (they derive it, they do not only read it
      off), and which misconception the feedback catches.
- [x] Write under "Notes" the scope: what is in, what is out and why, the data range (for example "all main-group
      elements", never a silent "1–20"), the languages.
- [ ] **Checkpoint:** research. Show in plain words: the strand or why none, the competencies by chapter, the didactic
      approach, the scope, every "(guess)", the sources and what is unchecked, the archetype and its reason. Stop and
      wait. Changes: change them, then ask again.

### Answers

<!-- The interview: per topic the creator's answer, in their words. Keep the topics. -->

- Goal: what learners do in the app, what they learn.
  - Aus dem Gespräch zur ersten App (`musik-tonhoehe-harmonik`): „Es geht um eine Lernkontrolle … 5. Notation
    6. Orchesteraufbau“; „frei üben und Probestest, also beides“; zu „Was gehört bei euch zu Notation?“: „weiss ich
    nicht“; zum Namensschema: zwei Apps, „ja, Namen stimmen, fang mit Notation an“.
- Learners: subject, school year, prior knowledge.
  - „Gymnasium, 8. Klasse, hessen, Musik“; „Vorwissen ist alles aus der Klasse 7. Was das ist, weiss ich nicht“.
- Model and focus: an app of the catalog (https://lernapps.net/apps/llms.txt) as model; what matters most (exercises,
  visualisations, game feel).
  - Abgedeckt durch die Antwort zur ersten App: „all diese Sachen sind mir wichtig.“ (Übungen, Bilder, Probetest wie
    die echte Lernkontrolle). Vorbild: `musik-tonhoehe-harmonik`, dieselbe Bauart (guess).
- Hurdles: misconceptions and mistakes of the learners; the creator's examples and experiments.
  - „passt so“ zu: Pausen verwechselt (Viertel/Achtel, ganze/halbe), Punkt falsch gerechnet (verdoppelt statt Hälfte dazu), Taktangabe falsch gelesen, 6/8 und 3/4 gleichgesetzt, Triolen-Achtel wie normale Achtel gezählt.
- Content: who writes it (creator, you, from sources); own material (worksheets, tests).
  - Auftrag aus der Lernlandkarte, bestätigt: „passt so, Sechzehntel mit aufnehmen“. Inhalte schreibe ich aus Quellen (wie bei der ersten App: „pass so“). Kein eigenes Material.
- Amount: how much content in the first version; what comes later.
  - Sechs Seiten wie im Auftrag, ein Kapitel: „passt so“.
- Languages: German only, or German and English. Never English only.
  - Abgedeckt durch die Antwort zur ersten App: „nur Deutsch“ – „pass so“.
- Look and feel: calm like a worksheet, or like a game (colours, praise, effects); dark mode.
  - fixed by the archetype (explainer: ruhig wie ein Arbeitsblatt, Dark Mode folgt dem Gerät)
- Terms: the creator's words for the main things in the app, used everywhere.
  - „passt so“ zu: ganze Note, halbe Note, Viertelnote, Achtelnote, Sechzehntelnote und Pausen gleichen Namens; „Taktart“, „Taktangabe“, „Taktstrich“; „Punktierung“, „Triole“; zählen „1 und 2 und“.
- Finding the app: what teachers and parents would search for.

## Plan

<!--
- Map the confirmed content onto the archetype. No new content questions: a gap in the content goes back to Explore.
- The creator confirms the plan in one read. After the yes you work on your own.
-->

### Tasks

- [ ] Map the content as "Map the content" of skill `lernapps-explainer-design` says, and write the result under
      "Content method".
- [ ] Choose a pattern per competency as skill `lernapps-exercise-patterns` says, and add it to "Content method".
- [ ] Add to "Content method" one line per page, as "Engagement" of skill `lernapps-explainer-design` says: the
      opening task, the change of activity, the reward, the story.
- [ ] Add the tasks of Code, each one a piece of work that ends in a commit. First the pattern: one complete page or
      screen, `npx --no -- lernapps plan add --at pattern "<task>"`. Then the others, one call each:
      `npx --no -- lernapps plan add --at pages "<task>"`. Each task says what it builds and what it shows.
- [ ] Draw a sketch of each screen, component or interactive exercise: a static SVG or image, or the steps with what
      learners see after each. Keep the files in `.vibe/sketches/`.
- [ ] Show the creator, short: goal, competencies by chapter, the Code tasks, the sketches, and the content method in
      plain words (what learners see and do, what the app cannot do). At most 2 questions.
- [ ] **Checkpoint:** confirm the plan and the content method. Stop and wait for an explicit yes. Changes: change
      them, then ask again.

### Content method

<!-- One line each: the patterns and where; the figures and how they are made; the data files; each component, what it
checks and what it cannot; how a later agent adds a chapter. It becomes the content guide in Code. -->
<!-- An explainer: per figure, model and component its learning action in two to four sentences
(`explainer-representation-explained`); per page its prerequisites the app does not practise, and which get a recap
page, which a link. -->

## Code

<!--
- Build the app, locally on `work`, on your own. After each task: `plan done`, then one commit with the work and this
  plan. The hooks check each commit; a failing check is fixed from its message, as skill `lernapps-cli` says.
- What you cannot decide: choose, write it under "Key decisions" with "(guess)", go on.
- The creator asks for a change: say your reading in one sentence first, then change every place it holds for
  (`feedback-applied-everywhere`).
-->

### Tasks

- [ ] Load skill `lernapps-cli`. Create the app as its section "Create" says:
      `npx --no -- lernapps create --archetype explainer`.
- [ ] Fill the content guide `.agents/skills/app-content/SKILL.md` from "Notes" and "Content method": every heading,
      no "FILL IN" left. Commit it before any content.
- [ ] Load skill `lernapps-explainer`.
- [ ] Load skill `lernapps-content-questions`. Read whole, with your file tool:
      `.agents/skills/lernapps-explainer/references/blocks.md` and
      `.agents/skills/lernapps-explainer/references/exercises.md`. A foreign language: also
      `references/language-tasks.md` in the same folder. A component in the plan: also `references/components.md`.
- [ ] Decide whether the app needs `scope`, as "`scope`" in
      `.agents/skills/lernapps-explainer/references/structure.md` says. Write the choice under "Key decisions".
<!-- tasks: pattern: the one page or screen that is the pattern for the others -->
- [ ] **Checkpoint:** the pattern page. Load skill `lernapps-learner-check` and do its learner check on the page. Fix
      what it finds. Then show the creator the page and ask whether the others may follow it. Stop and wait. A
      change: change the pattern first.
<!-- tasks: pages: the other pages or screens, after the pattern -->
- [ ] Update the content guide so that it describes the app as built (`app-content-matches`).
- [ ] Run `npx --no -- lernapps check` until it passes.
- [ ] Look at every screen and state, at 360 px and on a desktop, as "Look at the app" of skill `lernapps-cli` says.
      Compare each with its sketch.
- [ ] Do the whole-app check of skill `lernapps-learner-check`. Fix what it finds and write under "Notes" what you
      fixed.

## Commit

<!--
- Put the app on GitHub, publish it with the creator's yes, then list it. A push to `main` publishes.
- Open the pull requests (to `main`, to the catalog) without asking: they publish nothing.
- The creator asked to stop before publishing (a trial): stop here and say so.
-->

### Tasks

- [ ] Load skill `lernapps-explainer-self-assessment`. Add the self-assessment as it says, or write under "Key
      decisions" why the app has none. Commit.
- [ ] Load skill `lernapps-github`. Set up the repository and Pages as it says. Ask for the repository's name and
      every click only the creator can make, in one message.
- [ ] Push `work`, open the preview pull request and see its checks to green, as skill `lernapps-github` says.
- [ ] **Checkpoint:** publish. Show what the app does and the preview link from the comment "Vorschau der App". Ask
      whether it may go online. Stop and wait for the yes.
- [ ] Load skill `lernapps-commit`. Publish as skill `lernapps-github` says: `work` into `main` as one squash commit,
      the run of `Pages` watched to its end.
- [ ] Open the address the job `deploy` printed and confirm that the app shows. Never use a derived address.
- [ ] Load skill `lernapps-listing`. Write the entry under "Entry draft" as it says, with the creator's answer to
      "Finding the app".
- [ ] Fill the retrospective.
- [ ] Commit this plan on `main` and push it: the listing check and the review read it there.
- [ ] **Checkpoint:** list. Open the listing pull request as skill `lernapps-listing` says, without asking first: the
      pull request is the review. See it to "bestanden", then show the creator the pull request and its result.
- [ ] If the plan changed since its last push, commit it on `main` and push again.

### Entry draft

<!-- YAML valid against the entry schema the listing skill names. Only known values, never invented. -->

```yaml
```

## Retrospective

<!-- At the end of Commit, before the listing pull request. Facts, short, no names. Read by review and evals. -->

### Phases reached

<!-- Last phase completed, checkpoints passed. E.g. "commit; confirmed, published". -->

### Creator turns after the plan

<!-- Number of creator messages after the confirmation, topic of each. Target: at most 3. -->

### Where I had to guess

<!-- Each gap in plan, skills, messages or answers, and your choice. "None" if none. -->
