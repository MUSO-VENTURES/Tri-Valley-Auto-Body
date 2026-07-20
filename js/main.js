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

  /* ---------- Language dropdown ----------
     Single accordion control: click to reveal all languages (English
     included), pick one and the button label swaps to match. Swapping
     the visible site copy per language is not wired up yet — see
     window.TVAB.onLanguageChange for where that would hook in. */
  function initLangToggle() {
    var wrap = document.querySelector("[data-lang-dropdown]");
    if (!wrap) return;
    var trigger = wrap.querySelector("[data-lang-trigger]");
    var label = wrap.querySelector("[data-lang-trigger-label]");
    var options = Array.prototype.slice.call(
      wrap.querySelectorAll('[role="option"]')
    );

    function closeMenu() {
      wrap.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    }
    function openMenu() {
      wrap.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    }

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      if (wrap.classList.contains("open")) closeMenu();
      else openMenu();
    });

    document.addEventListener("click", function (e) {
      if (!wrap.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    options.forEach(function (opt) {
      function choose() {
        options.forEach(function (o) {
          o.setAttribute("aria-selected", "false");
        });
        opt.setAttribute("aria-selected", "true");
        label.textContent = opt.dataset.short || opt.textContent;
        closeMenu();
        if (window.TVAB && typeof window.TVAB.onLanguageChange === "function") {
          window.TVAB.onLanguageChange(opt.dataset.short, opt.textContent);
        }
      }
      opt.addEventListener("click", choose);
      opt.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          choose();
        }
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

  /* ---------- Logo click: jump to the true page top ----------
     The default #top anchor jump honors each section's
     scroll-margin-top (used elsewhere to clear the sticky nav), but
     the hero sits right after the non-sticky topbar, so that same
     offset overshoots and leaves the topbar clipped instead of fully
     visible. Handling the click directly scrolls to the real y=0 and
     clears the nav's active-link underline, since jumping back to the
     hero isn't one of the sections the scroll-spy tracks and would
     otherwise leave it stuck on whatever link was active before. */
  function initLogoResetsNav() {
    var logo = document.querySelector('a.logo[href="#top"]');
    var navLinks = document.querySelectorAll('nav.links a[href^="#"]');
    if (!logo) return;
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      navLinks.forEach(function (a) {
        a.removeAttribute("aria-current");
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
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

  /* ---------- Process steps: sequential auto-highlight ----------
     While the "Our Process" section is in view, steps 01-05 light up
     one at a time in order (number brightens, underline lengthens to
     match the width of that step's own number), looping continuously.
     Pauses when scrolled out of view. Uses a plain scroll-position
     check rather than IntersectionObserver — same pattern as
     initNavScrollState. */
  function initProcessHighlight() {
    var steps = document.querySelectorAll(".process-grid .p-step");
    var section = document.getElementById("process");
    if (!steps.length || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var DURATION = 2500;
    var index = 0;
    var timer = null;

    function measureRuleWidths() {
      steps.forEach(function (step) {
        var num = step.querySelector(".num");
        if (num) step.style.setProperty("--rule-w", num.getBoundingClientRect().width + "px");
      });
    }
    function highlight(i) {
      steps.forEach(function (step, idx) {
        step.classList.toggle("active", idx === i);
      });
    }
    function tick() {
      highlight(index);
      index = (index + 1) % steps.length;
      timer = setTimeout(tick, DURATION);
    }
    function start() {
      if (timer) return;
      tick();
    }
    function stop() {
      clearTimeout(timer);
      timer = null;
      steps.forEach(function (step) {
        step.classList.remove("active");
      });
    }
    function isInView() {
      var rect = section.getBoundingClientRect();
      var visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      return visibleHeight > rect.height * 0.4;
    }
    function checkVisibility() {
      if (isInView()) start();
      else stop();
    }

    measureRuleWidths();
    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", function () {
      measureRuleWidths();
      checkVisibility();
    });
    // Safety net: re-check periodically too, so a stray/early visibility
    // read (e.g. from layout shifting as fonts finish loading) can't
    // permanently stall the cycle with no further scroll/resize to
    // trigger a recheck.
    setInterval(checkVisibility, 1500);
  }

  /* ---------- Hero star rating: sequential animate-in ----------
     Lights each star red one at a time (last one only half, for a
     4.5 rating), starting only after the hero's own fade-in stagger
     has finished so it reads as "text builds in, then the rating
     lights up" rather than everything happening at once. */
  function initStarRating() {
    var wrap = document.querySelector("[data-star-rating]");
    if (!wrap) return;
    var stars = wrap.querySelectorAll(".star");
    if (!stars.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stars.forEach(function (star) {
        star.classList.add("lit");
      });
      return;
    }

    var START_DELAY = 1600; // after the hero text stagger (meta-row finishes ~1.45s)
    var STEP = 200;
    stars.forEach(function (star, i) {
      setTimeout(function () {
        star.classList.add("lit");
      }, START_DELAY + i * STEP);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initSliders();
    initLangToggle();
    initScrollSpy();
    initLogoResetsNav();
    initNavScrollState();
    initProcessHighlight();
    initStarRating();
  });

  window.TVAB = window.TVAB || {};
  window.TVAB.initTestimonials = initTestimonials;
  window.TVAB.initSliders = initSliders;
})();
