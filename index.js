var usrpattern=[];
var gamepattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];




var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    $('.rules').hide();
    gensequence();
    started = true;
  }
});

function gensequence()
{
    usrpattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var rand = Math.floor(Math.random()*4);
    var gamecolor = buttonColours[rand];
    gamepattern.push(gamecolor);

    $("#"+gamecolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(gamecolor);
}

function playsound(name)
{
    var audio =new Audio('sounds/'+name+'.mp3');
    audio.play();
}


$('.btn').click(function(){
    var usrcolor=$(this).attr("id");
    usrpattern.push(usrcolor);
    playsound(usrcolor);
    animatebtn(usrcolor);
    checkAns(usrpattern.length-1);
})

function animatebtn(name)
{
    $("#"+name).addClass("pressed");
    
    setTimeout(function(){
        $("#"+name).removeClass("pressed");
    },100);

}

function checkAns(currentlevel)
{
    if(gamepattern[currentlevel]===usrpattern[currentlevel])
    {
        if(usrpattern.length===gamepattern.length)
        {
            setTimeout(function(){gensequence();},1000)
        }
    }
    else {
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}

function startOver()
{
    level = 0;
    gamepattern = [];
    started = false;
    $('.rules').show();
}
