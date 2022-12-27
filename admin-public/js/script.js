const otherShipping = document.getElementById("others");
const extraDetails = document.getElementById("extraInfo");
const checkLabel = document.getElementById("checkLabel");

function toggleExtraDetails() {
  if (otherShipping.checked) {
    extraDetails.style.display = "block";
  } else {
    extraDetails.style.display = "none";
  }
}
toggleExtraDetails();
checkLabel.addEventListener("click", toggleExtraDetails);

//transfer info toggle
const transferInfo = document.getElementById("transferInfo");
const cardInfo = document.getElementById("cardInfo");
const transferBtn = document.getElementById("transfer");
const cardBtn = document.getElementById("card");

function toggleTransferInfo() {
  if (transferBtn.checked) {
    transferInfo.style.display = "block";
    cardInfo.style.display = "none";
  } else {
    if (cardBtn.checked) {
      transferInfo.style.display = "none";
      cardInfo.style.display = "block";
    }
  }
}
transferBtn.addEventListener("click", toggleTransferInfo);
cardBtn.addEventListener("click", toggleTransferInfo);
toggleTransferInfo()



//form validation
const errMsgDisplay = document.getElementById("errMsg");
const form = document.getElementById("form");
const errorwrapper = document.getElementById("errorWrapper");

//billing selectors
const billing_fname = document.querySelector("#billing-fname");
const billing_lname = document.querySelector("#billing-lname");
const billing_email = document.querySelector("#billing-email");
const billing_str = document.querySelector("#billing-addr");
const billing_town = document.querySelector("#billing-town");
const billing_phone = document.querySelector("#billing-phone");
//shipping selectors
const shipping_fname = document.querySelector("#shipping-fname");
const shipping_lname = document.querySelector("#shipping-lname");
const shipping_addr = document.querySelector("#shipping-addr");
const shipping_town = document.querySelector("#shipping-town");
const loader = document.getElementById('postLoader')

//t and c selector
const tAndc = document.querySelector("#termsAndconditions");

form.addEventListener("submit", (e) => {
  const errArr = [];
  errorwrapper.style.display = "inline-flex";
  errMsgDisplay.innerHTML = "";

  if (billing_fname.value === "") {
    errArr.push("Billing First name");
    billing_fname.style.border = '1px solid red'
  }

  if (billing_lname.value === "") {
    errArr.push("Billing Last name");
    billing_lname.style.border = '1px solid red'

  }

  if(billing_phone.value === ''){
    errArr.push('Billing Phone number')
    billing_phone.style.border = '1px solid red'
  }

  if(billing_town.value === ''){
       errArr.push("Billing Town / City");
    billing_town.style.border = '1px solid red'
  }
  if(billing_str.value === ''){
       errArr.push("Billing street address");
    billing_str.style.border = '1px solid red'
  }

   if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(billing_email.value))){
     errArr.push('Invalid email is Provided');
     billing_email.style.border = '1px solid red'
    }

  

      //checks if the other shipping is checked or not and then runs validation on it
      if(otherShipping.checked){
        if(shipping_fname.value === ''){
          errArr.push('Shipping First name')
          shipping_fname.style.border = '1px solid red'
        }
        if(shipping_lname.value === ''){
          errArr.push('Shipping Last name')
          shipping_lname.style.border = '1px solid red'
        }
        if(shipping_addr.value === ''){
          errArr.push('Shipping Street Address')
          shipping_addr.style.border = '1px solid red'
        }
        if(shipping_town.value === ''){
          errArr.push('Shipping Town / City')
          shipping_town.style.border = '1px solid red'
        }
      }

      if(!(tAndc.checked)){
        errArr.push('Pls read the terms and conditions before proceeding')
      }

  errArr.forEach((msg) => {
    let p = document.createElement("p");
    p.innerHTML = `<strong>${msg}</strong> is required`;
    if(msg === 'Pls read the terms and conditions before proceeding'){
      p.innerHTML = msg
    }
    errMsgDisplay.append(p);
  });

  if (errArr.length >= 1) {
    e.preventDefault();
  } else {
    loader.classList.add('showLoader')
    loader.classList.remove('hide')
  }

  window.scrollTo(0, 0);
});


