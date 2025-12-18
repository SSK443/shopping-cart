document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, products: "lamp", price: 33 },
    { id: 2, products: "torch", price: 150 },
    { id: 3, products: "tree", price: 400 },
    { id: 4, products: "tyre", price: 3300 },
  ];
  let cart = JSON.parse(localStorage.getItem("value")) || [];
  let total = 0;
  const productSection = document.querySelector(".products");
  const addmsg = document.querySelector(".card-msg");
  const totalValue = document.querySelector(".total-price");
  const proDiv = document.createElement("div");
  proDiv.className = "pro";
  products.forEach((pro) => {
    proDiv.innerHTML += `
  <article class='prod'><span>product:${pro.products}</span> <span>price:${pro.price}</span> <button prod-id="${pro.id}">add to card</button></article>
  
  `;
  });
  productSection.appendChild(proDiv);

  proDiv.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON" && e.target.hasAttribute("prod-id")) {
      let productId = parseInt(e.target.getAttribute("prod-id"));

      let cartResult = products.find((pro) => pro.id === productId);
      cart.push(cartResult);
      syncart();
      addToCart();
    }
  });

  function addToCart() {
    total = 0;
    if (cart.length === 0) {
      addmsg.innerHTML = "cart is empty";
      totalValue.innerHTML = `
      <article>
        total: 0
        <button class="checkOut">checkout</button>
      </article>
    `;

      return;
    }
    addmsg.innerHTML = "";
    cart.forEach((pro) => {
      addmsg.innerHTML += `
      
       <article class='prod'><span>product:${pro.products}</span> <span>price:${pro.price}</span> <button class="remove-btn" data-id="${pro.id}">remove</button></article>
      `;
      total += pro.price;
    });

    totalprice(total);
  }

  addmsg.addEventListener("click", function (e) {
    e.stopPropagation();
    if (e.target.classList.contains("remove-btn")) {
      const id = parseInt(e.target.dataset.id);
      removeFromCard(id);
    }
  });

  function removeFromCard(id) {
    const index = cart.findIndex((data) => data.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
      syncart();
    }

    addToCart();
  }

  function totalprice(price) {
    totalValue.innerHTML = `
<article>total:${price} <button class="checkOut"

>checkout</button></article>

`;
  }

  totalValue.addEventListener("click", function (e) {
    if (e.target.classList.contains("checkOut")) {
      checkOut(e);
    }
  });
  function checkOut(e) {
    e.stopPropagation();

    alert("checkout sucessfully");

    cart.length = 0;
    addmsg.innerHTML = "empty card";
    total = 0;
    localStorage.removeItem("value");
    addToCart();
  }

  function syncart() {
    localStorage.setItem("value", JSON.stringify(cart));
  }
  addToCart();
});
