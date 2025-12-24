// 47 Nova Autos LTD — small JS only (menu, slideshow, booking placeholder)
(() => {
  const bookingLink = null; // TODO: Paste your Google Calendar booking link here later.

  // Update year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const setMenu = (open) => {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    mobileMenu.hidden = !open;
  };
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const open = menuBtn.getAttribute("aria-expanded") === "true";
      setMenu(!open);
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => setMenu(false));
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Booking placeholders
  const bookingEls = document.querySelectorAll("[data-booking]");
  bookingEls.forEach(el => {
    el.addEventListener("click", (e) => {
      if (bookingLink) {
        el.setAttribute("href", bookingLink);
        return;
      }
      e.preventDefault();
      alert("Booking link not added yet. Please call us for now — booking will be live shortly.");
      window.location.href = "tel:+17828824395";
    });
  });

  // Slideshow
  const slides = [
    "images/slide-1.jpg",
    "images/slide-2.jpg",
    "images/slide-3.jpg"
  ];

  let idx = 0;
  const img = document.getElementById("slideImg");
  const dotsWrap = document.getElementById("dots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const renderDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "dot" + (i === idx ? " active" : "");
      dot.addEventListener("click", () => { idx = i; update(); });
      dotsWrap.appendChild(dot);
    });
  };

  const update = () => {
    if (img) img.src = slides[idx];
    if (dotsWrap) {
      dotsWrap.querySelectorAll(".dot").forEach((d, i) => {
        d.classList.toggle("active", i === idx);
      });
    }
  };

  const next = () => { idx = (idx + 1) % slides.length; update(); };
  const prev = () => { idx = (idx - 1 + slides.length) % slides.length; update(); };

  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (nextBtn) nextBtn.addEventListener("click", next);

  renderDots();
  update();

  // Auto-advance
  setInterval(next, 5500);

  // Fleet form (local confirmation only)
  const fleetForm = document.getElementById("fleetForm");
  const toast = document.getElementById("fleetToast");
  if (fleetForm) {
    fleetForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (toast) {
        toast.hidden = false;
        setTimeout(() => { toast.hidden = true; }, 4500);
      }
      fleetForm.reset();
    });
  }
})();
