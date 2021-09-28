const Favorites = require('../models/Favorites');
const { sendSms } = require('../utils/twilio');

module.exports = class FavoritesService {
  static async saveFavorites({ username, quotes }) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `New favorite created: ${(username, quotes)}`
    );
    const addFavorite = await Favorites.insert({ username, quotes });
    return addFavorite;
  }

  static async getAllFavorites() {
    await sendSms(process.env.INSULT_HANDLER_NUMBER, 'Get all favorites');

    const favorites = await Favorites.getAll();
    return favorites;
  }
};
