//var urlDomain = window.localStorage.getItem("urlDomain");
var urlDomain = 'http://healthensuit-env.eba-ippzhmtu.ca-central-1.elasticbeanstalk.com/';

// function validatePassword(){
//     var bt = document.getElementById('btnSubmit');
//     var password = $("#pass").val();
//     var confirm_password = $("#confirmPass").val();
//     if(password != confirm_password) {
//         $("#divCheckPasswordMatch").html("Your retyped password need to match to proceed!");
//     } else {
//         $("#divCheckPasswordMatch").html(" ");
//         bt.disabled = false;
//     }
//   }

  function validateUsername(){
    var email = $("#email").val();
    var usName = $("#usName").val();
    if(email != usName) {
        $("#divCheckUsernameMatch").html("Email and Username provided do not match!");
    } else {
        $("#divCheckUsernameMatch").html(" ");
    }
  }

  function fillAllFields(){
    var bt = document.getElementById('btnSubmit');
    var conPass = document.getElementById('confirmPass');
    var fName = $("#firstN").val();
    var lName = $("#lastN").val();
    var prov = $("#inputProvince").val();
    var em = $("#email").val();
    var usN = $("#usName").val();
    var ps = $("#pass").val();
    if (fName != '' && lName != '' && prov != '' && em != '' && usN != '' && ps != '')  {
        conPass.disabled = false;
        $('#confirmPass').on('blur', function(e) { 

            var bt = document.getElementById('btnSubmit');
            var password = $("#pass").val();
            var confirm_password = $("#confirmPass").val();
            if(password != confirm_password) {
                $("#divCheckPasswordMatch").html("Your re-typed Password does not match, please re-enter.");
            } else {
                $("#divCheckPasswordMatch").html(" ");
                bt.disabled = false;
            }
        });
    } else {
        conPass.disabled = true;
        bt.disabled = true;
    }
}

  $(document).ready(function () {
    var bt = document.getElementById('btnSubmit');
    bt.disabled = true;
    $('#firstN, #lastN, #inputProvince, #email, #phone, #usName, #pass').keyup(fillAllFields);
    
 });

 

function getHowYouHearAboutUs() {
    var abouts = document.forms['regForm'].elements['abt'];
    var aboutInfos = ""; 

    for (i = 0; i < abouts.length; i++) {    
        if(abouts[i].checked == true){        
            aboutInfos +=  abouts[i].value + ",";               
        } 
    }
    return aboutInfos;
}



//  document.addEventListener("DOMContentLoaded", function(event) {
//     document.getElementById("btnSignin").disabled = true;
    
//   });


// let fetchBtn = document.getElementById("btnSignin"); 
  
  
//     fetchBtn.addEventListener("click", buttonclickhandler); 
  
//     function buttonclickhandler(event) { 
//         event.preventDefault();
//         // Instantiate an new XHR Object 
//         const xhr = new XMLHttpRequest(); 
  
//         // Open an obejct (GET/POST, PATH, 
//         // ASYN-TRUE/FALSE) 
//         xhr.open("GET",  "http://dummy.restapiexample.com/api/v1/employees", true); 
  
//         // When response is ready 
//         xhr.onload = function () { 
//             if (this.status === 200) { 
  
//                 // Changing string data into JSON Object 
//                 obj = JSON.parse(this.responseText); 
  
//                 // Getting the ul element 
//                 let list = document.getElementById("list"); 
//                 str = ""
//                 for (key in obj.data) { 
//                     str += `<li>${obj.data[key].employee_name}</li>`; 
//                 } 
//                 list.innerHTML = str; 
//             } 
//             else { 
//                 console.log("File not found"); 
//             } 
//         } 
  
//         // At last send the request 
//         xhr.send(); 
//     } 

function isEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
  };

  function isMobile(ph) {
    //var phoneno = /^\+?([1]{1})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var phoneno = /^[+]?[1]?[-. (]?([0-9]{3})[)-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    //var phoneno = /^[+]?[01]?[- .]?(\([2-9]\d{2}\)|[2-9]\d{2})[- .]?\d{3}[- .]?\d{4}$/;
    if(ph.match(phoneno)){
        console.log('Good!!!')
        return true;
    }else{
        return false;
    }
  }


$(document).ready(function () {

    emailIsElligible = false;

    $('[data-toggle="tooltip"]').tooltip()

    $('#phone').on('blur', function(e) {
        var currentphone = e.target.value,
            $phNode = $(this),
            isValid = true;

        if(currentphone.length != 0){
            console.log('Phone: '+currentphone)
            // Validate phone Number
            if (!isMobile(currentphone)){
                $("#errorMobileContainer").html("Invalid phone number. Enter a valid phone number.");
                $(this).css("border","1px solid red");
            }else{
                $("#errorMobileContainer").html(" ");
                $(this).css("border",".5px solid #BCBCBC");
            }
        }else{
            $("#errorMobileContainer").html(" ");
            $(this).css("border",".5px solid #BCBCBC");
        }
        
        

    });

    $("#usName").keyup(validateUsername);
        //validate provider email
    $('#email').on('blur', function(e) {
        var bt = document.getElementById('btnSubmit');
        // Current email input
        var currentEmail = e.target.value,
            $emailNode = $(this),
            isValid = true;
        
        // Validate email
        if (!isEmail(currentEmail)){
            $("#errorEmailContainer").html("Invalid email address. Enter a valid email address");
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
                    $("#errorEmailContainer").html("");
                    $emailNode.addClass('is-valid');
                } else{
                    emailIsElligible = false;
                    $("#errorEmailContainer").html("Email address exist");
                    sweetAlert("Email address exist!","Please use another email address","error");
                    $emailNode.addClass('is-error');
                    bt.disabled = true;
                } 
                
            }, 
            error: function(msg){
                emailIsElligible = false;
                $("#errorEmailContainer").html("Email address exist");
                sweetAlert("Email address exist!","Please use another email address","error");
                $emailNode.addClass('is-error');
                bt.disabled = true;
            }
        });
        
    });


    //Register Provider
    $('#btnSubmit').on('click', function(event){
        event.preventDefault();
        
        var firstName = document.getElementById("firstN").value;
        var lastName = document.getElementById("lastN").value;
        var provName = firstName + " " + lastName;
        var province = document.getElementById("inputProvince").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var mailAddress = document.getElementById("mailAdd").value;
        var username = document.getElementById("usName").value;
        var password = document.getElementById("pass").value;
        var aboutUs= getHowYouHearAboutUs();
        var otherMeans = document.getElementById("otherField");
        let url = urlDomain + 'insomnia/v1/provider/create';

        if(emailIsElligible == true){
            if(email == username){
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*'
                    },
                    data: JSON.stringify({"email": email, "howyouheardaboutUse": aboutUs,
                        "mailingAddress": mailAddress, "name": provName, "password": password, "phonenumber": phone, 
                        "province": province, "username": username}),
                    success: function(result){
                        console.log(result);
                        swal({title: "Health enSuite welcomes you!", text: "Your account has been created successfully. An activation link has been sent to your email address. Please click on the link to validate your account.", type: "success"},
                        function(){ 
                            window.location.href = "../index.html";
                        }
                        );
                    }, 
                    error: function(msg){
                        $("#errorContainer").html("Unable to register");
                        sweetAlert("Account creation failed!","Please try again shortly","error");
                    }
                });
            }else{
                sweetAlert("Username and Email address does not match!","Your username should be the same with your email address","error");
            }
        }else{
            sweetAlert("Email address exist!","Please use another email address","error");
        }

    });

});



