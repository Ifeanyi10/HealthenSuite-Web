var urlDomain = window.localStorage.getItem("urlDomain");
 
 //insomnia trial 1 gender
 function getTrial1Gender(elementName) {
    var genderInfo = document.forms['formInsomnia'].elements[elementName];
    var gender = ""; 

    for (i = 0; i < genderInfo.length; i++) {    
        if(genderInfo[i].checked == true){        
            gender =  genderInfo[i].value;               
        } 
    }
    return gender;
}

function fillAllFields(){
    var bt = document.getElementById('btnTrial16');
    var fName = $("#patFName").val();
    var lName = $("#patLName").val();
    var ag = $("#patAge").val();
    if (fName != '' && lName != '' && ag != '')  {
        if(ag > 17){
            bt.disabled = false;
            $("#ageError").html("");
        }else{
            $("#ageError").html("This app is for patients 18 years and older. Please confirm the age of the patient.");
        }
        
    } else {
        bt.disabled = true;
    }
}

function fillAllFields2(){
    var bt = document.getElementById('btnTrial2');
    var fName = $("#pat2FName").val();
    var lName = $("#pat2LName").val();
    var ag = $("#pat2Age").val();
    if (fName != '' && lName != '' && ag != '')  {
        if(ag > 17){
            bt.disabled = false;
            $("#ageError2").html("");
        }else{
            $("#ageError2").html("This app is for patients 18 years and older. Please confirm the age of the patient.");
        }
    } else {
        bt.disabled = true;
    }
}

function fillBasicMedicationFields(){
    var bt = document.getElementById('btnMedication');
    var ds2 = document.getElementById('dosage2');
    var med2 = document.getElementById("idMedications2").value;
    var meds = $("#idMedications1").val();
    var dose = $("#dosage").val();
    var duration = $("#inputDuration").val();
    
    if (meds != '' && dose != '')  {
        ds2.disabled = false;
        if(med2 == '' && duration != ''){bt.disabled = false;
        }else{$('#idMedications2, #dosage2').keyup(fillBasicMedicationFields2);}
        
    } else {
        ds2.disabled = true;
        bt.disabled = true;
    }
}

function fillBasicMedicationFields2(){
    var bt = document.getElementById('btnMedication');
    bt.disabled = true;
    var meds = $("#idMedications2").val();
    var dose = $("#dosage2").val();
    var duration = $("#inputDuration2").val();
    
    if (meds != '' && dose != '' && duration != '')  {
        bt.disabled = false;
    } else {
        //alert(duration);
        bt.disabled = true;
    }
}


function checkDuration(){
    var bt = document.getElementById('btnMedication');
    var med2 = document.getElementById("idMedications2").value;
    var meds = $("#idMedications1").val();
    var dose = $("#dosage").val();
    var dose2 = $("#dosage2").val();
    var duration = $("#inputDuration").val();
    var duration2 = $("#inputDuration2").val();
    
    if (meds != '' && dose != '' && duration != '')  {

        if(med2 != ''){
            if (dose2 != '' && duration2 != ''){
                bt.disabled = false;
            }else{
                bt.disabled = true;
            }
        }else{
            bt.disabled = false;
        }
        
    } else {
        bt.disabled = true;
    }
}


function getConceptID(selecteValue){

    let drugs = ['Alprazolam', 'Bromazepam', 'Buspirone', 'Chlordiazepoxide',
    'Clonazepam', 'Clorazepate', 'Diazepam', 'Eszopiclone',
    'Flurazepam', 'Lorazepam', 'Nitrazepam', 'Oxazepam',
    'Temazepam', 'Triazolam', 'Zopiclone', 'Zolpidem'];

    let conceptId = 0;

    for (i = 0; i < drugs.length; i++) { 
        if(drugs[i] == selecteValue){
            conceptId = i + 1;
            return conceptId;
        }       
    }
    return conceptId;
}

function UpdateSelectedSingle(tableId){
    $('#taperTable tbody tr').each(function(i, def) {
        var selection = $(this).find('td:last option:selected').val();
        document.getElementById(tableId).rows[i + 1].cells[3].innerHTML = selection;
    });
}

function UpdateSelectedDouble(tableId){
    $('#taperTable2 tbody tr').each(function(i, def) {
        var selection = $(this).find('td:last option:selected').val();
        document.getElementById(tableId).rows[i + 1].cells[3].innerHTML = selection;
    });
}

