<script setup lang="ts">
// A rhythm on one line, drawn as SVG: notes with stems and flags, rests, dots, a time signature, bar lines, triplet
// brackets with "3", optional names below, an optional empty slot at the end ("?"), and optional tappable gaps between
// signs, which emit luecke with the index of the sign before the gap. Its geometry is in NotenZeile.ts.
import { computed } from "vue";
import { anordnung, faehnchen, HOEHE, LINIE, TAKTANGABE, triolen, VORNE } from "./NotenZeile.ts";

const props = defineProps<{
  /** The signs: value (1, 2, 4, 8, 16), rest or note, dotted, triplet. */
  zeichen: { wert: number; pause: boolean; punkt: boolean; triole: boolean }[];
  /** The time signature; 0 above means none. */
  oben: number;
  unten: number;
  /** Bar lines after these signs (index of the sign before the line). */
  taktstriche: number[];
  /** Whether an empty slot with "?" stands at the end. */
  luecke: boolean;
  /** Whether the gaps between signs can be tapped. */
  klickbar: boolean;
  /** What the drawing shows, for screen readers. */
  beschreibung: string;
  /** Names below the signs; for explanations, never in a task. */
  namen?: string[];
  /** The label of a gap button, with {n} for its number. */
  lueckenname?: string;
  /** Whether each sign takes room by its duration, so that rows of equal duration are equally wide. */
  proportional?: boolean;
}>();
const emit = defineEmits<{ luecke: [number] }>();

const mitTakt = computed(() => props.oben > 0);
const lage = computed(() => anordnung(props.zeichen, mitTakt.value, props.luecke, props.proportional ?? false));
const gruppen = computed(() => triolen(props.zeichen));
const x = (i: number) => lage.value.xs[i] ?? 0;
</script>

