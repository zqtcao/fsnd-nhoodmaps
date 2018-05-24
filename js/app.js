var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 34.0618214, lng: -118.0786024},
		zoom: 13
	});
}