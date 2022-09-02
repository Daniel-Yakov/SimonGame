var userClickedPattern = [];
var gamePattern = [];
var buttonColor = ["red", "blue", "green", "yellow"];
var level = 0;


var hasStarted = false;
$(document).keypress(function(){
  if (!hasStarted){
    hasStarted = true;
    $("#level-title").text("level " + level);
    nextSequence();
  }
})


$(".btn").click(function(){

  var userButtonColor = this.id; // identify which color the player clicked
  userClickedPattern.push(userButtonColor); // adding the color to the UserPattern

  playSound(userButtonColor); // playing the sound of the clicked color
  animatePress(userButtonColor); // adding the clicking animation to that color

  checkAnswer(userClickedPattern.length - 1); // for each color the user clicked, check against the gamePattern
})


function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]){  // player got the sequence wrong
    startOver();
    return;
  }
  else if (gamePattern.length === userClickedPattern.length){  // if reached here all good, continue to next level
    userClickedPattern = [];
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }
}


function nextSequence(){
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);  // chosing new random color
  var randomChosenColor = buttonColor[randomNumber]; // and adding it
  gamePattern.push(randomChosenColor);               // to the gamePattern

  var chosenButtonId = "#"+randomChosenColor;
  $(chosenButtonId).fadeOut(100).fadeIn(100); // adding the flickering animation to the chosen random new color

  playSound(randomChosenColor);
}


function playSound(name){
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}


function animatePress(currentColor){

  $("#"+currentColor).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}


function gameOver(){
  $("#level-title").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
}

function startOver(){
  gameOver();
  hasStarted = false;
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}
