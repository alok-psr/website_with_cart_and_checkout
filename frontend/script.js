const section = document.getElementById("product_section_grid");
let product_obj_array = JSON.parse(localStorage.sharedArray) || [];

let pageNo = 1;
let limit = 10;
let category = "laptop";
const url = `https://api.freeapi.app/api/v1/public/randomproducts?page=${pageNo}&limit=${limit}&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid&query=${category}`;

// fetching data from api
async function fetchData(limit = 10, pageNo = 1, category = "laptop") {
  let response = await fetch(
    `https://api.freeapi.app/api/v1/public/randomproducts?page=${pageNo}&limit=${limit}&inc=category%252Cprice%252Cthumbnail%252Cimages%252Ctitle%252Cid&query=${category}`
  );
  const data = await response.json();
  return data;
}
const all_categories = ["shoes", "laptop", "bag", "smartphones"];
const all_items = document.getElementById("allItems");

all_items.addEventListener("click", function () {
  while (section.hasChildNodes()) {
    section.removeChild(section.firstChild);
  }
  for (let i = 0; i < 4; i++) {
    createProdCard(all_categories[i]);
  }
});
all_items.click();

const shoes = document.getElementById("shoes");
shoes.addEventListener("click", () => categorise(0));

const laptop = document.getElementById("laptop");
laptop.addEventListener("click", () => categorise(1));

const bag = document.getElementById("bag");
bag.addEventListener("click", () => categorise(2));

const mobile = document.getElementById("smartPhones");
mobile.addEventListener("click", () => categorise(3));

// function to rmove already present elemts on prod grid and replace it with new elemts
function categorise(index) {
  while (section.hasChildNodes()) {
    section.removeChild(section.firstChild);
  }
  createProdCard(all_categories[index]);
}

// creating and adding product
async function createProdCard(category, limit = 10) {
  const allData = await fetchData(limit, 1, category);
  const total_items = allData.data.totalItems;
  for (let i = 0; i < total_items; i++) {
    const cont_div = document.createElement("div");
    cont_div.classList.add(
      "w-[200px]",
      "h-[300px]",
      "m-auto",
      "bg-slate-950",
      "rounded-2xl",
      "grid",
      "grid-cols-1"
    );

    const img = document.createElement("img");
    const img_data =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj2kAq2uWeSeHs2Mb3RrVmU-WR4jf86si0vw&s";
    img.classList.add(
      "h-[160px]",
      "w-[160px]",
      "mt-3",
      "rounded-lg",
      "mx-auto"
    );

    const prod_name = document.createElement("h3");
    const name_data = allData.data.data[i]["title"];
    prod_name.classList.add("text-center", "text-sky-100", "w-full", "text-xl");

    const prod_price = document.createElement("h5");
    const price_data = allData.data.data[i]["price"];
    // const price_data = `Rs. 149900`;
    prod_price.classList.add(
      "text-centre",
      "text-sky-100",
      "text-lg",
      "mx-auto"
    );

    const button_wishlist = document.createElement("button");
    button_wishlist.classList.add(
      "add_to_cart",
      "text-centre",
      "text-slate-900",
      "bg-slate-300",
      "w-full",
      "py-1",
      "rounded-b-lg",
      "active:bg-slate-500",
      "cursor-pointer",
      "active:text-gray-200"
    );

    button_wishlist.addEventListener(
      "click",
      clicked(name_data, price_data * 80)
    );

    const section = document.getElementById("product_section_grid");

    // setting values and attribs
    img.setAttribute("src", img_data);
    prod_name.innerText = `${name_data}`;
    prod_price.innerText = `Rs. ${(price_data * 80).toLocaleString("hi-IN")}`;
    button_wishlist.innerText = "+ cart";
    button_wishlist.setAttribute("id", "add_to_button");

    // adding the elemnts
    cont_div.appendChild(img);
    cont_div.appendChild(prod_name);
    cont_div.appendChild(prod_price);
    cont_div.appendChild(button_wishlist);
    section.appendChild(cont_div);
  }
}
// saveing ProdArray in localstorage when wishlist link is clicked
const wishlistLink_array = document.getElementsByClassName("wishlistLink");
wishlistLink_array[0].addEventListener("click", storeProdArray);
if (product_obj_array.length > 0) {
  wishlistLink_array[0].innerText = `Cart [${product_obj_array.length}]`;
}
// dom for nav below
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
  });

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(
    'button[aria-controls="mobile-menu"]'
  );
  const mobileMenu = document.getElementById("mobile-menu");
  const userMenuButton = document.getElementById("user-menu-button");
  const userMenu = userMenuButton.nextElementSibling;

  menuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  userMenuButton.addEventListener("click", function () {
    userMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", function (event) {
    if (
      !userMenuButton.contains(event.target) &&
      !userMenu.contains(event.target)
    ) {
      userMenu.classList.add("hidden");
    }
  });
});

/* 
add_to_cart problem:: transfer the data(prod name and price to other js which is for wishlist.html)

my sol:: add an eventlistner on add_tocart button and funcion creates a product object from a predefined class which takes prod name and price as argument and then after creating this object it is appended to an array whihc holds all of the object of products 
then this array is exported to js file wishlist.js and then is used as array[index of object].name or .price to get the data  
*/

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.count = 0;
  }
}

// when add to cart is clicked this fn is triggered
function clicked(name_data, price_data) {
  return function () {
    let nProd = new Product(name_data, price_data);

    // product_obj_array.push(nProd);
    // console.log(product_obj_array.length, nProd.name);
    if (product_obj_array.length < 1) {
      product_obj_array.push(nProd);
      nProd.count++;
      wishlistLink_array[0].innerText = `Cart [${product_obj_array.length}]`;

      console.log("first prod added");
    } else {
      let i = 0;
      while (i < product_obj_array.length) {
        if (product_obj_array[i].name == nProd.name) {
          product_obj_array[i].count += 1;
          console.log("counter increased");
          console.log(product_obj_array[i].count);
        } else if (i == product_obj_array.length - 1) {
          product_obj_array.push(nProd);
          // nProd.count++;
          console.log("new prod added", product_obj_array);
          wishlistLink_array[0].innerText = `Cart [${product_obj_array.length}]`;
        }
        i++;
      }
    }
  };
}
// storeing the prod array in localstorage to use it in wishlist.js
function storeProdArray() {
  localStorage.setItem("sharedArray", JSON.stringify(product_obj_array));
}

// clear cart button

const clear_butt = document.getElementsByClassName("reset_prod_array")[0];
clear_butt.addEventListener("click", () => {
  product_obj_array = [];
  wishlistLink_array[0].innerText = `Cart`;
});
