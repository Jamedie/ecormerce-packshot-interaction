# E-commerce Packshot Interaction

![E-commerce Packshot Interaction](https://count.getloli.com/get/@:Ecomerce-Packshot-Ineraction?theme=asoul)

## Description des Répertoires

### /src/components

- **Hero.svelte** : Section Hero avec titre, description, chevron et miniatures.
- **Gallery.svelte** : Affiche la galerie des packshots.
- **ProductCard.svelte** : Carte de produit réutilisable dans des listes.
- **ModelViewer.svelte** : Visionneuse 3D pour afficher les modèles.
- **Pastille.svelte** : Composant pour gérer les pastilles interactives sur les images.
- **Footer.svelte** : Pied de page.

### /src/routes

- **index.svelte** : Page d’accueil combinant Hero et Gallery.
- **products/[id].svelte** : Génère dynamiquement une page produit en fonction de l’ID.
- **products/ProductList.svelte** : Liste des produits avec des liens vers chaque page produit.

### /src/data

- **gallery.json** : Données pour les images de la galerie.
- **hero.json** : Données spécifiques au Hero (titre, description, pastilles).

## Structure du Projet

```
/project-root
├── /src
│   ├── /components        # Composants réutilisables
│   │   ├── Hero.svelte
│   │   ├── Gallery.svelte
│   │   ├── ProductCard.svelte
│   │   ├── ModelViewer.svelte
│   │   ├── Pastille.svelte
│   │   └── Footer.svelte
│   ├── /routes            # Pages principales et dynamiques
│   │   ├── index.svelte       # Page d'accueil (Hero + Gallery)
│   │   ├── 404.svelte         # Page d'erreur 404
│   │   ├── /products
│   │   │   ├── [id].svelte    # Pages produit dynamiques
│   │   │   └── ProductList.svelte # Liste des produits
│   ├── /assets            # Images, polices, etc.
│   ├── /data              # Fichiers JSON pour les données
│   │   ├── gallery.json
│   │   └── hero.json
│   ├── main.js            # Point d'entrée de l'application
├── /public                # Fichiers accessibles directement
├── App.svelte             # Composant racine
├── vite.config.js         # Configuration Vite
└── package.json           # Dépendances et scripts
```

## Exemples d'Utilisation

### Utilisation de `Hero.svelte`

```svelte
<script>
  import Hero from "$components/Hero.svelte";
</script>

<Hero />
```

### Utilisation de Gallery.svelte

```svelte
<script>
  import Gallery from "$components/Gallery.svelte";
  import galleryData from "$data/gallery.json";
</script>

<Gallery {galleryData} />
```

### Utilisation de ModelViewer.svelte

<script>
  import ModelViewer from "$components/ModelViewer.svelte";
  let modelUrl = "https://example.com/model.glb";
</script>

<ModelViewer {modelUrl} />
