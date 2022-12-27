const queryString = window.location.search;
const id = new URLSearchParams(queryString).get("key");
const names = new URLSearchParams(queryString).get("name");
const total = document.querySelector("#count");
const loader = document.querySelector("#postLoader");
const productName = document.querySelector("#name");
const productPrice = document.querySelector("#price");
const productImage = document.querySelector("#img");
const productDesc = document.querySelector("#desc");
const productCategory = document.querySelector("#category");

async function getSingleProduct() {
  try {
    const { data: response } = await axios.get(`/api/v1/products/${id}`);
    const totalResponse = response.total_Product;
    const { name, price, image, description, category } = response.data.product[0];
    total.innerHTML = totalResponse;
    productName.innerHTML = name;
    productPrice.value = price;
    productDesc.innerHTML = description;
    productCategory.innerHTML = category;
    productImage.src = image;
    console.log(response.data);

    loader.classList.add("hide");
    loader.classList.remove("showLoader");
  } catch (error) {
    // body.innerHTML = `<h1>Oops, Something went wrong.</h1>`;
    console.log(error);
  }
}
getSingleProduct();

const cartBtn = document.getElementById('cartBtn')
const quantity = document.getElementById('quantity')

cartBtn.addEventListener('click', () => {

  axios({
  method: 'post',
  url: '/api/v1/products/cart',
  data: {
    id: id,
    name: names,
    quantity: quantity.value,
    price: productPrice.value
  },
  headers: {'Authorization': 'Bearer ...'}
  })
  cartBtn.value = "Added to cart"
  setTimeout(() => {
  cartBtn.value = "Update cart";
    
  }, 4000)
})