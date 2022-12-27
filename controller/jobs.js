const Job = require('../models/job-model')

const searchJob = (req, res) => {
    const {profession, location} = req.query
    const queryObj = {}
    if (profession ) {
        queryObj.profession = profession
    } else {
        if (profession === undefined) {
        queryObj.profession = ''
        }
    }
        if (location) {
          queryObj.location = location
        } else {
            if (location === undefined) {
                queryObj.location = '';
            }
        }
    res.redirect(`/search.html?profession=${queryObj.profession}&location=${queryObj.location}`)
}

const postJob = async (req, res) => {
    const { profession, experience, opening, location, start, payment, schedule, assignment } = req.body
    const obj = {
        profession: profession,
        experience: experience,
        opening: opening,
        location: location,
        start_date: start,
        payment: payment,
        schedule: schedule
    }
    const job = await Job.create(obj)
    res.status(201).json({sucess: true, message: "Job has been sucessfully created", job})
}

const getJobs = async(req, res) => {
    const { profession, location } = req.query
    const queryObj = {}
    if (profession) {
        queryObj.profession = profession
    }
    if (location) {
        queryObj.location = location
    }
    const jobs = await Job.find(queryObj)
    if(jobs.length === 0){
        return res.status(404).json({sucess: false, message: "Oops, no jobs are available that matches this search..."})
    }
return res.status(200).json({sucess: true, message: "Jobs is sucessfully gotten", data:jobs, nbHits: jobs.length})
}

const getAJob = async (req, res) => {
const {id} = req.params
  const job = await Job.find({_id: id});
  if (job.length === 0) {
    return res
      .status(404)
      .json({
        sucess: false,
        message: "Oops, no jobs are available that matches this search...",
      });
  }
  return res
    .status(200)
    .json({ sucess: true, message: "Job is sucessfully gotten", data: job });
};

const getAllJobs = async (req, res) => {
  const user = req.user;

    const jobs = await Job.find({});
  return res
    .status(200)
    .json({
      sucess: true,
      message: "Jobs is sucessfully gotten",
      data: jobs,
      user: user,
      length: jobs.length,
    });
};

const deleteSingleJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findOneAndDelete({ _id: id });
  if (!job)
    return res
      .status(404)
            .json({ msg: `no job with id "${id}" was found to be deleted` });
    
  res.status(200).json({ msg: `the job with id "${id}" has been removed` });
};


module.exports = {
  searchJob,
  postJob,
  getJobs,
  getAJob,
  getAllJobs,
  deleteSingleJob,
};