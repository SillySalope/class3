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
		iconSize:     [38, 95], // size of the icon
		shadowSize:   [50, 64], // size of the shadow
		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62],  // the same for the shadow
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var bheartIcon = L.icon({
		iconUrl: 'img/bheart.png',
		iconSize:     [38, 95], // size of the icon
		shadowSize:   [50, 64], // size of the shadow
		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62],  // the same for the shadow
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var homeIcon = L.icon({
		iconUrl: 'img/home.png',
		iconSize:     [38, 95], // size of the icon
		shadowSize:   [50, 64], // size of the shadow
		iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62],  // the same for the shadow
		popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// create an empty markers array that we can fill with markers
// var markersArray = [];

// 2. OPERATING CODE MODIFIED FOR GETPLACES FUNCTION
// getPlaces((places) => {
// 	places.forEach(function(home) {
// 	  const latLon = [home.lat, home.lon];
//
// 	  var r_we_coolColor = '#FFF';
// 	  	if (home.r_we_cool === 'Cool') r_we_coolColor = 'blue';
// 	  	if (home.r_we_cool === 'Nah') r_we_coolColor = 'red';
// 			if (home.r_we_cool === 'Of Course') r_we_coolColor = 'green';
//
// 	  const MarkerOptions = {
// 	    radius: 10,
// 	    opacity: 1,
// 	    fillColor: r_we_coolColor,
// 	    fillOpacity: 0.9,
// 	    color: '#FFF',
// 	    weight: 2,
// 	  };
//
// 			L.circleMarker(latLon, MarkerOptions)
// 			.bindPopup('Are we cool with' + ' ' + home.gf + '?' + '<br><b>' + home.r_we_cool + '</b>'+' '+'since'+ ' ' + home.year, {offset: [0, -6]})
// 			.addTo(map);
// 		});
// 	});

	// 3. OPERATING CODE MODIFIED FOR GETPLACES FUNCTION with DYNAMIC ICONS
	getPlaces((places) => {
		places.forEach(function(home) {
		  const latLon = [home.lat, home.lon];

				var dynamicIcon;
				if (home.r_we_cool === 'Nah') dynamicIcon = bheartIcon;
				if (home.r_we_cool === 'Cool') dynamicIcon = fheartIcon;
				if (home.r_we_cool === 'Of Course') dynamicIcon = homeIcon;

		  const MarkerOptions = {
		    radius: 10,
		    opacity: 1,
		    fillOpacity: 0.9,
		    color: 'black',
		    weight: 2,
		  };

				L.circleMarker(latLon, MarkerOptions, {icon:dynamicIcon})
				.bindPopup('Are we cool with' + ' ' + home.gf + '?' + '<br><b>' + home.r_we_cool + '</b>'+' '+'since'+ ' ' + home.year, {offset: [0, -6]})
				.addTo(map);
			});
		});


	// // 2. Chris Code adaptation for dynamic icons
	// 	var dynamicIcon;
	// 	if (home.r_we_cool === 'Nah') dynamicIcon = bheartIcon;
	// 	if (home.r_we_cool === 'Cool') dynamicIcon = fheartIcon;
  //
	// 	L.marker(home.latLon, {icon:dynamicIcon}).addTo(map)
	// })

// 	//EXAMINE CORCHETES
////********** Chris code for custom dynamic icon
// // 	L.marker(L.marker(home.latLon, {icon: dynamicIcon})
// // 	.bindPopup('Are we cool with' + ' ' + home.gf + '?' + '<br><b>' + home.r_we_cool + '</b>'+' '+'since'+ ' ' + home.year, {offset: [0, -6]})
// // 	.addTo(map))
// // })
//
//   	// var coolIcon = 'img/heart.png',
// 		// if (home.r_we_cool === 'Cool') coolIcon = 'img/heart.png';
// 		// if (home.r_we_cool === 'Nah') coolIcon = 'img/heart broken.png';
//
// 	// var MarkerOptions = {
//   //   icon: coolIcon
//   //   opacity: 1,
//   //   fillOpacity: 0.9,
//   //
//   //   weight: 2,
//   // };
//
//   // var marker = L.circleMarker(latLon, MarkerOptions)
//   //     .bindPopup('Are we cool with' + ' ' + home.gf + '?' + '<br><b>' + home.r_we_cool + '</b>'+' '+'since'+ ' ' + home.year, {offset: [0, -6]})
//   //     .addTo(map)
//   // add the marker to the markersArray
//   markersArray.push(marker);
// });

function getPlaces(callback) {
  $.ajax({
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRn2qchpmAlRGtftH5ragZ3GNYDGHqmFp-4LRZO7Vfbpt1OFcP3DWVUj_xG8NgkmAUOJqqlpIqjt5hf/pub?output=csv",
    type: "GET"
  }).done((csv) => {
    const places = Papa.parse(csv, {header: true}).data;
    callback(places);
  });
}
