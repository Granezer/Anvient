const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    profession: {
        type: String,
        required: [true, "Profession of the job is a must"],
        trim: true
    },
    experience: {
        type: String,
        required: [true, "Experience is required"],
        trim: true
    },
    opening: {
        type: Number,
        required: [true, "Openings must be specified"],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location of job must be provided'],
        trim: true
    },
    start_date: {
        type: String,
        trim: true
    },
    payment: {
        type: String,
        required: [true, "Payment details must be included"],
        trim: true
    },
    schedule: {
        type: String,
        trim: true
    },
    assignment_length: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Job", jobSchema);


