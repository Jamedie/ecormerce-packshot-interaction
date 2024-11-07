<script>
  let products = [
    { id: 1, name: "Produit 1", price: 100 },
    { id: 2, name: "Produit 2", price: 200 },
    { id: 3, name: "Produit 3", price: 300 },
  ];
</script>

<h1>Liste des produits</h1>
<ul>
  {#each products as product}
    <li>
      <a href={`/products/${product.id}`}>{product.name} - {product.price}€</a>
    </li>
  {/each}
</ul>
