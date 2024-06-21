import { db } from "~/src/db";
import {
  betTable,
  raceDetailTable,
  type betType,
  type raceDetailType,
} from "~/src/db/schema";

export const insertRaceDetail = (raceDetail: raceDetailType) => {
  return db.insert(raceDetailTable).values(raceDetail).returning();
};

export const insertBet = (bet: betType) => {
  return db.insert(betTable).values(bet).returning();
};
