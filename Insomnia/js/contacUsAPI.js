var urlDomain = window.localStorage.getItem("urlDomain");

$(document).ready(function () {

    //Patient Voluntary Withdrawal
    $('#btnVolWithdrawal').on('click', function(event){
        event.preventDefault();
    
        var withNote = document.getElementById("withdrawNote").value;
        let authToken = window.localStorage.getItem("patientToken");
        let url = urlDomain + 'insomnia/v1/dashboard/withdraw';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "code" : withNote
                }),
            success: function(result){
                console.log(result);
                var content = "<span style='font-weight: bold'>We are sad to see you go.</span> <span>You have voluntarily withdrawn yourself from the Health enSuite Insomnia study.</span>";
                swal({title: "", text: content, html: true},
                function(){ 
                    window.location.href = "../index.html";
                }
                );
            }, 
            error: function(msg){
                if(msg.status == "511"){
                    displayQuickAlert();
                }else{
                    $("#errorContainer").html("Unable to register");
                    sweetAlert("Your withdrawal attempt failed.","Please try again shortly.");
                }
            }
        });
    });

    
});

//Patient Feedback Submission
function submitFeedback(event, noteID){
    event.preventDefault();

    var theNote = document.getElementById(noteID).value;
    let authToken = window.localStorage.getItem("patientToken");
    let url = urlDomain + 'insomnia/v1/dashboard/feedback';
    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': '*/*',
            'Authorization': 'Bearer '+ authToken
        },
        data: JSON.stringify({
            "code" : theNote
            }),
        success: function(result){
            console.log(result);
            swal({title: "Done", text: "Your feedback has been captured. Thank you.", type: "success"},
            function(){ 
                window.location.href = "patient-dashboard.html";
            }
            );
        }, 
        error: function(msg){
            if(msg.status == "511"){
                displayQuickAlert();
            }else{
                $("#errorContainer").html("Unable to register");
                sweetAlert("Feedback submission failed.","Please try again shortly.");
            }
        }
    });
};