// 47 Nova Autos LTD — site interactions

// ✅ Paste your Google Calendar booking link here:
const BOOKING_URL = "https://calendar.app.google/iShN8QECKDK546CaA";

// Business email (for fleet + contact)
const BUSINESS_EMAIL = "47novaservices@gmail.com";

// Update year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ----------------------
// Menu (dropdown)
// ----------------------
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

function closeMenu() {
  if (!mobileMenu || !menuBtn) return;
  mobileMenu.setAttribute("hidden", "");
  menuBtn.setAttribute("aria-expanded", "false");
}

function openMenu() {
  if (!mobileMenu || !menuBtn) return;
  mobileMenu.removeAttribute("hidden");
  menuBtn.setAttribute("aria-expanded", "true");
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = !mobileMenu.hasAttribute("hidden");
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Close when clicking a link
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    const clickedInside = mobileMenu.contains(e.target) || menuBtn.contains(e.target);
    if (!clickedInside) closeMenu();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

// ----------------------
// Booking buttons
// ----------------------
document.querySelectorAll("[data-booking]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (!BOOKING_URL || BOOKING_URL === "PASTE_YOUR_BOOKING_LINK_HERE") {
      alert("Booking link not set yet. Please paste your Google Calendar booking link into script.js (BOOKING_URL).");
      return;
    }
    window.open(BOOKING_URL, "_blank", "noopener");
  });
});

// ----------------------




// ----------------------
// Google Reviews
// ----------------------
// TO ADD OR EDIT A REVIEW: edit the REVIEWS list below. Nothing else to touch.
//   name / rating (1-5) / text — copied from the review on Google.
//   date — optional. Leave "" and no date shows. If you ever fill one in as
//          "2026-06-14", the card shows "2 months ago" and keeps itself
//          current on every visit.

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/XcQj2XKBAGBGid5o9";

// Your public Google rating. Set GOOGLE_REVIEW_COUNT to your real total to
// show "Based on N Google reviews"; leave it 0 to hide the count.
const GOOGLE_RATING = 5.0;
const GOOGLE_REVIEW_COUNT = 0;

const REVIEWS = [
  { name: "Dipanshu C.", rating: 5, date: "", text: "My 2009 Honda Civic looks so much better than before. Highly recommend trusting them with your vehicle." },
  { name: "Rishi U.",    rating: 5, date: "", text: "Called in a panic for a last-minute detail and they delivered — even fixed brutal winter salt stains on the mats." },
  { name: "Ashley H.",   rating: 5, date: "", text: "Contacted them on a Saturday, they came the next day. My SUV looks brand new after 4+ hours of work." },
  { name: "Chad B.",     rating: 5, date: "", text: "The team at 47 Nova Autos took great care of my truck — showed up on time and worked through the rain." },
  { name: "Ben L.",      rating: 5, date: "", text: "Best prices, best customer service, best cleaning. They worked through rain and darkness with a smile." },
  { name: "Armanda L.",  rating: 5, date: "", text: "Great job — car smells amazing, and $20 less than most while being more thorough." },
  { name: "Parmbir S.",  rating: 5, date: "", text: "Got the Advanced Interior package and I'm 100% satisfied. Professional work done by the team." },
  { name: "Jeff R.",     rating: 5, date: "", text: "Spent 5 hours detailing my car — it looks brand new. Highly recommend 47 Nova Autos." },
];

const G_LOGO_SVG =
  '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
  '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
  '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
  '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
  '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

const STAR_PATH = "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

