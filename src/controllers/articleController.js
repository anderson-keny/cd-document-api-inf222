const Article = require('../models/article');

// Validation des entrées
const validateArticle = (data) => {
    const errors = [];
    if (!data.titre || data.titre.trim() === '') {
        errors.push('Le titre est obligatoire');
    }
    if (!data.contenu || data.contenu.trim() === '') {
        errors.push('Le contenu est obligatoire');
    }
    if (!data.auteur || data.auteur.trim() === '') {
        errors.push("L'auteur est obligatoire");
    }
    return errors;
};

// POST /api/articles - Créer un article
exports.createArticle = (req, res) => {
    const errors = validateArticle(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const article = {
        titre: req.body.titre,
        contenu: req.body.contenu,
        auteur: req.body.auteur,
        categorie: req.body.categorie || 'Non classé',
        tags: req.body.tags || []
    };

    Article.create(article, (err, id) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(201).json({ message: 'Article créé', id });
    });
};

// GET /api/articles - Liste des articles
exports.getAllArticles = (req, res) => {
    const filters = {
        categorie: req.query.categorie,
        auteur: req.query.auteur,
        date: req.query.date
    };

    Article.findAll(filters, (err, articles) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(200).json(articles);
    });
};

// GET /api/articles/search?query= - Recherche
exports.searchArticles = (req, res) => {
    const searchTerm = req.query.query;
    if (!searchTerm) {
        return res.status(400).json({ error: 'Le paramètre "query" est requis' });
    }

    Article.search(searchTerm, (err, articles) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.status(200).json(articles);
    });
};

// GET /api/articles/:id - Article par ID
exports.getArticleById = (req, res) => {
    const id = req.params.id;

    Article.findById(id, (err, article) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (!article) {
            return res.status(404).json({ error: 'Article non trouvé' });
        }
        res.status(200).json(article);
    });
};

// PUT /api/articles/:id - Modifier
exports.updateArticle = (req, res) => {
    const id = req.params.id;

    Article.findById(id, (err, article) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (!article) {
            return res.status(404).json({ error: 'Article non trouvé' });
        }

        const updatedArticle = {
            titre: req.body.titre || article.titre,
            contenu: req.body.contenu || article.contenu,
            categorie: req.body.categorie || article.categorie,
            tags: req.body.tags || JSON.parse(article.tags)
        };

        Article.update(id, updatedArticle, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(200).json({ message: 'Article modifié' });
        });
    });
};

// DELETE /api/articles/:id - Supprimer
exports.deleteArticle = (req, res) => {
    const id = req.params.id;

    Article.findById(id, (err, article) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (!article) {
            return res.status(404).json({ error: 'Article non trouvé' });
        }

        Article.delete(id, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erreur serveur' });
            }
            res.status(200).json({ message: 'Article supprimé' });
        });
    });
};
