const jobWrapper = document.getElementById("jobContainer");
const errorMsg = document.getElementById("error");
const headerProfession = document.getElementById("headerProf");
const headerLocation = document.getElementById("headerLoc");
const modal = document.getElementById("myModal");
const queryString = window.location.search;
const profession = new URLSearchParams(queryString).get("profession");
const Job_location = new URLSearchParams(queryString).get("location");
const url = `/api/v1/get?profession=${profession}&location=${Job_location}`;
const totalJobs = document.getElementById("totalJobs");
async function getJobs() {
  try {
    const { data: response } = await axios.get(url);
    const data = response.data;
    totalJobs.textContent = response.nbHits;

    const dataReverse = data.reverse();
    const resArr = dataReverse.map((res) => {
      const txt = `<div class="job">
            <div class="location"><i class="fa-solid fa-location-dot"></i>${res.location}</div>
            <div class="profession"><i class="fa-solid fa-briefcase-medical"></i><span>${res.profession}</span></div>
            <div class="details">
                <p>Job details</p>
                <div class="detail"><i class="fa-solid fa-briefcase-medical"></i>Profession: <span>${res.profession}</span></div>
                 <div class="detail"><i class="fa-solid fa-sack-dollar"></i>Pay: <span class="fa-solid fa-dollar-sign"></span><span>${res.payment}</span></div>
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
