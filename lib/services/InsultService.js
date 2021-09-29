const Insult = require('../models/Insult');
const { sendSms } = require('../utils/twilio');
const fetchInsult = require('../utils/fetch');

module.exports = class InsultService {
  static async createInsult(body = null) {
    const random = await fetchInsult();
    console.log(random);
    const insult = body ? body : random;
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `New insult received: ${insult}`
    );

    const savedInsult = await Insult.insert(insult);
    return savedInsult;
  }

  static async getAllInsults() {
    await sendSms(process.env.INSULT_HANDLER_NUMBER, 'Get all insults');

    const insults = await Insult.getAll();
    return insults;
  }

  static async getInsultById(id) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `Get a specific insult ${id}`
    );

    const insult = await Insult.getInsult(id);
    return insult;
  }

  static async updateInsult(id, quotes) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `We have updated insult ${id}`
    );
    const updatedInsult = await Insult.patchInsult(id, quotes);
    return updatedInsult;
  }

  static async deleteInsult(id) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `We have deleted insult ${id}`
    );
    const deleteInsult = await Insult.deleteUserInsult(id);
    return deleteInsult;
  }
};
