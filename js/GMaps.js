function initialize() {
    var zoomLevel = 12;
    var mapOptions = {
        center: new google.maps.LatLng(59.8938549, 10.7851166),
        zoom: zoomLevel
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var position = new google.maps.LatLng(59.9078308, 10.7594424);
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: "Visma Consulting AS"
    });
    marker.setMap(map);

    var start = new google.maps.LatLng(59.9078308, 10.7594424);
    var end = new google.maps.LatLng(60.9078308, 10.7594424);
    var directionRequest = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };

    var directionsDisplay;
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    var directionsService = new google.maps.DirectionsService();
    directionsService.route(directionRequest, function(result, status) {
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
}

google.maps.event.addDomListener(window, 'load', initialize);