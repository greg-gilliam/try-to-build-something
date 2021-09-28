const { Router } = require('express');
const InsultService = require('../services/InsultService');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const insult = await InsultService.createInsult(req.body);
      res.json(insult);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async(req, res, next) => {
    try {
      const insults = await InsultService.getAllInsults();
      res.json(insults);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const insult = await InsultService.getInsultById(id);
      res.json(insult);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async(req, res, next) => {
    try {
      const id = req.params.id;
      const quotes = req.body.quotes;
      const insult = await InsultService.updateInsult(id, quotes);
      res.json(insult);
    } catch (error) {
      next(error);
    }
  });

