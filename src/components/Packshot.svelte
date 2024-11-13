<script>
  import Chip from "./Chip.svelte";
  export let packshotData = {};

  let imageDimensions = { width: 0, height: 0 };

  function handleImageLoad(event) {
    const img = event.target;
    imageDimensions = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
  }
</script>

<div
  class="packshot"
  style="
    grid-column-end: span {packshotData.image.size}; 
    grid-row-end: span {packshotData.image.height};
  ">
  <img
    src={packshotData.image.src}
    alt={packshotData.image.alt}
    on:load={handleImageLoad} />

  <div class="chips-container">
    {#each packshotData.chips as chip}
      <Chip
        leftPercent={chip.left}
        topPercent={chip.top}
        {imageDimensions}
        price={chip.price}
        productId={chip.productId} />
    {/each}
  </div>
</div>

<style>
  .packshot {
    position: relative;
    background-color: var(--color-bg-light);
    overflow: hidden;
    border-radius: var(--border-radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .packshot img {
    width: 100%;
    height: 100%; /* Pour remplir l’espace défini par size et height */
    object-fit: cover;
    border-radius: var(--border-radius-md);
  }

  .chips-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
