<script>
  export let packshot;
</script>

<div class="packshot">
  <img src={packshot.image.src} alt={packshot.image.alt} />
  <div id="pastilles-container">
    {#each packshot.pastilles as pastille}
      <div
        class="pastille-container"
        style="left: {pastille.left}px; top: {pastille.top}px;">
        <div class="pastille">+</div>
        <div class="sub-pastilles">
          <div class="sub-pastille info">ⓘ</div>
          <div class="sub-pastille price">${pastille.price}</div>
          <div class="sub-pastille cart">🛒</div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  /* CSS des pastilles */
</style>
