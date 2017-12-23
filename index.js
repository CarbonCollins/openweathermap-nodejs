'use strict';

const request = require('request-promise-native');

const WeatherMixin = require('./lib/weather');
const UVIndexMixin = require('./lib/uvIndex');

/**
 * @module OpenWeatherMap/api
 * @description The OpenWeatherMap/api module acts as an abstraction layer for accessing the
 * various OpenWeatherMap APIs.
 * @see {@link https://openweathermap.org/api}
 * @exports external:Weather
 */

/**
 * @method parseParameters
 * @instance
 * @desc parses the modules parameters into the api parameters
 * @param {RequestParameters} params
 * @returns {Object} returns a query object with the correct formatting when sending the search
 * query
 * @private
 */
function parseParameters(params = {}) {
  const query = (params.city && params.country)
    ? `${params.city},${params.country}`
    : `${params.city}`;
  const zip = ((params.zip || params.postcode) && params.country)
    ? `${params.zip || params.postcode},${params.country}`
    : `${params.zip || params.postcode}`;

  const finalParams = {
    id: (params.id) ? `${params.id}` : undefined,
    q: (query !== '') ? query : undefined,
    lat: (params.coordinates && params.coordinates.latitude)
      ? `${params.coordinates.latitude}`
      : undefined,
    lon: (params.coordinates && params.coordinates.longitude)
      ? `${params.coordinates.longitude}`
      : undefined,
    zip: (zip !== '') ? zip : undefined,
    cnt: (params.days || params.hours) ? `${params.days || params.hours}` : undefined
  };

  return finalParams;
}

/**
 * @class
 * @memberof module:OpenWeatherMap/api
 * @desc contains the core functionality between all of the APIs such as request functions and
 * key storage. This class is intended to be extended or have mixins applied to add the
 * functionality of the different APIs
 */
class OpenWeatherMap {
  /**
   * @constructor
   * @param {Object} options
   * @param {String} options.apiKey the APPID supplied by openweathermap.org
   * @param {String} [options.language] an optional 2 letter language code e.g. 'en'
   * @param {String} [options.hostname=api.openweathermap.org] an optional hostname for the api
   * to connect to.
   * @param {String|Number} [options.port=80] an optional port to use for the api
   */
  constructor(options = {}) {
    this.apiKey = options.apiKey || '';
    this.language = options.language || undefined;
    this.hostname = options.hostname || 'api.openweathermap.org';
    this.port = `${options.port || 80}`;
  }

  /**
   * @method module:OpenWeatherMap/api.OpenWeatherMap~sendRequest
   * @desc builds and sends the request to the OpenWeatherMap API
   * @param {String} uri the uri to send the request too
   * @param {Object} params
   * @returns {Promise} the http request promise
   * @private
   */
  sendRequest(uri, params) {
    const options = {
      uri: `http://${this.hostname}:${this.port}${uri}`,
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
}

/**
 * @class
 * @classdesc a helper class for constructing a class with mixins
 * @private
 */
class MixinBuilder {
  /**
   * @constructor
   * @param {Class} Superclass the parent class to have the mixins applied too
   * @private
   */
  constructor(Superclass) {
    this.superclass = Superclass;
  }

  /**
   * @method MixinBuilder~with
   * @desc specifies whch mixins to apply to the super class
   * @param {...Function} mixins
   * @returns {Class} returns the superclass with the mixins applied
   * @private
   */
  with(...mixins) {
    return mixins.reduce((c, mixin) => { return mixin(c); }, this.superclass);
  }
}

/**
 * @method mix
 * @desc mixes a superclass using the MixinBuilder
 * @param {Class} Superclass
 * @returns {MixinBuilder} returns a MixinBuilder ready to apply mixins
 * @private
 */
const mix = (Superclass) => {
  return new MixinBuilder(Superclass);
};

module.exports = mix(OpenWeatherMap).with(WeatherMixin, UVIndexMixin);
module.exports.OpenWeatherMap = mix(OpenWeatherMap).with(WeatherMixin, UVIndexMixin);

module.exports.Weather = mix(OpenWeatherMap).with(WeatherMixin);
module.exports.UVIndex = mix(OpenWeatherMap).with(UVIndexMixin);

/**
 * @typedef {Object} CityIDReqParams
 * @global
 * @description an object of parameters used to identify a location using a citys ID
 * @property {String|Number} id the city ID to be used in the query
 * @property {String|Number} [days] optional number of days to return in the forecast (used in
 * dailyForecast alias for cnt)
 * @property {String|Number} [hours] optional number of hours to return in the forecast (used in
 * forecast alias for cnt)
 */

/**
 * @typedef {Object} CityNameReqParams
 * @global
 * @description an object of parameters used to identify a location using a citys name
 * @property {String} city the city name to use in the query e.g. 'london' (best used with
 * country also set)
 * @property {String} [country] optional 2 letter country code to use in the query e.g. 'en'
 * @property {String|Number} [days] optional number of days to return in the forecast (used in
 * dailyForecast alias for cnt)
 * @property {String|Number} [hours] optional number of hours to return in the forecast (used in
 * forecast alias for cnt)
 */

/**
 * @typedef {Object} LatLonReqParams
 * @global
 * @description an object of parameters used to identify a location using a citys name
 * @property {Coordinate} coordinates a coordinate object used for searching based on latlon (use
 * on its own)
 * @property {String|Number} [days] optional number of days to return in the forecast (used in
 * dailyForecast alias for cnt)
 * @property {String|Number} [hours] optional number of hours to return in the forecast (used in
 * forecast alias for cnt)
 */

/**
 * @typedef {Object} ZipReqParams
 * @global
 * @description an object of parameters used to identify a location using a citys name
 * @property {String|Number} zip the zip code to use within the query (US by default unless
 * country is specified)
 * @property {String|Number} postcode an alias to zip (use either zip or postcode)
 * @property {String} [country] optional 2 letter country code to use in the query e.g. 'en'
 * @property {String|Number} [days] optional number of days to return in the forecast (used in
 * dailyForecast alias for cnt)
 * @property {String|Number} [hours] optional number of hours to return in the forecast (used in
 * forecast alias for cnt)
 */

/**
 * @typedef {Object} Coordinate
 * @global
 * @description a coordinate object containing a longitute and latitude for positioning
 *
 * @property {String|Number} latitude the latitude of the position
 * @property {String|Number} longitude the longitude of the position
 */
