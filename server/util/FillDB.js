const path = require('path');
const getModelTypes = require('./ModelTypes.js');
const populate = require('./Mutate.js');
const jsonContent = require(path.resolve(process.argv[3]));

// jsonContent.length = 500; // TODO

const model = 'Country';

const schemaFile = path.resolve(process.argv[2]);
const countryTypes = getModelTypes(schemaFile, model);


const data = Object.values(
  jsonContent
    .reduce((result, { countryCode, countryName, ...rate }) => {
      let country;
      if (!result.hasOwnProperty(countryCode)) {
        country = { countryCode, countryName, rates: [] };
        result[countryCode] = country;
      } else {
        country = result[countryCode];
      }

      country.rates.push(rate);
      return result;
    }, { })
);

populate(model, data, countryTypes, 2000);

