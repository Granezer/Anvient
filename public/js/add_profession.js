const profession = document.getElementById('profession');
const jobLocation= document.getElementById('location')
const experience = document.querySelector('#experience')
const start = document.querySelector('#start')
const opening = document.querySelector('#opening')
const payment = document.querySelector('#payment')
const schedule = document.querySelector('#schedule')
const msg = document.querySelector('#msg')
const form = document.getElementById('form')


form.addEventListener("submit", async (e) => {
  e.preventDefault();
//   msg.innerHTML = "Kindly wait for product to be updated...";
  try {
    // const profession = profession.value;
    // const location = jobLocation.value;
    // const start = start.value;
    // const experience = experience.value;
    // const opening = opening.value;
    // const payment = payment.value;
    //   const schedule = schedule.value;
      
const {data: job} = await axios.post(`/api/v1/create`, {
      profession: profession.value,
      location: jobLocation.value,
      start: start.value,
      experience: experience.value,
      opening: opening.value,
      payment: payment.value,
      schedule: schedule.value
    });
    msg.innerHTML = "Job has been sucessfully Posted...";
    profession.value = "";
    location.value = "";
    start.value = "";
    experience.value = "";
    opening.value = "";
    payment.value = "";
    schedule.value = "";
    window.scrollTo(0, 0);
  } catch (error) {
    msg.innerHTML = "Oops, something went wrong pls try again...";
    console.log(error)
  }
});