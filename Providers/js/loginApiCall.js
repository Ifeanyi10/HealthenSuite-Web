// var urlDomain = 'https://api.healthensuite.com/';
//var urlDomain = 'http://health001-env.eba-v5mudubf.us-east-2.elasticbeanstalk.com/';
var urlDomain = 'https://apiv3.healthensuite.com/';


function isEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
  };

  function receiveEmail(username){
    //console.log('here2');
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
            var content = "<span style='font-weight: bold'>Email Address Received.</span> <span>A reset password link will be sent to this email address if it has a valid account.</span>";
            swal({title: "", text: content , html: true},
            function(){ 
                window.location.href = "provider-login.html";
            }
            );
        }, 
        error: function(msg){
            console.log(msg);
            if(msg){
                var content = "<span style='font-weight: bold'>Email Address Received.</span> <span>A reset password link will be sent to this email address if it has a valid account.</span>";
                swal({title: "", text: content , html: true},
                    function(){ 
                        window.location.href = "provider-login.html";
                    }
                );
            }else{
                sweetAlert("Email does not exist.","");
            }
            
        }
    });
  }

$(document).ready(function () {

    // let errorNote = window.localStorage.getItem("loginError");
    // if(errorNote == "true"){
    //     var content = "<span style='font-weight: bold'>Access denied.</span> <span>Please confirm your internet connectivity and then login.</span>";
    //     swal({title: "", text: content, html: true});
    //     //sweetAlert("Failed To Load Account Details!!","Please check your network and login again","error");
    // }

    //Login Provider
    $('#btnSignin').on('click', function(event){
        event.preventDefault();
        window.localStorage.clear();
        var username = document.getElementById('username').value;
        var password = document.getElementById('pass').value;
        let url = urlDomain + 'insomnia/v1/authentication/login';


        // const data = JSON.stringify({
        //     "password": password.val(), 
        //     "username": username.val()
        //   })
          
        //   const xhr = new XMLHttpRequest()
        //   xhr.withCredentials = true
          
        //   xhr.addEventListener('readystatechange', function() {
        //     if (this.readyState === this.DONE) {
        //       console.log(this.responseText);
        //       //$.session.set('loginToken', result);
        //       //window.location.href = "index.html";
        //     }else{
        //         sweetAlert("Oops...","Invalid username or password!!","error");
        //     }
        //   })
          
        //   xhr.open('POST', url)
        //   xhr.setRequestHeader('content-type', 'application/json')
        //   xhr.setRequestHeader('accept', '*/*')
          
        //   xhr.send(data)
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
                    window.localStorage.setItem("token", result.token);
                    window.localStorage.setItem("isAdmin", result.admin);
                    window.localStorage.setItem("urlDomain", urlDomain);
                    //window.localStorage.setItem("isNewProviderLogin", true);
                    //alert(window.localStorage.getItem("token"));
                    if(result.provider == true){
                        window.location.href = "provider-dashboard.html";
                    }else{
                        var content = "<span style='font-weight: bold'>Access Denied.</span> <span>Your log-in details do not match our Provider records. Please verify the email address you have entered. To log-in at a later date, please visit our Home page, and click on Login as Provider.</span>";
                        swal({title: "", text: content, html: true});
                    }
                    
                }, 
                error: function(msg){
                    //$("#errorContainer").html("Incorrect Username or Password");
                    var content = "<span style='font-weight: bold'>Username and/or password does not match our records.</span> <span>Please check to proceed or click on Reset password.</span>";
                    swal({title: "", text: content, html: true});
                    //sweetAlert("Incorrect username or password!","Please confirm your login credentials and try again.","error");
                }
            });
        }else{
            sweetAlert("Attention","Please fill the fields properly and login");
        }
        
    });

    //Confirm Provider Email
    $('#btnSubmitEmail').on('click', function(event){
        event.preventDefault();
        var username = document.getElementById('recovUsername').value;
        var mailIsAvailable = false;
        // Validate email
        if (!isEmail(username)){
            //$("#errorEmailContainer").html("Invalid email address. Enter a valid email address");
            var content = "<span style='font-weight: bold'>Invalid email address.</span> <span>Enter a valid email address.</span>";
            swal({title: "", text: content, html: true});
            //sweetAlert("Invalid email address!","Enter a valid email address.","error");
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
            data: JSON.stringify({"code": username}),
            success: function(result){
                console.log(result);
                // Finally update the state for the current field
                if (!result) {
                    var content = "<span style='font-weight: bold'>Email does not exist in our record.</span> <span>Please enter a registered email and try again.</span>";
                    swal({title: "", text: content, html: true});
                    //sweetAlert("Username does not exist!","Please enter your current username and try again.","error");
                } else{                   
                    receiveEmail(username);
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