const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`\n Serveur démarré sur http://localhost:${PORT}`);
    console.log(` API disponible sur http://localhost:${PORT}/api/articles`);
    console.log(` Accueil: http://localhost:${PORT}/\n`);
});
