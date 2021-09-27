const Insult = require('../models/Insult');
const { sendSms } = require('../utils/twilio');

module.exports = class InsultService {
  
  static async createInsult({ quotes }) {
    await sendSms (
      process.env.INSULT_HANDLER_NUMBER,
      'New insult received: ${quotes}'
    );

    const insult = await Insult.insert({ quotes });
    return insult;
  } 

  static async getAllInsults() {
    await sendSms (
      process.env.INSULT_HANDLER_NUMBER,
      'Get all insults'
    );

    const insults = await Insult.getAll();
    return insults;
  }

  static async getInsultById(id) {
    await sendSms (
      process.env.INSULT_HANDLER_NUMBER,
      'Get a specific insult ${id}'
    );

    const insult = await Insult.getInsult(id);
    return insult;
  }
};
