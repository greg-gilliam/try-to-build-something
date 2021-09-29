const Snacks = require('../models/Snacks');
const { sendSms } = require('../utils/twilio');

module.exports = class SnacksService {
  static async saveSnacks({ snackname, snacktime }) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `Looks like it is ${snacktime}, time to have some ${snackname}`
    );
    const addSnacks = await Snacks.insert({ snackname, snacktime });
    return addSnacks;
  }
};