## Modules

<dl>
<dt><a href="#module_OpenWeatherMap">OpenWeatherMap</a></dt>
<dd><p>An abstraction layer for accessing the various OpenWeatherMap APIs.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#RequestParameters">RequestParameters</a> : <code>Object</code></dt>
<dd><p>an object of optional parameters used for determining where the weather should be retreived for</p>
</dd>
<dt><a href="#Coordinate">Coordinate</a> : <code>Object</code></dt>
<dd><p>a coordinate object containing a longitute and latitude for positioning</p>
</dd>
</dl>

<a name="module_OpenWeatherMap"></a>

## OpenWeatherMap
An abstraction layer for accessing the various OpenWeatherMap APIs.

**See**: [https://openweathermap.org/api](https://openweathermap.org/api)  

* [OpenWeatherMap](#module_OpenWeatherMap)
    * [.Weather](#module_OpenWeatherMap.Weather)
        * [new Weather(options)](#new_module_OpenWeatherMap.Weather_new)
        * [~now(params)](#module_OpenWeatherMap.Weather..now) ⇒ <code>Promise</code>
        * [~forecast(params)](#module_OpenWeatherMap.Weather..forecast) ⇒ <code>Promise</code>
        * [~dailyForecast(params)](#module_OpenWeatherMap.Weather..dailyForecast) ⇒ <code>Promise</code>

<a name="module_OpenWeatherMap.Weather"></a>

### OpenWeatherMap.Weather
**Kind**: static class of [<code>OpenWeatherMap</code>](#module_OpenWeatherMap)  
**See**: [https://openweathermap.org/](https://openweathermap.org/)  

* [.Weather](#module_OpenWeatherMap.Weather)
    * [new Weather(options)](#new_module_OpenWeatherMap.Weather_new)
    * [~now(params)](#module_OpenWeatherMap.Weather..now) ⇒ <code>Promise</code>
    * [~forecast(params)](#module_OpenWeatherMap.Weather..forecast) ⇒ <code>Promise</code>
    * [~dailyForecast(params)](#module_OpenWeatherMap.Weather..dailyForecast) ⇒ <code>Promise</code>

<a name="new_module_OpenWeatherMap.Weather_new"></a>

#### new Weather(options)
A class for accessing the OpenWeatherMap Weather APIs


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.apiKey | <code>String</code> |  | the api key required to access the OpenWeatherMap API |
| [options.units] | <code>String</code> |  | optional units to use kelvin (leave blank), imperial, or metric |
| [options.language] | <code>String</code> |  | optional language in 2 letter format e.g. 'en' |
| [options.hostname] | <code>String</code> | <code>api.openweathermap.org</code> | optional hostname but will default to the official api url |
| [options.port] | <code>String</code> | <code>80</code> | optional port name but will default to port 80 |

<a name="module_OpenWeatherMap.Weather..now"></a>

#### Weather~now(params) ⇒ <code>Promise</code>
gets the current weather at a location at the current time

**Kind**: inner method of [<code>Weather</code>](#module_OpenWeatherMap.Weather)  
**Returns**: <code>Promise</code> - the http request promise which will resolve with the current weather or reject with an error  
**Access**: public  
**See**: [https://openweathermap.org/current](https://openweathermap.org/current)  

| Param | Type |
| --- | --- |
| params | [<code>RequestParameters</code>](#RequestParameters) | 

<a name="module_OpenWeatherMap.Weather..forecast"></a>

#### Weather~forecast(params) ⇒ <code>Promise</code>
gets a forecast for the next 5 days in 3 hour intervals

**Kind**: inner method of [<code>Weather</code>](#module_OpenWeatherMap.Weather)  
**Returns**: <code>Promise</code> - the http request promise which will resolve with the 5 day forecast weather or reject with an error  
**Access**: public  
**See**: [https://openweathermap.org/forecast5](https://openweathermap.org/forecast5)  

| Param | Type |
| --- | --- |
| params | [<code>RequestParameters</code>](#RequestParameters) | 

<a name="module_OpenWeatherMap.Weather..dailyForecast"></a>

#### Weather~dailyForecast(params) ⇒ <code>Promise</code>
gets a daily forecast for up to 16 days in the future (paid accounts only)

**Kind**: inner method of [<code>Weather</code>](#module_OpenWeatherMap.Weather)  
**Returns**: <code>Promise</code> - the http request promise which will resolve with the 16 day forecast weather or reject with an error  
**Access**: public  
**See**: [https://openweathermap.org/forecast16](https://openweathermap.org/forecast16)  

| Param | Type |
| --- | --- |
| params | [<code>RequestParameters</code>](#RequestParameters) | 

<a name="RequestParameters"></a>

## RequestParameters : <code>Object</code>
an object of optional parameters used for determining where the weather should be retreived for

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> \| <code>Number</code> | the city ID to use in the query (use on its own) |
| city | <code>String</code> | the city name to use in the query e.g. 'london' (best used with country also set) |
| country | <code>String</code> | the 2 letter country code to use in the query e.g. 'en' |
| coordinates | [<code>Coordinate</code>](#Coordinate) | a coordinate object used for searching based on latlon (use on its own) |
| zip | <code>String</code> \| <code>Number</code> | the zip code to use within the query (US by default unless country is specified) |
| postcode | <code>String</code> \| <code>Number</code> | an alias to zip |
| days | <code>String</code> \| <code>Number</code> | number of days to return in the forecast (used only in dailyForecast alias for cnt) |
| hours | <code>String</code> \| <code>Number</code> | number of hours to return in the forecast (used only in forecast alias for cnt) |

<a name="Coordinate"></a>

## Coordinate : <code>Object</code>
a coordinate object containing a longitute and latitude for positioning

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| latitude | <code>String</code> \| <code>Number</code> | the latitude of the position |
| longitude | <code>String</code> \| <code>Number</code> | the longitude of the position |

<a name="parseParameters"></a>

## .parseParameters(params) ⇒ <code>Object</code>
parses the modules parameters into the api parameters

**Kind**: instance function  
**Returns**: <code>Object</code> - returns a query object with the correct formatting when sending the search query  

| Param | Type |
| --- | --- |
| params | [<code>RequestParameters</code>](#RequestParameters) | 