let starUid = 0;
function starsHTML(rating, small) {
  const r = Math.max(0, Math.min(5, Number(rating) || 0));
  let out = '<span class="g-stars' + (small ? " sm" : "") + '" role="img" aria-label="' +
    r.toFixed(1) + ' out of 5 stars">';
  for (let i = 1; i <= 5; i++) {
    const fill = Math.max(0, Math.min(1, r - (i - 1)));
    if (fill >= 0.85) {
      out += '<svg viewBox="0 0 24 24"><path class="g-star-full" d="' + STAR_PATH + '"/></svg>';
    } else if (fill <= 0.15) {
      out += '<svg viewBox="0 0 24 24"><path class="g-star-empty" d="' + STAR_PATH + '"/></svg>';
    } else {
      const id = "gstar" + (++starUid);
      out += '<svg viewBox="0 0 24 24"><defs><linearGradient id="' + id + '">' +
        '<stop offset="' + (fill * 100) + '%" stop-color="#FBBC04"/>' +
        '<stop offset="' + (fill * 100) + '%" stop-color="rgba(255,255,255,.18)"/>' +
        '</linearGradient></defs><path fill="url(#' + id + ')" d="' + STAR_PATH + '"/></svg>';
    }
  }
  return out + "</span>";
}

// "2026-06-14" -> "2 months ago". Recalculated on every page load, so the
// dates below never need touching again once they are set.
function relativeTime(dateStr) {
  if (!dateStr) return null;
  const then = new Date(dateStr + "T12:00:00").getTime();
  if (!then || isNaN(then)) return null;
  const days = Math.floor((Date.now() - then) / 86400000);
  if (days < 0) return null;
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return days + " days ago";
  if (days < 14) return "a week ago";
  if (days < 31) return Math.floor(days / 7) + " weeks ago";
  if (days < 61) return "a month ago";
  if (days < 365) return Math.floor(days / 30) + " months ago";
  if (days < 730) return "a year ago";
  return Math.floor(days / 365) + " years ago";
}

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

const gRail = document.getElementById("gRail");
const gScoreEl = document.getElementById("gScore");
const gStarsEl = document.getElementById("gStars");
const gCountEl = document.getElementById("gCount");
const revDotsWrap = document.getElementById("revDots");
const revPrevBtn = document.getElementById("revPrevBtn");
const revNextBtn = document.getElementById("revNextBtn");

function cardHTML(r) {
  const time = relativeTime(r.date);
  return '<article class="g-card">' +
    '<div class="g-card-head">' +
      '<span class="g-avatar-fallback">' + esc(initials(r.name)) + "</span>" +
      '<div class="g-who"><div class="g-name">' + esc(r.name) + "</div>" +
        (time ? '<div class="g-time">' + esc(time) + "</div>" : "") +
      "</div>" +
      '<span class="g-card-mark" aria-hidden="true">' + G_LOGO_SVG + "</span>" +
    "</div>" +
    '<div class="g-card-stars">' + starsHTML(r.rating, true) + "</div>" +
    '<p class="g-text">' + esc(r.text) + "</p>" +
    '<div class="g-card-foot"><a class="g-card-link" href="' + esc(GOOGLE_REVIEWS_URL) +
      '" target="_blank" rel="noopener">View on Google →</a></div>' +
  "</article>";
}

function renderReviews(list) {
  if (!gRail) return;
  gRail.innerHTML = list.map(cardHTML).join("");

  gRail.querySelectorAll(".g-text").forEach((p) => {
    if (p.scrollHeight - p.clientHeight < 4) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "g-more";
    btn.textContent = "Read more";
    btn.addEventListener("click", () => {
      const open = p.classList.toggle("is-open");
      btn.textContent = open ? "Show less" : "Read more";
    });
    p.insertAdjacentElement("afterend", btn);
  });

  buildDots();
  updateArrows();
  startAuto();
}

function renderSummary() {
  if (gScoreEl) gScoreEl.textContent = Number(GOOGLE_RATING).toFixed(1);
  if (gStarsEl) gStarsEl.innerHTML = starsHTML(GOOGLE_RATING);
  if (gCountEl) {
    gCountEl.textContent = GOOGLE_REVIEW_COUNT > 0
      ? "Based on " + GOOGLE_REVIEW_COUNT + " Google review" + (GOOGLE_REVIEW_COUNT === 1 ? "" : "s")
      : "Rated by our customers on Google";
  }
}

