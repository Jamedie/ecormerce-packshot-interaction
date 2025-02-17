<script>
</script>

<main>
  <!-- Importez le composant -->
  <script
    type="module"
    src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>

  <!-- Utilisez-le comme n'importe quel autre élément HTML -->
  <model-viewer
    src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
    alt="Un modèle 3D d'un astronaute"
    ar
    ar-modes="scene-viewer quick-look"
    camera-controls
    touch-action="pan-y"
    style="width: 100%; height: 500px;">
  </model-viewer>
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
