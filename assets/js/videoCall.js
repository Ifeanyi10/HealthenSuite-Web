
var urlDomain = 'https://api.healthensuite.com/';


function getProviderProfile(){
                        
    let url = urlDomain + 'insomnia/v1/authentication/identify';
    let authToken = window.localStorage.getItem("patientLoginToken");
    // console.log("Patient Token: "+authToken);
    // var fileLoc = window.localStorage.getItem("fileLoc");
    // console.log("Video: "+fileLoc);
    
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': '*/*',
            'Authorization': 'Bearer '+ authToken
        },
        success: function(result){
            console.log(result);
            if(result == true){
                var fileLoc = window.localStorage.getItem("fileLoc");
                var video = $('#divVideo video')[0];
                video.src = fileLoc;
                video.load();
                document.getElementById("pageInst").innerHTML = "Click on the play button below when you are ready to start watching the video. You are expected to close this tab and return to the intervention page of the Insomnia app when you have finished watching the video.";            
            }
            else{
                console.log("Payload Result1: "+result);
                console.log("Could not authenticate the user");
                document.getElementById("pageInst").innerHTML = "Hey! The intended video you wish to watch cannot be access unless you are signed in as a participant on the Insomnia web or mobile app.";
            }
            //window.localStorage.setItem("providerName", result.name);
            
        }, 
        error: function(msg){
            console.log("Payload Result2: "+msg);
            console.log("Could not authenticate the user");
            document.getElementById("pageInst").innerHTML = "Hey! The intended video you wish to watch cannot be access unless you are signed in as a participant on the Insomnia web or mobile app.";
        }
    });

}

$(document).ready(function() {

    getProviderProfile();

    // var fileLoc = "Providers/videos/Negative thoughts.mp4";
    // var video = $('#divVideo video')[0];
    // video.src = fileLoc;
    // video.load();
    // document.getElementById("pageInst").innerHTML = "Click on the play button below when you are ready to start watching the video. You are expected to close this tab and return to the intervention page of the Insomnia app when you have finished watching the video.";

  });