// ---- Rail controls ----
function cardStep() {
  const card = gRail && gRail.querySelector(".g-card");
  if (!card) return 340;
  const gap = parseFloat(getComputedStyle(gRail).columnGap || "14") || 14;
  return card.getBoundingClientRect().width + gap;
}

function pageCount() {
  if (!gRail) return 0;
  return Math.max(1, Math.ceil((gRail.scrollWidth - gRail.clientWidth) / cardStep()) + 1);
}

function currentPage() {
  return gRail ? Math.round(gRail.scrollLeft / cardStep()) : 0;
}

function buildDots() {
  if (!revDotsWrap) return;
  const n = pageCount();
  revDotsWrap.innerHTML = "";
  if (n <= 1) return;
  for (let i = 0; i < n; i++) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dot" + (i === currentPage() ? " active" : "");
    b.setAttribute("aria-label", "Go to review " + (i + 1));
    b.addEventListener("click", () => {
      gRail.scrollTo({ left: i * cardStep(), behavior: "smooth" });
      restartAuto();
    });
    revDotsWrap.appendChild(b);
  }
}

function syncDots() {
  if (!revDotsWrap) return;
  const cur = currentPage();
  revDotsWrap.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === cur));
}

function updateArrows() {
  if (!gRail) return;
  const atStart = gRail.scrollLeft <= 2;
  const atEnd = gRail.scrollLeft >= gRail.scrollWidth - gRail.clientWidth - 2;
  if (revPrevBtn) revPrevBtn.disabled = atStart;
  if (revNextBtn) revNextBtn.disabled = atEnd;
  const wrap = gRail.closest(".g-rail-wrap");
  if (wrap) wrap.classList.toggle("is-scrolled", !atStart);
}

function slide(dir) {
  if (!gRail) return;
  const atEnd = gRail.scrollLeft >= gRail.scrollWidth - gRail.clientWidth - 2;
  if (dir > 0 && atEnd) gRail.scrollTo({ left: 0, behavior: "smooth" });
  else gRail.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
}

if (revPrevBtn) revPrevBtn.addEventListener("click", () => { slide(-1); restartAuto(); });
if (revNextBtn) revNextBtn.addEventListener("click", () => { slide(1); restartAuto(); });

let autoTimer = null;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function startAuto() {
  if (reduceMotion || !gRail) return;
  stopAuto();
  autoTimer = window.setInterval(() => slide(1), 6000);
}
function stopAuto() { if (autoTimer) { window.clearInterval(autoTimer); autoTimer = null; } }
function restartAuto() { startAuto(); }

if (gRail) {
  gRail.addEventListener("scroll", () => { syncDots(); updateArrows(); }, { passive: true });
  gRail.addEventListener("mouseenter", stopAuto);
  gRail.addEventListener("mouseleave", startAuto);
  gRail.addEventListener("focusin", stopAuto);
  gRail.addEventListener("touchstart", stopAuto, { passive: true });
  window.addEventListener("resize", () => { buildDots(); updateArrows(); });

  renderSummary();
  renderReviews(REVIEWS);
}

// ----------------------
// Fleet form (Formspree optional; fallback to email)
// ----------------------
const FLEET_FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxx"
const fleetForm = document.getElementById("fleetForm");
const fleetToast = document.getElementById("fleetToast");

function getCheckedValues(form, name) {
  return Array.from(form.querySelectorAll(`[name="${name}"]:checked`)).map((x) => x.value);
}

