const jobWrapper = document.getElementById("jobWrapper");
const totalJobs = document.getElementById("total");
const currentUser = document.getElementById("user");
const msg = document.getElementById("msg");
const url = `/api/v1/get_all`;
const deleteUrl = `/api/v1/delete`;
async function getJobs() {
 jobWrapper.innerHTML = ''
  try {
    const token = localStorage.getItem("token");
    const { data: response } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = response.data;
    totalJobs.textContent = response.length;
    currentUser.textContent = response.user;

    if (data.length === 0) {
      msg.classList.add("danger");
      msg.classList.remove("sucess");
      msg.textContent = "You currently have no jobs.";
      return;
    }
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
             <button class="btn" data-id="${res._id}" onclick="deleteJob(this)">Delete<i class="fa-solid fa-trash-can"></i></button>
        </div>`;
      jobWrapper.insertAdjacentHTML("beforeend", txt);
    });
  } catch (error) {
       msg.classList.add("danger");
       msg.classList.remove("sucess");
    msg.innerHTML =
      "Oops, Something went wrong. Attempt to login.";
    
  }
}
getJobs();

async function deleteJob(e) {
  const id = e.dataset.id;
  await axios.delete(`${deleteUrl}/${id}`);
  msg.textContent = "Job has been sucessfully removed.";
  msg.classList.add("sucess");
  msg.classList.remove("danger");
  window.scrollTo(0, 0);
  getJobs();
  setTimeout(()=>{
    msg.textContent = ''
    msg.classList.remove('sucess')
  }, 2000)
}

const logoutDOM = document.getElementById("logout");
const logout = () => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
    window.location = "/admin";
  }
};

logoutDOM.addEventListener("click", logout);