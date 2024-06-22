import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const courceEnum = pgEnum("cource", ["芝", "ダート"]);
export const courceSchema = z.enum(courceEnum.enumValues);
export type courceType = z.infer<typeof courceSchema>;

export const trackConditionEnum = pgEnum("track_condition", [
  "良",
  "稍重",
  "重",
  "不良",
]);
export const trackConditionSchema = z.enum(trackConditionEnum.enumValues);
export type trackConditionType = z.infer<typeof trackConditionSchema>;

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
  raceTrackId: integer("race_track_id")
    .notNull()
    .references(() => raceTrackTable.id),
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

export const raceDetailSchema = createInsertSchema(raceDetailTable).pick({
  raceTrackId: true,
  distance: true,
  cource: true,
  trackCondition: true,
});

export type raceDetailType = z.infer<typeof raceDetailSchema>;

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

export const selectBetTypeSchema = createSelectSchema(betTypeTable).pick({
  id: true,
  name: true,
});

export type BetOptionType = {
  label: z.infer<typeof selectBetTypeSchema.shape.name>;
  value: z.infer<typeof selectBetTypeSchema.shape.id>;
};

export const betTable = pgTable("bet", {
  id: serial("id").primaryKey(),
  raceTrackId: integer("race_track_id")
    .notNull()
    .references(() => raceTrackTable.id),
  betTypeId: integer("bet_type_id")
    .notNull()
    .references(() => betTypeTable.id),
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

export const betSchema = createInsertSchema(betTable).pick({
  raceTrackId: true,
  betTypeId: true,
  ticket: true,
  amount: true,
});

export type betType = z.infer<typeof betSchema>;

export const payoutTable = pgTable("payout", {
  id: serial("id").primaryKey(),
  betId: integer("bet_id")
    .notNull()
    .references(() => betTable.id),
  payoutAmount: integer("payout_amount"),
  createdAt: timestamp("created_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .notNull()
    .default(sql`now()`),
});
