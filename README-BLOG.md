# Guide de Gestion du Blog - Expert Menuiserie Hérault

Ce guide vous explique comment ajouter, modifier et gérer les articles de votre blog de manière simple et efficace.

## 📁 Structure des Fichiers

```
menuiserie site/
├── blog/
│   ├── index.html                        # Page principale du blog (liste des articles)
│   ├── POST-TEMPLATE.html                # Template à copier pour créer de nouveaux articles
│   ├── avantages-pergola-bioclimatique/
│   │   └── index.html                    # Article exemple 1
│   ├── entretien-pergola-guide/
│   │   └── index.html                    # Article exemple 2
│   └── idees-amenagement-pergola/
│       └── index.html                    # Article exemple 3
├── data/
│   └── blogs.json                        # Base de données des articles (métadonnées)
├── Images/
│   └── blog/
│       ├── pergola-bioclimatique.jpg     # Image article 1
│       ├── entretien-pergola.jpg         # Image article 2
│       └── amenagement-pergola.jpg       # Image article 3
└── README-BLOG.md                        # Ce fichier
```

---

## ✅ Comment Ajouter un Nouvel Article (Étape par Étape)

### Étape 1 : Préparer l'Image

1. Choisissez une image de qualité (idéalement 1200x600px minimum)
2. Renommez-la avec un nom descriptif en minuscules et tirets : `nom-de-larticle.jpg`
3. Placez l'image dans le dossier `/Images/blog/`

**Exemple :** `volets-roulants-guide.jpg`

---

### Étape 2 : Créer le Dossier de l'Article

1. Dans le dossier `/blog/`, créez un nouveau dossier avec le **slug** de l'article
   - Le slug = URL de l'article (minuscules, tirets, pas d'accents, pas d'espaces)
   - Format : `nom-de-larticle`

**Exemple :** Si votre article s'appelle "Guide des Volets Roulants 2025"
- Slug : `guide-volets-roulants-2025`
- Créer le dossier : `/blog/guide-volets-roulants-2025/`

---

### Étape 3 : Copier et Personnaliser le Template

1. **Copiez** le fichier `/blog/POST-TEMPLATE.html`
2. **Collez-le** dans votre nouveau dossier : `/blog/guide-volets-roulants-2025/`
3. **Renommez-le** en `index.html`

Vous avez maintenant : `/blog/guide-volets-roulants-2025/index.html`

---

### Étape 4 : Modifier le Contenu HTML

Ouvrez le fichier `index.html` dans votre éditeur de texte préféré (Notepad++, VS Code, Sublime Text, etc.).

#### 🔍 Recherchez et remplacez les placeholders suivants :

**Dans la section `<head>` (lignes 1-60) :**

| Placeholder | À remplacer par |
|------------|-----------------|
| `[TITRE DU POST]` | Titre complet de votre article |
| `[META DESCRIPTION - 150-160 caractères]` | Description courte pour Google (150-160 caractères) |
| `[MOT-CLÉ 1], [MOT-CLÉ 2], [MOT-CLÉ 3]` | Mots-clés séparés par des virgules |
| `[NOM-IMAGE].jpg` | Nom exact de votre image (ex: `volets-roulants-guide.jpg`) |
| `[SLUG-DU-POST]` | Slug de l'article (ex: `guide-volets-roulants-2025`) |
| `[DATE AU FORMAT: 2025-01-15]` | Date de publication au format AAAA-MM-JJ |

**Dans le corps de la page (lignes 200-300) :**

| Placeholder | À remplacer par |
|------------|-----------------|
| `[TITRE DU POST]` | Titre complet de votre article |
| `[NOM-IMAGE].jpg` | Nom exact de votre image |
| `[CATÉGORIE 1]`, `[CATÉGORIE 2]` | Catégories de l'article (voir liste ci-dessous) |
| `[SLUG-DU-POST-ACTUEL]` | Slug de votre article (pour les articles similaires) |
| `[TITRE-URL-ENCODE]` | Titre encodé pour le partage email (remplacer espaces par %20) |

**Dans la section contenu (lignes 350-500) :**

Remplacez tout le contenu entre `<div class="blog-post-content">` et `</div>` par votre article.

#### 📝 Structure HTML du Contenu

