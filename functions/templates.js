// Newsletter welcome emails. Kept server-side so clients cannot choose
// the content of emails sent from our Gmail account.
const SITE_URL = "https://innovaition-outdoor.web.app/";

module.exports = [
  {
    subject: "Bienvenue chez Wonder-Shop ! 🌟",
    message: `Bonjour,

Merci de vous être inscrit à notre newsletter ! 🎉
Chez Wonder-Shop, nous croyons que chaque maison mérite des meubles qui racontent une histoire.

Découvrez nos dernières collections et profitez d'offres exclusives en tant que membre de notre communauté.

À très bientôt !

L'équipe Wonder-Shop 🛋️
Explorez notre univers : ${SITE_URL}`,
  },
  {
    subject: "Votre aventure avec Wonder-Shop commence ici ! ✨",
    message: `Bonjour,

Nous sommes ravis de vous compter parmi nous. 🌟

Imaginez des meubles qui ne se contentent pas de décorer votre intérieur, mais qui enrichissent chaque moment passé chez vous. C’est notre mission : apporter confort, style et émotions dans votre quotidien.

Restez à l'écoute pour découvrir nos nouveautés, nos inspirations et des offres créées rien que pour vous. 🌿

Merci pour votre confiance,
L'équipe Wonder-Shop
Votre voyage commence ici : ${SITE_URL}`,
  },
  {
    subject: "Vous êtes désormais un membre exclusif de Wonder-Shop ! 🏆",
    message: `Bonjour,

Félicitations ! 🎉 Vous venez de rejoindre l'univers Wonder-Shop.

En tant que membre, vous accédez à :
- Des avant-premières sur nos nouvelles collections.
- Des conseils exclusifs pour sublimer votre intérieur.
- Des offres spéciales réservées à notre communauté.

Préparez-vous à réinventer votre espace de vie avec des meubles d'exception.

Bienvenue dans notre monde,
L'équipe Wonder-Shop
Découvrez l'inspiration : ${SITE_URL}`,
  },
  {
    subject: "Breaking News : Vous êtes officiellement stylé ! 📰",
    message: `Bonjour,

On a une grande nouvelle : votre boîte mail est sur le point de devenir 200% plus stylée. 🎨

Wonder-Shop débarque avec des meubles qui ont autant de personnalité que vous. Préparez-vous à :
- Décorer votre maison sans prise de tête.
- Recevoir des tendances et des offres qui rendent jaloux vos voisins.

Vous êtes prêt ? Parce que nous, on l'est !

L'équipe Wonder-Shop (toujours prête à impressionner)
Venez voir par vous-même : ${SITE_URL}`,
  },
  {
    subject: "Merci de nous faire confiance 🛋️",
    message: `Bonjour,

Merci d'avoir rejoint Wonder-Shop. Nous sommes impatients de partager nos meilleures idées et nos collections exclusives avec vous.

À très bientôt,
L'équipe Wonder-Shop
${SITE_URL}`,
  },
];
