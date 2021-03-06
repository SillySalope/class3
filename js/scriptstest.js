// Define position and zoom
var centerMap =[-99.143372,19.286517];
var zoomMap= 12;
// Define the map
var map = L.map('my-map').setView(centerMap, zoomMap);

var colors = [
  'gold',
  'crimson',
  'springgreen',
  'dodgerblue',
  'plum',
  'seagreen',
  'fuchsia',
]

// map //

// L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
// 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// 	subdomains: 'abcd',
// 	minZoom: 1,
// 	maxZoom: 16,
// 	ext: 'png'
// }).addTo(map);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

getPlaces((places) => {

  places.forEach((place) => {

    const latLon = [place.lat, place.lon];

    const typePalette = {
      Action: 'gold',
      Adventure: 'crimson',
      Comedy: 'springgreen',
      Crime: 'dodgerblue',
      Drama: 'plum',
      Fantasy: 'seagreen',
      Romance: 'fuchsia',
    };

    const placeColor = typePalette[place.type];

    const circleOptions = {
      stroke: false,
      radius: place.rate,
      fillOpacity: 0.8,
      fillColor: placeColor,
      width: 0
    }

    L.circleMarker(latLon, circleOptions).addTo(map)
        .bindPopup('<b>' + place.link  + ' (' +place.year+') '+ '</b><br>' + place.location );
  });
});

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend');

    categories = ['Action','Adventure','Comedy','Crime','Drama','Fantasy','Romance'];
    colors = ['gold','crimson','springgreen','dodgerblue','plum','seagreen','fuchsia'],

    for (var i = 0; i < colors.length) {
      div.innerHTML +=
          '<i class="circle" style="background:' + getColor(colors[i]) + '"></i> ' +
           (colors[i] ? colors[i] + '<br>' : '+');
    }

    return div;
  }
legend.addTo(map);

// LEGEND TUTORIAL: http://ghost.mixedbredie.net/legendary-leaflet-legends/
// http://leafletjs.com/examples/choropleth/

function getColor(d) {
  switch (d) {
    case 'Action': return 'gold';
    case 'Comedy': return 'springgreen';
    case 'Crime': return 'dodgerblue';
    case 'Drama': return 'plum';
    case 'Fantasy': return 'seagreen';
    case 'Romance': return 'fuchsia';
  }
};

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
    films = ['Action','Comedy','Crime','Drama','Fantasy','Romance'];

  // loop through the categories values and generate a label with a circle for each value

  for (var i = 0; i < films.length; i++) {

    div.innerHTML +=   '<i class="circle" style="background:' + getColor(films[i]) + '"></i> ' + (films[i] ? films[i] + '<br>' : '+');
  }
	return div;

};
legend.addTo(map);

// in spreadsheet: File --> Publish to web --> copy link

function getPlaces(callback) {
  $.ajax({
    //url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTtDhxGKMcnLTHkSHCURW5HACFOSPSOOGSTpEY3C7PH8Rk1Nq8ZFVvhihfVEQmGB25iyQ3e9B3ADLgY/pub?gid=0&single=true&output=csv",
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRtWdBOaRWUXNgzNbSTIJ3uz1NGe7Ct2Rq6kGE9BCQEvLYi9k0uumCa8Z8VJfPsbJrM6FT9j-6QUHS5/pub?output=csv",
    type: "GET"
  }).done((csv) => {
    const places = Papa.parse(csv, {header: true}).data;
    callback(places);
  });
}

//MINE



// 2. OPERATING CODE MODIFIED FOR GETPLACES FUNCTION
getPlaces((places) => {
	places.forEach(function(home) {
	  const latLon = [home.lat, home.lon];

	  var r_we_coolColor = '#FFF';
	  	if (home.r_we_cool === 'Cool') r_we_coolColor = 'blue';
	  	if (home.r_we_cool === 'Nah') r_we_coolColor = 'red';
			if (home.r_we_cool === 'Of course') r_we_coolColor = 'green';

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
