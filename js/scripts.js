// Heavily borrowed and adapted code from Rigel Jarabo and Chris Wong

// 1. Map
// Define position and zoom
var centerMap =[19.409703,-99.142739];
var zoomMap= 12;
// Define the map
var map = L.map('gf-map').setView(centerMap, zoomMap);
// Define the layer for the map
var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'png'
}).addTo(map);

var fheartIcon = L.icon({
		iconUrl: 'img/fheart.png',
		iconSize:     [25, 25], // size of the icon
		shadowSize:   [50, 64], // size of the shadow
		iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62],  // the same for the shadow
		popupAnchor:  [-3, -7] // point from which the popup should open relative to the iconAnchor
});

var bheartIcon = L.icon({
		iconUrl: 'img/bheart.png',
		iconSize:     [25, 25], // size of the icon
		shadowSize:   [50, 64], // size of the shadow
		iconAnchor:   [20,20], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62],  // the same for the shadow
		popupAnchor:  [-3, -7] // point from which the popup should open relative to the iconAnchor
});

var homeIcon = L.icon({
		iconUrl: 'img/home.png',
		iconSize:     [25, 25], // size of the icon
		color: 'green',
		shadowSize:   [50, 64], // size of the shadow
		iconAnchor:   [20,20], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62],  // the same for the shadow
		popupAnchor:  [-3, -7] // point from which the popup should open relative to the iconAnchor
});

	// 3. OPERATING CODE MODIFIED FOR GETPLACES FUNCTION with DYNAMIC ICONS
	getPlaces((places) => {
		places.forEach(function(home) {
		  const latLon = [home.lat, home.lon];

				var dynamicIcon;
				if (home.r_we_cool === 'Nah') dynamicIcon = bheartIcon;
				if (home.r_we_cool === 'Cool') dynamicIcon = fheartIcon;
				if (home.r_we_cool === 'Of course') dynamicIcon = homeIcon;

				L.marker(latLon, {icon:dynamicIcon})
				.bindPopup('Are we cool with' + ' ' + home.gf + '?' + '<br><b>' + home.r_we_cool + '</b>'+' '+'since'+ ' ' + home.year, {offset: [0, -6]})
				.addTo(map);
			});
		});

//Get data from spreadsheet
function getPlaces(callback) {
  $.ajax({
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRn2qchpmAlRGtftH5ragZ3GNYDGHqmFp-4LRZO7Vfbpt1OFcP3DWVUj_xG8NgkmAUOJqqlpIqjt5hf/pub?output=csv",
    type: "GET"
  }).done((csv) => {
    const places = Papa.parse(csv, {header: true}).data;
    callback(places);
  });
}
