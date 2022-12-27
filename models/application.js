const mongoose = require("mongoose");
const time = require('../time')

const applySchema = new mongoose.Schema({
    appliedFor: {
        type: Map,
        required: true
    },
    basicDetails: {
        type: Map,
        required: true
    },
    jobType: {
        type: Map,
        required: true
    },
    additionalInfo: {
        type: Map,
        required: true
    },
    education: {
        type: Map,
        required: true
    },
    workExperience: {
        type: Map,
        required: true
    },
    document: {
        type: String,
    },
    time: {
        type: String,
        default: time
    },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Application", applySchema);
