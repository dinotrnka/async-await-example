const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];

    if (rate) {
      return rate;
    } else {
      throw new Error(); // Will trigger the catch block below
    }
  } catch(e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
  }
}

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch(e) {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempcountries) => {
    countries = tempcountries;
    return getExchangeRate(from, to).then((rate) => {
      return createStatusMessage(from, to, amount, rate, countries);
    });
  });
};

const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);
  return createStatusMessage(from, to, amount, rate, countries);
};

// convertCurrency('USD', 'CAD', '100').then((status) => {
//   console.log(status);
// });

convertCurrencyAlt('GBP', 'USD', '100').then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e.message);
});

const createStatusMessage = (from, to, amount, rate, countries) => {
  const exchangedAmount = amount * rate;

  return `${amount} ${from} is worth ${exchangedAmount} ${to}. 
  ${to} can be used in the following countries: ${countries.join(', ')}`;
}