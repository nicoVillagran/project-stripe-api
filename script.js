"use strict";
import USER_KEYS from "./keys.js";

const d = document,
  $products = d.querySelector(".products"),
  $tem = d.querySelector("template").content,
  $fragment = d.createDocumentFragment(),
  localTheme = localStorage.getItem("theme");
let keys = { headers: { Authorization: `Bearer ${USER_KEYS["secret-key"]}` } };

Promise.all([
  fetch("https://api.stripe.com/v1/products", keys),
  fetch("https://api.stripe.com/v1/prices", keys),
])
  .then((res) => Promise.all(res.map((res) => res.json())))
  .then((json) => {
    json[0].data.forEach((e) => {
      let price = json[1].data.filter((pri) => pri.product == e.id);

      $tem.querySelector(".options").setAttribute("id", price[0].id);
      $tem.querySelector(".options__picture").dataset.opinion = "⭐ 5.0";
      $tem
        .querySelector(".options__picture-img")
        .setAttribute("src", e.images[0]);
      $tem.querySelector(".options__h4").textContent = e.name;
      $tem.querySelector(".options__p").textContent =
        price[0].recurring.interval;
      $tem.querySelector(
        ".options__price"
      ).textContent = `$${price[0].unit_amount_decimal[0]}${price[0].unit_amount_decimal[1]}.00 ${price[0].currency}`;

      let clone = d.importNode($tem, true);
      $fragment.appendChild(clone);
    });
    $products.appendChild($fragment);
  })
  .catch((err) => console.log(err));

d.addEventListener("click", (e) => {
  if (e.target.matches(".products *")) {
    let price =
      e.target.parentElement.className == "products"
        ? e.target.getAttribute("id")
        : e.target.parentElement.getAttribute("id");
    // console.log(price)
    Stripe(USER_KEYS["public-key"])
      .redirectToCheckout({
        lineItems: [{ price, quantity: 1 }],
        mode: "subscription",
        successUrl:
          "https://nicovillagran.github.io/project-stripe-api/success.html",
        cancelUrl:
          "https://nicovillagran.github.io/project-stripe-api/cancel.html",
      })
      .then((res) => {
        console.log(res);
        if (res.error)
          $products.insertAdjacentHTML("afterend", res.error.message);
      });
  } else if (e.target.matches(".header__btn"))
    alert("I'm sorry, this is just an example button.");
  else if (e.target.matches(".theme-btn")) {
    let $children = e.target.children,
      theme = e.target.dataset.theme;
    for (const c of $children) {
      if (c.classList[0] == "hidden") c.classList.remove("hidden");
      else c.classList.add("hidden");
    }
    handleTheme(theme, e.target);
  }
});

function handleTheme(t, el = false) {
  if (el) {
    t == "light"
      ? (el.dataset.theme = "dark")
      : t == "dark"
      ? (el.dataset.theme = "light")
      : false;
    changeTheme(t);
  } else {
    if (!t) return false;
    changeTheme(t);
  }
}

function changeTheme(theme) {
  if (theme == "light") {
    document.documentElement.style.setProperty("--fill", "#fff");
    document.documentElement.style.setProperty("--color", "#1e1e1e");
  } else if (theme == "dark") {
    document.documentElement.style.setProperty("--fill", "#1e1e1e");
    document.documentElement.style.setProperty("--color", "#fff");
  }
}

handleTheme(localTheme);
