import { insertBet, insertRaceDetail } from "./command";
import { selectBetType, selectRaceTrack } from "./query";

export const createRaceDetail = () => {
  return insertRaceDetail();
};

export const createBet = () => {
  return insertBet();
};

export const readRaceTrack = () => {
  return selectRaceTrack();
};

export const readBetType = () => {
  return selectBetType();
};

export const getTicketRegistrationInfo = async () => {
  try {
    const raceTrack = await readRaceTrack();
    const betType = await readBetType();

    return { raceTrack, betType };
  } catch (error) {
    console.error("チケット登録情報の取得中にエラーが発生しました:", error);
    throw new Error("チケット登録情報の取得に失敗しました");
  }
};
