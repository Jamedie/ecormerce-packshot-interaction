<script>
  function navigate(url) {
    window.location.href = url; // Redirection vers l'URL spécifiée
  }

  let email = "";
  let errorMessage = "";
  let successMessage = "";

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email) {
      errorMessage = "Veuillez remplir l'adresse e-mail.";
      return;
    }

    window.umami.track("subscribe newsletter", {
      email: email,
    });

    const response = await fetch("/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const result = await response.json();

    // Envoi de l'email
    const form = document.getElementById("newsletter-form");
    form.reset();
  }
</script>

<footer>
  <div class="footer-brand">
    <h4>Wonder-Shop</h4>
    <p class="about-description">
      Wonder-Shop révolutionne l’e-commerce grâce à l’intelligence artificielle.<br />
      Nos algorithmes sélectionnent des produits alliant style, innovation et durabilité,<br />
      pour une expérience d’achat personnalisée et unique.<br /> Laissez l’IA sublimer
      votre quotidien avec des articles parfaitement adaptés à vos besoins et à votre
      style.
    </p>
  </div>

  <div class="footer-links-section">
    <div class="support">
      <h4>Support</h4>
      <ul>
        <li><a href="/contact">Contactez notre IA</a></li>
        <li><a href="/faq">FAQs</a></li>
        <li><a href="/returns">Expédition et retours</a></li>
        <li><a href="/legals">Mention legales</a></li>
      </ul>
    </div>

    <div id="newsletter">
      <h4>Restez informé</h4>
      <p>
        Abonnez-vous à notre newsletter<br /> et laissez l’intelligence artificielle
        dénicher pour vous les tendances de demain.
      </p>
      <p>Un clic suffit pour rejoindre la révolution Wonder-Shop !</p>
      <form id="newsletter-form">
        <input type="email" placeholder="Adresse e-mail" bind:value={email} />
        <button type="submit" id="newsletter-submit" on:click={handleSubmit}>
          S'abonner</button>
      </form>
      {#if errorMessage}
        <p class="error-message">{errorMessage}</p>
      {/if}
      {#if successMessage}
        <p class="success-message">{successMessage}</p>
      {/if}
    </div>
  </div>
</footer>

<style>
  footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: var(--space-xl);
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    min-width: 200px;
    max-width: 30%;
    gap: var(--space-xs);
  }

  footer h4 {
    font-size: 18px;
    font-weight: bold;
    color: var(--color-primary);
  }

  .footer-links-section {
    display: flex;
    gap: var(--space-lg);
  }

  .support {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  #newsletter {
    min-width: 400px;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .footer-links-section ul li a {
    color: var(--color-light);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-links-section ul li a:hover {
    color: var(--color-primary);
  }

  .footer-links-section form {
    display: flex;
    gap: var(--space-sm);
    justify-content: flex-end; /* Aligne le formulaire à droite */
  }

  .footer-links-section input[type="email"] {
    width: 100%;
    padding: 8px;
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-light);
    background-color: var(--color-dark);
    color: var(--color-light);
  }

  .footer-links-section button {
    background-color: var(--color-btn-bg);
    color: var(--color-light);
    padding: 10px 15px;
    border: 2px solid transparent; /* Bordure transparente par défaut */
    border-radius: var(--border-radius-md);
    cursor: pointer;
    font-weight: bold;
    text-align: center;
    transition:
      background-color 0.3s ease,
      border 0.3s ease;
  }

  .footer-links-section button:hover {
    background-color: var(--color-primary-dark);
    border: 2px solid var(--color-btn-bg); /* Ajoute une bordure blanche au survol */
  }

  .support ul {
    display: flex;
    flex-direction: column; /* Mise en colonne */
    gap: var(--space-sm);
  }

  .error-message {
    color: var(--color-error);
    font-weight: bold;
  }

  .success-message {
    color: var(--color-success);
    font-weight: bold;
  }

  @media (max-width: 768px) {
    footer {
      flex-direction: column;
      gap: var(--space-md);
    }

    .footer-links-section {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-lg);
    }
  }
</style>
