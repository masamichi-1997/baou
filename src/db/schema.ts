import { sql } from "drizzle-orm";
import {
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

export const raceTrackTable = pgTable(
  "race_track",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .notNull()
      .default(sql`now()`)
      .$onUpdate(() => sql`now()`),
  },
  (table) => {
    return {
      idIdx: index("id_idx").on(table.id),
    };
  }
);

export const reaceDetailTable = pgTable("race_detail", {
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
    .default(sql`now()`)
    .$onUpdate(() => sql`now()`),
});
