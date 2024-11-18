<script>
  let imageDimensions = { width: 0, height: 0 };
  function onImageLoad(event) {
    const img = event.target;
    imageDimensions = {
      width: img.naturalWidth,
      height: img.naturalHeight,
    };
  }
  function getClickPosition(event) {
    const image = event.target;
    const rect = image.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickXPercent =
      (((x / rect.width) * imageDimensions.width) / imageDimensions.width) *
      100;
    const clickYPercent =
      (((y / rect.height) * imageDimensions.height) / imageDimensions.height) *
      100;

    console.log(
      `Position relative à l'image ( ${clickXPercent} , ${clickYPercent} )`
    );
  }
</script>

<main>
  <button
    class="image-button"
    on:click={getClickPosition}
    aria-label="Cliquez sur l'image">
    <img
      src="https://firebasestorage.googleapis.com/v0/b/jimmy-webar.appspot.com/o/ecomerce-packshot-interaction%2Fimages%2FNouveauxHorizons_Zone05.jpg?alt=media"
      alt="Packshot"
      on:load={onImageLoad} />
  </button>
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

  img {
    max-width: 100%;
    max-height: 100dvh;
    object-fit: contain;
    border-radius: var(--border-radius-md);
  }
</style>
