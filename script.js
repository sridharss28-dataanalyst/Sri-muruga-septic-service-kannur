// ============================================================
// Sri Muruga Septic Tank Cleaning Service — site behaviour
// ============================================================
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "918590872417";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var mobileMenu = document.querySelector(".mobile-menu");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { mobileMenu.classList.remove("open"); });
    });
  }

  /* ---- Scroll reveal (single, lightweight) ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Before / After slider ---- */
  var slider = document.querySelector(".ba-range");
  var afterLayer = document.querySelector(".ba-after");
  if (slider && afterLayer) {
    var setClip = function (val) {
      afterLayer.style.clipPath = "inset(0 " + (100 - val) + "% 0 0)";
    };
    setClip(slider.value);
    slider.addEventListener("input", function () { setClip(slider.value); });
  }

  /* ---- Quote form -> WhatsApp handoff ---- */
  var form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = function (id) {
        var el = document.getElementById(id);
        return el && el.value ? el.value.trim() : "";
      };
      var lines = [
        "Hi Sri Muruga Septic Tank Cleaning Service,",
        "",
        "I would like to request a quote.",
        "",
        "Name: " + val("q-name"),
        "Phone: " + val("q-phone"),
        "Service: " + val("q-service"),
        "Location: " + val("q-location"),
        "Tank Size: " + val("q-tank"),
        "Preferred Date: " + val("q-date"),
        "Preferred Time: " + val("q-time"),
        "Additional Message: " + val("q-message"),
        "",
        "Please share the estimated price and availability."
      ];
      var text = encodeURIComponent(lines.join("\n"));
      window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text, "_blank", "noopener");
    });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
