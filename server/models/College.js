import {mongoose} from "mongoose";

const collegeSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        required: true,
    },

    collegeAddress: {
        type: String,
        //required: true,
    }, 
    
    collegeEmail: {
        type: String,
        //required: true,
    }, 
    
    collegeWebsite: {
        type: String,
        //required: true,
    }
})

export const CollegeSchema = mongoose.model("College", collegeSchema);
