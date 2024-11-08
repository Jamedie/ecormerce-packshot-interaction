<script>
  function navigate(url) {
    window.location.href = url; // Redirection vers l'URL spécifiée
  }
</script>

<footer>
  <button on:click={() => navigate("/")}>Accueil</button>
  <button on:click={() => navigate("/products")}
    >Voir la liste des produits</button>
  <button on:click={() => navigate("/products/101")}>Produit 1</button>
  <button on:click={() => navigate("/404")}>404</button>
</footer>

<style>
  footer {
    height: var(--footer-height);
    background-color: var(--color-bg-footer);
    color: var(--color-text-footer);
    display: flex;
    gap: var(--space-md);
  }
</style>
