import { initHero } from "./hero.js";
import { createPackshot } from "./packshot.js";

document.addEventListener("DOMContentLoaded", () => {
  // Désactive la restauration du scroll et remonte en haut de la page
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
  });

  initHero();

  fetch("./data/gallery.json")
    .then((res) => res.json())
    .then((packshotsData) => {
      const packshotsWrapper = document.getElementById("packshots-wrapper");
      packshotsData.forEach((packshotData) => {
        const packshot = createPackshot(packshotData);
        packshotsWrapper.appendChild(packshot);
      });
    });

  const chevron = document.getElementById("scroll-chevron");
  if (chevron) {
    chevron.addEventListener("click", scrollToNextSection);
  }
});

function scrollToNextSection() {
  const nextSection = document.querySelector(".gallery");
  if (nextSection) {
    const offsetTop =
      nextSection.getBoundingClientRect().top + window.scrollY - 40;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}
