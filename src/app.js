const express = require('express');
const cors = require('cors');
const articleRoutes = require('./routes/articles');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route d'accueil
app.get('/', (req, res) => {
    res.json({ 
        message: 'Bienvenue sur l\'API Blog',
        endpoints: {
            posts: '/api/articles',
            get: 'GET /api/articles',
            post: 'POST /api/articles',
            getById: 'GET /api/articles/:id',
            put: 'PUT /api/articles/:id',
            delete: 'DELETE /api/articles/:id',
            search: 'GET /api/articles/search?query='
        }
    });
});

// Routes API
app.use('/api', articleRoutes);

// 404 - Route non trouvée
app.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur serveur' });
});

module.exports = app;
