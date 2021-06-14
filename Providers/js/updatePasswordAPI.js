var urlDomain = window.localStorage.getItem("urlDomain");

function validateNewEmail(){
    var bt = document.getElementById('btnChangeEmail');
    var newE = $("#newEmail").val();
    var confirmE = $("#confirmNewEmail").val();
    // Validate email
    if (!isEmail(newE)){
        $("#divEmailErrorMsg").html("Invalid email address pattern!");
        return;
    }
    if(newE != confirmE) {
        $("#divEmailErrorMsg").html("New Email Address does not match yet!");
    } else {
        $("#divEmailErrorMsg").html(" ");
        bt.disabled = false;
    }
  }

  function validatePassword(){
    var bt = document.getElementById('btnChangePass');
    var password = $("#newPass").val();
    var confirm_password = $("#confirmNewPass").val();
    if(password != confirm_password) {
        $("#divCheckUpdatePWordMatch").html("You need to re-enter your new password to proceed.");
        bt.disabled = true;
    } else {
        $("#divCheckUpdatePWordMatch").html(" ");
        bt.disabled = false;
    }
  }

  function isEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
  };

  function fillEditField(supplierId, receiverId){
    var mytext = document.getElementById(supplierId).innerHTML;   
    document.getElementById(receiverId).value = mytext;
  }

$(document).ready(function () {

    var bt = document.getElementById('btnChangePass');
    bt.disabled = true;
    $('#confirmNewPass').keyup(validatePassword);
    $('#confirmNewEmail').keyup(validateNewEmail);
    emailIsElligible = false;
    let authTokenPatient = '';

    $(window).focus(function () {
        //do something
        let authToken = window.localStorage.getItem("token");
        authTokenPatient = window.localStorage.getItem("patientToken");
        console.log("You are in this tab and the token is: "+authToken);
        if(authToken == null){
            //urlDomain = 'http://health.us-east-2.elasticbeanstalk.com/';
            urlDomain = 'http://healthensuit-env.eba-ippzhmtu.ca-central-1.elasticbeanstalk.com/';
            window.localStorage.setItem("urlDomain", urlDomain);
            $('#loginModal').modal('show');
        }
    });

    //Quick Provider Login
    $('#btnQuickLogin').on('click', function(event){
        event.preventDefault();
        window.localStorage.clear();
        var username = document.getElementById('quickUsername').value;
        var password = document.getElementById('quickPass').value;
        let url = urlDomain + 'insomnia/v1/authentication/login';

        if(username != '' && password != ''){
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*'            
                  },
                data: JSON.stringify({"password": password, "username": username}),
                success: function(result){
                    window.localStorage.setItem("token", result.token);
                    window.localStorage.setItem("patientToken", authTokenPatient);
                    $('#loginModal').modal('hide');
                }, 
                error: function(msg){
                    //$("#errorContainer").html("Incorrect Username or Password");
                    sweetAlert("Incorrect username or password!","Please confirm your login credentials and try again.","error");
                }
            });
        }else{
            sweetAlert("Attention!","Please fill the fields properly and login","info");
        }
        
    });

    //Provider Change of password within the app
    $('#btnChangePass').on('click', function(event){
        event.preventDefault();
    
        var currentPass = document.getElementById("currentPass").value;
        var newPass = document.getElementById("newPass").value;
        var patEmail = window.localStorage.getItem("providerEmail");

        let authToken = window.localStorage.getItem("token");
        let url = urlDomain + 'insomnia/v1/authentication/changepasswordinapp';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "code" : patEmail,
                "code1" : currentPass,
                "code2" : newPass
                }),
            success: function(result){
                console.log(result);
                swal({title: "Done!", text: "Your password has been change. You will be required to login again.", type: "success"},
                function(){ 
                    window.location.href = "provider-login.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Change of password not successful!","Please ensure you typed your current password correctly.","error");
            }
        });
    });


    //Check email validity
    $('#newEmail').on('blur', function(e) {
        var bt = document.getElementById('btnChangeEmail');
        var confEmail = document.getElementById('confirmNewEmail');
        confEmail.disabled = true;
        // Current email input
        var currentEmail = e.target.value,
            $emailNode = $(this),
            isValid = true;
        
        // Validate email
        if (!isEmail(currentEmail)){
            $("#divEmailErrorMsg").html("Invalid email address pattern!");
            return;
        }
         
        let url = urlDomain + 'insomnia/v1/provider/checkEmail';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*'
            },
            data: JSON.stringify({"code": currentEmail}),
            success: function(result){
                console.log(result);
                // Finally update the state for the current field
                if (!result) {
                    emailIsElligible = true;
                    $("#divEmailErrorMsg").html("");
                    $emailNode.addClass('is-valid');
                    confEmail.disabled = false;
                } else{
                    emailIsElligible = false;
                    $("#divEmailErrorMsg").html("Email address already exist!");
                    sweetAlert("Email address exist!","","error");
                    $emailNode.addClass('is-error');
                    bt.disabled = true;
                    confEmail.disabled = true;
                } 
                
            }, 
            error: function(msg){
                emailIsElligible = false;
                $("#divEmailErrorMsg").html("Email address already exist!");
                sweetAlert("Email address exist!","","error");
                $emailNode.addClass('is-error');
                bt.disabled = true;
            }
        });
        
    });

    //Provider Change of Email within the app
    $('#btnChangeEmail').on('click', function(event){
        event.preventDefault();

        // Current email input
        var newEmail = document.getElementById("newEmail").value;
        
        // Validate email
        if (!isEmail(newEmail)){
            $("#divEmailErrorMsg").html("Invalid email address pattern!");
            return;
        }
    
        var currentName = window.localStorage.getItem("providerName");

        let authToken = window.localStorage.getItem("token");
        let url = urlDomain + 'insomnia/v1/provider/updateprofile';

        if(emailIsElligible == true){
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*',
                    'Authorization': 'Bearer '+ authToken
                },
                data: JSON.stringify({
                    "name" : currentName,
                    "email" : newEmail
                    }),
                success: function(result){
                    console.log(result);
                    swal({title: "Done!", text: "Your Email Address has been updated!", type: "success"},
                    function(){ 
                        window.location.href = "provider-dashboard.html";
                    }
                    );
                }, 
                error: function(msg){
                    $("#errorContainer").html("Unable to register");
                    sweetAlert("Failed to update Email Address!","Please try again shortly.","error");
                }
            });
        }else{
            sweetAlert("Email address exist!","Please use another email address","error");
        }
    });

    //Provider Change of Full Name within the app
    $('#btnChangeName').on('click', function(event){
        event.preventDefault();

        // Current email input
        var newName = document.getElementById("newName").value;
        
        // Validate email
        if (newName == ''){
            $("#divNameErrorMsg").html("Full Name cannot be empty!");
            return;
        }
    
        var currentEmail = window.localStorage.getItem("providerEmail");

        let authToken = window.localStorage.getItem("token");
        let url = urlDomain + 'insomnia/v1/provider/updateprofile';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "name" : newName,
	            "email" : currentEmail
                }),
            success: function(result){
                console.log(result);
                swal({title: "Done!", text: "Your Full Name has been updated!", type: "success"},
                function(){ 
                    window.location.href = "provider-dashboard.html";
                }
                );
            }, 
            error: function(msg){
                console.log(msg);
                console.log(msg.status);
                $("#errorContainer").html("Unable to register");
                sweetAlert("Failed to update Full Name!","Please try again shortly.","error");
            }
        });
    });


});