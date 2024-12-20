<script>
  import { onMount } from "svelte";
  import WonderModelViewer from "wonder-model-viewer";

  export let modelData;
  let modelViewer;
  let loading = true;

  onMount(() => {
    loading = true;

    if (modelData) {
      let container = document.querySelector(".model-viewer");
      modelViewer = new WonderModelViewer(container, modelData);

      modelViewer.addEventListener("modelInitialized", () => {
        console.log("modelInitialized");
        loading = false;
      });
    }

    return () => {
      // Nettoyer l'écouteur si le composant est détruit
      document.removeEventListener("modelInitialized", () => {
        console.log("remove event");
      });
    };
  });
</script>

<div class="model-viewer-wrapper">
  <div class="loading-overlay" class:hidden={!loading}>
    <p>Chargement du modèle...</p>
  </div>
  <div class="model-viewer"></div>
</div>

<style>
  .model-viewer-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    aspect-ratio: 16/9;
    min-height: 500px;
  }
  .model-viewer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-light);
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    color: var(--color-dark);
    z-index: 2;
  }

  .annotation-Container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .hidden {
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
</style>
