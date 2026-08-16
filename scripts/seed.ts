import "dotenv/config";
import { db } from "../src/db";
import {
  adminUsers,
  news,
  notices,
  events,
  committee,
  gallery,
  siteSettings,
} from "../src/db/schema";
import { hashPassword } from "../src/lib/auth";
import { siteDefaults } from "../src/lib/site-config";

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@kohelashomitti.org";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";

  console.log("Seeding database...");

  // Admin user
  const existingAdmin = await db.select().from(adminUsers);
  if (existingAdmin.length === 0) {
    await db.insert(adminUsers).values({
      name: "Committee Admin",
      email: adminEmail,
      passwordHash: await hashPassword(adminPassword),
      role: "admin",
    });
    console.log(`Created admin user: ${adminEmail} / ${adminPassword}`);
  } else {
    console.log("Admin user already exists, skipping.");
  }

  // Site settings
  const existingSettings = await db.select().from(siteSettings);
  if (existingSettings.length === 0) {
    await db.insert(siteSettings).values(siteDefaults);
    console.log("Created default site settings.");
  }

  // Sample news
  const existingNews = await db.select().from(news);
  if (existingNews.length === 0) {
    await db.insert(news).values([
      {
        slug: "website-launched",
        title: "Kohela Muslim Shomitti launches its official website",
        titleBn: "কোহেলা মুসলিম সমিতির নতুন ওয়েবসাইট চালু",
        shortDescription:
          "We are pleased to announce the launch of our official website for news, notices, and events.",
        shortDescriptionBn:
          "সংবাদ, নোটিশ এবং ইভেন্টের জন্য আমাদের নতুন ওয়েবসাইট চালু হয়েছে।",
        content:
          "The committee is pleased to announce the launch of the official Kohela Muslim Shomitti website. From now on, all news, notices, and event information will be published here first. Members are encouraged to check the site regularly and to share it with others in the community.",
        contentBn:
          "কমিটি আনন্দের সাথে জানাচ্ছে যে কোহেলা মুসলিম সমিতির সরকারি ওয়েবসাইট চালু হয়েছে। এখন থেকে সকল সংবাদ, নোটিশ এবং ইভেন্টের তথ্য এখানে প্রথমে প্রকাশিত হবে।",
        author: "Committee Secretary",
        published: true,
      },
    ]);
    console.log("Created sample news item.");
  }

  // Sample notice
  const existingNotices = await db.select().from(notices);
  if (existingNotices.length === 0) {
    await db.insert(notices).values([
      {
        title: "Monthly committee meeting schedule",
        titleBn: "মাসিক কমিটি সভার সময়সূচি",
        description:
          "The monthly committee meeting will be held on the first Friday of every month after Jumu'ah prayer. All members are requested to attend.",
        descriptionBn:
          "প্রতি মাসের প্রথম শুক্রবার জুমার নামাজের পর মাসিক কমিটি সভা অনুষ্ঠিত হবে। সকল সদস্যকে উপস্থিত থাকার অনুরোধ করা হচ্ছে।",
        publishedBy: "Committee Secretary",
        showOnHomepage: true,
      },
    ]);
    console.log("Created sample notice.");
  }

  // Sample event
  const existingEvents = await db.select().from(events);
  if (existingEvents.length === 0) {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    await db.insert(events).values([
      {
        title: "Annual General Meeting",
        titleBn: "বার্ষিক সাধারণ সভা",
        description:
          "All members are invited to the Annual General Meeting to discuss the year's activities and upcoming plans.",
        descriptionBn: "বার্ষিক কার্যক্রম ও আসন্ন পরিকল্পনা নিয়ে আলোচনার জন্য সকল সদস্যকে আমন্ত্রণ জানানো হচ্ছে।",
        eventDate: nextMonth,
        location: "Kohela Central Mosque premises",
      },
    ]);
    console.log("Created sample event.");
  }

  // Sample committee member
  const existingCommittee = await db.select().from(committee);
  if (existingCommittee.length === 0) {
    await db.insert(committee).values([
      {
        name: "Md. Committee President",
        nameBn: "মোঃ কমিটি সভাপতি",
        position: "President",
        positionBn: "সভাপতি",
        group: "executive",
        sortOrder: 1,
      },
      {
        name: "Md. Committee Secretary",
        nameBn: "মোঃ কমিটি সম্পাদক",
        position: "General Secretary",
        positionBn: "সাধারণ সম্পাদক",
        group: "executive",
        sortOrder: 2,
      },
    ]);
    console.log("Created sample committee members.");
  }

  console.log("Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
