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



//   // GLOBAL VARS
var p1name = ""; 

$("#addP1").on("click", function () {
  event.preventDefault();
  p1name = $("#name1Input").val().trim(); 
  console.log(p1name); 

  firebase.database().ref(player1).set({
    p1name:p1name
  })
})

$("#addP2").on("click", function () {
  event.preventDefault();
  p2name = $("#name2Input").val().trim(); 
  console.log(p2name); 

  firebase.database().ref(player2).set({
    p2name:p2name
  })
})




