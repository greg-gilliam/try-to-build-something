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

  static async getFavoriteById(id) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `Get a specific favorite ${id}`
    );

    const favorite = await Favorites.getFavorite(id);
    return favorite;
  }

  static async updateFavorite(id, quotes) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `We have updated favorite ${id}`
    );
    const updatedFavorite = await Favorites.patchFavorite(id, quotes);
    return updatedFavorite;
  }

  static async deleteFavorite(id) {
    await sendSms(
      process.env.INSULT_HANDLER_NUMBER,
      `We have deleted favorite inslut ${id}`
    );
    const deleteFavorite = await Favorites.deleteUserFavorite(id);
    return deleteFavorite;
  }
};
