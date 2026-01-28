import Issue from "../models/issue.models.js";
import { detectCategory } from "../utils/category.js";
import { callAI } from "../utils/open-router.js";
import { correctCategory, resolveFinalPriority } from "../utils/priority-resolver.js";

export const postIssue = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({
        success: false,
        message: "Title, description and priority are required",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = req.user;

    let aiData = {};

    try {
      const aiResponse = await callAI([
  {
    role: "system",
    content: `
You are an expert hostel complaint classification AI.

You must ONLY output valid JSON.
Do NOT include any text outside JSON.

IMPORTANT RULES:
1. category MUST be exactly one of:
   ["electricity","plumbing","cleaning","security","internet","mess","other"]

2. priority MUST be exactly one of:
   ["LOW","MEDIUM","HIGH","EMERGENCY"]

3. urgency_score MUST be a number between 1 and 10.

4. sentiment MUST be exactly one of:
   ["POSITIVE","NEUTRAL","NEGATIVE"]

5. is_emergency MUST be true or false.

6. emergency_type MUST be null OR a short string.

7. tags MUST be an array of short lowercase strings.

If unsure, choose:
category = "other"
priority = "MEDIUM"
sentiment = "NEUTRAL"
is_emergency = false

Return JSON ONLY.
`
  },
  {
    role: "user",
    content: `Complaint:
${description}`
  }
]);

      try {
        aiData = JSON.parse(aiResponse);
      } catch (e) {
        console.log("AI JSON parse failed:", aiResponse);
        aiData = {};
      }

    } catch (err) {
      console.log(err)
      console.log("AI call failed:", err.message);
      aiData = {};
    }

    console.log("AI Data:", aiData);

    const aiPriority = (aiData?.priority || "MEDIUM").toUpperCase();
    const userPriority = priority.toUpperCase();

    const finalPriority = resolveFinalPriority(userPriority, aiPriority);

    const emergency =
      aiData?.is_emergency === true || finalPriority === "EMERGENCY";

    const finalCategory = correctCategory(description, aiData?.category || category);

    const issue = await Issue.create({
      title,
      description,

      priority: finalPriority,
      userPriority,
      aiPriority,
      aiUrgency: aiData?.urgency_score || 5,
      aiTags: aiData?.tags || [],
      category: finalCategory,
      aiCategory: aiData?.category || null,
      sentiment: aiData?.sentiment || "NEUTRAL",
      emergency,
      emergencyType: aiData?.emergency_type || null,

      hostel: user.hostel,
      block: user.block,
      roomNumber: user.roomNumber,
      createdBy: user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Issue reported successfully",
      issue,
    });

  } catch (error) {
    console.error("postIssue error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export const autoDetectCategory = async (req, res) => {
  try {
    const { description } = req.body;

    const detectedCategory = detectCategory(description);

    return res.status(200).json({
      success: true,
      suggestedCategory: detectedCategory
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Category detection failed",
      error: error.message
    });
  }
};

