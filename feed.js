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

/*function initialize(){
  firebase.initializeApp(config);
  $('#Redfoo').on('click',saveData);
}*/

    function initialize(){
      $('#submitButton').click(testing);
    }

    function testing() {
      var caption = $('.caption').val();

      console.log(caption);
      $('.caption').appendTo('#story');

    }





})();
