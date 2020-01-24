flag=0;
// function within start button that validate if user inserted his name
function startBtn(){
    var nameValue = document.getElementById("playername").value;
        if(nameValue == "" && flag==0)
        {
            // alert("Enter your name first");
            alertify.alert("Enter your name first");
            /* alertify one supposed to be working but it won't last on the screen
            for more than 0.001 sec and idk why.
            */
            window.location.href = "index.html";    
        }
        else
        {
            localStorage.setItem("name" , nameValue);
            window.open("Second.html");
        }
       }

