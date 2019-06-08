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
  // var players = database.ref("/players"); 
  // var chat = database.ref(".chat"); 
  // var connectedRef = database.ref(".info/connected"); 



//   // GLOBAL VARS
var p1name = ""; 

$("#addP1").on("click", function () {
  event.preventDefault();
  p1name = $("#nameInput").val().trim(); 
  console.log(p1name); 

  firebase.database().ref().push({
    p1name:p1name
  })
})


