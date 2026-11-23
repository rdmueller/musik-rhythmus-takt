<script setup lang="ts">
// A bar with its time signature for the task of the number seed, its last sign missing; the learner chooses the
// missing value, note or rest, dotted or not. It emits the choice as the answer; the explainer draws "Prüfen".
// Logic: TaktErgaenzen.ts.
import { computed, ref } from "vue";
import { WERTE, WERTNAME, type Wert } from "./Rhythmus.ts";
import { generate, taktInWorten } from "./TaktErgaenzen.ts";
import NotenZeile from "./NotenZeile.vue";

const props = defineProps<{
  aufgabe: string;
  takte: string[];
  punkt: boolean;
  triole: boolean;
  mistakes: string[];
  /** The labels of the button groups. */
  beschriftung: {
    wert: string;
    art: string;
    note: string;
    pause: string;
    punkt: string;
    ohnePunkt: string;
    mitPunkt: string;
  };
  seed: number;
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [{ wert: number; punkt: boolean; pause: boolean } | undefined] }>();

const aktuell = computed(() => generate(props.seed, props));
const wahlWert = ref<Wert | undefined>();
const wahlPause = ref(false);
const wahlPunkt = ref(false);

function melden(): void {
  emit(
    "answer",
    wahlWert.value === undefined ? undefined : { wert: wahlWert.value, punkt: wahlPunkt.value, pause: wahlPause.value },
  );
}
function setzeWert(w: Wert): void {
  wahlWert.value = w;
  melden();
}
function setzePause(p: boolean): void {
  wahlPause.value = p;
  melden();
}
function setzePunkt(p: boolean): void {
  wahlPunkt.value = p;
  melden();
}
</script>

<template>
  <div class="takt-ergaenzen">
    <p>{{ aufgabe }}</p>
    <NotenZeile
      :zeichen="aktuell.zeichen"
      :oben="aktuell.oben"
      :unten="aktuell.unten"
      :taktstriche="[]"
      :luecke="true"
      :klickbar="false"
      :beschreibung="taktInWorten(aktuell)"
    />
    <fieldset class="takt-ergaenzen-gruppe">
      <legend>{{ beschriftung.wert }}</legend>
      <button v-for="w in WERTE" :key="w" type="button" :aria-pressed="wahlWert === w" @click="setzeWert(w)">
        {{ WERTNAME[w] }}
      </button>
    </fieldset>
    <fieldset class="takt-ergaenzen-gruppe">
      <legend>{{ beschriftung.art }}</legend>
      <button type="button" :aria-pressed="!wahlPause" @click="setzePause(false)">{{ beschriftung.note }}</button>
      <button type="button" :aria-pressed="wahlPause" @click="setzePause(true)">{{ beschriftung.pause }}</button>
    </fieldset>
    <fieldset v-if="punkt" class="takt-ergaenzen-gruppe">
      <legend>{{ beschriftung.punkt }}</legend>
      <button type="button" :aria-pressed="!wahlPunkt" @click="setzePunkt(false)">{{ beschriftung.ohnePunkt }}</button>
      <button type="button" :aria-pressed="wahlPunkt" @click="setzePunkt(true)">{{ beschriftung.mitPunkt }}</button>
    </fieldset>
  </div>
</template>

<style scoped>
.takt-ergaenzen-gruppe {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
  padding: 0;
  border: 0;
}

.takt-ergaenzen-gruppe legend {
  margin-bottom: 0.5rem;
  color: var(--page-muted);
}

.takt-ergaenzen-gruppe button {
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--page-accent);
  border-radius: 0.375rem;
  background: var(--page-surface);
  color: var(--page-accent);
  font: inherit;
}

.takt-ergaenzen-gruppe button[aria-pressed="true"] {
  background: var(--page-accent);
  color: var(--page-on-accent);
}
</style>
