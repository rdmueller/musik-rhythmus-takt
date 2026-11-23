<script setup lang="ts">
// One note or rest sign for the task of the number seed; the learner names it with buttons for the value, note or
// rest and, if asked, the dot. It emits the name as the answer; the explainer draws "Prüfen". Logic: ZeichenLesen.ts.
import { computed, ref } from "vue";
import { name, type Wert } from "./Rhythmus.ts";
import { beschreibung, generate, wertnamen } from "./ZeichenLesen.ts";
import NotenZeile from "./NotenZeile.vue";

const props = defineProps<{
  aufgabe: string;
  werte: number[];
  art: "noten" | "pausen" | "beides";
  punkt: boolean;
  mistakes: string[];
  /** The labels of the button groups and of the note/rest and dot buttons. */
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
const emit = defineEmits<{ answer: [string | undefined] }>();

const aktuell = computed(() => generate(props.seed, props));
const wahlWert = ref<Wert | undefined>();
const wahlPause = ref<boolean | undefined>(props.art === "beides" ? undefined : props.art === "pausen");
const wahlPunkt = ref<boolean | undefined>(props.punkt ? undefined : false);

function melden(): void {
  emit(
    "answer",
    wahlWert.value === undefined || wahlPause.value === undefined || wahlPunkt.value === undefined
      ? undefined
      : name({ wert: wahlWert.value, pause: wahlPause.value, punkt: wahlPunkt.value }),
  );
}
function setze(art: "wert" | "pause" | "punkt", wertNeu: number | boolean): void {
  if (art === "wert") wahlWert.value = wertNeu as Wert;
  if (art === "pause") wahlPause.value = wertNeu as boolean;
  if (art === "punkt") wahlPunkt.value = wertNeu as boolean;
  melden();
}
</script>

<template>
  <div class="zeichen-lesen">
    <p>{{ aufgabe }}</p>
    <NotenZeile
      :zeichen="[aktuell.zeichen]"
      :oben="0"
      :unten="0"
      :taktstriche="[]"
      :luecke="false"
      :klickbar="false"
      :beschreibung="beschreibung(aktuell.zeichen)"
    />
    <fieldset class="zeichen-lesen-gruppe">
      <legend>{{ beschriftung.wert }}</legend>
      <button
        v-for="w in wertnamen(werte)"
        :key="w.wert"
        type="button"
        :aria-pressed="wahlWert === w.wert"
        @click="setze('wert', w.wert)"
      >
        {{ w.text }}
      </button>
    </fieldset>
    <fieldset v-if="art === 'beides'" class="zeichen-lesen-gruppe">
      <legend>{{ beschriftung.art }}</legend>
      <button type="button" :aria-pressed="wahlPause === false" @click="setze('pause', false)">
        {{ beschriftung.note }}
      </button>
      <button type="button" :aria-pressed="wahlPause === true" @click="setze('pause', true)">
        {{ beschriftung.pause }}
      </button>
    </fieldset>
    <fieldset v-if="punkt" class="zeichen-lesen-gruppe">
      <legend>{{ beschriftung.punkt }}</legend>
      <button type="button" :aria-pressed="wahlPunkt === false" @click="setze('punkt', false)">
        {{ beschriftung.ohnePunkt }}
      </button>
      <button type="button" :aria-pressed="wahlPunkt === true" @click="setze('punkt', true)">
        {{ beschriftung.mitPunkt }}
      </button>
    </fieldset>
  </div>
</template>

<style scoped>
.zeichen-lesen :deep(svg) {
  max-width: 10rem !important;
}

.zeichen-lesen-gruppe {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 0;
  padding: 0;
  border: 0;
}

.zeichen-lesen-gruppe legend {
  margin-bottom: 0.5rem;
  color: var(--page-muted);
}

.zeichen-lesen-gruppe button {
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--page-accent);
  border-radius: 0.375rem;
  background: var(--page-surface);
  color: var(--page-accent);
  font: inherit;
}

.zeichen-lesen-gruppe button[aria-pressed="true"] {
  background: var(--page-accent);
  color: var(--page-on-accent);
}
</style>
