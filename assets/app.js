/* RYU DETAILING — app.js v2 */

const SITE_CONFIG = {
  phoneDisplay: "+34 600 000 000",
  phoneRaw: "34600000000",
  email: "hola@ryudetailing.es",
  city: "Servicio a domicilio en tu zona"
};

/* ── Contact data injection ─────────────────── */
function updateContactLinks() {
  document.querySelectorAll("[data-phone-display]").forEach(n => n.textContent = SITE_CONFIG.phoneDisplay);
  document.querySelectorAll("[data-phone-link]").forEach(n => n.setAttribute("href", `tel:+${SITE_CONFIG.phoneRaw}`));
  document.querySelectorAll("[data-email-display]").forEach(n => n.textContent = SITE_CONFIG.email);
  document.querySelectorAll("[data-email-link]").forEach(n => n.setAttribute("href", `mailto:${SITE_CONFIG.email}`));
  document.querySelectorAll("[data-city-display]").forEach(n => n.textContent = SITE_CONFIG.city);
  document.querySelectorAll("[data-year]").forEach(n => n.textContent = new Date().getFullYear());
}

/* ── Mobile menu ─────────────────── */
function enableMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", e => {
    if (!e.target.closest(".site-header")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ── WhatsApp form ─────────────────── */
function enableContactForms() {
  document.querySelectorAll("#contact-form, #hero-contact-form").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const d = new FormData(form);
      const msg = [
        "Hola RYU DETAILING, me gustaría pedir presupuesto.",
        `Nombre: ${d.get("name") || "—"}`,
        `Teléfono: ${d.get("phone") || "—"}`,
        `Servicio: ${d.get("service") || "—"}`,
        `Zona: ${d.get("location") || "—"}`,
        `Detalles: ${d.get("message") || "Sin detalles adicionales"}`
      ].join("\n");
      window.open(`https://wa.me/${SITE_CONFIG.phoneRaw}?text=${encodeURIComponent(msg)}`, "_blank");
    });
  });
}

/* ── Scroll reveal animations ─────────────────── */
function enableScrollReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".fade-up").forEach(el => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".fade-up").forEach(el => io.observe(el));
}

/* ── Sticky header shrink ─────────────────── */
function enableStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  let last = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > 80) {
      header.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
    } else {
      header.style.boxShadow = "";
    }
    last = y;
  }, { passive: true });
}

/* ── WA FAB update ─────────────────── */
function updateWaFab() {
  document.querySelectorAll(".wa-fab").forEach(el => {
    el.setAttribute("href", `https://wa.me/${SITE_CONFIG.phoneRaw}?text=${encodeURIComponent("Hola RYU DETAILING, me gustaría pedir más información.")}`);
  });
}

/* ── Init ─────────────────── */
updateContactLinks();
enableMobileMenu();
enableContactForms();
enableScrollReveal();
enableStickyHeader();
updateWaFab();
