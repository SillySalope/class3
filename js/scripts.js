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

// 2. Script to integrate the homes and the markers into the map

// var gfData = [
//   {
//     gf: 'MF',
//     r_we_cool: "Cool",
//     lat: 19.426914,
//     lon: -99.171562,
//     year: 2010
//   },
//   {
//     gf: 'MC',
//     r_we_cool: "Nah",
//     lat: 19.424443,
//     lon: -99.155340,
//     year: 2014
//   },
// 	{
// 		gf: 'AL',
// 		r_we_cool: "Nah",
// 		lat: 19.389992,
// 		lon: -99.113706,
// 		year: 2006
// 	},
// 	{
// 		gf: 'DA',
// 		r_we_cool: "Nah",
// 		lat: 19.3608,
// 		lon: -99.132578,
// 		year: 2004
// 	},
// 	{
// 		gf: 'B',
// 		r_we_cool: "Nah",
// 		lat: 19.351305,
// 		lon: -99.119296,
// 		year: 2012
// 	},
// 	{
// 		gf: 'C',
// 		r_we_cool: "Cool",
// 		lat: 19.350442,
// 		lon: -99.205116,
// 		year: 2016
// 	},
// 	{
// 		gf: 'A',
// 		r_we_cool: "Nah",
// 		lat: 19.351735,
// 		lon: -99.122847,
// 		year: 2008
// 	},
// ];

// how to add a single marker using L.marker()
// var chrisPizza = pizzaData[0];
//
// L.marker([chrisPizza.lat, chrisPizza.lon]).addTo(map)
//     .bindPopup(chrisPizza.name + ' likes to eat at ' +  chrisPizza.pizzaShop);

var fheartIcon = L.icon({
		iconUrl: 'img/fheart.png',
		// iconSize:     [38, 95], // size of the icon
		// shadowSize:   [50, 64], // size of the shadow
		// iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		// shadowAnchor: [4, 62],  // the same for the shadow
		// popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var bheartIcon = L.icon({
		iconUrl: 'img/bheart.png',
		// iconSize:     [38, 95], // size of the icon
		// shadowSize:   [50, 64], // size of the shadow
		// iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		// shadowAnchor: [4, 62],  // the same for the shadow
		// popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
// create an empty markers array that we can fill with markers
// var markersArray = [];

//1. OPERATING CODE

// gfData.forEach(function(home) {
//   var latLon = [home.lat, home.lon];
//
//   var r_we_coolColor = '#FFF';
//   	if (home.r_we_cool === 'Cool') r_we_coolColor = 'blue';
//   	if (home.r_we_cool === 'Nah') r_we_coolColor = 'red';
//
//   var MarkerOptions = {
//     radius: 6,
//     opacity: 1,
//     fillColor: r_we_coolColor,
//     fillOpacity: 0.9,
//     color: '#FFF',
//     weight: 2,
//   };
//
// 		L.circleMarker(latLon, MarkerOptions)
// 		.bindPopup('Are we cool with' + ' ' + home.gf + '?' + '<br><b>' + home.r_we_cool + '</b>'+' '+'since'+ ' ' + home.year, {offset: [0, -6]})
// 		.addTo(map);
// 	});

// 2. OPERATING CODE MODIFIED FOR GETPLACES FUNCTION
getPlaces((places) => {
	places.forEach(function(home) {
	  const latLon = [home.lat, home.lon];

	  var r_we_coolColor = '#FFF';
	  	if (home.r_we_cool === 'Cool') r_we_coolColor = 'blue';
	  	if (home.r_we_cool === 'Nah') r_we_coolColor = 'red';

	  const MarkerOptions = {
	    radius: 10,
	    opacity: 1,
	    fillColor: r_we_coolColor,
	    fillOpacity: 0.9,
	    color: '#FFF',
	    weight: 2,
	  };

			L.circleMarker(latLon, MarkerOptions)
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

// Adapting RIGEL CODE
// getPlaces((places) => {
//
//   places.forEach((place) => {
//
//     const latLon = [place.lat, place.lon];
//
//     const r_we_coolPalette = {
// 			Cool: 'red',
// 			Nah: 'blue',
//     };
//
//     const placeColor = typePalette[place.r_we_cool];
//
//     const circleOptions = {
//       stroke: false,
//       fillOpacity: 0.8,
//       fillColor: placeColor,
//       width: 0
//     }
//
//     L.circleMarker(latLon, circleOptions).addTo(map)
//         .bindPopup('Are we cool with' + home.gf + '?' + '<b>'home.r_we_cool'</b><br>'+' '+'since'+ home.year);
//   });
// });

// //Adding legend
// // var legend = L.control({position: 'bottomright'});
// //
// // legend.onAdd = function (map) {
// //
// //   var div = L.DomUtil.create('div', 'info legend');
// //
// //     categories = ['Nah','Cool'];
// //     colors = ['blue','red'],
// //
// //     for (var i = 0; i < colors.length) {
// //       div.innerHTML +=
// //           '<i class="circle" style="background:' + getColor(colors[i]) + '"></i> ' +
// //            (colors[i] ? colors[i] + '<br>' : '+');
// //     }
// //
// //     return div;
// //   }
// // legend.addTo(map);
//
// // LEGEND TUTORIAL: http://ghost.mixedbredie.net/legendary-leaflet-legends/
// // http://leafletjs.com/examples/choropleth/
//
// // function getColor(d) {
// //   switch (d) {
// //     case 'Cool': return 'blue';
// //     case 'Nah': return 'red';
// //   }
// // };
// //
// // // var legend = L.control({position: 'bottomleft'});
// //
// // legend.onAdd = function (map) {
// //   var div = L.DomUtil.create('div', 'info legend');
// //     are we cool? = ['Cool','Nah'];
//
//   // loop through the categories values and generate a label with a circle for each value
//
// //   for (var i = 0; i < films.length; i++) {
// //
// //     div.innerHTML +=   '<i class="circle" style="background:' + getColor(films[i]) + '"></i> ' + (films[i] ? films[i] + '<br>' : '+');
// //   }
// // 	return div;
// // };
// // legend.addTo(map);
//
// // in spreadsheet: File --> Publish to web --> copy link
//
function getPlaces(callback) {
  $.ajax({
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRn2qchpmAlRGtftH5ragZ3GNYDGHqmFp-4LRZO7Vfbpt1OFcP3DWVUj_xG8NgkmAUOJqqlpIqjt5hf/pub?output=csv",
    type: "GET"
  }).done((csv) => {
    const places = Papa.parse(csv, {header: true}).data;
    callback(places);
  });
}
