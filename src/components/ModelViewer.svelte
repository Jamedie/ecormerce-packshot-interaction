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
      modelViewer = new WonderModelViewer(container, {
        model: {
          src: modelData,
          type: "gltfModel",
        },
      });

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

<div class="loading-overlay" class:hidden={!loading}>
  <p>Chargement du modèle...</p>
</div>
<div class="model-viewer"></div>

<style>
  .model-viewer {
    display: flex;
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

  .hidden {
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
</style>
