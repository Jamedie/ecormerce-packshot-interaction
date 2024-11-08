<script>
  import { onMount } from "svelte";

  let id;
  let productData = {};
  let errorMessage = "";
  let loading = true;
  onMount(async () => {
    loading = true;
    try {
      const urlParts = window.location.pathname.split("/");
      id = urlParts[urlParts.length - 1];

      const res = await fetch("/data/products.json");
      if (!res.ok) throw new Error("Erreur lors du chargement des données");

      const products = await res.json();
      productData = products.find((product) => product.id === +id);

      if (!productData) {
        errorMessage = "Produit introuvable";
      }
    } catch (error) {
      errorMessage = error.message;
    }
    loading = false;
  });
</script>

{#if loading}
  <p>Chargement...</p>
{:else if errorMessage}
  <p class="error">{errorMessage}</p>
{:else}
  <!-- Page content -->
{/if}

<h1>Page Produit</h1>

{#if errorMessage}
  <p class="error">{errorMessage}</p>
{:else}
  <p>ID du produit : {id}</p>

  <div class="product">
    <h1>{productData.title}</h1>
    <p>{productData.description}</p>
    <ul>
      {#each productData.features as feature}
        <li>{feature}</li>
      {/each}
    </ul>
    <p>
      Dimensions : {productData.dimensions.width} x {productData.dimensions
        .height} x {productData.dimensions.depth}
    </p>
    <p>Disponibilité : {productData.availability}</p>
    <p>Prix : {productData.price}€</p>
  </div>
{/if}

<a href="/gallery" class="btn-back">← Retour à la galerie</a>

<style>
  .btn-back {
    display: inline-block;
    margin-bottom: 20px;
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
  }

  .btn-back:hover {
    text-decoration: underline;
  }
</style>
