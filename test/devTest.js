'use strict';

const { Weather } = require('../index');

const open = new Weather({
  apiKey: '81b3d5ab1004c595c1448f478a558925',
});

open.now({ city: 'london', country: 'uk' })
  .then((nowResult) => {
    console.log(JSON.stringify(nowResult, null, 2));
    return open.forecast({ city: 'london', country: 'uk' });
  })
  .then((forecastResult) => {
    console.log(JSON.stringify(forecastResult, null, 2));
  })
  .catch((err) =>{
    console.error(err);
  });

