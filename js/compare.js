(function(){
// my first event written in jQuery ($); kicks off all of my code
  $(document).ready(initialize);
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC0i_szk-I_bCphokidl_7xp8nSskYbZLA",
    authDomain: "define-your-world.firebaseapp.com",
    databaseURL: "https://define-your-world.firebaseio.com",
    projectId: "define-your-world",
    storageBucket: "define-your-world.appspot.com",
    messagingSenderId: "9141650841"
  };

  var lat = 0;
  var long = 0;

  function initialize(){
    firebase.initializeApp(config);
    $('#submitButton').on('click', saveData);
    //finds location
    findlocation();

  }

  function saveData(){
    console.log('here');
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var story = $('#story').val();

    var entry = {
      first_name : first_name,
      last_name : last_name,
      story : story,
      lat : lat,
      long : long,
    }

    var newEntryKey = firebase.database().ref().child('Entry').push().key;
    var updates = {};
    updates['/Entry/' + newEntryKey] = entry;

    firebase.database().ref().update(updates).then(function(){
      alert('success!');
    }).catch(function(error){
      console.log(error);
    });
  }

  function findEntriesNearMe() {
    firebase.database().ref('Entry').once('value', function(snapshot){
      var entry = snapshot.val();

      for(var i in entry){
        var entry_lat = entry[i].lat;
        var entry_long = entry[i].long;
        var first_name = entry[i].first_name;
        var last_name = entry[i].last_name;
        var story = entry[i].story;
        // this if statment needs work to display the location information correctly, but data is saving to the db.
        // if(lat === entry_lat || long === entry_long || lat === entry_lat + 5 || long === entry_long + 5 || lat === entry_lat - 5 || long === entry_long - 5){
        //   console.log('hey');
        //   $('#storiesSection').append(
        //     "<div class='row'>" +
        //       "<div class='col s10 offset-s1 story-block'>" +
        //         "<h2>"+first_name+" "+last_name+"</h2>" +
        //         "<p>"+story+"</p>"+
        //       "</div>"+
        //     "</div>"
        //   );
        // } else {
        //   $('#storiesSection').append("<h2>Sorry. There are no stories for your location.</h2>");
        // }
        $('#storiesSection').append(
            "<div class='row'>" +
              "<div class='col s10 offset-s1 story-block'>" +
                "<h2>"+first_name+" "+last_name+"</h2>" +
                "<p>"+story+"</p>"+
              "</div>"+
            "</div>"
          );
      };
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

      console.log('Your current position is:');
      console.log(lat);
      console.log(long);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    navigator.geolocation.watchPosition(success, error, options);
    findEntriesNearMe();
  }

//=============================

})();
