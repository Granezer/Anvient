const formDOM = document.querySelector(".form");
const usernameInputDOM = document.querySelector(".username-input");
const passwordInputDOM = document.querySelector(".password-input");
const formAlertDOM = document.querySelector(".form-alert");
const resultDOM = document.querySelector(".result");
const btnDOM = document.querySelector("#data");
const tokenDOM = document.querySelector(".token");
const errorMSG = document.getElementById("error");

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const username = usernameInputDOM.value;
    const password = passwordInputDOM.value;
    const { data } = await axios.post("/api/v1/login", { username, password });
    const token = data.token;
    localStorage.setItem("token", token);
    console.log(data);
    errorMSG.innerHTML = data.msg;
    usernameInputDOM.value = "";
    passwordInputDOM.value = "";
    errorMSG.classList.add("alert-sucess");
    errorMSG.classList.remove("alert-danger");
checkToken();

  } catch (error) {
    errorMSG.classList.add("alert-danger");
    errorMSG.classList.remove("alert-sucess");
    errorMSG.innerHTML = error.response.data.msg;
  }
  setTimeout(() => {
    errorMSG.innerHTML = "";
    errorMSG.classList.remove('alert-danger')
  }, 4000);
});

// btnDOM.addEventListener('click', async () => {
//   const token = localStorage.getItem('token')
//   try {
//     const { data } = await axios.get('/api/v1/dashboard', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`

//     data.secret
//   } catch (error) {
//     localStorage.removeItem('token')
//     resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`
//   }
// })

const checkToken = async () => {
  const token = localStorage.getItem('token')
  if (token) {
  window.location = '/admin/admin.html'
}
}

checkToken()
