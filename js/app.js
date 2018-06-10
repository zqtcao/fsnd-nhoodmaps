var map;

//Class that represents a particular location
function MapLocation(name, id, isFavorite = false) {
	var self = this;
	self.name = name;
	self.id = id;
	self.isFavorite = isFavorite;
}

function MapsViewModel() {
	var self = this;
	var markers = [];
	self.mapLocList = ko.observableArray();
	
	this.initMap = function() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 34.0618214, lng: -118.0786024},
			styles: styles,
			zoom: 14
		});
		var largeInfowindow = new google.maps.InfoWindow();
		var bounds = new google.maps.LatLngBounds();
		// The following group uses the location array to create an array of markers on initialize.
		for (var i = 0; i < places.length; i++) {
			// Get the position from the location array.
			var position = places[i].location;
			var title = places[i].title;
			var lat = position.lat;
			var lng = position.lng;
			this.mapLocList.push(new MapLocation(title, i))
			// Create a marker per location, and put into markers array.
			var marker = new google.maps.Marker({
				map: map,
				position: position,
				title: title,
				lat: lat,
				lng: lng,
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
			
			var fsPlaceUrl = "https://api.foursquare.com/v2/venues/search?ll=" 
				+ marker.lat + "," + marker.lng
				+ "&query=" + marker.title
				+ "&client_id=" + fsClientID
				+ "&client_secret=" + fsClientSecret
				+ "&limit=1&v=20180609";
			console.log(fsPlaceUrl);
			// Check to make sure the infowindow is not already opened on this marker.
			if (infowindow.marker != marker) {
				infowindow.marker = marker;
				$.getJSON(fsPlaceUrl, function(marker) {
					var venueResponse = marker.response.venues[0];
					var locName = venueResponse.name;
					var locAddressLine1 = venueResponse.location.formattedAddress[0];
					var locAddressLine2 = venueResponse.location.formattedAddress[1];
					
					infowindow.setContent('<div><h4>' + locName + '</h4>' 
					+ '<h5>' + locAddressLine1 + '</h5><h5>' + locAddressLine2
					+ '</h5><br><img src="img/Powered-by-Foursquare-full-color-300.png"></div>');
				}).fail(function(e){
					infowindow.setContent('<div>' + fsErr + '</div>');
				});
				infowindow.open(map, marker);
				// Make sure the marker property is cleared if the infowindow is closed.
				infowindow.addListener('closeclick',function() {
					infowindow.setMarker = null;
				});
			}
		}
	}
	
	self.initMap();
}

function mapAPIError() {
	$("#map").html(gmapsErr);
}

function runApp() {
	ko.applyBindings(new MapsViewModel());
}