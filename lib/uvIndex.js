'use strict';

/**
 * @method UVIndexMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
const UVIndexMixin = (SuperClass) => { 
  /**
   * @class
   * @memberof module:OpenWeatherMap/api
   * @description A collection of UV Index APIs provided by openweathermap.org.
   * Additional constructor options can be found in the {@link module:OpenWeatherMap/api.OpenWeatherMap} class
   * @augments module:OpenWeatherMap/api.OpenWeatherMap
   * @see {@link https://openweathermap.org/}
   */
  const UVIndex = class extends SuperClass {
    /**
     * @method module:OpenWeatherMap/api.UVIndex~UVIndex
     * @desc gets the current UV Index at a location at the current time
     * @public
     * @see {@link https://openweathermap.org/current}
     * @param {CityIDReqParams|CityNameReqParams|LatLonReqParams|ZipReqParams} params 
     * @returns {Promise} the http request promise which will resolve with the current weather or reject with an error
     */
    UVIndex(params) {
      return this.sendRequest('/data/2.5/uvi', params);
    }
  };
  return UVIndex;
}

module.exports = UVIndexMixin;