//Display patient details
function getPatDetatail(){
    var x = document.getElementById('duplicateScreen');
    var y = document.getElementById('printSampleRecov');
    var rowId = event.target.parentNode.parentNode.id; 
    //this gives id of tr whose button was clicked 
    // var data = document.getElementById(rowId).querySelectorAll("td");    
    // /*returns array of all elements  within the row with given id*/ 
    // var pID = data[0].innerHTML; 
    // alert("Patient ID: " + pID); 
    // let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/retrieveRefcode/'+ pID;  

    // let authToken = window.localStorage.getItem("token");
    // $.ajax({
    //     url: url,
    //     type: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json', 
    //         'Accept': '*/*',
    //         'Authorization': 'Bearer '+ authToken
    //     },
    
    //     success: function(result){

    //         console.log(result);
            
    //         document.getElementById('refCodeRecov').innerHTML = result.referalCode;
    //         // document.getElementById('usName').innerHTML = result.userName;
    //         // document.getElementById('ps').innerHTML= result.password;
    //         y.style.display = 'block';         
    //         x.style.display = 'none';
            
    //     }, 
    //     error: function(msg){
    //         sweetAlert("Oops...","Unable to retrieve Ref. Code. Please try again shortly","error");
    //     }
    // });
}

$(function () {
    $("#otherBox").click(function () {
        if ($(this).is(":checked")) {
            $("#otherDiv").show();
        } else {
            $("#otherDiv").hide();
        }
    });
});

function logout(){
    window.localStorage.clear();
    //sessionStorage.clear();
}

function notEligibleAlert(){
    swal({title: "This patient is not ELIGIBLE!", text: "This tool is only designed to help patients reduce and stop up to two BZRAs for insomnia.", type: "error"},
                function(){ 
                    window.location.href = "provider-dashboard.html";
                }
                );
}


function hideDispaly1() {
    var x = document.getElementById('firstQ');
    var y = document.getElementById('secondQ1');
    var z = document.getElementById('thirdQ2');

    if (document.getElementById('prescYes').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
        z.style.display = 'none';           
    } else if (document.getElementById('prescNo').checked){
        x.style.display = 'none';
        y.style.display = 'none';
        z.style.display = 'block'; 
        //notEligibleAlert();
    }
}

function hideDispaly2() {
    var x = document.getElementById('secondQ1');
    var y = document.getElementById('thirdQ1');
    var z = document.getElementById('thirdQ2');

    if (document.getElementById('forSleepYes').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
        z.style.display = 'none';            
    } else if (document.getElementById('forSleepNo').checked){
        x.style.display = 'none';
        y.style.display = 'none';
        z.style.display = 'block'; 
    }
}

