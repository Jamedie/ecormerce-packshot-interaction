<script>
  let selectedColor = "red";
  let selectedMaterial = "leather";
</script>

<section class="configurator">
  <div class="preview">
    <p>Shoe Preview (Placeholder for 3D Model)</p>
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
</section>

<style>
  .configurator {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
  }
  .preview {
    border: 1px solid #ccc;
    padding: 1rem;
    width: 40%;
  }
  .options {
    width: 40%;
  }
</style>
