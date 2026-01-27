import Issue from "../models/issue.models.js";
import { callAI } from "../utils/open-router.js";
import { correctCategory, resolveFinalPriority } from "../utils/priority-resolver.js";

export const postIssue = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    if (!title || !description || !priority || !req.user) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = req.user;

    let aiData = {};
    try {
      const aiResponse = await callAI([
        {
          role: "system",
          content: "You are an expert hostel complaint analyzer AI.",
        },
        {
          role: "user",
          content: `Analyze complaint and return JSON only:
{
  category,
  priority: LOW | MEDIUM | HIGH | EMERGENCY,
  urgency_score,
  sentiment,
  is_emergency,
  emergency_type,
  tags
}

Complaint:
${description}`,
        },
      ]);

      aiData = JSON.parse(aiResponse);
    } catch {}
    console.log("AI Data:", aiData);
    const aiPriority = (aiData?.priority || "MEDIUM").toUpperCase();
    const userPriority = priority.toUpperCase();
    const finalPriority = resolveFinalPriority(userPriority, aiPriority);
    const emergency =
      aiData?.is_emergency === true || finalPriority === "EMERGENCY";
    const finalCategory = correctCategory(description, aiData?.category);

    const issue = await Issue.create({
      title,
      description,

      priority: finalPriority,
      userPriority,
      aiPriority,
      aiUrgency: aiData.urgency_score || 5,
      aiTags: aiData.tags || [],
      category: finalCategory,
      aiCategory: aiData?.category || null,
      sentiment: aiData.sentiment || "NEUTRAL",
      emergency,
      emergencyType: aiData?.emergency_type || null,
      hostel: user.hostel,
      block: user.block,
      roomNumber: user.roomNumber,
      createdBy: user._id,
    });

    res.status(201).json({
      success: true,
      message: "Issue reported successfully",
      issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