function hideDispaly3() {
    //Trial 1 Demography
    var x = document.getElementById('thirdQ2');
    var y = document.getElementById('trial1Demo');
    var t1M = document.getElementById('t1Male');
    var t1F = document.getElementById('t1Female');
    var t1O = document.getElementById('t1Other');

    if (document.getElementById('notForSleepNo').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
           
    } else if (document.getElementById('notForSleepYes').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}

function hideDispaly4() {
    var x = document.getElementById('thirdQ1');
    var y = document.getElementById('fourthQ1');

    if (document.getElementById('good').checked || document.getElementById('good2').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
                   
    } else if (document.getElementById('bad').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}

function hideDispaly5() {
    var x = document.getElementById('fourthQ1');
    var y = document.getElementById('fifthQ1');

    if (document.getElementById('willingYes').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
                   
    } else if (document.getElementById('willingNo').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}


function hideDispaly6() {
    //Trial 2 Demography
    var x = document.getElementById('fifthQ1');
    var y = document.getElementById('trial2Demo');
    var t1M = document.getElementById('t2Male');
    var t1F = document.getElementById('t2Female');
    var t1O = document.getElementById('t2Other');

    if (document.getElementById('t2NotForSleepNo').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
           
    } else if (document.getElementById('t2NotForSleepYes').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}


function displaySreeen2() {
    var x = document.getElementById('screen1');
    var y = document.getElementById('screen2');

        y.style.display = 'block';         
        x.style.display = 'none';
}

function prpareScreen3(dispalyValue, otherDisplayValeu, medOptions){

    let drugs = ['Alprazolam', 'Bromazepam', 'Buspirone', 'Chlordiazepoxide',
    'Clonazepam', 'Clorazepate', 'Diazepam', 'Eszopiclone',
    'Flurazepam', 'Lorazepam', 'Nitrazepam', 'Oxazepam',
    'Temazepam', 'Triazolam', 'Zopiclone', 'Zolpidem'];

    var drugOptions = "<option value ="+dispalyValue+">"+dispalyValue+"</option>";

    for (i = 0; i < drugs.length; i++) { 
        if(drugs[i] != dispalyValue){
            if(drugs[i] != otherDisplayValeu){
                drugOptions += "<option value ="+drugs[i]+">"+drugs[i]+"</option>";
            }
        }       
    }
    document.getElementById(medOptions).innerHTML = drugOptions;

}

function validateStartDate(){
    var bt = document.getElementById('btnStartDate');
    var stDate = $("#datepicker").val();
    window.localStorage.setItem("tapperStartDate", stDate);

    if(stDate != '') {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        var date1 = new Date(today);
        var date2 = new Date(stDate); 

        // To calculate the time difference of two dates 
        var Difference_In_Time = date2.getTime() - date1.getTime(); 

        // To calculate the no. of days between two dates 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        if(Difference_In_Days <= 14){
            bt.disabled = false;
        }else{
            bt.disabled = true;
        }
        
    } else {
        bt.disabled = true;
    }
  }

function validateMedCheck(){
    var btnMed = document.getElementById('btnMedSelect');
    var meds = document.forms['medForm'].elements['medCAT'];
    for (i = 0; i < meds.length; i++) {    
        if(meds[i].checked == true){
            btnMed.disabled = false;
            return
        }else{
            btnMed.disabled = true;
        }
    }
}

function validateLastSubmit(){
    var btnCog = document.getElementById('btnSubmitTrial2');
    var cognitive = document.getElementById('chkLast');
      
        if(cognitive.checked == true){
            btnCog.disabled = false;
            return
        }else{
            btnCog.disabled = true;
        }
}

function displaySreeen3() {
    var x = document.getElementById('screen2');
    var y = document.getElementById('screen3');
    var z = document.getElementById('med2');
    var meds = document.forms['medForm'].elements['medCAT'];
    var firstSelectedValue = ""; 
    var secondSelectedValue = "";
    var initialCount = 0;
    let drugOptions1 = "idMedications1";
    let drugOptions2 = "idMedications2";

    for (i = 0; i < meds.length; i++) {    
        if(meds[i].checked == true){
            if(initialCount < 2){
                if(initialCount == 0){
                    firstSelectedValue =  meds[i].value;
                } 
                if(initialCount == 1){
                    secondSelectedValue =  meds[i].value;
                }    
                initialCount += 1;                            
            }
        } 
    }

    if(firstSelectedValue != ""){
        prpareScreen3(firstSelectedValue, secondSelectedValue, drugOptions1)
        document.querySelector('#idMedications2').innerHTML = '';
        window.localStorage.setItem("med2Store", "");
    }
    if(secondSelectedValue != ""){
        prpareScreen3(secondSelectedValue, firstSelectedValue, drugOptions2)
        z.style.display = 'block';
    }

    y.style.display = 'block';  
    x.style.display = 'none';
}

function displaySreeen4() {
    var x = document.getElementById('screen3');
    var y = document.getElementById('screen4');

        y.style.display = 'block';         
        x.style.display = 'none';
}

function displaySreeen5() {
    var x = document.getElementById('screen4');
    var y = document.getElementById('screen5');

    document.getElementById('pName').innerHTML =  window.localStorage.getItem("patientName");
    document.getElementById('pFirstName').innerHTML =  window.localStorage.getItem("patientFName");

        y.style.display = 'block';         
        x.style.display = 'none';
}

function goBack(firstDisplay, secondDisplay){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    
    x.style.display = 'none';
    y.style.display = 'block';
}

function startOver(){
    window.location.href = "randomization.html";
}

function goBackQ2(firstDisplay, secondDisplay){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    
    x.style.display = 'none';
    if(document.getElementById('prescNo').checked){
        document.getElementById('firstQ').style.display = 'block';
    }else{
        y.style.display = 'block';
    }  
}




$(document).ready(function () {

    //Go back to select another medication
    $('#btnGoBack').on('click', function(event){
        event.preventDefault();
        $("#taperTable").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable1Print").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable2Print").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable3Print").find("tbody").empty(); //clear all the content from tbody here.

        var y = document.getElementById('screen4');
        y.style.display = 'none';
        displaySreeen3();
    });

    //Go back to screen 2
    $('#btnBackScreen3').on('click', function(event){
        event.preventDefault();
        var y = document.getElementById('screen3');
        y.style.display = 'none';
        var z = document.getElementById('screen2');
        z.style.display = 'block';
    });

    //Go back to screen 1
    $('#btnBackScreen2').on('click', function(event){
        event.preventDefault();
        var y = document.getElementById('screen2');
        y.style.display = 'none';
        var z = document.getElementById('screen1');
        z.style.display = 'block';
    });


 });



$(document).ready(function () {

    $('#patFName, #patLName, #patAge').keyup(fillAllFields);

    var btT1 = document.getElementById('btnTrial16');
    btT1.disabled = true;

    $('#pat2FName, #pat2LName, #pat2Age').keyup(fillAllFields2);

    $('#idMedications1, #dosage').keyup(fillBasicMedicationFields);
    
     //Randomization Test
     $('#btnTrial16').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("patFName").value;
        var lastName = document.getElementById("patLName").value;
        var age = document.getElementById("patAge").value;
        var email = document.getElementById("patEmail").value;
        //var email = '';
        var gender= getTrial1Gender("optradio5");

        var y = document.getElementById("printSample");
        var dup = document.getElementById("screen1");
        //alert(gender);
        let url = urlDomain + 'insomnia/v1/patient/randomization';  

        //window.localStorage.setItem("token", "7BCcz0Duefx7ioF/20us6aKso5voeaPBgn0L+siY+lM=");
        //let authToken = window.localStorage.getItem("token");
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*'
              },
            data: JSON.stringify({"firstName": firstName, "lastName": lastName, "age": age, "gender": gender, "email" : email, 
            "trialType" : 1, "verify": false }),
            success: function(result){

                console.log(result);
                document.getElementById('pBlock').innerHTML = result.block;
                document.getElementById('pStrata').innerHTML = result.stratGroup;
                document.getElementById('pStrataV').innerHTML = result.stratValue;
                document.getElementById('pGroupID').innerHTML = result.studyGroupID;
                document.getElementById('pGroupN').innerHTML= result.groupName;
                swal({title: "Patient Randomized Successfully!!", text: "Click Ok to view details", type: "success"},
                function(){ 
                    //window.location.href = "provider-dashboard.html";
                    y.style.display = 'block';         
                    dup.style.display = 'none'; 
                    }
                );
                
            }, 
            error: function(msg){
                $("#errorDuplicateContainer").html("Unable to submit patient's record");
                sweetAlert("Unable to submit patient's record","Please try again shortly","error");
            }
        });
    });

    //Display Randomization Table
    $('#btnRandTable').on('click', function(event){
        event.preventDefault();

        var x = document.getElementById('printSample');
        var y = document.getElementById('randDisplay');

        let url = urlDomain + 'insomnia/v1/patient/randblock';
        let authToken = window.localStorage.getItem("token");

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            
            success: function(result){
                console.log(result);

                    $(result).each(function(i, def){

                        window["td"+i+1]= document.createElement('td');
                        window["td"+i+1].style.border = '1px solid #dddddd';
                        window["td"+i+1].style.textAlign = 'left';
                        window["td"+i+1].style.padding = '8px';

                        window["td"+i+2] = document.createElement('td');
                        window["td"+i+2].style.border = '1px solid #dddddd';
                        window["td"+i+2].style.textAlign = 'left';
                        window["td"+i+2].style.padding = '8px';

                        window["td"+i+3] = document.createElement('td');
                        window["td"+i+3].style.border = '1px solid #dddddd';
                        window["td"+i+3].style.textAlign = 'left';
                        window["td"+i+3].style.padding = '8px';

                        window["td"+i+4] = document.createElement('td');
                        window["td"+i+4].style.border = '1px solid #dddddd';
                        window["td"+i+4].style.textAlign = 'left';
                        window["td"+i+4].style.padding = '8px';

                        window["td"+i+5] = document.createElement('td');
                        window["td"+i+5].style.border = '1px solid #dddddd';
                        window["td"+i+5].style.textAlign = 'left';
                        window["td"+i+5].style.padding = '8px';

                        window["td"+i+6] = document.createElement('td');
                        window["td"+i+6].style.border = '1px solid #dddddd';
                        window["td"+i+6].style.textAlign = 'left';
                        window["td"+i+6].style.padding = '8px';

                        window["td"+i+7] = document.createElement('td');
                        window["td"+i+7].style.border = '1px solid #dddddd';
                        window["td"+i+7].style.textAlign = 'left';
                        window["td"+i+7].style.padding = '8px';


                        $("#randTBody").append($("<tr>")
                        .append($(window["td"+i+1]).append(def.id))
                        .append($(window["td"+i+2]).append(def.patientName))
                        .append($(window["td"+i+3]).append(def.block))
                        .append($(window["td"+i+4]).append(def.stratGroup))
                        .append($(window["td"+i+5]).append(def.stratValue))
                        .append($(window["td"+i+6]).append(def.studyGroupID))
                        .append($(window["td"+i+7]).append(def.groupName)));


                    });

                y.style.display = 'block';         
                x.style.display = 'none';
                //secondTB.style.display = 'none';
                //window.localStorage.setItem("medQuantity", 1);
            }, 
            error: function(msg){
                // $("#errorContainer3").html("Unable to reset Taper Schedule generated for the medication");
                // sweetAlert("Unable To Display Randomization Table","Please try again shortly","error");
                var content = "<span style='font-weight: bold'>Unable To Display Randomization Table.</span> <span>Please try again shortly.</span>";
                swal({title: "", text: content, html: true});
            }
        }); 
            //}
        
    });

    

 });