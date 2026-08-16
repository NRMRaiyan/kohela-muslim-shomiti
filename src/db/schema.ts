import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

// ---------- Admin users ----------
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 30 }).notNull().default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------- News & Announcements ----------
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 250 }).notNull(),
  titleBn: varchar("title_bn", { length: 250 }),
  shortDescription: text("short_description").notNull(),
  shortDescriptionBn: text("short_description_bn"),
  content: text("content").notNull(),
  contentBn: text("content_bn"),
  featuredImage: text("featured_image"),
  author: varchar("author", { length: 120 }),
  attachmentUrl: text("attachment_url"),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ---------- Notices ----------
export const notices = pgTable("notices", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 250 }).notNull(),
  titleBn: varchar("title_bn", { length: 250 }),
  description: text("description").notNull(),
  descriptionBn: text("description_bn"),
  attachmentUrl: text("attachment_url"),
  publishedBy: varchar("published_by", { length: 120 }),
  showOnHomepage: boolean("show_on_homepage").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------- Events ----------
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 250 }).notNull(),
  titleBn: varchar("title_bn", { length: 250 }),
  description: text("description").notNull(),
  descriptionBn: text("description_bn"),
  eventDate: timestamp("event_date").notNull(),
  location: varchar("location", { length: 250 }),
  image: text("image"),
  registrationInfo: text("registration_info"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------- Committee members ----------
export const committee = pgTable("committee", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  nameBn: varchar("name_bn", { length: 150 }),
  position: varchar("position", { length: 120 }).notNull(),
  positionBn: varchar("position_bn", { length: 120 }),
  photo: text("photo"),
  bio: text("bio"),
  phone: varchar("phone", { length: 40 }),
  email: varchar("email", { length: 160 }),
  group: varchar("group", { length: 30 }).notNull().default("executive"), // "executive" | "member"
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------- Gallery ----------
export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  caption: varchar("caption", { length: 250 }),
  captionBn: varchar("caption_bn", { length: 250 }),
  category: varchar("category", { length: 80 }).notNull().default("General"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------- Contact messages (from the public contact form) ----------
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 150 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ---------- Site settings (single row) ----------
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  societyNameEn: varchar("society_name_en", { length: 200 }).notNull(),
  societyNameBn: varchar("society_name_bn", { length: 200 }),
  tagline: text("tagline"),
  taglineBn: text("tagline_bn"),
  history: text("history"),
  historyBn: text("history_bn"),
  mission: text("mission"),
  missionBn: text("mission_bn"),
  vision: text("vision"),
  visionBn: text("vision_bn"),
  address: text("address"),
  phone: varchar("phone", { length: 60 }),
  email: varchar("email", { length: 160 }),
  officeHours: varchar("office_hours", { length: 200 }),
  facebookUrl: text("facebook_url"),
  instagramUrl: text("instagram_url"),
  youtubeUrl: text("youtube_url"),
  whatsappUrl: text("whatsapp_url"),
  mapEmbedUrl: text("map_embed_url"),
  logoUrl: text("logo_url"),
  heroImageUrl: text("hero_image_url"),
});
