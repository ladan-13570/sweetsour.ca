// Sweet & Sour Treats

(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Mobile menu toggle ──
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
      toggle.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        toggle.classList.remove("active");
      });
    });
  }

  // ── Header scroll effect ──
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ── Scroll reveal ──
  var revealTargets = document.querySelectorAll(
    ".about-card, .product-card, .contact-form, .contact-social, .section-label, .about h2, .products h2, .contact h2, .contact-intro"
  );

  if (revealTargets.length && "IntersectionObserver" in window) {
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.08 + "s";
      revealObserver.observe(el);
    });
  }

  // ── Product sub-menu toggle ──
  var productCards = document.querySelectorAll(".product-card");
  if (productCards.length) {
    productCards.forEach(function (card) {
      card.addEventListener("click", function (event) {
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

  // ── EmailJS Contact Form ──
  var EMAILJS_PUBLIC_KEY = "TKoxK2hGpU8Ys6boW";
  var EMAILJS_SERVICE_ID = "service_t1bn3os";
  var EMAILJS_TEMPLATE_ID = "template_epskbzx";

  if (window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  var form = document.getElementById("contact-form");
  if (!form) return;

  var nameInput = document.getElementById("user_name");
  var emailInput = document.getElementById("user_email");
  var phoneInput = document.getElementById("user_phone");
  var messageInput = document.getElementById("message");
  var errorEl = document.getElementById("form-error");
  var successEl = document.getElementById("form-success");

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = false;
    successEl.hidden = true;
  }

  function hideMessages() {
    errorEl.hidden = true;
    successEl.hidden = true;
  }

  function clearInvalid() {
    form.querySelectorAll(".invalid").forEach(function (el) {
      el.classList.remove("invalid");
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    hideMessages();
    clearInvalid();

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var phone = phoneInput.value.trim();
    var message = messageInput.value.trim();
    var valid = true;

    if (!name) {
      nameInput.classList.add("invalid");
      valid = false;
    }

    if (!email && !phone) {
      emailInput.classList.add("invalid");
      phoneInput.classList.add("invalid");
      showError("Please provide at least an email address or phone number.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailInput.classList.add("invalid");
      showError("Please enter a valid email address.");
      return;
    }

    if (!message) {
      messageInput.classList.add("invalid");
      valid = false;
    }

    if (!valid) {
      showError("Please fill in all required fields.");
      return;
    }

    var captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse) {
      showError("Please complete the CAPTCHA verification.");
      return;
    }

    var submitBtn = form.querySelector(".btn-submit");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending\u2026";

    var templateParams = {
      user_name: name,
      user_email: email || "Not provided",
      user_phone: phone || "Not provided",
      message: message,
      "g-recaptcha-response": captchaResponse
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(function () {
        successEl.hidden = false;
        errorEl.hidden = true;
        form.reset();
        grecaptcha.reset();
      })
      .catch(function (err) {
        showError("Something went wrong. Please try again or reach out on Instagram.");
        console.error("EmailJS error:", err);
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      });
  });
})();
