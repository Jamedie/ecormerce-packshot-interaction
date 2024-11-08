<script>
  export let left = 0;
  export let top = 0;
  export let imageDimensions = { width: 1, height: 1 };
  export let price = null;
  export let productId = null;

  $: leftPercent = (left / imageDimensions.width) * 100;
  $: topPercent = (top / imageDimensions.height) * 100;
</script>

<div class="chip-container" style="left: {leftPercent}%; top: {topPercent}%;">
  <button class="chip" aria-label="Main Chip">
    <img src="../assets/icons/plus-icon.svg" alt="Ajouter au panier" />
  </button>
  <div class="sub-chips">
    <button
      class="sub-chip cart"
      on:click={() => (window.location.href = `/products/${productId}`)}
      aria-label="Add to Cart">
      <img src="../assets/icons/cart-icon.svg" alt="Ajouter au panier" />
    </button>
    {#if price}
      <button
        class="sub-chip price"
        aria-label={`Price: ${price}€`}
        on:click={() => console.log(`Price: ${price}€`)}>
        {price}€
      </button>
    {/if}
    <button
      class="sub-chip info"
      on:click={() => (window.location.href = `/products/${productId}`)}
      aria-label="More Info">
      <img src="../assets/icons/info-icon.svg" alt="Plus d'infos" />
    </button>
  </div>
</div>

<style>
  .chip-container {
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .chip {
    font-family: sans-serif;
    font-size: 24px;
    background-color: #ffffff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
      transform 0.3s,
      background-color 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 2;
    border: none;
    outline: none;
  }

  .chip:hover {
    background-color: #f0f0f0;
    transform: scale(1.1);
  }

  .sub-chips {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(0%, -50%);
    width: 50px;
    height: 100px;
  }

  .sub-chip {
    position: absolute;
    font-family: sans-serif;
    background-color: #ffffff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity 0.3s,
      transform 0.3s ease;
    pointer-events: all;
    border: none;
    outline: none;
  }

  .chip-container:hover .sub-chip {
    opacity: 1;
    transform: scale(1);
  }

  .sub-chip.info {
    top: 70px;
    left: 5px;
  }

  .sub-chip.price {
    top: 30px;
    left: 20px;
  }

  .sub-chip.cart {
    top: -10px;
    left: 5px;
  }

  .sub-chip:hover {
    background-color: #e0e0e0;
  }
</style>
