// Yummy Studio — Mini site behavior

(function () {
  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  // Product sub-menu toggle
  var productCards = document.querySelectorAll(".product-card");
  if (productCards.length) {
    productCards.forEach(function (card) {
      card.addEventListener("click", function (event) {
        // Avoid double-trigger if clicking inside subitem button
        if (event.target.closest(".subitem-card")) return;

        var isActive = card.classList.contains("active");
        productCards.forEach(function (c) {
          c.classList.remove("active");
        });
        if (!isActive) {
          card.classList.add("active");
        }
      });
    });
  }
})();