async function postFleet(form) {
  const data = new FormData(form);

  if (FLEET_FORM_ENDPOINT && FLEET_FORM_ENDPOINT.startsWith("https://")) {
    const res = await fetch(FLEET_FORM_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    return res.ok;
  }

  // Fallback: open email compose
  const fleetSize = data.get("fleet_size") || "";
  const frequency = data.get("frequency") || "";
  const vehicleTypes = getCheckedValues(form, "vehicle_type").join(", ") || "N/A";
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const email = String(data.get("email") || "").trim();

  const subject = encodeURIComponent("Maintenance Plan Request — 47 Nova Autos LTD");
  const body = encodeURIComponent(
`Number of Vehicles: ${fleetSize}
Vehicle Types: ${vehicleTypes}
Frequency: ${frequency}

Contact:
Name: ${name}
Phone: ${phone}
Email: ${email}`
  );

  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
  return true;
}

if (fleetForm) {
  fleetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let ok = false;
    try { ok = await postFleet(fleetForm); } catch { ok = false; }

    if (fleetToast) {
      fleetToast.hidden = false;
      fleetToast.innerHTML = ok
        ? "<strong>Request sent.</strong> We’ll reply by email shortly."
        : "<strong>Couldn’t send.</strong> Please email us at 47novaservices@gmail.com.";
      window.setTimeout(() => (fleetToast.hidden = true), 4500);
    }

    if (ok) fleetForm.reset();
  });
}

// ----------------------
// Service coverage map (Leaflet, lazy-loaded)
// ----------------------
const COVERAGE_AREAS = {"halifax":[[44.681,-63.7227],[44.6567,-63.7148],[44.6476,-63.689],[44.6542,-63.6802],[44.6468,-63.6778],[44.6399,-63.6623],[44.6442,-63.6467],[44.6396,-63.6384],[44.6307,-63.6378],[44.6144,-63.6523],[44.6104,-63.6293],[44.592,-63.6491],[44.5888,-63.6455],[44.5871,-63.6349],[44.5953,-63.6252],[44.5812,-63.6013],[44.5818,-63.5924],[44.6046,-63.5606],[44.6277,-63.5427],[44.6538,-63.5626],[44.6822,-63.6219],[44.7112,-63.6588],[44.7013,-63.6779],[44.7036,-63.6848],[44.6949,-63.6875],[44.681,-63.7227]],"dartmouth":[[44.6991,-63.6402],[44.6822,-63.6219],[44.6538,-63.5626],[44.6277,-63.5427],[44.632,-63.5245],[44.6424,-63.5191],[44.64,-63.5175],[44.6438,-63.5131],[44.649,-63.5184],[44.6526,-63.5003],[44.6564,-63.502],[44.6583,-63.4956],[44.6708,-63.5052],[44.6711,-63.5006],[44.6796,-63.5052],[44.6814,-63.4955],[44.6945,-63.4991],[44.7175,-63.5309],[44.7292,-63.538],[44.7322,-63.5451],[44.7292,-63.5506],[44.7412,-63.5616],[44.7356,-63.5654],[44.7272,-63.6045],[44.7025,-63.6215],[44.6991,-63.6402]],"bedford":[[44.7214,-63.7331],[44.713,-63.7201],[44.7084,-63.7222],[44.7092,-63.7307],[44.7048,-63.7294],[44.6927,-63.7099],[44.6973,-63.7002],[44.6937,-63.6901],[44.6993,-63.6894],[44.7014,-63.6819],[44.7036,-63.6848],[44.7013,-63.6779],[44.7112,-63.6588],[44.6992,-63.6396],[44.7055,-63.618],[44.7171,-63.6099],[44.7277,-63.6288],[44.7409,-63.6028],[44.7579,-63.6259],[44.7597,-63.6406],[44.743,-63.6582],[44.753,-63.6686],[44.7505,-63.6755],[44.7585,-63.7018],[44.7214,-63.7331]],"sackville":[[44.7709,-63.7093],[44.7688,-63.704],[44.7646,-63.7033],[44.7612,-63.7057],[44.7576,-63.701],[44.7505,-63.6755],[44.753,-63.6686],[44.747,-63.658],[44.743,-63.6582],[44.7657,-63.6347],[44.7741,-63.6296],[44.7778,-63.6327],[44.7776,-63.6307],[44.7844,-63.6397],[44.7818,-63.6486],[44.7835,-63.6626],[44.7874,-63.6734],[44.7904,-63.671],[44.7917,-63.6863],[44.7945,-63.69],[44.7846,-63.6972],[44.7787,-63.6972],[44.774,-63.7003],[44.7741,-63.7064],[44.7709,-63.7093]]};

