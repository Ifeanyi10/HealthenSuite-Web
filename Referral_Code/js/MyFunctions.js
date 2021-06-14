var urlDomain = window.localStorage.getItem("urlDomain");

function loadNameValues() {
    //var inputFirstName = $.session.get('firstName');
    //var inputLastName = $.session.get('lastName');
    var inputFirstName = "Paul";
    var inputLastName = "Smith";
    document.getElementById("myFirst").value=(inputFirstName);
    document.getElementById("myLast").value=(inputLastName);
}

function notEligibleAlert(alertValue){
    swal({title: alertValue, text: "", type: "error"},
                function(){ 
                    //window.location.href = "index.html";
                }
                );
}

function hideDispaly1(firstQ, secondQ, disqualify1, yesAns, noAns) {
    var x = document.getElementById(firstQ);
    var y = document.getElementById(secondQ);
    var z = document.getElementById(disqualify1);

    if (document.getElementById(yesAns).checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
        $('input[name=optradio2]').prop("checked",false);

        document.getElementById('thirdQ').style.display = 'none';     
        $('input[name=optSleep]').prop("checked",false); 

        document.getElementById('fourthQ').style.display = 'none';     
        $('input[name=optradio4]').prop("checked",false); 

        document.getElementById('fifthQ').style.display = 'none';     
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

        z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){

        if(disqualify1 == 'disqualify1'){
            notEligibleAlert('You must be 18 years old or older to participate in this study.');
        }
        $('input[name=optradio]').prop("checked",false);

        document.getElementById('secondQ').style.display = 'none';   
        $('input[name=optradio2]').prop("checked",false);

        document.getElementById('thirdQ').style.display = 'none';     
        $('input[name=optSleep]').prop("checked",false); 

        document.getElementById('fourthQ').style.display = 'none';     
        $('input[name=optradio4]').prop("checked",false); 

        document.getElementById('fifthQ').style.display = 'none';     
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

    }
}


function hideDispaly2(firstQ, secondQ, disqualify1, yesAns, noAns) {
    var x = document.getElementById(firstQ);
    var y = document.getElementById(secondQ);
    var z = document.getElementById(disqualify1);

    if (document.getElementById(yesAns).checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
        $('input[name=optSleep]').prop("checked",false);

        document.getElementById('fourthQ').style.display = 'none';     
        $('input[name=optradio4]').prop("checked",false); 

        document.getElementById('fifthQ').style.display = 'none';     
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

        z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){
     
        if(disqualify1 == 'disqualify2'){
            notEligibleAlert('To access the Health enSuite Insomnia program you need regular access to a device with an internet connection.');
        }

        $('input[name=optradio2]').prop("checked",false); 

        document.getElementById('thirdQ').style.display = 'none';     
        $('input[name=optSleep]').prop("checked",false); 

        document.getElementById('fourthQ').style.display = 'none';     
        $('input[name=optradio4]').prop("checked",false); 

        document.getElementById('fifthQ').style.display = 'none';     
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

    }
}


function hideDispaly4(firstQ, secondQ, disqualify1, yesAns, noAns) {
    var x = document.getElementById(firstQ);
    var y = document.getElementById(secondQ);
    var z = document.getElementById(disqualify1);

    if (document.getElementById(yesAns).checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
           
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

        z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){
     
        if(disqualify1 == 'disqualify4'){
            notEligibleAlert('Health enSuite Insomnia is not designed for sleep problems related changing work schedules or shift work.');
        }
    
        $('input[name=optradio4]').prop("checked",false); 

        document.getElementById('fifthQ').style.display = 'none';     
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

    }
}


function hideDispaly5(firstQ, secondQ, disqualify1, yesAns, noAns) {
    var x = document.getElementById(firstQ);
    var y = document.getElementById(secondQ);
    var z = document.getElementById(disqualify1);

    if (document.getElementById(yesAns).checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
               
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

        z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){
     
        if(disqualify1 == 'disqualify4'){
            notEligibleAlert('Health enSuite Insomnia is not designed for sleep problems related changing work schedules or shift work.');
        }
       
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

    }
}

function hideDispaly6(firstQ, secondQ, disqualify1, yesAns, noAns) {
    var x = document.getElementById(firstQ);
    var y = document.getElementById(secondQ);
    var z = document.getElementById(disqualify1);

    if (document.getElementById(yesAns).checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
                   
        $('input[name=optradio7]').prop("checked",false);

        z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){
     
        if(disqualify1 == 'disqualify6'){
            notEligibleAlert('Health enSuite Insomnia is not designed to address sleep disturbances related to pregnancy or caring for an infant.');
        }
            
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

    }
}

function hideDispaly7(firstQ, secondQ, disqualify1, yesAns, noAns) {
    var x = document.getElementById(firstQ);
    var y = document.getElementById(secondQ);
    var z = document.getElementById(disqualify1);

    if (document.getElementById(yesAns).checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 

        z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){
     
        if(disqualify1 == 'disqualify6'){
            notEligibleAlert('Health enSuite Insomnia is not designed to address sleep disturbances related to pregnancy or caring for an infant.');
        }

        $('input[name=optradio7]').prop("checked",false);
        document.getElementById('submit').style.display = 'none';   
    }
}



function validateMedCheck(){
    var meds = document.forms['formEligible'].elements['optSleep'];
    for (i = 0; i < meds.length; i++) {    
        if(meds[i].checked == true){
            sleepVal = meds[i].value;
            window.localStorage.setItem("sleepResponse", sleepVal);
            //alert(sleepVal);
            return
        }
    }
}


