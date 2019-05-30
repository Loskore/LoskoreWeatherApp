(function() {

    var app = angular.module('WeatherApp')
        .constant('appId', 'ecb1f756686518281c429bf5b7498d70')
        .factory("weatherService", ['$http', '$log', '$q', 'appId',
            function weatherService($http, $log, $q, appId) {

                var getWeather = function getWeather(location) {
                    $log.info("Retrieving weather for " + location);
                    return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + location +
                            '&appid=' + appId)
                        .then(function sendResponseData(response) {
                            // Success
                            $log.info("Retrieved weather for " + location);
                            var data = response.data;
                            return {
                                City: data.name,
                                Condition: data.weather[0].main,
                                Description: data.weather[0].description,
                                IconUrl: "http://openweathermap.org/img/w/" +
                                    data.weather[0].icon + ".png",
                                Temperatures: GetTemperatures(data.main),
                                Wind: data.wind.speed,
                                Gusts: data.wind.gust,
                                Humidity: data.main.humidity
                            }
                        }).catch(function(response) {
                            $log.error('HTTP request error: ' + response.status)
                            return $q.reject('Error: ' + response.status);
                        });
                };
                return {
                    GetWeather: getWeather
                };
            }
        ]);

    // Распоковка данных о температуре
    var GetTemperatures = function GetTemperatures(temps) {
        return [{
            "Units": "Celsius",
            "Current": GetCelsius(temps.temp),
            "Low": GetCelsius(temps.temp_min),
            "High": GetCelsius(temps.temp_max)
        }];
    };

    // Конвертируем температуру в ед. измерения цельсия
    var GetCelsius = function GetCelsius(temp) {
        return temp - 273;
    };

}());