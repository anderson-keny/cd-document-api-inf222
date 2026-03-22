Blog API – Projet INF222

Auteur : ASSOUMOU YENE LAURENT KEVIN
Matricule:24G2332
Supperviseur:DR CHARLES DJIOSSEU
UNIVERSITE DE YAOUNDE 1
UE : INF222 – Développement Backend et api
Date : Mars 2026



PRESENTATION RAPIDE

Dans le cadre du TAF 1, j’ai développé une API backend pour gérer les articles d’un blog.
L’objectif était de créer une API REST complète avec Node.js, Express et SQLite, en respectant les bonnes pratiques (validation, codes HTTP, séparation des couches).

J’ai essayé d’avoir une structure propre pour que ce soit facile à comprendre et à faire évoluer plus tard.


Ce que fait l’API

Voici les fonctionnalités que j’ai implémentées :

· Créer un article (titre, contenu, auteur, catégorie, tags)
· Récupérer tous les articles (avec filtres possibles : catégorie, auteur, date)
· Récupérer un article par son ID
· Rechercher des articles par mot-clé (dans le titre ou le contenu)
· Modifier un article
· Supprimer un article

Tous les endpoints sont documentés et accessibles via l’URL de base.

TECHNOLOGIES UTILISEES

J’ai utilisé ce qu’on a vu en cours et ce qui est recommandé dans le sujet :

· Node.js (version 24 LTS)
· Express pour gérer les routes et les requêtes
· SQLite comme base de données (simple, pas besoin de serveur)
· CORS pour autoriser les requêtes depuis d’autres domaines
· Dotenv pour gérer le port et les variables d’environnement
· Nodemon en développement pour redémarrer automatiquement le serveur


COMMENT INSTALLER LE PROJET

C’est assez simple, j’ai fait en sorte que ça tourne facilement sur Ubuntu (mon OS).

```bash
# Cloner le dépôt (si tu as le lien)
git clone https://github.com/mon-compte/blog-api.git
cd blog-api

# Installer les dépendances
npm install

# Lancer le serveur en mode dev
npm run dev
```

Le serveur tourne sur http://localhost:3000.

Si tu veux juste tester sans installer, tu peux aussi utiliser les commandes curl que j’ai mises plus bas.

Organisation du projet

J’ai structuré le projet en couches pour que ce soit plus clair :

```
blog-api/
├── src/
│ ├── models/
│ │ └── article.js # Requêtes SQL
│ ├── controllers/
│ │ └── articleController.js # Logique métier
│ ├── routes/
│ │ └── articles.js # Définition des endpoints
│ ├── database/
│ │ └── db.js # Connexion SQLite
│ └── app.js # Configuration Express
├── server.js # Point d’entrée
├── package.json
└── README.md
```

C’est pas parfait mais ça suit le principe  que j'ai vu dans le tp.


Les ENDPOINTS

Voici les routes que j’ai codées :

Méthode Endpoint Description
POST /api/articles Créer un article
GET /api/articles Lister tous les articles (avec filtres optionnels)
GET /api/articles/search?query=... Rechercher un article
GET /api/articles/:id Récupérer un article par son ID
PUT /api/articles/:id Modifier un article
DELETE /api/articles/:id Supprimer un article

Filtres disponibles (sur GET /api/articles)

· ?categorie=Tech → articles de la catégorie Tech
· ?auteur=James → articles écrits par James
· ?date=2026-03-21 → articles publiés cette date


Exemples de tests avec curl

Je les ai tous testés avec curl et ça fonctionne bien.

Créer un article

```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Mon premier article",
    "contenu": "Je découvre le backend avec Node.js",
    "auteur": "Assoumou James",
    "categorie": "Développement",
    "tags": ["nodejs", "api", "blog"]
  }'
```

Réponse :

```json
{
  "message": "Article créé",
  "id": 1
}
```

Récupérer tous les articles

```bash
curl http://localhost:3000/api/articles
```

Récupérer un article spécifique

```bash
curl http://localhost:3000/api/articles/1
```

Rechercher un article

```bash
curl "http://localhost:3000/api/articles/search?query=premier"
```

Modifier un article

```bash
curl -X PUT http://localhost:3000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{"titre": "Titre modifié après test"}'
```

Supprimer un article

```bash
curl -X DELETE http://localhost:3000/api/articles/1
```
 Test avec Postman

POST - Créer un article
- **URL** : `http://localhost:3000/api/articles`
- **Méthode** : POST
- **Body** (raw JSON) :
```json
{
  "titre": "Mon premier article",
  "contenu": "Contenu de mon premier article",
  "auteur": "Anderson Keny",
  "categorie": "Technologie",
  "tags": ["nodejs", "express", "api"]
}
```

GET - Tous les articles

· URL : http://localhost:3000/api/articles
· Méthode : GET

GET - Un article par ID

· URL : http://localhost:3000/api/articles/1
· Méthode : GET

PUT - Modifier un article

· URL : http://localhost:3000/api/articles/1
· Méthode : PUT
· Body (raw JSON) :

```json
{
  "titre": "Titre modifié",
  "contenu": "Nouveau contenu",
  "categorie": "Programmation",
  "tags": ["nodejs", "update"]
}
```

DELETE - Supprimer un article

· URL : http://localhost:3000/api/articles/1
· Méthode : DELETE

GET - Rechercher

· URL : http://localhost:3000/api/articles/search?query=premier
· Méthode : GET

GET - Filtrer par catégorie

· URL : http://localhost:3000/api/articles?categorie=Technologie
· Méthode : GET
Codes HTTP utilisés

J’ai fait attention à bien retourner les bons codes :

· 200 OK : tout s’est bien passé
· 201 Created : article créé avec succès
· 400 Bad Request : données invalides (titre vide, etc.)
· 404 Not Found : article introuvable
· 500 Internal Server Error : erreur côté serveur


Ce que j’ai appris en faisant ce projet

· Créer une API REST de A à Z
· Gérer une base de données SQLite avec Node.js
· Structurer un projet backend
· Valider les données utilisateur
· Documenter son code et son API
· Utiliser curl pour tester rapidement

J’ai aussi découvert qu’il faut bien faire attention aux versions de Node.js, sinon des erreurs apparaissent (j’ai galéré un peu avec ?? et les versions trop anciennes).

Lien du dépôt GitHub

Le code est disponible ici :
https://github.com/anderson-keny/document-api-inf222.git


Ce qu’il reste à améliorer (si j’avais plus de temps)

· Ajouter Swagger pour une documentation interactive
· Faire un petit front-end (même simple) pour utiliser l’API
· Gérer l’authentification pour que seuls les auteurs puissent modifier leurs articles
· Déployer sur Railway pour qu’elle soit accessible en ligne


Rapport complet avec captures d’écran et analyse critique disponible dans le dossier du TAF.

