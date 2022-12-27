const modal = document.getElementById("myModal");
const enquiryLinks = document.querySelectorAll('#link')

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
async function getForm(e) {
  // const id = e.dataset.id;
  // const { data: response } = await axios.get(`/api/v1/get/single/${id}`);
  // const job = response.data;
  // const { profession, location } = job[0];
  // headerProfession.innerHTML = profession;
  // headerLocation.innerHTML = location;
  // appliedProfession.value = profession;
  // appliedLocation.value = location;
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

enquiryLinks.forEach((link)=>{
  link.addEventListener('click', getForm)
})


const url = "/api/v1/enquiry";
const fullname = document.getElementById("name");
const e_mail = document.getElementById("email");
const telephone = document.getElementById("phone");
const msg = document.getElementById("msg");
const form = document.getElementById("form");
const err = document.getElementById("err");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const payload = {
      name: fullname.value,
      email: e_mail.value,
      phone: telephone.value,
      message: msg.value,
    };

      const { data: enquiry } = await axios.post(url, payload);
    err.classList.add("sucess");
    err.classList.remove("danger");
    err.innerHTML = "Your message have been received and responded to....";
      fullname.value = ''
      e_mail.value = ''
      telephone.value = ''
      msg.value = ''
      
  } catch (error) {
    err.classList.add('danger')
    err.classList.remove('sucess')
    // console.log(error)
    err.innerHTML = "Something went wrong, pls try again."
  }
});
