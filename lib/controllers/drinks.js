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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const drinks = await DrinksService.getDrinkById(id);
      res.send(drinks);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const drinkname = req.body.drinkname;
      const drinks = await DrinksService.updateDrink(id, drinkname);
      res.send(drinks);
    } catch (error) {
      next(error);
    }
  });
