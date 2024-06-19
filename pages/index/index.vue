<template>
  <div>index</div>
  {{ raceTrack }}
  {{ betType }}
</template>

<script lang="ts" setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

const raceTrack = ref();
const betType = ref();

const fetchRaceTrackAndBetType = async () => {
  const data  = await $fetch("/api/recording-ticket", {
    method: "get",
  });

  raceTrack.value = data.raceTrack;
  betType.value = data.betType;
};

onMounted(async () => {
  await fetchRaceTrackAndBetType();
});
</script>
