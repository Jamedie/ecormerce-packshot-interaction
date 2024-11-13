<script>
  import { onMount } from "svelte";
  import Packshot from "./Packshot.svelte";

  let galleryData = [];

  onMount(async () => {
    try {
      const res = await fetch("/data/gallery.json");
      if (!res.ok) throw new Error("Erreur lors du chargement de la galerie.");
      galleryData = await res.json();
    } catch (error) {
      console.error("Erreur :", error);
    }
  });

  function handleChipClick(productId) {
    window.location.href = `/product/${productId}`;
  }
</script>

<div class="gallery-title">
  <h2>Éveillez votre potentiel extérieur</h2>
  <p>
    Explorez notre sélection exclusive, où la technologie de pointe rencontre un
    design visionnaire. Grâce à l'intelligence artificielle,<br /> chaque article
    est soigneusement sélectionné pour sublimer votre feng shui, transformant vos
    habitudes en expériences uniques.
  </p>
</div>

<div id="gallery">
  {#each galleryData as packshotData}
    <Packshot {packshotData} {handleChipClick} />
  {/each}
</div>

<style>
  .gallery-title {
    text-align: center;
    padding: var(--space-lg);
  }

  .gallery-title h2 {
    font-size: 2rem;
    color: var(--color-primary);
    margin-bottom: var(--space-sm);
    font-weight: bold;
  }

  .gallery-title p {
    font-size: 1rem;
    color: var(--color-secondary);
    margin: 0 auto;
    max-width: 1200px;
    line-height: 1.5;
  }

  #gallery {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(150px, 200px);
    gap: var(--space-sm);
    padding-left: var(--space-lg);
    padding-right: var(--space-lg);
    padding-bottom: var(--space-lg);
  }
</style>
