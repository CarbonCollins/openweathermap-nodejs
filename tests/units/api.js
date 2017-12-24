/* eslint no-underscore-dangle: ["error", { "allow": ["__get__"] }] */

'use strict';

const Mocha = require('mocha');
const Chai = require('chai');
const jsdocx = require('jsdoc-x');
const http = require('http');
const rewire = require('rewire');
const qs = require('querystring');
const EventEmitter = require('events');
const moment = require('moment');

const { Test, Suite } = Mocha;
const { expect } = Chai;

const serverEmitter = new EventEmitter();
const serverPort = 3334;
const serverAddress = '127.0.0.1';
const serverHost = `http://${serverAddress}`;
const serverValidKey = 'validKey';
let server;

const OpenWeatherMap = require('../../index');

function generateArgsFromParams(params) {
  const parameters = ((Array.isArray(params)) ? params : [])
    .slice(0)
    .map((param) => {
      return param.type;
    })
    .map((param) => {
      if (param.includes('Array.<')) {
        switch (param.substr(7, (param.length - 8))) {
          case 'String':
            return ['test1', 'test2', 'test3'];
          case 'Number':
            return [5, 7, 9];
          case 'Object':
            return [{ test: true }, { test: false }];
          default:
            return [];
        }
      } else {
        switch (param) {
          case 'options={}':
            return {};
          case 'String':
            return 'test1';
          case 'Number':
            return 5;
          case 'Object':
            return { test: true };
          case 'CityIDReqParams':
            return { id: 'London' };
          case 'Coordinate':
            return { latitude: 51.509865, longitude: -0.118092 };
          case 'PollutionParams':
            return {
              coordinates: { latitude: 51.509865, longitude: -0.118092 },
              datetime: moment()
            };
          default:
            return null;
        }
      }
    });

  return parameters;
}

/**
 * @method getFunctionArgumentNames
 * @description parses a function to determine its arguments and returns them as a string
 * @param {Function} func the function to parse
 * @returns {String[]} an array of argument names for the suppl;ied function
 */
function getFunctionArgumentNames(func) {
  const argMatches = func.toString().match(/\(([^)]*)\)/);
  const argString = (argMatches && Array.isArray(argMatches) && argMatches.length >= 2)
    ? argMatches[1]
    : '';
  return argString.split(',').map((arg) => { return arg.trim().replace('={}', ''); });
}

/**
 * @method getAPITests
 * @description gets all of the js files within the lib directory and parses there jsdoc tags in
 * order to proceedurly generate tests based on the jsdocs. This requires certain tags to be
 * present such as the type (used to determine what type of request) aswell as the item under test
 * needing to be an inner method of a class.
 * @summary parse api jsdocs to generate test list
 * @returns {Promise} resolves with an object containing the jsdoc info or rejects with an error
 */
function getAPITests() {
  return jsdocx.parse('./lib/*.js')
    .then((docs) => {
      const innerMethods = docs
        .filter((doc) => { // only get methods
          return doc.scope === 'inner' && doc.access && doc.access === 'public';
        })
        .map((doc) => { // map the docs to remove useless data
          return {
            params: (doc.params)
              ? doc.params
                .map((param) => {
                  return {
                    type: param.type.names[0],
                    name: param.name.replace('={}', ''),
                    optional: (param.optional && param.optional === true)
                  };
                })
                .filter((param) => {
                  return !param.name.includes('.');
                })
              : [],
            memberof: doc.memberof,
            description: doc.description,
            see: doc.see,
            name: doc.name
          };
        })
        .reduce((methods, doc) => { // sort all the functions into categories (mixins)
          if (!methods[doc.memberof]) {
            methods[doc.memberof] = [];
          }
          methods[doc.memberof].push(doc);
          return methods;
        }, {});
      return innerMethods;
    });
}

const apiSuite = new Suite('civocloud-nodejs api tests');

