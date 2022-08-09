var urlDomain = window.localStorage.getItem("urlDomain");

let questionIsAnswered = false;
let buttonClickedIsOkay = false;

function addVideoLinkAddress(addressID, videoTitle){

    swal({
        title: "Attention",
        text: "The link you clicked will take you to another page where you can watch the video about "+videoTitle+".\n\nSelect 'Yes, open the video page' if you want to go ahead and watch the video (please note these videos will use your mobile or Wi-Fi data for streaming).\n\nSelect 'No, don\'t open the video page' if you wish not to watch the video.",
        showCancelButton: true,
        confirmButtonColor: "#2087c8",
        confirmButtonText: "Yes, open the video page",
        cancelButtonColor: "#01AA73",
        cancelButtonText: "No, don\'t open the video page",
        closeOnConfirm: false,
        closeOnCancel: false
        },
        function(isConfirm){
        if (isConfirm) {
            swal.close()
            let authToken = window.localStorage.getItem("patientToken");
            let url = "../video-player.html";
            window.localStorage.setItem("fileLoc", assignVideoLink(addressID));
            window.localStorage.setItem("videoTitle", videoTitle);
            window.localStorage.setItem("patientLoginToken", authToken);
            window.open(url, '_blank').focus();
        } else {
            swal.close()
        }
    });

}

function assignVideoLink(addressID){
    var videoLink = "";
    switch(addressID){
        case "A":
            videoLink = "Providers/videos/PMR_neck_legs_feet.mp4";
            break;

        case "B":
            videoLink = "Providers/videos/PMR_Chest_Shoulders_Back_Abdomen.mp4";
            break;

        case "C":
            videoLink = "Providers/videos/PMR_hands_arms_face_head.mp4";
            break;

        case "D":
            videoLink = "Providers/videos/BellyBreathing.mp4";
            break;

        case "E":
            videoLink = "Providers/videos/relaxation suggestion.mp4";
            break;

        case "F":
            videoLink = "Providers/videos/Negative thoughts.mp4";
            break;

        case "G":
            videoLink = "Providers/videos/Positivethoughts.mp4";
            break;

        default:
            videoLink = "";
    }

    return videoLink;
}

function levelsSuccessAlert(lvlNum){
    var msgBody = "You have finished level "+lvlNum+"!"
    swal({title: "Congratulations!", text: msgBody, type: "success"},
        function(){ 
            window.location.href = "patient-dashboard.html";
        }
    );
}

function displaySymptoms(){
    $('#symptomsModalCenter').modal('show');
}

function getCheckedValues(formID, elementName) {
    var abouts = document.forms[formID].elements[elementName];
    var aboutInfos = ""; 

    for (i = 0; i < abouts.length; i++) {    
        if(abouts[i].checked == true){        
            aboutInfos +=  abouts[i].value + ", ";               
        } 
    }
    return aboutInfos;
}

function getCheckedStatus(formID, elementName, objPosition) {
    var abouts = document.forms[formID].elements[elementName];
    var isChecked = false; 

    for (i = 0; i < abouts.length; i++) {    
        if(abouts[objPosition].checked == true){        
            isChecked = true; 
            return isChecked;             
        }
    }
    return isChecked;
}

function validateCheckoffs(btnId, formId, nameId, errId){
    var btnMed = document.getElementById(btnId);
    var meds = document.forms[formId].elements[nameId];
    for (i = 0; i < meds.length; i++) {    
        if(meds[i].checked == true){
            // btnMed.disabled = false;
            questionIsAnswered = true;
            document.getElementById(errId).innerHTML = "";
            return
        }else{
            // btnMed.disabled = true;
            questionIsAnswered = false;
        }
    }
}

function fillModalContentValueLevels(checkID, errId){

    var errId = document.getElementById(errId);
    questionIsAnswered = true;

    if(checkID == 'confident'){
        errId.innerHTML = "";
    }
    else if(checkID == 'difficult'){
        errId.innerHTML = "";
    }
    else if(checkID == 'unknown'){
        errId.innerHTML = "";
    }
}

function reformatTime(hrId, mnId, amPmId){
    let selectedHour = document.getElementById(hrId).value;
    let selectedMinute = document.getElementById(mnId).value;
    var selectedAmPm = document.getElementById(amPmId).value;

    let theTime = "";
    var hrsRaw = parseInt(selectedHour);
    if(hrsRaw == 12 && selectedAmPm == "AM"){
        theTime = "00:"+selectedMinute;
    }else if(hrsRaw <= 11 && selectedAmPm == "PM"){
        theTime =  (hrsRaw + 12) +":"+selectedMinute;
    }
    else{
        theTime =  selectedHour+":"+selectedMinute;
    }
    let myTime = theTime.toString().replace(/^\s+|\s+$/gm,'');
    console.log(hrId+" of theTime: "+myTime)
    return myTime;
}

function calculateTheBedTime(){
    var ad1 = document.getElementById('less5');
    var ad2 = document.getElementById('more5');
    var avHour = 4;
    var newBedTime = "";
    //var riseTime = document.getElementById("clockRiseTime").value;
    var riseTime = reformatTime('pickRiseHour', 'pickRiseMinute', 'riseAmPm');
    console.log("Your Rise Time: "+riseTime);
    if(avHour < 5){
        newBedTime = moment(riseTime, 'HH:mm').subtract('hours', 5).format('HH:mm')
        ad1.style.display = 'block';
    }else{
        newBedTime = moment(riseTime, 'HH:mm').subtract('hours', avHour).format('HH:mm')
        ad2.style.display = 'block';
    }
    document.getElementById('contYBedTime').innerHTML  = newBedTime;
    document.getElementById('contYRiseTime').innerHTML  = riseTime;
}


