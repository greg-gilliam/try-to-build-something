const { Router } = require('express');
const SnacksService = require('../services/SnacksService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const snacks = await SnacksService.saveSnacks(req.body);
      res.send(snacks);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const snacks = await SnacksService.getAllSnacks();
      res.send(snacks);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const snacks = await SnacksService.getSnackById(id);
      res.send(snacks);
    } catch (error) {
      next(error);
    }
  });