module.exports = () => {
  return getAPITests()
    .then((methods) => {
      apiSuite.beforeAll('Test Endpoint setup', (done) => {
        server = http.createServer((req, res) => {
          let data = '';

          req.on('data', (chunk) => { data += chunk; });

          req.on('end', () => {
            serverEmitter.emit('receivedRequest', {
              req,
              body: qs.parse(data) || {},
              params: (req.url.includes('?'))
                ? qs.parse(req.url.split('?')[1]) || {}
                : {}
            });

            res.writeHead(200);
            res.write('{}');
            res.end();
          });
        });

        server.on('listening', () => {
          done();
        });

        server.listen(serverPort, serverAddress);
      });

      apiSuite.afterAll('Test Endpoint destroy', (done) => {
        server.close((err) => {
          done(err);
        });
      });

      const innerMethods = methods;
      const outerMethods = Object.keys(methods);

      for (let o = 0, oLength = outerMethods.length; o < oLength; o += 1) {
        const testSuite = new Suite(`${outerMethods[o]}`);
        for (let i = 0, iLength = innerMethods[outerMethods[o]].length; i < iLength; i += 1) {
          const method = innerMethods[outerMethods[o]][i];
          const methodSuite = new Suite(`${method.name}()`);
          methodSuite.timeout(5000);
          
          methodSuite.addTest(new Test('Function exposed', () => {
            const owm = new OpenWeatherMap.OpenWeatherMap({ apiKey: 'test' });
            expect(owm[method.name]).to.be.a('function', 'method is not exposed as a function');
          }));

          methodSuite.addTest(new Test('Function has description', () => {
            expect(method.description).to.not.be.equal(undefined);
            expect(method.description).to.not.be.equal(null);
            expect(method.description).to.not.be.equal('');
          }));

          methodSuite.addTest(new Test('Function has see link to openweathermap.org', () => {
            expect(method.see).to.not.be.equal(undefined);
            expect(method.see).to.be.an('array');
            expect(method.see).to.have.lengthOf(1);
            expect(method.see).to.include.to.match(/{@link https:\/\/openweathermap\.org.+/);
          }));


          if (/\[GET|POST|PUT|HEAD|DELETE|OPTIONS\]/.test(method.description)) {
            // request stuff here
            methodSuite.addTest(new Test('Function calls API endpoint', (done) => {
              const methodType = method.description
                .match(/\[(GET|POST|PUT|HEAD|DELETE|OPTIONS)\]/)[1];
              const MUTT = new OpenWeatherMap.OpenWeatherMap({
                apiKey: serverValidKey,
                host: serverAddress,
                port: serverPort
              });
              serverEmitter.once('receivedRequest', (payload) => {
                expect(payload.req.headers).to.deep.include({ accept: 'application/json' });
                expect(payload.params).to.include.keys(['APPID']);
                expect(payload.req.method).to.be.equal(methodType);
                done();
              });

              MUTT[method.name](...generateArgsFromParams(method.params))
                .catch((err) => {
                  done(err);
                });
            }));
          }

          methodSuite.addTest(new Test('Correct Parameters', () => {
            const owm = new OpenWeatherMap.OpenWeatherMap({ apiKey: 'test' });
            const nonOptionalParams = method.params
              .filter((param) => {
                return ((!param.optional || (param.optional && param.optional === false))
                  && param.name !== '');
              })
              .map((param) => {
                return param.name;
              });
            const hasOptionals = method.params
              .map((param) => {
                return param.optional || false;
              })
              .reduce((hasOptional, arg) => {
                return (hasOptional || arg);
              }, false);

            if (hasOptionals === true) {
              nonOptionalParams.push('options');
            }

            if (nonOptionalParams.length === 0) {
              nonOptionalParams.push('');
            }
            expect(getFunctionArgumentNames(owm[method.name])).to.have.members(nonOptionalParams);
            expect(owm[method.name]).to.be.an('function');
          }));

          testSuite.addSuite(methodSuite);
        }

        apiSuite.addSuite(testSuite);
      }

      const sendRequestSuite = new Suite('sendRequest functional tests');

      sendRequestSuite.addTest(new Test('sendRequest exists', () => {
        const owm = new OpenWeatherMap.OpenWeatherMap({ apiToken: 'test' });
        expect(owm.sendRequest).to.not.be.equal(undefined);
        expect(owm.sendRequest).to.be.an('function');
      }));

      apiSuite.addSuite(sendRequestSuite);

      const parsePartialDateTimeSuite = new Suite('parsePartialDateTime functional tests');

      parsePartialDateTimeSuite.addTest(new Test('parsePartialDateTime exists', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const parsePartialDateTime = airPollution.__get__('parsePartialDateTime');

        expect(parsePartialDateTime).to.not.be.equal(undefined);
        expect(parsePartialDateTime).to.be.an('function');
        done();
      }));

      parsePartialDateTimeSuite.addTest(new Test('parsePartialDateTime no datetime data', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const parsePartialDateTime = airPollution.__get__('parsePartialDateTime');

        const result = parsePartialDateTime({});

        expect(result).to.not.be.equal(undefined);
        expect(result).to.be.equal(null);
        done();
      }));

      parsePartialDateTimeSuite.addTest(new Test('parsePartialDateTime only year data', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const parsePartialDateTime = airPollution.__get__('parsePartialDateTime');

        const result = parsePartialDateTime({ year: 2017 });

        expect(result).to.not.be.equal(undefined);
        expect(result).to.not.be.equal(null);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017Z');
        done();
      }));

      parsePartialDateTimeSuite.addTest(new Test('parsePartialDateTime year-month data', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const parsePartialDateTime = airPollution.__get__('parsePartialDateTime');

        const result = parsePartialDateTime({ year: 2017, month: 12 });

        expect(result).to.not.be.equal(undefined);
        expect(result).to.not.be.equal(null);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017-12Z');
        done();
      }));

      parsePartialDateTimeSuite.addTest(new Test('parsePartialDateTime year-month-day data', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const parsePartialDateTime = airPollution.__get__('parsePartialDateTime');

        const result = parsePartialDateTime({ year: 2017, month: 12, day: 24 });

        expect(result).to.not.be.equal(undefined);
        expect(result).to.not.be.equal(null);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017-12-24Z');
        done();
      }));

      parsePartialDateTimeSuite.addTest(new Test('parsePartialDateTime year-month-dayThour data', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const parsePartialDateTime = airPollution.__get__('parsePartialDateTime');

        const result = parsePartialDateTime({
          year: 2017,
          month: 12,
          day: 24,
          hour: 16
        });

        expect(result).to.not.be.equal(undefined);
        expect(result).to.not.be.equal(null);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017-12-24T16Z');
        done();
      }));

      parsePartialDateTimeSuite.addTest(new Test('parsePartialDateTime year-month-dayThour:minute data', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const parsePartialDateTime = airPollution.__get__('parsePartialDateTime');

        const result = parsePartialDateTime({
          year: 2017,
          month: 12,
          day: 24,
          hour: 16,
          minute: 38
        });

        expect(result).to.not.be.equal(undefined);
        expect(result).to.not.be.equal(null);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017-12-24T16:38Z');
        done();
      }));

      parsePartialDateTimeSuite.addTest(new Test('parsePartialDateTime year-month-dayThour:minute:second data', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const parsePartialDateTime = airPollution.__get__('parsePartialDateTime');

        const result = parsePartialDateTime({
          year: 2017,
          month: 12,
          day: 24,
          hour: 16,
          minute: 38,
          second: 32
        });

        expect(result).to.not.be.equal(undefined);
        expect(result).to.not.be.equal(null);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017-12-24T16:38:32Z');
        done();
      }));

      parsePartialDateTimeSuite.addTest(new Test('parsePartialDateTime all terms missing month data', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const parsePartialDateTime = airPollution.__get__('parsePartialDateTime');

        const result = parsePartialDateTime({
          year: 2017,
          day: 24,
          hour: 16,
          minute: 38,
          second: 32
        });

        expect(result).to.not.be.equal(undefined);
        expect(result).to.not.be.equal(null);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017Z');
        done();
      }));

      parsePartialDateTimeSuite.addTest(new Test('parsePartialDateTime all terms missing minute data', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const parsePartialDateTime = airPollution.__get__('parsePartialDateTime');

        const result = parsePartialDateTime({
          year: 2017,
          month: 12,
          day: 24,
          hour: 16,
          second: 32
        });

        expect(result).to.not.be.equal(undefined);
        expect(result).to.not.be.equal(null);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017-12-24T16Z');
        done();
      }));

      apiSuite.addSuite(parsePartialDateTimeSuite);

      const formatDateTimeSuite = new Suite('formatDateTime functional tests');

      formatDateTimeSuite.addTest(new Test('formatDateTime exists', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const formatDateTime = airPollution.__get__('formatDateTime');

        expect(formatDateTime).to.not.be.equal(undefined);
        expect(formatDateTime).to.be.an('function');
        done();
      }));

      formatDateTimeSuite.addTest(new Test('formatDateTime returns null', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const formatDateTime = airPollution.__get__('formatDateTime');

        const result = formatDateTime({});

        expect(result).to.not.be.equal(undefined);
        expect(result).to.be.equal(null);
        done();
      }));

      formatDateTimeSuite.addTest(new Test('formatDateTime using moment', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const formatDateTime = airPollution.__get__('formatDateTime');

        const result = formatDateTime(moment('2017-12-24T16:47:03Z'));

        expect(result).to.not.be.equal(undefined);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017-12-24T16:47:03.000Z');
        done();
      }));

      formatDateTimeSuite.addTest(new Test('formatDateTime using native Date', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const formatDateTime = airPollution.__get__('formatDateTime');

        const result = formatDateTime(new Date(1514134023000)); // is '2017-12-24T16:47:03.000Z'

        expect(result).to.not.be.equal(undefined);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017-12-24T16:47:03.000Z');
        done();
      }));

      formatDateTimeSuite.addTest(new Test('formatDateTime using partial date object', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const formatDateTime = airPollution.__get__('formatDateTime');

        const result = formatDateTime({ year: 2017, month: 12, day: 24 });

        expect(result).to.not.be.equal(undefined);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017-12-24Z');
        done();
      }));

      formatDateTimeSuite.addTest(new Test('formatDateTime using manual string', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const formatDateTime = airPollution.__get__('formatDateTime');

        const result = formatDateTime('2017-12-24T16:47:03.000Z');

        expect(result).to.not.be.equal(undefined);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('2017-12-24T16:47:03.000Z');
        done();
      }));

      apiSuite.addSuite(formatDateTimeSuite);

      const formatCoordinatesSuite = new Suite('formatCoordinates functional tests');

      formatCoordinatesSuite.addTest(new Test('formatCoordinates exists', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const formatCoordinates = airPollution.__get__('formatCoordinates');

        expect(formatCoordinates).to.not.be.equal(undefined);
        expect(formatCoordinates).to.be.an('function');
        done();
      }));

      formatCoordinatesSuite.addTest(new Test('formatCoordinates returns null on empty input', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const formatCoordinates = airPollution.__get__('formatCoordinates');

        const result = formatCoordinates();

        expect(result).to.not.be.equal(undefined);
        expect(result).to.be.equal(null);
        done();
      }));

      formatCoordinatesSuite.addTest(new Test('formatCoordinates returns null on empty object', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const formatCoordinates = airPollution.__get__('formatCoordinates');

        const result = formatCoordinates({});

        expect(result).to.not.be.equal(undefined);
        expect(result).to.be.equal(null);
        done();
      }));

      formatCoordinatesSuite.addTest(new Test('formatCoordinates returns string with coordinates', (done) => {
        const airPollution = rewire('../../lib/airPollution');
        const formatCoordinates = airPollution.__get__('formatCoordinates');

        const result = formatCoordinates({ latitude: 12.3456, longitude: 7.89 });

        expect(result).to.not.be.equal(undefined);
        expect(result).to.be.an('string');
        expect(result).to.be.equal('12.3456,7.89');
        done();
      }));

      apiSuite.addSuite(formatCoordinatesSuite);

      return apiSuite;
    });
};
