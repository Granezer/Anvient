const tableContainer = document.getElementById("Tbody");
const userDOM = document.getElementById("user");
const errorDOM = document.getElementById("msg");
const counter = document.getElementById("count");
const url = '/api/v1/enquiry'
const getEnquiries = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data: response } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const enquires = response.data;
    console.log(response);
    const user = response.username;
    const length = response.length;
    userDOM.innerHTML = user;
    counter.innerHTML = length;
    if (enquires.length === 0) {
      errorDOM.classList.add("danger");
    errorDOM.classList.remove("sucess");
    errorDOM.innerHTML =
      "No enquiries has been submitted as at now.";
      return;
    }
    const arr_enquiry = enquires.map((item) => {
      const {name, email, phone, time, message} = item
      return `<tr>
              <td>${name}</td>
              <td>
                <ul>
                  <li>Name: ${name}</li>
                  <li>E-mail: ${email}</li>
                  <li>Telephone: ${phone}</li>
                  <li>Message: ${message}</li>
                </ul>
              </td>
              <td>${time}</td>
            </tr>`;
    });
    const reverseArr = arr_enquiry.reverse()
    tableContainer.innerHTML = reverseArr.join(' ');
  } catch (error) {
    errorDOM.classList.add("danger");
    errorDOM.classList.remove("sucess");
    errorDOM.innerHTML =
      "Oops, something went wrong. Pls attempt to login again...";
  }
};
getEnquiries();

const logoutDOM = document.getElementById("logout");
const logout = () => {
  const token = localStorage.getItem("token");
  if (token) {
    localStorage.removeItem("token");
    window.location = "/admin";
  }
};

logoutDOM.addEventListener("click", logout);
