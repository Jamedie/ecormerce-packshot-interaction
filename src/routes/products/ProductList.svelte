<script>
  import products from "$data/products.json";
</script>

<h1>Liste des produits</h1>
<ul>
  {#each products as product}
    <li>
      <a href={`/products/${product.id}`}>{product.name} - {product.price}€</a>
    </li>
  {/each}
</ul>
