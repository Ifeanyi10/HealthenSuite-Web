var urlDomain = window.localStorage.getItem("urlDomain");

var tookAnotherMedication = false;
var numberIsInvalid = false;
var requiredFieldsAreFilled = false;
var variableOk = true;
var lastQuestionIsSelected = false;
var time1 = false; var time2 = false; var time3 = false; var time4 = false;

// function fillSleepDiaryFields(){
//     var bt = document.getElementById('btnSDNext');
//     var bedTime = $("#bedTime").val();
//     var trySleepTime = $("#trySleepTime").val();
//     var sleepTime = $("#sleepTime").val();
//     var wakeUpCount = document.getElementById('wakeUpCount').innerHTML;
//     var finalAwakeTime = $("#finalAwakeTime").val();
//     var outOfBedTime = $("#outOfBedTime").val();
//     var awakeLast = $("#awakeLast").val();
//     if (bedTime != '' && trySleepTime != '' && sleepTime != '' && wakeUpCount != '' && finalAwakeTime != '' && outOfBedTime != '' && awakeLast != '')  {
//         bt.disabled = false;
//     } else {
//         bt.disabled = true;
//     }
// }

function sleepDiarySuccessAlert(){
    swal({title: "", text: "You have completed your sleep diary.", type: "success"},
        function(){ 
            window.location.href = "patient-dashboard.html";
        }
    );
}

function AddMed(med2, am2, med3, am3, btnId){
    var medCount = window.localStorage.getItem("otherMedCount");

    if(medCount == "1"){
        document.getElementById(med2).style.display = 'block';
        document.getElementById(am2).style.display = 'block';
        window.localStorage.setItem("otherMedCount", '2');
    } else{
        document.getElementById(med3).style.display = 'block';
        document.getElementById(am3).style.display = 'block';
        document.getElementById(btnId).disabled = true;
    }
}

function buildAnyMedBlock(medName, medAm, medId){
    var anyMedBlock = {};

    otherMedName = $(medName).text();
    otherAmTaken = $(medAm).text();
    var otherMedID = window.localStorage.getItem(medId);
    if(otherMedID != null){
        otherMedID = parseInt(otherMedID);
        anyMedBlock = {
            "id": otherMedID,
            "medicationName": otherMedName,
            "amount": otherAmTaken
        }
    }else if(otherMedID == null && otherAmTaken != ''){
        anyMedBlock = {
            "medicationName": otherMedName,
            "amount": otherAmTaken
        }
    }

    return anyMedBlock;
}

function getQuality(){
    //var divbox = document.getElementById('qtyBox');
    var radios = document.forms['qtID'].elements['rate'];
    var sleepQty = '';
        
    for (i = 0; i < radios.length; i++) {  
        if (radios[i].checked) {
            sleepQty = radios[i].value;
        }
    }

    return sleepQty;
}

function validateSelect(elementId){
    var dataOk = true;
    var selectOpt = document.getElementById(elementId);
    if(selectOpt.value == ""){
        selectOpt.style.border = "1px solid red";
        dataOk = false;
    }else{
        selectOpt.style.border = "1px solid #BCBCBC";
    }
    return dataOk;
}

