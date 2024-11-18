<script>
  import { onMount } from "svelte";
</script>

<main>
  <model-viewer
    alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
    src="https://firebasestorage.googleapis.com/v0/b/jimmy-webar.appspot.com/o/ecomerce-packshot-interaction%2Fmodels%2FBackpack.glb?alt=media"
    ar
    camera-controls
    touch-action="pan-y"></model-viewer>
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100dvh;
    background-color: var(--color-bg-light);
  }

  model-viewer {
    max-width: 100%;
    max-height: 100dvh;
    object-fit: contain;
    border-radius: var(--border-radius-md);
  }
</style>
