import { createPastille } from "./packshot.js";

let heroData = [];
let mainHeroImage = "./assets/images/NouveauxHorizons_Zone03.jpg";

export function initHero() {
  const heroSection = document.querySelector(".hero");
  const pastillesContainer = document.createElement("div");
  pastillesContainer.classList.add("pastilles-container");
  heroSection.appendChild(pastillesContainer);

  fetch("./data/hero.json")
    .then((res) => res.json())
    .then((data) => {
      heroData = data;
      updateHero(mainHeroImage, heroSection, pastillesContainer);
    })
    .catch((err) => console.error("Erreur de chargement Hero:", err));
}

function updateHero(imageSrc, heroSection, pastillesContainer) {
  heroSection.style.backgroundImage = `url(${imageSrc})`;
  pastillesContainer.innerHTML = "";

  const normalizedSrc = imageSrc.replace(location.origin, ".");
  const currentData = heroData.find((item) => item.image === normalizedSrc);

  if (currentData) {
    // Mettre à jour le texte descriptif
    document.getElementById("hero-title").textContent =
      currentData.title || "No title";
    document.getElementById("hero-text").textContent =
      currentData.description || "No description available.";
    document
      .getElementById("hero-link")
      .setAttribute("href", currentData.link || "#");

    const img = new Image();
    img.src = normalizedSrc;

    img.onload = () => {
      const imageDimensions = {
        width: img.naturalWidth,
        height: img.naturalHeight,
      };

      currentData.pastilles.forEach((pastilleData) => {
        const pastille = createPastille(pastilleData, imageDimensions);
        pastillesContainer.appendChild(pastille);
      });
    };
  } else {
    console.warn("No pastilles found for this image:", imageSrc);
  }
}
