<script>
  import { onMount } from "svelte";
  import Index from "$routes/index.svelte";
  import ProductPage from "$routes/products/[id].svelte";
  import ProductList from "$routes/products/ProductList.svelte";
  import NotFound from "$routes/404.svelte";
  import Configuration from "$routes/configuration.svelte";
  import Contact from "$routes/contact.svelte";
  import Faq from "$routes/faq.svelte";
  import Returns from "$routes/returns.svelte";
  import Legals from "$routes/legals.svelte";
  import DebugImage from "$routes/debug-image.svelte";
  import DebugModel from "$routes/debug-model.svelte";

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
    "/debug-image": DebugImage,
    "/debug-model": DebugModel,
  };

  const getRoute = (path) => {
    if (path === "/") return Index;
    if (path === "/products") return ProductList; // Liste des produits
    if (path.startsWith("/products/")) return ProductPage;
    if (path.startsWith("/configuration")) return Configuration;
    if (path.startsWith("/debug-image")) return DebugImage;
    if (path.startsWith("/contact")) return Contact;
    if (path.startsWith("/faq")) return Faq;
    if (path.startsWith("/returns")) return Returns;
    if (path.startsWith("/legals")) return Legals;
    if (path.startsWith("/debug-model")) return DebugModel;

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
