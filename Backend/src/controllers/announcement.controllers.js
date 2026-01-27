import Announcement from "../models/announcement.models.js";



export const createAnnouncement = async(req,res) => {
    try {
        const {title,description,hostel,block,date} = req.body;
        if(!title || !hostel || !block || !date){
         return res.status(400).json({
             success:false,
             message:"Title, Hostel, Block and Date are required",
         })   
        }
        console.log(req.user)
        const announcement = await Announcement.create({
            title,
            description,
            hostel,
            block,
            date,
            announcedBy:req.user._id,
        })
        if(!announcement){
         return res.status(500).json({
             success:false,
             message:"Announcement creation failed",
         })   
        }
        res.status(201).json({
            success:true,
            message:"Announcement created successfully",
            data:announcement,
        })
        
    } catch (error) {
     console.error(error);
     res.status(500).json({
         success:false,
         message:"Announcement creation failed",
         error:error.message,
     })   
    }
}

export const getAnnouncements = async (req, res) => {
  try {
    const { hostel, block, date } = req.query;

    let filter = {};
    if (hostel) filter.hostel = hostel;
    if (block) filter.block = block;
    if (date) filter.date = date;

    const announcements = await Announcement.find(filter)
      .populate('announcedBy', 'name email')
      .sort({ date: -1 }); 

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    console.error("Get Announcements Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch announcements",
      error: error.message,
    });
  }
};