function displaySleepMed(div1, div2, hds){
    let trialNo = window.localStorage.getItem("trialNo");
    var x = document.getElementById(div1);
    var y = document.getElementById(div2);
    var hds = document.getElementById(hds);

    var hourOpt = document.getElementById('hourOpt');
    var minuteOpt = document.getElementById('minuteOpt');
    var spHourOpt = document.getElementById('spHourOpt');
    var spMinuteOpt = document.getElementById('spMinuteOpt');

    var pickHour1 = document.getElementById('pickHour1');
    var pickHour2 = document.getElementById('pickHour2');
    var pickHour3 = document.getElementById('pickHour3');
    var pickHour4 = document.getElementById('pickHour4');


    // var bdT = document.getElementById('bedTime').value;
    // var tryBdT = document.getElementById('trySleepTime').value;
    // var wkT = document.getElementById('finalAwakeTime').value;
    // var outWkT = document.getElementById('outOfBedTime').value;

    //console.log("New Time Widget: "+document.getElementById('myTime').value)

    validateHourSelected1(pickHour1, 'pickHour1');
    validateHourSelected2(pickHour2, 'pickHour2');
    validateHourSelected3(pickHour3, 'pickHour3');
    validateHourSelected4(pickHour4, 'pickHour4');

    if(hourOpt.value == ""){
        hourOpt.style.border = "1px solid red";
        variableOk = false;
    }else{
        hourOpt.style.border = "1px solid #BCBCBC";
    }

    if(minuteOpt.value == ""){
        minuteOpt.style.border = "1px solid red";
        variableOk = false;
    }else{
        minuteOpt.style.border = "1px solid #BCBCBC";
    }

    if(spHourOpt.value == ""){
        spHourOpt.style.border = "1px solid red";
        variableOk = false;
    }else{
        spHourOpt.style.border = "1px solid #BCBCBC";
    }

    if(spMinuteOpt.value == ""){
        spMinuteOpt.style.border = "1px solid red";
        variableOk = false;
    }else{
        spMinuteOpt.style.border = "1px solid #BCBCBC";
    }

    //var bedT = rearrangeTime(bdT, 'bedTime');
    var bedT = rearrangeTime('pickHour1', 'pickMinute1', 'amPm1');
    
    //var tryBedT = rearrangeTime(tryBdT, 'trySleepTime');
    var tryBedT = rearrangeTime('pickHour2', 'pickMinute2', 'amPm2');

    //var wakeT = rearrangeTime(wkT, 'finalAwakeTime');
    var wakeT = rearrangeTime('pickHour3', 'pickMinute3', 'amPm3');
    
    //var tryWakeT = rearrangeTime(outWkT, 'outOfBedTime');
    var tryWakeT = rearrangeTime('pickHour4', 'pickMinute4', 'amPm4');

    bedDiff = tryBedT - bedT;
    console.log("Bed time difference: " + bedDiff);

    wakeDiff = tryWakeT - wakeT;
    console.log("Wake time difference: " + wakeDiff);

    // timeIsOkay = checkBedTime('pickHour1', 'amPm1')

    timeDiffIsOkay = checkBedAndWakeUpTime('pickHour2', 'amPm2', 'pickHour3', 'amPm3')
    console.log("The time differencessss: " + timeDiffIsOkay);

    checkWakeUpCount();

    if(!requiredFieldsAreFilled){
        if(!numberIsInvalid){
            document.getElementById('wakeUpError').innerHTML = "Please enter a valid number";
            document.getElementById('wakeUpCount').style.border = "1px solid red";
        }
        sweetAlert("Attention","Please ensure you filled all the required fields.");
        return
    } 
    
    if(!numberIsInvalid){
        document.getElementById('wakeUpError').innerHTML = "Please enter a valid number";
        document.getElementById('wakeUpCount').style.border = "1px solid red";
        sweetAlert("Attention","Please fill all the required fields properly.");
        return
    }

    // if(!timeIsOkay){
    //     sweetAlert("Attention","Check Question #1. The time you get to bed to sleep seems too late.");
    // }else 
    if(bedDiff < 0){
        sweetAlert("Attention","Check Question #1 and #2. The time you tried to sleep is before your bed time.");
    }else if(!timeDiffIsOkay){
        sweetAlert("Attention","Check Question #2 and #6. The time you tried to sleep is the same or beyond your wake up time.");
    }else if(wakeDiff < 0){
        sweetAlert("Attention","Check Question #6 and #7. Your out of bed time is before your final awakening time.");
    }else{
        if(variableOk && time1 && time2 && time3 && time4){
            x.style.display = 'none';
            hds.style.display = 'none';
            y.style.display = 'block';

            // reformatTime('pickHour1', 'pickMinute1', 'amPm1')
            // reformatTime('pickHour2', 'pickMinute2', 'amPm2')
            // reformatTime('pickHour3', 'pickMinute3', 'amPm3')
            // reformatTime('pickHour4', 'pickMinute4', 'amPm4')
            // var dis = bdT.split(" ", 1);
            // console.log("Time taken out: " + dis)
    
            if(trialNo == 1){
                document.getElementById('trial1Med').style.display = 'block';
            }else if(trialNo == 2){
                document.getElementById('trial2Med').style.display = 'block';
            }
        }else{
            sweetAlert("Attention","Please select the hour and minute properly.");
        }
    }
}

