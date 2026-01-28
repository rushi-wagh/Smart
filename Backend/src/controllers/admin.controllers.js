import Issue from "../models/issue.models.js";


export const getCountOfIssues = async(req,res) => {
    try {
       
        let filter = {};
        const { category, hostel, status } = req.query;     
        if (category) {
            filter.category = category;
        }   
        if (hostel) {
            filter.hostel = hostel;
        }   
        if (status) {
            filter.status = status;
        }
        const totalIssues = await Issue.countDocuments();
        const filteredIssues = await Issue.countDocuments(filter);

        res.status(200).json({ totalIssues, filteredIssues });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}