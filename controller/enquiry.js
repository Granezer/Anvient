const Enquiry = require('../models/enquiries')

const getAllEnquires = async (req, res) => {
    const user = req.user
    const enquiry = await Enquiry.find({})
    res.status(200).json({success: true, msg:"All enquiries have been sucessfully gotten", data: enquiry, username:user, length: enquiry.length})
}

const createEnquiry = async (req, res) => {
    const {name, email, phone, message} = req.body
    const payload = {
        name: name,
        email: email,
        phone: phone,
        message: message
    }
    const enquiry = await Enquiry.create(payload)
    res.status(201).json({success: true, msg:"Enquiry created sucessfully", data: enquiry})
}

module.exports = {
    getAllEnquires,
    createEnquiry
}