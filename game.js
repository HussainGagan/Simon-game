var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

var started = false;

var level = 0;

function nextSequence(){

  userClickedPattern = [];

  level++;

  $("#level-title").text("level "+level);

  var randomNumber = Math.floor(Math.random() * 4) ;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var colour = "#"+randomChosenColour;

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var sound = "sounds/"+randomChosenColour+ ".mp3";
  playSound(sound);
}

$(".btn").click(function(){
  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  var sound = "sounds/"+userChoosenColour+ ".mp3";
  playSound(sound);
  var animate = "#"+userChoosenColour;
  animatePress(animate);
  checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
  var audio = new Audio(name);
  audio.play();
}

function animatePress(currentColour){
  $(currentColour).addClass("pressed");
  setTimeout(function(){
    $(currentColour).removeClass("pressed");
  },100);
}

$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true ;
  }
})

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] ===  userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
          nextSequence();
    },1000);
  }
}else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    var sound = "sounds/wrong.mp3";
    playSound(sound);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
