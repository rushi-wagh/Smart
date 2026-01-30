import { computeSimilarity } from "./smartMerge.js";

export const computeMatchScore = (lost, found) => {
  let score = 0;

  const textA = `${lost.title} ${lost.description}`;
  const textB = `${found.title} ${found.description}`;

  const textScore = computeSimilarity(textA, textB);

  score += textScore * 0.4;

  if (lost.category === found.category) score += 0.3;

  if (
    lost.hostel === found.hostel &&
    lost.block === found.block
  ) {
    score += 0.2;
  }

  const timeDiff =
    Math.abs(new Date(lost.createdAt) - new Date(found.createdAt)) /
    (1000 * 60 * 60);

  if (timeDiff < 24) score += 0.1;

  return Math.min(score, 1);
};

export const matchLostItem = async (lostItem) => {
  const foundItems = await Item.find({
    status: "FOUND",
    $or: [
      { hostel: lostItem.hostel },
      { block: lostItem.block },
      { location: { $regex: lostItem.location, $options: "i" } },
    ],
  }).limit(50);

  console.log("FOUND ITEMS:", foundItems.length);

  const matches = foundItems
    .map((found) => {
      const textA = `${lostItem.title} ${lostItem.description}`;
      const textB = `${found.title} ${found.description}`;

      const confidence = computeMatchScore(lostItem, found);

      return { item: found, confidence };
    })
    .filter((m) => m.confidence > 0.35)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5);

  return matches;
};

