import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const courceEnum = pgEnum("cource", ["芝", "ダート"]);

export const trackConditionEnum = pgEnum("track_condition", [
  "良",
  "稍重",
  "重",
  "不良",
]);

export const raceTrackTable = pgTable("race_track", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
});

export const raceDetailTable = pgTable("race_detail", {
  id: serial("id").primaryKey(),
  raceTrackId: integer("race_track_id").references(() => raceTrackTable.id),
  distance: integer("distance"),
  cource: courceEnum("cource"),
  trackCondition: trackConditionEnum("track_condition"),
  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
});

export const betTypeTable = pgTable("bet_type", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
});

export const betTable = pgTable("bet", {
  id: serial("id").primaryKey(),
  raceTrackId: integer("race_track_id").references(() => raceTrackTable.id),
  betTypeId: integer("bet_type_id").references(() => betTypeTable.id),
  ticket: integer("ticket").notNull(),
  amount: integer("amount").notNull(),
  isWin: boolean("is_win").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
});

export const payoutTable = pgTable("payout", {
  id: serial("id").primaryKey(),
  betId: integer("bet_id").references(() => betTable.id),
  payoutAmount: integer("payout_amount"),
  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
});
