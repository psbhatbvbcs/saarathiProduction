import { mongoose } from "mongoose"

const LinkSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    collegeName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true,
    },
    linkName: {
        type: String,
        required: [true, "Uploaded link must have a name!"],
    },
    department: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    linkAddress: {
        type: String,
        required: true,
    }

})

export const LinksSchema = mongoose.model("Link", LinkSchema);