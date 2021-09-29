const { Router } = require('express');
const SnacksService = require('../services/SnacksService');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const snacks = await SnacksService.saveSnacks(req.body);
    res.send(snacks);
  } catch (error) {
    next(error);
  }
});
