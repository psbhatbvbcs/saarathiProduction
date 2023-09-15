import { mongoose } from "mongoose"

const semInsightsSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    collegeName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }

})

export const SemInsightsSchema = mongoose.model("SemInsights", semInsightsSchema);