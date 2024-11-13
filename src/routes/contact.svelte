<script>
  let name = "";
  let email = "";
  let message = "";
  let successMessage = "";
  let errorMessage = "";

  function handleSubmit(event) {
    event.preventDefault();

    if (!name || !email || !message) {
      errorMessage = "Veuillez remplir tous les champs.";
      return;
    }

    successMessage =
      "Merci pour votre message ! Nous vous répondrons sous peu.";
    errorMessage = "";

    // Remise à zéro des champs après soumission
    name = "";
    email = "";
    message = "";
  }
</script>

<main class="contact-page">
  <h1>Contactez-nous</h1>
  <p>
    Vous avez une question ou souhaitez en savoir plus sur nos services ?
    Remplissez le formulaire ci-dessous.
  </p>

  <form on:submit={handleSubmit}>
    <div class="form-group">
      <label for="name">Nom</label>
      <input type="text" id="name" bind:value={name} placeholder="Votre nom" />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        placeholder="Votre adresse email" />
    </div>

    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" bind:value={message} placeholder="Votre message"
      ></textarea>
    </div>

    {#if errorMessage}
      <p class="error-message">{errorMessage}</p>
    {/if}

    {#if successMessage}
      <p class="success-message">{successMessage}</p>
    {/if}

    <button type="submit">Envoyer</button>
  </form>
</main>

<style>
  .contact-page {
    max-width: 600px;
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
    margin-bottom: var(--space-md);
    color: var(--color-dark);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: bold;
    margin-bottom: var(--space-xs);
    color: var(--color-dark);
  }

  input,
  textarea {
    padding: var(--space-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    font-size: 16px;
    color: var(--color-dark);
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  textarea {
    resize: vertical;
  }

  button {
    background-color: var(--color-primary);
    color: var(--color-light);
    padding: var(--space-sm) var(--space-md);
    border: none;
    border-radius: var(--border-radius-md);
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: var(--color-primary-dark);
  }

  .error-message {
    color: var(--color-error);
    font-weight: bold;
  }

  .success-message {
    color: var(--color-success);
    font-weight: bold;
  }
</style>
