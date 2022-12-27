const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authentication')
const multerInstance = require("../multer");

const { searchJob, postJob, getJobs, getAJob, getAllJobs, deleteSingleJob } = require('../controller/jobs')
const { createApplication, getApplications, getSingleApplication } = require('../controller/application')
const { getAllEnquires, createEnquiry } = require('../controller/enquiry')
const {login} = require('../controller/admin')

router.route('/create').post(authMiddleware, postJob)
router.route('/search').get(searchJob)
router.route('/get').get(getJobs)
router.route('/get_all').get(authMiddleware,getAllJobs)
router.route('/get/single/:id').get(getAJob)
router.route("/apply").post(multerInstance.single("file"), createApplication);
router.route('/applications').get(authMiddleware,getApplications)
router.route('/application/:id').get(authMiddleware,getSingleApplication)
router.route('/login').post(login)
router.route('/delete/:id').delete(deleteSingleJob)

router.route('/enquiry').get(authMiddleware, getAllEnquires).post(createEnquiry)

module.exports = router