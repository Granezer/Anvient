const Application = require("../models/application");

const createApplication = async (req, res) => {
  const {
    appliedProfession,
    appliedLocation,
    fullname,
    email,
    number,
    altPhone_number,
    mail_address,
    state,
    city,
    zip_code,
    SSN,
    under_18,
    day_avaliable,
    job_type,
    hours_perWeek,
    can_work_night,
    available_date,
    employedBefore,
    certify_citizen,
    hasCaseBefore,
    hasCaseBeforeReason,
    has_driver_license,
    license_number,
    issued_state,
    accident_history,
    accident_count,
    moving_violation,
    move_violation_count,
    highSchool_name,
    highSchool_location,
    highSchool_years,
    highSchool_major,
    highSchool_type,
    collegeSchool_name,
    collegeSchool_location,
    collegeSchool_years,
    collegeSchool_major,
    collegeSchool_type,
    company_name,
    company_supervisor,
    company_address,
    company_state,
    company_city,
    company_zip_code,
    company_phone,
    hrs_week,
    start_salary,
    final_salary,
    start_date,
    end_date,
    job_title,
    company_reason,
    before_jobs,
    contact_emp,
    reference
  } = req.body;

  const payload = {
    appliedFor: {
      profession: appliedProfession,
      location: appliedLocation,
    },
    basicDetails: {
      name: fullname,
      email: email,
      phone: number,
      altPhone: altPhone_number,
      mail_address: mail_address,
      state: state,
      city: city,
      zip_code: zip_code,
      SSN: SSN,
      under_18: under_18,
    },
    jobType: {
      day_avaliable: day_avaliable,
      preferred_job: job_type,
      hours_perWeek: hours_perWeek,
      can_work_night: can_work_night,
      available_date: available_date,
    },
    additionalInfo: {
      employedBefore: employedBefore,
      certify_citizen: certify_citizen,
      hasCaseBefore: hasCaseBefore,
      hasCaseBeforeReason: hasCaseBeforeReason,
      hasDriverLicense: has_driver_license,
      licenseNumber: license_number,
      licenseIssuedState: issued_state,
      accidentHistory: {
        hasAccident: accident_history,
        count: accident_count,
      },
      movingViolation: {
        hasMovingViolation: moving_violation,
        count: move_violation_count,
      },
    },
    education: {
      highSchool: {
        name: highSchool_name,
        location: highSchool_location,
        yearsCompleted: highSchool_years,
        major: highSchool_major,
        type: highSchool_type,
      },
      collegeSchool: {
        name: collegeSchool_name,
        location: collegeSchool_location,
        yearsCompleted: collegeSchool_years,
        major: collegeSchool_major,
        type: collegeSchool_type,
      },
    },
    workExperience: {
      companyName: company_name,
      companySupervisor: company_supervisor,
      companyAddress: company_address,
      companyState: company_state,
      companyCity: company_city,
      companyZipCode: company_zip_code,
      companyPhone: company_phone,
      hoursPerWeek: hrs_week,
      startSalary: start_salary,
      finalSalary: final_salary,
      startDate: start_date,
      endDate: end_date,
      lastJobTitle: job_title,
      reasonForLeaving: company_reason,
      previousJobs: before_jobs,
      contactEmployer: contact_emp,
      reference: reference
    },
    document: req.file.path
  };

  const application = await Application.create(payload);
  res.redirect('/received_application.html')
};

const getApplications = async (req, res) => {
  const user = req.user
  const application = await Application.find({}).sort("-createdAt");
  if (application.length === 0) {
    return res.status(404).json({
      sucess: false,
      message: "No Applications has been submitted at the moment.",
      data: null,
    });
  }
  return res.status(200).json({
    sucess: true,
    message: "All application has been sucessfuly gotten.",
    data: application,
    user: user,
    length: application.length,
  });
};
const getSingleApplication = async (req, res) => {
  const {id} = req.params
  const application = await Application.find({_id: id});
  return res.status(200).json({
    sucess: true,
    msg: "Application has been sucessfuly gotten.",
    data: application,
    length: application.length,
  });
};

module.exports = {
  createApplication,
  getApplications,
  getSingleApplication,
};
