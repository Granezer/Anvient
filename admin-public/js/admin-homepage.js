const tableContainer = document.getElementById("Tbody");
const modal = document.getElementById("modal");
const close = document.getElementById("close");
const url = `/api/v1/applications`;
const singleUrl = "/api/v1/application/";
const fullname = document.getElementById("fullname");
const Aemail = document.getElementById("email");
const Aphone = document.getElementById("phone");
const alternatePhone = document.getElementById("alt-phone");
const Amail_addr = document.getElementById("mail_addr");
const Astate = document.getElementById("state");
const Acity = document.getElementById("city");
const Azip_code = document.getElementById("zip_code");
const ASSN = document.getElementById("ssn");
const Aunder_18 = document.getElementById("under_18");
const preferredJob = document.getElementById("preferred_job");
const available_day = document.getElementById("available_day");
const hours_Week = document.getElementById("hours_perWeek");
const can_workNight = document.getElementById("can_work_night");
const availableDate = document.getElementById("available_date");
const emp_before = document.getElementById("emp_before");
const cert_citizen = document.getElementById("cert_citizen");
const caseBefore = document.getElementById("caseBefore");
const caseReason = document.getElementById("caseReason");
const driver_license = document.getElementById("driver_license");
const license_number = document.getElementById("license_number");
const issued_state = document.getElementById("issued_state");
const has_accident = document.getElementById("has_accident");
const accident_count = document.getElementById("accident_count");
const moving_violation = document.getElementById("moving_violation");
const moving_count = document.getElementById("moving_count");
const highSchool_loc = document.getElementById("highSchool_loc");
const highSchool_majo = document.getElementById("highSchool_majo");
const highSchool_typ = document.getElementById("highSchool_typ");
const highSchool_completed = document.getElementById("highSchool_completed");
const collegeSchool_completed = document.getElementById(
  "collegeSchool_completed"
);
const highSchool_name = document.getElementById("highSchool_name");
const collegeSchool_name = document.getElementById("collegeSchool_name");
const collegeSchool_loc = document.getElementById("collegeSchool_loc");
const collegeSchool_majo = document.getElementById("collegeSchool_majo");
const collegeSchool_typ = document.getElementById("collegeSchool_typ");

const company_name = document.getElementById("company_name");
const company_supervisor = document.getElementById("company_supervisor");
const company_address = document.getElementById("company_address");
const company_phone = document.getElementById("company_phone");
const hrs_week = document.getElementById("hrs_week");
const company_state = document.getElementById("company_state");
const company_city = document.getElementById("company_city");
const company_zip_code = document.getElementById("company_zip_code");
const start_date = document.getElementById("start_date");
const end_date = document.getElementById("end_date");
const start_salary = document.getElementById("start_salary");
const final_salary = document.getElementById("final_salary");
const job_title = document.getElementById("job_title");
const company_reason = document.getElementById("company_reason");
const company_jobs = document.getElementById("company_jobs");
const contact_emp = document.getElementById("contact_emp");
const ref = document.getElementById("ref");

const userDOM = document.getElementById("user");
const errorDOM = document.getElementById("msg");
const counter = document.getElementById("count");
const download = document.getElementById("download");
const getApplications = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data: response } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const applications = response.data;
    console.log(applications);
    const user = response.user;
    const length = response.length;
    userDOM.innerHTML = user;
    counter.innerHTML = length;
    const arr_applications = applications.map((applicant) => {
      const { profession, location } = applicant.appliedFor;
      const { name, email, phone, altPhone, mail_address, state, city } =
        applicant.basicDetails;
      return `<tr>
              <td>${profession} at ${location}</td>
              <td>
                <ul>
                  <li>Name: ${name}</li>
                  <li>E-mail: ${email}</li>
                  <li>Tele phone: ${phone}</li>
                  <li>Alternate phone: ${altPhone}</li>
                  <li>Mailing Address: ${mail_address}</li>
                  <li>State: ${state}</li>
                  <li>City: ${city}</li>
                </ul>
                <button data-id="${applicant._id}" onclick="showModal(this)" class="see_more">Show more</button>
              </td>
              <td>${applicant.time}</td>
            </tr>`;
    });
    tableContainer.innerHTML = arr_applications.join(' ');
  } catch (error) {
    errorDOM.classList.add("danger");
    errorDOM.classList.remove("sucess");
    errorDOM.innerHTML =
      "Oops, something went wrong. Pls attempt to login again...";
  }
};
getApplications();

