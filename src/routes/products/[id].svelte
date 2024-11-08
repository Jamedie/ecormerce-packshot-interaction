<script>
  import { onMount } from "svelte";
  let id;
  let productData = {};
  let loading = true;
  let activeTab = "Details"; // Onglet par défaut

  onMount(async () => {
    loading = true;
    try {
      const urlParts = window.location.pathname.split("/");
      id = urlParts[urlParts.length - 1];
      const res = await fetch("/data/products.json");
      if (!res.ok) throw new Error("Erreur lors du chargement des données");
      const products = await res.json();
      productData = products.find((product) => product.id === +id);
    } catch (error) {
      console.error(error.message);
    }
    loading = false;
  });

  function changeTab(tab) {
    activeTab = tab;
  }
</script>

{#if loading}
  <div class="loading-container">
    <div class="loading-content">
      <img src="../assets/icons/loading-icon.svg" alt="Chargement..." />
      <p>Chargement...</p>
    </div>
  </div>
{:else}
  <div class="product-page">
    <!-- Images -->
    <div class="product-images">
      {#if productData.modelUrl}
        <!-- Model Viewer si un modèle 3D est disponible -->
        <model-viewer
          src={productData.modelUrl}
          alt={productData.title}
          ar
          camera-controls
          auto-rotate></model-viewer>
      {:else}
        <!-- Image principale -->
        <img
          src={productData.mainImage}
          alt={productData.title}
          class="main-image" />
      {/if}
      <!-- Autres images -->
      <div class="thumbnail-images">
        {#each productData.images as image}
          <img src={image} alt={productData.title} class="thumbnail" />
        {/each}
      </div>
    </div>

    <!-- Informations Produit -->
    <div class="product-info">
      <h1>{productData.title}</h1>
      <div class="rating">★ ★ ★ ★ ★ ({productData.reviews} reviews)</div>
      <div class="pricing">
        <span class="current-price">{productData.price} €</span>
        {#if productData.oldPrice}
          <span class="old-price">{productData.oldPrice} €</span>
        {/if}
      </div>
      <button class="btn-buy">Add to cart</button>
      <div class="color-options">
        {#each productData.colors as color}
          <span class="color-dot" style="background-color: {color}"></span>
        {/each}
      </div>
      <div class="delivery-info">
        <p>🚚 Expected Delivery: {productData.deliveryTime}</p>
        <p>🏠 Store pick-up: {productData.pickupTime}</p>
      </div>
    </div>
  </div>

  <!-- Tabs Produit -->
  <div class="tabs">
    <button
      on:click={() => changeTab("Details")}
      class={activeTab === "Details" ? "active" : ""}>Details</button>
    <button
      on:click={() => changeTab("Delivery")}
      class={activeTab === "Delivery" ? "active" : ""}>Delivery</button>
  </div>

  <!-- Contenu des Onglets -->
  <div class="tab-content">
    {#if activeTab === "Details"}
      <p>{productData.longDescription}</p>
    {:else if activeTab === "Delivery"}
      <p>Delivery details and terms go here.</p>
    {/if}
  </div>
{/if}

<style>
  .product-page {
    display: flex;
    gap: 30px;
    max-width: 1200px;
    margin: auto;
    padding: 40px 20px;
  }
  .product-images {
    flex: 1;
  }
  .main-image,
  model-viewer {
    width: 100%;
    max-width: 600px;
    border-radius: 8px;
  }
  .thumbnail-images {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  .thumbnail {
    width: 80px;
    border-radius: 8px;
    cursor: pointer;
  }
  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .product-info h1 {
    font-size: 28px;
    font-weight: bold;
  }
  .rating {
    margin: 10px 0;
    color: #f39c12;
  }
  .pricing {
    display: flex;
    gap: 10px;
    font-size: 22px;
  }
  .current-price {
    font-weight: bold;
    color: #3498db;
  }
  .old-price {
    color: #999;
    text-decoration: line-through;
  }
  .btn-buy {
    margin-top: 15px;
    background-color: #3498db;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  .color-options {
    display: flex;
    gap: 5px;
    margin: 15px 0;
  }
  .color-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #ddd;
  }
  .tabs {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
  }
  .tabs button {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  .tabs button.active {
    border-bottom: 2px solid #3498db;
  }
  .tab-content {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
</style>
