function initMap() {
    console.log(myMatches)
    for (var i=0; i<myMatches.length; i++){
      var myLatLng = {lat: myMatches[i].location.coordinates[0], lng: myMatches[i].location.coordinates[1]};
      console.log(myLatLng);
      var map = [];
      console.log(myMatches[i]._id, "id")
      map[i] = new google.maps.Map(document.getElementById('map-' + myMatches[i]._id), {
        zoom: 15,
        center: myLatLng
      });
      var marker = [];
      marker[i] = new google.maps.Marker({
        position: myLatLng,
        map: map[i],
        title: 'Hello World!'
      });
    }
  
  }
  initMap();