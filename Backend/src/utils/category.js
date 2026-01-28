const categoryKeywords = {
  electricity: [
    "light", "fan", "switch", "socket", "power", "voltage", "wire", "short circuit",
    "bulb", "electric", "current", "mcb"
  ],
  plumbing: [
    "water", "tap", "leak", "pipe", "flush", "toilet", "bathroom", "drain", "sink",
    "blockage", "sewage"
  ],
  cleaning: [
    "dirty", "garbage", "trash", "waste", "clean", "cleaning", "dust", "smell",
    "odor", "toilet dirty", "washroom dirty"
  ],
  security: [
    "theft", "steal", "robbery", "fight", "security", "guard", "gate", "lock",
    "camera", "cctv", "suspicious", "trespass"
  ],
  internet: [
    "wifi", "internet", "network", "slow", "disconnect", "router", "lan", "broadband",
    "connection", "speed"
  ],
  mess: [
    "food", "mess", "canteen", "meal", "breakfast", "lunch", "dinner", "taste",
    "quality", "hygiene", "cook", "chef", "kitchen"
  ]
};
function detectCategory(description) {
  if (!description) return "other";

  const text = description
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ");

  let scores = {};

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    scores[category] = 0;

    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        scores[category]++;
      }
    }
  }

  let bestCategory = "other";
  let maxScore = 0;

  for (const [category, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestCategory = category;
    }
  }

  return maxScore > 0 ? bestCategory : "other";
}
export { detectCategory };