Utilisez les balises suivantes pour structurer votre article :

```html
<!-- Paragraphe -->
<p>Votre texte ici...</p>

<!-- Titre principal (H2) -->
<h2>Titre de Section</h2>

<!-- Sous-titre (H3) -->
<h3>Sous-Titre</h3>

<!-- Texte en gras -->
<strong>Texte important</strong>

<!-- Texte en italique -->
<em>Texte en italique</em>

<!-- Liste à puces -->
<ul>
    <li><strong>Point 1 :</strong> Description</li>
    <li><strong>Point 2 :</strong> Description</li>
    <li><strong>Point 3 :</strong> Description</li>
</ul>

<!-- Liste numérotée -->
<ol>
    <li>Première étape</li>
    <li>Deuxième étape</li>
    <li>Troisième étape</li>
</ol>

<!-- Image dans le contenu (optionnel) -->
<img src="../../Images/blog/nom-image.jpg" alt="Description de l'image" loading="lazy">
```

---

### Étape 5 : Ajouter l'Article à blogs.json

Ouvrez le fichier `/data/blogs.json` dans votre éditeur de texte.

#### Ajoutez une nouvelle entrée dans le tableau `posts` :

```json
{
  "posts": [
    {
      "slug": "guide-volets-roulants-2025",
      "title": "Guide des Volets Roulants 2025",
      "author": "Expert Menuiserie Hérault",
      "image": "volets-roulants-guide.jpg",
      "excerpt": "Découvrez notre guide complet sur les volets roulants en 2025 : types, avantages, installation et entretien.",
      "contentPreview": "Les volets roulants sont devenus incontournables dans les maisons modernes...",
      "categories": ["Volets", "Conseils"],
      "metaDescription": "Guide complet des volets roulants 2025 : types, avantages, installation, entretien. Conseils d'experts pour choisir vos volets.",
      "metaKeywords": "volets roulants, guide volets, installation volets, volets électriques, volets manuels"
    },
    // ... autres articles existants
  ]
}
```

#### 📋 Explication des Champs JSON

| Champ | Description | Exemple |
|-------|-------------|---------|
| `slug` | URL de l'article (doit correspondre au nom du dossier) | `"guide-volets-roulants-2025"` |
| `title` | Titre complet de l'article | `"Guide des Volets Roulants 2025"` |
| `author` | Auteur (toujours le même) | `"Expert Menuiserie Hérault"` |
| `image` | Nom du fichier image (dans `/Images/blog/`) | `"volets-roulants-guide.jpg"` |
| `excerpt` | Résumé court (150-200 caractères) pour la page listing | `"Découvrez notre guide complet..."` |
| `contentPreview` | Extrait du contenu (80-100 caractères) pour articles similaires | `"Les volets roulants sont..."` |
| `categories` | Tableau des catégories (voir liste ci-dessous) | `["Volets", "Conseils"]` |
| `metaDescription` | Description pour les moteurs de recherche | `"Guide complet des volets..."` |
| `metaKeywords` | Mots-clés pour SEO (séparés par virgules) | `"volets roulants, guide volets..."` |

**⚠️ Important :** Respectez bien la syntaxe JSON (guillemets, virgules, crochets).

---

### Étape 6 : Tester Votre Article

1. Ouvrez le fichier `/blog/index.html` dans votre navigateur
2. Vérifiez que votre nouvel article apparaît dans la liste
3. Cliquez sur l'article pour le visualiser
4. Vérifiez :
   - ✅ L'image s'affiche correctement
   - ✅ Le titre est correct
   - ✅ Les catégories apparaissent
   - ✅ Le contenu est bien formaté
   - ✅ Les articles similaires s'affichent en bas
   - ✅ Le bouton "Contactez-nous" fonctionne
   - ✅ Le bouton "Retour au blog" fonctionne

---

## 📂 Catégories Disponibles

Utilisez ces catégories dans `blogs.json` (vous pouvez en créer de nouvelles si besoin) :

- `"Fenêtres"`
- `"Portes"`
- `"Volets"`
- `"Portails"`
- `"Aménagements Extérieurs"`
- `"Aménagements Intérieurs"`
- `"Conseils"`
- `"Entretien"`
- `"Inspiration"`
- `"Guides"`

