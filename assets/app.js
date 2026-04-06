const SITE_CONFIG = {
  phoneDisplay: "+34 600 000 000",
  phoneRaw: "34600000000",
  email: "hola@ryudetailing.es",
  city: "Servicio a domicilio en tu zona"
};

function updateContactLinks() {
  document.querySelectorAll("[data-phone-display]").forEach((node) => {
    node.textContent = SITE_CONFIG.phoneDisplay;
  });

  document.querySelectorAll("[data-phone-link]").forEach((node) => {
    node.setAttribute("href", `tel:+${SITE_CONFIG.phoneRaw}`);
  });

  document.querySelectorAll("[data-email-display]").forEach((node) => {
    node.textContent = SITE_CONFIG.email;
  });

  document.querySelectorAll("[data-email-link]").forEach((node) => {
    node.setAttribute("href", `mailto:${SITE_CONFIG.email}`);
  });

  document.querySelectorAll("[data-city-display]").forEach((node) => {
    node.textContent = SITE_CONFIG.city;
  });
}

function enableMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function enableContactForm() {
  document.querySelectorAll("#contact-form, #hero-contact-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const text = [
        "Hola RYU DETAILING, quiero pedir presupuesto.",
        `Nombre: ${formData.get("name") || ""}`,
        `Telefono: ${formData.get("phone") || ""}`,
        `Servicio: ${formData.get("service") || ""}`,
        `Zona: ${formData.get("location") || ""}`,
        `Detalles: ${formData.get("message") || "Sin detalles adicionales"}`
      ].join("\n");

      window.open(`https://wa.me/${SITE_CONFIG.phoneRaw}?text=${encodeURIComponent(text)}`, "_blank");
    });
  });
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
}

updateContactLinks();
enableMobileMenu();
enableContactForm();
setYear();
