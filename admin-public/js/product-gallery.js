const queryString = window.location.search;
const category = new URLSearchParams(queryString).get("category");
const total = document.querySelector("#count");
const productWrapper = document.getElementById("gallaryWrapper");
const loader = document.querySelector("#postLoader");


const url = `/api/v1/products/product/${category}`;
const getCategoryProducts = async () => {
  const { data } = await axios.get(url);
  const products = data.data;
    const totalResponse = data.total_counts;
    total.innerHTML = totalResponse;

  if (!products === undefined) {
    return productWrapper.innerHTML ='No products found'
  }
  const allProducts = products.map((product) => {
    return `<a href="product.html?key=${product._id}&name=${
      product.name
    }" class="productWrapper column nature is">
          <img src="/${product.image}" class="pImg">
          <h6>${product.name}</h6>
          <h6 class="price"><i class="fa-solid fa-naira-sign icon"></i>${product.price.toLocaleString(
            "en-US"
          )}</h6>
    </a>`;
  });

  productWrapper.innerHTML = allProducts;
  
    loader.classList.add("hide");
    loader.classList.remove("showLoader");
};

getCategoryProducts()
