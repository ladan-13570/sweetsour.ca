// Sweet & Sour Treats

(function () {
  // ── Footer year ──
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Mobile menu ──
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      toggle.classList.toggle("active");
      document.body.style.overflow = open ? "hidden" : "";
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        toggle.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // ── Header scroll ──
  var header = document.querySelector(".header");
  if (header) {
    var checkScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
  }

  // ── Scroll reveal ──
  var revealEls = document.querySelectorAll(
    ".product-card, .service-text, .service-image, .order-text, " +
    ".order-form-wrap, .section-head, .hero-text, .hero-image"
  );

  if (revealEls.length && "IntersectionObserver" in window) {
    revealEls.forEach(function (el) { el.classList.add("reveal"); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el, i) {
      var siblings = el.parentElement ? el.parentElement.children : [];
      var idx = Array.prototype.indexOf.call(siblings, el);
      el.style.transitionDelay = (idx * 0.08) + "s";
      observer.observe(el);
    });
  }

  // ── EmailJS ──
  var EMAILJS_PUBLIC_KEY = "TKoxK2hGpU8Ys6boW";
  var EMAILJS_SERVICE_ID = "service_t1bn3os";
  var EMAILJS_TEMPLATE_ID = "template_epskbzx";

  if (window.emailjs) emailjs.init(EMAILJS_PUBLIC_KEY);

  var form = document.getElementById("contact-form");
  if (!form) return;

  var nameInput   = document.getElementById("user_name");
  var emailInput  = document.getElementById("user_email");
  var phoneInput  = document.getElementById("user_phone");
  var msgInput    = document.getElementById("message");
  var errorEl     = document.getElementById("form-error");
  var successEl   = document.getElementById("form-success");
  var submitBtn   = form.querySelector(".btn-submit");

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

    var name  = nameInput.value.trim();
    var email = emailInput.value.trim();
    var phone = phoneInput.value.trim();
    var msg   = msgInput.value.trim();
    var ok    = true;

    if (!name)  { nameInput.classList.add("invalid"); ok = false; }
    if (!msg)   { msgInput.classList.add("invalid");  ok = false; }

    if (!email && !phone) {
      emailInput.classList.add("invalid");
      phoneInput.classList.add("invalid");
      showError("Please provide at least an email or phone number.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailInput.classList.add("invalid");
      showError("Please enter a valid email address.");
      return;
    }

    if (!ok) { showError("Please fill in all required fields."); return; }

    var captcha = grecaptcha.getResponse();
    if (!captcha) {
      showError("Please complete the CAPTCHA.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending\u2026";

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        user_name:  name,
        user_email: email || "Not provided",
        user_phone: phone || "Not provided",
        message:    msg,
        "g-recaptcha-response": captcha
      })
      .then(function () {
        successEl.hidden = false;
        errorEl.hidden = true;
        form.reset();
        grecaptcha.reset();
      })
      .catch(function (err) {
        showError("Something went wrong. Try again or DM us on Instagram.");
        console.error("EmailJS:", err);
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Order";
      });
  });
})();
