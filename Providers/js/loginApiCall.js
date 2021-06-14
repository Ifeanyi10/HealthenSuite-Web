var urlDomain = 'http://healthensuit-env.eba-ippzhmtu.ca-central-1.elasticbeanstalk.com/';
//var urlDomain = 'http://health001-env.eba-v5mudubf.us-east-2.elasticbeanstalk.com/';
//var urlDomain = 'http://192.168.6.15:8083/';


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
            swal({title: "Email Address Received!", text: "A reset password link will be sent to this email address if it has a valid account.", type: "success"},
            function(){ 
                window.location.href = "provider-login.html";
            }
            );
        }, 
        error: function(msg){
            console.log(msg);
            if(msg){
                swal({title: "Email Address Received!", text: "A reset password link will be sent to this email address if it has a valid account.", type: "success"},
                    function(){ 
                        window.location.href = "provider-login.html";
                    }
                );
            }else{
                sweetAlert("Username does not exist!","","error");
            }
            
        }
    });
  }

$(document).ready(function () {

    let errorNote = window.localStorage.getItem("loginError");
    if(errorNote == "true"){
        sweetAlert("Failed To Load Account Details!!","Please check your network and login again","error");
    }

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
                    window.location.href = "provider-dashboard.html";
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

    //Confirm Provider Email
    $('#btnSubmitEmail').on('click', function(event){
        event.preventDefault();
        var username = document.getElementById('recovUsername').value;
        var mailIsAvailable = false;
        // Validate email
        if (!isEmail(username)){
            //$("#errorEmailContainer").html("Invalid email address. Enter a valid email address");
            sweetAlert("Invalid email address!","Enter a valid email address.","error");
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
                    sweetAlert("Username does not exist!","Please enter your current username and try again.","error");
                } else{                   
                    receiveEmail(username);
                } 
                
            }, 
            error: function(msg){
                if(msg.status == 409 && msg.responseJSON == true){
                    receiveEmail(username);
                }else{
                    sweetAlert("Unable to confirm username!","Please try again shortly.","error");
                }
                
            }
        });

        
    });

 });