var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){
   var usedchosencolor=$(this).attr("id");
   userClickedPattern.push(usedchosencolor);
   playsound(usedchosencolor);
   animation(usedchosencolor);
   check(userClickedPattern.length-1); 
});
function check(currentlevel) {
    if(gamePattern[currentlevel]===userClickedPattern[currentlevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startover();
    }
}0

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var random=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[random];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
}
function playsound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animation(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function startover(){
    level=0;
    gamePattern=[];
    started=false;
    
}