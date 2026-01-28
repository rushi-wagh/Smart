import Issue from "../models/issue.models.js";

export const getStaffTasks = async (req, res) => {
  const tasks = await Issue.find({
    assignedTo: req.user,
    status: { $ne: "RESOLVED" }
  }).sort({ emergency: -1, priority: -1, createdAt: -1 });

  res.status(200).json({ tasks });
};


export const staffUpdateStatus = async (req, res) => {
  const { issueId } = req.params;
  const { status } = req.body;

  const issue = await Issue.findOne({
    _id: issueId,
    assignedTo: req.user
  });

  if (!issue) return res.status(403).json({ message: "Access denied" });

  issue.status = status;
  if (status === "RESOLVED") issue.resolvedAt = new Date();

  await issue.save();

  res.status(200).json({ message: "Status updated", issue });
};
