function getClickPosition(event) {
  const image = event.target;
  const rect = image.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log(`x: ${Math.round(x)}, y: ${Math.round(y)}`);
}

// La totalité d'une ligne doit etre 60
// Charger les données depuis le fichier JSON
fetch("./data/gallery.json")
  .then((response) => response.json())
  .then((packshotsData) => {
    const packshotsWrapper = document.getElementById("packshots-wrapper");
    packshotsData.forEach((packshotData) => {
      const packshot = createPackshot(packshotData);
      packshotsWrapper.appendChild(packshot);
    });
  })
  .catch((error) =>
    console.error("Erreur lors du chargement des données :", error)
  );

function createPackshot(packshotData) {
  const template = document.getElementById("packshot-template");
  const packshot = template.content.cloneNode(true);

  const packshotElement = packshot.querySelector(".packshot");

  // Ajuste la largeur et la hauteur dynamiquement pour la grille
  packshotElement.style.gridColumnEnd = `span ${packshotData.image.size}`;
  packshotElement.style.gridRowEnd = `span ${packshotData.image.height}`;

  const img = packshot.querySelector("img");
  img.src = packshotData.image.src;
  img.alt = packshotData.image.alt;

  const pastillesContainer = packshot.querySelector("#pastilles-container");
  pastillesContainer.id = ""; // Supprime l'ID pour éviter les conflits

  // Attendez que l'image soit chargée avant de calculer les dimensions
  img.onload = () => {
    const imageDimensions = {
      width: img.naturalWidth, // Utilisez naturalWidth/Height pour des dimensions réelles
      height: img.naturalHeight,
    };

    packshotData.pastilles.forEach((pastilleData) => {
      const pastille = createPastille(pastilleData, imageDimensions);
      pastillesContainer.appendChild(pastille);
    });
  };

  return packshot; // Retourne toujours l'élément même si les pastilles arrivent après
}

function createPastille(data, imageDimensions) {
  const template = document.getElementById("pastille-template");
  const pastille = template.content.cloneNode(true);

  const container = pastille.querySelector(".pastille-container");

  // Calcul des positions en pourcentage par rapport à l'image
  const leftPercent = (data.left / imageDimensions.width) * 100;
  const topPercent = (data.top / imageDimensions.height) * 100;

  container.style.left = `${leftPercent}%`;
  container.style.top = `${topPercent}%`;

  const price = pastille.querySelector(".sub-pastille.price");
  if (data.price) {
    price.textContent = `${data.price}€`;
  } else {
    price.remove();
  }

  return container;
}

function scrollToNextSection() {
  const nextSection = document.querySelector(".gallery");
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelector(".hero");
  const thumbnails = document.querySelectorAll(".hero-thumbnails img");
  const pastillesContainer = document.createElement("div");
  pastillesContainer.classList.add("pastilles-container");
  heroSection.appendChild(pastillesContainer);

  let heroData = []; // Stocke les données JSON chargées
  let mainHeroImage = "./assets/images/NouveauxHorizons_Zone03.jpg";

  // Charger les données depuis hero.json
  fetch("./data/hero.json")
    .then((response) => response.json())
    .then((data) => {
      heroData = data;
      console.log("heroData après chargement :", heroData); // Déplacez ce console.log ici

      updateHero(mainHeroImage); // Affiche l'image principale avec ses pastilles
    })
    .catch((error) =>
      console.error("Erreur lors du chargement des données :", error)
    );
  // Ajouter l'événement au clic sur la Hero Section
  heroSection.addEventListener("click", getClickPosition);

  // Fonction pour changer l'image principale et créer les pastilles
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      const clickedThumbnailSrc = thumbnail.src;
      mainHeroImage = clickedThumbnailSrc;

      updateHero(mainHeroImage); // Met à jour la Hero Section
    });
  });

  function updateHero(imageSrc) {
    heroSection.style.backgroundImage = `url(${imageSrc})`;
    pastillesContainer.innerHTML = "";
    const normalizedSrc = imageSrc.replace(location.origin, "."); // Convertit un chemin absolu en relatif

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

      const normalizedImageSrc = imageSrc.replace(location.origin, ".");

      if (currentData && currentData.pastilles) {
        const img = new Image();
        img.src = normalizedImageSrc;

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
  }

  window.addEventListener("resize", () => {
    document.querySelectorAll(".packshot").forEach((packshotElement) => {
      const img = packshotElement.querySelector("img");
      const pastilles = packshotElement.querySelectorAll(".pastille-container");

      const imageDimensions = {
        width: img.clientWidth,
        height: img.clientHeight,
      };

      pastilles.forEach((pastille) => {
        const data = pastille.dataset;
        pastille.style.left = `${(data.left / imageDimensions.width) * 100}%`;
        pastille.style.top = `${(data.top / imageDimensions.height) * 100}%`;
      });
    });
  });
});
