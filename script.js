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
// Slideshow (hero background)
// ----------------------
const slides = [
  "images/slide-1.jpg",
  "images/slide-2.jpg",
  "images/slide-3.jpg",
];

let slideIndex = 0;
// The hero slideshow in index.html is an <img id="slideImg">.
// So we swap the image src (instead of setting a background image).
const slideEl = document.getElementById("slideImg");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("dots");

function renderDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dot" + (i === slideIndex ? " active" : "");
    b.setAttribute("aria-label", `Go to slide ${
      i + 1
    }`);
    b.addEventListener("click", () => {
      slideIndex = i;
      showSlide();
      restartAuto();
    });
    dotsWrap.appendChild(b);
  });
}

function showSlide() {
  if (!slideEl) return;
  slideEl.src = slides[slideIndex];
  // Optional: keep the alt a bit more descriptive for accessibility.
  slideEl.alt = `Project photo ${slideIndex + 1} of ${slides.length}`;
  renderDots();
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide();
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide();
}

if (prevBtn) prevBtn.addEventListener("click", () => {
  prevSlide();
  restartAuto();
});
if (nextBtn) nextBtn.addEventListener("click", () => {
  nextSlide();
  restartAuto();
});

let autoTimer = null;
function restartAuto() {
  if (autoTimer) window.clearInterval(autoTimer);
  autoTimer = window.setInterval(nextSlide, 6000);
}

if (slideEl) {
  showSlide();
  restartAuto();
}

// ----------------------
// Review slideshow (6 reviews)
// ----------------------
const reviews = [
  { text: "Car looked brand new inside and out. Highly recommend.", name: "— Sarah K." },
  { text: "Very professional and on time. The attention to detail was impressive.", name: "— Mark D." },
  { text: "Booked last minute and they still delivered amazing results.", name: "— Alex P." },
  { text: "Interior was spotless and smelled fresh. Worth every dollar.", name: "— Jasmine R." },
  { text: "Reliable, polite, and the work quality was top tier.", name: "— Kevin S." },
  { text: "Our work vehicle fleet looks consistently clean now.", name: "— Daniel M." },
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
