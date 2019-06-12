
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

  var gameState = database.ref("/gameState"); 
  // var chat = database.ref(".chat"); 
  // var connectedRef = database.ref(".info/connected"); 
  
  // $("#startModal").modal("show"); 

  startGame();

  function startGame () {

    var state = gameState.once("value").then ( function (snapshot) {
      console.log (snapshot.val()); 
      if (snapshot.val() == false) {    
        // pop start modal
        $("#startModal").modal("show"); 
        // supress join modal
        $("#joinModal").modal("hide");
        console.log ("game is off"); 
      }  
      
      else {
        // hide start modal
        $("#startModal").modal("hide"); 
        // show join modal
        $("#joinModal").modal("show");
        console.log ("game is on"); 
      }
    }) 
    
    $("#p1chatSection").hide(); 
    $("#p2chatSection").hide();
  }; 

  $("#reset").on("click", function () {
    gameOver(); 
  })
  
  $("#startGame").on("click", function () {
    resetGame(); 
  })

  function resetGame () {
    database.ref().set({ 
      gameState:true,  
    })  
    $("#startModal").modal("toggle");
  }

  $("#joinGame").on("click", function () {
    joinGame(); 
  })

  function joinGame (){
    $("#joinModal").modal("toggle");
    console.log ("you're in!"); 
  }


  $("#addP1").on("click", function () {
  event.preventDefault();
  p1name = $("#name1Input").val().trim(); 
  // $("#player1entry").empty(); 
  // $(".addP1").hide(); 
  // $("#player1name").text(p1name); 
  // p1choiceGenerator(); 
  console.log(p1name); 
  $("#p1chatSection").show();
  database.ref(player1).set({
    p1name:p1name
  })
})

$("#addP2").on("click", function () {
  event.preventDefault();

  p2name = $("#name2Input").val().trim(); 
  // $("#player2entry").empty(); 
  // $(".addP2").hide(); 
  // $("#player2name").text(p2name);
  // p2choiceGenerator(); 
  console.log(p2name);
  $("#p2chatSection").show(); 
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

  if ((gameState = true) && ($("#startmodal").is(":visible"))){
    $("#startModal").modal("hide"); 
    $("#joinModal").modal("show"); 
  }

  if ($(".addP1").is(":visible") && (players.player1)){
  $("#player1entry").empty();
  $(".addP1").hide(); 
  $("#player1name").text(p1name); 
  $("#p2chatSection").hide();   
  p1choiceGenerator();
  }  
  if ($(".addP2").is(":visible") && (players.player2)){
    $("#player2entry").empty();
    $(".addP2").hide(); 
    $("#player2name").text(p2name); 
    $("#p1chatSection").hide();
    p2choiceGenerator();
    }  
  compareChoice(players);  
  }


database.ref("players").on("value", ondatachange) 

function checkGameState () {
  if ((gameState = true) && ($("#startmodal").is(":visible"))){
    $("#startModal").modal("hide"); 
    $("#joinModal").modal("show"); 
  }
}

database.ref("gameState").once("value", checkGameState); 

function compareChoice(players){ 
      // console.log(players);  
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
        testGameOver(); 
        }
        
      else if 
        ((players.player1.choice == "Rock" && players.player2.choice == "Scissors") || (players.player1.choice == "Paper" && players.player2.choice == "Rock") || (players.player1.choice == "Scissors" && players.player2.choice == "Paper")) {

        console.log("not tie"); 
        console.log("p1win");
        p1wins++; 
        p2losses++; 
        $(".feedback").html("Player 1 wins.");
        $("#p1wins").text(p1wins);  
        $("#p2losses").text(p2losses); 
        removeChoices(); 
        testGameOver(); 
        }

        else {
          console.log ("p2 wins"); 
          p2wins++; 
          p1losses++; 
          console.log(p2wins); 
          $("#p2wins").text(p2wins);  
          $("#p1losses").text(p1losses); 
          removeChoices();  
          testGameOver(); 
        }

function removeChoices () {
  database.ref("players/player1/choice").remove();
  database.ref("players/player2/choice").remove();
}
  }

  $("#gameOver").on("click", function () {
    console.log ("clicked Great");
    gameOver(); 
  })

function testGameOver () {
  console.log ("test game Over function");
  if ((p1wins === 3) || (p2wins === 3)) { 
    $("#whoWins").text ("The game is over.")
    $("#gameOverModal").modal("show"); 
    console.log ("gameOver"); 
  } 
  else return; 
}

function gameOver () {
  console.log ("game Over function"); 
  database.ref().set({ 
    gameState:false,  
  }) 
  location.reload(); 
}

var chatHistory = database.ref("chats"); 

function updateChat () {
    chatHistory.on("child_added", function (snapshot) {
    $("#messages").append(snapshot.val());
    $("#messages").append("<br>");

  })
}

$("#p1submitMsg").on ("click", function () {
    // $("#messages").append("<br>"); 
    // $("#messages").append(p1name + ": " + $("#p1message").val()); 
    // $("#p1message").val(""); 
    database.ref("/chats").push(p1name + ": " + $("#p1message").val()); 
    console.log ("p1 message sent"); 
})

$("#p2submitMsg").on ("click", function () {
  // $("#messages").append("<br>");
  // $("#messages").append(p2name + ": " + $("#p2message").val()); 
  // $("#p2message").val(""); 
  database.ref("/chats").push(p2name + ": " + $("#p2message").val()); 
  console.log ("p2 message sent"); 
})

updateChat(); 





