<script>
  import { onMount } from "svelte";

  let id;

  onMount(() => {
    // Récupère l'ID depuis l'URL
    const urlParts = window.location.pathname.split("/");
    id = urlParts[urlParts.length - 1]; // Dernière partie de l'URL
  });
</script>

<h1>Page Produit</h1>
<p>ID du produit : {id}</p>
