(function(){

  $(document).ready(initialize);
  var map;
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC0i_szk-I_bCphokidl_7xp8nSskYbZLA",
    authDomain: "define-your-world.firebaseapp.com",
    databaseURL: "https://define-your-world.firebaseio.com",
    projectId: "define-your-world",
    storageBucket: "define-your-world.appspot.com",
    messagingSenderId: "9141650841"
  };

// This is the haversine formula in action.
  var Geolocation = {
    rad: function(x) { return x * Math.PI / 180 },

    // Distance in kilometers between two points using the Haversine algo.
    haversine: function(p1, p2) {
      var R = 6371
      var dLat  = this.rad(p2.lat - p1.lat)
      var dLong = this.rad(p2.long - p1.long)

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) * Math.sin(dLong/2) * Math.sin(dLong/2)
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      var d = R * c
      return Math.round(d)
    },
    // Distance between me and the passed position.
    distance_from: function(entry_location) {
      var distance = Geolocation.haversine(current_location, entry_location);
      return distance
    },
  }

  var lat = 0;
  var long = 0;
  var current_location;
  var x = document.getElementById("demo");

  function initialize(){
    firebase.initializeApp(config);
    $('#submitButton').on('click',saveData);
    $('.modal').modal();
    findlocation();

  }

  function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat:lat, lng:long}
        });

        marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.BOUNCE,
          position: {lat: lat, lng: long}
        });

  }

  function addMarker(elat,elong){
    var latLng = new google.maps.LatLng(elat,elong);
    marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
  }

  function saveData(){
    var user_name=$('#un').val();
    var first_name=$('#fn').val();
    var last_name=$('#ln').val();
    var story= $('#storyInput').val();

    var entry ={
      // user_name: user_name,
      // first_name: first_name,
      // last_name: last_name,
      story: story,
      lat: lat,
      long: long,
    }
    var newEntryKey = firebase.database().ref().child('Entry').push().key;
    var updates = {};
    updates['/Entry/' + newEntryKey] = entry;

    firebase.storage().ref().child('images/entry/' + newEntryKey).put($('#uploadfile')[0].files[0]).then(function(snapshot){
      return firebase.database().ref().update(updates).then(function(){
        window.location.replace('./feed.html');
      });
    }).catch(function(error){
      console.log(error);
    });
  }

  function findEntriesNearMe() {
    console.log('finding entries near me');
    $('#story').empty();
    firebase.database().ref('Entry').once('value', function(snapshot){
      var entry = snapshot.val();

      for(var i in entry){
          var entry_lat = entry[i].lat;
          var entry_long = entry[i].long;
          var user_name = entry[i].user_name;
          var first_name =  entry[i].first_name;
          var last_name = entry[i].last_name;
          var storytext = entry[i].story;
          var entry_location = {lat : entry_lat, long : entry_long}
          // this is where we send the entry location to the haersine formula to
          // be compared against the current location of the user.
          var distance = Geolocation.distance_from(entry_location);
          console.log(storytext);
          if(distance < 2){
            addMarker(entry_lat,entry_long);
            firebase.storage().ref().child("images/entry/" + i).getDownloadURL().then(function(url) {
              console.log(storytext);
              var storytext = entry[i].story;
              $('#story').append(
                "<div class='row storyBlock'>" +
                  "<div class='col s4 offset-s1 storyBlockImage' style='background-image:url("+url+"); height: 100%;'></div>" +
                  "<div class='col s6 left-align'>" +
                    "<p>"+storytext+"</p>"+
                  "</div>" +
                "</div>"
              );
            }).catch(function(error) {
              console.log(error);
            });
          } else {
            console.log('dont show this one!');
          }
      }
    });
  }

//=====all of this is geolocation
  function findlocation(){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    function success(pos) {
      var crd = pos.coords;
      lat = crd.latitude;
      long = crd.longitude;
      current_location = {lat, long};
      // console.log('Your current position is:');
      // console.log(lat);
      // console.log(long);
      // console.log(`More or less ${crd.accuracy} meters.`);
      initMap();
      findEntriesNearMe();
    };
    navigator.geolocation.watchPosition(success, error, options);
  }
//=============================



})();
