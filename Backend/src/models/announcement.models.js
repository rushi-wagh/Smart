import mongoose from "mongoose"

const announcementSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    hostel:{
        type: String,
        enum:["Sunrise Hall", "Green View Hostel","Blue Moon Residency", "All"],
        required:true,
    },
    block:{
        type:String,
        enum:["A","B","C","All"],
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    announcedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{timestamps:true})

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;