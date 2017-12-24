'use strict';

const moment = require('moment');

/**
 * @method formatCoordinates
 * @description formats a coordinate object into a comma seperated string
 * @param {Coordinate} coordinates the coordinates to format
 * @returns {String|null} returns with the correctly formatted string or a null
 * @private
 */
function formatCoordinates(coordinates = {}) {
  return (coordinates.latitude && coordinates.latitude !== ''
      && coordinates.longitude && coordinates.longitude !== '')
    ? `${coordinates.latitude},${coordinates.longitude}`
    : null;
}

/**
 * @method parsePartialDateTime
 * @description parses an object containg partial date data
 * @param {PartialDate} datetime
 * @returns {String|null} returns with the partial ISO datetime or with a null
 * @private
 */
function parsePartialDateTime(datetime = {}) {
  if (datetime === null || datetime.year === undefined) {
    return null;
  }

  const units = [
    { unit: datetime.month, delim: '-' },
    { unit: datetime.day, delim: '-' },
    { unit: datetime.hour, delim: 'T' },
    { unit: datetime.minute, delim: ':' },
    { unit: datetime.second, delim: ':' }
  ];

  let dateString = `${datetime.year}`;

  for (let i = 0, iLength = units.length; i < iLength; i += 1) {
    const { unit, delim } = units[i];
    if (unit) {
      dateString += `${delim}${unit}`;
    }
  }

  return `${dateString}Z`;
}

/**
 * @method formatDateTime
 * @description formats a variable type datetime into an ISO TZ or partial TZ datetime string.
 * This function can take Moment objects, native Date objects, and partial datetime objects which
 * allow date ranges to be used according to the documentation on the openweathermap.org website
 * @param {Moment|Date|PartialDate|String} datetime
 * @returns {String|null}
 * @private
 */
function formatDateTime(datetime = null) {
  let response = null;
  if (moment.isMoment(datetime)) {
    response = datetime.toISOString();
  } else if (datetime instanceof Date) {
    response = moment(datetime).toISOString();
  } else if (typeof datetime === 'object') {
    response = parsePartialDateTime(datetime);
  } else if (typeof datetime === 'string' && datetime !== '') {
    response = datetime;
  }
  return response;
}

/**
 * @method AirPollutionMixin
 * @private
 * @param {Class} SuperClass a superclass to apply the mixin too
 */
const AirPollutionMixin = (SuperClass) => {
  /**
   * @class
   * @memberof module:OpenWeatherMap/api
   * @description A collection of air pollution APIs provided by openweathermap.org.
   * Additional constructor options can be found in the [GET]
   * {@link module:OpenWeatherMap/api.OpenWeatherMap} class
   * @augments module:OpenWeatherMap/api.OpenWeatherMap
   * @see {@link https://openweathermap.org/}
   */
  const AirPollution = class extends SuperClass {
    /**
     * @method module:OpenWeatherMap/api.AirPollution~sendPolutionRequest
     * @description formats and sends a request to obtain polutant data
     * @param {String} polutant a string identifier of which polution e.g. co, o3, so2, or no2
     * @param {Object} params an object of parameters
     * @returns {Promise} resolves with the result or rejects with an error
     * @private
     */
    sendPolutionRequest(polutant, params) {
      const location = formatCoordinates(params.coordinates);
      const datetime = formatDateTime(params.datetime);

      return (location !== null && datetime !== null)
        ? this.sendRequest(`/pollution/v1/${polutant}/${location}/${datetime}.json`, {})
        : Promise.reject(new Error(`required parameters have not been supplied.
          coordinates and datetime are required`));
    }

    /**
     * @method module:OpenWeatherMap/api.AirPollution~carbonMonoxide
     * @desc gets the carbon monoxide polution levels at a location and datetime [GET]
     * @public
     * @see {@link https://openweathermap.org/api/pollution/co}
     * @param {PollutionParams} params
     * @returns {Promise} the http request promise which will resolve with the carbon monoxide data
     * or reject with an error
     */
    carbonMonoxide(params = {}) {
      return this.sendPolutionRequest('co', params);
    }

    /**
     * @method module:OpenWeatherMap/api.AirPollution~ozone
     * @desc gets the current ozone thickness at a location and datetime [GET]
     * @public
     * @see {@link https://openweathermap.org/api/pollution/o3}
     * @param {PollutionParams} params
     * @returns {Promise} the http request promise which will resolve with the carbon monoxide data
     * or reject with an error
     */
    ozone(params = {}) {
      return this.sendPolutionRequest('o3', params);
    }

    /**
     * @method module:OpenWeatherMap/api.AirPollution~sulfurDioxide
     * @desc gets the current sulfur dioxide polution at a location and datetime [GET]
     * @public
     * @see {@link https://openweathermap.org/api/pollution/so2}
     * @param {PollutionParams} params
     * @returns {Promise} the http request promise which will resolve with the sulfur dioxide data
     * or reject with an error
     */
    sulfurDioxide(params = {}) {
      return this.sendPolutionRequest('so2', params);
    }

    /**
     * @method module:OpenWeatherMap/api.AirPollution~nitrogenDioxide
     * @desc gets the current nitrogen dioxide polution at a location and datetime [GET]
     * @public
     * @see {@link https://openweathermap.org/api/pollution/no2}
     * @param {PollutionParams} params
     * @returns {Promise} the http request promise which will resolve with the nitrogen dioxide
     * data or reject with an error
     */
    nitrogenDioxide(params = {}) {
      return this.sendPolutionRequest('no2', params);
    }
  };
  return AirPollution;
};

module.exports = AirPollutionMixin;
