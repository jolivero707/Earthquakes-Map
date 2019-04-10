//Load the arrays with markers
function getColor(mag)
     {
         switch(parseInt( mag)){
             case 0: return '#b7f34d';
             case 1: return '#e1f34d';
             case 2: return '#f3db4d';
             case 3: return '#f3ba4d';
             case 4: return '#f0a76b';
             default: return '#f06b6b';
         }
     }
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var earthquakes = L.geoJSON([], {
   pointToLayer: function (feature, latlng) {
       return L.circleMarker(latlng, {
     stroke: false,
     fillOpacity: 0.75,
     color: "white",
     //fillColor: "purple",
     fillColor: getColor(feature.properties.mag),
     radius: feature.properties.mag*3
     })
   }
 })
 .bindPopup(function(layer){
                           return("<h3>" + layer.feature.properties.place +
                             "</h3><hr><p>" + layer.feature.properties.mag + "</p><hr>" +
                             "</h3><p>" + new Date(layer.feature.properties.time) + "</p>"
                             );
                         });
d3.json(url, function(data){
    earthquakes.addData(data.features);
});

  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });



  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
   "access_token=pk.eyJ1IjoiZGVzaGFueXUiLCJhIjoiY2puMGpveTBrMXp5bzNrbm84YWdwbG9lZyJ9.nmp8PpvgZjsvect2mcN5Jg");
// Define a baseMaps object to hold our base layers
 var baseMaps = {
   "Street Map": streetmap,
   "Dark Map": darkmap
 };

 // var earthquakes = L.geoJSON(earthquakeMarkers[0]);
 // Create overlay object to hold our overlay layer
 var overlayMaps = {
   Earthquakes: earthquakes,
 };

 // Create our map, giving it the streetmap and earthquakes layers to display on load
 var myMap = L.map("map", {
   center: [
     37.09, -95.71
   ],
   zoom: 5,
   layers: [streetmap, earthquakes]
 });

 // Create a layer control
 // Pass in our baseMaps and overlayMaps
 // Add the layer control to the map
 L.control.layers(baseMaps, overlayMaps, {
   collapsed: false
 }).addTo(myMap);

 CreateLegend();


   function CreateLegend()
   {
   var legend = L.control({ position: "bottomright" });

   legend.onAdd = function() {
     var div = L.DomUtil.create("div", "info legend");
     var labels = ["0-1","1-2","2-3","3-4","4-5","5+"];
     var legends = [];
     //div.innerHTML = legendInfo;

     for(var i=0;i<labels.length;i++) {
       legends.push("<li style=\"list-style-type:none;\"><div style=\"background-color: " + getColor(i) + "\">&nbsp;</div> "+
                                                        "<div>"+ labels[i]+"</div></li>");
     }

     div.innerHTML += "<ul class='legend'>" + legends.join("") + "</ul>";
     return div;
   };

   // Adding legend to the map
   legend.addTo(myMap);
   }
  // // Create the map object with options
  // d3.json(url, function(data) {
  //   // Creating a GeoJSON layer with the retrieved data
       
  //   var test = (data.features);
  //   test.forEach(function(item) {
  //       radius = +item.properties.mag
        
  //       var color = "";
  // if (item.properties.mag < 1) {
  //   color = "yellow";
  // }
  // else if (item.properties.mag > 1 && item.properties.mag < 3 ) {
  //   color = "orange";
  // }
  // else if (item.properties.mag > 5) {
  //   color = "green";
  // }
  // else {
  //   color = "red";
  // }
  //   L.circle([item.geometry.coordinates[1],item.geometry.coordinates[0]],
  //           {
  //               fillOpacity: 0.8,
  //               color: "white",
  //               fillColor: color,
  //               // Adjust radius
  //               radius: radius * 40000})
  //   .bindPopup(function(layer){return ("<h1>" + item.properties.place +
  //    "</h1> <hr> <h3>Magnitude " + item.properties.mag + "</h3>");
  //           });
  //   .addTo(myMap);