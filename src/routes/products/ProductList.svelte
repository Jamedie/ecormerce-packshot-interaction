<script>
  import { onMount } from "svelte";
  import Header from "$components/Header.svelte";
  import Footer from "$components/Footer.svelte";
  import products from "$data/products.json";

  let visibleProducts = [];
  const productsPerPage = 8;
  let currentPage = 1;
  let isLoadingMore = false; // Pour afficher un indicateur de chargement

  const loadMoreProducts = async () => {
    isLoadingMore = true; // Affiche l'indicateur
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    visibleProducts = [...visibleProducts, ...products.slice(start, end)];
    currentPage++;
    isLoadingMore = false; // Cache l'indicateur
  };

  onMount(() => {
    loadMoreProducts();
  });
</script>

<Header />

<main>
  <div class="main-content">
    <h1>Découvrez nos meubles</h1>
    <p>
      Une collection de meubles qui ne se contente pas de meubler votre maison,<br />
      mais qui raconte une histoire, enrichit votre quotidien et, grâce à l'intelligence
      artificielle,<br /> reflète parfaitement votre personnalité unique et vos besoins.
    </p>
    <div class="cover-image-container">
      <img
        src="../assets/images/Products-Cover.webp"
        alt="Products Cover"
        class="cover-image" />
    </div>
  </div>

  <div class="products-container">
    <!-- Products Grid -->
    <section class="product-list">
      {#each visibleProducts as product}
        <a
          href={`/products/${product.id}`}
          class="product-card"
          aria-label={`Voir les détails pour ${product.title}`}>
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.price} €</p>
        </a>
      {/each}
    </section>

    <aside class="filters">
      <div class="filter-section">
        <h2>Catégories</h2>
        <ul>
          <li>
            <input type="checkbox" id="category1" />
            <label for="category1">Canapés</label>
          </li>
          <li>
            <input type="checkbox" id="category2" />
            <label for="category2">Tables</label>
          </li>
          <li>
            <input type="checkbox" id="category3" />
            <label for="category3">Chaises</label>
          </li>
          <li>
            <input type="checkbox" id="category4" />
            <label for="category4">Rangements</label>
          </li>
          <li>
            <input type="checkbox" id="category5" />
            <label for="category5">Nouveautés</label>
          </li>
        </ul>
      </div>

      <div class="filter-section">
        <h2>Prix</h2>
        <ul>
          <li>
            <input type="radio" name="price" id="price1" />
            <label for="price1">0€ - 200€</label>
          </li>
          <li>
            <input type="radio" name="price" id="price2" />
            <label for="price2">200€ - 500€</label>
          </li>
          <li>
            <input type="radio" name="price" id="price3" />
            <label for="price3">500€ - 1000€</label>
          </li>
          <li>
            <input type="radio" name="price" id="price4" />
            <label for="price4">1000€ - 2000€</label>
          </li>
          <li>
            <input type="radio" name="price" id="price5" />
            <label for="price5">2000€+</label>
          </li>
        </ul>
        <div class="price-range">
          <input type="text" placeholder="Min" />
          <span>to</span>
          <input type="text" placeholder="Max" />
        </div>
      </div>
    </aside>
  </div>

  <!-- Load More Button -->
  {#if visibleProducts.length < products.length}
    <button
      on:click={loadMoreProducts}
      class="load-more"
      disabled={isLoadingMore}>
      {#if isLoadingMore}
        <span class="spinner"></span> Chargement...
      {:else}
        Charger plus
      {/if}
    </button>
  {/if}
</main>

<Footer />

<style>
  main {
    display: flex;
    flex-direction: column;
    padding: calc(var(--header-height) + var(--space-lg)) var(--space-lg) 0;
    gap: var(--space-lg);
  }

  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80vh;
    max-height: 80vh;
    min-height: 80vh;
    text-align: center;
    gap: var(--space-sm);
    overflow: hidden;
  }

  .main-content h1 {
    font-size: 48px;
    font-weight: bold;
    margin: 0;
    color: var(--color-primary);
  }

  .main-content p {
    font-size: 18px;
    color: var(--color-primary);
    margin: 0;
  }

  .cover-image-container {
    flex-grow: 1;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-md);
    overflow: hidden;
    box-shadow: 0 4px 8px var(--color-shadow);
  }

  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .products-container {
    display: flex;
    gap: var(--space-lg);
    align-items: flex-start;
  }

  .product-list {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: var(--space-lg);
  }

  .product-card {
    background-color: var(--color-dark);
    border-radius: var(--border-radius-md);
    box-shadow: 0 4px 8px var(--color-shadow);
    text-align: center;
    padding: var(--space-sm);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    height: 300px;
  }

  .product-card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: var(--border-radius-sm);
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px var(--color-shadow);
  }

  .filters {
    width: 300px;
    max-width: 300px;
    background-color: var(--color-dark);
    padding: var(--space-md);
    border-radius: var(--border-radius-md);
    box-shadow: 0 4px 8px var(--color-shadow);
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    color: var(--color-light);

    /* Positionnement */
    position: sticky;
    top: calc(var(--header-height) + var(--space-lg));
    flex-shrink: 0;
  }

  .filter-section h2 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: var(--space-sm);
    color: var(--color-primary);
  }

  .filter-section ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .filter-section li {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    margin-bottom: var(--space-sm);
  }

  .filter-section input[type="checkbox"],
  .filter-section input[type="radio"] {
    accent-color: var(--color-primary);
    cursor: pointer;
    width: 18px;
    height: 18px;
  }

  .filter-section label {
    cursor: pointer;
    color: var(--color-light);
    font-size: 14px;
  }

  .price-range {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    margin-top: var(--space-md);
  }

  .price-range input {
    width: 60px;
    padding: 5px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    text-align: center;
    background-color: var(--color-dark);
    color: var(--color-light);
  }

  .price-range input:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 5px var(--color-primary);
  }

  .price-range span {
    font-size: 14px;
    color: var(--color-light);
  }

  /* Load More Button */
  .load-more {
    background-color: var(--color-primary);
    color: var(--color-light);
    padding: 10px 20px;
    border: none;
    border-radius: var(--border-radius-md);
    cursor: pointer;
    margin: var(--space-lg) auto 0;
    display: block;
  }

  .load-more:disabled {
    background-color: var(--color-border);
    cursor: not-allowed;
  }

  .spinner {
    border: 3px solid var(--color-light);
    border-top: 3px solid var(--color-primary);
    border-radius: 50%;
    width: 12px;
    height: 12px;
    animation: spin 0.8s linear infinite;
    display: inline-block;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
