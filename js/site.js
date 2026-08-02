/* Mobile menu + photo lightbox with next/prev */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox img");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  if (!lightbox || !lightboxImg) return;

  const items = Array.from(document.querySelectorAll("[data-lightbox]"));
  let currentIndex = 0;

  function showAt(index) {
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    const link = items[currentIndex];
    lightboxImg.src = link.getAttribute("href");
    lightboxImg.alt = link.querySelector("img")?.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.removeAttribute("src");
  }

  items.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showAt(index);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxPrev?.addEventListener("click", (event) => {
    event.stopPropagation();
    showAt(currentIndex - 1);
  });
  lightboxNext?.addEventListener("click", (event) => {
    event.stopPropagation();
    showAt(currentIndex + 1);
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showAt(currentIndex - 1);
    if (event.key === "ArrowRight") showAt(currentIndex + 1);
  });
});
