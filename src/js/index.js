function getClickPosition(event) {
  const image = event.target;
  const rect = image.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log(`x: ${Math.round(x)}, y: ${Math.round(y)}`);
}

// La totalité d'une ligne doit etre 60
const packshotsData = [
  {
    image: {
      src: "./assets/images/image1.jpg",
      ratio: "16/9",
      alt: "Packshot 1",
      size: 50,
      height: 9, // Hauteur sur 4 rangées
    },
    pastilles: [{ left: 690, top: 542, price: 599 }],
  },
  {
    image: {
      src: "./assets/images/image3.jpg",
      ratio: "9/16",
      size: 10, // Largeur sur 4 colonnes
      height: 9, // Hauteur sur 8 rangées
      alt: "Packshot 3",
    },
    pastilles: [{ left: 193, top: 557, price: 50 }],
  },
  {
    image: {
      src: "./assets/images/image2.jpg",
      ratio: "16/9",
      alt: "Packshot 2",
      size: 60,
      height: 4, // Hauteur sur 8 rangées
    },
    pastilles: [{ left: 1056, top: 685, price: 399 }],
  },
  {
    image: {
      src: "./assets/images/image4.jpg",
      ratio: "9/16",
      alt: "Packshot 4",
      size: 20,
      height: 9, // Hauteur sur 8 rangées
    },
    pastilles: [{ left: 412, top: 589, price: 399 }],
  },
  {
    image: {
      src: "./assets/images/image5.jpg",
      ratio: "16/9",
      alt: "Packshot 5",
      size: 40,
      height: 9, // Hauteur sur 8 rang
    },
    pastilles: [
      { left: 641, top: 405, price: 499 },
      { left: 269, top: 586, price: 149 },
    ],
  },
  {
    image: {
      src: "./assets/images/image6.jpg",
      ratio: "9/16",
      alt: "Packshot 6",
      size: 60,
      height: 9, // Hauteur sur 8 rangées
    },
    pastilles: [
      { left: 307, top: 190, price: 399 },
      { left: 307, top: 190, price: 399 },
    ],
  },
];

function createPackshot(packshotData) {
  const template = document.getElementById("packshot-template");
  const packshot = template.content.cloneNode(true);

  const packshotElement = packshot.querySelector(".packshot");

  // Ajuste la largeur et la hauteur dynamiquement
  packshotElement.style.gridColumnEnd = `span ${packshotData.image.size}`; // Largeur
  packshotElement.style.gridRowEnd = `span ${packshotData.image.height}`; // Hauteur

  const img = packshot.querySelector("img");
  img.src = packshotData.image.src;
  img.alt = packshotData.image.alt;

  const pastillesContainer = packshot.querySelector("#pastilles-container");
  pastillesContainer.id = ""; // Supprimer l'ID pour éviter les conflits

  packshotData.pastilles.forEach((pastilleData) => {
    const pastille = createPastille(pastilleData);
    pastillesContainer.appendChild(pastille);
  });

  return packshot;
}

function createPastille(data) {
  const template = document.getElementById("pastille-template");
  const pastille = template.content.cloneNode(true);

  const container = pastille.querySelector(".pastille-container");
  container.style.top = `${data.top}px`;
  container.style.left = `${data.left}px`;

  const price = pastille.querySelector(".sub-pastille.price");
  price.textContent = `${data.price}€`;

  return container;
}

// Injecter les packshots dans la page
const packshotsWrapper = document.getElementById("packshots-wrapper");
packshotsData.forEach((packshotData) => {
  const packshot = createPackshot(packshotData);
  packshotsWrapper.appendChild(packshot);
});
