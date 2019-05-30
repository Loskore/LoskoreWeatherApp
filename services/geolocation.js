'use strict';

function successlocation(position) {
    console.log(position);

    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var google_map_position = new google.maps.LatLng(lat, lng);

    var google_maps_geocoder = new google.maps.Geocoder();

    var city;
    google_maps_geocoder.geocode({ 'latLng': google_map_position },
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    //Найти название города
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        for (var b = 0; b < results[0].address_components[i].types.length; b++) {
                            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                city = results[0].address_components[i];
                                break;
                            }
                        }
                    }
                    //city data
                    if (city) {
                        $("#currentcity").val(city.long_name);
                    }
                } else {
                    alert("No results found");
                }
            }
        }
    );

};

function errorlocation(err) {
    console.log(err)
};