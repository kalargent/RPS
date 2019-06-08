// PROJECT FIREBASE CONFIG AND INITIALIZATION
var firebaseConfig = {
    apiKey: "AIzaSyDlsdiA16yH7DtTJtvCJfMu411e5e1ejhg",
    authDomain: "rps-bootcamp-af2cc.firebaseapp.com",
    databaseURL: "https://rps-bootcamp-af2cc.firebaseio.com",
    projectId: "rps-bootcamp-af2cc",
    storageBucket: "",
    messagingSenderId: "1081999937142",
    appId: "1:1081999937142:web:5d27affbb6170712"
  };

  firebase.initializeApp(firebaseConfig);

  // CREATE THE FIREBASE DB CONNECTIONS REFS  

  var database = firebase.database(); 
  var player1 = database.ref("/players/player1"); 
  var player2 = database.ref("/players/player2"); 
  // var chat = database.ref(".chat"); 
  // var connectedRef = database.ref(".info/connected"); 

$("#addP1").on("click", function () {
  event.preventDefault();
  p1name = $("#name1Input").val().trim(); 
  $("#player1entry").empty(); 
  $(".addP1").hide(); 
  $("#player1name").text(p1name); 
  console.log(p1name); 

  database.ref(player1).set({
    p1name:p1name
  })

  database.ref("players").on("value", function (playersnap) {
    console.log ("something changed"); 
  }) 
})

$("#addP2").on("click", function () {
  event.preventDefault();
  p2name = $("#name2Input").val().trim(); 
  $("#player2entry").empty(); 
  $(".addP2").hide(); 
  $("#player2name").text(p2name); 
  console.log(p2name); 

  database.ref(player2).set({
    p2name:p2name
  })

  database.ref("players").on("value", function (playersnap) {
    console.log ("something changed"); 
  }) 

  if (player1!=null && player2!=null) {
    console.log ("ready to play!");
    startGame() 
  }

})

function startGame () {
  console.log ("start game"); 

}; 







