// PROJECT FIREBASE CONFIG
var firebaseConfig = {
    apiKey: "AIzaSyDlsdiA16yH7DtTJtvCJfMu411e5e1ejhg",
    authDomain: "rps-bootcamp-af2cc.firebaseapp.com",
    databaseURL: "https://rps-bootcamp-af2cc.firebaseio.com",
    projectId: "rps-bootcamp-af2cc",
    storageBucket: "",
    messagingSenderId: "1081999937142",
    appId: "1:1081999937142:web:5d27affbb6170712"
  };

  // INITIALIZE FIREBASE
  firebase.initializeApp(firebaseConfig);

  // CREATE THE FIREBASE DB 

  var database = firebase.database(); 

  // GLOBAL VARS 
  // player 1 name, selection, wins and losses 
  var p1Name = null; 
  var p1Selection =""; 
  var p1Win =""; 
  var p1Loss =""; 

  // player 2 name, selection, wins and losses 
  var p2Name = null; 
  var p2Selection =""; 
  var p2Win =""; 
  var p2Loss =""; 


  $("#addPlayer").on("click", function () {
    // test to see if on click works 
    console.log("on click works");
    console.log(p1Name); 
    console.log(p2Name);

    if (p1Name === null) {
        p1Name = $("#nameField").val(); 
        $("#p1name").text("Player 1: " + p1Name); 
    }
    else if (p1Name !== null) {
        p2Name = $("#nameField").val(); 
        $("#p2name").text("Player 2: " + p2Name);  
    }
    
  })  
