<script>
  import { onMount } from "svelte";

  let isVisible = false;

  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 1000);
  });
</script>

<header class="main-header">
  <div class="header-content">
    <div class="left-content">
      <a href="/">
        <h1 class="header-logo">WONDER</h1>
      </a>
      <div class="header-menu">
        <a href="/products" class="header-menu-item">Products</a>
      </div>
    </div>
    <nav class="header-nav">
      <a href="#newsletter">Sign up to Newsletter</a>
      <a href="/basket">
        <img src="assets/icons/basket-icon.svg" id="basket-icon" alt="Basket" />
      </a>
    </nav>
  </div>
</header>

<style>
  .main-header {
    position: fixed;
    height: var(--header-height);
    width: 100%;
    z-index: 1000;
    background-color: var(--color-primary);
    color: var(--color-light);
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
  }

  .header-content {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .left-content {
    height: 100%;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-grow: 1;
  }

  .header-menu {
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .header-menu-item {
    height: 100%;
    color: var(--color-light);
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 14px;
    padding: 0.5rem 1rem;
  }

  .header-menu-item:hover {
    background-color: var(--color-btn-bg-hover);
  }

  .header-logo {
    font-size: 24px;
    color: var(--color-dark);
  }

  .header-nav {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .header-nav a {
    height: 100%;
    color: var(--color-light);
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    text-decoration: none;
    font-size: 14px;
  }

  #basket-icon {
    height: 32px;
    width: 32px;
    color: var(--color-light);
  }

  .header-nav a:hover {
    background-color: var(--color-btn-bg-hover);
  }
</style>
