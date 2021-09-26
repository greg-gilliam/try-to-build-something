const Insult = require('../models/Insult');

module.exports = class InsultService {
  
  static async createInsult({ quotes }) {
    const insult = await Insult.insert({ quotes });
    return insult;
  } 
};
