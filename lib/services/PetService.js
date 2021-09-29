const Pets = require('../models/Pets');
const { sendSms } = require('../utils/twilio');

module.exports = class PetService {
  static async savePets({ petname, nickname }) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `Looks like ${petname} also goes by ${nickname}!`
    );
    const addPets = await Pets.insert({ petname, nickname });
    return addPets;
  }
};
