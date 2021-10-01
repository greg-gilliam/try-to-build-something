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

  static async getAllDrinks() {
    await sendSms(process.env.INSULT_HANDLER_NUMBER, 'Get all drinks');

    const drinks = await Drinks.getAll();
    return drinks;
  }

  static async getDrinkById(id) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `Get a specific drink ${id}`
    );

    const drinks = await Drinks.getDrink(id);
    return drinks;
  }
  static async updateDrink(id, drinkname) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `We have updated your pet ${id}`
    );
    const updatedDrink = await Drinks.patchDrink(id, drinkname);
    return updatedDrink;
  }

  static async deleteDrink(id) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `We have deleted drink ${id}`
    );
    const deleteDrink = await Drinks.deleteDrink(id);
    return deleteDrink;
  }
};
