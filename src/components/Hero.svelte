<script>
  import Chip from "./Chip.svelte";
  import { onMount } from "svelte";
  import heroData from "$data/hero.json";

  let mainHeroImage = "";

  let currentHero = {};
  let chips = [];
  let imageDimensions = { width: 0, height: 0 };
  let isTransitioning = false;
  let isInitialized = false;

  async function fetchHeroData() {
    try {
      mainHeroImage = heroData[0]?.image || "../assets/images/image1.jpg";
      currentHero = heroData.find((item) => item.image === mainHeroImage) || {};
      chips = currentHero.chips || [];
      setTimeout(() => {
        isInitialized = true;
      }, 100);
    } catch (err) {
      console.error("Erreur de chargement Hero:", err);
    }
  }

  function updateHero(imageSrc) {
    if (imageSrc === mainHeroImage) return;
    isTransitioning = true;
    setTimeout(() => {
      mainHeroImage = imageSrc;
      currentHero = heroData.find((item) => item.image === imageSrc) || {};
      chips = currentHero.chips || [];
    }, 300);
    setTimeout(() => {
      isTransitioning = false;
    }, 600);
  }

  function onImageLoad(event) {
    const img = event.target;
    imageDimensions = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };

    console.log("Image loaded", imageDimensions);
  }

  onMount(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.addEventListener("load", () => {
      window.scrollTo(0, 0);
    });

    fetchHeroData();
  });
</script>

<section class="hero">
  <img
    class="hero-image"
    src={mainHeroImage}
    alt="Main Hero"
    on:load={onImageLoad}
    style="opacity: {isTransitioning ? 0 : 1};" />

  {#if isInitialized}
    <!--  Gestion des chips -->
    <div class="chips-container {isTransitioning ? 'fade-content' : ''}">
      {#each chips as chip}
        <Chip
          leftPercent={chip.left}
          topPercent={chip.top}
          {imageDimensions}
          price={chip.price}
          productId={chip.productId} />
      {/each}
    </div>

    <div class="hero-thumbnails">
      {#each heroData as hero}
        <button
          type="button"
          on:click={() => updateHero(hero.image)}
          on:keydown={(e) => e.key === "Enter" && updateHero(hero.image)}
          class="thumbnail-button {hero.image === mainHeroImage
            ? 'active'
            : ''}">
          <img src={hero.image} alt={`Thumbnail for ${hero.title}`} />
        </button>
      {/each}
    </div>

    <div class="hero-description {isTransitioning ? 'fade-content' : ''}">
      <h3>{currentHero.title || "Titre manquant"}</h3>
      <p>{currentHero.description || "Description manquante"}</p>
      <a href={currentHero.link || "#"} class="btn-shop-now">Shop now</a>
    </div>
  {/if}

  <div class="hero-content">
    <h1>InnovAItion Outdoor</h1>
    <p>
      L'excellence de l'intelligence artificielle au service de vos moments en
      plein air.
    </p>
  </div>

  <!-- Chevron pour le scroll -->
  <a href="#scroll-chevron" class="hero-chevron" id="scroll-chevron"
    >&#x25BC;</a>
</section>

<style>
  /* Hero Section Styling */
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    height: 100svh;
    background-size: cover;
    background-position: center;
  }

  .hero-content {
    top: 20%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
  }

  .hero-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    object-fit: cover;
    transition: opacity 0.3s ease-in-out;
  }

  .chips-container {
    position: relative;
    width: 100%;
    height: 100vh;
  }

  .hero-content h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px var(--color-shadow); /* Ombre portée pour le titre */
  }

  .hero-content p {
    text-shadow: 2px 2px 4px var(--color-shadow);
    font-size: 18px;
    margin-bottom: 20px;
  }

  /* Button Shop Now Styling */
  .btn-shop-now {
    background-color: var(--color-btn-bg);
    color: var(--color-btn-text);
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  .btn-shop-now:hover {
    background-color: var(--color-btn-bg-hover);
    color: var(--color-light);
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
    box-shadow: 0 4px 8px var(--box-shadow);
    max-width: 300px;
    min-height: 300px;
    text-align: left;
    /* Ajout d'un espacement entre les textes */
    line-height: 1.5;
  }

  .hero-description h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--color-dark);
  }

  .hero-description p {
    font-size: 14px;
    margin-bottom: 10px;
    color: var(--color-dark);
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

  /* Chevron Styling */
  .hero-chevron {
    position: absolute;
    bottom: 10px; /* Positionné juste au-dessus du bas de la Hero */
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px; /* Taille du chevron */
    color: var(--color-dark); /* Couleur noire */
    cursor: pointer;
    animation: bounce 1.5s infinite; /* Animation pour attirer l'attention */
  }

  .hero-chevron:hover {
    color: var(--color-primary); /* Change légèrement la couleur au survol */
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

  .chips-container,
  .hero-description {
    opacity: 0;
    visibility: hidden; /* Masque complètement avant initialisation */
  }

  .chips-container.fade-content,
  .hero-description.fade-content {
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
  }

  .chips-container:not(.fade-content),
  .hero-description:not(.fade-content) {
    opacity: 1;
    visibility: visible; /* Affiche après transition */
    transform: translateY(0);
    transition:
      opacity 0.6s ease-in-out,
      transform 0.6s ease-in-out;
  }
  button:focus-visible {
    outline: 2px solid var(--color-primary);
  }
</style>
