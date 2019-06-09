
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

  var choices = ["Rock", "Paper", "Scissors"]
  var database = firebase.database();
  
  var player1 = database.ref("/players/player1"); 
  var p1wins = 0; 
  var p1losses = 0; 
  var p1ties = 0; 

  var player2 = database.ref("/players/player2"); 
  var p2wins = 0; 
  var p2losses = 0;
  var p2ties = 0; 
  // var chat = database.ref(".chat"); 
  // var connectedRef = database.ref(".info/connected"); 

  $("#reset").on("click", function () {
    database.ref(player1).remove(); 
    console.log("P1 removed"); 
    database.ref(player2).remove(); 
    console.log("P2 removed"); 

  })

  $("#addP1").on("click", function () {
  event.preventDefault();
  p1name = $("#name1Input").val().trim(); 
  // $("#player1entry").empty(); 
  // $(".addP1").hide(); 
  // $("#player1name").text(p1name); 
  // p1choiceGenerator(); 
  console.log(p1name); 
  database.ref(player1).set({
    p1name:p1name
  })
})

$("#addP2").on("click", function () {
  event.preventDefault();

  p2name = $("#name2Input").val().trim(); 
  $("#player2entry").empty(); 
  $(".addP2").hide(); 
  $("#player2name").text(p2name);
  p2choiceGenerator(); 
  console.log(p2name); 
  database.ref(player2).set({
    p2name:p2name
  })

  if (player1!=null && player2!=null) {
    console.log ("ready to play!");
  }

})



function p1choiceGenerator () {
  //empty buttons 
      // $("#buttons").empty(); 
      // for loop to display answer buttons on the screen 
      for (var i = 0; i < choices.length; i++) {
          var a = $("<button>"); 
          a.addClass("p1choiceButton"); 
          a.attr("data-name", choices[i]); 
          a.text(choices[i]); 
          $("#p1choices").append(a);
          console.log ("choices loaded");    
      };
}; 

function p2choiceGenerator () {
  //empty buttons 
      // $("#buttons").empty(); 
      // for loop to display answer buttons on the screen 
      for (var i = 0; i < choices.length; i++) {
          var a = $("<button>"); 
          a.addClass("p2choiceButton"); 
          a.attr("data-name", choices[i]); 
          a.text(choices[i]); 
          $("#p2choices").append(a);
          console.log ("choices loaded");    
      };
}; 

// function startGame () {

//   console.log ("start game"); 

// }; 

$(document).on("click", ".p1choiceButton", function() {
  console.log("you clicked on a choice"); 
  var p1choice = $(this).attr ("data-name"); 
  console.log (p1choice); 

  database.ref(player1).child("choice").set(p1choice); 

})

$(document).on("click", ".p2choiceButton", function() {
  console.log("you clicked on a choice"); 
  var p2choice = $(this).attr ("data-name"); 
  console.log (p2choice); 

  database.ref(player2).child("choice").set(p2choice); 
})

function ondatachange (playerSnap) {
  console.log ("something changed");
  var players = playerSnap.val()
  if (!players) return;
  if ($(".addP1").is(":visible") && (players.player1)){
  $("#player1entry").empty();

  $(".addP1").hide(); 
  $("#player1name").text(p1name); 
  p1choiceGenerator();
  }  
  if ($(".addP2").is(":visible") && (players.player2)){
    $("#player2entry").empty();
  
    $(".addP2").hide(); 
    $("#player2name").text(p1name); 
    p2choiceGenerator();
    }  
  compareChoice(players); 
  
  }

database.ref("players").on("value", ondatachange) 

function compareChoice(players){ 
      console.log(players);  
      if (!players.player1) return; 
      if (!players.player2) return;
      if (!players.player1.choice) return; 
      if (!players.player2.choice) return;

      if (players.player1.choice === players.player2.choice) {
        console.log("tie"); 
        $(".feedback").html("Tie! You both picked " + players.player1.choice + ".");
        p1ties++; 
        p2ties++; 
        console.log("p1 ties" + p1ties); 
        $("#p1ties").text(p1ties);  
        $("#p2ties").text(p2ties);  
        removeChoices(); 
        }
        
      else if 
        ((players.player1.choice == "Rock" && players.player2.choice == "Scissors") || (players.player1.choice == "Paper" && players.player2.choice == "Rock") || (players.player1.choice == "Scissors" && players.player2.choice == "Paper")) {

        console.log("not tie"); 
        console.log("p1win");
        this.p1win++; 
        this.p2losses--; 
        }

        else {
          console.log ("p2 wins"); 
        }

function removeChoices () {
  database.ref(players.player1.choice).set(null);
}
 
        
        
      
      

//       else if ((this.p1choice == "rock" && this.p2choice == "scissors") || (this.p1choice == "paper" && this.p2choice == "rock") || (this.p1choice == "scissors" && this.p2choice == "paper")) {
//       console.log("p1 wins!")

//       }

      

    // database.ref(player1).child("wins").set(p1win); 
// 
  }



