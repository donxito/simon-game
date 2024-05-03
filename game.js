var buttonColours = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];
let gamePattern = [];
let started = false;
let level = 0;

$(document).keypress(function () {            
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
});

function nextSequence() {  
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
}

function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();   
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");    
    setTimeout(function() {
        $("#"+ currentColour).removeClass("pressed");  
    }, 100 );
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
     } else {
        console.log("wrong") 
        playSound("wrong"); 
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200); 
        $("#level-title").text("Game Over, Press Any Key to Restart");  
        startOver(); 
    }  
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