function validateHourSelected1(hourOpt, idText){
    var errMsg = document.getElementById(idText+'Err');
    if(hourOpt.value == "00"){
        hourOpt.style.border = "1px solid red";
        errMsg.innerHTML = "Please enter a valid time.";
        time1 = false;
    }else{
        time1 = true;
        hourOpt.style.border = "1px solid #BCBCBC";
        errMsg.innerHTML = "";
    }
}

function validateHourSelected2(hourOpt, idText){
    var errMsg = document.getElementById(idText+'Err');
    if(hourOpt.value == "00"){
        hourOpt.style.border = "1px solid red";
        errMsg.innerHTML = "Please enter a valid time.";
        time2 = false;
    }else{
        time2 = true;
        hourOpt.style.border = "1px solid #BCBCBC";
        errMsg.innerHTML = "";
    }
}

function validateHourSelected3(hourOpt, idText){
    var errMsg = document.getElementById(idText+'Err');
    if(hourOpt.value == "00"){
        hourOpt.style.border = "1px solid red";
        errMsg.innerHTML = "Please enter a valid time.";
        time3 = false;
    }else{
        time3 = true;
        hourOpt.style.border = "1px solid #BCBCBC";
        errMsg.innerHTML = "";
    }
}

function validateHourSelected4(hourOpt, idText){
    var errMsg = document.getElementById(idText+'Err');
    if(hourOpt.value == "00"){
        hourOpt.style.border = "1px solid red";
        errMsg.innerHTML = "Please enter a valid time.";
        time4 = false;
    }else{
        time4 = true;
        hourOpt.style.border = "1px solid #BCBCBC";
        errMsg.innerHTML = "";
    }
}

function checkBedTime(hrId, amPmId){
    var timeIsOkay = true;
    let selectedHour = document.getElementById(hrId).value;
    var selectedAmPm = document.getElementById(amPmId).value;

    if(selectedAmPm == "AM"){
        if(selectedHour >= 5 && selectedHour != 12){
            timeIsOkay = false;
        }
    }
    return timeIsOkay;
}

function checkBedAndWakeUpTime(hrId, amPmId, hrId2, amPmId2){
    var timeIsOkay = true;
    let selectedHour = document.getElementById(hrId).value;
    var selectedAmPm = document.getElementById(amPmId).value;

    let selectedHour2 = document.getElementById(hrId2).value;
    var selectedAmPm2 = document.getElementById(amPmId2).value;

    if(selectedAmPm == "AM" && selectedAmPm2 == "AM"){
        if(selectedHour >= selectedHour2 && selectedHour != 12){
            timeIsOkay = false;
        }
    }
    return timeIsOkay;
}

