/**
 * Created by storskel on 29.03.2014.
 */
angular.module('ladeApp', [])
    .controller("ladeCtrl", function ($scope, $http) {
        $scope.hello = "Hello!";

        var url = "http://nobil.no/api/server/search.php?callback=JSON_CALLBACK";

        $scope.lat = '59.8938';
        $scope.long = '10.74782';

        $scope.radius = '5000';

        $scope.getChargerStationsNear = function () {

            $http({method: 'JSONP', url: url, params: {
                'apikey': '17a7a832c2e7bb2b593fbd8f0f68906b',
                'apiversion': '3',
                'action': 'search',
                'type': 'near',
                'lat': $scope.lat,
                'long': $scope.long,
                'distance': $scope.radius,
                'limit': '10'
            }}).
                success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                    console.log(data);
                }).
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        };
        $scope.getChargerStationsRectangle = function (long, lat, radius) {
            console.log("long " + long + " lat " + lat + " radius " + radius);

            $http({method: 'JSONP', url: url, params: {
                'apikey': '17a7a832c2e7bb2b593fbd8f0f68906b',
                'apiversion': '3',
                'action': 'search',
                'type': 'rectangle',
                'northeast': '(' + long + ',' + lat + ')',
                'southwest': '(59.883683240905256, 10.650901794433594)',
                'existingids': '189,195,199,89,48'}
            }).
                success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                    console.log(data);
                }).
                error(function (data, status) {
                    $scope.data = data || "Request failed";
                    $scope.status = status;
                });
        };
    });
