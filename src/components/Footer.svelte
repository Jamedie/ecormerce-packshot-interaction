<script>
  function navigate(url) {
    window.location.href = url; // Redirection vers l'URL spécifiée
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
        <li><a href="#">Contactez-nous</a></li>
        <li><a href="#">FAQs</a></li>
        <li><a href="#">Expédition et retours</a></li>
      </ul>
    </div>

    <div id="newsletter">
      <h4>Restez informé</h4>
      <p>
        Abonnez-vous à notre newsletter<br /> et laissez l’intelligence artificielle
        dénicher pour vous les tendances de demain.
      </p>
      <p>Un clic suffit pour rejoindre la révolution Wonder-Shop !</p>
      <form>
        <input type="email" placeholder="Adresse e-mail" />
        <button type="submit">S'abonner</button>
      </form>
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
  }

  footer h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: var(--space-sm);
    color: var(--color-primary);
  }

  .footer-links-section {
    display: flex;
    gap: var(--space-lg);
  }

  .support {
    display: flex;
    flex-direction: column;
  }

  #newsletter {
    min-width: 400px;
    display: flex;
    flex-direction: column;
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
    margin-top: var(--space-md);
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
    background-color: var(--color-primary);
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
    border: 2px solid var(--color-primary); /* Ajoute une bordure blanche au survol */
  }

  .support ul {
    display: flex;
    flex-direction: column; /* Mise en colonne */
    gap: var(--space-sm);
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

    .newsletter form {
      flex-direction: column;
      gap: var(--space-sm);
    }

    .newsletter input[type="email"],
    .newsletter button {
      width: 100%;
    }
  }
</style>
