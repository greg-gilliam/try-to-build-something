const { Router } = require('express');
const PetService = require('../services/PetService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const pets = await PetService.savePets(req.body);
      res.send(pets);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const pets = await PetService.getAllPets();
      res.send(pets);
    } catch (error) {
      next(error);
    }
  });
