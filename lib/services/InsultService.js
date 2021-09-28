const Insult = require('../models/Insult');
const { sendSms } = require('../utils/twilio');
const fetchInsult = require('../utils/fetch');

module.exports = class InsultService {
  
  static async createInsult(body = null) {
    const random = await fetchInsult();
    console.log(random);
    const insult = body ? body : random;
    await sendSms (
      process.env.INSULT_HANDLER_NUMBER,
      'New insult received: ${insult}'
    );

    const savedInsult = await Insult.insert(insult);
    return savedInsult;
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
