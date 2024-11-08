<script>
  import { onMount } from "svelte";
  import Header from "$components/Header.svelte";
  import Footer from "$components/Footer.svelte";

  let id;
  let productData = {};
  let loading = true;
  let activeTab = "Description"; // Onglet par défaut

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

<Header />
<section class="product-page">
  {#if loading}
    <div class="loading-container">
      <div class="loading-content">
        <img src="../assets/icons/loading-icon.svg" alt="Chargement..." />
        <p>Chargement...</p>
      </div>
    </div>
  {:else}
    <div class="product-content">
      <!-- Image Produit -->
      <div class="product-image">
        <img src={productData.image} alt={productData.title} />
      </div>

      <!-- Informations Produit -->
      <div class="product-info">
        <h1>{productData.title}</h1>
        <p class="short-description">{productData.shortDescription}</p>
        <div class="pricing">
          <span class="current-price">{productData.price}€</span>
          {#if productData.oldPrice}
            <span class="old-price">{productData.oldPrice}€</span>
          {/if}
        </div>
        <button class="btn-buy">Buy now</button>
        <div class="delivery-info">
          <p>🚚 Expected Delivery: {productData.deliveryTime}</p>
          <p>🏠 Store pick-up: {productData.pickupTime}</p>
        </div>
      </div>
    </div>

    <!-- Onglets Produit -->
    <div class="tabs">
      <button
        on:click={() => changeTab("Description")}
        class={activeTab === "Description" ? "active" : ""}>
        Description
      </button>
      <button
        on:click={() => changeTab("Dimensions")}
        class={activeTab === "Dimensions" ? "active" : ""}>
        Dimensions
      </button>
      <button
        on:click={() => changeTab("Features")}
        class={activeTab === "Features" ? "active" : ""}>
        Features
      </button>
    </div>

    <!-- Contenu des Onglets -->
    <div class="tab-content">
      {#if activeTab === "Description"}
        <p>{productData.longDescription}</p>
      {:else if activeTab === "Dimensions"}
        <ul class="dimension-table">
          <li><span>Width:</span> {productData.dimensions.width} cm</li>
          <li><span>Height:</span> {productData.dimensions.height} cm</li>
          <li><span>Depth:</span> {productData.dimensions.depth} cm</li>
        </ul>
      {:else if activeTab === "Features"}
        <ul>
          {#each productData.features as feature}
            <li>{feature}</li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
</section>
<Footer />

<style>
  .product-page {
    width: 100%;
    height: calc((100vh - (calc(var(--header-height) + var(--footer-height)))));
    margin-top: var(--header-height);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-size: cover;
    background-position: center;
    color: #000000;
    position: relative;
    transition: background-image 0.6s ease-in-out;
    overflow: hidden;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
  }

  .loading-content {
    text-align: center;
    color: #555;
  }

  .loading-content img {
    width: 60px;
    height: 60px;
    animation: spin 1.5s linear infinite;
  }

  .loading-content p {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 500;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .product-content {
    display: flex;
    gap: 2rem;
    padding: 20px;
    max-width: 1000px;
    margin: auto;
  }

  .product-image img {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
  }

  .product-info {
    text-align: left;
    max-width: 400px;
  }

  .short-description {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .pricing {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
  }

  .current-price {
    font-size: 24px;
    font-weight: bold;
    color: #007bff;
  }

  .old-price {
    font-size: 18px;
    color: #aaa;
    text-decoration: line-through;
  }

  .btn-buy {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .btn-buy:hover {
    background-color: #0056b3;
  }

  .delivery-info p {
    margin: 5px 0;
  }

  .tabs {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    justify-content: center;
  }

  .tabs button {
    padding: 10px;
    background-color: transparent;
    border: 1px solid #ccc;
    color: #ddd;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    border-radius: 20px;
    transition: background-color 0.3s ease;
  }

  .tabs button.active {
    background-color: #007bff;
    color: white;
    border: none;
  }

  .tab-content {
    max-width: 500px;
    height: 50%;
    padding: 20px;
    margin: 0 auto;
    text-align: center;
  }

  .dimension-table {
    min-width: 250px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    list-style: none;
    margin: 0;
    text-align: left;
  }

  .dimension-table li {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    border-bottom: 1px solid #eee;
  }

  .dimension-table li:last-child {
    border-bottom: none;
  }

  .dimension-table span {
    font-weight: bold;
    color: #007bff;
  }

  @media (max-width: 768px) {
    .product-page {
      flex-direction: column;
      gap: 10px;
    }

    .tabs button {
      font-size: 14px;
    }
  }
</style>
