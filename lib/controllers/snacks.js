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
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const snackname = req.body.snackname;
      const snacks = await SnacksService.updateSnack(id, snackname);
      res.send(snacks);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleteSnack = await SnacksService.deleteSnack(id);
      res.send(deleteSnack);
    } catch (error) {
      next(error);
    }
  });
