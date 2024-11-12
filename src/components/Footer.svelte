<script>
  function navigate(url) {
    window.location.href = url; // Redirection vers l'URL spécifiée
  }
</script>

<footer class="main-footer">
  <div class="footer-content">
    <button on:click={() => navigate("/")} class="footer-btn">Accueil</button>
    <button on:click={() => navigate("/products")} class="footer-btn">
      Voir la liste des produits
    </button>
    <button on:click={() => navigate("/products/101")} class="footer-btn">
      Produit 1
    </button>
    <button on:click={() => navigate("/404")} class="footer-btn">404</button>
  </div>
</footer>

<style>
  .main-footer {
    height: var(--footer-height);
    background-color: var(--color-dark);
    color: var(--color-light);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    box-shadow: 0 -2px 4px var(--color-shadow);
  }

  .footer-content {
    display: flex;
    gap: var(--space-lg);
  }

  .footer-btn {
    background-color: var(--color-dark);
    color: var(--color-light);
    border: 1px solid var(--color-light);
    border-radius: 5px;
    padding: 8px 15px;
    font-size: 14px;
    cursor: pointer;
    bottom: 0;
    transition:
      background-color 0.3s ease,
      color 0.3s ease,
      border-color 0.3s;
  }

  .footer-btn:hover {
    background-color: var(--color-primary); /* Jaune moutarde pour hover */
    color: var(--color-dark);
    border-color: var(--color-primary);
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: var(--space-md);
    }

    .footer-btn {
      width: 100%; /* Boutons pleins pour petits écrans */
    }
  }
</style>
