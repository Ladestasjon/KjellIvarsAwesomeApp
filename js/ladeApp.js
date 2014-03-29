/**
 * Created by storskel on 29.03.2014.
 */
angular.module('ladeApp', [])
    .controller("ladeCtrl", function ($scope, $http) {

        var url = "http://nobil.no/api/server/search.php?callback=JSON_CALLBACK";
        $scope.from = "Oslo";

        var route = [];

        $scope.to = "Hamar";

        $scope.radius = '50000';

        var zoomLevel = 12;
        var mapOptions = {
            center: new google.maps.LatLng(59, 10),
            zoom: zoomLevel
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        var geocoder = new google.maps.Geocoder();

        $scope.showChargerStations = function () {
            $scope.getChargerStationsNear($scope.from);
            $scope.getChargerStationsNear($scope.to, true);
        };

        $scope.getChargerStationsNear = function (point, drawRoute) {
            codeAddress(point, function (point) {

                console.log(point);

                point = {
                    lat: point.geometry.location.k,
                    long: point.geometry.location.A
                };

                if (drawRoute) {
                    route.push(point);
                    $scope.drawRoute(route[0], route[1]);

                } else {
                    route = [];
                    route.push(point);

                }

                $http({method: 'JSONP', url: url, params: {
                    'apikey': '17a7a832c2e7bb2b593fbd8f0f68906b',
                    'apiversion': '3',
                    'action': 'search',
                    'type': 'near',
                    'lat': point.lat,
                    'long': point.long,
                    'distance': $scope.radius,
                    'limit': '100'
                }}).
                    success(function (data, status) {
                        $scope.status = status;
                        $scope.data = data;
                        console.log(data);
                        if (data.chargerstations) {
                            angular.forEach(data.chargerstations, function (value, key) {
                                var chargerPos = value.csmd.Position.split(",");
                                chargerPos[0] = chargerPos[0].replace("(", "");
                                chargerPos[1] = chargerPos[1].replace(")", "");

                                var position = new google.maps.LatLng(chargerPos[0], chargerPos[1]);

                                var contentString = '<p><strong>Addresse</strong> ' + value.csmd.Street + ' ' + value.csmd.House_number + '</p>' +
                                    '<p><strong>Navn</strong> ' + value.csmd.name + '</p>' +
                                    '<p><strong>Type</strong> ' + value.attr.conn[1][4].trans + '</p>';

                                var infowindow = new google.maps.InfoWindow({
                                    content: contentString
                                });

                                var marker = new google.maps.Marker({
                                    position: position,
                                    map: map,
                                    title: value.csmd.name
                                });

                                google.maps.event.addListener(marker, 'click', function () {
                                    infowindow.open(map, marker);
                                });
                                marker.setMap(map);
                            });

                        }
                    }).
                    error(function (data, status) {
                        $scope.data = data || "Request failed";
                        $scope.status = status;
                    });
            });
        };

        function codeAddress(address, callback) {

            geocoder.geocode({ 'address': address}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results[0]);
                    callback(results[0]);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }

        $scope.drawRoute = function (from, to) {

            var start = new google.maps.LatLng(from.lat, from.long);
            var end = new google.maps.LatLng(to.lat, to.long);
            var directionRequest = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };

            var directionsDisplay;
            directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);

            var directionsService = new google.maps.DirectionsService();
            directionsService.route(directionRequest, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
                console.log(result);
                var routes = result["routes"];
                var route = routes[0];
                var overviewPath = route["overview_path"];
                console.log(overviewPath);
                console.log(status);
            });

        };

        //google.maps.event.addDomListener(window, 'load', $scope.initMap);
    });
