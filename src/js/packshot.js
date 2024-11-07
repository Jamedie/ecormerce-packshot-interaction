export function createPackshot(packshotData) {
  const template = document.getElementById("packshot-template");
  const packshot = template.content.cloneNode(true);

  const packshotElement = packshot.querySelector(".packshot");
  packshotElement.style.gridColumnEnd = `span ${packshotData.image.size}`;
  packshotElement.style.gridRowEnd = `span ${packshotData.image.height}`;

  const img = packshot.querySelector("img");
  img.src = packshotData.image.src;
  img.alt = packshotData.image.alt;

  const pastillesContainer = packshot.querySelector("#pastilles-container");
  pastillesContainer.id = "";

  img.onload = () => {
    const imageDimensions = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };

    packshotData.pastilles.forEach((pastilleData) => {
      const pastille = createPastille(pastilleData, imageDimensions);
      pastillesContainer.appendChild(pastille);
    });
  };

  return packshot;
}

export function createPastille(data, imageDimensions) {
  const template = document.getElementById("pastille-template");
  const pastille = template.content.cloneNode(true);

  const container = pastille.querySelector(".pastille-container");

  const leftPercent = (data.left / imageDimensions.width) * 100;
  const topPercent = (data.top / imageDimensions.height) * 100;

  container.style.left = `${leftPercent}%`;
  container.style.top = `${topPercent}%`;

  const price = pastille.querySelector(".sub-pastille.price");
  if (data.price) price.textContent = `${data.price}€`;
  else price.remove();

  return container;
}
