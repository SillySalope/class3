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

var gf = [
  {
    gf: 'MF',
    r_we_cool: "Cool",
    lat: 19.426914,
    lon: -99.171562,
    year: 2010
  },
  {
    gf: 'MC',
    r_we_cool: "Nah",
    lat: 19.424443,
    lon: -99.155340,
    year: 2014
  },
];

// how to add a single marker using L.marker()
// var chrisPizza = pizzaData[0];
//
// L.marker([chrisPizza.lat, chrisPizza.lon]).addTo(map)
//     .bindPopup(chrisPizza.name + ' likes to eat at ' +  chrisPizza.pizzaShop);


// create an empty markers array that we can fill with markers
var markersArray = [];

// how to add a marker for each object in the array

gf.forEach(function(home) {
  var latLon = [home.lat, home.lon];

  var r_we_coolColor = '#FFF';

  if (home.r_we_cool === 'Cool') r_we_coolColor = 'blue';
  if (home.r_we_cool === 'Nah') r_we_coolColor = 'red';

  var MarkerOptions = {
    radius: 6,
    opacity: 1,
    fillColor: r_we_coolColor,
    fillOpacity: 0.9,
    color: '#FFF',
    weight: 2,
  };

  var marker = L.circleMarker(latLon, MarkerOptions)
      .bindPopup('Are we cool with' + ' ' + home.gf + '?' + '<br><b>' + home.r_we_cool + '</b>'+' '+'since'+ ' ' + home.year, {offset: [0, -6]})
      .addTo(map)
  // add the marker to the markersArray
  markersArray.push(marker);
});

// //A function to call the homes from the spreadsheet
// getPlaces((homes) => {
// //for each...
//   homes.forEach((home) => {
//
//     const latLon = [home.lat, home.lon];
//
//     const r_we_coolPalette = {
//       Cool: 'red',
//       Nah: 'blue',
//     };
//
//     const homeColor = r_we_coolPalette[home.r_we_cool];
//
//     const circleOptions = {
//       stroke: false,
//       // radius: home.rate,
//       fillOpacity: 0.8,
//       fillColor: blue, //how to change it to blue or red depending on the coolness?
//       width: 1
//     });
//
//     L.circleMarker(latLon, circleOptions).addTo(map)
//         .bindPopup('Are we cool with' + home.gf + '?' + '<b>'home.r_we_cool'</b><br>'+' '+'since'+ home.year);
//   });
// });
//
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
// function getPlaces(callback) {
//   $.ajax({
//     url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRn2qchpmAlRGtftH5ragZ3GNYDGHqmFp-4LRZO7Vfbpt1OFcP3DWVUj_xG8NgkmAUOJqqlpIqjt5hf/pub?output=csv",
//     type: "GET"
//   }).done((csv) => {
//     const homes = Papa.parse(csv, {header: true}).data;
//     callback(homes);
//   });
// }