function calculateBedTime(firstDisplay, secondDisplay, currentPageNo)
{
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    
    calculateTheBedTime();

    var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
    var levelPageNo = window.localStorage.getItem("levelPageNo");

    console.log("Function for Page: "+currentPageNo+" run successfully");

    if(levelIsNotSavable == "false"){
        if(currentPageNo >= levelPageNo){
            var revisedbedtime = document.getElementById('contYBedTime').innerHTML;
            var revisedrisetime = document.getElementById('contYRiseTime').innerHTML;

            let authToken = window.localStorage.getItem("patientToken");
            let url = urlDomain + 'insomnia/v1/intervention/saveleveltwo';
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*',
                    'Authorization': 'Bearer '+ authToken
                },
                data: JSON.stringify({
                    "revisedbedtime" : revisedbedtime,
                    "revisedrisetime" : revisedrisetime
                    }),
                success: function(result){
                    x.style.display = 'none';
                    y.style.display = 'block'; 
                }, 
                error: function(msg){
                    x.style.display = 'none';
                    y.style.display = 'block'; 
                }
            });
        }else{
            x.style.display = 'none';
            y.style.display = 'block';    
        }
    }else{
        x.style.display = 'none';
        y.style.display = 'block'; 
    }
}

function isEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
  };

function fillAllFields(){
    var bt = document.getElementById('btnSubmitLV1');
    var supName = $("#supName").val();
    var supEmail = $("#supEmail").val();
    var supRel = $("#supRelation").val();
    if (supName != '' && supRel != '')  {
        if (isEmail(supEmail)){
            bt.disabled = false;
            $("#supErrorContainer").html("");
        }else{
            $("#supErrorContainer").html("Please enter a valid email address.");
            bt.disabled = true;
        }
        
    } else {
        $("#supErrorContainer").html("Please fill all the fields properly");
        bt.disabled = true;
    }
}

function checkFields1(){
    // var bt = document.getElementById('btnRealExpect1');
    var supName = $("#realExpect1").val();
    if (supName != '' ) {
        // bt.disabled = false;
        document.getElementById('realExpect1ErMsg').innerHTML = "";
        questionIsAnswered = true;
    } else {
        // bt.disabled = true;
        document.getElementById('realExpect1ErMsg').innerHTML = "Please answer this to proceed.";
        questionIsAnswered = false;
    }
}

function checkFields2(){
    var supName = $("#realExpect2").val();
    if (supName != '' ) {
        document.getElementById('realExpect2ErMsg').innerHTML = "";
        questionIsAnswered = true;
    } else {
        document.getElementById('realExpect2ErMsg').innerHTML = "Please answer this to proceed.";
        questionIsAnswered = false;
    }
}

function checkFields3(){
    var supName = $("#realExpect3").val();
    if (supName != '' ) {
        document.getElementById('realExpect3ErMsg').innerHTML = "";
        questionIsAnswered = true;
    } else {
        document.getElementById('realExpect3ErMsg').innerHTML = "Please answer this to proceed.";
        questionIsAnswered = false;
    }
}

function checkFields4(){
    var supName = $("#otherReason4").val();
    if (supName != '' ) {
        document.getElementById('otherReason4ErMsg').innerHTML = "";
        questionIsAnswered = true;
    } else {
        document.getElementById('otherReason4ErMsg').innerHTML = "Please answer this to proceed.";
        questionIsAnswered = false;
    }
}

function checkFields5(){
    var supName = $("#otherWays").val();
    if (supName != '' ) {
        document.getElementById('otherWaysErMsg').innerHTML = "";
        questionIsAnswered = true;
    } else {
        document.getElementById('otherWaysErMsg').innerHTML = "Please answer this to proceed.";
        questionIsAnswered = false;
    }
}

function checkFieldsLevel6(){
    var supName = $("#worriedTxt").val();
    var supName2 = $("#strategyTxt").val();
    if (supName != '' && supName2 != '') {
        document.getElementById('progErMsg').innerHTML = "";
        questionIsAnswered = true;
    } else {
        questionIsAnswered = false;
    }
}