<template>
  <div class="noten-zeile">
    <svg
      :viewBox="`0 0 ${lage.breite} ${HOEHE}`"
      :style="{ maxWidth: `${lage.breite * 1.25}px` }"
      role="img"
      :aria-label="beschreibung"
    >
      <line :x1="VORNE - 8" :x2="lage.breite - 4" :y1="LINIE" :y2="LINIE" class="noten-zeile-linie" />
      <template v-if="mitTakt">
        <text :x="VORNE + TAKTANGABE / 2" :y="LINIE - 6" class="noten-zeile-takt">{{ oben }}</text>
        <text :x="VORNE + TAKTANGABE / 2" :y="LINIE + 18" class="noten-zeile-takt">{{ unten }}</text>
      </template>
      <g v-for="(z, i) in zeichen" :key="i">
        <template v-if="!z.pause">
          <ellipse
            :cx="x(i)"
            :cy="LINIE"
            rx="7"
            ry="5"
            :transform="`rotate(-20 ${x(i)} ${LINIE})`"
            :class="z.wert <= 2 ? 'noten-zeile-hohl' : 'noten-zeile-voll'"
          />
          <line
            v-if="z.wert > 1"
            :x1="x(i) + 6"
            :x2="x(i) + 6"
            :y1="LINIE - 1"
            :y2="LINIE - 34"
            class="noten-zeile-hals"
          />
          <path
            v-for="k in faehnchen(z.wert)"
            :key="k"
            :d="`M${x(i) + 6} ${LINIE - 34 + (k - 1) * 8} q10 6 8 18`"
            class="noten-zeile-strich"
          />
        </template>
        <template v-else>
          <rect v-if="z.wert === 1" :x="x(i) - 7" :y="LINIE" width="14" height="6" class="noten-zeile-voll" />
          <rect v-else-if="z.wert === 2" :x="x(i) - 7" :y="LINIE - 6" width="14" height="6" class="noten-zeile-voll" />
          <path
            v-else-if="z.wert === 4"
            :d="`M${x(i) - 3} ${LINIE - 20} l7 8 l-6 6 l7 8 q-8 -3 -6 6`"
            class="noten-zeile-strich"
          />
          <template v-else>
            <line :x1="x(i) + 4" :x2="x(i) - 2" :y1="LINIE - 14" :y2="LINIE + 10" class="noten-zeile-hals" />
            <g v-for="k in faehnchen(z.wert)" :key="k">
              <circle :cx="x(i) - 4" :cy="LINIE - 14 + (k - 1) * 7" r="2.6" class="noten-zeile-voll" />
              <path :d="`M${x(i) - 4} ${LINIE - 14 + (k - 1) * 7} q4 3 8 0`" class="noten-zeile-strich" />
            </g>
          </template>
        </template>
        <circle v-if="z.punkt" :cx="x(i) + 13" :cy="LINIE - 3" r="2.3" class="noten-zeile-voll" />
        <text v-if="namen && namen[i]" :x="x(i)" :y="HOEHE - 4" class="noten-zeile-name">{{ namen[i] }}</text>
      </g>
      <g v-for="([a, b], g) in gruppen" :key="`t${g}`">
        <path :d="`M${x(a) - 2} 14 v-6 H${x(b) + 10} v6`" class="noten-zeile-klammer" />
        <text :x="(x(a) + x(b) + 8) / 2" y="12" class="noten-zeile-drei">3</text>
      </g>
      <line
        v-for="t in taktstriche"
        :key="`s${t}`"
        :x1="lage.luecken[t] ?? 0"
        :x2="lage.luecken[t] ?? 0"
        :y1="LINIE - 22"
        :y2="LINIE + 22"
        class="noten-zeile-taktstrich"
      />
      <g v-if="lage.lueckeX !== undefined">
        <rect :x="lage.lueckeX" :y="LINIE - 30" width="44" height="40" rx="4" class="noten-zeile-luecke" />
        <text :x="lage.lueckeX + 22" :y="LINIE - 4" class="noten-zeile-frage">?</text>
        <line
          :x1="lage.lueckeX + 52"
          :x2="lage.lueckeX + 52"
          :y1="LINIE - 22"
          :y2="LINIE + 22"
          class="noten-zeile-taktstrich"
        />
      </g>
    </svg>
    <div v-if="klickbar" class="noten-zeile-luecken">
      <button
        v-for="(_, i) in zeichen.slice(0, -1)"
        :key="i"
        type="button"
        :aria-pressed="taktstriche.includes(i)"
        @click="emit('luecke', i)"
      >
        {{ (lueckenname ?? "{n}").replace("{n}", String(i + 1)) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.noten-zeile svg {
  display: block;
  width: 100%;
  color: var(--page-text);
}

.noten-zeile-linie {
  stroke: currentColor;
  stroke-width: 1;
  opacity: 0.6;
}

.noten-zeile-hohl {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}

.noten-zeile-voll {
  fill: currentColor;
}

.noten-zeile-hals {
  stroke: currentColor;
  stroke-width: 1.8;
}

.noten-zeile-strich {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
}

.noten-zeile-klammer {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.2;
}

.noten-zeile-drei,
.noten-zeile-takt,
.noten-zeile-frage,
.noten-zeile-name {
  fill: currentColor;
  text-anchor: middle;
}

.noten-zeile-drei {
  font-size: 11px;
  font-style: italic;
}

.noten-zeile-takt {
  font-size: 20px;
  font-weight: 700;
}

.noten-zeile-name {
  font-size: 10px;
}

.noten-zeile-frage {
  fill: var(--page-accent);
  font-size: 18px;
}

.noten-zeile-taktstrich {
  stroke: currentColor;
  stroke-width: 2;
}

.noten-zeile-luecke {
  fill: none;
  stroke: var(--page-accent);
  stroke-dasharray: 4 3;
}

.noten-zeile-luecken {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.noten-zeile-luecken button {
  min-width: 2.75rem;
  min-height: 2.75rem;
  border: 1px solid var(--page-accent);
  border-radius: 0.375rem;
  background: var(--page-surface);
  color: var(--page-accent);
  font: inherit;
}

.noten-zeile-luecken button[aria-pressed="true"] {
  background: var(--page-accent);
  color: var(--page-on-accent);
}
</style>
