//Class that represents a particular location
function MapLocation(name, id, isFavorite = false) {
    var self = this;
    self.name = name;
    self.id = id;
    self.isFavorite = isFavorite;
    self.isSelected = false;

    self.toggleFavorite = function () {
        self.isFavorite = !self.isFavorite;
    }

    self.toggleSelected = function () {
        self.isSelected = !self.isSelected;
    }
}

function MapsViewModel() {
    var self = this;

    self.markers = [];
    self.largeInfowindow = new google.maps.InfoWindow();
    self.searchFilter = ko.observable('');
    //self.filteredLocList = ko.observableArray();

    self.populateInfoWindow = function (marker, infowindow) {

        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;

            var fsPlaceUrl = 'https://api.foursquare.com/v2/venues/search?ll=' +
                marker.lat + ',' + marker.lng +
                '&query=' + marker.title +
                '&client_id=' + fsClientID +
                '&client_secret=' + fsClientSecret +
                '&limit=1&v=20180609';

            //Foursquare API call
            $.getJSON(fsPlaceUrl, function (marker) {
                var venueResponse = marker.response.venues[0];
                var locName = venueResponse.name;
                var locAddressLine1 = venueResponse.location.formattedAddress[0];
                var locAddressLine2 = venueResponse.location.formattedAddress[1];

                infowindow.setContent('<div><h4>' + locName + '</h4>' +
                    '<h5>' + locAddressLine1 + '</h5><h5>' + locAddressLine2 + '</h5>' +
                    '<br><img src="img/Powered-by-Foursquare-full-color-300.png"></div>');
            }).fail(function () {
                infowindow.setContent('<div><h4>' + fsErr + '</h4></div>');
            });

            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.setMarker = null;
            });
        }
    }


    self.initMap = function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 34.0618214,
                lng: -118.0786024
            },
            styles: styles,
            zoom: 14
        });

        var bounds = new google.maps.LatLngBounds();
        // The following group uses the places array to create an array of markers on initialize.
        for (var i = 0; i < places.length; i++) {
            // Get the position from the places array.
            var position = places[i].location;
            var title = places[i].title;
            var lat = position.lat;
            var lng = position.lng;
            // Create a marker per place, and put into markers array.
            var marker = new google.maps.Marker({
                map: map,
                position: position,
                title: title,
                lat: lat,
                lng: lng,
                animation: google.maps.Animation.DROP,
                id: i
            });
            // Push the marker to our markers array
            self.markers.push(marker);
            // Create an onclick event to open an infowindow at each marker.
            marker.addListener('click', function () {
                self.populateInfoWindow(this, self.largeInfowindow);
            });
            bounds.extend(self.markers[i].position);
        }
        // Extend the boundaries of the map for each marker
        map.fitBounds(bounds);
    }

    self.initMap();

    self.toggleLocItem = function () {
        var thisMarker = self.markers[this.id];
        if (thisMarker.getAnimation() !== null) {
            thisMarker.setAnimation(null);
        } else {
            thisMarker.setAnimation(google.maps.Animation.BOUNCE);
            //stop bounce animation after a cycle
            setTimeout(function () {
                thisMarker.setAnimation(null);
            }, 700);
            self.populateInfoWindow(thisMarker, self.largeInfowindow);
        }
    }

    self.filteredLocList = ko.computed(function () {
        var filteredList = [];

        for (var i = 0; i < self.markers.length; i++) {
            if (self.markers[i].title.toLowerCase().includes(this.searchFilter().toLowerCase())) {
                filteredList.push(new MapLocation(self.markers[i].title, i));
                self.markers[i].setVisible(true);
            }
            //if there is no match with the search, hide this element
            else {
                self.markers[i].setVisible(false);
            }
        }
        return filteredList;
    }, this);

}

function mapAPIError() {
    $("#map").html(gmapsErr);
}

function runApp() {
    ko.applyBindings(new MapsViewModel());
}

//Handles toggling the hide/unhide of the location list
$(document).ready(function () {
    $('#locListCollapse').on('click', function () {
        console.log("togglin sidebar!");
        $('#locList').toggleClass('hide');
        $('#mapArea').toggleClass('col-xs-12 col-xs-9');
    });
});
