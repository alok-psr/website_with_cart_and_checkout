const cartItems = JSON.parse(localStorage.getItem("sharedArray"));
console.log(cartItems);

const prod_list = document.getElementById("product_list");
const price_list = document.getElementById("price_list");
const before_tax_ele = document.getElementById("sum_total");
const taxes_ele = document.getElementById("taxes");
const after_tax_ele = document.getElementById("total_amt");

function fn_add_price() {
  let sum = 0;
  for (let i of cartItems) {
    sum += i.price * i.count;
  }
  return sum;
}
for (let i of cartItems) {
  let prod_li = document.createElement("li");

  prod_li.classList.add("text-sky-100", "w-full", "text-lg");
  prod_li.innerText = `${cartItems.indexOf(i) + 1}]\t\t${i.name}\t\t(X${
    i.count
  })`;
  prod_li.style.whiteSpace = "pre";

  let price_li = document.createElement("li");

  price_li.classList.add("text-center", "text-sky-100", "w-full", "text-lg");
  price_li.innerText = `Rs. ${i.price.toLocaleString("hi-IN")} X ${
    i.count
  }=\t\t Rs.${(i.price * i.count).toLocaleString("hi-IN")}`;
  price_li.style.whiteSpace = "pre";

  let hr = document.createElement("hr");
  hr.setAttribute("style", "color:gray;");
  let hr2 = document.createElement("hr");
  hr2.setAttribute("style", "color:gray;");

  prod_li.appendChild(hr2);
  price_li.appendChild(hr);

  prod_list.appendChild(prod_li);
  price_list.appendChild(price_li);
}

const before_tax_amt = fn_add_price();
console.log("before GST", before_tax_amt);
const tax_amt = before_tax_amt * 0.18;
console.log("taxx amt", tax_amt);
const after_tax_amt = tax_amt + before_tax_amt;
console.log("after 18% GST", after_tax_amt);

before_tax_ele.innerText = `Before Taxes:: Rs. ${before_tax_amt.toLocaleString(
  "hi-IN"
)}`;
taxes_ele.innerText = `Taxes(18% GST):: Rs. ${tax_amt.toLocaleString("hi-IN")}`;
after_tax_ele.innerText = `After Taxes:: Rs. ${after_tax_amt.toLocaleString(
  "hi-IN"
)}`;

// clear button to clear the list in localstorage and empty the elemt in ul
const clear_butt = document.getElementById("clear");

clear_butt.addEventListener("click", () => {
  console.log(JSON.parse(localStorage.getItem("sharedArray")));

  while (prod_list.children.length != 1) {
    price_list.removeChild(price_list.lastChild);
    prod_list.removeChild(prod_list.lastChild);
  }
  cartItems.splice(0);
  localStorage.setItem("sharedArray", JSON.stringify(cartItems));
  before_tax_ele.innerText = `Before Taxes:: Rs. 0`;
  taxes_ele.innerText = `Taxes(18% GST):: Rs. 0`;
  after_tax_ele.innerText = `After Taxes:: Rs. 0`;
  console.log(localStorage.getItem("sharedArray"));
});

const popup = document.getElementById("payment_popup_body");
const close_popup = document.getElementById("close_popup");
const checkout_butt = document.getElementById("proceed");

checkout_butt.addEventListener("click", () => popup.classList.toggle("hidden"));
close_popup.addEventListener("click", () => popup.classList.toggle("hidden"));
popup.addEventListener("click", (event) => {
  console.log(event.target.getAttribute("id"));
  if (event.target.getAttribute("id") === "popup_centering") {
    popup.classList.toggle("hidden");
  }
});

const popup_amt = document.getElementById("popup_tot_amt");
popup_amt.innerText = `Amout to be paid= Rs.${after_tax_amt.toLocaleString(
  "hi-IN"
)}`;
