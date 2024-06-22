<template>
  <div>index</div>

  <div>
    <h2>予想を追加する</h2>
    <div>
      <h3>開催地を選択してください</h3>
      <dropdown
        :options="raceTracks"
        @option-selected="handleRaceTrackSelected"
      />
    </div>
    <div>
      <h3>レースの距離を入力してください</h3>
      <input type="number" v-model="form.raceDetail.distance" />
    </div>
    <div>
      <h3>コースを選択してください</h3>
      <dropdown :options="cources" @option-selected="handleCourseSelected" />
    </div>
    <div>
      <h3>馬場の状態を選択してください</h3>
      <dropdown
        :options="trackConditions"
        @option-selected="handleTrackConditionSelected"
      />
    </div>

    <button popovertarget="betModal">馬券を追加</button>

    <ul>
      <template v-for="(bet, index) in form.bets" :key="index">
        <li>
          <p>方式 : {{ getBetTypeLabel(bet.betTypeId as number) }}</p>
          <p>点数 : {{ bet.ticket }}</p>
          <p>金額 : {{ bet.amount }}</p>
        </li>
      </template>
    </ul>

    <button @click="handleAddRecord">追加</button>

    <div popover id="betModal">
      <div>
        <h3>方式を選択してください</h3>
        <dropdown
          :options="betTypes"
          @option-selected="handleBetTypeSelected"
        />
      </div>
      <div>
        <h3>点数を入力してください</h3>
        <input type="number" v-model="bet.ticket" />
      </div>
      <div>
        <h3>金額を入力してください</h3>
        <input type="number" v-model="bet.amount" />
      </div>
      <button @click="handleAddBet">保存</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
});

import { trackConditionEnum, courceEnum } from "~/src/db/schema";
import { type trackConditionType, type courceType, type BetOptionType, type raceDetailType, type betType } from "~/src/db/schema";

type nullable<T> = {
  [P in keyof T]: T[P] | null;
};
type nullableRaceDetailType = nullable<raceDetailType>
type nullableBetType = nullable<betType>;
type nullableRegistrationType = {
  raceDetail: nullableRaceDetailType,
  bets: nullableBetType[],
}

// utils
const createOption = (label: string, value?: string | number) => {
  return { label, value: value ?? label };
};

const raceTracks = ref();
const betTypes: Ref<BetOptionType[]> = ref([]);
const cources = courceEnum.enumValues.map((val) => createOption(val));
const trackConditions = trackConditionEnum.enumValues.map((val) =>
  createOption(val)
);

const form: nullableRegistrationType = reactive<nullableRegistrationType>({
  raceDetail: {
    raceTrackId: null,
    distance: null,
    cource: null,
    trackCondition: null,
  },
  bets: [],
});

const bet: nullableBetType = reactive<nullableBetType>({
  raceTrackId: null,
  betTypeId: null,
  ticket: null,
  amount: null,
});

const handleRaceTrackSelected = (option: number) => {
  form.raceDetail.raceTrackId = option;
  bet.raceTrackId = option;
};

const handleCourseSelected = (option: courceType) => {
  form.raceDetail.cource = option;
};

const handleTrackConditionSelected = (option: trackConditionType) => {
  form.raceDetail.trackCondition = option;
};

const handleBetTypeSelected = (option: number) => {
  bet.betTypeId = option;
};

const handleAddBet = () => {
  const newBet = { ...bet };
  form.bets.push(newBet);

  bet.betTypeId = null;
  bet.ticket = null;
  bet.amount = null;
};

const getBetTypeLabel = (betTypeId: number) => {
  const betType = betTypes.value.find((betType) => betType.value === betTypeId);
  return betType?.label;
};

const fetchRaceTrackAndBetType = async (): Promise<void> => {
  const data = await $fetch("/api/recording-ticket", {
    method: "get",
  });

  raceTracks.value = data.raceTrack.map((val) =>
    createOption(val.name, val.id)
  );
  betTypes.value = data.betType.map((val) => createOption(val.name, val.id) as BetOptionType);
};

const handleAddRecord = async () => {
  console.log(form);
  const data = await $fetch("/api/recording-ticket/", {
    method: "post",
    body: {
      form,
    },
  });

  return data;
};

onMounted(() => {
  fetchRaceTrackAndBetType();
});
</script>
