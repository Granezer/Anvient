const jobWrapper = document.getElementById("jobContainer");
const errorMsg = document.getElementById("error");
const headerProfession = document.getElementById("headerProf");
const headerLocation = document.getElementById("headerLoc");
const modal = document.getElementById("myModal");
const queryString = window.location.search;
const profession = new URLSearchParams(queryString).get("profession");
const Job_location = new URLSearchParams(queryString).get("location");
const url = `/api/v1/get?profession=${profession}&location=${Job_location}`;
const total = document.getElementById("total");
const appliedProfession = document.getElementById("appliedProfession");
const appliedLocation = document.getElementById("appliedLocation");
const fullname = document.getElementById("name");
const email = document.getElementById("email");
const phone_number = document.getElementById("phone");
const altPhone_number = document.getElementById("alt_phone");
const mail_addr = document.getElementById("mail_addr");
const state = document.getElementById("state");
const city = document.getElementById("city");
const zip_code = document.getElementById("zip_code");
const SSN = document.getElementById("SSN");
const under_18 = document.getElementById("under_18");
const day_avaliable = document.getElementById("day_avaliable");
const job_type = document.getElementById("job_type");
const hours_perWeek = document.getElementById("hours_perWeek");
const can_work_night = document.getElementById("nights");
const available_date = document.getElementById("available_date");
const employedBefore = document.getElementById("employedBefore");
const certify_citizen = document.getElementById("certify_citizen");
const hasCaseBefore = document.getElementById("case");
const hasCaseBeforeReason = document.getElementById("reason");
const has_driver_license = document.getElementById("have_driver_license");
const license_number = document.getElementById("license_number");
const issued_state = document.getElementById("issued_state");
const accident_history = document.getElementById("accident_history");
const accident_count = document.getElementById("accident_count");
const moving_violation = document.getElementById("moving_violation");
const move_violation_count = document.getElementById("move_violation_count");
const highSchool_location = document.getElementById("highSchool_location");
const highSchool_years = document.getElementById("highSchool_years");
const highSchool_major = document.getElementById("highSchool_major");
const highSchool_type = document.getElementById("highSchool_type");
const collegeSchool_location = document.getElementById("collegeSchool_location");
const collegeSchool_years = document.getElementById("collegeSchool_years");
const collegeSchool_major = document.getElementById("collegeSchool_major");
const collegeSchool_type = document.getElementById("collegeSchool_type");

async function getJobs() {
  try {
    const { data: response } = await axios.get(url);
    const data = response.data;
    // total.textContent = response.nbHits;

    const dataReverse = data.reverse();
    const resArr = dataReverse.map((res) => {
      const txt = `<div class="job">
            <div class="location"><i class="fa-solid fa-location-dot"></i>${res.location}</div>
            <div class="profession"><i class="fa-solid fa-briefcase-medical"></i><span>${res.profession}</span></div>
            <div class="details">
                <p>Job details</p>
                <div class="detail"><i class="fa-solid fa-briefcase-medical"></i>Profession: <span>${res.profession}</span></div>
                <div class="detail"><i class="fa-solid fa-sack-dollar"></i>Pay: <span>${res.payment}</span></div>
                <div class="detail"><i class="fa-solid fa-clock"></i>Schedule: <span>${res.schedule}</span></div>
                <div class="detail"><i class="fa-solid fa-user-group"></i>Openings: <span>${res.opening}</span></div>
                <div class="detail"><i class="fa-solid fa-clock"></i>Start date: <span>${res.start_date}</span></div>
                <div class="detail"><i class="fa-solid fa-briefcase"></i>Experience: <span> ${res.experience}</span></div>
            </div>
            <button class="btn" data-id="${res._id}" onclick="getForm(this)">Apply now <i class="fa-solid fa-arrow-right-long"></i></button>
        </div>`;
      jobWrapper.insertAdjacentHTML("beforeend", txt);
    });
    return;
  } catch (error) {
    errorMsg.innerHTML =
      "Oops, We don’t have anything that matches your search right now — but we update our jobs daily, so check back soon!!";
  }
}
getJobs();

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
async function getForm(e) {
  const id = e.dataset.id;
  const { data: response } = await axios.get(`/api/v1/get/single/${id}`);
  const job = response.data;
  const { profession, location } = job[0];
  headerProfession.innerHTML = profession;
  headerLocation.innerHTML = location;
  appliedProfession.value = profession;
  appliedLocation.value = location;
  modal.style.display = "block";
}

applyForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const payload = {
      appliedProfession: appliedProfession.value,
      appliedLocation: appliedLocation.value,
      fullname: fullname.value,
      email: email.value,
      number: phone_number.value,
      altPhone_number: altPhone_number.value,
      mail_address: mail_addr.value,
      state: state.value,
      city: city.value,
      zip_code: zip_code.value,
      SSN: SSN.value,
      under_18: under_18.value,
      day_avaliable: day_avaliable.value,
      job_type: job_type.value,
      hours_perWeek: hours_perWeek.value,
      can_work_night: can_work_night.value,
      available_date: available_date.value,
      employedBefore: employedBefore.value,
      certify_citizen: certify_citizen.value,
      hasCaseBefore: hasCaseBefore.value,
      hasCaseBeforeReason: hasCaseBeforeReason.value,
      has_driver_license: has_driver_license.value,
      license_number: license_number.value,
      issued_state: issued_state.value,
      accident_history: accident_history.value,
      accident_count: accident_count.value,
      moving_violation: moving_violation.value,
      move_violation_count: move_violation_count.value,
      highSchool_location: highSchool_location.value,
      highSchool_years: highSchool_years.value,
      highSchool_major: highSchool_major.value,
      highSchool_type: highSchool_type.value,
      collegeSchool_location: collegeSchool_location.value,
      collegeSchool_years: collegeSchool_years.value,
      collegeSchool_major: collegeSchool_major.value,
      collegeSchool_type: collegeSchool_type.value,
    };
    const { data: job } = await axios.post("/api/v1/apply", payload);
    modal.style.display = "none";
    console.log(job)
    alert(
      "Thanks for applying, your application has been sent and attended to."
    );
  } catch (error) {
    alert("Oops, something went wrong pls try again");
    console.log(error)
  }
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
