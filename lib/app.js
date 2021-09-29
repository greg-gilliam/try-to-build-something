const express = require('express');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error.js');
const app = express();

app.use(express.json());

app.use('/api/v1/insults', require('./controllers/insults.js'));
app.use('/api/v1/favorites', require('./controllers/favorites.js'));
app.use('/api/v1/drinks', require('./controllers/drinks.js'));
app.use('/api/v1/snacks', require('./controllers/snacks.js'));
app.use('/api/v1/pets', require('./controllers/pets.js'));

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
