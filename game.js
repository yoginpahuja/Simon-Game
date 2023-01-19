var gamePattern=[];
var userClickedPattern=[];
var buttonColours = ["red","blue","green","yellow"];
var level=0;
function nextSequence() {
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
  }
  function playSound(name)
  {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
//   nextSequence();
 function animatePress(currentbutton)
 {
    $("#"+currentbutton).addClass("pressed");
    setTimeout(() => {
        $("#"+currentbutton).removeClass("pressed");
    }, 100);
 }
 $(document).keypress(function(event){
     if(level===0)
    nextSequence();
 });
 
$(".btn").click(function (event) { 
    // event.preventDefault();
    if(level>0)
    {var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);}
});
function restart()
{
  level=0;
  gamePattern=[];
}
function checkAnswer(currIndex)
{
  if(gamePattern[currIndex]===userClickedPattern[currIndex])
  {
    console.log("Success");
    if(gamePattern.length===userClickedPattern.length)
    {
      console.log("Pattern Matched");

      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over,Press any key to restart");
    restart();
  }
}