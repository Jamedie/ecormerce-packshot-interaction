<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let isVisible = false;

  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 1000);
  });
</script>

<header class="main-header">
  <div class="header-content">
    <div class="header-promo">20% Discount on your first order</div>
    <nav class="header-nav">
      <a href="#">Sign up to Newsletter</a>
      <a href="#" class="btn-buy-now">Buy Now</a>
    </nav>
  </div>
</header>

<style>
  .main-header {
    position: fixed;
    height: var(--header-height);
    width: 100%;
    z-index: 1000;
    background-color: var(--color-dark);
    color: var(--color-light);
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    box-shadow: 0 2px 4px var(--color-shadow);
  }

  .header-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-promo {
    font-size: 14px;
    font-weight: bold;
    color: var(--color-primary); /* Accentuation avec la couleur principale */
  }

  .header-nav a {
    color: var(--color-light);
    text-decoration: none;
    margin-left: var(--space-lg);
    font-size: 14px;
    transition: color 0.3s ease;
  }

  .header-nav a:hover {
    color: var(--color-primary); /* Moutarde en hover */
  }

  .header-nav .btn-buy-now {
    background-color: var(--color-primary);
    color: var(--color-light);
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  .header-nav .btn-buy-now:hover {
    background-color: var(--color-light);
    color: var(--color-dark);
  }
</style>
