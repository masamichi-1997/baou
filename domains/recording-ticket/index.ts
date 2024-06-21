import type { betType, raceDetailType } from "~/src/db/schema";
import { insertBet, insertRaceDetail } from "./command";
import { selectBetType, selectRaceTrack } from "./query";

export type registrationType = {
  raceDetail: raceDetailType;
  bets: betType[];
};

export const createRaceDetail = (raceDetail: raceDetailType) => {
  return insertRaceDetail(raceDetail);
};

export const createBet = (bet: betType) => {
  return insertBet(bet);
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

export const registerBetRecord = async (registration: registrationType) => {
  try {
    const { raceDetail, bets } = registration;

    await Promise.all([
      createRaceDetail(raceDetail),
      () => {
        bets.map(async (bet) => {
          await createBet(bet);
        });
      },
    ]);
  } catch (error) {
    console.error("登録中にエラーが発生しました:", error);
    throw new Error("レコードの登録に失敗しました");
  }
};
