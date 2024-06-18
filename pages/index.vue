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
  const { data } = await useFetch("/api/recording-ticket", {
    method: "get",
  });

  if (!data.value) return;

  raceTrack.value = data.value.raceTrack;
  betType.value = data.value.betType;
};

await fetchRaceTrackAndBetType();
</script>
