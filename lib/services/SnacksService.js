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
  static async getAllSnacks() {
    await sendSms(process.env.INSULT_HANDLER_NUMBER, 'Get all snacks');

    const snacks = await Snacks.getAll();
    return snacks;
  }

  static async getSnackById(id) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `Get a specific snack ${id}`
    );
    const snacks = await Snacks.getSnack(id);
    return snacks;
  }

  static async updateSnack(id, snackname) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `We have updated snack ${id}`
    );
    const updatedSnack = await Snacks.patchSnack(id, snackname);
    return updatedSnack;
  }

  static async deleteSnack(id) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `We have deleted snack ${id}`
    );
    const deleteSnack = await Snacks.deleteSnack(id);
    return deleteSnack;
  }
};
