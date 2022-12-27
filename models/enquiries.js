const mongoose = require("mongoose");
const time = require('../time')

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Pls provide a name"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Pls provide a email"]
    },
    phone: {
        type: String,
        trim: true,
        required: [true, "Pls provide a phone"]
    },
    message: {
        type: String,
        trim: true,
        required: [true, "Pls state your message"]
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

module.exports = mongoose.model("Enquiry", enquirySchema);