function hideDisplayLevel(firstDisplay, secondDisplay){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    
    x.style.display = 'none';
    y.style.display = 'block';
    if(buttonClickedIsOkay){
        questionIsAnswered = true;
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function hideJumpDisplayLevel(firstDisplay, secondDisplay, thirdDisplay){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    var z = document.getElementById(thirdDisplay);
    
    x.style.display = 'none';
    let trialNo = window.localStorage.getItem("trialNo");
    if(trialNo == 2){
        y.style.display = 'block';
    }else{
        z.style.display = 'block';
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function displayNavLevel(firstnave, secondNav){
    var f = document.getElementById(firstnave);
    var s = document.getElementById(secondNav);
    f.classList.remove('active');
    s.classList.add('active');
    s.classList.add('show');
    if(buttonClickedIsOkay){
        questionIsAnswered = true;
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function displayJumpNavLevel(firstnave, secondNav, thirdNav){
    var f = document.getElementById(firstnave);
    var s = document.getElementById(secondNav);
    var z = document.getElementById(thirdNav);
    f.classList.remove('active');
    let trialNo = window.localStorage.getItem("trialNo");
    // let trialNo = 1;
    if(trialNo == 2){
        s.classList.add('active');
        s.classList.add('show');
    }else{
        z.classList.add('active');
        z.classList.add('show');
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function saveOnlyPage(firstDisplay, secondDisplay, currentPageNo, isNav){
    let authToken = window.localStorage.getItem("patientToken");
    let url = urlDomain + 'insomnia/v1/intervention/savepage/' + currentPageNo;
    var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
    var levelPageNo = window.localStorage.getItem("levelPageNo");

    console.log("Function for Page: "+currentPageNo+" run successfully");
    goToNextPageNoQuest(firstDisplay, secondDisplay, isNav);

    if(levelIsNotSavable == "false"){
        if(currentPageNo >= levelPageNo){
            $.ajax({
                url: url,
                type: 'GET',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*',
                    'Authorization': 'Bearer '+ authToken
                },
                success: function(result){
                    //console.log("Next Page: " + result.status);
                    goToNextPageNoQuest(firstDisplay, secondDisplay, isNav); 
                }, 
                error: function(msg){
                    console.log("Error: " + msg.status);
                    goToNextPageNoQuest(firstDisplay, secondDisplay, isNav); 
                }
            });
        }else{
            goToNextPageNoQuest(firstDisplay, secondDisplay, isNav);    
        }
    }else{
        goToNextPageNoQuest(firstDisplay, secondDisplay, isNav);  
    }
}

function goToNextPageNoQuest(firstDisplay, secondDisplay, isNav){
    if(isNav == false){
        hideDisplay(firstDisplay, secondDisplay);
    }else{
        displayNav(firstDisplay, secondDisplay);
    } 
}

function goToNextPage1Level5(firstDisplay, secondDisplay, errId, isNav){
    checkFields1();
    if(questionIsAnswered){
        if(isNav == false){
            hideDisplay(firstDisplay, secondDisplay);
        }else{
            displayNav(firstDisplay, secondDisplay);
        } 
        questionIsAnswered = false;
    }else{
        document.getElementById(errId).innerHTML = "Please answer this to proceed.";
    }
}

function goToNextPage2Level5(firstDisplay, secondDisplay, errId, isNav){
    checkFields2();
    if(questionIsAnswered){
        if(isNav == false){
            hideDisplay(firstDisplay, secondDisplay);
        }else{
            displayNav(firstDisplay, secondDisplay);
        } 
        questionIsAnswered = false;
    }else{
        document.getElementById(errId).innerHTML = "Please answer this to proceed.";
    }
}

function goToNextPage3Level5(firstDisplay, secondDisplay, errId, isNav){
    checkFields3();
    if(questionIsAnswered){
        if(isNav == false){
            hideDisplay(firstDisplay, secondDisplay);
        }else{
            displayNav(firstDisplay, secondDisplay);
        } 
        questionIsAnswered = false;
    }else{
        document.getElementById(errId).innerHTML = "Please answer this to proceed.";
    }
}

function goToNextPage4Level5(firstDisplay, secondDisplay, errId, isNav){
    checkFields4();
    if(questionIsAnswered){
        if(isNav == false){
            hideDisplay(firstDisplay, secondDisplay);
        }else{
            displayNav(firstDisplay, secondDisplay);
        } 
        questionIsAnswered = false;
    }else{
        document.getElementById(errId).innerHTML = "Please answer this to proceed.";
    }
}

function goToNextPage5Level5(firstDisplay, secondDisplay, errId, isNav){
    checkFields5();
    if(questionIsAnswered){
        if(isNav == false){
            hideDisplay(firstDisplay, secondDisplay);
        }else{
            displayNav(firstDisplay, secondDisplay);
        } 
        questionIsAnswered = false;
    }else{
        document.getElementById(errId).innerHTML = "Please answer this to proceed.";
    }
}



function goToNextPage(firstDisplay, secondDisplay, errId, isNav){
    buttonClickedIsOkay = false;
    if(questionIsAnswered){
        if(isNav == false){
            hideDisplay(firstDisplay, secondDisplay);
        }else{
            displayNav(firstDisplay, secondDisplay);
        } 
        buttonClickedIsOkay = true;
        questionIsAnswered = false;
    }else{
        let trialNo = window.localStorage.getItem("trialNo");
        var situation = getCheckedValues('formSituation', 'sit');
        // console.log("This is situation: "+situation);
        if(trialNo == 1 && situation != ""){
            if(isNav == false){
                hideDisplay(firstDisplay, secondDisplay);
            }else{
                displayNav(firstDisplay, secondDisplay);
            } 
            buttonClickedIsOkay = true;
            questionIsAnswered = false;
        }else if(trialNo == 2 && situation != ""){
            if(isNav == false){
                hideDisplay(firstDisplay, secondDisplay);
            }else{
                displayNav(firstDisplay, secondDisplay);
            } 
            buttonClickedIsOkay = true;
            questionIsAnswered = false;
        }else{
            document.getElementById(errId).innerHTML = "Please answer this to proceed.";
        }
    }
}


function goToNextOmitPage(firstDisplay, secondDisplay, thirdDisplay, errId, isNav){
    buttonClickedIsOkay = false;
    if(questionIsAnswered){
        if(isNav == false){
            hideDisplay(firstDisplay, secondDisplay);
        }else{
            displayNav(firstDisplay, secondDisplay);
        } 
        buttonClickedIsOkay = true;
        questionIsAnswered = false;
    }else{
        let trialNo = window.localStorage.getItem("trialNo");
        var soFar = getCheckedValues('formFeeling', 'feel');
        if(trialNo == 1){
            if(isNav == false){
                hideDisplay(firstDisplay, thirdDisplay);
            }else{
                displayNav(firstDisplay, thirdDisplay);
            } 
            buttonClickedIsOkay = true;
            questionIsAnswered = false;
        }else if(trialNo == 2 && soFar != ""){
            if(isNav == false){
                hideDisplay(firstDisplay, thirdDisplay);
            }else{
                displayNav(firstDisplay, thirdDisplay);
            } 
            buttonClickedIsOkay = true;
            questionIsAnswered = false;
        }else{
            document.getElementById(errId).innerHTML = "Please answer this to proceed.";
        }
    }
}


$(document).ready(function () {

    // var btT1 = document.getElementById('btnSubmitLV1');
    // btT1.disabled = true;
    $('#supName, #supEmail, #supRelation').keyup(fillAllFields);
    $('#realExpect1').keyup(checkFields1);
    $('#realExpect2').keyup(checkFields2);
    $('#realExpect3').keyup(checkFields3);
    $('#otherReason4').keyup(checkFields4);
    $('#otherWays').keyup(checkFields5);
    $('#worriedTxt, #strategyTxt').keyup(checkFieldsLevel6);


    //Submit Level 1 Page 1
    // $('#level1Pg1').on('click', function(event){
    //     event.preventDefault();

    //     let authToken = window.localStorage.getItem("patientToken");
    //     let url = urlDomain + 'insomnia/v1/intervention/savepage';
    //     $.ajax({
    //         url: url,
    //         type: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json', 
    //             'Accept': '*/*',
    //             'Authorization': 'Bearer '+ authToken
    //         },
    //         success: function(result){
    //             console.log("Next Page: " + result);
                
    //         }, 
    //         error: function(msg){
    //             console.log("Error: " + msg);
    //         }
    //     });
    // });

    //Submit Level 1 Page 2
    $('#level1Pg2').on('click', function(event){
        event.preventDefault();
        console.log("Function for Page: 2 run successfully");

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 2;

        console.log('This function runs Next')
        if(buttonClickedIsOkay){
            if(levelIsNotSavable == "false"){
                if(currentPageNo >= levelPageNo){
                    var descSituation = getCheckedValues('formSituation', 'sit');
    
                    let authToken = window.localStorage.getItem("patientToken");
                    let url = urlDomain + 'insomnia/v1/intervention/savelevelone';
                    $.ajax({
                        url: url,
                        type: 'POST',
                        headers: {
                            'Content-Type': 'application/json', 
                            'Accept': '*/*',
                            'Authorization': 'Bearer '+ authToken
                        },
                        data: JSON.stringify({
                            "whichBestdescribesYoursituation" : descSituation
                            }),
                        success: function(result){
                            console.log("Level 1 page 2 submitted.");
                        }, 
                        error: function(msg){
                            if(msg.status == "511"){
                                displayQuickAlert();
                            }
                            console.log("Error: " + msg);
                        }
                    });
                }
            }
        }
    });

    //Submit Level 1 Page 5
    $('#level1Pg5').on('click', function(event){
        event.preventDefault();
        console.log("Function for Page: 5 run successfully");

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 5;
        
        if(buttonClickedIsOkay){
            if(levelIsNotSavable == "false"){
                if(currentPageNo >= levelPageNo){
                    let trialNo = window.localStorage.getItem("trialNo");
                    if(trialNo == 1){
                        saveOnlyPage('navpills-4', 'navpills-5', 5, true);
                    }else{
                        var soFar = getCheckedValues('formFeeling', 'feel');
    
                        let authToken = window.localStorage.getItem("patientToken");
                        let url = urlDomain + 'insomnia/v1/intervention/savelevelone';
                        $.ajax({
                            url: url,
                            type: 'POST',
                            headers: {
                                'Content-Type': 'application/json', 
                                'Accept': '*/*',
                                'Authorization': 'Bearer '+ authToken
                            },
                            data: JSON.stringify({
                                "howIsitgoingSofar" : soFar
                                }),
                            success: function(result){
                                console.log("Level 1 page 5 submitted.");
                            }, 
                            error: function(msg){
                                if(msg.status == "511"){
                                    displayQuickAlert();
                                }
                                console.log("Error: " + msg);
                            }
                        });
                    }
                }
            } 
        }
         
    });

    //Submit Level 1 Page 7
    $('#btnSubmitLV1').on('click', function(event){
        event.preventDefault();
    
        var descSituation = getCheckedValues('formSituation', 'sit');
        var soFar = getCheckedValues('formFeeling', 'feel');
        console.log("Function for Page: 7 run successfully");
        
        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 7;

        if(levelIsNotSavable == "false"){
            if(currentPageNo >= levelPageNo){
                var levelOneEntity = JSON.parse(window.localStorage.getItem("levelOneEntity"));
                if(levelOneEntity != null){
                    if(levelOneEntity.whichBestdescribesYoursituation != null){
                        descSituation = levelOneEntity.whichBestdescribesYoursituation;
                    }
                    if(levelOneEntity.howIsitgoingSofar != null){
                        soFar = levelOneEntity.howIsitgoingSofar;
                    }  
                }

                var spAlone = getCheckedValues('fromDescribe', 'abt');
                var supName = document.getElementById("supName").value;
                var supEmail = document.getElementById("supEmail").value;
                var supRelation = document.getElementById("supRelation").value;

                let authToken = window.localStorage.getItem("patientToken");
                let url = urlDomain + 'insomnia/v1/intervention/savelevelone';
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({
                        "whichBestdescribesYoursituation" : descSituation,
                        "howIsitgoingSofar" : soFar,
                        "sleepalone" : spAlone,
                        "supportPersonname" : supName,
                        "supportPersonemail" : supEmail,
                        "supportPersonrelationshipt": supRelation
                        }),
                    success: function(result){
                        console.log(result);
                        levelsSuccessAlert("1");
                    }, 
                    error: function(msg){
                        if(msg.status == "511"){
                            displayQuickAlert();
                        }else if(msg.status == "201"){
                            levelsSuccessAlert("1");
                        }else{
                            $("#errorContainer").html("Unable to register");
                            sweetAlert("Unable to submit level 1 responses","Please try again shortly");
                        }   
                    }
                });
            }
        }else{
            window.location.href = "patient-dashboard.html";
        }
        
    });


    //Submit Level 1 Anyway Page 7
    $('#btnSubmitLV1Anyway').on('click', function(event){
        event.preventDefault();
    
        console.log("Function for Page: 7 run successfully");
        var descSituation = getCheckedValues('formSituation', 'sit');
        var soFar = getCheckedValues('formFeeling', 'feel');

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 7;

        if(levelIsNotSavable == "false"){
            if(currentPageNo >= levelPageNo){
                var levelOneEntity = JSON.parse(window.localStorage.getItem("levelOneEntity"));
                if(levelOneEntity != null){
                    if(levelOneEntity.whichBestdescribesYoursituation != null){
                        descSituation = levelOneEntity.whichBestdescribesYoursituation;
                    }
                    if(levelOneEntity.howIsitgoingSofar != null){
                        soFar = levelOneEntity.howIsitgoingSofar;
                    }  
                }

                var spAlone = getCheckedValues('fromDescribe', 'abt');
                var supName = "";
                var supEmail = "";
                var supRelation = "";

                let authToken = window.localStorage.getItem("patientToken");
                let url = urlDomain + 'insomnia/v1/intervention/savelevelone';
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({
                        "whichBestdescribesYoursituation" : descSituation,
                        "howIsitgoingSofar" : soFar,
                        "sleepalone" : spAlone,
                        "supportPersonname" : supName,
                        "supportPersonemail" : supEmail,
                        "supportPersonrelationshipt": supRelation
                        }),
                    success: function(result){
                        console.log(result);
                        levelsSuccessAlert("1");
                    }, 
                    error: function(msg){
                        if(msg.status == "511"){
                            displayQuickAlert();
                        }else if(msg.status == "201"){
                            levelsSuccessAlert("1");
                        }else{
                            $("#errorContainer").html("Unable to register");
                            sweetAlert("Unable to submit level 1 responses","Please try again shortly");
                        } 
                    }
                });
            }
        }else{
            window.location.href = "patient-dashboard.html";
        }      
        
    });


    //Submit Level 2 of 3
    // $('#level2Pg3').on('click', function(event){
    //     event.preventDefault();

    //     console.log("Function for Page: 3 run successfully");

    //     var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
    //     var levelPageNo = window.localStorage.getItem("levelPageNo");
    //     var currentPageNo = 3;

    //     if(levelIsNotSavable == "false"){
    //         if(currentPageNo >= levelPageNo){
    //             var revisedbedtime = document.getElementById('contYBedTime').innerHTML;
    //             var revisedrisetime = document.getElementById('contYRiseTime').innerHTML;

    //             let authToken = window.localStorage.getItem("patientToken");
    //             let url = urlDomain + 'insomnia/v1/intervention/saveleveltwo';
    //             $.ajax({
    //                 url: url,
    //                 type: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json', 
    //                     'Accept': '*/*',
    //                     'Authorization': 'Bearer '+ authToken
    //                 },
    //                 data: JSON.stringify({
    //                     "revisedbedtime" : revisedbedtime,
    //                     "revisedrisetime" : revisedrisetime
    //                     }),
    //                 success: function(result){
    //                     console.log(result);
    //                     console.log("Level 2 page 3 submitted.");
    //                 }, 
    //                 error: function(msg){
    //                     console.log("Error in Level 2 Page 3: "+msg);
    //                 }
    //             });
    //         } 
    //     }  
        
    // });


    //Submit Level 2
    $('#btnSubmitLV2').on('click', function(event){
        event.preventDefault();

        calculateTheBedTime();

        console.log("Function for Page: 4 run successfully");

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 4;

        if(levelIsNotSavable == "false"){
            if(currentPageNo >= levelPageNo){
                var revisedbedtime = document.getElementById('contYBedTime').innerHTML;
                var revisedrisetime = document.getElementById('contYRiseTime').innerHTML;

                var levelTwoEntity = JSON.parse(window.localStorage.getItem("levelTwoEntity"));
                if(levelTwoEntity != null){
                    if(levelTwoEntity.revisedbedtime != null){
                        revisedbedtime = levelTwoEntity.revisedbedtime;
                    }
                    if(levelTwoEntity.revisedrisetime != null){
                        revisedrisetime = levelTwoEntity.revisedrisetime;
                    } 
                }else{console.log("Level 2 Entity is Null!!")}
                
                var clockBedTime =  window.localStorage.getItem("yAvBedTime");
                var clockRiseTime = window.localStorage.getItem("yAvRiseTime");

                let authToken = window.localStorage.getItem("patientToken");
                let url = urlDomain + 'insomnia/v1/intervention/saveleveltwo';
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({
                        "bedtime" : clockBedTime,
                        "risetime" : clockRiseTime,
                        "revisedbedtime" : revisedbedtime,
                        "revisedrisetime" : revisedrisetime,
                        "completed": true
                        }),
                    success: function(result){
                        console.log(result);
                        levelsSuccessAlert("2");
                    }, 
                    error: function(msg){
                        if(msg.status == "511"){
                            displayQuickAlert();
                        }else if(msg.status == "201"){
                            levelsSuccessAlert("2");
                        }else{
                            $("#errorContainer").html("Unable to register");
                            sweetAlert("Unable to submit level 2 responses","Please try again shortly");
                        }
                        
                    }
                });
            } 
        }else{
            window.location.href = "patient-dashboard.html";
        }  
        
    });


    //Submit Level 3
    $('#btnSubmitLV3').on('click', function(event){
        event.preventDefault();

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");

        if(questionIsAnswered){
            if(levelIsNotSavable == "false"){
                var bedforsleepingonly = getCheckedStatus('formDoneToday', 'done', 0);
                var sleep20minutes = getCheckedStatus('formDoneToday', 'done', 1);
                var dontTakenaps = getCheckedStatus('formDoneToday', 'done', 2);
                var excersiseNotbeforeBed = getCheckedStatus('formDoneToday', 'done', 3);
                var eatRiht = getCheckedStatus('formDoneToday', 'done', 4);
                var avoidStimulant = getCheckedStatus('formDoneToday', 'done', 5);
                var avoidAlcohol = getCheckedStatus('formDoneToday', 'done', 6);
                var createComfortablespace = getCheckedStatus('formDoneToday', 'done', 7);
                var limitScreentimeBeforebed = getCheckedStatus('formDoneToday', 'done', 8);
                var createUnwindrouting = getCheckedStatus('formDoneToday', 'done', 9);
                var contAddNote = document.getElementById("contAddNote").value;
    
                let authToken = window.localStorage.getItem("patientToken");
                let url = urlDomain + 'insomnia/v1/intervention/savelevelthree';
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({
                        "bedforsleepingonly": bedforsleepingonly,
                        "sleep20minutes" : sleep20minutes,
                        "dontTakenaps" : dontTakenaps,
                        "excersiseNotbeforeBed" : excersiseNotbeforeBed,
                        "eatRiht": eatRiht,
                        "avoidStimulant": avoidStimulant,
                        "avoidAlcohol" : avoidAlcohol,
                        "createComfortablespace" : createComfortablespace,
                        "limitScreentimeBeforebed" : limitScreentimeBeforebed,
                        "createUnwindrouting" : createUnwindrouting,
                        "additionalNote" : contAddNote
                        }),
                    success: function(result){
                        console.log(result);
                        levelsSuccessAlert("3");
                    }, 
                    error: function(msg){
                        if(msg.status == "511"){
                            displayQuickAlert();
                        }else if(msg.status == "201"){
                            levelsSuccessAlert("3");
                        }else{
                            $("#errorContainer").html("Unable to register");
                            sweetAlert("Unable to submit level 3 responses","Please try again shortly");
                        }
                        
                    }
                });
            }else{
                window.location.href = "patient-dashboard.html";
            }
        }else{
            document.getElementById('doneErMsg').innerHTML = "Please check off the things you have done today to proceed.";
        }

    });


    //Submit Level 4
    $('#btnSubmitLV4').on('click', function(event){
        event.preventDefault();

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 4;

        if(levelIsNotSavable == "false"){
            if(currentPageNo >= levelPageNo){
                let authToken = window.localStorage.getItem("patientToken");
                let url = urlDomain + 'insomnia/v1/intervention/savelevelfour';
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({
                        "successful" : true
                        }),
                    success: function(result){
                        console.log(result);
                        levelsSuccessAlert("4");
                        console.log("Function for Page: 4 run successfully");
                    }, 
                    error: function(msg){
                        if(msg.status == "511"){
                            displayQuickAlert();
                        }else if(msg.status == "201"){
                            levelsSuccessAlert("4");
                        }else{
                            $("#errorContainer").html("Unable to register");
                            sweetAlert("Unable to submit level 4 responses","Please try again shortly"); 
                        }
                    }
                });
            }
            
        }else{
            window.location.href = "patient-dashboard.html";
        }

        
    });


    //Submit Level 5 of 2
    $('#btnRealExpect1').on('click', function(event){
        event.preventDefault();

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 2;

        // if(levelIsNotSavable == "false"){
        //     if(currentPageNo >= levelPageNo){
        //         var realExpect1 = document.getElementById("realExpect1").value;

        //         let authToken = window.localStorage.getItem("patientToken");
        //         let url = urlDomain + 'insomnia/v1/intervention/savelevelfive';
        //         $.ajax({
        //             url: url,
        //             type: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json', 
        //                 'Accept': '*/*',
        //                 'Authorization': 'Bearer '+ authToken
        //             },
        //             data: JSON.stringify({
        //                 "hoursofsleepeachnight" : realExpect1
        //                 }),
        //             success: function(result){
        //                 console.log(result);   
        //                 console.log("Function for Page: 2 run successfully");         
        //             }, 
        //             error: function(msg){
        //                 $("#errorContainer").html("Unable to register");
        //             }
        //         });
        //     }
        // }
    });


    //Submit Level 5 of 3
    $('#btnRealExpect2').on('click', function(event){
        event.preventDefault();

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 3;

        // if(levelIsNotSavable == "false"){
        //     if(currentPageNo >= levelPageNo){
        //         var realExpect2 = document.getElementById("realExpect2").value;

        //         let authToken = window.localStorage.getItem("patientToken");
        //         let url = urlDomain + 'insomnia/v1/intervention/savelevelfive';
        //         $.ajax({
        //             url: url,
        //             type: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json', 
        //                 'Accept': '*/*',
        //                 'Authorization': 'Bearer '+ authToken
        //             },
        //             data: JSON.stringify({
        //                 "fullofenergyeachday" : realExpect2
        //                 }),
        //             success: function(result){
        //                 console.log(result);    
        //                 console.log("Function for Page: 3 run successfully");        
        //             }, 
        //             error: function(msg){
        //                 $("#errorContainer").html("Unable to register");
        //             }
        //         });
        //     }
            
        // }
    });


    //Submit Level 5 of 4
    $('#btnRealExpect3').on('click', function(event){
        event.preventDefault();

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 4;

        // if(levelIsNotSavable == "false"){
        //     if(currentPageNo >= levelPageNo){
        //         var realExpect3 = document.getElementById("realExpect3").value;

        //         let authToken = window.localStorage.getItem("patientToken");
        //         let url = urlDomain + 'insomnia/v1/intervention/savelevelfive';
        //         $.ajax({
        //             url: url,
        //             type: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json', 
        //                 'Accept': '*/*',
        //                 'Authorization': 'Bearer '+ authToken
        //             },
        //             data: JSON.stringify({
        //                 "fallasleepfast" : realExpect3
        //                 }),
        //             success: function(result){
        //                 console.log(result);   
        //                 console.log("Function for Page: 4 run successfully");         
        //             }, 
        //             error: function(msg){
        //                 $("#errorContainer").html("Unable to register");
        //             }
        //         });
        //     }          
        // }
    });


    //Submit Level 5 of 5
    $('#btnOtherReason4').on('click', function(event){
        event.preventDefault();

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 5;

        // if(levelIsNotSavable == "false"){
        //     if(currentPageNo >= levelPageNo){
        //         var otherReason4 = document.getElementById("otherReason4").value;

        //         let authToken = window.localStorage.getItem("patientToken");
        //         let url = urlDomain + 'insomnia/v1/intervention/savelevelfive';
        //         $.ajax({
        //             url: url,
        //             type: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json', 
        //                 'Accept': '*/*',
        //                 'Authorization': 'Bearer '+ authToken
        //             },
        //             data: JSON.stringify({
        //                 "didnotsleepwelllastnight" : otherReason4
        //                 }),
        //             success: function(result){
        //                 console.log(result);
        //                 console.log("Function for Page: 5 run successfully");            
        //             }, 
        //             error: function(msg){
        //                 $("#errorContainer").html("Unable to register");
        //             }
        //         });
        //     }           
        // }
    });


    //Submit Level 5 of 6
    $('#btnOtherways5').on('click', function(event){
        event.preventDefault();

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 6;

        // if(levelIsNotSavable == "false"){
        //     if(currentPageNo >= levelPageNo){
        //         var otherWays = document.getElementById("otherWays").value;

        //         let authToken = window.localStorage.getItem("patientToken");
        //         let url = urlDomain + 'insomnia/v1/intervention/savelevelfive';
        //         $.ajax({
        //             url: url,
        //             type: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json', 
        //                 'Accept': '*/*',
        //                 'Authorization': 'Bearer '+ authToken
        //             },
        //             data: JSON.stringify({
        //                 "cancelsocialmedia" : otherWays
        //                 }),
        //             success: function(result){
        //                 console.log(result);    
        //                 console.log("Function for Page: 6 run successfully");        
        //             }, 
        //             error: function(msg){
        //                 $("#errorContainer").html("Unable to register");
        //             }
        //         });
        //     }
        // }
    });


    //Submit Level 5 of all 5 pages
    $('#btnLv5SubmitAllData').on('click', function(event){
        event.preventDefault();

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 2;

        if(levelIsNotSavable == "false"){
            if(currentPageNo >= levelPageNo){
                var realExpect1 = document.getElementById("realExpect1").value;
                var realExpect2 = document.getElementById("realExpect2").value;
                var realExpect3 = document.getElementById("realExpect3").value;
                var otherReason4 = document.getElementById("otherReason4").value;
                var otherWays = document.getElementById("otherWays").value;  ;

                let authToken = window.localStorage.getItem("patientToken");
                let url = urlDomain + 'insomnia/v1/intervention/savelevelfive';
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({
                        "hoursofsleepeachnight" : realExpect1,
                        "fullofenergyeachday" : realExpect2,
                        "fallasleepfast" : realExpect3,
                        "didnotsleepwelllastnight" : otherReason4,
                        "cancelsocialmedia" : otherWays
                        }),
                    success: function(result){
                        console.log(result);    
                        console.log("Function for Page: 2 run successfully");        
                    }, 
                    error: function(msg){
                        if(msg.status == "511"){
                            displayQuickAlert();
                        }
                        $("#errorContainer").html("Unable to register");
                    }
                });
            }
        }
    });


    //Submit Level 5
    $('#btnSubmitLV5').on('click', function(event){
        event.preventDefault();

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");
        var levelPageNo = window.localStorage.getItem("levelPageNo");
        var currentPageNo = 3;

        if(levelIsNotSavable == "false"){
            if(currentPageNo >= levelPageNo){ 

                let authToken = window.localStorage.getItem("patientToken");
                let url = urlDomain + 'insomnia/v1/intervention/savepage/' + currentPageNo;
                $.ajax({
                    url: url,
                    type: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    success: function(result){
                        console.log(result);
                        levelsSuccessAlert("5");
                    }, 
                    error: function(msg){
                        if(msg.status == "511"){
                            displayQuickAlert();
                        }else if(msg.status == "201"){
                            levelsSuccessAlert("5");
                        }else{
                            sweetAlert("Unable to conclude level 5","Please try again shortly");
                            console.log("Level 5 error: "+msg.status);
                        }
                    }
                });
            }
        }else{
            window.location.href = "patient-dashboard.html";
        }

        
    });

    //Submit Level 6
    $('#btnSubmitLV6').on('click', function(event){
        event.preventDefault();

        var levelIsNotSavable = window.localStorage.getItem("levelIsNotSavable");

        checkFieldsLevel6();

        if(questionIsAnswered){
            if(levelIsNotSavable == "false"){
                var worriedTxt = document.getElementById("worriedTxt").value;
                var strategyTxt = document.getElementById("strategyTxt").value;
    
                let authToken = window.localStorage.getItem("patientToken");
                let url = urlDomain + 'insomnia/v1/intervention/savelevelsix';
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({
                        "fears" : worriedTxt,
                        "strategy" : strategyTxt
                        }),
                    success: function(result){
                        console.log(result);
                        levelsSuccessAlert("6");
                    }, 
                    error: function(msg){
                        if(msg.status == "511"){
                            displayQuickAlert();
                        }else if(msg.status == "201"){
                            levelsSuccessAlert("6");
                        }else{
                            sweetAlert("Unable to submit level 6 responses","Please try again shortly.");
                        }  
                    }
                });
            }else{
                window.location.href = "patient-dashboard.html";
            }
        }else{
            document.getElementById('progErMsg').innerHTML = "Please fill the two fields above to proceed.";
        }
    });


    //Submit Psychoeducation
    $('#btnSubmitPsycho').on('click', function(event){
        event.preventDefault();
    
        var morethan30MinstoSleep = getCheckedStatus('formSituation', 'sit', 0);
        var wakeupfrequentlyatnight = getCheckedStatus('formSituation', 'sit', 1);
        var wakeuptooearly = getCheckedStatus('formSituation', 'sit', 2);
        var sleepqualitypoor = getCheckedStatus('formSituation', 'sit', 3);
        var ifeelconfident = getCheckedStatus('formFeeling', 'feel', 0);
        var ithinkitsdifficult = getCheckedStatus('formFeeling', 'feel', 1);
        var idontknow = getCheckedStatus('formFeeling', 'feel', 2);

        var psychoID = window.localStorage.getItem("psychoID");

        let trialNo = window.localStorage.getItem("trialNo");
        let readyToSub = true;
        if(trialNo == 2 && !questionIsAnswered){
            readyToSub = false;
            document.getElementById('feelErMsg').innerHTML = "Please answer this to proceed.";
        }

        if(readyToSub){
            let authToken = window.localStorage.getItem("patientToken");
            let url = urlDomain + 'insomnia/v1/intervention/psycho';
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*',
                    'Authorization': 'Bearer '+ authToken
                },
                data: JSON.stringify({
                    "completed": true,   
                    "id": psychoID,
                    "morethan30MinstoSleep" : morethan30MinstoSleep,
                    "wakeupfrequentlyatnight" : wakeupfrequentlyatnight,
                    "wakeuptooearly" : wakeuptooearly,
                    "sleepqualitypoor" : sleepqualitypoor,
                    "ifeelconfident" : ifeelconfident,
                    "ithinkitsdifficult" : ithinkitsdifficult,
                    "idontknow" : idontknow
                    }),
                success: function(result){
                    console.log(result);
                    swal({title: "Well Done!", text: "Your response have been submitted!", type: "success"},
                        function(){ 
                            window.location.href = "patient-dashboard.html";
                        }
                    );
                }, 
                error: function(msg){
                    if(msg.status == "511"){
                        displayQuickAlert();
                    }else if(msg.status == "201"){
                        swal({title: "Well Done!", text: "Your response have been submitted!", type: "success"},
                            function(){ 
                                window.location.href = "patient-dashboard.html";
                            }
                        );
                    }else{
                        sweetAlert("Unable to submit your responses","Please try again shortly");
                    }
                    
                }
            });
        }
        
    });

    
});
