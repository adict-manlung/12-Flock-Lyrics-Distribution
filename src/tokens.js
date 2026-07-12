export const T = {
  ink:      "#181511",
  ink2:     "#211D17",
  ink3:     "#2A2520",
  paper:    "#F3EFE6",
  paperDim: "#B7AF9F",
  paperMid: "#D4CFC4",
  gold:     "#E0A526",
  goldDim:  "rgba(224,165,38,0.18)",
  moss:     "#5C8A62",
  mossDim:  "rgba(92,138,98,0.16)",
  rose:     "#C1583F",
  roseDim:  "rgba(193,88,63,0.18)",
  sky:      "#4A8FA8",
  skyDim:   "rgba(74,143,168,0.16)",
  line:     "#2E2920",
  line2:    "#3A342A",
};

export const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
`;

export const PLATFORMS = [
  { name: "Spotify",       color: "#1DB954", desc: "Stream worldwide" },
  { name: "Apple Music",   color: "#FC3C44", desc: "iOS & Mac ecosystem" },
  { name: "TikTok",        color: "#69C9D0", desc: "Viral short-form" },
  { name: "WhatsApp",      color: "#25D366", desc: "Shared as status" },
  { name: "Instagram",     color: "#E1306C", desc: "Reels & Stories" },
  { name: "YouTube Music", color: "#FF0000", desc: "World's largest" },
  { name: "Amazon Music",  color: "#00A8E0", desc: "Alexa & Prime" },
  { name: "Deezer",        color: "#FEAA2D", desc: "Global coverage" },
];

export const COUNTRIES = [
  "Kenya","Nigeria","United States","United Kingdom","South Africa",
  "Ghana","Uganda","Tanzania","Rwanda","Ethiopia","Cameroon","Zimbabwe",
  "Zambia","Senegal","Côte d'Ivoire","Other",
];

export const STATUS_STYLES = {
  Live:    { bg: "rgba(92,138,98,0.16)",   fg: "#5C8A62" },
  Sending: { bg: "rgba(224,165,38,0.18)",  fg: "#E0A526" },
  Blocked: { bg: "rgba(193,88,63,0.18)",   fg: "#C1583F" },
  Draft:   { bg: "rgba(183,175,159,0.14)", fg: "#B7AF9F" },
};

export const PLANS = [
  {
    key: "free", name: "Free flight", price: "$0", sub: "one time",
    line: "Your first release, on the house.",
    features: ["1 lyric or track distribution","All 8 platforms","Basic analytics","Email confirmation"],
    footnote: "Auto-upgrades to Standard once your free release ships.",
  },
  {
    key: "standard", name: "Standard", price: "$47.88", sub: "billed yearly · ~$3.99/mo",
    line: "One annual charge — no monthly surprises.",
    features: ["Unlimited releases","All 8 platforms","Claim past catalog","Full analytics","Email confirmations","Priority support"],
    featured: true,
  },
  {
    key: "flock", name: "Flock Unlimited", price: "$119.88", sub: "billed yearly · ~$9.99/mo",
    line: "For labels and artists releasing often.",
    features: ["Unlimited releases","All 8 platforms","Claim past catalog","Priority delivery","Royalty payouts","Dedicated account manager","Team access (up to 5)"],
  },
];

export const inputStyle = {
  width: "100%", background: "#181511", border: "1px solid #3A342A",
  borderRadius: 6, padding: "11px 14px", color: "#F3EFE6", fontSize: 14,
  fontFamily: "Inter, sans-serif", boxSizing: "border-box",
  transition: "border-color 0.15s",
};

export const SEED_RELEASES = [
  { id: "r1", title: "Low Tide",    artist: "Coastal Static", status: "Live",    platforms: 8, date: "2026-06-12", cover: "LT" },
  { id: "r2", title: "Halogen",     artist: "Coastal Static", status: "Sending", platforms: 5, date: "2026-07-28", cover: "HG" },
  { id: "r3", title: "Paper Moths", artist: "June Arbor",     status: "Blocked", platforms: 2, date: "2026-08-02", cover: "PM" },
];

export const UNCLAIMED = [
  { id: "u1", title: "Nightbus",  artist: "unknown uploader", platform: "TikTok",    plays: "812K" },
  { id: "u2", title: "Salt Line", artist: "unknown uploader", platform: "Instagram", plays: "44K"  },
];
