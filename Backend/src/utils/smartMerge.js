import natural from "natural";
import sw from "stopword";

const TfIdf = natural.TfIdf;

export const cleanText = (text) => {
  return sw
    .removeStopwords(
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .split(" ")
    )
    .join(" ");
};

export const computeSimilarity = (text1, text2) => {
  const t1 = cleanText(text1);
  const t2 = cleanText(text2);

  const cosine = tfidfCosine(t1, t2);
  const jaccard = jaccardSimilarity(t1, t2);
  const charSim = charSimilarity(t1, t2);

  return 0.5 * cosine + 0.3 * jaccard + 0.2 * charSim;
};

const tfidfCosine = (t1, t2) => {
  const tfidf = new TfIdf();
  tfidf.addDocument(t1);
  tfidf.addDocument(t2);

  const v1 = {};
  const v2 = {};

  tfidf.listTerms(0).forEach((i) => (v1[i.term] = i.tfidf));
  tfidf.listTerms(1).forEach((i) => (v2[i.term] = i.tfidf));

  return cosineSimilarity(v1, v2);
};

const jaccardSimilarity = (a, b) => {
  const s1 = new Set(a.split(" "));
  const s2 = new Set(b.split(" "));

  const intersection = [...s1].filter((x) => s2.has(x));
  const union = new Set([...s1, ...s2]);

  return union.size ? intersection.length / union.size : 0;
};

const charSimilarity = (a, b) => {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;

  if (!longer.length) return 1;

  return (
    (longer.length - editDistance(longer, shorter)) / longer.length
  );
};

const editDistance = (a, b) => {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => [i]);

  for (let j = 0; j <= a.length; j++) dp[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      dp[i][j] =
        b[i - 1] === a[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
    }
  }

  return dp[b.length][a.length];
};

const cosineSimilarity = (v1, v2) => {
  const common = Object.keys(v1).filter((k) => k in v2);

  let dot = 0;
  common.forEach((k) => (dot += v1[k] * v2[k]));

  const norm1 = Math.sqrt(Object.values(v1).reduce((a, b) => a + b * b, 0));
  const norm2 = Math.sqrt(Object.values(v2).reduce((a, b) => a + b * b, 0));

  return norm1 && norm2 ? dot / (norm1 * norm2) : 0;
};
