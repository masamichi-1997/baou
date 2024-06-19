<template>
  <div>index</div>
  {{ raceTrack }}
  {{ betType }}

  <ul>
    <template v-for="(condition, index) in trackConditions" :key="index">
      <li>
        {{ condition }}
      </li>
    </template>
  </ul>

  <ul>
    <template v-for="(course, index) in cources" :key="index">
      <li>
        {{ course }}
      </li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

import { trackConditionEnum, courceEnum } from "~/src/db/schema";

const raceTrack = ref();
const betType = ref();
const cources = courceEnum.enumValues;
const trackConditions = trackConditionEnum.enumValues;

const fetchRaceTrackAndBetType = async () => {
  const data = await $fetch("/api/recording-ticket", {
    method: "get",
  });

  raceTrack.value = data.raceTrack;
  betType.value = data.betType;
};

onMounted(async () => {
  await fetchRaceTrackAndBetType();
});
</script>
