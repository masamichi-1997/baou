<template>
  <div>index</div>

  <dropdown :options="raceTracks" />
  <dropdown :options="betTypes" />
  <dropdown :options="trackConditions" />
  <dropdown :options="cources" />
</template>

<script lang="ts" setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

import { trackConditionEnum, courceEnum } from "~/src/db/schema";

// utils
const createOption = (label: string, value?: string | number) => {
  return { label, value: value ?? label };
};

const raceTracks = ref();
const betTypes = ref();
const cources = courceEnum.enumValues.map((val) => createOption(val));
const trackConditions = trackConditionEnum.enumValues.map((val) =>
  createOption(val)
);

const fetchRaceTrackAndBetType = async () => {
  const data = await $fetch("/api/recording-ticket", {
    method: "get",
  });

  raceTracks.value = data.raceTrack.map((val) =>
    createOption(val.name, val.id)
  );
  betTypes.value = data.betType.map((val) => 
    createOption(val.name, val.id)
  );
};

onMounted(async () => {
  await fetchRaceTrackAndBetType();
});
</script>
