(function() {
    var app = angular.module('WeatherApp', []);
    app.controller('main', ['weatherService',
        function(weatherService) {

            var vm = this;
            vm.Search = function() {
                weatherService.GetWeather($("#currentcity").val())
                    .then(function(data) {

                        // Copy data from the service into the model
                        vm.City = data.City;
                        vm.Condition = data.Condition;
                        vm.Description = data.Description;
                        vm.IconUrl = data.IconUrl;
                        vm.Temperatures = data.Temperatures;
                        vm.Wind = data.Wind;
                        vm.Gusts = data.Gusts;
                        vm.Humidity = data.Humidity;

                        vm.ValidDataLoaded = true;
                    })
                    .catch(function(message) {
                        vm.error = message;
                        vm.ValidDataLoaded = false;
                    });

            };
        }
    ]);

    app.controller('myTimeCtrl', function($scope, $interval) {
        $scope.theTime = new Date().toLocaleTimeString();
        $interval(function() {
            $scope.theTime = new Date().toLocaleTimeString();
        }, 1000);
    });

    app.controller('myCities', function($scope) {
        $scope.cities = [];
        // $scope.currentcity = "";
        //Восстанавливаем города!
        var city_string = "";
        city_string = localStorage.getItem('localcities');
        if (city_string.indexOf(",") > -1) {
            for (var s in city_string.split(",")) {
                $scope.cities.push(city_string.split(",")[s]);
            };
        };
        $scope.addItem = function() {
            $scope.errortext = "";
            if (!$scope.addMe) { return; }
            if ($scope.cities.indexOf($scope.addMe) == -1) {
                $scope.cities.push($scope.addMe);
                $scope.addMe = "";
                localStorage.setItem('localcities', $scope.cities);
            } else {
                $scope.errortext = "\"" + $scope.addMe + "\" уже есть в списке!";
            }
        };
        $scope.removeItem = function(x) {
            $scope.errortext = "";
            $scope.cities.splice(x, 1);
            localStorage.setItem('localcities', $scope.cities);
        };
        $scope.selectCity = function(n) {
            $("#currentcity").val($scope.cities[n]);
        };
    });
}()); // End