const supplementContainer = document.getElementById("supplementContainer");
const DconsummableContainer = document.getElementById("daily-consummable");

const getSupplementProducts = async () => {
  const { data } = await axios.get("/api/v1/products/supplement");
  const supplements = data.data;
  const allProducts = supplements.map((product) => {
    return `<a href="product.html?key=${product._id}&name=${
      product.name
    }" class="productWrapper">
          <img src="/${product.image}" class="pImg">
          <h6>${product.name}</h6>
          <h6 class="price"><i class="fa-solid fa-naira-sign icon"></i>${product.price.toLocaleString(
            "en-US"
          )}</h6>
    </a>`;
  });

  supplementContainer.innerHTML = allProducts;
};

getSupplementProducts();
// <a href="product.html">product</a>

const getDailyConsummableProducts = async () => {
  const { data } = await axios.get("/api/v1/products/daily-consummable");
  const consummable = data.data;
  const allProducts = consummable.map((product) => {
    return `<a href="product.html?key=${product._id}&name=${
      product.name
    }" class="productWrapper">
          <img src="/${product.image}" class="pImg">
          <h6>${product.name}</h6>
          <h6 class="price"><i class="fa-solid fa-naira-sign icon"></i>${product.price.toLocaleString(
            "en-US"
          )}</h6>
    </a>`;
  });
  console.log(consummable);
  DconsummableContainer.innerHTML = allProducts;
};

getDailyConsummableProducts();
