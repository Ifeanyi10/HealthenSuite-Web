//var urlDomain = 'http://192.168.6.15:8083/';
var urlDomain = 'https://api.healthensuite.com/';

function fillAllFields(){
    var bt = document.getElementById('btnRecRefCode');
    var fName = $("#recPatFName").val();
    var lName = $("#recPatLName").val();
    var ag = $("#recPatAge").val();
    var em = $("#recPatEmail").val();
    console.log('Thanks')
    if (fName != '' && lName != '' && em != '')  {
        if (!isEmail(em)){
            $("#ageError").html("Invalid email address pattern");
            bt.disabled = true;
        }else{
            $("#ageError").html("");
            //bt.disabled = false;

            if(ag > 17  && ag != ''){
                bt.disabled = false;
                $("#ageError").html("");
            }else{
                $("#ageError").html("Please confirm your age (must be 18 years or older).");
                bt.disabled = true;
            }
        }
        
    } else {
        bt.disabled = true;
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
                        if(result.status == null){
                            window.localStorage.setItem("patToken", result.token);
                            window.location.href = "eligibility-question.html";
                        } else if(result.status.consent == false){
                            window.localStorage.setItem("patToken", result.token);
                            window.location.href = "consent.html";
                        }else{
                            sweetAlert("You have submitted your consent!","If you are yet login to your patient account, please search for the email sent to you after submitting your consent form to complete your account setup","error");
                        }
                        
                    }else{
                        sweetAlert("The referral code you entered does not match the name provided!","Please confirm the referral code and your name and try again.","error");
                    }
                    window.localStorage.setItem("urlDomain", urlDomain);
                }, 
                error: function(msg){
                    //$("#errorContainer").html("Incorrect Username or Password");
                    sweetAlert("The referral code you entered does not match the name provided!","Please confirm the referral code and your name and try again.","error");
                }
            });
        }else{
            sweetAlert("Attention!","Please fill the fields properly and login","info");
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
                    swal({title: "Request sent!", text: "Health enSuite will send your Referral code to your email address. Please check your Inbox/Spam folder for your Referral Code.", type: "success"},
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
                    sweetAlert("Request not sent!","The details you provided cannot be found on our record","error");
                }
                
            }, 
            error: function(msg){
                sweetAlert("Unable to submit referral code recovery request!","Please try again shortly","error");
            }
        });
    });


 });