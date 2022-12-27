const profession = document.getElementById('profession');
const jobLocation= document.getElementById('location')
const experience = document.querySelector('#experience')
const start = document.querySelector('#start')
const opening = document.querySelector('#opening')
const payment = document.querySelector('#payment')
const schedule = document.querySelector('#schedule')
const msg = document.querySelector('#msg')
const form = document.getElementById('form')
const userDOM = document.getElementById("user");


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
      const token = localStorage.getItem('token')
const {data: job} = await axios.post(`/api/v1/create`, {
      profession: profession.value,
      location: jobLocation.value,
      start: start.value,
      experience: experience.value,
      opening: opening.value,
      payment: payment.value,
      schedule: schedule.value
    },{headers: {Authorization: `Bearer ${token}`}});
    msg.classList.add('sucess')
    msg.classList.remove('danger')
    msg.innerHTML = "Job has been sucessfully Posted...";
    profession.value = "";
    location.value = "";
    start.value = "";
    experience.value = "";
    opening.value = "";
    payment.value = "";
    schedule.value = "";
  } catch (error) {
    msg.classList.add('danger')
    msg.classList.remove('sucess')
    msg.innerHTML = "Oops, something went wrong pls try again... Pls attempt to login again";
  }
  window.scrollTo(0, 0);
});

// window.addEventListener()