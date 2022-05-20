//var urlDomain = 'http://health001-env.eba-v5mudubf.us-east-2.elasticbeanstalk.com/';
var urlDomain = 'https://apiv3.healthensuite.com/';
// var urlDomain = 'https://api.healthensuite.com/';

function isEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
  };

  function receiveEmail(username){
    console.log('here2');
    let url = urlDomain + 'insomnia/v1/authentication/confirmusername';

    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': '*/*'            
        },
        data: JSON.stringify({"code": username}),
        success: function(result){
            console.log(result);
            //swal({title: "Email Address Received!!", text: "A reset password link will be sent to this email address!", type: "success"},
            var content = "<span style='font-weight: bold'>Email Address Received.</span> <span>A reset password link will be sent to this email address if it has a valid account.</span>";
            swal({title: "", text: content , html: true},
            function(){ 
                window.location.href = "patient-login.html";
            }
            );
        }, 
        error: function(msg){
            console.log(msg);
            if(msg){
                var content = "<span style='font-weight: bold'>Email Address Received.</span> <span>A reset password link will be sent to this email address if it has a valid account.</span>";
                swal({title: "", text: content , html: true},
                    function(){ 
                        window.location.href = "patient-login.html";
                    }
                );
            }else{
                sweetAlert("Email does not exist.","");
            }
            
        }
    });
  }


$(document).ready(function () {

    // var errorNote = window.localStorage.getItem("loginError");
    // if(errorNote == "true"){
    //     var content = "<span style='font-weight: bold'>Access denied.</span> <span>Please confirm your internet connectivity and then login.</span>";
    //     swal({title: "", text: content, html: true});
    //     //sweetAlert("Failed To Load Account Details!!","Please check your network and login again","error");
    // }

    //Login Patient
    $('#btnSignin').on('click', function(event){
        event.preventDefault();
        window.localStorage.clear();
        var username = document.getElementById('username').value;
        var password = document.getElementById('pass').value;
        //let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/login';
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
                    //alert(result);
                    console.log(result);
                    //set timeer (30 minutes) to disable the token 
                    window.localStorage.setItem("patientToken", result.token);
                    console.log(result.token);
                    //window.localStorage.setItem("enableSpClock", result.status.enableSleepClockbutton);
                    //window.localStorage.setItem("CBTLevel", result.status.interventionLevel);
                    //console.log(window.localStorage.getItem("enableSpClock"))
                    //console.log(window.localStorage.getItem("CBTLevel"))
                    window.localStorage.setItem("urlDomain", urlDomain);
                    window.localStorage.setItem("isNewLogin", true);
                    if(result.status.voidedReason == null){
                        if(result.patient == true){
                            window.location.href = "patient-dashboard.html";
                        }else{
                            var content = "<span style='font-weight: bold'>Access Denied.</span> <span>Your log-in details do not match our Patient records. Please verify the email address you have entered. To log-in at a later date, please visit our Home page using the link in the email sent to you when you first signed up for our app, and click on Login as Patient.</span>";
                            swal({title: "", text: content, html: true});
                        } 
                    }else{
                        var backendContent = result.status.voidedReason;
                        var content = "<span style='font-weight: bold'>Access Denied.</span> <span>"+backendContent+"</span>";
                        swal({title: "", text: content, html: true});
                    }
                      
                }, 
                error: function(msg){
                    //$("#errorContainer").html("Incorrect Username or Password");
                    var content = "<span style='font-weight: bold'>Username and/or password does not match our records.</span> <span>Please check to proceed or click on Reset password.</span>";
                    swal({title: "", text: content, html: true});
                    //sweetAlert("Incorrect username or password!!","Please confirm your login credentials and try again","error");
                }
            });
        }else{
            sweetAlert("Attention","Please fill the fields properly and login");
        }
        
    });

    //Confirm Patient Email
    $('#btnSubmitEmail').on('click', function(event){
        event.preventDefault();
        var username = document.getElementById('recovUsername').value;
        // Validate email
        if (!isEmail(username)){
            //$("#errorEmailContainer").html("Invalid email address. Enter a valid email address");
            var content = "<span style='font-weight: bold'>Invalid email address.</span> <span>Enter a valid email address.</span>";
            swal({title: "", text: content, html: true});
            //sweetAlert("Invalid email address!","Enter a valid email address","error");
            return;
        }
         
        let url = urlDomain + 'insomnia/v1/patient/checkEmail';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*'
            },
            data: JSON.stringify({"code": username}),
            success: function(result){
                console.log(result);
                // Finally update the state for the current field
                if (!result) {
                    var content = "<span style='font-weight: bold'>Email does not exist in our record.</span> <span>Please enter a registered email and try again.</span>";
                    swal({title: "", text: content, html: true});
                    //sweetAlert("Username does not exist!","Please enter your current username and try again","error");
                } else{                   
                    receiveEmail(username)
                } 
                
            }, 
            error: function(msg){
                if(msg.status == 409 && msg.responseJSON == true){
                    receiveEmail(username);
                }else{
                    var content = "<span style='font-weight: bold'>Unable to confirm email.</span> <span>Please try again shortly.</span>";
                    swal({title: "", text: content, html: true});
                    //sweetAlert("Unable to confirm username!","Please try again shortly.","error");
                }
            }
        });

    });

 });