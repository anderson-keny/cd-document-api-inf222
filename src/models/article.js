const db = require('../database/db');

const Article = {
    // Créer un article
    create: (article, callback) => {
        const { titre, contenu, auteur, categorie, tags } = article;
        const query = `
            INSERT INTO articles (titre, contenu, auteur, categorie, tags)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.run(query, [titre, contenu, auteur, categorie, JSON.stringify(tags)], function(err) {
            callback(err, this?.lastID);
        });
    },

    // Récupérer tous les articles avec filtres
    findAll: (filters, callback) => {
        let query = 'SELECT * FROM articles WHERE 1=1';
        const params = [];

        if (filters.categorie) {
            query += ' AND categorie = ?';
            params.push(filters.categorie);
        }
        if (filters.auteur) {
            query += ' AND auteur = ?';
            params.push(filters.auteur);
        }
        if (filters.date) {
            query += ' AND DATE(date) = ?';
            params.push(filters.date);
        }

        query += ' ORDER BY date DESC';
        db.all(query, params, callback);
    },

    // Rechercher
    search: (searchTerm, callback) => {
        const query = `
            SELECT * FROM articles 
            WHERE titre LIKE ? OR contenu LIKE ?
            ORDER BY date DESC
        `;
        const term = `%${searchTerm}%`;
        db.all(query, [term, term], callback);
    },

    // Trouver par ID
    findById: (id, callback) => {
        db.get('SELECT * FROM articles WHERE id = ?', [id], callback);
    },

    // Mettre à jour
    update: (id, article, callback) => {
        const { titre, contenu, categorie, tags } = article;
        const query = `
            UPDATE articles 
            SET titre = ?, contenu = ?, categorie = ?, tags = ?
            WHERE id = ?
        `;
        db.run(query, [titre, contenu, categorie, JSON.stringify(tags), id], callback);
    },

    // Supprimer
    delete: (id, callback) => {
        db.run('DELETE FROM articles WHERE id = ?', [id], callback);
    }
};

module.exports = Article;
