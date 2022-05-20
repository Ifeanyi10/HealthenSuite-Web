//var urlDomain = window.localStorage.getItem("urlDomain");
//var urlDomain = 'https://api.healthensuite.com/';
var urlDomain = 'https://apiv3.healthensuite.com/';
var emailIsElligible = false;
var mobileNumberIsElligible = false;

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

//   function validateUsername(){
//     var email = $("#email").val();
//     var usName = $("#usName").val();
//     if(email != usName) {
//         $("#divCheckUsernameMatch").html("Email and Username provided do not match!");
//     } else {
//         $("#divCheckUsernameMatch").html(" ");
//     }
//   }

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
        //conPass.disabled = false;
        $('#confirmPass').on('blur', function(e) {
            validatePasswordMatch();
        });
        validatePasswordMatch();
    } else {
        //conPass.disabled = true;
        bt.disabled = true;
        $("#divCheckAllField").html("Please, fill all the mandatory fields.");
    }
}

function validatePasswordMatch(){
    var bt = document.getElementById('btnSubmit');
    var password = $("#pass").val();
    var confirm_password = $("#confirmPass").val();
    var currentphone = $("#phone").val();
    ValidateMobileNumber(currentphone)
    if(password != confirm_password) {
        $("#divCheckPasswordMatch").html("Password does not match.");
        bt.disabled = true;
    } else {
        $("#divCheckPasswordMatch").html(" ");
        console.log("Email from ValPassword is: "+emailIsElligible)
        if(emailIsElligible){
            if(mobileNumberIsElligible){
                var aboutUs= getHowYouHearAboutUs();
                if(aboutUs != ""){
                    $("#divCheckAllField").html(" ");
                    bt.disabled = false;
                }else{
                    $("#divCheckAllField").html("Select how you heard about us.");
                    bt.disabled = true;
                }
                
            }else{
                $("#divCheckAllField").html("Enter a valid mobile number or leave the field empty.");
                bt.disabled = true;
            }
            
        }else{
            $("#divCheckAllField").html("Email address already exist.");
            bt.disabled = true;
        }
    }
}

//   $(document).ready(function () {
//     var bt = document.getElementById('btnSubmit');
//     bt.disabled = true;
//     $('#firstN, #lastN, #inputProvince, #email, #phone, #usName, #pass').keyup(fillAllFields);

//  });



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


function ValidateMobileNumber(currentphone){
    if(currentphone.length != 0){
        console.log('Phone: '+currentphone)
        // Validate phone Number
        if (!isMobile(currentphone)){
            $("#errorMobileContainer").html("Invalid mobile number.");
            $(this).css("border","1px solid red");
            mobileNumberIsElligible = false;
        }else{
            $("#errorMobileContainer").html(" ");
            $(this).css("border",".5px solid #BCBCBC");
            mobileNumberIsElligible = true;
        }
    }else{
        $("#errorMobileContainer").html(" ");
        $(this).css("border",".5px solid #BCBCBC");
        mobileNumberIsElligible = true;
    }
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

    var bt = document.getElementById('btnSubmit');
    bt.disabled = true;
    $('#firstN, #lastN, #inputProvince, #email, #phone, #usName, #pass, #confirmPass').keyup(fillAllFields);

    $("#divCheckAllField").html("Please, fill all the mandatory fields.");


    $('[data-toggle="tooltip"]').tooltip()

    $('#phone').on('blur', function(e) {
        var currentphone = e.target.value,
            $phNode = $(this),
            isValid = true;

            ValidateMobileNumber(currentphone)

    });

    //$("#usName").keyup(validateUsername);
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
            fillAllFields();
            return;
        }

        $("#usName").val(currentEmail);

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
                    fillAllFields();
                    console.log("Email from success message is: "+emailIsElligible)
                } else{
                    emailIsElligible = false;
                    $("#errorEmailContainer").html("Email address exist");
                    var content = "<span style='font-weight: bold'>Email address exist.</span> <span>Please use another email address.</span>";
                    swal({title: "", text: content, html: true});
                    //sweetAlert("Email address exist!","Please use another email address","error");
                    $emailNode.addClass('is-error');
                    bt.disabled = true;
                    fillAllFields();
                    console.log("Email from failed message is: "+emailIsElligible)
                }

            },
            error: function(msg){
                emailIsElligible = false;
                $("#errorEmailContainer").html("Email address exist");
                var content = "<span style='font-weight: bold'>Email address exist.</span> <span>Please use another email address.</span>";
                swal({title: "", text: content, html: true});
                $emailNode.addClass('is-error');
                bt.disabled = true;
                fillAllFields();
                console.log("Email from failed message is: "+emailIsElligible)
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
            //if(email == username){
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
                        swal({title: "Health enSuite welcomes you", text: "Your Health enSuite Provider Account has been successfully created. An activation link has been sent to your email address (check Inbox/Spam). Please click on that link to activate your account.", type: "success"},
                        function(){
                            window.location.href = "../index.html";
                        }
                        );
                    },
                    error: function(msg){
                        $("#errorContainer").html("Unable to register");
                        var content = "<span style='font-weight: bold'>Account creation failed.</span> <span>Please try again shortly.</span>";
                        swal({title: "", text: content, html: true});
                        //sweetAlert("Account creation failed!","Please try again shortly","error");
                    }
                });
            // }else{
                
            //     sweetAlert("Username and Email address does not match!","Your username should be the same with your email address","error");
            // }
        }else{
            var content = "<span style='font-weight: bold'>Email address exist.</span> <span>Please use another email address.</span>";
            swal({title: "", text: content, html: true});
        }

    });

});