function rearrangeTime(hrId, mnId, amPmId){
    let selectedHour = document.getElementById(hrId).value;
    let selectedMinute = document.getElementById(mnId).value;
    var selectedAmPm = document.getElementById(amPmId).value;
    console.log("selectedMinute: "+selectedMinute)
    if(selectedAmPm == "AM"){
        if(selectedHour == 12){
            selectedHour = 24;
        }else{
            selectedHour += 24;
        } 
    }
    console.log("Raw hours: "+selectedHour)
    let hrs = 60 * selectedHour
    console.log("The given time is: "+ selectedHour + selectedMinute)
    return hrs + selectedMinute;
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


// function formatTimeDisplay(elemId){
//     var selectedTime = document.getElementById(elemId).value;
//     //var digit = selectedTime.slice(0, 1);
//     let mins = parseInt(selectedTime.split(":").pop());
//     var twoDigits = parseInt(selectedTime.slice(0, 2));
//     var timeFlag = "  (AM)";
//     if(twoDigits < 12){
//         console.log("Leading number: "+ twoDigits)
//         if(twoDigits == 0){
//             document.getElementById(elemId).value = "12:" + mins.toString() + timeFlag;
//         }else{
//             document.getElementById(elemId).value = selectedTime + timeFlag;
//         }
        
//     }else{
//         timeFlag = "  (PM)";
//         document.getElementById(elemId).value = selectedTime + timeFlag;
//     }
// }

// function getTimeFlag(elemId){
//     var selectedTime = document.getElementById(elemId).value;
//     var twoDigits = parseInt(selectedTime.slice(0, 2));
//     var initFlag = selectedTime.split(" ").pop()
//     var timeFlag = "AM";
//     console.log("Initial Flag: "+initFlag)
//     if(twoDigits >= 12 && initFlag == "(PM)"){
//         timeFlag = "PM"
//     }
//     return timeFlag;
// }

// function rearrangeTime(n, elemId){
//     var numb = n.toString();
//     let mins = parseInt(numb.split(":").pop());
//     console.log(mins)
//     var hrsRaw = parseInt(numb.split(":", 1));
//     var timeFlag = getTimeFlag(elemId);
//     console.log("timeFlag: "+timeFlag)
//     if(timeFlag == "AM"){
//         if(hrsRaw == 12){
//             hrsRaw = 24;
//         }else{
//             hrsRaw += 24;
//         } 
//     }
//     console.log("Raw hours: "+hrsRaw)
//     let hrs = 60 * hrsRaw
//     console.log("The given time is: "+ hrs + mins)
//     return hrs + mins;
// }

// function reformatTime(elemId){
//     let theTime = document.getElementById(elemId).value;
//     let mins = parseInt(theTime.split(":").pop());
//     var hrsRaw = parseInt(theTime.split(":", 1));
//     var initFlag = theTime.split(" ").pop()
//     if(hrsRaw == 12 && initFlag == "(AM)"){
//         theTime = "00:"+mins.toString();
//     }else{
//         theTime =  theTime.split(" ", 1);
//     }
//     console.log("theTime: "+theTime)
//     let myTime = theTime.toString().replace(/^\s+|\s+$/gm,'');
//     return myTime;
// }

function hideDisplayMed(firstDisplay, secondDisplay, hds){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    var hds = document.getElementById(hds);
    
    x.style.display = 'none';
    hds.style.display = 'block';
    y.style.display = 'block';
}


// function fillSelectOption(elementId, startVal, endVal){
//     var selectOpt = document.getElementById(elementId);
//     var contents;
//     for (let i = startVal; i <= endVal; i++) {
//         contents += "<option value='"+ i +"'>" + i + "</option>";
//     }
//     selectOpt.innerHTML += contents;
// }

function checkWakeUpCount(){
    var sleepQty = getQuality();
    var text = document.getElementById('wakeUpCount').innerHTML;
    var fullID = isNum(text)
    //var wakeUpCount = $('#wakeUpCount').text();
    // var validNum = wakeUpCount.match(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
    
    if(sleepQty != ''){
        document.getElementById('qtyErMsg').innerHTML = "";
        requiredFieldsAreFilled = true;
        if (fullID){
            numberIsInvalid = true;
        }else{
            numberIsInvalid = false;
        }            
    }else{
        document.getElementById('qtyErMsg').innerHTML = "Select sleep quality.";
        requiredFieldsAreFilled = false;
    }
    // if (numberIsInvalid)  {
    //     bt.disabled = false;
    // } else {
    //     bt.disabled = true;
    // }
}



function showSupports(diSupport){
    var sp = document.getElementById(diSupport);
    lastQuestionIsSelected = true;
    tookAnotherMedication = true;
    document.getElementById('anyErMsg1').innerHTML = "";
    document.getElementById('anyErMsg2').innerHTML = "";
    sp.style.display = 'block';
}

function removeSupports(diSupport){
    var sp = document.getElementById(diSupport);
    lastQuestionIsSelected = true;
    tookAnotherMedication = false;
    document.getElementById('anyErMsg1').innerHTML = "";
    document.getElementById('anyErMsg2').innerHTML = "";
    sp.style.display = 'none';
}


function isNum(val) {
    try{
        if (val == "") {
            return false;
        }
        else if (val >= 0) {
            return true;
        }
    }catch(e){
        return false;
    }
    return false;
}

$(document).ready(function () {

    //  var bt = document.getElementById('btnSDNext');
    //  bt.disabled = true;

    //$('#wakeUpCount').keyup(fillSleepDiaryFields);

    // $("#wakeUpCount, #medName1Val, #medName2Val, #otherAmTaken, #anyAmTaken").keyup(function(e) {
    //     if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
    //     var bt = document.getElementById('btnSDNext');
    //     var wakeUpCount = document.getElementById('wakeUpCount').innerHTML;
    //     var sleepQty = getQuality();
    //     if (wakeUpCount != '' && sleepQty != '')  {
    //         bt.disabled = false;
    //     } else {
    //         bt.disabled = true;
    //     }
    // });

    jQuery(".hrClass").on('change', function (e) {
        var text = jQuery(this).text();
        var elmId = jQuery(this).attr("id");
        if (text != "00"){
            jQuery(this).css("color","black");
            jQuery(this).css("border","1px solid #BCBCBC");
            
            if(elmId == "pickHour1")
                jQuery("#pickHour1Err").text("");

            if(elmId == "pickHour2")
                jQuery("#pickHour2Err").text("");

            if(elmId == "pickHour3")
                jQuery("#pickHour3Err").text("");

            if(elmId == "pickHour4")
                jQuery("#pickHour4Err").text("");
            
        } else {
            jQuery(this).css("color","red");
            jQuery(this).css("border","1px solid red");

            var timeErrorMsg = "Please enter a valid time.";

            if(elmId == "pickHour1")
                jQuery("#pickHour1Err").text(timeErrorMsg);

            if(elmId == "pickHour2")
                jQuery("#pickHour2Err").text(timeErrorMsg);

            if(elmId == "pickHour3")
                jQuery("#pickHour3Err").text(timeErrorMsg);

            if(elmId == "pickHour4")
                jQuery("#pickHour4Err").text(timeErrorMsg);
        }
      });


    jQuery(".NumberDiv").on('click paste keydown keyup', function (e) {
        var text = jQuery(this).text();
        var fullID = isNum(text)
        //var fullID = text.match(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
        console.log("My full ID is: "+fullID)

        //This was use to control the Next Button before today 14/04/2022
        //var bt = document.getElementById('btnSDNext');  
        var elmId = jQuery(this).attr("id");
        var sleepQty = getQuality();
        if (fullID){
            numberIsInvalid = true;
            jQuery(this).css("color","black");
            jQuery(this).css("border","1px solid #BCBCBC");
            
            if(elmId == "wakeUpCount")
                jQuery("#wakeUpError").text("");

            if(elmId == "medName1Val")
                jQuery("#medNameVal1Error").text("");

            if(elmId == "medName2Val")
                jQuery("#medName2ValError").text("");

            if(sleepQty != '')
                requiredFieldsAreFilled = true;
        } else {
            numberIsInvalid = false;
            jQuery(this).css("color","red");
            jQuery(this).css("border","1px solid red");

            var numberErrorMsg = "Please enter a valid number.";
            
            if(elmId == "wakeUpCount")
                jQuery("#wakeUpError").text(numberErrorMsg);

            if(elmId == "medName1Val")
                jQuery("#medNameVal1Error").text(numberErrorMsg);

            if(elmId == "medName2Val")
                jQuery("#medName2ValError").text(numberErrorMsg);

            requiredFieldsAreFilled = false;
            //bt.disabled = true;
        }
      });

    //alert(window.localStorage.getItem("linkText"));

    //Go back to dashboard
    $('#btnBackMain').on('click', function(event){
        window.location.href = "patient-dashboard.html";
    });

    

    //Submit Sleep diary
    $('#btnSubSleepDiary').on('click', function(event){
        event.preventDefault();

        //var bedTime = reformatTime('bedTime');
        var bedTime = reformatTime('pickHour1', 'pickMinute1', 'amPm1');
        console.log("Bed Time: "+bedTime)

        // let bedTimeMins = parseInt(bedTime.split(":").pop());
        // let bedTimeHrs = parseInt(bedTime.split(":", 1));
        //window.localStorage.setItem("bedTime", bedTime);

        //var trySleepTime = reformatTime('trySleepTime');
        var trySleepTime = reformatTime('pickHour2', 'pickMinute2', 'amPm2');
        console.log("trySleepTime: "+trySleepTime)
        // let trySleepTimeMins = parseInt(trySleepTime.split(":").pop());
        // let trySleepTimeHrs = parseInt(trySleepTime.split(":", 1));
        //window.localStorage.setItem("trySleepTime", trySleepTime);

        //var fallSleepTime = document.getElementById("sleepTime").value;
        var spHourOpt  = document.getElementById('spHourOpt').value;
        var spMinuteOpt  = document.getElementById('spMinuteOpt').value;
        var fallSleepTime = parseInt(60 * spHourOpt) + parseInt(spMinuteOpt);

        //var finalAwakeTime = reformatTime('finalAwakeTime');
        var finalAwakeTime = reformatTime('pickHour3', 'pickMinute3', 'amPm3');
        console.log("finalAwakeTime: "+finalAwakeTime)
        // let finalAwakeTimeMins = parseInt(finalAwakeTime.split(":").pop());
        // let finalAwakeTimeHrs = parseInt(finalAwakeTime.split(":", 1));
        //window.localStorage.setItem("finalAwakeTime", finalAwakeTime);

        //var outOfBedTime = reformatTime('outOfBedTime');
        var outOfBedTime = reformatTime('pickHour4', 'pickMinute4', 'amPm4');
        console.log("outOfBedTime: "+outOfBedTime)
        // let outOfBedTimeMins = parseInt(outOfBedTime.split(":").pop());
        // let outOfBedTimeHrs = parseInt(outOfBedTime.split(":", 1));
        //window.localStorage.setItem("outOfBedTime", outOfBedTime);

        //var awakeLast = document.getElementById("awakeLast").value;
        // let awakeLastMins = parseInt(awakeLast.split(":").pop());
        // let awakeLastHrs = parseInt(awakeLast.split(":", 1));
        //window.localStorage.setItem("awakeLast", awakeLast);

        var otherNote = document.getElementById("otherNote").value;
        //window.localStorage.setItem("otherNote", otherNote);

        var sleepQty = getQuality();
        if(sleepQty == ''){
            sleepQty = 'Fair';
        }
        
        //window.localStorage.setItem("sleepQty", sleepQty);

        //var wakeUpCount = document.getElementById('wakeUpCount').innerHTML;
        var hourOpt  = document.getElementById('hourOpt').value;
        var minuteOpt  = document.getElementById('minuteOpt').value;
        var awakeLast = parseInt(60 * hourOpt) + parseInt(minuteOpt);

        var medName1Name = $('#medName1').text();
        var medName2Name = $('#medName2').text();
        var medName1Val = $('#medName1Val').text();
        var medName2Val = $('#medName2Val').text();

        let trialNo = window.localStorage.getItem("trialNo");
        var anyMedBlock1 = {};
        var anyMedBlock2 = {};
        var anyMedBlock3 = {};
        var otherAmTaken, otherMedName;
        if(trialNo == 1){
            anyMedBlock1 = buildAnyMedBlock('#anyMedName', '#anyAmTaken', 'anyMedID');
            anyMedBlock2 = buildAnyMedBlock('#anyMedName2', '#anyAmTaken2', 'anyMedID2');
            anyMedBlock3 = buildAnyMedBlock('#anyMedName3', '#anyAmTaken3', 'anyMedID3');
            // otherMedName = $('#anyMedName').text();
            // otherAmTaken = $('#anyAmTaken').text();
            // var otherMedID = window.localStorage.getItem("otherMedID");
            // if(otherMedID != null){
            //     otherMedID = parseInt(otherMedID);
            //     anyMedBlock = {
            //         "id": otherMedID,
            //         "medicationName": otherMedName,
            //         "amount": otherAmTaken
            //     }
            // }else if(otherMedID == null && otherAmTaken != ''){
            //     anyMedBlock = {
            //         "medicationName": otherMedName,
            //         "amount": otherAmTaken
            //     }
            // }else{anyMedBlock = {}}
        }else if(trialNo == 2){
            anyMedBlock1 = buildAnyMedBlock('#otherMedName', '#otherAmTaken', 'otherMedID');
            anyMedBlock2 = buildAnyMedBlock('#otherMedName2', '#otherAmTaken2', 'otherMedID2');
            anyMedBlock3 = buildAnyMedBlock('#otherMedName3', '#otherAmTaken3', 'otherMedID3');
            // otherMedName = $('#otherMedName').text();
            // otherAmTaken = $('#otherAmTaken').text();
            // var anyMedID = window.localStorage.getItem("anyMedID");
            // if(anyMedID != null){
            //     anyMedID = parseInt(anyMedID);
            //     anyMedBlock = {
            //         "id": anyMedID,
            //         "medicationName": otherMedName,
            //         "amount": otherAmTaken
            //     }
            // }else if(anyMedID == null && otherAmTaken != ''){
            //     anyMedBlock = {
            //         "medicationName": otherMedName,
            //         "amount": otherAmTaken
            //     }
            // }else{anyMedBlock = {};}
        }

        var wakeUpCount = $('#wakeUpCount').text();
    
        var valueIsValid = true;
        if(medName1Val != ''){
            //var validNum = medName1Val.match(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
            var validNum = isNum(medName1Val)
            if (!validNum) {
                valueIsValid = false;
            }
        }
        
        if(medName2Val != ''){
            //var validNum = medName2Val.match(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
            var validNum = isNum(medName2Val)
            if (!validNum) {
                valueIsValid = false;
            }
        }
        // if(otherAmTaken != ''){
        //     var validNum = otherAmTaken.match(/^-?(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/);
        //     if (validNum == null) {
        //         valueIsValid = false;
        //     }
        // }

        if(medName1Val == ''){medName1Val = parseInt(0)}else{medName1Val = parseInt(medName1Val)}
        if(medName2Val == ''){medName2Val = parseInt(0)}else{medName2Val = parseInt(medName2Val)}
        //if(otherAmTaken == ''){otherAmTaken = parseInt(0)}else{otherAmTaken = parseInt(otherAmTaken)}

        var sleepDate =  window.localStorage.getItem("submitDate");
        let pID = window.localStorage.getItem("submitID");
        if(pID != ''){pID = parseInt(pID)}
        var med1Date = window.localStorage.getItem("medDate1"); 
        let med1ID = window.localStorage.getItem("medID1"); 
        if(med1ID != ''){med1ID = parseInt(med1ID)}
        var med2Date = window.localStorage.getItem("medDate2"); 
        let med2ID = window.localStorage.getItem("medID2"); 
        if(med2ID != ''){med2ID = parseInt(med2ID)}
        let drugTaper = window.localStorage.getItem("drugTaper");
        let authToken = window.localStorage.getItem("patientToken");

        console.log("Sleep Diary ID is: "+pID)
        
        console.log(authToken)

        //window.location.href = "sleep-medication.html";

        var otherMedIsValidated = false;
        if(tookAnotherMedication && (otherMedName != "" && otherAmTaken != "")){
            otherMedIsValidated = true;
        }else if(!tookAnotherMedication){
            otherMedIsValidated = true;
        }


        let url = urlDomain + 'insomnia/v1/patient/submit-sleepdiary';

        if(lastQuestionIsSelected){
            if(otherMedIsValidated){
                //console.log("Submitable!!!!!")
    
                if(valueIsValid){
                
                    if(trialNo == 1){
                        $.ajax({
                            url: url,
                            type: 'POST',
                            headers: {
                                'Content-Type': 'application/json', 
                                'Accept': '*/*',
                                'Authorization': 'Bearer '+ authToken
                            },
                            data: JSON.stringify({
                                "id":pID,
                                "bedTime": bedTime,
                                "tryTosleepTime": trySleepTime,
                                "durationBeforesleepoff": fallSleepTime,
                                "wakeUptimeCount": wakeUpCount,
                                "totalWakeUpduration": awakeLast,
                                "finalWakeupTime": finalAwakeTime,
                                "timeLeftbed": outOfBedTime,
                                "sleepQuality": sleepQty,
                                "otherThings": otherNote,
                                "othermedications" : [ anyMedBlock1, anyMedBlock2, anyMedBlock3 ],
                                "date_Created": sleepDate
                
                              }),
                            success: function(result){
                                console.log(result);
                                sleepDiarySuccessAlert();
                            }, 
                            error: function(msg){
                                if(msg.status == "511"){
                                    displayQuickAlert();
                                }else if(msg.status == "201"){
                                    sleepDiarySuccessAlert();
                                }else{
                                    $("#errorContainer").html("Unable to submit");
                                    var content = "<span style='font-weight: bold'>Sleep diary submission failed.</span> <span>Please try again shortly.</span>";
                                    swal({title: "", text: content, html: true});
                                }
                               
                                //sweetAlert("Sleep diary submission failed!","Please try again shortly.","error");
                            }
                        });//For patients in Trial 1
                    }else{
                        if(drugTaper == 2){
                            $.ajax({
                                url: url,
                                type: 'POST',
                                headers: {
                                    'Content-Type': 'application/json', 
                                    'Accept': '*/*',
                                    'Authorization': 'Bearer '+ authToken
                                },
                                data: JSON.stringify({
                                    "id":pID,
                                    "bedTime": bedTime,
                                    "tryTosleepTime": trySleepTime,
                                    "durationBeforesleepoff": fallSleepTime,
                                    "wakeUptimeCount": wakeUpCount,
                                    "totalWakeUpduration": awakeLast,
                                    "finalWakeupTime": finalAwakeTime,
                                    "timeLeftbed": outOfBedTime,
                                    "sleepQuality": sleepQty,
                                    "otherThings": otherNote,
                                    "medications" : [
                                    {
                                    "id": med1ID,
                                    "medicationName": medName1Name,
                                    "amount": medName1Val,
                                    "date_Created": med1Date
                                    },
                                    {
                                    "id": med2ID,
                                    "medicationName": medName2Name,
                                    "amount": medName2Val,
                                    "date_Created": med2Date
                                    } ],
                                    "othermedications" : [ anyMedBlock1, anyMedBlock2, anyMedBlock3 ],
                                    "date_Created": sleepDate
                    
                                  }),
                                success: function(result){
                                    console.log(result);
                                    sleepDiarySuccessAlert();
                                }, 
                                error: function(msg){
                                    if(msg.status == "511"){
                                        displayQuickAlert();
                                    }else if(msg.status == "201"){
                                        sleepDiarySuccessAlert();
                                    }else{
                                        $("#errorContainer").html("Unable to submit");
                                        var content = "<span style='font-weight: bold'>Sleep diary submission failed.</span> <span>Please try again shortly.</span>";
                                        swal({title: "", text: content, html: true});
                                    }
                                    
                                }
                            }); //For patients in Trial 2 tapering 2 drugs
                        }else{
                            $.ajax({
                                url: url,
                                type: 'POST',
                                headers: {
                                    'Content-Type': 'application/json', 
                                    'Accept': '*/*',
                                    'Authorization': 'Bearer '+ authToken
                                },
                                data: JSON.stringify({
                                    "id":pID,
                                    "bedTime": bedTime,
                                    "tryTosleepTime": trySleepTime,
                                    "durationBeforesleepoff": fallSleepTime,
                                    "wakeUptimeCount": wakeUpCount,
                                    "totalWakeUpduration": awakeLast,
                                    "finalWakeupTime": finalAwakeTime,
                                    "timeLeftbed": outOfBedTime,
                                    "sleepQuality": sleepQty,
                                    "otherThings": otherNote,
                                    "medications" : [
                                    {
                                    "id": med1ID,
                                    "medicationName": medName1Name,
                                    "amount": medName1Val,
                                    "date_Created": med1Date
                                    }],
                                    "othermedications" : [ anyMedBlock1, anyMedBlock2, anyMedBlock3 ],
                                    "date_Created": sleepDate
                    
                                  }),
                                success: function(result){
                                    console.log(result);
                                    sleepDiarySuccessAlert();
                                }, 
                                error: function(msg){
                                    $("#errorContainer").html("Unable to submit");
                                    if(msg.status == "511"){
                                        displayQuickAlert();
                                    }else if(msg.status == "201"){
                                        sleepDiarySuccessAlert();
                                    }else{
                                        var content = "<span style='font-weight: bold'>Sleep diary submission failed.</span> <span>Please try again shortly.</span>";
                                        swal({title: "", text: content, html: true});
                                    }
                                }
                            });//For patients in Trial 2 tapering 1 drug
                        }
                    }//end of diary taper submission
                    
                }else{
                    var content = "<span style='font-weight: bold'>Unable to submit sleep diary.</span> <span>Please ensure you entered only numbers where necessary.</span>";
                    swal({title: "", text: content, html: true});
                    //sweetAlert("Unable to submit!","Please ensure you entered only numbers where necessary.","error");
                }
                
            }else{
                var content = "<span style='font-weight: bold'>You selected 'Yes' on any other medications...</span> <span>Please fill the medication details properly or select 'No' to submit.</span>";
                swal({title: "", text: content, html: true});
            }
        } else{
            // var content = "<span style='font-weight: bold'>Did you take any medications before going to sleep?</span> <span>Please, your response is needed.</span>";
            // swal({title: "", text: content, html: true});
            document.getElementById('anyErMsg1').innerHTML = "Please select one option.";
            document.getElementById('anyErMsg2').innerHTML = "Please select one option.";
        }

    });

    
 });