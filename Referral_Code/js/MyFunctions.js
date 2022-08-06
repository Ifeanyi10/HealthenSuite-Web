var urlDomain = window.localStorage.getItem("urlDomain");

var eligibitySubmitted = false;

function loadNameValues() {
    //var inputFirstName = $.session.get('firstName');
    //var inputLastName = $.session.get('lastName');
    var inputFirstName = "Paul";
    var inputLastName = "Smith";
    document.getElementById("myFirst").value=(inputFirstName);
    document.getElementById("myLast").value=(inputLastName);
}

function notEligibleAlert(alertValue){
    var content = "<span>"+alertValue+"</span>";
    swal({title: "", text: content , html: true},
        function(){ 
            //window.location.href = "provider-dashboard.html";
        }
    );
    // swal({title: alertValue, text: "", type: "error"},
    //             function(){ 
    //                 //window.location.href = "index.html";
    //             }
    //             );
}

function hideDispaly1(firstQ, secondQ, disqualify1, yesAns, noAns) {
    var x = document.getElementById(firstQ);
    var y = document.getElementById(secondQ);
    var z = document.getElementById(disqualify1);

    var sub = document.getElementById("submit");
    deselectCheckBox();

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

        // z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){
        sub.style.display = 'none';
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

    var sub = document.getElementById("submit");
    deselectCheckBox();

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

        // z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){
        sub.style.display = 'none';
     
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

    var sub = document.getElementById("submit");

    if (document.getElementById(yesAns).checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
           
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

        // z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){
        sub.style.display = 'none';
     
        if(disqualify1 == 'disqualify4'){
            notEligibleAlert('Health enSuite Insomnia is not designed for sleep problems related to changing work schedules or shift work.');
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

    var sub = document.getElementById("submit");

    if (document.getElementById(yesAns).checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
               
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);

        // z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){
        sub.style.display = 'none';
     
        if(disqualify1 == 'disqualify4'){
            notEligibleAlert('Health enSuite Insomnia is not designed for sleep problems related to changing work schedules or shift work.');
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

    var sub = document.getElementById("submit");

    if (document.getElementById(yesAns).checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
                   
        $('input[name=optradio7]').prop("checked",false);

        // z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){
        sub.style.display = 'none';
     
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

    var sub = document.getElementById("submit");

    if (document.getElementById(yesAns).checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 

        // z.style.display = 'none';            
    } else if (document.getElementById(noAns).checked){
        sub.style.display = 'none';

        if(disqualify1 == 'disqualify6'){
            notEligibleAlert('Health enSuite Insomnia is not designed to address sleep disturbances related to pregnancy or caring for an infant.');
        }

        $('input[name=optradio7]').prop("checked",false);
        document.getElementById('submit').style.display = 'none';   
    }
}


function deselectCheckBox(){
    var meds = document.forms['formEligible'].elements['symp'];
    for (i = 0; i < meds.length; i++) {   
        meds[i].checked = false; 
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

function getCheckedSymptomValues() {
    var symptoms = document.forms["formEligible"].elements["symp"];
    var symptomsInfos = ""; 
    var sub = document.getElementById("submit");

    var y = document.getElementById('fourthQ');
    var z = document.getElementById('disqualify3');

    for (i = 0; i < symptoms.length; i++) {    
        if(symptoms[i].checked == true){   
            if (i == 0){
                symptomsInfos +=  symptoms[i].value;   
            } 
            else{
                symptomsInfos +=  ", " + symptoms[i].value;
            }    
                           
        } 
    }

    if(symptomsInfos == ""){
        notEligibleAlert('Health enSuite Insomnia is unlikely to help you if you are not experiencing difficulty sleeping.');
        sub.style.display = 'none';
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
    }else{
        //validateMedCheck();
        //x.style.display = 'none';
        y.style.display = 'block'; 
        // z.style.display = 'none';
        $('input[name=optradio4]').prop("checked",false); 

        document.getElementById('fifthQ').style.display = 'none';     
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);
    }

    window.localStorage.setItem("sleepResponse", symptomsInfos);
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
        // z.style.display = 'none';
        $('input[name=optradio4]').prop("checked",false); 

        document.getElementById('fifthQ').style.display = 'none';     
        $('input[name=optradio5]').prop("checked",false);

        document.getElementById('sixthQ').style.display = 'none';     
        $('input[name=optradio6]').prop("checked",false);

        document.getElementById('seventhQ').style.display = 'none';     
        $('input[name=optradio7]').prop("checked",false);
    }
}


function hideDispalyConsent(first, second, contAns, pNum) {
    var x = document.getElementById(first);
    var y = document.getElementById(second);

    if (document.getElementById(contAns).checked) {
                    
    } 
    document.getElementById('pNum').innerHTML = pNum;
    x.style.display = 'none';
    y.style.display = 'block';
}

function hideDispalyConsentAnswer(answerId) {
    var x = document.getElementById(answerId);
    x.style.display = 'block';            
}


function checkAgreeConsent(first, second, contAns, formId, checkboxId, pNum) {
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

        if(agreeCount == 10){
            document.getElementById('pNum').innerHTML = pNum;
            x.style.display = 'none';
            y.style.display = 'block'; 
        }else{
            //alert("Please click all box to proceed");
            //sweetAlert("Cannot Proceed!","Please review all the information, check them off to proceed.","error");
            var content = "<span style='font-weight: bold'>You have to check all boxes to be able to proceed to the next step of the Consent process.</span>";
            swal({title: "", text: content, html: true});
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
        confirmYourSubmission();       
    }else if (document.getElementById('wait').checked){

        swal({
            title: "",
            text: "You opted to continue later. You will need to enter your referral code again when you are ready to continue.",
            // type: "info",
            showCancelButton: true,
            confirmButtonColor: "#2087c8",
            confirmButtonText: "No, let me continue now.",
            cancelButtonColor: "#01AA73",
            cancelButtonText: "Yes, I will continue later.",
            closeOnConfirm: false,
            closeOnCancel: false
            },
            function(isConfirm){
            if (isConfirm) {
                confirmYourSubmission();
                
            } else {
                //swal("Cancelled", "You chose to continue later :)", "error");
                var optOutMessage = "You chose to continue later :). See you soon!";
                patientOptOutAlert(optOutMessage);
            }
            });
               
    }
}

function confirmYourSubmission(){
    var mySubmissionFlag = window.localStorage.getItem("eligibitySubmitted");

    if(mySubmissionFlag != "true"){    
        swal({
            title: "",
            text: "Kindly verify your responses. Once confirmed, You cannot resubmit your responses.",
            // type: "info",
            showCancelButton: true,
            confirmButtonColor: "#2087c8",
            confirmButtonText: "I want to submit my responses.",
            cancelButtonColor: "#01AA73",
            cancelButtonText: "I want to review my responses.",
            closeOnConfirm: false,
            closeOnCancel: false
            },
            function(isConfirm){
            if (isConfirm) {
                submitElligible();    
            } else {
                $('input[name=optradio8]').prop("checked",false);
                swal.close();
            }
        });
    }else{
        var optOutMessage = "You have already submitted your responses. Please login with your referral code to submit your consent.";
        patientOptOutAlert(optOutMessage);
    }
}

function discontinue(){

    var patientToken = window.localStorage.getItem("patToken");
    let url = urlDomain + 'insomnia/v1/patient/consent';

    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': '*/*',
            'Authorization': 'Bearer '+ patientToken            
          },
        data: JSON.stringify({
        "rejected": true
        }),
        success: function(result){
            var optOutMessage = "You have successfully opt out of the program.";
            patientOptOutAlert(optOutMessage);              
        }, 
        error: function(msg){
            //$("#errorContainer").html("Incorrect Username or Password");
            //sweetAlert("Unable to submit your eligibilty response.","You may have submitted your consent before now.");
            if(msg.status == "501"){
                var content = "<span style='font-weight: bold'>Discontinue request not completed.</span> <span>We are experiencing a temporal delay. Please try again shortly.</span>";
            } else{
                var content = "<span style='font-weight: bold'>Discontinue request not completed.</span> <span>Please try again shortly.</span>";
            }
            swal({title: "", text: content, html: true});
        }
    });

}


//Elligibility Submission
function submitElligible(){
    //event.preventDefault();
    var patientToken = window.localStorage.getItem("patToken");
    console.log(patientToken)
    var sleepExperience = window.localStorage.getItem("sleepResponse");
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
        "sleepExperience": sleepExperience}),
        success: function(result){
           console.log(result); 
           eligibitySubmitted = true;
           window.localStorage.setItem("eligibitySubmitted", eligibitySubmitted);
           
           if(result.id == 1){
                window.location.href = "consent.html";
            }else{
                window.location.href = "consent-dep.html";
            }              
        }, 
        error: function(msg){
            //$("#errorContainer").html("Incorrect Username or Password");
            //sweetAlert("Unable to submit your eligibilty response.","You may have submitted your consent before now.");
            if(msg.status == "501"){
                var content = "<span style='font-weight: bold'>Unable to submit your eligibilty response.</span> <span>We are experiencing a temporal delay. Please try again shortly.</span>";
            }else{
                var content = "<span style='font-weight: bold'>Unable to submit your eligibilty response.</span> <span>You may have submitted your consent before now.</span>";
            }
            
            swal({title: "", text: content, html: true});
        }
    });
}

function confiirmPatientOptOut(){
    
    swal({
        title: "",
        text: "You will be removed from the program if you discontinue at this point.",
        //text: "You clicked 'No thanks, I am not interested' button. Do you wish to discontinue from this study? You will be removed from the program if you discontinue at this point.",
        // type: "info",
        showCancelButton: true,
        confirmButtonColor: "#2087c8",
        confirmButtonText: "Yes, I am not interested.",
        cancelButtonColor: "#01AA73",
        cancelButtonText: "No, I will like to continue.",
        closeOnConfirm: false,
        closeOnCancel: false
        },
        function(isConfirm){
        if (isConfirm) {
            discontinue();
            // var optOutMessage = "Thank you. Your response has been recorded.";
            // patientOptOutAlert(optOutMessage);
            
        } else {
            swal.close();
            //swal("Cancelled", "You chose to continue later :)", "error");
            //window.location.href = "referral.html";
        }
    });
}


function patientOptOutAlert(alertValue){
    var content = "<span>"+alertValue+"</span>";
    swal({title: "", text: content , html: true},
        function(){ 
            window.location.href = "referral.html";
        }
    );
}


function goToNext(firstDisplay, secondDisplay){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    
    if(secondDisplay == 'third'){
        document.getElementById('header').style.display = 'none';
        document.getElementById('thirdHeader').style.display = 'block';
    }

    if(secondDisplay == 'fourth'){
        document.getElementById('thirdHeader').style.display = 'none';
        document.getElementById('fourthHeader').style.display = 'block';
    }
    if(secondDisplay == 'fifth'){
        document.getElementById('fourthHeader').style.display = 'none';
        document.getElementById('fifthHeader').style.display = 'block';
    }
    x.style.display = 'none';
    y.style.display = 'block';
    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function goBackConsent(firstDisplay, secondDisplay, pNum){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    
    document.getElementById('pNum').innerHTML = pNum;
    x.style.display = 'none';
    y.style.display = 'block';

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
    var elemID = el.id;

    var nbr_checked_radios = document.querySelectorAll(divId+' input[type=radio]:checked').length;

    if(qLength == 21){
        if(elemID == "life2" || elemID == "life3" || elemID == "life4"){
            var content = "<span style='font-weight: bold'>If you ever feel that you are in immediate danger of harming yourself or someone else, you should seek help right away by going to your nearest emergency room or calling 911.</span>";
            swal({title: "", text: content, html: true});
        }
    }

    /*
       'nbr_checked_radios==0' : mean if no radio button is checked 
    */
    if (nbr_checked_radios < qLength) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  }

