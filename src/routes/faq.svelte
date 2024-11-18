<script>
  import { onMount } from "svelte";
  import faqs from "$data/faqs.json";

  onMount(async () => {});

  function toggleFaq(index) {
    faqs[index].open = !faqs[index].open;
  }
</script>

<main class="faq-page">
  <h1>FAQ - Questions Fréquemment Posées</h1>
  <div class="faq-container">
    {#each faqs as faq, index}
      <div class="faq-item">
        <button class="faq-question" on:click={() => toggleFaq(index)}>
          {faq.question}
        </button>
        {#if faq.open}
          <div class="faq-answer">{faq.answer}</div>
        {/if}
      </div>
    {/each}
  </div>
</main>

<style>
  .faq-page {
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

  .faq-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .faq-item {
    background-color: var(--color-light);
    border-radius: var(--border-radius-md);
    box-shadow: 0 2px 4px var(--color-shadow);
  }

  .faq-question {
    width: 100%;
    padding: var(--space-sm);
    background-color: var(--color-primary);
    color: var(--color-light);
    border: none;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .faq-question:hover {
    background-color: var(--color-primary-dark);
  }

  .faq-answer {
    padding: var(--space-sm);
    font-size: 14px;
    color: var(--color-dark);
    background-color: var(--color-light);
    border-top: 1px solid var(--color-border);
  }
</style>