const AREA_NAMES = {
  halifax: "Halifax",
  dartmouth: "Dartmouth",
  bedford: "Bedford",
  sackville: "Lower Sackville",
};

const LEAFLET_CSS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
const LEAFLET_JS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";

function loadAsset(tag, attrs) {
  return new Promise((resolve, reject) => {
    const el = document.createElement(tag);
    Object.assign(el, attrs);
    el.onload = () => resolve();
    el.onerror = () => reject(new Error("asset failed"));
    document.head.appendChild(el);
  });
}

function initCoverageMap() {
  const mapEl = document.getElementById("coverageMap");
  const chipWrap = document.getElementById("areaChips");
  const hint = document.getElementById("mapHint");
  if (!mapEl || !chipWrap || typeof L === "undefined") return;

  const isTouch = window.matchMedia("(hover: none)").matches;

  const map = L.map(mapEl, {
    scrollWheelZoom: false,
    dragging: !isTouch,
    tap: false,
    zoomControl: true,
    attributionControl: true,
  });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 18,
  }).addTo(map);

  const BASE  = { color: "#ff2a2a", weight: 1.4, opacity: 0.55, fillColor: "#ff2a2a", fillOpacity: 0.10 };
  const HIGH  = { color: "#ff2a2a", weight: 2.6, opacity: 1,    fillColor: "#ff2a2a", fillOpacity: 0.34 };

  const layers = {};
  const group = L.featureGroup().addTo(map);

  Object.keys(COVERAGE_AREAS).forEach((key) => {
    const poly = L.polygon(COVERAGE_AREAS[key], BASE);
    poly.bindTooltip(AREA_NAMES[key] || key, {
      className: "area-label",
      sticky: true,
      direction: "top",
      opacity: 1,
    });
    poly.on("mouseover", () => setActive(key, false));
    poly.on("mouseout", () => { if (!pinned) setActive("all", false); else setActive(pinned, false); });
    poly.on("click", () => selectArea(key));
    poly.addTo(group);
    layers[key] = poly;
  });

  const allBounds = group.getBounds();
  map.fitBounds(allBounds, { padding: [24, 24] });

  let pinned = null;

  function setActive(key, moveMap) {
    Object.keys(layers).forEach((k) => {
      layers[k].setStyle(key !== "all" && k === key ? HIGH : BASE);
    });
    chipWrap.querySelectorAll(".area-chip").forEach((c) => {
      c.classList.toggle("is-active", c.dataset.area === key);
    });
    if (moveMap) {
      if (key === "all") map.flyToBounds(allBounds, { padding: [24, 24], duration: 0.6 });
      else if (layers[key]) map.flyToBounds(layers[key].getBounds(), { padding: [48, 48], duration: 0.6 });
    }
  }

  function selectArea(key) {
    pinned = key === "all" ? null : key;
    setActive(key, true);
    if (hint) hint.classList.add("is-hidden");
  }

  chipWrap.querySelectorAll(".area-chip").forEach((chip) => {
    const key = chip.dataset.area;
    chip.addEventListener("click", () => selectArea(key));
    chip.addEventListener("mouseenter", () => { if (!isTouch && key !== "all") setActive(key, false); });
    chip.addEventListener("mouseleave", () => { if (!isTouch) setActive(pinned || "all", false); });
    chip.addEventListener("focus", () => { if (key !== "all") setActive(key, false); });
  });

  map.on("movestart", () => { if (hint) hint.classList.add("is-hidden"); });
}

const coverageSection = document.getElementById("coverage");
if (coverageSection && "IntersectionObserver" in window) {
  let started = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      io.disconnect();
      Promise.all([
        loadAsset("link", { rel: "stylesheet", href: LEAFLET_CSS }),
        loadAsset("script", { src: LEAFLET_JS, async: true }),
      ])
        .then(() => initCoverageMap())
        .catch(() => {
          const shell = document.querySelector(".map-shell");
          if (shell) shell.style.display = "none";
        });
    });
  }, { rootMargin: "300px" });
  io.observe(coverageSection);
}
