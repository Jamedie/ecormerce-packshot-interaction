<script>
  import { onMount } from "svelte";

  let sections = [];

  onMount(async () => {
    try {
      const res = await fetch("../data/returns.json");
      if (!res.ok)
        throw new Error("Erreur lors du chargement des données de retour.");
      sections = await res.json();
    } catch (error) {
      console.error("Erreur :", error);
    }
  });

  function toggleSection(index) {
    sections[index].open = !sections[index].open;
  }
</script>

<main class="return-policy">
  <h1>Politique de Retours</h1>
  <p>
    Nous nous engageons à vous offrir une expérience d'achat agréable. Voici
    notre politique de retours pour vous guider.
  </p>

  <div class="policy-sections">
    {#each sections as section, index}
      <div class="policy-item">
        <button class="policy-title" on:click={() => toggleSection(index)}>
          {section.title}
        </button>
        {#if section.open}
          <div class="policy-content">{section.description}</div>
        {/if}
      </div>
    {/each}
  </div>
</main>

<style>
  .return-policy {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--space-lg);
    background-color: var(--color-bg-light);
    border-radius: var(--border-radius-md);
    box-shadow: 0 4px 8px var(--color-shadow);
  }

  h1 {
    text-align: center;
    margin-bottom: var(--space-md);
    color: var(--color-primary);
  }

  p {
    margin-bottom: var(--space-lg);
    color: var(--color-dark);
  }

  .policy-sections {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .policy-item {
    background-color: var(--color-light);
    border-radius: var(--border-radius-md);
    box-shadow: 0 2px 4px var(--color-shadow);
  }

  .policy-title {
    width: 100%;
    padding: var(--space-sm);
    background-color: var(--color-primary);
    color: var(--color-light);
    border: none;
    border-radius: var(--border-radius-md);
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .policy-title:hover {
    background-color: var(--color-btn-bg-hover);
  }

  .policy-content {
    padding: var(--space-sm);
    font-size: 14px;
    color: var(--color-dark);
    background-color: var(--color-light);
    border-top: 1px solid var(--color-border);
  }
</style>
