<script>
  import { onMount } from "svelte";
  import Packshot from "$components/Packshot.svelte";
  import data from "$data/gallery.json";

  let packshots = [];

  onMount(() => {
    packshots = data;
  });
</script>

<section class="gallery">
  <h2 class="title">Collection</h2>
  <div id="packshots-wrapper">
    {#each packshots as packshot}
      <Packshot {packshot} />
    {/each}
  </div>
</section>

<style>
  /* Copie ton CSS de la galerie ici */
</style>
