function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(59.8938549, 10.7851166),
        zoom: 12
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

    var position = new google.maps.LatLng(59.9078308, 10.7594424);
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: "Visma Consulting AS"
    });
    marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);