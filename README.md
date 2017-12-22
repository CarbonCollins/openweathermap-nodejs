# openweathermap-nodejs

[![GitHub issues](https://img.shields.io/github/issues/CarbonCollins/openweathermap-nodejs.svg?style=flat)](https://github.com/CarbonCollins/openweathermap-nodejs/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/CarbonCollins/openweathermap-nodejs/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/CarbonCollins/openweathermap-nodejs/all.svg?style=flat)]()
[![David](https://img.shields.io/david/CarbonCollins/openweathermap-nodejs.svg?style=flat)]()
[![David](https://img.shields.io/david/dev/CarbonCollins/openweathermap-nodejs.svg?style=flat)]()
[![Maintainability](https://api.codeclimate.com/v1/badges/43a787592df39cb2fb44/maintainability)](https://codeclimate.com/github/CarbonCollins/openweathermap-nodejs/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/43a787592df39cb2fb44/test_coverage)](https://codeclimate.com/github/CarbonCollins/openweathermap-nodejs/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/carboncollins/openweathermap-nodejs/badge.svg)](https://snyk.io/test/github/carboncollins/openweathermap-nodejs)

An abstraction layer for the (openweathermap.org) APIs.

Currently only the current weather, 5day forecast, 16day forecast, and UV Index apis have been added

## install

```
npm install openweathermap-apis
```

## usage

To use this package you can either import an individual api or import all of the apis into your application. For an individual module you can use:

```
import Weather from 'OpenWeatherMap/api';
```
or 
```
const { Weather } = require('openweathermap-api);
```

If you want to import all of the modules just use:

```
const OWM = require('openweathermap-api');
```

Once imported you need to create a client instance where wou would provide an api key for it to use:

```
const { Weather } = require('openweathermap-api');

const client = new Weather({
  apiKey: '{yourAPPIDFromopenweathermap.org}'
});
```
The available APIs are listed in the [API Docs Page as all of the static members of the module](./docs/api.md#module_OpenWeatherMap/api). If however you have imported all of the apis into a single object then you will have full access to all methods as if you had imported only a single one.

## api documentation

The documentation can be found on the [API Docs Page](./docs/api.md)
