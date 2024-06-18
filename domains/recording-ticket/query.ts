import { db } from "~/src/db";

export const selectRaceTrack = () => {
  return db.query.raceTrackTable.findMany();
};

export const selectBetType = () => {
  return db.query.betTypeTable.findMany();
};
