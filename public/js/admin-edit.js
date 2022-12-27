const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("id");
const productName = document.getElementById("Pname");
const productCategory = document.getElementById("Pcat");
const productPrice = document.getElementById("Pprice");
const productDesc = document.getElementById("Pdesc");
const productImage = document.getElementById("Pimg");
const formDOM = document.getElementById("form");
const msg = document.getElementById("msg");

async function getSingleProduct() {
  try {
    const { data: response } = await axios.get(`/api/v1/products/${id}`);
    // const totalResponse = response.total_Product;
    const { name, price, image, description, category } =
      response.data.product[0];
    // total.innerHTML = totalResponse;
    console.log(name);
    productName.value = name;
    productPrice.value = price;
    productDesc.value = description;
    productCategory.value = category;
    // console.log(response.data);

    // loader.classList.add("hide");
    // loader.classList.remove("showLoader");
  } catch (error) {
    // body.innerHTML = `<h1>Oops, Something went wrong.</h1>`;
    console.log(error);
  }
}
getSingleProduct();

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.innerHTML = "Kindly wait for product to be updated...";
  try {
    const name = productName.value;
    const price = productPrice.value;
    const description = productDesc.value;
    const category = productCategory.value;

    const {
      data: { task },
    } = await axios.patch(`/api/v1/products/update/${id}`, {
      name: name,
      price: price,
      description: description,
      category: category,
    });
    msg.innerHTML = "Updated Successfully...";
    productName.value = "";
    productPrice.value = "";
    productDesc.value = "";
    productCategory.value = "";
    window.scrollTo(0, 0);
  } catch (error) {
    msg.innerHTML = "Oops, something went wrong pls try again..."
  }
});