async function showModal(e) {
  try {
    const id = e.dataset.id;
    const token = localStorage.getItem("token");
    const { data: response } = await axios.get(`${singleUrl}${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data[0];
    console.log(data);
    const {
      name,
      email,
      phone,
      altPhone,
      mail_address,
      state,
      city,
      SSN,
      zip_code,
      under_18,
    } = data.basicDetails;
    const {
      preferred_job,
      hours_perWeek,
      day_avaliable,
      can_work_night,
      available_date,
    } = data.jobType;
    const {
      employedBefore,
      certify_citizen,
      hasCaseBefore,
      hasCaseBeforeReason,
      hasDriverLicense,
      licenseNumber,
      licenseIssuedState,
    } = data.additionalInfo;
    const { hasAccident, count } = data.additionalInfo.accidentHistory;
    const { hasMovingViolation, count: violationCount } =
      data.additionalInfo.movingViolation;
    const { name: Sname, location, yearsCompleted, major, type } = data.education.highSchool;
    const {
      name: collegeName,
      location: collegeLoc,
      yearsCompleted: collegeYears,
      major: collegeMajor,
      type: collegeType,
    } = data.education.collegeSchool;
    const {
      companyName,
      companyAddress,
      companyState,
      companyCity,
      companyZipCode,
      companySupervisor,
      startSalary,
      finalSalary,
      startDate,
      endDate,
      hoursPerWeek,
      lastJobTitle,
      previousJobs,
      reasonForLeaving,
      contactEmployer,
      companyPhone,
      reference
    } = data.workExperience;
    download.href = data.document;
    // setting basic details DOM
    fullname.innerHTML = name;
    Aemail.innerHTML = email;
    Aphone.innerHTML = phone;
    alternatePhone.innerHTML = altPhone;
    Amail_addr.innerHTML = mail_address;
    Astate.innerHTML = state;
    Acity.innerHTML = city;
    Azip_code.innerHTML = zip_code;
    ASSN.innerHTML = SSN;
    Aunder_18.innerHTML = under_18;
    // setting job type DOM
    preferredJob.innerHTML = preferred_job;
    available_day.innerHTML = day_avaliable;
    hours_Week.innerHTML = hours_perWeek;
    can_workNight.innerHTML = can_work_night;
    availableDate.innerHTML = available_date;
    //setting additional informations
    emp_before.innerHTML = employedBefore;
    cert_citizen.innerHTML = certify_citizen;
    caseBefore.innerHTML = hasCaseBefore;
    caseReason.innerHTML = hasCaseBeforeReason;
    driver_license.innerHTML = hasDriverLicense;
    license_number.innerHTML = licenseNumber;
    issued_state.innerHTML = licenseIssuedState;
    issued_state.innerHTML = licenseIssuedState;
    has_accident.innerHTML = hasAccident;
    accident_count.innerHTML = count;
    moving_violation.innerHTML = hasMovingViolation;
    moving_count.innerHTML = violationCount;
    //setting education DOM
    //high school DOM
    highSchool_name.innerHTML = Sname;
    highSchool_loc.innerHTML = location;
    highSchool_typ.innerHTML = type;
    highSchool_majo.innerHTML = major;
    highSchool_completed.innerHTML = yearsCompleted;
    //college DOM
    collegeSchool_name.innerHTML = collegeName;
    collegeSchool_loc.innerHTML = collegeLoc;
    collegeSchool_typ.innerHTML = collegeType;
    collegeSchool_majo.innerHTML = collegeMajor;
    collegeSchool_completed.innerHTML = collegeYears;
    //setting work experience
    company_name.innerHTML = companyName;
    company_address.innerHTML = companyAddress;
    company_phone.innerHTML = companyPhone;
    company_state.innerHTML = companyState;
    company_city.innerHTML = companyCity;
    company_zip_code.innerHTML = companyZipCode;
    company_supervisor.innerHTML = companySupervisor;
    start_salary.innerHTML = startSalary;
    final_salary.innerHTML = finalSalary;
    start_date.innerHTML = startDate;
    end_date.innerHTML = endDate;
    company_reason.innerHTML = reasonForLeaving;
    hrs_week.innerHTML = hoursPerWeek;
    job_title.innerHTML = lastJobTitle;
    contact_emp.innerHTML = contactEmployer;
    company_jobs.innerHTML = previousJobs;
    ref.innerHTML = reference
    modal.style.display = "block";
  } catch (error) {
    errorDOM.classList.add("danger");
    errorDOM.classList.remove("sucess");
    errorDOM.innerHTML = "Oops, something went wrong. Pls try to login again";
    console.log(error);
  }
}

close.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
const logoutDOM = document.getElementById("logout");
const logout = () => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
    window.location = "/admin";
  }
};

logoutDOM.addEventListener("click", logout);
