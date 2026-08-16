// Fallback content shown if the database hasn't been seeded yet, and
// used as defaults when settings fields are empty. Once the admin edits
// Site Settings in the dashboard, DB values take over automatically.
export const siteDefaults = {
  societyNameEn: "Kohela Muslim Shomitti",
  societyNameBn: "কোহেলা মুসলিম সমিতি",
  tagline:
    "The official information hub of our community — news, notices, events, and history in one place.",
  taglineBn:
    "আমাদের সমাজের সরকারি তথ্যকেন্দ্র — সংবাদ, নোটিশ, ইভেন্ট এবং ইতিহাস একসাথে।",
  history:
    "Kohela Muslim Shomitti was formed by the residents of Kohela to serve the community's religious, social, and welfare needs. For years, information was shared by word of mouth, mosque announcements, and messaging groups — this website now brings it all into one official place.",
  historyBn:
    "কোহেলা মুসলিম সমিতি কোহেলার বাসিন্দাদের দ্বারা গঠিত হয়েছে সমাজের ধর্মীয়, সামাজিক ও কল্যাণমূলক প্রয়োজন মেটানোর জন্য। এই ওয়েবসাইট এখন সকল তথ্য একটি সরকারি স্থানে নিয়ে এসেছে।",
  mission:
    "To serve the Kohela community through transparent communication, welfare activities, and the preservation of our shared history and values.",
  missionBn:
    "স্বচ্ছ যোগাযোগ, কল্যাণমূলক কার্যক্রম এবং আমাদের অভিন্ন ইতিহাস ও মূল্যবোধ সংরক্ষণের মাধ্যমে কোহেলা সমাজের সেবা করা।",
  vision:
    "A well-informed, united, and welfare-focused community where every member has easy access to official information.",
  visionBn:
    "একটি সুপরিচিত, ঐক্যবদ্ধ এবং কল্যাণমুখী সমাজ, যেখানে প্রতিটি সদস্যের সরকারি তথ্যে সহজ প্রবেশাধিকার রয়েছে।",
  address: "Kohela, Bangladesh",
  phone: "+880 1XXX-XXXXXX",
  email: "info@kohelashomitti.org",
  officeHours: "Saturday–Thursday, 9:00 AM – 5:00 PM",
  facebookUrl: "",
  instagramUrl: "",
  youtubeUrl: "",
  whatsappUrl: "",
  mapEmbedUrl: "",
  logoUrl: "",
  heroImageUrl: "",
};

export const navLinks = [
  { href: "/", key: "nav_home" as const },
  { href: "/about", key: "nav_about" as const },
  { href: "/committee", key: "nav_committee" as const },
  { href: "/news", key: "nav_news" as const },
  { href: "/notices", key: "nav_notices" as const },
  { href: "/events", key: "nav_events" as const },
  { href: "/gallery", key: "nav_gallery" as const },
  { href: "/contact", key: "nav_contact" as const },
];
