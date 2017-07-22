(function(){

$(document).ready(initialize);
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDHHDD5nhda9sPQ2PJd7gvFcCUx0GEC0Ek",
    authDomain: "defineyourworld-944da.firebaseapp.com",
    databaseURL: "https://defineyourworld-944da.firebaseio.com",
    projectId: "defineyourworld-944da",
    storageBucket: "defineyourworld-944da.appspot.com",
    messagingSenderId: "545939756636"
  };
  var lat =0;
  var long = 0;
  var x = document.getElementById("demo");
// how to get location using geolocation possibly? could enter the geolocation as a child new entry in firebase, then append it later if the current geolocation equaled the value of the geolocation variable in the database //
  // function getLocation(){
  //   if (navigator.geolocation){
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   }
  //   else{
  //    console.log("Geolocation is not supported by this browser.");
  //   }
  // }
  // function showPosition(){
  // //  $('#storiesSection').append(
  //       "<div class='row'>" +
  //         "<div class='col s10 offset-s1 story-block'>" +
  //           "<h2>"+first_name+" "+last_name+"</h2>" +
  //           "<p>"+story+"</p>"+
  //         "</div>"+
  //       "</div>"
  //     );
  // }
  // End of Firebase Initialize

    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered

  function initialize(){
    firebase.initializeApp(config);
        $('#submitButton').on('click',saveData);
        $('.modal').modal();
        // nav functions
        $(".button-collapse").sideNav();
        $(".dropdown-button").dropdown();
        // for the carousel rotation speed
        $('.slider').slider({
          interval: 1500,
      });
      findlocation();
    }

        function saveData(){
          console.log("here");
          var user_name=$('#un').val();
          var first_name=$('#fn').val();
          var last_name=$('#ln').val();
          var story= $('#story').val();

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
            return firebase.database().ref().update(updates).then(function(){ window.location.replace('./feed.html');
          });
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
              var user_name = entry[i].user_name;
              var first_name =  entry[i].first_name;
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
              // if(lat === entry_lat && long === entry_long || lat === entry_lat + 5 && long === entry_long + 5 || lat === entry_lat - 5 && long === entry_long - 5) || lat === entry_lat && long = entry_long + 5 || lat ===entry_lat && long===entry_long - 5|| lat ===entry_lat -5 && long=entry_long|| lat === entry_lat + 5 && long===entry_long || lat ===entry_lat+5 && long === entry_long - 5 || lat ===entry_lat - 5 && long=entry_long +5) {
              $('#story').append(
                  "<div class='row'>" +
                    "<div class='col s10 offset-s1 story-block'>" +
                      // "<h2>"+first_name+" "+last_name+"</h2>" +
                      "<p>"+story+"</p>"+
                    "</div>"+
                  "</div>"
                );
              // }
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
