var urlDomain = 'https://apiv3.healthensuite.com/';
// var urlDomain = 'https://api.healthensuite.com/';

function fillAllFields(){
    var bt = document.getElementById('btnRecRefCode');
    var fName = $("#recPatFName").val().trim();
    var lName = $("#recPatLName").val().trim();
    // var ag = $("#recPatAge").val().trim();
    // var em = $("#recPatEmail").val().trim();

    // if(fName == ""){
    //     $("#firstError").html("Please enter your first name.");
    // }else{$("#firstError").html("");}

    // if(lName == ""){
    //     $("#lastError").html("Please enter your last name.");
    // }else{$("#lastError").html("");}

    if(fName != ""){
        $("#firstError").html("");
    }

    if(lName != ""){
        $("#lastError").html("");
    }
    
    console.log('Thanks')
    // if (fName != '' && lName != '' && em != '')  {

        // ageData = validateAge(ag);
        // emailData = validateEmail(em);
        // if(ageData && emailData){
        //     bt.disabled = false;
        // }else{
        //     bt.disabled = true;
        // }

        
    // } else {
    //     bt.disabled = true;
    // }
}

function validateEmail(){
    var emailIsgood = false;
    var em = $("#recPatEmail").val().trim();
    if(em != ""){
        if (!isEmail(em)){
            $("#emailError").html("Invalid email address pattern");
            emailIsgood = false
        }else{
            $("#emailError").html("");
            emailIsgood = true;       
        }
    }else{
        $("#emailError").html("Please enter email address");
    }
    
    return emailIsgood;
}

function validateAge(){
    var ageIsgood = false;
    var ag = $("#recPatAge").val().trim();
    if(ag != ""){
        if(ag > 17 && ag <= 150 && ag.charAt(0) != 0){
            try {
                if(ag % 1 == 0){
                    ag = parseInt(ag);
                    $("#ageError").html("");  
                    ageIsgood = true;                       
                }else{
                    $("#ageError").html("Please enter a valid age of the patient.");
                    ageIsgood = false;
                }
              }
              catch(err) {
                $("#ageError").html("Please enter a valid age of the patient.");
                ageIsgood = false;
                console.log("Error: "+err);
              }
        }else{
            $("#ageError").html("Age cannot be less than 18 years or greater than 150 years. Please confirm your age to proceed.");
            ageIsgood = false;
        }
    }else{
        $("#ageError").html("Please enter your age.");
    }
    
    return ageIsgood;
}

function validateNames(firstName, lastName){
    if(firstName == ""){
        $("#firstError").html("Please enter your first name.");
    }

    if(lastName == ""){
        $("#lastError").html("Please enter your last name.");
    }
}


function isEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
  };


   //Patient gender
 function getTrial1Gender(elementName) {
    var genderInfo = document.forms['recovForm'].elements[elementName];
    var gender = ""; 

    for (i = 0; i < genderInfo.length; i++) {    
        if(genderInfo[i].checked == true){        
            gender =  genderInfo[i].value;               
        } 
    }
    return gender;
}

 $(document).ready(function () {
     
    
    $('#recPatFName, #recPatLName, #recPatAge, #recPatEmail').keyup(fillAllFields);
    $('#recPatAge').keyup(validateAge);
    $('#recPatEmail').keyup(validateEmail);

    //Login Patient Ref Code
    $('#btnSignin').on('click', function(event){
        event.preventDefault();
        var refCode = document.getElementById('refCode').value;
        var patName = document.getElementById('patName').value;
        let url = urlDomain + 'insomnia/v1/patient/refCode';


        if(refCode != '' && patName != ''){
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*'            
                },
                data: JSON.stringify({"code": refCode, "code1": patName}),
                success: function(result){
                    console.log(result);
                    if(result != null) {
                        if(result.errorMessage == null){
                            if(result.status == null){
                                window.localStorage.setItem("patToken", result.token);
                                window.location.href = "eligibility-question.html";
                            } else if(result.status.consent == false){
                                window.localStorage.setItem("patToken", result.token);
                                if(result.trialType == 1){
                                    window.location.href = "consent.html";
                                }else{
                                    window.location.href = "consent-dep.html";
                                } 
                            }else{
                                //sweetAlert("You have submitted your consent!","If you are yet login to your patient account, please search for the email sent to you after submitting your consent form to complete your account setup","error");
                                var content = "<span style='font-weight: bold'>You have submitted your consent.</span> <span>If you are yet login to your patient account, please search for the email sent to you after submitting your consent form to complete your account setup.</span>";
                                swal({title: "", text: content, html: true});
                            }
                        }else{
                            var backendContent = result.errorMessage;
                            var content = "<span style='font-weight: bold'>Access Denied.</span> <span>"+backendContent+"</span>";
                            swal({title: "", text: content, html: true});
                        }
                    }else{
                        //sweetAlert("The referral code you entered does not match the name provided!","Please confirm the referral code and your name and try again.","error");
                        var content = "<span style='font-weight: bold'>The Referral code does not match with the Name entered.</span> <span>Please make sure that no space(s) are added in front or at the end of the referral code, and the name entered exactly matches the one entered during referral by your healthcare provider.</span>";
                        swal({title: "", text: content, html: true});
                    }
                    window.localStorage.setItem("urlDomain", urlDomain);
                }, 
                error: function(msg){
                    //$("#errorContainer").html("Incorrect Username or Password");
                    //sweetAlert("The referral code you entered does not match the name provided!","Please confirm the referral code and your name and try again.","error");
                    var content = "<span style='font-weight: bold'>The Referral code does not match with the Name entered.</span> <span>Please make sure that no space(s) are added in front or at the end of the referral code, and the name entered exactly matches the one entered during referral by your healthcare provider.</span>";
                    swal({title: "", text: content, html: true});
                }
            });
        }else{
            if(refCode == '' && patName != ''){
                sweetAlert("Attention","Please enter your Referral code to proceed.");
            } else if(refCode != '' && patName == ''){
                sweetAlert("Attention","Please enter your Last Name to proceed.");
            } else{
                sweetAlert("Attention","Please enter your Referral code and Last Name to proceed.");
            } 
        }
    });


     //Patient request to regenerate Referral Code
     $('#btnRecRefCode').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("recPatFName").value;
        var lastName = document.getElementById("recPatLName").value;
        var age = document.getElementById("recPatAge").value;
        age = parseInt(age);
        var email = document.getElementById("recPatEmail").value;
        // var gender= getTrial1Gender("optradio21");

        let url = urlDomain + 'insomnia/v1/dashboard/reguestforcode';  

        ageData = validateAge();
        emailData = validateEmail();

        if(ageData && emailData){
            if(firstName != '' && lastName != ''){
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*'
                      },
                    data: JSON.stringify({"firstName": firstName, "lastName": lastName, "age": age, "email" : email}),
                    success: function(result){
        
                        console.log(result);
                        if(result){
                            swal({title: "Request sent", text: "Health enSuite will send your Referral code to your email address. Please check your Inbox/Spam folder for your Referral Code.", type: "success"},
                            function(){ 
                                $('#contactModalInfo').modal('hide');
                            }
                            );
        
                        }else{
                            // swal({title: "Request not sent!", text: "The details you provided cannot be found on our record.", type: "error"},
                            // function(){ 
                            //     $('#contactModalInfo').modal('hide');
                            // }
                            // );
                            sweetAlert("Attention","The details you provided cannot be found on our record.");
                        }
                        
                    }, 
                    error: function(msg){
                        //sweetAlert("Unable to submit referral code recovery request!","Please try again shortly","error");
                        var content = "<span style='font-weight: bold'>Unable to submit referral code recovery request.</span> <span>Please try again shortly.</span>";
                        swal({title: "", text: content, html: true});
                    }
                });
            }else{
                validateNames(firstName, lastName);
                //sweetAlert("Attention","Please enter your First Name and Last Name to proceed.");
            }
        }else{
            validateNames(firstName, lastName);
        }
        
    });


 });