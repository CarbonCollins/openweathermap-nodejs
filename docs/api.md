## Modules

<dl>
<dt><a href="#module_OpenWeatherMap/api">OpenWeatherMap/api</a></dt>
<dd><p>The OpenWeatherMap/api module acts as an abstraction layer for accessing the
various OpenWeatherMap APIs.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#CityIDReqParams">CityIDReqParams</a> : <code>Object</code></dt>
<dd><p>an object of parameters used to identify a location using a citys ID</p>
</dd>
<dt><a href="#CityNameReqParams">CityNameReqParams</a> : <code>Object</code></dt>
<dd><p>an object of parameters used to identify a location using a citys name</p>
</dd>
<dt><a href="#LatLonReqParams">LatLonReqParams</a> : <code>Object</code></dt>
<dd><p>an object of parameters used to identify a location using a citys name</p>
</dd>
<dt><a href="#ZipReqParams">ZipReqParams</a> : <code>Object</code></dt>
<dd><p>an object of parameters used to identify a location using a citys name</p>
</dd>
<dt><a href="#Coordinate">Coordinate</a> : <code>Object</code></dt>
<dd><p>a coordinate object containing a longitute and latitude for positioning</p>
</dd>
<dt><a href="#PartialDate">PartialDate</a> : <code>Object</code></dt>
<dd><p>an object containign partial date time data</p>
</dd>
<dt><a href="#PollutionParams">PollutionParams</a> : <code>Object</code></dt>
<dd><p>an object of parameters used in the pollution apis</p>
</dd>
</dl>

<a name="module_OpenWeatherMap/api"></a>

## OpenWeatherMap/api
The OpenWeatherMap/api module acts as an abstraction layer for accessing the
various OpenWeatherMap APIs.

