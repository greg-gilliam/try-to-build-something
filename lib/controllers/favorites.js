const { Router } = require('express');
const FavoritesService = require('../services/FavoritesService');
// const Favorites = require('../models/Favorites');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const favorites = await FavoritesService.saveFavorites(req.body);
      res.send(favorites);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const favorites = await FavoritesService.getAllFavorites();
      res.send(favorites);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const favorite = await FavoritesService.getFavoriteById(id);
      res.send(favorite);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const quotes = req.body.quotes;
      const favorite = await FavoritesService.updateFavorite(id, quotes);
      res.send(favorite);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleteFavorite = await FavoritesService.deleteFavorite(id);
      res.send(deleteFavorite);
    } catch (error) {
      next(error);
    }
  });
