// 47 Nova Autos LTD — site interactions
const BOOKING_URL = "https://calendar.app.google/iShN8QECKDK546CaA";
const BUSINESS_EMAIL = "47novaservices@gmail.com";

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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

// Bundle selector (Option A: copy booking note)
const modal = document.getElementById("bundleModal");
const backdrop = document.getElementById("bundleBackdrop");
const closeBtn = document.getElementById("bundleClose");
const yesBtn = document.getElementById("bundleYes");
const noBtn = document.getElementById("bundleNo");
const promptEl = document.getElementById("bundlePrompt");
const summary = document.getElementById("bundleSummary");
const choices = document.getElementById("bundleChoices");
const linesEl = document.getElementById("summaryLines");
const noteInput = document.getElementById("bookingNote");
const copyBtn = document.getElementById("copyNote");
const continueBtn = document.getElementById("continueBooking");
const editBtn = document.getElementById("editSelection");

let lastClicked = { category: "generic", service: "Booking" };
let selection = { interior: null, exterior: null, bundled: false };

function openModal() {
  if (!modal || !backdrop) return;
  backdrop.hidden = false;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal || !backdrop) return;
  backdrop.hidden = true;
  modal.hidden = true;
  document.body.style.overflow = "";
  if (summary) summary.hidden = true;
  if (choices) choices.hidden = false;
}

function setPrompt() {
  if (!promptEl) return;
  if (lastClicked.category === "interior") promptEl.textContent = "Add Exterior Wash & save $20";
  else if (lastClicked.category === "exterior") promptEl.textContent = "Add an Interior package & save $20";
  else promptEl.textContent = "Add Exterior Wash & save $20";
}

function buildNote() {
  const parts = [];
  if (selection.interior) parts.push(selection.interior);
  if (selection.exterior) parts.push(selection.exterior);
  if (selection.bundled) parts.push("(Bundle –$20)");
  return parts.join(" + ");
}

function renderSummary() {
  if (!summary || !choices || !linesEl || !noteInput) return;
  const lines = [];
  if (selection.interior) lines.push(`• ${selection.interior}`);
  if (selection.exterior) lines.push(`• ${selection.exterior}`);
  linesEl.textContent = lines.join("\n");
  noteInput.value = buildNote();
  choices.hidden = true;
  summary.hidden = false;
}

document.querySelectorAll("[data-booking]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const category = el.getAttribute("data-category") || "generic";
    const service = el.getAttribute("data-service") || "Booking";
    lastClicked = { category, service };

    selection = { interior: null, exterior: null, bundled: false };
    if (category === "interior") selection.interior = service;
    if (category === "exterior") selection.exterior = service;

    setPrompt();
    openModal();
  });
});

if (backdrop) backdrop.addEventListener("click", closeModal);
if (closeBtn) closeBtn.addEventListener("click", closeModal);

if (noBtn) noBtn.addEventListener("click", () => {
  selection.bundled = false;
  renderSummary();
});

if (yesBtn) yesBtn.addEventListener("click", () => {
  if (lastClicked.category === "interior") {
    selection.exterior = "Exterior Wash";
    selection.bundled = true;
  } else if (lastClicked.category === "exterior") {
    // Default interior package if they start with exterior (can be changed later)
    selection.interior = selection.interior || "Basic Interior";
    selection.bundled = true;
  } else {
    selection.exterior = "Exterior Wash";
    selection.bundled = true;
  }
  renderSummary();
});

if (editBtn) editBtn.addEventListener("click", () => {
  if (summary) summary.hidden = true;
  if (choices) choices.hidden = false;
});

if (copyBtn) copyBtn.addEventListener("click", async () => {
  const text = noteInput ? noteInput.value : "";
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
  } catch {
    if (noteInput) {
      noteInput.focus();
      noteInput.select();
      document.execCommand("copy");
      copyBtn.textContent = "Copied";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
    }
  }
});

if (continueBtn) continueBtn.addEventListener("click", () => {
  closeModal();
  window.open(BOOKING_URL, "_blank", "noopener");
});

// Fleet form (Formspree recommended). If endpoint is empty, fallback will email you.
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
      headers: { "Accept": "application/json" },
    });
    return res.ok;
  }

  // Fallback (only if endpoint isn't set yet)
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