**See**: [https://openweathermap.org/api](https://openweathermap.org/api)  

* [OpenWeatherMap/api](#module_OpenWeatherMap/api)
    * [.OpenWeatherMap](#module_OpenWeatherMap/api.OpenWeatherMap)
        * [new OpenWeatherMap(options)](#new_module_OpenWeatherMap/api.OpenWeatherMap_new)
    * [.AirPollution](#module_OpenWeatherMap/api.AirPollution) ⇐ [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)
        * [new AirPollution()](#new_module_OpenWeatherMap/api.AirPollution_new)
        * [~carbonMonoxide(params)](#module_OpenWeatherMap/api.AirPollution..carbonMonoxide) ⇒ <code>Promise</code>
        * [~ozone(params)](#module_OpenWeatherMap/api.AirPollution..ozone) ⇒ <code>Promise</code>
        * [~sulfurDioxide(params)](#module_OpenWeatherMap/api.AirPollution..sulfurDioxide) ⇒ <code>Promise</code>
        * [~nitrogenDioxide(params)](#module_OpenWeatherMap/api.AirPollution..nitrogenDioxide) ⇒ <code>Promise</code>
    * [.UVIndex](#module_OpenWeatherMap/api.UVIndex) ⇐ [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)
        * [new UVIndex()](#new_module_OpenWeatherMap/api.UVIndex_new)
        * [~UVIndex(params)](#module_OpenWeatherMap/api.UVIndex..UVIndex) ⇒ <code>Promise</code>
    * [.Weather](#module_OpenWeatherMap/api.Weather) ⇐ [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)
        * [new Weather(options)](#new_module_OpenWeatherMap/api.Weather_new)
        * [~now(params)](#module_OpenWeatherMap/api.Weather..now) ⇒ <code>Promise</code>
        * [~forecast(params)](#module_OpenWeatherMap/api.Weather..forecast) ⇒ <code>Promise</code>
        * [~dailyForecast(params)](#module_OpenWeatherMap/api.Weather..dailyForecast) ⇒ <code>Promise</code>


* * *

<a name="module_OpenWeatherMap/api.OpenWeatherMap"></a>

### OpenWeatherMap/api.OpenWeatherMap
**Kind**: static class of [<code>OpenWeatherMap/api</code>](#module_OpenWeatherMap/api)  

* * *

<a name="new_module_OpenWeatherMap/api.OpenWeatherMap_new"></a>

#### new OpenWeatherMap(options)
contains the core functionality between all of the APIs such as request functions and
key storage. This class is intended to be extended or have mixins applied to add the
functionality of the different APIs


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.apiKey | <code>String</code> |  | the APPID supplied by openweathermap.org |
| [options.language] | <code>String</code> |  | an optional 2 letter language code e.g. 'en' |
| [options.host] | <code>String</code> | <code>api.openweathermap.org</code> | an optional hostname for the api to connect to. |
| [options.port] | <code>String</code> \| <code>Number</code> | <code>80</code> | an optional port to use for the api |


* * *

<a name="module_OpenWeatherMap/api.AirPollution"></a>

### OpenWeatherMap/api.AirPollution ⇐ [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)
**Kind**: static class of [<code>OpenWeatherMap/api</code>](#module_OpenWeatherMap/api)  
**Extends**: [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)  
**See**: [https://openweathermap.org/](https://openweathermap.org/)  

* [.AirPollution](#module_OpenWeatherMap/api.AirPollution) ⇐ [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)
    * [new AirPollution()](#new_module_OpenWeatherMap/api.AirPollution_new)
    * [~carbonMonoxide(params)](#module_OpenWeatherMap/api.AirPollution..carbonMonoxide) ⇒ <code>Promise</code>
    * [~ozone(params)](#module_OpenWeatherMap/api.AirPollution..ozone) ⇒ <code>Promise</code>
    * [~sulfurDioxide(params)](#module_OpenWeatherMap/api.AirPollution..sulfurDioxide) ⇒ <code>Promise</code>
    * [~nitrogenDioxide(params)](#module_OpenWeatherMap/api.AirPollution..nitrogenDioxide) ⇒ <code>Promise</code>


* * *

<a name="new_module_OpenWeatherMap/api.AirPollution_new"></a>

#### new AirPollution()
A collection of air pollution APIs provided by openweathermap.org.
Additional constructor options can be found in the [GET]
[OpenWeatherMap](#module_OpenWeatherMap/api.OpenWeatherMap) class


* * *

<a name="module_OpenWeatherMap/api.AirPollution..carbonMonoxide"></a>

#### AirPollution~carbonMonoxide(params) ⇒ <code>Promise</code>
gets the carbon monoxide polution levels at a location and datetime [GET]

**Kind**: inner method of [<code>AirPollution</code>](#module_OpenWeatherMap/api.AirPollution)  
**Returns**: <code>Promise</code> - the http request promise which will resolve with the carbon monoxide data
or reject with an error  
**Access**: public  
**See**: [https://openweathermap.org/api/pollution/co](https://openweathermap.org/api/pollution/co)  

| Param | Type |
| --- | --- |
| params | [<code>PollutionParams</code>](#PollutionParams) | 


* * *

<a name="module_OpenWeatherMap/api.AirPollution..ozone"></a>

#### AirPollution~ozone(params) ⇒ <code>Promise</code>
gets the current ozone thickness at a location and datetime [GET]

**Kind**: inner method of [<code>AirPollution</code>](#module_OpenWeatherMap/api.AirPollution)  
**Returns**: <code>Promise</code> - the http request promise which will resolve with the carbon monoxide data
or reject with an error  
**Access**: public  
**See**: [https://openweathermap.org/api/pollution/o3](https://openweathermap.org/api/pollution/o3)  

| Param | Type |
| --- | --- |
| params | [<code>PollutionParams</code>](#PollutionParams) | 


* * *

<a name="module_OpenWeatherMap/api.AirPollution..sulfurDioxide"></a>

#### AirPollution~sulfurDioxide(params) ⇒ <code>Promise</code>
gets the current sulfur dioxide polution at a location and datetime [GET]

**Kind**: inner method of [<code>AirPollution</code>](#module_OpenWeatherMap/api.AirPollution)  
**Returns**: <code>Promise</code> - the http request promise which will resolve with the sulfur dioxide data
or reject with an error  
**Access**: public  
**See**: [https://openweathermap.org/api/pollution/so2](https://openweathermap.org/api/pollution/so2)  

| Param | Type |
| --- | --- |
| params | [<code>PollutionParams</code>](#PollutionParams) | 


* * *

<a name="module_OpenWeatherMap/api.AirPollution..nitrogenDioxide"></a>

#### AirPollution~nitrogenDioxide(params) ⇒ <code>Promise</code>
gets the current nitrogen dioxide polution at a location and datetime [GET]

**Kind**: inner method of [<code>AirPollution</code>](#module_OpenWeatherMap/api.AirPollution)  
**Returns**: <code>Promise</code> - the http request promise which will resolve with the nitrogen dioxide
data or reject with an error  
**Access**: public  
**See**: [https://openweathermap.org/api/pollution/no2](https://openweathermap.org/api/pollution/no2)  

| Param | Type |
| --- | --- |
| params | [<code>PollutionParams</code>](#PollutionParams) | 


* * *

<a name="module_OpenWeatherMap/api.UVIndex"></a>

### OpenWeatherMap/api.UVIndex ⇐ [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)
**Kind**: static class of [<code>OpenWeatherMap/api</code>](#module_OpenWeatherMap/api)  
**Extends**: [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)  
**See**: [https://openweathermap.org/](https://openweathermap.org/)  

* [.UVIndex](#module_OpenWeatherMap/api.UVIndex) ⇐ [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)
    * [new UVIndex()](#new_module_OpenWeatherMap/api.UVIndex_new)
    * [~UVIndex(params)](#module_OpenWeatherMap/api.UVIndex..UVIndex) ⇒ <code>Promise</code>


* * *

<a name="new_module_OpenWeatherMap/api.UVIndex_new"></a>

#### new UVIndex()
A collection of UV Index APIs provided by openweathermap.org.
Additional constructor options can be found in the [GET]
[OpenWeatherMap](#module_OpenWeatherMap/api.OpenWeatherMap) class


* * *

<a name="module_OpenWeatherMap/api.UVIndex..UVIndex"></a>

#### UVIndex~UVIndex(params) ⇒ <code>Promise</code>
gets the current UV Index at a location at the current time [GET]

**Kind**: inner method of [<code>UVIndex</code>](#module_OpenWeatherMap/api.UVIndex)  
**Returns**: <code>Promise</code> - the http request promise which will resolve with the current weather or
reject with an error  
**Access**: public  
**See**: [https://openweathermap.org/current](https://openweathermap.org/current)  

| Param | Type |
| --- | --- |
| params | [<code>CityIDReqParams</code>](#CityIDReqParams) \| [<code>CityNameReqParams</code>](#CityNameReqParams) \| [<code>LatLonReqParams</code>](#LatLonReqParams) \| [<code>ZipReqParams</code>](#ZipReqParams) | 


* * *

<a name="module_OpenWeatherMap/api.Weather"></a>

### OpenWeatherMap/api.Weather ⇐ [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)
**Kind**: static class of [<code>OpenWeatherMap/api</code>](#module_OpenWeatherMap/api)  
**Extends**: [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)  
**See**: [https://openweathermap.org/](https://openweathermap.org/)  

* [.Weather](#module_OpenWeatherMap/api.Weather) ⇐ [<code>OpenWeatherMap</code>](#module_OpenWeatherMap/api.OpenWeatherMap)
    * [new Weather(options)](#new_module_OpenWeatherMap/api.Weather_new)
    * [~now(params)](#module_OpenWeatherMap/api.Weather..now) ⇒ <code>Promise</code>
    * [~forecast(params)](#module_OpenWeatherMap/api.Weather..forecast) ⇒ <code>Promise</code>
    * [~dailyForecast(params)](#module_OpenWeatherMap/api.Weather..dailyForecast) ⇒ <code>Promise</code>


* * *

<a name="new_module_OpenWeatherMap/api.Weather_new"></a>

#### new Weather(options)
A collection of Weather APIs provided by openweathermap.org.
Additional constructor options can be found in the
[OpenWeatherMap](#module_OpenWeatherMap/api.OpenWeatherMap) class


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| [options.units] | <code>String</code> | default uses kelvin, can also specify 'metric' for centegrade and 'imprerial' for Fahrenheit. |


* * *

<a name="module_OpenWeatherMap/api.Weather..now"></a>

#### Weather~now(params) ⇒ <code>Promise</code>
gets the current weather at a location at the current time [GET]

**Kind**: inner method of [<code>Weather</code>](#module_OpenWeatherMap/api.Weather)  
**Returns**: <code>Promise</code> - the http request promise which will resolve with the current weather
or reject with an error  
**Access**: public  
**See**: [https://openweathermap.org/current](https://openweathermap.org/current)  

| Param | Type |
| --- | --- |
| params | [<code>CityIDReqParams</code>](#CityIDReqParams) \| [<code>CityNameReqParams</code>](#CityNameReqParams) \| [<code>LatLonReqParams</code>](#LatLonReqParams) \| [<code>ZipReqParams</code>](#ZipReqParams) | 


* * *

<a name="module_OpenWeatherMap/api.Weather..forecast"></a>

#### Weather~forecast(params) ⇒ <code>Promise</code>
gets a forecast for the next 5 days in 3 hour intervals [GET]

**Kind**: inner method of [<code>Weather</code>](#module_OpenWeatherMap/api.Weather)  
**Returns**: <code>Promise</code> - the http request promise which will resolve with the 5 day forecast
weather or reject with an error  
**Access**: public  
**See**: [https://openweathermap.org/forecast5](https://openweathermap.org/forecast5)  

| Param | Type |
| --- | --- |
| params | [<code>CityIDReqParams</code>](#CityIDReqParams) \| [<code>CityNameReqParams</code>](#CityNameReqParams) \| [<code>LatLonReqParams</code>](#LatLonReqParams) \| [<code>ZipReqParams</code>](#ZipReqParams) | 


* * *

<a name="module_OpenWeatherMap/api.Weather..dailyForecast"></a>

#### Weather~dailyForecast(params) ⇒ <code>Promise</code>
gets a daily forecast for up to 16 days in the future (paid accounts only) [GET]

**Kind**: inner method of [<code>Weather</code>](#module_OpenWeatherMap/api.Weather)  
**Returns**: <code>Promise</code> - the http request promise which will resolve with the 16 day forecast
weather or reject with an error  
**Access**: public  
**See**: [https://openweathermap.org/forecast16](https://openweathermap.org/forecast16)  

| Param | Type |
| --- | --- |
| params | [<code>CityIDReqParams</code>](#CityIDReqParams) \| [<code>CityNameReqParams</code>](#CityNameReqParams) \| [<code>LatLonReqParams</code>](#LatLonReqParams) \| [<code>ZipReqParams</code>](#ZipReqParams) | 


* * *

<a name="CityIDReqParams"></a>

## CityIDReqParams : <code>Object</code>
an object of parameters used to identify a location using a citys ID

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> \| <code>Number</code> | the city ID to be used in the query |
| days | <code>String</code> \| <code>Number</code> | optional number of days to return in the forecast (used in dailyForecast alias for cnt) |
| hours | <code>String</code> \| <code>Number</code> | optional number of hours to return in the forecast (used in forecast alias for cnt) |


* * *

<a name="CityNameReqParams"></a>

## CityNameReqParams : <code>Object</code>
an object of parameters used to identify a location using a citys name

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| city | <code>String</code> | the city name to use in the query e.g. 'london' (best used with country also set) |
| country | <code>String</code> | optional 2 letter country code to use in the query e.g. 'en' |
| days | <code>String</code> \| <code>Number</code> | optional number of days to return in the forecast (used in dailyForecast alias for cnt) |
| hours | <code>String</code> \| <code>Number</code> | optional number of hours to return in the forecast (used in forecast alias for cnt) |


* * *

<a name="LatLonReqParams"></a>

## LatLonReqParams : <code>Object</code>
an object of parameters used to identify a location using a citys name

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| coordinates | [<code>Coordinate</code>](#Coordinate) | a coordinate object used for searching based on latlon (use on its own) |
| days | <code>String</code> \| <code>Number</code> | optional number of days to return in the forecast (used in dailyForecast alias for cnt) |
| hours | <code>String</code> \| <code>Number</code> | optional number of hours to return in the forecast (used in forecast alias for cnt) |


* * *

<a name="ZipReqParams"></a>

## ZipReqParams : <code>Object</code>
an object of parameters used to identify a location using a citys name

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| zip | <code>String</code> \| <code>Number</code> | the zip code to use within the query (US by default unless country is specified) |
| postcode | <code>String</code> \| <code>Number</code> | an alias to zip (use either zip or postcode) |
| country | <code>String</code> | optional 2 letter country code to use in the query e.g. 'en' |
| days | <code>String</code> \| <code>Number</code> | optional number of days to return in the forecast (used in dailyForecast alias for cnt) |
| hours | <code>String</code> \| <code>Number</code> | optional number of hours to return in the forecast (used in forecast alias for cnt) |


* * *

<a name="Coordinate"></a>

## Coordinate : <code>Object</code>
a coordinate object containing a longitute and latitude for positioning

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| latitude | <code>String</code> \| <code>Number</code> | the latitude of the position |
| longitude | <code>String</code> \| <code>Number</code> | the longitude of the position |


* * *

<a name="PartialDate"></a>

## PartialDate : <code>Object</code>
an object containign partial date time data

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| hour | <code>String</code> \| <code>Number</code> | 
| month | <code>String</code> \| <code>Number</code> | 
| day | <code>String</code> \| <code>Number</code> | 
| hour | <code>String</code> \| <code>Number</code> | 
| minute | <code>String</code> \| <code>Number</code> | 
| second | <code>String</code> \| <code>Number</code> | 


* * *

<a name="PollutionParams"></a>

## PollutionParams : <code>Object</code>
an object of parameters used in the pollution apis

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| coordinates | [<code>Coordinate</code>](#Coordinate) | the position to check for poillutants |
| datetime | <code>Moment</code> \| <code>Date</code> \| [<code>PartialDate</code>](#PartialDate) \| <code>String</code> | accepts a Moment object, a native Date object, a custom PartialDate object which allows for date ranges to be defined (as per the documentation), or a manualy formatted ISO TZ time string (would recomend the other options though) |


* * *

