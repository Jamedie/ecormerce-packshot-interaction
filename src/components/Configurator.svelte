<script>
  import { onMount } from "svelte";
  import WonderModelViewer from "wonder-model-viewer";

  let selectedColor = "red";
  let selectedMaterial = "leather";

  let modelViewer;

  onMount(() => {
    let container = document.querySelector(".model-viewer");
    modelViewer = new WonderModelViewer(container, {
      model: {
        src: "https://firebasestorage.googleapis.com/v0/b/jimmy-webar.appspot.com/o/ecomerce-packshot-interaction%2Fmodels%2FBackpack.glb?alt=media",
        type: "gltfModel",
      },
    });
  });

  async function handleAddToCart() {
    const response = await fetch("/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "test@example.com",
        subject: "Test Email",
        message: "This is a test email!",
      }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Succès :", result.message);
    } else {
      console.error("Erreur :", result.error, result.message);
    }
  }
</script>

<section class="configurator">
  <div class="preview">
    <div class="model-viewer"></div>
    <p>Color: {selectedColor}, Material: {selectedMaterial}</p>
  </div>
  <div class="options">
    <h2>Customize Your Shoe</h2>
    <label>
      Select Color:
      <select bind:value={selectedColor}>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
    </label>
    <label>
      Select Material:
      <select bind:value={selectedMaterial}>
        <option value="leather">Leather</option>
        <option value="textile">Textile</option>
        <option value="suede">Suede</option>
      </select>
    </label>
  </div>

  <button class="btn-add-to-cart" on:click={handleAddToCart}
    >Ajouter au panier</button>
</section>

<style>
  .configurator {
    width: 100%;
    max-width: 800px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    padding: 1rem;
  }

  .model-viewer {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .preview {
    border: 1px solid #ccc;
    padding: 1rem;
    width: 40%;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .options {
    width: 40%;
  }
</style>
