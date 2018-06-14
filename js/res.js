//Google Maps global map variable
var map;

//Foursquare API client ID and secret
var fsClientID = "KTNRGEPOGLCPKF2JO0PEW4KOJ5XGVGDRTYRFYLFAC130EHCT";
var fsClientSecret = "SEQMZO25EEGR3HXQI1MJYTH4F3VNMWI333GVUSN224U03AHH";

//AJAX error messages
var gmapsErr = "Google Maps was unable to load. Refresh and try again";
var fsErr = "Foursquare data loading failed. Refresh and try again";

//List of places to pre-populate markers on the map
var places = [
    {
        title: 'Atlantic Seafood',
        location: {
            lat: 34.069660,
            lng: -118.133884
        }
    },
    {
        title: 'Empress Harbor',
        location: {
            lat: 34.063005,
            lng: -118.134476
        }
    },
    {
        title: 'Ocean Star',
        location: {
            lat: 34.064379,
            lng: -118.134531
        }
    },
    {
        title: 'Capital Dim Sum & BBQ',
        location: {
            lat: 34.063320,
            lng: -118.132902
        }
    },
    {
        title: 'NBC Seafood',
        location: {
            lat: 34.058779,
            lng: -118.133247
        }
    },
    {
        title: 'Monterey Palace',
        location: {
            lat: 34.063257,
            lng: -118.109061
        }
    },
    {
        title: 'Top Island Seafood',
        location: {
            lat: 34.078431,
            lng: -118.115362
        }
    },
    {
        title: 'Five Star Seafood',
        location: {
            lat: 34.077610,
            lng: -118.101969
        }
    }
];

//Google Map custom styles
var styles = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 60
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 40
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 30
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ef8c25"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b6c54c"
            },
            {
                "lightness": 40
            },
            {
                "saturation": -40
            }
        ]
    }
];
