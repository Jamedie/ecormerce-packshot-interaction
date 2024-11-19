<script>
  import { onMount } from "svelte";
  import Header from "$components/Header.svelte";
  import Footer from "$components/Footer.svelte";
  import ModelViewer from "$components/ModelViewer.svelte";
  import products from "$data/products.json";

  let id;
  let productData = {};

  onMount(() => {
    try {
      const urlParts = window.location.pathname.split("/");
      id = urlParts[urlParts.length - 1];
      productData = products.find((products) => products.id === +id);

      if (!productData) {
        window.location.href = "/404";
      }
    } catch (error) {
      console.error("Product not found:", error.message);
    }
  });
</script>

<Header />

<main>
  <div class="breadcrumbs">
    <a href="/">Accueil</a>
    <span>&nbsp;&nbsp;>&nbsp;&nbsp;</span>
    <a href="/products">Produits</a>
    <span>&nbsp;&nbsp;>&nbsp;&nbsp;</span>
    <span>{productData.title}</span>
  </div>

  <div class="product-page">
    <div class="main-content">
      <!-- Main Model or Image Viewer -->
      {#if productData.modelUrl}
        <div class="model-viewer-container">
          <ModelViewer modelData={productData.modelUrl} />
        </div>
      {:else}
        <div class="main-image-container">
          <img
            src={productData.mainImage}
            alt={productData.title}
            class="main-image" />
        </div>
      {/if}

      <!-- Progressive image loading for gallery -->
      <div class="product-images">
        {#each productData.images as image}
          <img src={image} alt={productData.title} class="product-image" />
        {/each}
      </div>
    </div>

    <div class="sidebar">
      <h2>{productData.title}</h2>
      <p class="product-description">{productData.shortDescription}</p>
      <div class="product-price">
        <span class="product-price-value">{productData.price}</span>
        <span class="product-price-currency">€</span>
      </div>

      {#if productData.colors}
        <div class="color-options">
          <p><strong>Couleur</strong></p>
          <div class="color-dots">
            {#each productData.colors as color}
              <span class="color-dot" style="background-color: #{color}"></span>
            {/each}
          </div>
        </div>
      {/if}

      <button class="btn-add-to-cart">Ajouter au panier</button>

      {#if productData.dimensions}
        <div class="product-meta">
          <h3>Dimensions</h3>
          <p>
            {productData.dimensions.width} x {productData.dimensions.height} x
            {productData.dimensions.depth} cm
          </p>
        </div>
      {/if}

      {#if productData.deliveryInfo}
        <div class="delivery-info">
          <h3>Livraison</h3>
          <p>{productData.deliveryInfo}</p>
        </div>
      {/if}

      {#if productData.features}
        <div class="product-features">
          <h3>Détails du produit</h3>
          <p>{productData.features}</p>
        </div>
      {/if}
    </div>
  </div>
</main>

<Footer />

<style>
  main {
    display: flex;
    flex-direction: column;
    padding: calc(var(--header-height) + var(--space-lg)) var(--space-lg) 0
      var(--space-lg);
    gap: var(--space-lg);
  }

  .product-page {
    display: flex;
    gap: var(--space-lg);
    margin: auto;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: 14px;
    color: var(--color-light);
  }

  .main-content {
    width: 70%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: var(--space-lg);
  }

  .main-image {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: var(--border-radius-md);
    box-shadow: 0 4px 8px var(--color-shadow);
    max-height: 70dvh;
  }

  .model-viewer-container,
  .main-image-container {
    position: relative;
    width: 100%;
    height: 80dvh;
    border-radius: var(--border-radius-md);
    box-shadow: 0 4px 8px var(--color-shadow);
    overflow: hidden;
    background-color: var(--color-light);
  }

  .product-images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-sm);
  }

  .product-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: var(--border-radius-md);
    box-shadow: 0 2px 6px var(--color-shadow);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .sidebar {
    border-radius: var(--border-radius-md);
    max-width: 30%;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);

    position: sticky; /* Reste visible */
    top: calc(var(--header-height) + var(--space-md));
    align-self: flex-start;
    background-color: var(--color-bg);
  }

  .sidebar h2 {
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    color: var(--color-light);
    padding-bottom: 20px;
    border-bottom: 1px solid var(--color-primary);
  }

  .product-description {
    font-size: 16px;
    color: var(--color-light);
    line-height: 1.5;
  }

  .product-price {
    font-size: 28px;
    font-weight: bold;
    color: var(--color-primary);
    display: flex;
    align-items: baseline;
    gap: 5px;
  }

  .btn-add-to-cart {
    background-color: var(--color-primary);
    color: var(--color-light);
    padding: 10px 15px;
    border: 2px solid transparent; /* Bordure transparente par défaut */
    border-radius: var(--border-radius-md);
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    transition:
      background-color 0.3s ease,
      border 0.3s ease;
  }

  .btn-add-to-cart:hover {
    background-color: var(--color-primary-dark);
    border: 2px solid var(--color-primary); /* Ajoute une bordure blanche au survol */
  }

  .color-dots {
    display: flex;
    gap: 10px; /* Espacement entre chaque pastille */
    margin-top: 5px;
  }

  .color-dot {
    width: 24px; /* Augmentez ou ajustez la taille si nécessaire */
    height: 24px;
    border-radius: 50%; /* Forme ronde */
    border: 2px solid var(--color-light); /* Bordure visible sur fond foncé */
    background-color: transparent; /* Assurez-vous qu'une couleur de fond est appliquée */
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .color-dot:hover {
    transform: scale(1.2); /* Zoom sur survol */
    border-color: var(
      --color-primary
    ); /* Changement de couleur de bordure au survol */
  }

  .product-meta {
    font-size: 14px;
    color: var(--color-dark);
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .product-page {
      flex-direction: column;
    }

    .main-content,
    .sidebar {
      width: 100%;
    }

    .btn-add-to-cart {
      width: 100%;
    }

    .main-image {
      aspect-ratio: unset; /* Supprime le ratio sur les petits écrans si nécessaire */
    }

    .product-images {
      grid-template-columns: 1fr; /* Une seule colonne sur petit écran */
    }
  }
</style>
