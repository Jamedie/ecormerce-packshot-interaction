<script>
  import { onMount } from "svelte";
  import Index from "$routes/index.svelte";
  import ProductPage from "$routes/products/[id].svelte";
  import ProductList from "$routes/products/ProductList.svelte";
  import NotFound from "$routes/404.svelte";

  let currentComponent;

  // Simple table de routage
  const routes = {
    "/": Index,
    "/products/:id": ProductPage,
    "/products/list": ProductList,
  };

  const getRoute = (path) => {
    if (path === "/") return Index;
    if (path === "/products") return ProductList; // Liste des produits
    if (path.startsWith("/products/")) return ProductPage;
    return NotFound;
  };

  export const navigate = (path) => {
    currentComponent = getRoute(path);
    history.pushState({}, "", path);
  };

  // Initialisation au montage
  onMount(() => {
    currentComponent = getRoute(location.pathname);
    window.addEventListener("popstate", () => {
      currentComponent = getRoute(location.pathname);
    });
  });
</script>

<!-- Affichage de la route courante -->
<svelte:component this={currentComponent} />
