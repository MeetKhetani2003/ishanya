import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/** Generic CMS store: projects, developers, locations, posts, testimonials, gallery. */
export const cmsEntries = pgTable(
  "cms_entries",
  {
    id: serial("id").primaryKey(),
    type: text("type").notNull(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    summary: text("summary").default("").notNull(),
    image: text("image").default("").notNull(),
    featured: boolean("featured").default(false).notNull(),
    published: boolean("published").default(true).notNull(),
    position: integer("position").default(0).notNull(),
    data: jsonb("data").$type<Record<string, unknown>>().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [uniqueIndex("cms_entries_type_slug_idx").on(t.type, t.slug)],
);

/** Enquiries captured across the site (concierge, private visit, project pages). */
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  interest: text("interest").default("").notNull(),
  intent: text("intent").default("Consultation").notNull(),
  budget: text("budget").default("").notNull(),
  preferredDate: text("preferred_date").default("").notNull(),
  message: text("message").default("").notNull(),
  source: text("source").default("website").notNull(),
  status: text("status").default("New").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/** Single-row site settings / SEO defaults. */
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").default("").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type CmsEntry = typeof cmsEntries.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
