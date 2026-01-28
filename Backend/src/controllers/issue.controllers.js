import Issue from "../models/issue.models.js";
import { uploadImage } from "../utils/cloudinary.js";

export const postIssue = async (req, res) => {
  try {
    const { title, description, category, priority, issueType } = req.body;

    if (!title || !description || !priority || !req.user) {
      return res.status(400).json({ message: "All fields are required" });
    }
    let imageUrl
    if(req.file){
      console.log("File received:", req.file);
      const resp = await uploadImage(req.file.path)
      imageUrl = resp.secure_url
    }

    const user = req.user;
    console.log("reached here", user);

    const newIssue = await Issue.create({
      title,
      description,
      category,
      priority,
      issueType,
      hostel: user.hostel,
      block: user.block,
      roomNumber: user.roomNumber || req.body.roomNumber,
      createdBy: user._id,
    });

    console.log("Issue created:", newIssue);

    return res.status(201).json({
      message: "Issue reported successfully",
      issue: newIssue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const myIssues = async(req,res) => {
    try {
        const issues = await Issue.find({createdBy: req.user._id}).sort({createdAt: -1});
        if(!issues){
            return res.status(404).json({message: "No issues found"});
        }
        res.status(200).json({issues: issues});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const updateIssueStatus = async(req,res) => {
    try {
        const {issueId} = req.params;
        const {status} = req.body;
        if(!issueId || !status){
            return res.status(400).json({message: "Issue ID and status are required"});
        }
        const validStatuses = ["OPEN", "IN_PROGRESS", "RESOLVED"];
        if(!validStatuses.includes(status)){
            return res.status(400).json({message: "Invalid status"});
        }
        const issue = await Issue.findById(issueId);
        if(!issue){
            return res.status(404).json({message: "Issue not found"});
        }   
        issue.status = status;
        await issue.save({validateBeforeSave: false});
        res.status(200).json({message: "Issue status updated successfully", issue: issue});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const getAllIssues = async(req,res) => {
    try {
        let filter = {}
        const{issueType,hostel,block} = req.query
        if(issueType){
            filter.issueType = issueType
        }
        if(hostel){
            filter.hostel = hostel
        }
        if(block){
            filter.block = block
        }
        const issues = await Issue.find(filter).sort({createdAt: -1}).populate("createdBy", "name email")
        if(!issues){
            return res.status(404).json({message: "No issues found"});
        }
        res.status(200).json({issues: issues});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteIssue = async(req,res) => {
    try {
        const {issueId} = req.params;   
        if(!issueId){
            return res.status(400).json({message: "Issue ID is required"});
        }
        const issue = await Issue.findById(issueId);    
        if(!issue){
            return res.status(404).json({message: "Issue not found"});
        }
        await issue.deleteOne();
        res.status(200).json({message: "Issue deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}   