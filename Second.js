game = document.getElementsByClassName("game");
var yourScore = document.querySelector(".gameScore");
var score = 0;
var yourTimer = document.querySelector(".gameTimer");
basket = document.getElementById("basket");
basket.style.top = 440+"px";
var bsktObject=document.images[0];
leftArrow = 37;
rightArrow = 39;
left = 0;

//function that randomize the position inside the width of the window
function randomInt(){
   return Math.floor(Math.random()*window.innerWidth);
 }
//creating normal egg
 function createEgg(rnd){
    var egg = document.createElement("img");
    egg.setAttribute("src" , "images/egg.png");
    game[0].appendChild(egg);
    egg.style.width = 40 +"px";
    egg.style.height = 50+"px";
    egg.style.position="absolute";
    egg.style.left = rnd;
    return egg;
 }
//creating the golden egg
 function creategGoldenEgg(rnd){
     var goldenegg = document.createElement("img");
     goldenegg.setAttribute("src" , "images/golden.png");
     game[0].appendChild(goldenegg);
     goldenegg.style.width = 40+"px";
     goldenegg.style.height = 50+"px";
     goldenegg.style.position="absolute";
     goldenegg.style.left = rnd;
 }
// on clicking left and right moving position of basket
document.onkeydown = function(event){
    switch(event.keyCode)
    {
        case 37:
            if(left>0)
            left-=50;
            bsktObject.style.left=left+"px";
            //console.log("left is pressed");
            break;
        case 39:
            if(left<(window.innerWidth-parseInt(basket.width))+20)
            left+=50;
            bsktObject.style.left=left+"px";
            //console.log("right is pressed");
            break;
    }//switch
};//left and right on key


onload = function(){
    //Linking name in second page of html
    var name = document.getElementById("playerName");
    yourScore.innerHTML = "Score: " + score;
    //console.log(name);
    name.innerText = "Player: " + this.localStorage.getItem('name');


    // function with setInterval to make the egg fall all long the game time
    var eggRand = setInterval (function(){
        
        var rand = randomInt();
        var counter = 0;
        var topcounter=10;
        var eggCreated;
        var flag;
        // console.log(rand);
        // Here, I tried to create the golden egg within falling of 5 normal ones but it didn't work   
        if(counter==5)
        {
            eggCreated=creategGoldenEgg(rand);
            //console.log("Golden");
            flag=1;
        }
        else{
            eggCreated = createEgg(rand);
            //console.log("NormalEgg");
            flag=0;
        }
            counter++;
            var myVar = setInterval(function(){
                topcounter+=10;
                //console.log(basket.style.top);
                if(parseInt(eggCreated.style.top) >= parseInt(basket.style.top) && parseInt(eggCreated.style.top) <= parseInt(basket.style.top)+140 )
                /*
                    && parseInt(window.innerWidth - eggCreated.style.left) >= parseInt(window.innerWidth - basket.style.left) && parseInt(window.innerWidth - eggCreated.style.left) <= parseInt(window.innerWidth - basket.style.left)
                    
                    I wanted to use this code inside the if statement to make sure the egg is inside the range of the basket but it's not working, giving an error where it counts all falling eggs as a score as it all reaches the top of the basket as somepoint.
                */
                {
    
                    eggCreated.remove();
                    if(flag==0){ 
                        score++;
                    }
                    else if (flag==1){
                        score+=3;
                    }
                    yourScore.innerHTML = "Score: " + score;
                    clearInterval(myVar)
                    
                }
                else
                {
                    eggCreated.style.top = topcounter + "px";
                    
                }
        
            }, 100) //falling eggs interval
        
    }, 3000) //gameinterval

    // Timer function that start at 120 seconds 
    var mycounter = 121;
    var Timer = setInterval(function(){
        if(mycounter > 0)
        {
            mycounter--;
            yourTimer.innerHTML = "Time: " + mycounter;
            if(score == 20)
            {
                alertify.confirm("Congratulations🎉, YOU WON!!!", "Play again?", function(){ alertify.success("Ok" , document.location="index.html") }
                , function(){ alertify.error('Cancel')});

                // alertify.alert("YOU WON!!! , Congratulations🎉");
                // alertify.confirm("Play again?")
                // clearInterval(eggRand);
                // if(confirm("Play again?"))
                // document.location = "index.html";

            }
        }
        else{
            yourTimer.innerHTML = "Time: " +mycounter;
            alertify.confirm("GAME OVER", "Play again?", function(){ alertify.success("Ok" , document.location="index.html") }
                , function(){ alertify.error('Cancel')});

            // alertify.alert("GAME OVER! ");
            // if(confirm("Play again?"))
            // document.location = "index.html";
            clearInterval(Timer);
        }
    } , 1000) //timer


} // onload