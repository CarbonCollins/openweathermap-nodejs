'use strict';

const Mocha = require('mocha');
const Chai = require('chai');

const { Test, Suite } = Mocha;
const { expect } = Chai;

const OpenWeatherMap = require('../../index');

const moduleSuite = new Suite('openweathermap-api-nodejs module tests');

// ----- module export tests ----- //
const exportSuite = new Suite('Export tests');
exportSuite.addTest(new Test('OpenWeatherMap exports class constructor', () => {
  expect(OpenWeatherMap.OpenWeatherMap).to.be.an('function', 'module should export the OpenWeatherMap class constructor');
}));
moduleSuite.addSuite(exportSuite);

// ----- module endpoint tests ----- //
const endpointSuite = new Suite('Endpoint tests');
endpointSuite.addTest(new Test('endpoint defaults to openweathermap.org api url', (done) => {
  try {
    const owm = new OpenWeatherMap.OpenWeatherMap({ apiKey: 'noApiToken' });
    expect(owm.host).to.exist;
    expect(owm.host).to.be.an('string', 'host should be a URL string');
    expect(owm.host).to.be.equal('api.openweathermap.org', 'host URL should be "api.openweathermap.org"');
    expect(owm.port).to.exist;
    expect(owm.port).to.be.an('string', 'port should be a port string');
    expect(owm.port).to.be.equal('80', 'port default should be "80"');
    done();
  } catch (err) {
    done(err);
  }
}));
endpointSuite.addTest(new Test('custom host correctly defined', (done) => {
  try {
    const owm = new OpenWeatherMap.OpenWeatherMap({ apiKey: 'noApiToken', host: 'test' });
    expect(owm.host).to.exist;
    expect(owm.host).to.be.an('string', 'host should be a URL string');
    expect(owm.host).to.be.equal('test', 'host URL should be "test"');
    expect(owm.port).to.exist;
    expect(owm.port).to.be.an('string', 'port should be a port string');
    expect(owm.port).to.be.equal('80', 'port default should be "80"');
    done();
  } catch (err) {
    done(err);
  }
}));
endpointSuite.addTest(new Test('custom port correctly defined', (done) => {
  try {
    const owm = new OpenWeatherMap.OpenWeatherMap({ apiKey: 'noApiToken', port: 1234 });
    expect(owm.host).to.exist;
    expect(owm.host).to.be.an('string', 'host should be a URL string');
    expect(owm.host).to.be.equal('api.openweathermap.org', 'host URL should be "api.openweathermap.org"');
    expect(owm.port).to.exist;
    expect(owm.port).to.be.an('string', 'port should be a port string');
    expect(owm.port).to.be.equal('1234', 'port default should be "1234"');
    done();
  } catch (err) {
    done(err);
  }
}));
moduleSuite.addSuite(endpointSuite);

// ----- api token tests ----- //
const apiTokenSuite = new Suite('API token tests');
apiTokenSuite.addTest(new Test('valid apiKey input', () => {
  const owm = new OpenWeatherMap.OpenWeatherMap({ apiKey: 'noApiToken' });
  expect(owm.apiKey).to.exist;
  expect(owm.apiKey).to.be.an('string', 'apiKey should be a string');
  expect(owm.apiKey).to.be.equal('noApiToken', 'apiKey does not match the inputted apiKey');
}));
apiTokenSuite.addTest(new Test('invalid apiKey input (undefined apiToken)', () => {
  const owm = new OpenWeatherMap.OpenWeatherMap();
  expect(owm.apiKey).to.exist;
  expect(owm.apiKey).to.be.an('string', 'apiKey should be a string');
  expect(owm.apiKey).to.be.equal('', 'apiKey does not match the inputted apiKey');
}));
apiTokenSuite.addTest(new Test('invalid apiToken input (defined empty apiToken)', () => {
  const owm = new OpenWeatherMap.OpenWeatherMap({ apiKey: '' });
  expect(owm.apiKey).to.exist;
  expect(owm.apiKey).to.be.an('string', 'apiKey should be a string');
  expect(owm.apiKey).to.be.equal('', 'apiKey does not match the inputted apiKey');
}));
moduleSuite.addSuite(apiTokenSuite);

module.exports = () => { return moduleSuite; };
