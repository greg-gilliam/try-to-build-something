const { Router } = require('express');
const DrinksService = require('../services/DrinksService');
// const Drinks = require('../models/Drinks');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const drinks = await DrinksService.saveDrinks(req.body);
      res.send(drinks);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const drinks = await DrinksService.getAllDrinks();
      res.send(drinks);
    } catch (error) {
      next(error);
    }
  });
