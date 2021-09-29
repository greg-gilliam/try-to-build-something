const Drinks = require('../models/Drinks');
const { sendSms } = require('../utils/twilio');

module.exports = class DrinksService {
  static async saveDrinks({ drinkname, drinktime }) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `Looks like it is ${drinktime}, time to have a ${drinkname}`
    );
    const addDrinks = await Drinks.insert({ drinkname, drinktime });
    return addDrinks;
  }
};
