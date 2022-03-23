// alert("hello");
var buttomColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];



// Create a new variable called level and start at level 0.
var level =0;
// You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(){

    if(!started)
    {
        // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
        
    }
});


$(".btn").click(function () {
  
    var userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);

    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);


})


// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])
     {
         console.log("sucess");
        //  If the user got the most recent answer right in , then check that they have finished their sequence with another if statement.
        if(gamePattern.length === userClickedPattern.length)
        {
            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(() => {
                nextSequence();  
            }, 1000);
        }
     }
     else
     {

        // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");
        
        // In the styles.css file, there is a class called "game-over", apply this class to the body of the website
        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
         console.log("wrong");
     }
}




function nextSequence() {
  
    // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern =[];

    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;
   
    // Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level "+level);

    var randnum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttomColors[randnum];
    gamePattern.push(randomChosenColor);

    

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    
    playSound(randomChosenColor);

}

function playSound(name){
  
    
  
    var audio = new Audio('sounds/' + name+ '.mp3')
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
  
}

function startOver(){
    level =0;
    gamePattern =[];
    started = false;
}





