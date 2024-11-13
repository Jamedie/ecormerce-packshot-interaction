<script>
  import { onMount } from "svelte";
  import Index from "$routes/index.svelte";
  import ProductPage from "$routes/products/[id].svelte";
  import ProductList from "$routes/products/ProductList.svelte";
  import NotFound from "$routes/404.svelte";
  import Configuration from "$routes/configuration.svelte";
  import Debug from "$routes/debug.svelte";
  import Contact from "$routes/contact.svelte";
  import Faq from "$routes/faq.svelte";
  import Returns from "$routes/returns.svelte";
  import Legals from "$routes/legals.svelte";

  let currentComponent;

  // Simple table de routage
  const routes = {
    "/": Index,
    "/products/:id": ProductPage,
    "/products/list": ProductList,
    "/configuration": Configuration,
    "/contact": Contact,
    "/faq": Faq,
    "/returns": Returns,
    "/legals": Legals,
    "/debug": Debug,
  };

  const getRoute = (path) => {
    if (path === "/") return Index;
    if (path === "/products") return ProductList; // Liste des produits
    if (path.startsWith("/products/")) return ProductPage;
    if (path.startsWith("/configuration")) return Configuration;
    if (path.startsWith("/debug")) return Debug;
    if (path.startsWith("/contact")) return Contact;
    if (path.startsWith("/faq")) return Faq;
    if (path.startsWith("/returns")) return Returns;
    if (path.startsWith("/legals")) return Legals;

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
