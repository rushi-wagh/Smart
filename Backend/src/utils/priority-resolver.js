export const resolveFinalPriority = (userPriority, aiPriority) => {
  const table = {
    LOW: {
      LOW: "LOW",
      MEDIUM: "MEDIUM",
      HIGH: "HIGH",
      EMERGENCY: "EMERGENCY",
    },
    MEDIUM: {
      LOW: "LOW",
      MEDIUM: "MEDIUM",
      HIGH: "HIGH",
      EMERGENCY: "EMERGENCY",
    },
    HIGH: {
      LOW: "MEDIUM",
      MEDIUM: "MEDIUM",
      HIGH: "HIGH",
      EMERGENCY: "EMERGENCY",
    },
    EMERGENCY: {
      LOW: "HIGH",
      MEDIUM: "HIGH",
      HIGH: "EMERGENCY",
      EMERGENCY: "EMERGENCY",
    },
  };

  return table[userPriority]?.[aiPriority] || aiPriority;
};
export const  correctCategory = (text, aiCategory) => {
  const t = text.toLowerCase();

  if (t.includes("fan") || t.includes("switch") || t.includes("light") || t.includes("socket"))
    return "electricity";

  if (t.includes("pipe") || t.includes("tap") || t.includes("leak") || t.includes("water"))
    return "plumbing";

  if (t.includes("wifi") || t.includes("internet") || t.includes("network"))
    return "internet";

  if (t.includes("clean") || t.includes("garbage") || t.includes("washroom") || t.includes("dust"))
    return "cleaning";

  if (t.includes("theft") || t.includes("fight") || t.includes("harassment") || t.includes("threat"))
    return "security";

  return aiCategory || "other";
};
