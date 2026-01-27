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
        enum:["Hostel A", "Hostel B", "Hostel C", "Hostel D", "All"],
        required:true,
    },
    block:{
        type:String,
        enum:["Block 1", "Block 2", "Block 3", "Block 4", "All"],
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