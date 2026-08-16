import { db } from "@/db";
import { news, notices, events, committee, gallery, siteSettings } from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import { siteDefaults } from "./site-config";

// All functions here fail soft: if DATABASE_URL isn't configured yet (e.g.
// during initial setup, or `next build` on a machine with no DB access),
// we return empty arrays / defaults instead of crashing the page.

export async function getSettings() {
  try {
    const rows = await db.select().from(siteSettings).limit(1);
    if (rows.length === 0) return siteDefaults;
    const s = rows[0];
    return {
      societyNameEn: s.societyNameEn || siteDefaults.societyNameEn,
      societyNameBn: s.societyNameBn || siteDefaults.societyNameBn,
      tagline: s.tagline || siteDefaults.tagline,
      taglineBn: s.taglineBn || siteDefaults.taglineBn,
      history: s.history || siteDefaults.history,
      historyBn: s.historyBn || siteDefaults.historyBn,
      mission: s.mission || siteDefaults.mission,
      missionBn: s.missionBn || siteDefaults.missionBn,
      vision: s.vision || siteDefaults.vision,
      visionBn: s.visionBn || siteDefaults.visionBn,
      address: s.address || siteDefaults.address,
      phone: s.phone || siteDefaults.phone,
      email: s.email || siteDefaults.email,
      officeHours: s.officeHours || siteDefaults.officeHours,
      facebookUrl: s.facebookUrl || siteDefaults.facebookUrl,
      instagramUrl: s.instagramUrl || siteDefaults.instagramUrl,
      youtubeUrl: s.youtubeUrl || siteDefaults.youtubeUrl,
      whatsappUrl: s.whatsappUrl || siteDefaults.whatsappUrl,
      mapEmbedUrl: s.mapEmbedUrl || siteDefaults.mapEmbedUrl,
      logoUrl: s.logoUrl || siteDefaults.logoUrl,
      heroImageUrl: s.heroImageUrl || siteDefaults.heroImageUrl,
    };
  } catch {
    return siteDefaults;
  }
}

export async function getLatestNews(limit = 5) {
  try {
    return await db
      .select()
      .from(news)
      .where(eq(news.published, true))
      .orderBy(desc(news.createdAt))
      .limit(limit);
  } catch {
    return [];
  }
}

export async function getAllNews() {
  try {
    return await db
      .select()
      .from(news)
      .where(eq(news.published, true))
      .orderBy(desc(news.createdAt));
  } catch {
    return [];
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    const rows = await db.select().from(news).where(eq(news.slug, slug)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getLatestNotices(limit = 5, homepageOnly = false) {
  try {
    const rows = await db.select().from(notices).orderBy(desc(notices.createdAt)).limit(limit);
    return homepageOnly ? rows.filter((n) => n.showOnHomepage) : rows;
  } catch {
    return [];
  }
}

export async function getAllNotices() {
  try {
    return await db.select().from(notices).orderBy(desc(notices.createdAt));
  } catch {
    return [];
  }
}

export async function getNoticeById(id: number) {
  try {
    const rows = await db.select().from(notices).where(eq(notices.id, id)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getUpcomingEvents(limit?: number) {
  try {
    const rows = await db.select().from(events).orderBy(asc(events.eventDate));
    const now = new Date();
    const upcoming = rows.filter((e) => new Date(e.eventDate) >= now);
    return limit ? upcoming.slice(0, limit) : upcoming;
  } catch {
    return [];
  }
}

export async function getPastEvents() {
  try {
    const rows = await db.select().from(events).orderBy(desc(events.eventDate));
    const now = new Date();
    return rows.filter((e) => new Date(e.eventDate) < now);
  } catch {
    return [];
  }
}

export async function getEventById(id: number) {
  try {
    const rows = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getCommittee() {
  try {
    return await db.select().from(committee).orderBy(asc(committee.sortOrder));
  } catch {
    return [];
  }
}

export async function getGallery() {
  try {
    return await db.select().from(gallery).orderBy(desc(gallery.createdAt));
  } catch {
    return [];
  }
}
