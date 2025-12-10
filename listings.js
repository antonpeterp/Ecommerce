// import { products, CART_ICON } from "./products.js";

// const productContainer = document.getElementById("products");

// // creating elements
// for (let product of products) {
//   const cardContainer = document.createElement("div");
//   cardContainer.classList.add(
//     "card",
//     "card-vertical",
//     "d-flex",
//     "direction-column",
//     "relative",
//     "shadow"
//   );

//   // image container
//   const imageContainer = document.createElement("div");
//   imageContainer.classList.add("card-image-container");

//   const image = document.createElement("img");
//   image.classList.add("card-image");
//   image.setAttribute("src", product.img);
//   image.setAttribute("alt", product.alt || product.name);

//   imageContainer.appendChild(image);

//   // Card Details
//   const cardDetailsContainer = document.createElement("div");
//   cardDetailsContainer.classList.add("card-details");

//   const cardtitleContainer = document.createElement("div");
//   cardtitleContainer.classList.add("card-title");
//   cardtitleContainer.innerText = product.brand;
//   cardDetailsContainer.appendChild(cardtitleContainer);

//   //description container
//   const cardDescriptionContainer = document.createElement("div");
//   cardDescriptionContainer.classList.add("card-description");

//   const name = document.createElement("p");
//   name.classList.add("card-des");
//   name.innerText = product.name;
//   cardDescriptionContainer.appendChild(name);

//   const price = document.createElement("p");
//   price.classList.add("card-price");
//   price.innerText = `Rs. ${product.newPrice}`;
//   cardDescriptionContainer.appendChild(price);

//   const sale = document.createElement("span");
//   sale.classList.add("price-strike-through");
//   sale.innerText = `Rs. ${product.oldPrice}`;
//   cardDescriptionContainer.appendChild(sale);

//   const discount = document.createElement("span");
//   discount.classList.add("discount");
//   discount.innerText = `${product.discount}% OFF`;
//   cardDescriptionContainer.appendChild(discount);

//   cardDetailsContainer.appendChild(cardDescriptionContainer);

//   // btn
//   const buttoncontainer = document.createElement("div");
//   buttoncontainer.classList.add("cta-btn");

//   const btnicon = document.createElement("button");
//   btnicon.classList.add(
//     "button",
//     "btn-primary",
//     "btn-icon",
//     "cart-btn",
//     "d-flex",
//     "align-center",
//     "justify-center",
//     "gap",
//     "cursor",
//     "btn-margin"
//   );
//   btnicon.innerText = `Add To Cart`;

//   // cart image
//   const cartimage = document.createElement("img");
//   cartimage.setAttribute("src", CART_ICON);

//   btnicon.appendChild(cartimage);
//   buttoncontainer.appendChild(btnicon);

//   cardDetailsContainer.appendChild(buttoncontainer);

//   // append everything to main card
//   cardContainer.appendChild(imageContainer);
//   cardContainer.appendChild(cardDetailsContainer);
//   cardContainer.appendChild(cardDetailsContainer);

//   productContainer.appendChild(cardContainer);
// }
// //filter
// const genderFilters = document.getElementsByName("gender");

// genderFilters.forEach((filter) => {
//   filter.addEventListener("change", function () {
//     const selected = this.value;

//     let filteredList = products;

//     if (selected !== "ALL") {
//       filteredList = products.filter((p) => p.idealFor === selected);
//     }

//     renderProducts(filteredList);
//   });
// });
import { products, CART_ICON } from "./products.js";

const productContainer = document.getElementById("products");

function renderProducts(list) {
  productContainer.innerHTML = "";

  for (let product of list) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add(
      "card",
      "card-vertical",
      "d-flex",
      "direction-column",
      "relative",
      "shadow"
    );

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("card-image-container");

    const image = document.createElement("img");
    image.classList.add("card-image");
    image.src = product.img;
    image.alt = product.alt || product.name;

    imageContainer.appendChild(image);

    const cardDetailsContainer = document.createElement("div");
    cardDetailsContainer.classList.add("card-details");

    const title = document.createElement("div");
    title.classList.add("card-title");
    title.innerText = product.brand;

    const desc = document.createElement("div");
    desc.classList.add("card-description");

    const name = document.createElement("p");
    name.classList.add("card-des");
    name.innerText = product.name;

    const price = document.createElement("p");
    price.classList.add("card-price");
    price.innerText = `Rs. ${product.newPrice}`;

    const sale = document.createElement("span");
    sale.classList.add("price-strike-through");
    sale.innerText = `Rs. ${product.oldPrice}`;

    const discount = document.createElement("span");
    discount.classList.add("discount");
    discount.innerText = `${product.discount}% OFF`;

    const ratings = document.createElement("span");
    ratings.classList.add("rating");
    ratings.innerText = `⭐ ${product.rating}`;

    desc.appendChild(name);
    desc.appendChild(price);
    desc.appendChild(sale);
    desc.appendChild(discount);
    desc.appendChild(ratings);

    cardDetailsContainer.appendChild(title);
    cardDetailsContainer.appendChild(desc);

    // BUTTON
    const buttoncontainer = document.createElement("div");
    buttoncontainer.classList.add("cta-btn");

    const btn = document.createElement("button");
    btn.classList.add(
      "button",
      "btn-primary",
      "btn-icon",
      "cart-btn",
      "d-flex",
      "align-center",
      "justify-center",
      "gap",
      "cursor",
      "btn-margin"
    );
    btn.innerText = "Add To Cart";

    const cartImg = document.createElement("img");
    cartImg.src = CART_ICON;

    btn.appendChild(cartImg);
    buttoncontainer.appendChild(btn);

    cardDetailsContainer.appendChild(buttoncontainer);

    cardContainer.appendChild(imageContainer);
    cardContainer.appendChild(cardDetailsContainer);

    productContainer.appendChild(cardContainer);
  }
}

renderProducts(products);

const genderFilters = document.getElementsByName("gender");
const priceFilters = document.getElementsByName("price");
const ratingFilters = document.getElementsByName("rating");

let selectedGender = "ALL";
let selectedPrice = "ALL";
let selectedRating = "ALL";

function applyFilters() {
  let filtered = products;

  // Gender Filter
  if (selectedGender !== "ALL") {
    filtered = filtered.filter((p) => p.idealFor === selectedGender);
  }

  // Price Filter
  if (selectedPrice !== "ALL") {
    const [min, max] = selectedPrice.split("-").map(Number);
    filtered = filtered.filter((p) => p.newPrice >= min && p.newPrice <= max);
  }

  // Rating Filter
  if (selectedRating !== "ALL") {
    const minRating = Number(selectedRating);
    filtered = filtered.filter((p) => p.rating >= minRating);
  }

  renderProducts(filtered);
}

// GENDER EVENTS
genderFilters.forEach((filter) => {
  filter.addEventListener("change", function () {
    selectedGender = this.value;
    applyFilters();
  });
});

// PRICE EVENTS
priceFilters.forEach((filter) => {
  filter.addEventListener("change", function () {
    selectedPrice = this.value;
    applyFilters();
  });
});

// RATINGS EVENTS
ratingFilters.forEach((filter) => {
  filter.addEventListener("change", function () {
    selectedRating = this.value;
    applyFilters();
  });
});
