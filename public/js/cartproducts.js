const cartWrapper = document.getElementById("cartProductWrapper");
const total = document.getElementById("total");
let totalNum = 0
async function getCartProducts() {
  const { data: response } = await axios.get("/api/v1/products/cart/all-cart");
  if (response.length === 0) {
    cartWrapper.innerHTML =
      '<div class="productWrapper">No products in cart...</div>';
    return;
  }

  const res = response.map(async (r) => {
    const { data: re } = await axios.get("/api/v1/products/cartValues/" + r);
    const txt = `<tr class="rrr">
            <th scope="row">${re.name}</th>
            <td>
            <i class="fa-solid fa-naira-sign icon"></i>${re.price.toLocaleString(
              "en-US"
            )}</td>
            <td>${re.quantity}</td>
            <td><i class="fa-solid fa-naira-sign icon"></i>${(
              re.price * re.quantity
            ).toLocaleString("en-US")}</td>
          <td>
</td>
          </tr>`;
    cartWrapper.insertAdjacentHTML("beforeend", txt);
    totalNum += Number(re.price * re.quantity);
    total.innerHTML = totalNum
    console.log(re);
    addTotal();
    addSubtotal();
  });
}

getCartProducts();
