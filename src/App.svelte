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

  const navigate = (path) => {
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

<!-- Simple lien de test -->
<button on:click={() => navigate("/")}>Accueil</button><button
  on:click={() => navigate("/products")}>Voir la liste des produits</button>
<button on:click={() => navigate("/products/101")}>Produit 1</button>
<button on:click={() => navigate("/404")}>404</button>
