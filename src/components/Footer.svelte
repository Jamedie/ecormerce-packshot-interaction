<script>
  function navigate(url) {
    window.location.href = url; // Redirection vers l'URL spécifiée
  }

  const emailTemplates = [
    {
      subject: "Bienvenue chez Wonder-Shop ! 🌟",
      message: `
      Bonjour,

      Merci de vous être inscrit à notre newsletter ! 🎉
      Chez Wonder-Shop, nous croyons que chaque maison mérite des meubles qui racontent une histoire. 

      Découvrez nos dernières collections et profitez d'offres exclusives en tant que membre de notre communauté.

      À très bientôt !

      L'équipe Wonder-Shop 🛋️
      Explorez notre univers : https://innovaition-outdoor.web.app/
    `,
    },
    {
      subject: "Votre aventure avec Wonder-Shop commence ici ! ✨",
      message: `
      Bonjour,

      Nous sommes ravis de vous compter parmi nous. 🌟

      Imaginez des meubles qui ne se contentent pas de décorer votre intérieur, mais qui enrichissent chaque moment passé chez vous. C’est notre mission : apporter confort, style et émotions dans votre quotidien.

      Restez à l'écoute pour découvrir nos nouveautés, nos inspirations et des offres créées rien que pour vous. 🌿

      Merci pour votre confiance,
      L'équipe Wonder-Shop
      Votre voyage commence ici : https://innovaition-outdoor.web.app/
    `,
    },
    {
      subject: "Vous êtes désormais un membre exclusif de Wonder-Shop ! 🏆",
      message: `
      Bonjour,

      Félicitations ! 🎉 Vous venez de rejoindre l'univers Wonder-Shop.

      En tant que membre, vous accédez à :
      - Des avant-premières sur nos nouvelles collections.
      - Des conseils exclusifs pour sublimer votre intérieur.
      - Des offres spéciales réservées à notre communauté.

      Préparez-vous à réinventer votre espace de vie avec des meubles d'exception.

      Bienvenue dans notre monde,
      L'équipe Wonder-Shop
      Découvrez l'inspiration : https://innovaition-outdoor.web.app/
    `,
    },
    {
      subject: "Breaking News : Vous êtes officiellement stylé ! 📰",
      message: `
      Bonjour,

      On a une grande nouvelle : votre boîte mail est sur le point de devenir 200% plus stylée. 🎨

      Wonder-Shop débarque avec des meubles qui ont autant de personnalité que vous. Préparez-vous à :
      - Décorer votre maison sans prise de tête.
      - Recevoir des tendances et des offres qui rendent jaloux vos voisins.

      Vous êtes prêt ? Parce que nous, on l'est !

      L'équipe Wonder-Shop (toujours prête à impressionner)
      Venez voir par vous-même : https://innovaition-outdoor.web.app/
    `,
    },
    {
      subject: "Merci de nous faire confiance 🛋️",
      message: `
      Bonjour,

      Merci d'avoir rejoint Wonder-Shop. Nous sommes impatients de partager nos meilleures idées et nos collections exclusives avec vous.

      À très bientôt,
      L'équipe Wonder-Shop
      https://innovaition-outdoor.web.app
    `,
    },
  ];

  function getRandomTemplate() {
    const randomIndex = Math.floor(Math.random() * emailTemplates.length);
    return emailTemplates[randomIndex];
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
        to: email,
        subject: getRandomTemplate().subject,
        message: getRandomTemplate().message,
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
