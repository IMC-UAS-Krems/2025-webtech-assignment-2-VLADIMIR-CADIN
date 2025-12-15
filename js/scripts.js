document.addEventListener("DOMContentLoaded", function () {

  let cart = [];

  const cartCount = document.getElementById("cartCount");
  const cartList = document.getElementById("cartList");
  const cartTotal = document.getElementById("cartTotal");
  const openCheckout = document.getElementById("openCheckout");
  const checkoutForm = document.getElementById("checkoutForm");
  const formError = document.getElementById("formError");
  const confirmBody = document.getElementById("confirmBody");


  document.querySelectorAll(".add-to-cart").forEach(function (btn) {
    btn.addEventListener("click", function () {
      cart.push({
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price)
      });
      renderCart();
    });
  });

  function renderCart() {
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(function (item) {
      total += item.price;
      const li = document.createElement("li");
      li.textContent = item.name + " - €" + item.price.toFixed(2);
      cartList.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
  }

  
  openCheckout.addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }
    new bootstrap.Modal(document.getElementById("checkoutModal")).show();
  });


  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();
    formError.textContent = "";

    const name = getValue("name");
    const email = getValue("email");
    const phone = getValue("phone");
    const address = getValue("address");
    const zip = getValue("zip");


    if (!name || !email || !phone || !address || !zip) {
      formError.textContent = "All fields are required";
      return;
    }
    if (!email.includes("@")) {
      formError.textContent = "Invalid email";
      return;
    }
    if (!/^[0-9]+$/.test(phone)) {
      formError.textContent = "Phone numbers only";
      return;
    }
    if (zip.length > 6) {
      formError.textContent = "ZIP max 6 characters";
      return;
    }


    let subtotal = 0;
    cart.forEach(item => subtotal += item.price);

    let discount = 0;
    if (cart.length >= 3) {
      discount = subtotal * 0.10; 
    }

    let tax = (subtotal - discount) * 0.20; 
    let total = subtotal - discount + tax;


  let itemsHtml = "";
cart.forEach(function (i) {
  itemsHtml += "<li>" + i.name + " - €" + i.price.toFixed(2) + "</li>";
});

confirmBody.innerHTML =
  "<p><strong>Name:</strong> " + name + "</p>" +
  "<ul>" + itemsHtml + "</ul>" +
  "<p>Subtotal: €" + subtotal.toFixed(2) + "</p>" +
  "<p>Discount: -€" + discount.toFixed(2) + "</p>" +
  "<p>Tax: €" + tax.toFixed(2) + "</p>" +
  "<h5>Total: €" + total.toFixed(2) + "</h5>";



    const checkoutModalEl = document.getElementById("checkoutModal");
    const checkoutInstance = bootstrap.Modal.getInstance(checkoutModalEl);
    if (checkoutInstance) checkoutInstance.hide();


    new bootstrap.Modal(document.getElementById("confirmModal")).show();


    cart = [];
    renderCart();
    checkoutForm.reset();
  });

  function getValue(id) {
    return document.getElementById(id).value.trim();
  }

});

// https://www.youtube.com/watch?v=SAvq2n0nXg8 //
// https://www.youtube.com/watch?v=h-XCj-94j8M //