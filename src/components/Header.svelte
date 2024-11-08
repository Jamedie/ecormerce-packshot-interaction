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
    background-color: #000;
    color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
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
  }

  .header-nav a {
    color: #ffffff;
    text-decoration: none;
    margin-left: 20px;
    font-size: 14px;
  }

  .header-nav .btn-buy-now {
    background-color: #fff;
    color: #000;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
  }
</style>
