'use strict';

const request = require('request-promise-native');

/**
 * @method parseParameters
 * @instance
 * @desc parses the modules parameters into the api parameters
 * @param {RequestParameters} params
 * @returns {Object} returns a query object with the correct formatting when sending the search query
 */
function parseParameters(params) {
  const finalParams = {};

  // by city ID (prefered)
  if (params.id && params.id !== '') {
    finalParams.id = `${params.id}`;

  // by city name and country
  } else if (params.city && params.city !== ''
      && params.country && params.country !== '') {
    finalParams.q = `${params.city},${params.country}`;

  // by just city name
  } else if (params.city && params.city !== '') {
    finalParams.q = `${params.city}`;

  // by lat long
  } else if (params.coordinates
      && params.coordinates.latitude && params.coordinates.latitude !== ''
      && params.coordinates.longitude && params.coordinates.longitude !== '') {
    finalParams.lat = `${params.coordinates.latitude}`;
    finalParams.lon = `${params.coordinates.longitude}`;

  // by zip and country
  } else if (((params.zip && params.zip !== '') || (params.postcode && params.postcode !== ''))
      && params.country && params.country !== '') {
    finalParams.zip = `${params.zip || params.postcode},${params.country}`;

  // just by zip code (USA only)
  } else if ((params.zip && params.zip !== '') || (params.postcode && params.postcode !== '')) {
    finalParams.zip = `${params.zip || params.postcode}`;
  }

  // an optional days limit (only used on dailyForcast)
  if (params.days && params.days !== '') {
    finalParams.cnt = `${params.days}`;
  }

  return finalParams;
}

/**
 * @memberof module:OpenWeatherMap
 * @description A class for accessing the OpenWeatherMap Weather APIs
 * @see {@link https://openweathermap.org/}
 */
class Weather {
  /**
   * @constructor
   * @param {Object} options
   * @param {String} options.apiKey the api key required to access the OpenWeatherMap API
   * @param {String} [options.units] optional units to use kelvin (leave blank), imperial, or metric
   * @param {String} [options.language] optional language in 2 letter format e.g. 'en'
   * @param {String} [options.hostname=api.openweathermap.org] optional hostname but will default to the official api url
   * @param {String} [options.port=80] optional port name but will default to port 80
   */
  constructor(options) {
    this.apiKey = options.apiKey || '';
    this.units = options.units || undefined;
    this.language = options.language || undefined;
    this.hostname = options.hostname || 'api.openweathermap.org';
    this.port = options.port || '80';
  }

  /**
   * @method module:OpenWeatherMap.Weather~sendRequest
   * @desc builds and sends the request to the OpenWeatherMap API
   * @private
   * @param {String} uri the uri to send the request too
   * @param {Object} params
   * @returns {Promise} the http request promise
   */
  sendRequest(uri, params) {
    const options = {
      uri: `http://${this.hostname}${uri}`,
      qs: Object.assign(
        {
          APPID: `${this.apiKey}`,
          units: this.units,
          lang: this.language
        },
        parseParameters(params)
      ),
      json: true
    };
    return request(options);
  }

  /**
   * @method module:OpenWeatherMap.Weather~now
   * @desc gets the current weather at a location at the current time
   * @public
   * @see {@link https://openweathermap.org/current}
   * @param {RequestParameters} params 
   * @returns {Promise} the http request promise which will resolve with the current weather or reject with an error
   */
  now(params) {
    return this.sendRequest('/data/2.5/weather', params);
  }

  /**
   * @method module:OpenWeatherMap.Weather~forcast
   * @desc gets a forcast for the next 5 days in 3 hour intervals
   * @public
   * @see {@link https://openweathermap.org/forecast5}
   * @param {RequestParameters} params
   * @returns {Promise} the http request promise which will resolve with the 5 day forecast weather or reject with an error
   */
  forcast(params) {
    return this.sendRequest('/data/2.5/forecast', params);
  }
  
  /**
   * @method module:OpenWeatherMap.Weather~dailyForcast
   * @desc gets a daily forcast for up to 16 days in the future (paid accounts only)
   * @public
   * @see {@link https://openweathermap.org/forecast16}
   * @param {RequestParameters} params
   * @returns {Promise} the http request promise which will resolve with the 16 day forcast weather or reject with an error
   */
  dailyForcast(params) {
    return this.sendRequest('/data/2.5/forecast/daily', params);
  }
}

module.exports = Weather;

/**
 * @typedef {Object} RequestParameters
 * @description an object of optional parameters used for determining where the weather should be retreived for
 *
 * @property {String|Number} [id] the city ID to use in the query (use on its own)
 *
 * @property {String} [city] the city name to use in the query e.g. 'london' (best used with country also set)
 * @property {String} [country] the 2 letter country code to use in the query e.g. 'en'
 *
 * @property {OpenWeatherMap~Coordianate} [coordinates] a coordinate object used for searching based on latlon (use on its own)
 *
 * @property {String|Number} [zip] the zip code to use within the query (US by default unless country is specified)
 * @property {String|Number} [postcode] an alias to zip
 * 
 * @property {String|Number} [days] number of days to return in the forecast (used only in dailyForecast)
 */

 /**
 * @typedef {Object} Coordinate
 * @description a coordinate object containing a longitute and latitude for positioning
 *
 * @property {String|Number} latitude the latitude of the position
 * @property {String|Number} longitude the longitude of the position
 */