function symptomHideDispaly() {
    var x = document.getElementById('thirdQ');
    var y = document.getElementById('fourthQ');
    var z = document.getElementById('disqualify3');

    if (document.getElementById('noSymp').checked) {
        notEligibleAlert('Health enSuite Insomnia is unlikely to help you if you are not experiencing difficulty sleeping.');
        //x.style.display = 'none';
        //y.style.display = 'none';
        //z.style.display = 'block';    
        $('input[name=optSleep]').prop("checked",false); 

        document.getElementById('fourthQ').style.display = 'none';     
        $('input[name=optradio4]').prop("checked",false); 

        document.getElementById('fifthQ').style.display = 'none';     
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

    } else{
        validateMedCheck();
        //x.style.display = 'none';
        y.style.display = 'block'; 
        z.style.display = 'none';
        $('input[name=optradio4]').prop("checked",false); 

        document.getElementById('fifthQ').style.display = 'none';     
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);
    }
}


function hideDispalyConsent(first, second, contAns) {
    var x = document.getElementById(first);
    var y = document.getElementById(second);

    if (document.getElementById(contAns).checked) {
                    
    } 
    x.style.display = 'none';
    y.style.display = 'block';
}

function hideDispalyConsentAnswer(answerId) {
    var x = document.getElementById(answerId);
    x.style.display = 'block';            
}


function checkAgreeConsent(first, second, contAns, formId, checkboxId) {
    var x = document.getElementById(first);
    var y = document.getElementById(second);
    var iAgrees = document.forms[formId].elements[checkboxId];

    //if (document.getElementById(contAns).checked) {
        var agreeCount = 0;
        
        for (i = 0; i < iAgrees.length; i++) {    
            if(iAgrees[i].checked == true){
                agreeCount++;
            }
        }

        if(agreeCount == 6){
            x.style.display = 'none';
            y.style.display = 'block'; 
        }else{
            //alert("Please click all box to proceed");
            sweetAlert("Cannot Proceed!","Please review all the information, check them off to proceed.","error");
        }
                   
    //} 
}

function checkAgreement(first, second, contAns, finalAgree) {
    var x = document.getElementById(first);
    var y = document.getElementById(second);
    var iAgrees = document.getElementById(finalAgree);

    //if (document.getElementById(contAns).checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
        // if(iAgrees.checked == true){
        //     x.style.display = 'none';
        //     y.style.display = 'block'; 
        // }else{
        //     alert("Please click Agree Box to proceed");
        // }       
    //} 
}

function concludeConsent(first) {
    var x = document.getElementById(first);
    x.style.display = 'none';
    window.location.href = "consent-completed.html";               
}


function decideToConsent() {
    var x = document.getElementById('submit');
    var y = document.getElementById('waitInfo');
    

    if (document.getElementById('begin').checked) {
        submitElligible();       
    }else if (document.getElementById('wait').checked){

        swal({
            title: "You opted to continue later!",
            text: "You will need to enter your referral code again when you are ready to continue.",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#2087c8",
            confirmButtonText: "No, let me continue now",
            cancelButtonColor: "#01AA73",
            cancelButtonText: "Yes, I will continue later",
            closeOnConfirm: false,
            closeOnCancel: false
            },
            function(isConfirm){
            if (isConfirm) {
                submitElligible();
                
            } else {
                //swal("Cancelled", "You chose to continue later :)", "error");
                window.location.href = "referral.html";
            }
            });
               
    }
}


//Elligibility Submission
function submitElligible(){
    //event.preventDefault();
    var patientToken = window.localStorage.getItem("patToken");
    console.log(patientToken)
    //var sleepExperience = window.localStorage.getItem("sleepResponse");
    let url = urlDomain + 'insomnia/v1/patient/eligibility';

    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': '*/*',
            'Authorization': 'Bearer '+ patientToken            
          },
        data: JSON.stringify({"accessToInternet": true,
        "ageUpto18": true,
        "childCaregiver": false,
        "nightShiftinNext3Months": false,
        "nightWork": false,
        "pregantoraboutTo": false,
        "sleepExperience": "1"}),
        success: function(result){
           console.log(result); 
           window.location.href = "consent.html";              
        }, 
        error: function(msg){
            //$("#errorContainer").html("Incorrect Username or Password");
            sweetAlert("Unable to submit your eligibilty response!","You may have submitted your consent before now.","error");
        }
    });
}



function goToNext(firstDisplay, secondDisplay){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    var z = document.getElementById('header');
    var tHD = document.getElementById('thirdHeader');
    
    if(secondDisplay == 'third'){
        z.style.display = 'none';
    }

    if(secondDisplay == 'fourth'){
    var tHD = document.getElementById('thirdHeader');
        tHD.style.display = 'none';
    }
    x.style.display = 'none';
    y.style.display = 'block';
}


function goBack(firstDisplay, secondDisplay, firstHeader, SecondHeader){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    var tHD = document.getElementById(firstHeader);
    var fHD = document.getElementById(SecondHeader);
    
    x.style.display = 'none';
    tHD.style.display = 'none';
    y.style.display = 'block';
    fHD.style.display = 'block';
}

function goBackConsent(firstDisplay, secondDisplay){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    
    x.style.display = 'none';
    y.style.display = 'block';
}


function displayField(el, btnId, divId, qLength, checkbox, checkbox2, divName){
    var x = document.getElementById(checkbox);
    var y = document.getElementById(checkbox2);
    var z = document.getElementById(divName);

    if(x.checked){
        z.style.display = 'block';
    }else{
        z.style.display = 'none';
    }

    Check(el, btnId, divId, qLength);
}

function Check(el, btnId, divId, qLength) {
    var button = document.getElementById(btnId);

    var nbr_checked_radios = document.querySelectorAll(divId+' input[type=radio]:checked').length;
    /*
       'nbr_checked_radios==0' : mean if no radio button is checked 
    */
    if (nbr_checked_radios < qLength) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }

