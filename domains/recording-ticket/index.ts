import { selectBedType, selectRaceTrack } from "./query";

export const readRaceTrack = () => {
  return selectRaceTrack();
};

export const readBedType = () => {
  return selectBedType();
};

export const getTicketRegistrationInfo = async () => {
  try {
    const raceTrack = await readRaceTrack();
    const bedType = await readBedType();

    return { raceTrack, bedType };
  } catch (error) {
    console.error("チケット登録情報の取得中にエラーが発生しました:", error);
    throw new Error("チケット登録情報の取得に失敗しました");
  }
};
