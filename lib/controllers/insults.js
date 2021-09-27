const { Router } = require('express');
const InsultService = require('../services/InsultService');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const insult = await InsultService.createInsult(req.body);
      res.send(insult);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async(req, res, next) => {
    try {
      const insults = await InsultService.getAllInsults();
      res.send(insults);
    } catch (error) {
      next(error);
    }
  });

