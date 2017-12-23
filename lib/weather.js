'use strict';

/**
 * @method WeatherMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
const WeatherMixin = (SuperClass) => {
  /**
   * @class
   * @memberof module:OpenWeatherMap/api
   * @description A collection of Weather APIs provided by openweathermap.org.
   * Additional constructor options can be found in the
   * {@link module:OpenWeatherMap/api.OpenWeatherMap} class
   * @augments module:OpenWeatherMap/api.OpenWeatherMap
   * @see {@link https://openweathermap.org/}
   */
  const Weather = class extends SuperClass {
    /**
     * @constructor
     * @param {Object} options
     * @param {String} [options.units] default uses kelvin, can also specify 'metric' for
     * centegrade and 'imprerial' for Fahrenheit.
     */
    constructor(options = {}) {
      super(options);
      this.units = options.units || undefined;
    }

    /**
     * @method module:OpenWeatherMap/api.Weather~now
     * @desc gets the current weather at a location at the current time [GET]
     * @public
     * @see {@link https://openweathermap.org/current}
     * @param {CityIDReqParams|CityNameReqParams|LatLonReqParams|ZipReqParams} params
     * @returns {Promise} the http request promise which will resolve with the current weather
     * or reject with an error
     */
    now(params) {
      return this.sendRequest('/data/2.5/weather', params);
    }

    /**
     * @method module:OpenWeatherMap/api.Weather~forecast
     * @desc gets a forecast for the next 5 days in 3 hour intervals [GET]
     * @public
     * @see {@link https://openweathermap.org/forecast5}
     * @param {CityIDReqParams|CityNameReqParams|LatLonReqParams|ZipReqParams} params
     * @returns {Promise} the http request promise which will resolve with the 5 day forecast
     * weather or reject with an error
     */
    forecast(params) {
      return this.sendRequest('/data/2.5/forecast', params);
    }

    /**
     * @method module:OpenWeatherMap/api.Weather~dailyForecast
     * @desc gets a daily forecast for up to 16 days in the future (paid accounts only) [GET]
     * @public
     * @see {@link https://openweathermap.org/forecast16}
     * @param {CityIDReqParams|CityNameReqParams|LatLonReqParams|ZipReqParams} params
     * @returns {Promise} the http request promise which will resolve with the 16 day forecast
     * weather or reject with an error
     */
    dailyForecast(params) {
      return this.sendRequest('/data/2.5/forecast/daily', params);
    }
  };
  return Weather;
};

module.exports = WeatherMixin;