---

## 🔧 Comment Modifier un Article Existant

### Modifier le Contenu

1. Ouvrez le fichier HTML de l'article : `/blog/[slug-article]/index.html`
2. Modifiez le contenu entre les balises `<div class="blog-post-content">` et `</div>`
3. Enregistrez et rafraîchissez votre navigateur

### Modifier les Métadonnées

1. Ouvrez `/data/blogs.json`
2. Trouvez l'article par son `slug`
3. Modifiez les champs souhaités (`title`, `excerpt`, `categories`, etc.)
4. Enregistrez le fichier
5. Rafraîchissez `/blog/index.html` pour voir les changements

---

## 🗑️ Comment Supprimer un Article

1. **Supprimez le dossier** de l'article dans `/blog/[slug-article]/`
2. **Ouvrez** `/data/blogs.json`
3. **Supprimez** l'entrée JSON correspondante
4. **Supprimez** l'image associée dans `/Images/blog/` (optionnel)

---

## 🎨 Personnalisation Avancée

### Ajouter une Image dans le Contenu

```html
<img src="../../Images/blog/mon-image.jpg" alt="Description" loading="lazy">
```

### Ajouter une Citation

```html
<blockquote>
    <p>Votre citation ici...</p>
</blockquote>
```

### Ajouter un Lien

```html
<a href="../../services/fenetres-sur-mesure-herault/">Nos services fenêtres</a>
```

---

## ❓ Résolution de Problèmes

### L'article n'apparaît pas dans la liste

- ✅ Vérifiez que vous avez bien ajouté l'entrée dans `/data/blogs.json`
- ✅ Vérifiez la syntaxe JSON (virgules, guillemets)
- ✅ Rafraîchissez la page avec Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac)

### L'image ne s'affiche pas

- ✅ Vérifiez que l'image existe dans `/Images/blog/`
- ✅ Vérifiez que le nom dans `blogs.json` correspond exactement au nom du fichier
- ✅ Vérifiez l'extension (.jpg, .png, .jpeg)

### Les articles similaires ne s'affichent pas

- ✅ Vérifiez que `currentPostSlug` dans le JavaScript correspond au slug de l'article
- ✅ Vérifiez qu'il y a au moins 2 autres articles dans `blogs.json`

### Le fichier JSON provoque une erreur

- ✅ Utilisez un validateur JSON en ligne : https://jsonlint.com/
- ✅ Vérifiez que chaque objet se termine par une virgule (sauf le dernier)
- ✅ Vérifiez que tous les guillemets sont bien fermés

---

## 📊 Référencement (SEO)

Pour optimiser le référencement de vos articles :

1. **Titre :** 50-60 caractères, incluez un mot-clé principal
2. **Meta Description :** 150-160 caractères, attractive et informative
3. **Mots-clés :** 5-10 mots-clés pertinents séparés par des virgules
4. **Contenu :** Minimum 500 mots, structuré avec H2 et H3
5. **Image :** Nommée avec des mots-clés (ex: `installation-fenetre-pvc.jpg`)
6. **Liens internes :** Ajoutez des liens vers vos pages de services

---

## 🆘 Besoin d'Aide ?

Si vous rencontrez des difficultés :

1. Relisez attentivement ce guide
2. Vérifiez les fichiers exemples existants pour référence
3. Contactez votre développeur web pour assistance technique

---

## 📝 Checklist : Ajouter un Article

- [ ] Image préparée et placée dans `/Images/blog/`
- [ ] Dossier créé dans `/blog/[slug-article]/`
- [ ] `POST-TEMPLATE.html` copié et renommé en `index.html`
- [ ] Tous les placeholders remplacés dans le HTML
- [ ] Contenu rédigé avec structure HTML correcte
- [ ] Entrée ajoutée dans `/data/blogs.json`
- [ ] Article visible sur `/blog/index.html`
- [ ] Article accessible en cliquant dessus
- [ ] Image, titre et catégories corrects
- [ ] Articles similaires affichés en bas
- [ ] Boutons "Contactez-nous" et "Retour au blog" fonctionnels
- [ ] Partage social fonctionnel

---

**Félicitations ! Vous êtes maintenant autonome pour gérer votre blog !** 🎉
