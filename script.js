// 47 Nova Autos LTD — site interactions
const BOOKING_URL = "https://calendar.app.google/iShN8QECKDK546CaA";
const BUSINESS_EMAIL = "47novaservices@gmail.com";

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Booking buttons
document.querySelectorAll("[data-booking]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(BOOKING_URL, "_blank", "noopener");
  });
});

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const willOpen = mobileMenu.hasAttribute("hidden");
    mobileMenu.toggleAttribute("hidden");
    menuBtn.setAttribute("aria-expanded", String(willOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileMenu.setAttribute("hidden", "");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Slideshow
const slides = [
  { src: "images/slide-1.jpg", alt: "Finished Interior — Retail package result" },
  { src: "images/slide-2.jpg", alt: "Commercial Vehicle — Fleet cleaning & maintenance" },
  { src: "images/slide-3.jpg", alt: "Before / After — Interior cleaning example" },
];

let slideIndex = 0;
const slideImg = document.getElementById("slideImg");
const dotsWrap = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function renderDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "dot" + (i === slideIndex ? " active" : "");
    b.setAttribute("aria-label", `Go to slide ${i + 1}`);
    b.addEventListener("click", () => {
      slideIndex = i;
      showSlide();
      restartAuto();
    });
    dotsWrap.appendChild(b);
  });
}

function showSlide() {
  if (!slideImg) return;
  const s = slides[slideIndex];
  slideImg.src = s.src;
  slideImg.alt = s.alt;
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

if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); restartAuto(); });
if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); restartAuto(); });

let autoTimer = null;
function restartAuto() {
  if (autoTimer) window.clearInterval(autoTimer);
  autoTimer = window.setInterval(nextSlide, 4500);
}

showSlide();
restartAuto();

// Fleet form -> opens a prefilled email
const fleetForm = document.getElementById("fleetForm");
const fleetToast = document.getElementById("fleetToast");

function getCheckedValues(form, name) {
  return Array.from(form.querySelectorAll(`[name="${name}"]:checked`)).map((x) => x.value);
}

if (fleetForm) {
  fleetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(fleetForm);
    const fleetSize = data.get("fleet_size") || "";
    const frequency = data.get("frequency") || "";
    const vehicleTypes = getCheckedValues(fleetForm, "vehicle_type").join(", ") || "N/A";
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
Email: ${email}

Notes:
(Reply with pricing + schedule options)`
    );

    if (fleetToast) {
      fleetToast.hidden = false;
      window.setTimeout(() => (fleetToast.hidden = true), 4500);
    }

    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
    fleetForm.reset();
  });
}


/* Review slideshow (Google reviews) */
const reviews = [
  { text: "Car looked brand new inside and out. Highly recommend.", name: "— Sarah K." },
  { text: "Very professional and on time. The attention to detail was impressive.", name: "— Mark D." },
  { text: "Booked last minute and they still delivered amazing results.", name: "— Alex P." },
  { text: "Interior was spotless and smelled fresh. Worth every dollar.", name: "— Jasmine R." },
  { text: "Reliable, polite, and the work quality was top tier.", name: "— Kevin S." },
  { text: "Our work vehicle fleet looks consistently clean now.", name: "— Daniel M." }
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
    b.setAttribute("aria-label", `Go to review ${i + 1}`);
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

if (revPrevBtn) revPrevBtn.addEventListener("click", () => { prevReview(); restartReviewAuto(); });
if (revNextBtn) revNextBtn.addEventListener("click", () => { nextReview(); restartReviewAuto(); });

let reviewTimer = null;
function restartReviewAuto() {
  if (reviewTimer) window.clearInterval(reviewTimer);
  reviewTimer = window.setInterval(nextReview, 5000);
}

if (reviews.length && reviewTextEl && reviewNameEl) {
  showReview();
  restartReviewAuto();
}
