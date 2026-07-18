/* ============================================================
   Tri-Valley Auto Body — WIDGETS
   Reads window.TVAB_CONFIG (js/widgets-config.js). Each widget
   falls back to a friendly "connect this" placeholder if its
   config value hasn't been filled in yet.
   ============================================================ */

(function () {
  "use strict";
  var CFG = window.TVAB_CONFIG || {};

  function isPlaceholder(val) {
    return !val || /^YOUR_/.test(val);
  }

  function placeholderBox(container, opts) {
    container.innerHTML =
      '<div class="setup-placeholder">' +
      '<span class="tag">Not connected yet</span>' +
      "<p>" + opts.message + "</p>" +
      (opts.code ? '<p><code>' + opts.code + '</code></p>' : "") +
      "</div>";
  }

  /* ---------------------------------------------------------
     1) ESTIMATE FORM  (Formspree)
     --------------------------------------------------------- */
  function initEstimateForm() {
    var form = document.getElementById("estimate-form");
    if (!form) return;
    var status = document.getElementById("estimate-status");

    if (isPlaceholder(CFG.FORMSPREE_FORM_ID)) {
      var note = document.getElementById("estimate-form-note");
      if (note) {
        note.innerHTML =
          '<div class="setup-placeholder">' +
          '<span class="tag">Not connected yet</span>' +
          "<p>This form isn't wired to a real inbox yet. Create a free form at " +
          '<a href="https://formspree.io" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:underline;">formspree.io</a>' +
          ' and paste its ID into <code>FORMSPREE_FORM_ID</code> in <code>js/widgets-config.js</code>.</p>' +
          "</div>";
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      var showStatus = function (ok, msg) {
        status.textContent = msg;
        status.className = "form-status show " + (ok ? "ok" : "err");
      };

      if (isPlaceholder(CFG.FORMSPREE_FORM_ID)) {
        showStatus(
          false,
          "Form isn't connected yet (see the notice above). Meanwhile, call/text " +
            (CFG.SHOP_PHONE_DISPLAY || "us") +
            " and we'll get your estimate started."
        );
        return;
      }

      // Honeypot spam trap
      if (form.querySelector('[name="_gotcha"]').value) return;

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      fetch("https://formspree.io/f/" + CFG.FORMSPREE_FORM_ID, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (res) {
          if (res.ok) {
            showStatus(
              true,
              "Thanks — your estimate request is in. We'll reach out within one business day."
            );
            form.reset();
          } else {
            res.json().then(function (data) {
              var msg =
                data && data.errors
                  ? data.errors.map(function (e) { return e.message; }).join(", ")
                  : "Something went wrong sending the form.";
              showStatus(false, msg + " Please call/text " + (CFG.SHOP_PHONE_DISPLAY || "us") + " instead.");
            });
          }
        })
        .catch(function () {
          showStatus(
            false,
            "Network error sending the form. Please call/text " + (CFG.SHOP_PHONE_DISPLAY || "us") + " instead."
          );
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Request Estimate";
        });
    });
  }

  /* ---------------------------------------------------------
     1b) CONTACT FORM  (Formspree — same account as the estimate form)
     --------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("contact-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var showStatus = function (ok, msg) {
        status.textContent = msg;
        status.className = "form-status show " + (ok ? "ok" : "err");
      };

      if (isPlaceholder(CFG.FORMSPREE_FORM_ID)) {
        showStatus(
          false,
          "This form isn't connected yet (see js/widgets-config.js). Meanwhile, call/text " +
            (CFG.SHOP_PHONE_DISPLAY || "us") + "."
        );
        return;
      }
      if (form.querySelector('[name="_gotcha"]').value) return;

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Sending…";

      fetch("https://formspree.io/f/" + CFG.FORMSPREE_FORM_ID, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (res) {
          if (res.ok) {
            showStatus(true, "Thanks — we'll get back to you shortly.");
            form.reset();
          } else {
            showStatus(false, "Something went wrong. Please call/text " + (CFG.SHOP_PHONE_DISPLAY || "us") + ".");
          }
        })
        .catch(function () {
          showStatus(false, "Network error. Please call/text " + (CFG.SHOP_PHONE_DISPLAY || "us") + ".");
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = "Send Message";
        });
    });
  }

  /* ---------------------------------------------------------
     2) BEFORE / AFTER GALLERY  (data/gallery.json)
     --------------------------------------------------------- */
  function galleryItemMarkup(item) {
    var bImg = item.before ? 'style="background-image:url(' + item.before + ')"' : "";
    var aImg = item.after ? 'style="background-image:url(' + item.after + ')"' : "";
    var swatch = item.swatch || "tex1";
    return (
      '<div class="gallery-item" data-id="' + item.id + '" data-cat="' + item.category + '" tabindex="0" role="button" aria-label="View ' + item.title + ' before and after">' +
      '<div class="thumb ' + (item.before || item.after ? "" : swatch) + '">' +
      '<div class="half b ' + (item.before ? "" : swatch) + '" ' + bImg + '></div>' +
      '<div class="half a ' + (item.after ? "" : swatch) + '" ' + aImg + '></div>' +
      "</div>" +
      '<div class="meta"><span class="cat">' + item.category + '</span><h4>' + item.title + "</h4></div>" +
      "</div>"
    );
  }

  function initGalleryPage() {
    var grid = document.getElementById("gallery-grid");
    if (!grid) return;
    var filterWrap = document.getElementById("gallery-filters");
    var lightbox = document.getElementById("gallery-lightbox");
    var lbBefore = lightbox && lightbox.querySelector(".panel-before");
    var lbAfter = lightbox && lightbox.querySelector(".panel-after");
    var lbHandle = lightbox && lightbox.querySelector(".slider-handle");
    var lbInput = lightbox && lightbox.querySelector(".slider-input");
    var lbCaption = lightbox && lightbox.querySelector(".lightbox-caption");

    fetch("data/gallery.json")
      .then(function (r) { return r.json(); })
      .then(function (items) {
        var cats = ["All"].concat(
          items
            .map(function (i) { return i.category; })
            .filter(function (v, i, a) { return a.indexOf(v) === i; })
        );

        if (filterWrap) {
          filterWrap.innerHTML = cats
            .map(function (c, i) {
              return '<button data-cat="' + c + '" class="' + (i === 0 ? "active" : "") + '">' + c + "</button>";
            })
            .join("");
        }

        function render(cat) {
          var filtered = cat && cat !== "All" ? items.filter(function (i) { return i.category === cat; }) : items;
          grid.innerHTML = filtered.length
            ? filtered.map(galleryItemMarkup).join("")
            : '<p class="gallery-empty">No completed jobs in this category yet — check back soon.</p>';
          grid.querySelectorAll(".gallery-item").forEach(function (el) {
            el.addEventListener("click", function () { openLightbox(el.dataset.id, items); });
            el.addEventListener("keydown", function (e) {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(el.dataset.id, items); }
            });
          });
        }

        filterWrap &&
          filterWrap.querySelectorAll("button").forEach(function (btn) {
            btn.addEventListener("click", function () {
              filterWrap.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
              btn.classList.add("active");
              render(btn.dataset.cat);
            });
          });

        render("All");
      })
      .catch(function () {
        grid.innerHTML = '<p class="gallery-empty">Couldn\'t load the gallery data right now.</p>';
      });

    function openLightbox(id, items) {
      if (!lightbox) return;
      var item = items.find(function (i) { return i.id === id; });
      if (!item) return;
      lbBefore.style.backgroundImage = item.before ? "url(" + item.before + ")" : "";
      lbAfter.style.backgroundImage = item.after ? "url(" + item.after + ")" : "";
      lbBefore.className = "panel panel-before " + (item.before ? "" : item.swatch || "tex1");
      lbAfter.className = "panel panel-after " + (item.after ? "" : item.swatch || "tex1");
      lbCaption.textContent = item.title + " — " + item.category;
      lbInput.value = 50;
      lbInput.dispatchEvent(new Event("input"));
      lightbox.classList.add("open");
    }
    lightbox &&
      lightbox.querySelector(".lightbox-close").addEventListener("click", function () {
        lightbox.classList.remove("open");
      });
    lightbox &&
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) lightbox.classList.remove("open");
      });
  }

  /* ---------------------------------------------------------
     3) INSURANCE CARRIER LOOKUP  (data/insurance.json)
     --------------------------------------------------------- */
  function initInsuranceWidget() {
    var widget = document.getElementById("insurance-widget");
    if (!widget) return;
    var search = widget.querySelector("#ins-search");
    var grid = widget.querySelector("#ins-grid");
    var result = widget.querySelector("#ins-result");

    fetch("data/insurance.json")
      .then(function (r) { return r.json(); })
      .then(function (carriers) {
        function renderChips(list) {
          grid.innerHTML = list
            .map(function (c) {
              return (
                '<button type="button" class="ins-chip" data-name="' + c.name + '">' +
                c.name +
                (c.drp ? '<span class="drp">DRP Partner</span>' : "") +
                "</button>"
              );
            })
            .join("");
          grid.querySelectorAll(".ins-chip").forEach(function (chip) {
            chip.addEventListener("click", function () {
              grid.querySelectorAll(".ins-chip").forEach(function (c) { c.classList.remove("active"); });
              chip.classList.add("active");
              showResult(carriers.find(function (c) { return c.name === chip.dataset.name; }));
            });
          });
        }

        function showResult(c) {
          if (!c) return;
          result.classList.add("show");
          result.innerHTML =
            "<h4>" + c.name + (c.drp ? " — Direct Repair Program partner" : "") + "</h4>" +
            "<p>" +
            (c.drp
              ? "We're an approved direct repair shop for " + c.name + ". We can bill them directly and handle most of the claims paperwork for you."
              : "We work with " + c.name + " regularly. We'll help you file and manage the claim even though we're not on their preferred list.") +
            "</p>" +
            '<div class="row">' +
            '<div><strong>Claims line</strong><a href="tel:' + c.phone.replace(/[^0-9+]/g, "") + '">' + c.phone + "</a></div>" +
            '<div><strong>File online</strong><a href="' + c.claimsUrl + '" target="_blank" rel="noopener">' + c.claimsUrl.replace(/^https?:\/\//, "") + "</a></div>" +
            "</div>";
        }

        renderChips(carriers);

        search.addEventListener("input", function () {
          var q = search.value.trim().toLowerCase();
          renderChips(
            q ? carriers.filter(function (c) { return c.name.toLowerCase().indexOf(q) !== -1; }) : carriers
          );
        });
      })
      .catch(function () {
        grid.innerHTML = '<p class="ins-empty">Couldn\'t load carrier data right now — call us and we\'ll look it up.</p>';
      });
  }

  /* ---------------------------------------------------------
     4) SCHEDULING / BOOKING WIDGET (Calendly)
     --------------------------------------------------------- */
  function initBookingWidget() {
    var container = document.getElementById("booking-widget");
    if (!container) return;
    if (isPlaceholder(CFG.CALENDLY_URL)) {
      placeholderBox(container, {
        message:
          "Online booking isn't connected yet. Create a free scheduling page at calendly.com (or acuityscheduling.com), then paste the URL into CALENDLY_URL in js/widgets-config.js.",
        code: "CALENDLY_URL = \"https://calendly.com/your-shop/estimate\"",
      });
      return;
    }
    container.innerHTML =
      '<div class="booking-frame"><iframe title="Schedule an appointment" src="' +
      CFG.CALENDLY_URL +
      '?hide_gdpr_banner=1&embed_domain=' +
      window.location.hostname +
      '&embed_type=Inline" loading="lazy"></iframe></div>';
  }

  /* ---------------------------------------------------------
     5) LIVE CHAT / SMS
     --------------------------------------------------------- */
  function initChat() {
    var trigger = document.getElementById("chat-trigger");
    if (!trigger) return;
    var tawkReady = !isPlaceholder(CFG.TAWKTO_PROPERTY_ID) && !isPlaceholder(CFG.TAWKTO_WIDGET_ID);

    if (tawkReady) {
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement("script");
        s1.async = true;
        s1.src = "https://embed.tawk.to/" + CFG.TAWKTO_PROPERTY_ID + "/" + CFG.TAWKTO_WIDGET_ID;
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        document.body.appendChild(s1);
      })();
      trigger.addEventListener("click", function () {
        if (window.Tawk_API && window.Tawk_API.toggle) window.Tawk_API.toggle();
      });
    } else {
      // Fallback: click-to-text using SMS_NUMBER
      var num = CFG.SMS_NUMBER;
      trigger.addEventListener("click", function () {
        if (!isPlaceholder(num)) {
          window.location.href = "sms:" + num;
        } else {
          alert(
            "Chat isn't connected yet. Add a free Tawk.to widget (TAWKTO_PROPERTY_ID / TAWKTO_WIDGET_ID) or an SMS_NUMBER in js/widgets-config.js."
          );
        }
      });
    }
  }

  /* ---------------------------------------------------------
     6) LIVE GOOGLE REVIEWS FEED (Elfsight)
     --------------------------------------------------------- */
  function initReviewsEmbed() {
    var container = document.getElementById("reviews-embed");
    if (!container) return;
    if (isPlaceholder(CFG.GOOGLE_REVIEWS_WIDGET_ID)) {
      placeholderBox(container, {
        message:
          "The live Google Reviews feed isn't connected yet. Create a free \"Google Reviews\" widget at elfsight.com (or trustindex.io), then paste its widget ID into GOOGLE_REVIEWS_WIDGET_ID in js/widgets-config.js. The testimonials above keep working either way.",
        code: 'GOOGLE_REVIEWS_WIDGET_ID = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"',
      });
      return;
    }
    container.className = "reviews-embed elfsight-app-" + CFG.GOOGLE_REVIEWS_WIDGET_ID;
    var s = document.createElement("script");
    s.src = "https://static.elfsight.com/platform/platform.js";
    s.async = true;
    document.body.appendChild(s);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initEstimateForm();
    initContactForm();
    initGalleryPage();
    initInsuranceWidget();
    initBookingWidget();
    initChat();
    initReviewsEmbed();
  });
})();
