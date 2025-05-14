let search = document.querySelector(".search-box");
let navbar = document.querySelector(".navbar");

document.querySelector("#search-icon").onclick = () => {
  search.classList.toggle("active");
  navbar.classList.remove("active");
};

document.querySelector("#menu-icon").onclick = () => {
  navbar.classList.toggle("active");
  search.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
  search.classList.remove("active");
};

let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

function changeColorBlindMode(mode) {
  let root = document.documentElement;

  if (mode === "deuteranopia") {
    root.style.setProperty("--main-color", "#A1A1A1");
    root.style.setProperty("--second-color", "#F5A5A5");
    root.style.setProperty("--text-color", "#333333");
  } else if (mode === "protanopia") {
    root.style.setProperty("--main-color", "#A1A1A1");
    root.style.setProperty("--second-color", "#B5B5FF");
    root.style.setProperty("--text-color", "#222222");
  } else if (mode === "tritanopia") {
    root.style.setProperty("--main-color", "#B5B5B5");
    root.style.setProperty("--second-color", "#FFFFB5");
    root.style.setProperty("--text-color", "#444444");
  } else {
    root.style.setProperty("--main-color", "#bc9667");
    root.style.setProperty("--second-color", "#edeae3");
    root.style.setProperty("--text-color", "#1b1b1b");
  }
}

let cart = [];
let cartModal = document.querySelector("#cart-modal");
let cartItemsContainer = document.querySelector("#cart-items");
let totalPriceElement = document.querySelector("#cart-total-price");
let cartCountElement = document.querySelector("#cart-count");

document.querySelector(".bx-cart-alt").addEventListener("click", () => {
  cartModal.classList.toggle("active");
  renderCartItems();
});

document.querySelector("#close-cart").addEventListener("click", () => {
  cartModal.classList.remove("active");
});

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    let productId = event.target.dataset.productId;
    let productName = event.target.dataset.productName;
    let productPrice = parseFloat(event.target.dataset.productPrice);

    addToCart(productId, productName, productPrice);
  });
});

function addToCart(productId, productName, productPrice) {
  let product = { id: productId, name: productName, price: productPrice };

  let existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  updateCartDisplay();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    let itemTotalPrice = item.price * item.quantity;
    totalPrice += itemTotalPrice;

    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <h4>${item.name}</h4>
      <span>${item.price} Fr. x ${item.quantity}</span>
      <button class="remove-item" data-product-id="${item.id}">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);

    cartItem
      .querySelector(".remove-item")
      .addEventListener("click", (event) => {
        let productId = event.target.dataset.productId;
        removeFromCart(productId);
      });
  });

  totalPriceElement.textContent = `${totalPrice.toFixed(2)} Fr.`;
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCartItems();
  updateCartDisplay();
}

function updateCartDisplay() {
  let cartCount = cart.reduce((sum, product) => sum + product.quantity, 0);
  document.querySelector(".bx-cart-alt").setAttribute("data-count", cartCount);
  cartCountElement.textContent = cartCount;
}
