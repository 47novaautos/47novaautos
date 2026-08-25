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
// Review slideshow (8 reviews)
// ----------------------
const reviews = [
  { text: "My 2009 Honda Civic looks so much better than before. Highly recommend trusting them with your vehicle.", name: "— Dipanshu C." },
  { text: "Called in a panic for a last-minute detail and they delivered — even fixed brutal winter salt stains on the mats.", name: "— Rishi U." },
  { text: "Contacted them on a Saturday, they came the next day. My SUV looks brand new after 4+ hours of work.", name: "— Ashley H." },
  { text: "The team at 47 Nova Autos took great care of my truck — showed up on time and worked through the rain.", name: "— Chad B." },
  { text: "Best prices, best customer service, best cleaning. They worked through rain and darkness with a smile.", name: "— Ben L." },
  { text: "Great job — car smells amazing, and $20 less than most while being more thorough.", name: "— Armanda L." },
  { text: "Got the Advanced Interior package and I'm 100% satisfied. Professional work done by the team.", name: "— Parmbir S." },
  { text: "Spent 5 hours detailing my car — it looks brand new. Highly recommend 47 Nova Autos.", name: "— Jeff R." },
    ];

let reviewIndex = 0;
const reviewTextEl = document.getElementById("reviewText");
const reviewNameEl = document.getElementById("reviewName");
const revDotsWrap = document.getElementById("revDots");
const revPrevBtn = document.getElementById("revPrevBtn");
const revNextBtn = document.getElementById("revNextBtn");

function renderReviewDots() {
  if (!revDotsWrap) return;
  revDotsWrap.innerHTML = "";
  reviews.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dot" + (i === reviewIndex ? " active" : "");
    b.setAttribute("aria-label", `Go to review ${
      i + 1
    }`);
    b.addEventListener("click", () => {
      reviewIndex = i;
      showReview();
      restartReviewAuto();
    });
    revDotsWrap.appendChild(b);
  });
}

function showReview() {
  if (!reviewTextEl || !reviewNameEl) return;
  const r = reviews[reviewIndex];
  reviewTextEl.textContent = r.text;
  reviewNameEl.textContent = r.name;
  renderReviewDots();
}

function nextReview() {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  showReview();
}

function prevReview() {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
  showReview();
}

if (revPrevBtn) revPrevBtn.addEventListener("click", () => {
  prevReview();
  restartReviewAuto();
});
if (revNextBtn) revNextBtn.addEventListener("click", () => {
  nextReview();
  restartReviewAuto();
});

let reviewTimer = null;
function restartReviewAuto() {
  if (reviewTimer) window.clearInterval(reviewTimer);
  reviewTimer = window.setInterval(nextReview, 5000);
}

if (reviews.length && reviewTextEl && reviewNameEl) {
  showReview();
  restartReviewAuto();
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

  const subject = encodeURIComponent("Fleet Service Request — 47 Nova Autos LTD");
  const body = encodeURIComponent(
`Fleet Size: ${fleetSize}
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
