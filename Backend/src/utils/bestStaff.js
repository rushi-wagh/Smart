import Issue from "../models/issue.models.js";
import User from "../models/user.model.js";


const getLeastLoadedStaff = async (filter) => {
  const staffList = await User.find({ role: "staff", ...filter });

  if (!staffList.length) return null;

  let bestStaff = null;
  let minLoad = Infinity;

  for (const staff of staffList) {
    const activeIssues = await Issue.countDocuments({
      assignedTo: staff._id,
      status: { $in: ["OPEN", "IN_PROGRESS"] },
    });

    if (activeIssues < minLoad) {
      minLoad = activeIssues;
      bestStaff = staff;
    }
  }

  return bestStaff;
};

export const assignStaffAuto = async (category) => {
  let department = category?.toLowerCase();

  if (department === "electricity") department = "electrical";
  if (!department) department = "general";

  let staff = await getLeastLoadedStaff({ department });

  if (!staff) {
    staff = await getLeastLoadedStaff({ department: "general" });
  }

  return staff;
};
