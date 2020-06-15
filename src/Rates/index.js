const fetch = require('node-fetch');
const setParams = require('../utils');

class Rates {
  static async getAllRates(currency = 'EUR') {
    const url = setParams('https://api.exchangeratesapi.io/latest', { base: currency });
    const { rates } = await fetch(url).then((data) => data.json());

    return rates;
  }

  static async getRate(from = 'EUR', to = 'RU') {
    const rates = await Rates.getAllRates(from);

    return Math.round(rates[to]);
  }
}

module.exports = Rates;
