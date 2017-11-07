/**
 * @module OpenWeatherMap
 * @description An abstraction layer for accessing the various OpenWeatherMap APIs.
 * @see {@link https://openweathermap.org/api}
 * @exports Weather
 */

module.exports.Weather = require('./lib/weather');

/**
 * @typedef {Object} Coordinate
 * @description a coordinate object containing a longitute and latitude for positioning
 *
 * @property {String|Number} latitude the latitude of the position
 * @property {String|Number} longitude the longitude of the position
 */
