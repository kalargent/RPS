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
  var players = database.ref("/players"); 
  var chat = database.ref(".chat"); 
  var connectedRef = database.ref(".info/connected"); 

  // GLOBAL VARS
  var player1 = {
      name: "", 
      choice: "", 
      wins: 0, 
      losses: 0
  }

  var player2 = {
    name: "", 
    choice: "", 
    wins: 0, 
    losses: 0
}


  // GLOBAL  VARS 
  // player 1 name, selection, wins and losses 
//   var p1Name = null; 
//   var p1Selection =""; 
//   var p1Win =""; 
//   var p1Loss =""; 

//   // player 2 name, selection, wins and losses 
//   var p2Name = null; 
//   var p2Selection =""; 
//   var p2Win =""; 
//   var p2Loss =""; 


//   $("#addPlayer").on("click", function () {
//     // test to see if on click works 
//     console.log("on click works");
//     console.log(p1Name); 
//     console.log(p2Name);

//     if (p1Name === null) {
//         p1Name = $("#nameField").val(); 
//         $("#p1name").text("Player 1: " + p1Name); 
        
//         database.ref('players/').push ({
//             p1Name: p1Name,  
//         })
//     }
//     else if (p1Name !== null) {
//         p2Name = $("#nameField").val(); 
//         $("#p2name").text("Player 2: " + p2Name);  

//         database.ref('players/').push ({
//             p2Name: p2Name,  
//         })
//     }
    
//   })  

//   var playerList = firebase.database().ref('players/'); 
//   database.ref(playerList).on (
//       "value", function (playerSnap) {
//           console.log(playerSnap); 
//           console.log (playerList);  
//     }
//   )

//   // this var references the specific place in my DB that i want to get players from 
//   var connectionsRef = database.ref("/players"); 
  
//   // this var pulls the information from that spot 
//   var connectedRef = database.ref(".info/players");
  
//   connectedRef.on("value", function(snap) {
//       if (snap.val()) {
//           var con = connectionsRef.push(); 
//           con.onDisconnect().remove(); 
//       }
//   })

//   connectionsRef.on("value", function (snapshot) {
//       $(".playList").text(snapshot.numChildren()); 
//   })
