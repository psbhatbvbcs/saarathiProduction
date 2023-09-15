import mongoose from 'mongoose';

const clubsInfoSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    collegeName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true,
    },
    clubName: {
        type: String,
        required: true,
    },
    clubDescription: {
        type: String,
        required: true,
    },
    contactDetails: {
        type: String,
        required: true,
    },
    logoPath: {
        type: String,
        required: true,
    },
    filesPath: [
        {
            type: String,
        },
    ],
});

export const ClubsInfoSchema = mongoose.model('ClubsInfo', clubsInfoSchema);
