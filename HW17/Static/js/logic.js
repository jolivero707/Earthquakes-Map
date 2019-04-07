function changingImg(){
    document.getElementById("logo").src="./images/1-Logo.png"
}

var myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 5
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

  // Create the map object with options
  d3.json(url, function(data) {
    // Creating a GeoJSON layer with the retrieved data
       
    var test = (data.features);
    test.forEach(function(item) {
        radius = +item.properties.mag
        
        var color = "";
  if (item.properties.mag < 1) {
    color = "yellow";
  }
  else if (item.properties.mag > 1 && item.properties.mag < 3 ) {
    color = "orange";
  }
  else if (item.properties.mag > 5) {
    color = "green";
  }
  else {
    color = "red";
  }
    L.circle([item.geometry.coordinates[1],item.geometry.coordinates[0]],
            {
                fillOpacity: 0.8,
                color: "white",
                fillColor: color,
                // Adjust radius
                radius: radius * 40000})
    .bindPopup("<h1>" + item.properties.place + "</h1> <hr> <h3>Magnitude " + item.properties.mag + "</h3>")
    .addTo(myMap);