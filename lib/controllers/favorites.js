const { Router } = require('express');
const FavoritesService = require('../services/FavoritesService');
const Favorites = require('../models/Favorites');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const favorites = await FavoritesService.saveFavorites(req.body);
    res.send(favorites);
  } catch (error) {
    next(error);
  }
});
