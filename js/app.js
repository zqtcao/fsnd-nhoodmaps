var map;

function AppViewModel() {
	function initMap() {
		
		var self = this;
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 34.0618214, lng: -118.0786024},
			styles: styles,
			zoom: 14
		});
		var largeInfowindow = new google.maps.InfoWindow();
		var bounds = new google.maps.LatLngBounds();
		var markers = [];
		// The following group uses the location array to create an array of markers on initialize.
		for (var i = 0; i < places.length; i++) {
			// Get the position from the location array.
			var position = places[i].location;
			var title = places[i].title;
			// Create a marker per location, and put into markers array.
			var marker = new google.maps.Marker({
				map: map,
				position: position,
				title: title,
				animation: google.maps.Animation.DROP,
				id: i
			});
			// Push the marker to our array of markers.
			markers.push(marker);
			// Create an onclick event to open an infowindow at each marker.
			marker.addListener('click', function() {
				populateInfoWindow(this, largeInfowindow);
			});
			bounds.extend(markers[i].position);
        }
        // Extend the boundaries of the map for each marker
		map.fitBounds(bounds);
	
		function populateInfoWindow(marker, infowindow) {
			// Check to make sure the infowindow is not already opened on this marker.
			if (infowindow.marker != marker) {
				infowindow.marker = marker;
				infowindow.setContent('<div>' + marker.title + '</div>');
				infowindow.open(map, marker);
				// Make sure the marker property is cleared if the infowindow is closed.
				infowindow.addListener('closeclick',function(){
					infowindow.setMarker = null;
				});
			}
		}
	}
}

ko.applyBindings(new AppViewModel());