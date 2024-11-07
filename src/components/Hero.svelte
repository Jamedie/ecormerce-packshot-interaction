<script>
  import Chip from "./Chip.svelte";
  import { onMount } from "svelte";

  let heroData = [];
  let mainHeroImage = "";

  let currentHero = {};
  let chips = [];
  let imageDimensions = { width: 0, height: 0 };

  async function fetchHeroData() {
    try {
      const res = await fetch("/data/hero.json");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      heroData = await res.json();
      mainHeroImage = heroData[0]?.image || "../assets/images/image1.jpg";
      updateHero(mainHeroImage);
    } catch (err) {
      console.error("Erreur de chargement Hero:", err);
    }
  }

  function updateHero(imageSrc) {
    mainHeroImage = imageSrc;
    currentHero = heroData.find((item) => item.image === imageSrc) || {};
    chips = currentHero.chips || [];
  }

  function onImageLoad(event) {
    const img = event.target;
    imageDimensions = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
  }
  onMount(() => {
    fetchHeroData();
  });
</script>

<section class="hero" style="background-image: url({mainHeroImage})">
  <!-- Image cachée pour charger et obtenir les dimensions -->
  <img
    src={mainHeroImage}
    alt="Main Hero"
    on:load={onImageLoad}
    style="display: none;" />

  <div class="hero-content">
    <h1>InnovAItion Outdoor</h1>
    <p>
      L'excellence de l'intelligence artificielle au service de vos moments en
      plein air.
    </p>
    <a href="#" class="btn-shop-now">Shop now</a>
  </div>

  <!--  Gestion des chips -->
  <div class="chips-container">
    {#each chips as chip}
      <Chip
        left={chip.left}
        top={chip.top}
        {imageDimensions}
        price={chip.price}
        onClick={() => console.log(`Chip cliquée : ${chip.price}€`)} />
    {/each}
  </div>

  <div class="hero-thumbnails">
    {#each heroData as hero}
      <button
        type="button"
        on:click={() => updateHero(hero.image)}
        on:keydown={(e) => e.key === "Enter" && updateHero(hero.image)}
        class="thumbnail-button {hero.image === mainHeroImage ? 'active' : ''}">
        <img src={hero.image} alt={`Thumbnail for ${hero.title}`} />
      </button>
    {/each}
  </div>

  <div class="hero-description">
    <h3>{currentHero.title || "Titre manquant"}</h3>
    <p>{currentHero.description || "Description manquante"}</p>
    <a href={currentHero.link || "#"} class="btn-shop-now">Shop now</a>
  </div>

  <!-- Chevron pour le scroll -->
  <div class="hero-chevron" id="scroll-chevron">&#x25BC;</div>
</section>

<style>
  /* Hero Section Styling */
  .hero {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-size: cover;
    background-position: center;
    color: #000000;
    text-align: center;
    padding-top: 180px;
    position: relative;
  }

  .hero-content h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Ombre portée pour le titre */
  }

  .hero-content p {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    font-size: 18px;
    margin-bottom: 20px;
  }

  /* Button Shop Now Styling */
  .btn-shop-now {
    background-color: #fff;
    color: #000;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .btn-shop-now:hover {
    background-color: #000;
    color: #fff;
  }

  /* Hero Thumbnails Styling */
  .hero-thumbnails {
    position: absolute;
    bottom: 80px;
    right: 50px;
    display: flex;
    gap: 10px;
  }
  .thumbnail-button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  .hero-thumbnails img {
    width: 150px;
    height: auto;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.2s ease;
  }

  .hero-thumbnails img:hover {
    transform: scale(1.1);
  }

  /* Hero Description Styling */
  .hero-description {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background-color: rgba(255, 255, 255, 0.9); /* Fond blanc transparent */
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 300px;
    min-height: 400px;
    text-align: left;
    /* Ajout d'un espacement entre les textes */
    line-height: 1.5;
  }

  .hero-description h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #000;
  }

  .hero-description p {
    font-size: 14px;
    margin-bottom: 10px;
    color: #000;
  }

  .hero-description a {
    position: absolute;
    bottom: 20px; /* Positionné juste au-dessus du bas de la description */
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    margin-top: 15px; /* Ajoute un espacement au-dessus du bouton */
  }

  .chips-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* Chevron Styling */
  .hero-chevron {
    position: absolute;
    bottom: 10px; /* Positionné juste au-dessus du bas de la Hero */
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px; /* Taille du chevron */
    color: #000; /* Couleur noire */
    cursor: pointer;
    animation: bounce 1.5s infinite; /* Animation pour attirer l'attention */
  }

  .hero-chevron:hover {
    color: #555; /* Change légèrement la couleur au survol */
  }

  /* Animation de rebond pour le chevron */
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
</style>
