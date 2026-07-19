/* Tri-Valley Auto Body — shared site behavior (nav, slider, testimonials) */

(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector("nav.links");
    var scrim = document.querySelector(".nav-scrim");
    if (!toggle || !links) return;

    function close() {
      links.classList.remove("open");
      scrim && scrim.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    }
    function open() {
      links.classList.add("open");
      scrim && scrim.classList.add("show");
      toggle.setAttribute("aria-expanded", "true");
    }
    toggle.addEventListener("click", function () {
      links.classList.contains("open") ? close() : open();
    });
    scrim && scrim.addEventListener("click", close);
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- Before/after slider(s) ----------
     Works for any number of .slider-frame blocks on a page.
     Each frame needs: .panel-before, .panel-after, .slider-handle, input.slider-input */
  function initSliders(root) {
    (root || document).querySelectorAll(".slider-frame").forEach(function (frame) {
      var after = frame.querySelector(".panel-after");
      var handle = frame.querySelector(".slider-handle");
      var input = frame.querySelector(".slider-input");
      if (!after || !input) return;
      function move(val) {
        after.style.clipPath = "inset(0 0 0 " + val + "%)";
        if (handle) handle.style.left = val + "%";
      }
      input.addEventListener("input", function () {
        move(this.value);
      });
      move(input.value || 50);
    });
  }

  /* ---------- Testimonial carousel ----------
     Usage: <div class="testi-card" data-carousel-root>
              <p data-slot="text"></p>
              <div data-slot="who"></div>
              <div data-slot="loc"></div>
            </div>
            <div class="testi-dots" data-carousel-dots></div>
     Call window.TVAB.initTestimonials(items) after DOM ready. */
  function initTestimonials(items, opts) {
    opts = opts || {};
    var scope = opts.scope ? document.querySelector(opts.scope) : document;
    if (!scope || !items || !items.length) return;
    var textEl = scope.querySelector('[data-slot="text"]');
    var whoEl = scope.querySelector('[data-slot="who"]');
    var locEl = scope.querySelector('[data-slot="loc"]');
    var dotsEl = scope.querySelector("[data-carousel-dots]");
    if (!textEl || !dotsEl) return;

    function render(i) {
      textEl.textContent = items[i].text;
      if (whoEl) whoEl.textContent = items[i].who;
      if (locEl) locEl.textContent = items[i].loc;
      dotsEl.querySelectorAll("span").forEach(function (d, idx) {
        d.classList.toggle("active", idx === i);
      });
    }
    dotsEl.innerHTML = "";
    items.forEach(function (_, i) {
      var dot = document.createElement("span");
      dot.setAttribute("role", "button");
      dot.setAttribute("aria-label", "Show testimonial " + (i + 1));
      dot.addEventListener("click", function () {
        render(i);
      });
      dotsEl.appendChild(dot);
    });
    render(0);
  }

  /* ---------- Language toggle (display-only placeholder) ---------- */
  function initLangToggle() {
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document
          .querySelectorAll(".lang-toggle button")
          .forEach(function (b) {
            b.classList.remove("active");
          });
        btn.classList.add("active");
      });
    });
  }

  /* ---------------------------------------------------------
     Scroll-spy: highlight the nav link matching the section
     currently in view (single-page layout with #anchors).
     --------------------------------------------------------- */
  function initScrollSpy() {
    var navLinks = document.querySelectorAll('nav.links a[href^="#"]');
    if (!navLinks.length) return;
    var sections = [];
    navLinks.forEach(function (a) {
      var sec = document.querySelector(a.getAttribute("href"));
      if (sec) sections.push({ link: a, el: sec });
    });
    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var match = sections.find(function (s) { return s.el === entry.target; });
          if (!match) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (a) { a.removeAttribute("aria-current"); });
            match.link.setAttribute("aria-current", "page");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { observer.observe(s.el); });
  }

  /* ---------- Nav shrink/shadow once page has scrolled ---------- */
  function initNavScrollState() {
    var nav = document.querySelector("header.main-nav");
    if (!nav) return;
    function update() {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initSliders();
    initLangToggle();
    initScrollSpy();
    initNavScrollState();
  });

  window.TVAB = window.TVAB || {};
  window.TVAB.initTestimonials = initTestimonials;
  window.TVAB.initSliders = initSliders;
})();
