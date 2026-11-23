<script setup lang="ts">
// A row of several bars without bar lines for the task of the number seed; the learner taps "nach Zeichen n" to set
// or remove a bar line. It emits the lines as the answer; the explainer draws "Prüfen". Logic: TaktstricheSetzen.ts.
import { computed, ref } from "vue";
import { generate, zeileInWorten } from "./TaktstricheSetzen.ts";
import NotenZeile from "./NotenZeile.vue";

const props = defineProps<{
  aufgabe: string;
  takte: string[];
  anzahl: number;
  punkt: boolean;
  triole: boolean;
  mistakes: string[];
  /** The label of a gap button, with {n} for the number of the sign before it. */
  lueckenname: string;
  seed: number;
  checked: boolean;
}>();
const emit = defineEmits<{ answer: [number[] | undefined] }>();

const aktuell = computed(() => generate(props.seed, props));
const striche = ref<number[]>([]);

function umschalten(i: number): void {
  striche.value = striche.value.includes(i)
    ? striche.value.filter((x) => x !== i)
    : [...striche.value, i].sort((a, b) => a - b);
  emit("answer", striche.value.length === 0 ? undefined : [...striche.value]);
}
</script>

<template>
  <div class="taktstriche-setzen">
    <p>{{ aufgabe }}</p>
    <NotenZeile
      :zeichen="aktuell.zeichen"
      :oben="aktuell.oben"
      :unten="aktuell.unten"
      :taktstriche="striche"
      :luecke="false"
      :klickbar="true"
      :lueckenname="lueckenname"
      :beschreibung="zeileInWorten(aktuell)"
      :namen="aktuell.zeichen.map((_, i) => String(i + 1))"
      @luecke="umschalten"
    />
  </div>
</template>
