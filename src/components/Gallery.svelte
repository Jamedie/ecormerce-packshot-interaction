<script>
  import { onMount } from "svelte";
  import Chip from "./Chip.svelte";

  let galleryData = [];

  onMount(async () => {
    const res = await fetch("/data/gallery.json");
    galleryData = await res.json();
  });

  function handleChipClick(productId) {
    window.location.href = `/product/${productId}`;
  }
</script>

<div class="gallery">
  {#each galleryData as item}
    <div class="gallery-item">
      <img src={item.image.src} alt={item.image.alt} />
      <div class="chips-container">
        {#each item.chips as chip}
          <Chip
            left={chip.left}
            top={chip.top}
            price={chip.price}
            productId={chip.productId}
            onClick={() => handleChipClick(productId)} />
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .gallery-item {
    position: relative;
  }
  .chips-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
