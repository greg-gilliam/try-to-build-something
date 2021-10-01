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

  static async getAllPets() {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      'Get all nicknames we have saved'
    );

    const pets = await Pets.getAll();
    return pets;
  }

  static async getPetById(id) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `Get a specific pet ${id}`
    );

    const pets = await Pets.getPet(id);
    return pets;
  }

  static async updatePet(id, petname) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `We have updated your pet ${id}`
    );
    const updatedPet = await Pets.patchDrink(id, petname);
    return updatedPet;
  }
};
