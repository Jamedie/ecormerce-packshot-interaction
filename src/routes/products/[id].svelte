<script>
  import { onMount } from "svelte";
  import Header from "$components/Header.svelte";
  import Footer from "$components/Footer.svelte";
  let id;
  let productData = {};
  let loading = true;

  onMount(async () => {
    loading = true;
    try {
      const urlParts = window.location.pathname.split("/");
      id = urlParts[urlParts.length - 1];
      const res = await fetch("/data/products.json");
      if (!res.ok) {
        throw new Error("Erreur lors du chargement des données");
      }
      const products = await res.json();
      productData = products.find((product) => product.id === +id);

      if (!productData) {
        window.location.href = "/404";
      }
    } catch (error) {
      console.error("Product not found:", error.message);
      window.location.href = "/404";
    }
    loading = false;
  });
</script>

<Header />

<main>
  {#if loading}
    <div class="loading-container">
      <div class="loading-content">
        <img
          id="loading-spinner"
          src="/images/spinner.gif"
          alt="Chargement..." />
        <p>Chargement...</p>
      </div>
    </div>
  {:else}
    <div class="product-page">
      <div class="main-content">
        {#if productData.modelUrl}
          <model-viewer
            src={productData.modelUrl}
            alt={productData.title}
            ar
            camera-controls
            auto-rotate></model-viewer>
        {:else}
          <img
            src={productData.mainImage}
            alt={productData.title}
            class="main-image" />
        {/if}
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
                <span class="color-dot" style="background-color: #{color}"
                ></span>
              {/each}
            </div>
          </div>
        {/if}

        <button class="btn-add-to-cart">Ajouter au panier</button>

        <div class="product-meta">
          <h3>Dimensions</h3>
          <p>
            {productData.dimensions.width} x {productData.dimensions.height} x
            {productData.dimensions.depth} cm
          </p>
        </div>

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
  {/if}
</main>

<Footer />

<style>
  .product-page {
    display: flex;
    flex-direction: row;
    gap: var(--space-lg);
    padding: var(--space-lg);
    padding-bottom: 0;
    margin: auto;
  }

  .main-content {
    min-width: 70%;
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

  .product-images {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Deux colonnes */
    gap: 20px;
    justify-items: center;
    width: 100%;
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

    .main-image,
    model-viewer {
      aspect-ratio: unset; /* Supprime le ratio sur les petits écrans si nécessaire */
    }
    .product-images {
      grid-template-columns: 1fr; /* Une seule colonne sur petit écran */
    }
  }
</style>
