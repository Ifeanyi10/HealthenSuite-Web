var urlDomain = window.localStorage.getItem("urlDomain");

var emailIsElligible = true;
 
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


function goBack(firstDisplay, secondDisplay){
    var x = document.getElementById(firstDisplay);
    var y = document.getElementById(secondDisplay);
    
    x.style.display = 'none';
    y.style.display = 'block';
}

function isEmail(email) {
// eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
};

function validateAge(){
    var ag = $("#patAge").val().trim();
    var ageIsgood = false;
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
        $("#ageError").html("Age cannot be less than 18 years or greater than 150 years. Please confirm your patient age to proceed.");
        ageIsgood = false;
    }
    return ageIsgood;
}

function validateAge2(){
    var ag = $("#pat2Age").val().trim();
    var ageIsgood = false;
    if(ag > 17 && ag <= 150 && ag.charAt(0) != 0){
        try {
            if(ag % 1 == 0){
                ag = parseInt(ag);
                $("#ageError2").html("");  
                ageIsgood = true;                       
            }else{
                $("#ageError2").html("Please enter a valid age of the patient.");
                ageIsgood = false;
            }
          }
          catch(err) {
            $("#ageError2").html("Please enter a valid age of the patient.");
            ageIsgood = false;
            console.log("Error: "+err);
          }
    }else{
        $("#ageError2").html("Age cannot be less than 18 years or greater than 150 years. Please confirm your age to proceed.");
        ageIsgood = false;
    }
    return ageIsgood;
}

function fillAllFields(){
    var bt = document.getElementById('btnTrial1');
    var fName = $("#patFName").val().trim();
    var lName = $("#patLName").val().trim();
    var ag = $("#patAge").val().trim();
    if (fName != '' && lName != '' && ag != '')  {
        if(ag > 17 && ag <= 150 && ag.charAt(0) != 0){
            try {
                if(ag % 1 == 0){
                    ag = parseInt(ag);
                    $("#ageError").html("");
                    if(emailIsElligible){
                        bt.disabled = false;
                        $("#emailError").html("");
                    }
                    else{
                        bt.disabled = true;
                        $("#emailError").html("Invalid email address. Enter a valid email address or leave the field empty.");
                    }
                    
                }else{
                    $("#ageError").html("Please enter a valid age of the patient.");
                    bt.disabled = true;
                }
                
              }
              catch(err) {
                $("#ageError").html("Please enter a valid age of the patient.");
                console.log("Error: "+err);
                bt.disabled = true;
              }
        }else{
            $("#ageError").html("Only patients aged 18 to 150 years are eligible to participate. Please confirm the age of your patient to proceed.");
            bt.disabled = true;
        }
        
    } else {
        bt.disabled = true;
    }
}

function checkEmailValidity(){
    var currentEmail = $("#patEmail").val().trim();
    // Validate email
    if(currentEmail == ""){
        $("#emailError").html("");
        emailIsElligible = true;
        fillAllFields();   
    }else if (!isEmail(currentEmail)){
        $("#emailError").html("Invalid email address. Enter a valid email address or leave the field empty.");
        emailIsElligible = false;
        fillAllFields();
    }else{
        $("#emailError").html("");
        emailIsElligible = true;
        fillAllFields();
    }
}

function fillAllFields2(){
    var bt = document.getElementById('btnTrial2');
    var fName = $("#pat2FName").val().trim();
    var lName = $("#pat2LName").val().trim();
    var ag = $("#pat2Age").val().trim();
    if (fName != '' && lName != '' && ag != '')  {
        if(ag > 17 && ag <= 150 && ag.charAt(0) != 0){
            try {
                if(ag % 1 == 0){
                    ag = parseInt(ag);
                    $("#ageError2").html("");
                    if(emailIsElligible){
                        bt.disabled = false;
                        $("#emailError2").html("");
                    }
                    else{
                        bt.disabled = true;
                        $("#emailError2").html("Invalid email address. Enter a valid email address or leave the field empty.");
                    }
                }else{
                    $("#ageError2").html("Please enter a valid age of the patient.");
                    bt.disabled = true;
                }
              }
              catch(err) {
                $("#ageError2").html("Please enter a valid age of the patient.");
                console.log("Error: "+err);
                bt.disabled = true;
              }
        }else{
            $("#ageError2").html("Only patients aged 18 to 150 years are eligible to participate. Please confirm the age of your patient to proceed.");
            bt.disabled = true;
        }
    } else {
        bt.disabled = true;
    }
}

function checkEmailValidity2(){
    var currentEmail = $("#pat2Email").val().trim();
    // Validate email
    if(currentEmail == ""){
        $("#emailError2").html("");
        emailIsElligible = true;
        fillAllFields2(); 
    }else if (!isEmail(currentEmail)){
        $("#emailError2").html("Invalid email address. Enter a valid email address or leave the field empty.");
        emailIsElligible = false;
        fillAllFields2();
    }else{
        $("#emailError2").html("");
        emailIsElligible = true;
        fillAllFields2();
    }
}

function fillBasicMedicationFields(){
    var bt = document.getElementById('btnMedication');
    var ds2 = document.getElementById('dosage2');
    //var med2 = document.getElementById("idMedications2").value;
    var meds = $("#idMedications1").val();
    var meds2 = $("#idMedications2").val();
    var dose = $("#dosage").val().trim();
    var duration = $("#inputDuration").val();

    var dose2 = $("#dosage2").val().trim();
    var duration2 = $("#inputDuration2").val();
    
    if (meds != '' && dose != '')  {

        if(dose > 0 ){

            try{
                dose = parseInt(dose);
                $("#errorContainer4").html("");
                ds2.disabled = false;
                var howMany = window.localStorage.getItem("howMany");
                if(howMany == 1 && duration != ''){
                    bt.disabled = false;
                }
                else if(howMany == 2 && meds2 != '' && dose2 != '' && duration2 != ''){
                    bt.disabled = false;
                }
                else{
                    $('#idMedications2, #dosage2').keyup(fillBasicMedicationFields2);               
                }
    
            }catch(err){
                $("#errorContainer4").html("Please enter a valid dosage for Medication 1.");
                bt.disabled = true;
            }

        }else{
            $("#errorContainer4").html("Please enter a valid dosage for Medication 1.");
            bt.disabled = true;
        }
    } else {
        ds2.disabled = true;
        bt.disabled = true;
    }
}

function fillBasicMedicationFields2(){
    var bt = document.getElementById('btnMedication');
    bt.disabled = true;
    var meds2 = $("#idMedications2").val();
    var dose2 = $("#dosage2").val().trim();
    var duration2 = $("#inputDuration2").val();

    var meds = $("#idMedications2").val();
    var dose = $("#dosage2").val().trim();
    var duration = $("#inputDuration2").val();
    
    if (meds2 != '' && dose2 != '')  {

        if(dose2 > 0){

            try{
                dose2 = parseInt(dose2);
                $("#errorContainer5").html("");
                if(duration2 != '' && meds != '' && dose != '' && duration != ''){
                    bt.disabled = false;
                }
            }catch(err){
                $("#errorContainer5").html("Please enter a valid dosage for Medication 2.");
                bt.disabled = true;
            }

        }else{
            $("#errorContainer5").html("Please enter a valid dosage for Medication 2.");
            bt.disabled = true;
        }
        
    } else {
        //alert(duration);
        bt.disabled = true;
    }
}



// function fillBasicMedicationFields(){
//     var bt = document.getElementById('btnMedication');
//     var ds2 = document.getElementById('dosage2');
//     var med2 = document.getElementById("idMedications2").value;
//     var meds = $("#idMedications1").val();
//     var dose = $("#dosage").val().trim();
//     var duration = $("#inputDuration").val();
    
//     if (meds != '' && dose != '')  {
        
//         ds2.disabled = false;
//         if(med2 == '' && duration != ''){bt.disabled = false;
//         }else{$('#idMedications2, #dosage2').keyup(fillBasicMedicationFields2);}
        
//     } else {
//         ds2.disabled = true;
//         bt.disabled = true;
//     }
// }

// function fillBasicMedicationFields2(){
//     var bt = document.getElementById('btnMedication');
//     bt.disabled = true;
//     var meds = $("#idMedications2").val();
//     var dose = $("#dosage2").val().trim();
//     var duration = $("#inputDuration2").val();
    
//     if (meds != '' && dose != '' && duration != '')  {
//         bt.disabled = false;
//     } else {
//         //alert(duration);
//         bt.disabled = true;
//     }
// }



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

function addAction(tableId, tb){
    $(tableId).each(function(i, def) {
            var $drop = $(this).find('select');
            $drop.on("change", function(e) {
                UpdateDropDownValues(tableId, tb);
            });
    });
}

function UpdateDropDownValues(tableId, tb){
    var seV = [];
    let rowIndex = event.target.parentNode.parentNode.rowIndex;
    var selection = '';
    $(tableId).each(function(i, def) {
        if(i == (rowIndex - 1)){
            selection = $(this).find('td:last option:selected').index();
            var drop = $(this).find('select');
            drop.find('option').each(function(index,element){
                seV.push(element.value);
            });
        }
    });

    var newSeV = seV.splice(parseInt(selection))
    //newSeV.reverse();
    $(tableId).each(function(i, def) {
        console.log('My i: ' + i)
        if (i > (rowIndex -1)){
            var select = $(this).find('select');
            select.empty();
            //var columnValue = document.getElementById(tb).rows[i + 1].cells[2].innerHTML;
            $.each(newSeV, function(i, p) {
                select.append($('<option></option>').val(p).html(p));
            });
            //select.append($('<option></option>').val(columnValue).html(columnValue));
            //select.val(columnValue);
        }
        
    });
}

function UpdateSelectedSingle(tableId){
    $('#taperTable tbody tr').each(function(i, def) {
        //var selection = $(this).find('td:last option:selected').val();
        //var selection = document.getElementById("taperTable").rows[i + 1].cells[4].innerHTML;
        var selection = document.getElementById("taperTable").rows[i + 1].cells[3].innerHTML;
        //document.getElementById(tableId).rows[i + 1].cells[3].innerHTML = selection;
        document.getElementById(tableId).rows[i + 1].cells[2].innerHTML = selection;
    });
}


function getTableDoses(tableRow, tableIdName){
    var delim = "_WK_";
    var dose = ""
    var firstDoses = "";
    $(tableRow).each(function(i, def) {
        dose = document.getElementById(tableIdName).rows[i + 1].cells[3].innerHTML;
        firstDoses += dose+delim;
    });
    firstDoses = firstDoses.slice(0, -4); 
    return firstDoses;
    // console.log("This is a sampler: "+firstDoses)
}

function UpdateSelectedDouble(tableId){
    $('#taperTable2 tbody tr').each(function(i, def) {
        //var selection = $(this).find('td:last option:selected').val();
        //var selection = document.getElementById("taperTable2").rows[i + 1].cells[4].innerHTML;
        var selection = document.getElementById("taperTable2").rows[i + 1].cells[3].innerHTML;
        //document.getElementById(tableId).rows[i + 1].cells[3].innerHTML = selection;
        document.getElementById(tableId).rows[i + 1].cells[2].innerHTML = selection;
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
    // let url = urlDomain + 'insomnia/v1/patient/retrieveRefcode/'+ pID;  

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

// function errorToast(msgHeader, msgBody){
//     toastr.error(msgBody, msgHeader, {
//         positionClass: "toast-top-full-width",
//         timeOut: 5e3,
//         closeButton: !0,
//         debug: !1,
//         newestOnTop: !0,
//         progressBar: !0,
//         preventDuplicates: !0,
//         onclick: null,
//         showDuration: "300",
//         hideDuration: "1000",
//         extendedTimeOut: "1000",
//         showEasing: "swing",
//         hideEasing: "linear",
//         showMethod: "fadeIn",
//         hideMethod: "fadeOut",
//         tapToDismiss: !1,
//     });
// }


// swal({
//     title: "Sweet !!",
//     text: "<span style='color:#ff0000'>Hey, you are using HTML !!<span>",
//     html: !0,
//   });


function errorAlert(msgHeader, msgBody){
    swal({
        title: msgHeader,
        text: msgBody,
        html: !0,
      });
}

function sampleUpdateAColumn(tableId, tableIdName){
    $(tableId).each(function(i, def) {
        //var selection = document.getElementById(tableIdName).rows[i + 1].cells[2].innerHTML;
        var selection = document.getElementById(tableIdName).rows[i + 1].cells[1].innerHTML;
        //document.getElementById(tableIdName).rows[i + 1].cells[4].innerHTML = selection;
        document.getElementById(tableIdName).rows[i + 1].cells[3].innerHTML = selection;
    });
    //sampleAddAction(tableId, tableIdName);
}


// function sampleAddAction(tableId, tableIdName, tableLabel){
    
//     $(tableId).each(function(i, def) {
//         //var rowNum = parseInt($(this).parent().index()) + 1;
//         var $drop = $(this).find('select');
//         $drop.on("change", function(e) {
//             // var totalSelectedValue = 0;
//             // var rowNum = e.target.parentNode.parentNode.parentNode.rowIndex;
//             // console.log("Row Num: "+rowNum);
//             // $drop.find('option:selected').each(function() {
//             //     totalSelectedValue += parseFloat(this.value);
//             //     //alert(this.value);
//             // });
//             // console.log("Row Num: "+rowNum+" Sum: "+totalSelectedValue);
//             getAllValuefromMultiSelect(tableId, tableIdName, e, tableLabel);
//         });
//         //console.log("Loop Num: "+i);
//     });
    
// }

// function getAllValuefromMultiSelect(tableId, tableIdName, e, tableLabel){

//     var rowNum = e.target.parentNode.parentNode.parentNode.rowIndex;
//     //console.log("Row Num: "+rowNum);
//     $(tableId).each(function(i, def) {
//         if(i == (rowNum - 1)){
//             var totalSelectedValue = 0;
//             var drop = $(this).find('select');
//             drop.find('option:selected').each(function() {
//                 totalSelectedValue += parseFloat(this.value);
//                 //alert(this.value);
//             });
//             //get the rounded dose of that row
//             var roundedDoseVal = document.getElementById(tableIdName).rows[i + 1].cells[1].innerHTML;
//             //updateAprovedValue(tableIdName, rowNum, totalSelectedValue, roundedDoseVal, tableLabel);
//             //document.getElementById("sampTB").rows[rowNum].cells[3].innerHTML = totalSelectedValue;
//             console.log("Row Num: "+rowNum+" Sum: "+totalSelectedValue);
//         }
//         //console.log("Loop Num: "+i);
//     });
//     // $(this).find('option:selected').each(function() {
//     //     alert(this.value);
//     // });
// }

// function updateAprovedValue(tableIdName, rowNum, totalSelectedValue, roundedDoseVal, tableLabel){
//     var totalRows = document.getElementById(tableIdName).rows.length - 1;
//     var errToastHeader = "Dose Combination Selection Error!"; var msgHeader = "Dose Combination Selection Error!";
//     var errToastBody = ""; let pDosage = 0.0; var msgBody1 = ""; var msgBody2 = "";
//     //console.log("total Rows: "+totalRows);
//     var currentDoseValuebelowRow = 0; //this is define to ensure the lowest row value is not empty

//     if(rowNum > 1){

//         var currentDoseValueAboveRow = document.getElementById(tableIdName).rows[rowNum - 1].cells[4].innerHTML;
//         if(rowNum != totalRows){
//             currentDoseValuebelowRow = document.getElementById(tableIdName).rows[rowNum + 1].cells[4].innerHTML;
//         }
        
//         if(currentDoseValueAboveRow >= totalSelectedValue && currentDoseValuebelowRow <= totalSelectedValue){
//             document.getElementById(tableIdName).rows[rowNum].cells[4].innerHTML = totalSelectedValue;
//         }
//         else{
//             if(totalSelectedValue == 0){
//                 document.getElementById("modalMultiSelectTitle").innerHTML = "No Dose Selected!";
//                 document.getElementById("errorMsg").innerHTML = "There is no selected dose from the multi-select dropdown.";
//                 document.getElementById("selectIst").innerHTML = "The recommended dose for this week will change to the dose you recommend the patient to take in a week before. Select another dose from the dropdown if you want to change the dose for this week.";
//                 $('#multiSelectModal').modal('show');
                
//             }
//             else if(currentDoseValueAboveRow < totalSelectedValue){

//                 document.getElementById("modalMultiSelectTitle").innerHTML = "Dose Combination Selection Error!";
//                 document.getElementById("errorMsg").innerHTML = "Your total selected drug combination for this week is " + totalSelectedValue +"mg, this is higher than the week above it. Hence, the total drug combination you selected will not reflect for the intended week.";
//                 document.getElementById("selectIst").innerHTML = "The recommended dose for this week will change to the dose you recommend the patient to take in a week before. Select another dose from the dropdown if you want to change the dose for this week.";
//                 $('#multiSelectModal').modal('show');

//                 // errToastBody = "Your total selected drug combination for this week is " + totalSelectedValue +"mg, this is higher than the week above it. Hence, the total drug combination you selected will not reflect for the intended week.";
//                 // errorToast(errToastHeader, errToastBody);
//             }
//             else if(currentDoseValuebelowRow > totalSelectedValue){
//                 document.getElementById("modalMultiSelectTitle").innerHTML = "Dose Combination Selection Error!";
//                 document.getElementById("errorMsg").innerHTML = "Your total selected drug combination for this week is " + totalSelectedValue +"mg, this is lesser than the week below it. Hence, the total drug combination you selected will not reflect for the intended week.";
//                 document.getElementById("selectIst").innerHTML = "The recommended dose for this week will change to the dose you recommend the patient to take in a week before. Select another dose from the dropdown if you want to change the dose for this week.";
//                 $('#multiSelectModal').modal('show');

//                 // errToastBody = "Your total selected drug combination for this week is " + totalSelectedValue +"mg, this is lesser than the week below it. Hence, the total drug combination you selected will not reflect for the intended week.";
//                 // errorToast(errToastHeader, errToastBody);
//             }
            
//             console.log("Your total selected drug combination for this week is higher than the week above it or lesser than the week below it."); 
//         }
//     }
//     else{
//         currentDoseValuebelowRow = document.getElementById(tableIdName).rows[rowNum + 1].cells[4].innerHTML;

//         // switch(tableIdName){
//         //     case "taperTable": 
//         //         pDosage = parseFloat(document.getElementById("dosage").value);
//         //         break;
            
//         //     case "taperTable2":
//         //         pDosage = parseFloat(document.getElementById("dosage2").value);
//         //         break;
//         // }

//         pDosage = parseFloat("8");

//         if(currentDoseValuebelowRow <= totalSelectedValue && pDosage >= totalSelectedValue){
//             document.getElementById(tableIdName).rows[rowNum].cells[4].innerHTML = totalSelectedValue;
//         }
//         else{
//             if(pDosage < totalSelectedValue){
//                 msgBody1 = "Your total selected drug combination for this week is " + totalSelectedValue +"mg, this is higher than "+ pDosage +"mg which is the current dose of the patient. Hence, the total drug combination you selected will not reflect for the intended week.";
//                 msgBody2 = "The recommended dose for this week will change to the dose you recommend the patient to take in a week before. Select another dose from the dropdown if you want to change the dose for this week.";
//                 errorAlert(msgHeader, msgBody1, msgBody2);

//                 // document.getElementById("modalMultiSelectTitle").innerHTML = "Dose Combination Selection Error!";
//                 // document.getElementById("errorMsg").innerHTML = "Your total selected drug combination for this week is " + totalSelectedValue +"mg, this is higher than "+ pDosage +"mg which is the current dose of the patient. Hence, the total drug combination you selected will not reflect for the intended week.";
//                 // document.getElementById("selectIst").innerHTML = "The recommended dose for this week will change to the dose you recommend the patient to take in a week before. Select another dose from the dropdown if you want to change the dose for this week.";
//                 // $('#multiSelectModal').modal('show');
                
//                 // errToastBody = "Your total selected drug combination for this week is " + totalSelectedValue +"mg, this is higher than "+ pDosage +"mg which is the current dose of the patient. Hence, the total drug combination you selected will not reflect for the intended week.";
//                 // errorToast(errToastHeader, errToastBody);
//             }
//             else if(totalSelectedValue == 0){
//                 msgHeader = "No Dose Selected!";
//                 msgBody1 = "There is no selected dose from the multi-select dropdown.";
//                 msgBody2 = "The recommended dose for this week will change to the dose you recommend the patient to take in a week before. Select another dose from the dropdown if you want to change the dose for this week.";
//                 errorAlert(msgHeader, msgBody1, msgBody2);

//                 // document.getElementById("modalMultiSelectTitle").innerHTML = "No Dose Selected!";
//                 // document.getElementById("errorMsg").innerHTML = "There is no selected dose from the multi-select dropdown.";
//                 // document.getElementById("selectIst").innerHTML = "The recommended dose for this week will change to the dose you recommend the patient to take in a week before. Select another dose from the dropdown if you want to change the dose for this week.";
//                 // $('#multiSelectModal').modal('show');

//                 // errToastBody = "There is no selected dose from the multi-select dropdown.";
//                 // errorToast(errToastHeader, errToastBody);
//             }
//             else{
//                 msgBody1 = "Your total selected drug combination for this week is " + totalSelectedValue +"mg, this is lesser than the week below it. Hence, the total drug combination you selected will not reflect for the intended week.";
//                 msgBody2 = "The recommended dose for this week will change to the dose you recommend the patient to take in a week before. Select another dose from the dropdown if you want to change the dose for this week.";
//                 errorAlert(msgHeader, msgBody1, msgBody2);

//                 // document.getElementById("modalMultiSelectTitle").innerHTML = "No Dose Selected!";
//                 // document.getElementById("errorMsg").innerHTML = "Your total selected drug combination for this week is " + totalSelectedValue +"mg, this is lesser than the week below it. Hence, the total drug combination you selected will not reflect for the intended week.";
//                 // document.getElementById("selectIst").innerHTML = "The recommended dose for this week will change to the dose you recommend the patient to take in a week before. Select another dose from the dropdown if you want to change the dose for this week.";
//                 // $('#multiSelectModal').modal('show');

//                 // errToastBody = "Your total selected drug combination for this week is " + totalSelectedValue +"mg, this is lesser than the week below it. Hence, the total drug combination you selected will not reflect for the intended week.";
//                 // errorToast(errToastHeader, errToastBody);
//                 console.log("Your total selected drug combination for this week is lesser than the week below it.");
//             }
             
//         }
//     }

//     // if(totalSelectedValue == 0){
//     //     document.getElementById(tableIdName).rows[rowNum].cells[3].innerHTML = roundedDoseVal;
//     // }
    
// }



function updateRecommendedValue(tableIdName, rowNum, totalSelectedValue, drop){
    var totalRows = document.getElementById(tableIdName).rows.length - 1;
    var errToastHeader = "Attention"; var msgHeader = "Attention";
    var errToastBody = ""; let pDosage = 0.0; var msgBody = "";
    //console.log("total Rows: "+totalRows);
    var currentDoseValuebelowRow = 0; //this is define to ensure the lowest row value is not empty

    if(rowNum > 1){

        var currentDoseValueAboveRow = document.getElementById(tableIdName).rows[rowNum - 1].cells[3].innerHTML;
        if(rowNum != totalRows){
            currentDoseValuebelowRow = document.getElementById(tableIdName).rows[rowNum + 1].cells[3].innerHTML;
        }
        
        if(currentDoseValueAboveRow >= totalSelectedValue && currentDoseValuebelowRow <= totalSelectedValue){
            document.getElementById(tableIdName).rows[rowNum].cells[3].innerHTML = totalSelectedValue;
        }
        else{
            if(totalSelectedValue == 0){
                msgBody = "You have not selected dose combinations from the drop down. In this case, the taper dose for this particular week will be updated to the taper dose equal to the previous week, that is, "+currentDoseValueAboveRow+"mg. You can select other dose combinations if you would like to revise this week’s taper dose.";
                document.getElementById(tableIdName).rows[rowNum].cells[3].innerHTML = currentDoseValueAboveRow;
                errorAlert(msgHeader, msgBody);
            }
            else if(currentDoseValueAboveRow < totalSelectedValue){
                //deselectMutiDropdown(drop);
                msgBody = "You have selected " + totalSelectedValue +"mg as the taper dose for this week that is greater than the taper dose for the previous taper week. Therefore, this will automatically be replaced by the taper dose for the previous week, that is, "+currentDoseValueAboveRow+"mg. You can select other dose combinations if you would like to revise this week’s taper dose.";
                document.getElementById(tableIdName).rows[rowNum].cells[3].innerHTML = currentDoseValueAboveRow;
                errorAlert(msgHeader, msgBody);
            }
            else if(currentDoseValuebelowRow > totalSelectedValue){
                //deselectMutiDropdown(drop);
                msgBody = "You have selected " + totalSelectedValue +"mg as the taper dose for this week that is lower than the taper dose for the next week. Therefore, this will automatically be replaced by the taper dose for the previous week, that is, "+currentDoseValueAboveRow+"mg. You can select other dose combinations if you would like to revise this week’s taper dose.";
                document.getElementById(tableIdName).rows[rowNum].cells[3].innerHTML = currentDoseValueAboveRow;
                errorAlert(msgHeader, msgBody);
            }
            
            console.log("Your total selected drug combination for this week is higher than the week above it or lesser than the week below it."); 
        }
    }
    else{
        currentDoseValuebelowRow = document.getElementById(tableIdName).rows[rowNum + 1].cells[3].innerHTML;

        // console.log("currentDoseValuebelowRow Value: "+currentDoseValuebelowRow);

        switch(tableIdName){
            case "taperTable": 
                pDosage = parseFloat(document.getElementById("dosage").value);
                break;
            
            case "taperTable2":
                pDosage = parseFloat(document.getElementById("dosage2").value);
                break;

            case "taperTableTest":
                pDosage = parseFloat("45");
                break;
        }

        //pDosage = parseFloat("8");

        if(currentDoseValuebelowRow <= totalSelectedValue && pDosage >= totalSelectedValue){
            document.getElementById(tableIdName).rows[rowNum].cells[3].innerHTML = totalSelectedValue;
        }
        else{
            if(pDosage < totalSelectedValue){
                //deselectMutiDropdown(drop);
                msgBody = "You have selected " + totalSelectedValue +"mg as the taper dose for this week that is greater than the current dose of the patient. Therefore, this will automatically be replaced by the current dose of the patient, that is, "+pDosage+"mg. You can select other dose combinations if you would like to revise this week’s taper dose.";
                document.getElementById(tableIdName).rows[rowNum].cells[3].innerHTML = pDosage;
                errorAlert(msgHeader, msgBody);
            }
            else if(totalSelectedValue == 0){ 
                msgBody = "You have not selected dose combinations from the drop down. In this case, the taper dose for this particular week will be updated to the current dose of the patient, that is, "+pDosage+"mg. You can select other dose combinations if you would like to revise this week’s taper dose.";
                document.getElementById(tableIdName).rows[rowNum].cells[3].innerHTML = pDosage;
                errorAlert(msgHeader, msgBody);
            }
            else{
                //deselectMutiDropdown(drop);
                msgBody = "You have selected " + totalSelectedValue +"mg as the taper dose for this week that is lower than the taper dose for the next week. Therefore, this will automatically be replaced by the current dose of the patient, that is, "+pDosage+"mg. You can select other dose combinations if you would like to revise this week’s taper dose.";
                document.getElementById(tableIdName).rows[rowNum].cells[3].innerHTML = pDosage;
                errorAlert(msgHeader, msgBody);
                console.log("Your total selected drug combination for this week is lesser than the week below it.");
            }
             
        }
    }
    
}


function multiSelectClickEvent(){
    
    console.log("Assign button was clicked")
    var trRef=$(this).parent().parent(); //double parent() to get reference of TR, that holds the button in action
    var totalSelectedValue = 0;
    var drop = $(trRef).find('select');
    drop.find('option:selected').each(function() {
        totalSelectedValue += parseFloat(this.value);
    }); 

    
    console.log("Total: "+totalSelectedValue)
    // var roundedDose = $(trRef).find("td:eq(2)").text();
    // var recommendedDose = $(trRef).find("td:eq(4)").text();
    // console.log("Rounded Dose: "+roundedDose)
    // console.log("Recommended Dose: "+recommendedDose)
    // console.log("Index: "+rowIndex)
    // console.log("TableID: "+tableId)
    // $(trRef).find("td:eq(4)").html(totalSelectedValue)

    let rowIndex = $(trRef).index() + 1;
    var tableIdName = $(trRef).parent().parent().parent().find('table').attr('id');
    updateRecommendedValue(tableIdName, rowIndex, totalSelectedValue, drop);
        
}


function deselectMutiDropdown(selectList){
    $(selectList).find('option:checked').each(function() {
        $(this).prop('checked', false);
        $(this).prop("selected",false);
    }); 
}



function fillTableTest(){
    $("#taperTableTest").find("tbody").empty(); //clear all the content from tbody here.

    var med2 = "Zopiclone";
    let conceptId2 = 15;
    let floatDosage2 = 45;
    let intDuration2 = 180;
    
    let url = urlDomain + 'insomnia/v1/tapper/create';
    //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
    let authToken = window.localStorage.getItem("token");
    var tableBody = '#taperTBodyTest';

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': '*/*',
            'Authorization': 'Bearer '+ authToken
        },
        data: JSON.stringify({"regimenDTOList":
        [{
            "sleepMedication" : med2,
            "currentDose" : floatDosage2,
            "medicationDuration" : intDuration2,
            "conceptID" : conceptId2
        }]
    }),
        success: function(result){
            console.log(result);
            $(result.tapaschedules).each(function(i, taper){

                $(taper.weeklyDose).each(function(i, def){

                    window["td"+i+1]= document.createElement('td');
                    window["td"+i+1].style.border = '1px solid #dddddd';
                    window["td"+i+1].style.textAlign = 'center';
                    window["td"+i+1].style.padding = '8px';

                    window["td"+i+2] = document.createElement('td');
                    window["td"+i+2].style.border = '1px solid #dddddd';
                    window["td"+i+2].style.textAlign = 'center';
                    window["td"+i+2].style.padding = '8px';

                    window["td"+i+3] = document.createElement('td');
                    window["td"+i+3].style.border = '1px solid #dddddd';
                    window["td"+i+3].style.textAlign = 'left';
                    window["td"+i+3].style.padding = '8px';


                    window["td"+i+4] = document.createElement('td');
                    window["td"+i+4].style.border = '1px solid #dddddd';
                    window["td"+i+4].style.textAlign = 'center';
                    window["td"+i+4].style.padding = '8px';

                    var selectList = document.createElement("select");
                    selectList.style.width = '150px';

                    $(def.dose_Combination).each(function(i, drop){
                        var option = document.createElement("option");
                        option.value = drop;
                        option.text = drop;
                        selectList.appendChild(option);
                    })

                    selectList.classList.add("medSelect");
                    selectList.multiple = true;
                    selectList.name = tableBody+i+3;

                    const btnAssign = document.createElement("button");
                    btnAssign.innerHTML = "Assign Dose";
                    btnAssign.classList.add("btn-primary");
                    btnAssign.classList.add("aprv");


                    window["td"+i+5] = document.createElement('td');
                    window["td"+i+5].style.border = '1px solid #dddddd';
                    window["td"+i+5].style.textAlign = 'center';
                    window["td"+i+5].style.padding = '8px';

                    $(tableBody).append($("<tr>")
                    .append($(window["td"+i+1]).append(i + 1))
                    // .append($(window["td"+i+2]).append(def.unrounded))
                    .append($(window["td"+i+4]).append(def.newDose))
                    .append($(window["td"+i+3]).append(selectList).append(btnAssign))
                    .append($(window["td"+i+5]).append("")));


                    deselectMutiDropdown(selectList);
                    window["td"+i+3].style.display = "flex";
                    selectList.style.margin = "auto";

                    selectList.style.flex = "1";
                    btnAssign.style.flex = "1";
                    btnAssign.style.marginTop = "0px";
                    btnAssign.style.marginLeft = "5px";

                    btnAssign.addEventListener('click', multiSelectClickEvent);

                    $(selectList).on('change', multiSelectClickEvent);

                });

            });

            sampleUpdateAColumn("#taperTableTest tbody tr", "taperTableTest");

            $('.medSelect').multiSelect(); //Calling the multi-select class plugin here
        }, 
        error: function(msg){
            //$("#errorContainer3").html("Unable to reset Taper Schedule generated for the medication");
            var content = "<span style='font-weight: bold'>Unable to reset Taper Schedule generated for the medication.</span> <span>Please try again shortly.</span>";
            swal({title: "", text: content, html: true});
            //sweetAlert("Unable to reset Taper Schedule generated for the medication.","Please try again shortly.","error");
        }
    }); 

}


$(document).ready(function () {

    //sampleUpdateAColumn("#sampTB tbody tr", "sampTB");
    //fillTableTest()

    var btT1 = document.getElementById('btnTrial1');
    btT1.disabled = true;
    
    // validateAge();
    // validateAge2();

    $('#patFName, #patLName, #patAge').keyup(fillAllFields);

    var btT2 = document.getElementById('btnTrial2');
    btT2.disabled = true;
    $('#pat2FName, #pat2LName, #pat2Age').keyup(fillAllFields2);

    var btMed = document.getElementById('btnMedication');
    btMed.disabled = true;
    $('#idMedications1, #dosage').keyup(fillBasicMedicationFields);

    $('#patEmail').keyup(checkEmailValidity);

    $('#pat2Email').keyup(checkEmailValidity2);

    //Calculate Multi-select values
    // $('.aprv').on('click', function(event){
    //     event.preventDefault();
    //     console.log("Assign button was clicked")
    //     var trRef=$(this).parent().parent(); //double parent() to get reference of TR, that holds the button in action
    //     var totalSelectedValue = 0;
    //     var drop = $(trRef).find('select');
    //     drop.find('option:selected').each(function() {
    //         totalSelectedValue += parseFloat(this.value);
    //     }); 
    //     console.log("Total: "+totalSelectedValue)
    //     // var roundedDose = $(trRef).find("td:eq(2)").text();
    //     // var recommendedDose = $(trRef).find("td:eq(4)").text();
    //     // console.log("Rounded Dose: "+roundedDose)
    //     // console.log("Recommended Dose: "+recommendedDose)
    //     // console.log("Index: "+rowIndex)
    //     // console.log("TableID: "+tableId)
    //     // $(trRef).find("td:eq(4)").html(totalSelectedValue)

    //     let rowIndex = $(trRef).index() + 1;
    //     var tableIdName = $(trRef).parent().parent().parent().find('table').attr('id');
    //     updateRecommendedValue(tableIdName, rowIndex, totalSelectedValue);
        
    // });


    var oneMedicationReturned = false;
    let authTokenPatient = '';
    var doCombi = [];

    $(window).focus(function () {
        //do something
        let authToken = window.localStorage.getItem("token");
        authTokenPatient = window.localStorage.getItem("patientToken");
        console.log("You are in this tab and the token is: "+authToken);
        if(authToken == null){
            urlDomain = 'https://apiv3.healthensuite.com/';
            // urlDomain = 'https://api.healthensuite.com/';
            window.localStorage.setItem("urlDomain", urlDomain);
            $('#loginModal').modal('show');
        }
    });

    //Quick Provider Login
    $('#btnQuickLogin').on('click', function(event){
        event.preventDefault();
        window.localStorage.clear();
        var username = document.getElementById('quickUsername').value;
        var password = document.getElementById('quickPass').value;
        let url = urlDomain + 'insomnia/v1/authentication/login';

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
                    window.localStorage.setItem("token", result.token);
                    window.localStorage.setItem("patientToken", authTokenPatient);
                    $('#loginModal').modal('hide');
                }, 
                error: function(msg){
                    //$("#errorContainer").html("Incorrect Username or Password");
                    var content = "<span style='font-weight: bold'>Access denied.</span> <span>Please confirm your login credentials and your internet connectivity to proceed.</span>";
                    swal({title: "", text: content, html: true});
                    //sweetAlert("Incorrect username or password!","Please confirm your login credentials and try again.","error");
                }
            });
        }else{
            // sweetAlert("Attention","Please fill the fields properly and login");
            var content = "<span>Please confirm your login information to proceed.</span>";
            swal({title: "", text: content, html: true});
        }
        
    });//end of quick login
    
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
        var dup = document.getElementById("duplicateScreen");
        //alert(gender);
        let url = urlDomain + 'insomnia/v1/patient/randomization';  

        //window.localStorage.setItem("token", "7BCcz0Duefx7ioF/20us6aKso5voeaPBgn0L+siY+lM=");
        //let authToken = window.localStorage.getItem("token");
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
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
                swal({title: "Patient Randomized Successfully.", text: "Click Ok to view details.", type: "success"},
                function(){ 
                    //window.location.href = "provider-dashboard.html";
                    y.style.display = 'block';         
                    dup.style.display = 'none';
                    }
                );
                
            }, 
            error: function(msg){
                $("#errorDuplicateContainer").html("Unable to submit patient's record");
                var content = "<span style='font-weight: bold'>Unable to submit patient's record.</span> <span>Please try again shortly.</span>";
                swal({title: "", text: content, html: true});
                //sweetAlert("Unable to submit patient's record.","Please try again shortly.","error");
            }
        });
    });

    //Trial 1
    $('#btnTrial1').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("patFName").value;
        var lastName = document.getElementById("patLName").value;
        var age = document.getElementById("patAge").value;
        age = parseInt(age)
        var email = document.getElementById("patEmail").value;
        if(email == ''){
            email = null;
        }
        //var email = '';
        var gender= getTrial1Gender("optradio5");

        var x = document.getElementById("screen1");
        var y = document.getElementById("printSample");
        //var z = document.getElementById('trial1Demo');
        var z = document.getElementById('screen1');
        //var z = document.getElementById("elligHead");
        var dup = document.getElementById("duplicateScreen");
        //alert(gender);
        let url = urlDomain + 'insomnia/v1/patient/create';  

        //window.localStorage.setItem("token", "7BCcz0Duefx7ioF/20us6aKso5voeaPBgn0L+siY+lM=");
        let authToken = window.localStorage.getItem("token");

        //Confirm patient entries before submission

        swal({
            title: "Attention",
            text: "Kindly verify the Patient demographics you entered. Once confirmed, Patient demographics cannot be revised unless you create a new Patient profile.",
            showCancelButton: true,
            confirmButtonColor: "#2087c8",
            confirmButtonText: "Yes, submit my entries.",
            cancelButtonColor: "#01AA73",
            cancelButtonText: "No, let me review my entries.",
            closeOnConfirm: false,
            closeOnCancel: false
            },
            function(isConfirm){
            if (isConfirm) {
                swal.close()
                
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                      },
                    data: JSON.stringify({"firstName": firstName, "lastName": lastName, "age": age, "gender": gender,
                    "trialType" : 1, "verify": true }),
                    success: function(result){
        
                        console.log(result);
        
                        duplicateValue = result.identicalProfiles;
                        
                        if(!(duplicateValue == null)){
                            var a = document.createElement('a');
                            var formattedDate = '';
                            $("#dupTable1").find("tbody").empty(); //clear all the content from tbody here.
                            $.each(result.identicalProfiles, function(i, def) {
                                formattedDate = def.patientReferralEntity.date_Created
                                formattedDate = formattedDate.split("T", 1)
                                $("#duplicateTBody").append($("<tr>").attr({"id":i+ 1})
                                    .append($("<td>").append(def.id))
                                    .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.firstName + "'/>"))
                                    .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.lastName + "'/>"))
                                    .append($("<td>").append(def.age))
                                    .append($("<td>").append(def.gender))
                                    .append($("<td>").append(formattedDate))
                                    .append($("<td>").append(def.tapperStartDate)))
                            });
        
                            dup.style.display = 'block';         
                            z.style.display = 'none';
                            //z.style.display = 'none';
                        }
                        else{
                            document.getElementById('refCode').innerHTML = result.referalCode;
                            var patIDVar = result.referalCode;
                            window.localStorage.setItem("patientID", patIDVar.split("-",1));
                            window.localStorage.setItem("patientName", firstName+" "+lastName);
                            // document.getElementById('usName').innerHTML = result.userName;
                            // document.getElementById('ps').innerHTML= result.password;
                            var content = "<span style='font-weight: bold'>Patient has been recommended to Health enSuite Insomnia study successfully.</span> <span>Click OK to view/print the referral code.</span>";
                            swal({title: "", text: content, html: true, type: "success"},
                            function(){ 
                                //window.location.href = "provider-dashboard.html";
                                y.style.display = 'block';         
                                x.style.display = 'none';
                                //z.style.display = 'none';
                            }
                            );
                        }
                        
                    }, 
                    error: function(msg){
                        $("#errorContainer").html("Unable to submit patient's record");
                        var content = "<span style='font-weight: bold'>Unable to submit patient's record.</span> <span>Please try again shortly.</span>";
                        swal({title: "", text: content, html: true});
                        //sweetAlert("Unable to submit patient's record","Please try again shortly","error");
                    }
                });

            } else {
                swal.close()
            }
        });

        //end of entry confirmation
    });


    //Trial 1 Duplicate
    $('#btnIgnoreDuplicate').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("patFName").value;
        var lastName = document.getElementById("patLName").value;
        var age = document.getElementById("patAge").value;
        age = parseInt(age)
        var email = document.getElementById("patEmail").value;
        if(email == ''){
            email = null;
        }
        //var email = '';
        var gender= getTrial1Gender("optradio5");

        var y = document.getElementById("printSample");
        var x = document.getElementById("screen1");

        var dup = document.getElementById("duplicateScreen");
        //alert(gender);
        let url = urlDomain + 'insomnia/v1/patient/create';  

        //window.localStorage.setItem("token", "7BCcz0Duefx7ioF/20us6aKso5voeaPBgn0L+siY+lM=");
        let authToken = window.localStorage.getItem("token");

        //confirm patient entries

        swal({
            title: "Attention",
             text: "Kindly verify the existing Patient profiles that match your Patient profile. Once confirmed, Patient demographics cannot be revised unless you create a new Patient profile.",
            // type: "info",
            showCancelButton: true,
            confirmButtonColor: "#2087c8",
            confirmButtonText: "Yes, reassign the patient.",
            cancelButtonColor: "#01AA73",
            cancelButtonText: "No, let me review the duration(s).",
            closeOnConfirm: false,
            closeOnCancel: false
            },
            function(isConfirm){
            if (isConfirm) {
                swal.close()
                
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                      },
                    data: JSON.stringify({"firstName": firstName, "lastName": lastName, "age": age, "gender": gender,
                    "trialType" : 1, "verify": false }),
                    success: function(result){
        
                        console.log(result);
                        
                        document.getElementById('refCode').innerHTML = result.referalCode;
                        var patIDVar = result.referalCode;
                        window.localStorage.setItem("patientID", patIDVar.split("-",1));
                        window.localStorage.setItem("patientName", firstName+" "+lastName);
                        // document.getElementById('usName').innerHTML = result.userName;
                        // document.getElementById('ps').innerHTML= result.password;
                        var content = "<span style='font-weight: bold'>Patient has been recommended to Health enSuite Insomnia study successfully.</span> <span>Click OK to view/print the referral code.</span>";
                        swal({title: "", text: content, html: true, type: "success"},
                        function(){ 
                            //window.location.href = "provider-dashboard.html";
                            y.style.display = 'block';         
                            dup.style.display = 'none';
                            x.style.display = 'none';
                            }
                        );
                        
                    }, 
                    error: function(msg){
                        $("#errorDuplicateContainer").html("Unable to submit patient's record");
                        var content = "<span style='font-weight: bold'>Unable to submit patient's record.</span> <span>Please try again shortly.</span>";
                        swal({title: "", text: content, html: true});
                        //sweetAlert("Unable to submit patient's record","Please try again shortly","error");
                    }
                });

            } else {
                swal.close();
                goBack('duplicateScreen','screen1');
                //goBack('duplicateScreen','trial1Demo');
            }
        });

        //end of confirm entries
    });


    //Trial 2
    $('#btnTrial2').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("pat2FName").value;
        var lastName = document.getElementById("pat2LName").value;
        var age = document.getElementById("pat2Age").value;
        age = parseInt(age)
        var email = document.getElementById("pat2Email").value;
        if(email == ''){
            email = null;
        }
        //var email = '';
        var gender= getTrial1Gender("optradio21");
        let url = urlDomain + 'insomnia/v1/patient/create';
        let authToken = window.localStorage.getItem("token");
        var x = document.getElementById('screen1');
        var y = document.getElementById('screen2');
        //var z = document.getElementById('trial2Demo');
        var z = document.getElementById('screen1');
        var dup = document.getElementById("duplicateScreen2");

        //Confirm patient entries before submission

        swal({
            title: "Attention",
             text: "Kindly verify the Patient demographics you entered. Once confirmed, Patient demographics cannot be revised unless you create a new Patient profile.",
            // type: "info",
            showCancelButton: true,
            confirmButtonColor: "#2087c8",
            confirmButtonText: "Yes, submit my entries.",
            cancelButtonColor: "#01AA73",
            cancelButtonText: "No, let me review my entries.",
            closeOnConfirm: false,
            closeOnCancel: false
            },
            function(isConfirm){
            if (isConfirm) {
                swal.close();

                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                      },
                    data: JSON.stringify({"age": age, "firstName": firstName, "gender": gender, "lastName": lastName,
                    "trialType" : 2, "verify": true }),
                    success: function(result){
                        console.log(result);
                        duplicateValue = result.identicalProfiles;
                        
                        if(!(duplicateValue == null)){
                            var formattedDate = '';
                            $("#dupTable2").find("tbody").empty(); //clear all the content from tbody here.
                            $.each(result.identicalProfiles, function(i, def) {
                                formattedDate = def.patientReferralEntity.date_Created
                                formattedDate = formattedDate.split("T", 1)
                                $("#duplicate2TBody").append($("<tr>").attr({"id":i+ 1})
                                    .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.firstName + "'/>"))
                                    .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.lastName + "'/>"))
                                    .append($("<td>").append(def.age))
                                    .append($("<td>").append(def.gender))
                                    .append($("<td>").append(formattedDate))
                                    .append($("<td>").append(def.tapperStartDate)))
                            });
                            dup.style.display = 'block';         
                            z.style.display = 'none';
                        }else{
                            window.localStorage.setItem("patientName", firstName+" "+lastName);
                            window.localStorage.setItem("patientFName", firstName);
                            window.localStorage.setItem("trial2RefCode", result.referalCode);
                            document.getElementById('refCode1').innerHTML = result.referalCode;
                            var patIDVar = result.referalCode;
                            window.localStorage.setItem("patientID", patIDVar.split("-",1));
                            //document.getElementById('usName1').innerHTML = result.userName;
                            //document.getElementById('ps1').innerHTML= result.password;
                            document.getElementById('refCode2').innerHTML = result.referalCode;
                            // document.getElementById('usName2').innerHTML = result.userName;
                            // document.getElementById('ps2').innerHTML= result.password;
                            y.style.display = 'block';         
                            x.style.display = 'none';
                        }
                    }, 
                    error: function(msg){
                        $("#errorContainer2").html("Unable to submit patient's record");
                        var content = "<span style='font-weight: bold'>Unable to submit patient's record.</span> <span>Please try again shortly.</span>";
                        swal({title: "", text: content, html: true});
                        //sweetAlert("Unable to submit patient's record","Please try again shortly","error");
                    }
                });
                
                // close swal function after now
            } else {
                swal.close()
            }
        });
        //end of confirm Input
    });


    //Trial 2 Duplicate
    $('#btnIgnoreDuplicate2').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("pat2FName").value;
        var lastName = document.getElementById("pat2LName").value;
        var age = document.getElementById("pat2Age").value;
        age = parseInt(age)
        var email = document.getElementById("pat2Email").value;
        if(email == ''){
            email = null;
        }
        //var email = '';
        var gender= getTrial1Gender("optradio21");
        let url = urlDomain + 'insomnia/v1/patient/create';
        let authToken = window.localStorage.getItem("token");
        var x = document.getElementById('screen1');
        var y = document.getElementById('screen2');
        var dup = document.getElementById("duplicateScreen2");

        // Confirm patient entries

        swal({
            title: "Attention",
             text: "Kindly verify the existing Patient profiles that match your Patient profile. Once confirmed, Patient demographics cannot be revised unless you create a new Patient profile.",
            // type: "info",
            showCancelButton: true,
            confirmButtonColor: "#2087c8",
            confirmButtonText: "Yes, submit my entries.",
            cancelButtonColor: "#01AA73",
            cancelButtonText: "No, let me review my entries.",
            closeOnConfirm: false,
            closeOnCancel: false
            },
            function(isConfirm){
            if (isConfirm) {
                swal.close()
                
                $.ajax({
                    url: url,
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                      },
                    data: JSON.stringify({"age": age, "firstName": firstName, "gender": gender, "lastName": lastName,
                    "trialType" : 2, "verify": false }),
                    success: function(result){
                        console.log(result);
                        window.localStorage.setItem("patientName", firstName+" "+lastName);
                            window.localStorage.setItem("patientFName", firstName);
                            window.localStorage.setItem("trial2RefCode", result.referalCode);
                            document.getElementById('refCode1').innerHTML = result.referalCode;
                            var patIDVar = result.referalCode;
                            window.localStorage.setItem("patientID", patIDVar.split("-",1));
                            //document.getElementById('usName1').innerHTML = result.userName;
                            //document.getElementById('ps1').innerHTML= result.password;
                            document.getElementById('refCode2').innerHTML = result.referalCode;
                            // document.getElementById('usName2').innerHTML = result.userName;
                            // document.getElementById('ps2').innerHTML= result.password;
                        y.style.display = 'block';  
                        x.style.display = 'none';       
                        dup.style.display = 'none';
                        
                    }, 
                    error: function(msg){
                        $("#errorDuplicateContainer2").html("Unable to submit patient's record");
                        var content = "<span style='font-weight: bold'>Unable to submit patient's record.</span> <span>Please try again shortly.</span>";
                        swal({title: "", text: content, html: true});
                        //sweetAlert("Unable to submit patient's record","Please try again shortly","error");
                    }
                });

            } else {
                swal.close();
                goBack('duplicateScreen2','screen1');
                //goBack('duplicateScreen2','trial2Demo');
            }
        });

        //end of confirm Input

    });


    //Move patient to tial 1
    function revertToTrialOne(){
        let url = urlDomain + 'insomnia/v1/patient/updatetrial';
        let authToken = window.localStorage.getItem("token");
        let patRefCode = window.localStorage.getItem("trial2RefCode");
        var x = document.getElementById('screen3');
        var y = document.getElementById("printSample");
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
              },
            data: JSON.stringify({"code" :  patRefCode}),
            success: function(result){
                console.log(result);
                document.getElementById('refCode').innerHTML = patRefCode;
                swal({title: "Patient moved to Health enSuite Insomnia Study.", text: "", type: "success"},
                function(){ 
                    y.style.display = 'block';         
                    x.style.display = 'none';
                    }
                );
                
                
            }, 
            error: function(msg){
                $("#errorContainer3").html("Attempt made to move patient to Trial 1 failed.");
                var content = "<span style='font-weight: bold'>Attempt made to move patient to Trial 1 failed.</span> <span>Please try again shortly.</span>";
                swal({title: "", text: content, html: true});
                //sweetAlert("Attempt made to move patient to Trial 1 failed.","Please try again shortly","error");
            }
        });
    }


    // $("#patNametxt1").on('click', 'a', function(event) {
    //     event.preventDefault();
    //     alert("Patient ID: ");
    //     //getPatDetatail();
    // });


    

    //Tapering Generation
    $('#btnMedication').on('click', function(event){
        event.preventDefault();

        $("#taperTable").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable1Print").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable2Print").find("tbody").empty(); //clear all the content from tbody here.
        $("#taperTable3Print").find("tbody").empty(); //clear all the content from tbody here.

        document.getElementById("tpLength").value = "";
        document.getElementById("tpLength2").value = "";

        var med1 = document.getElementById("idMedications1").value;
        window.localStorage.setItem("med1Store", med1);
        var dosage = document.getElementById("dosage").value;
        var duration = document.getElementById("inputDuration").value;
        var med2 = document.getElementById("idMedications2").value;
        window.localStorage.setItem("med2Store", med2);
        var dosage2 = document.getElementById("dosage2").value;
        var duration2 = document.getElementById("inputDuration2").value;
        let conceptId1 = getConceptID(med1);
        window.localStorage.setItem("conceptId1Store", conceptId1);

        
        
            let url = urlDomain + 'insomnia/v1/tapper/create';
            //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
            let authToken = window.localStorage.getItem("token");
            //alert(authToken);
            var x = document.getElementById('screen3');
            var y = document.getElementById('screen4');
            var tableBody = '#taperTBody';
            var secondTB = document.getElementById('accordion-two');
            var captionName = 'drugNm';
            let floatDosage = parseFloat(dosage);
            window.localStorage.setItem("dosageStore", floatDosage);
            let intDuration = parseInt(duration);
            window.localStorage.setItem("durationStore", intDuration);
            //let weekNo1 = 0;
            //let weekNo2 = 0;

            if(med2 != ''){
                if(duration != 10 && duration2 != 10){
                    var tableBodyPrint = '#taperTBody2Print';
                    var captionNamePrint = 'drugNmP1';
                    let conceptId2 = getConceptID(med2);
                    window.localStorage.setItem("conceptId2Store", conceptId2);
                    let floatDosage2 = parseFloat(dosage2);
                    window.localStorage.setItem("dosage2Store", floatDosage2);
                    let intDuration2 = parseInt(duration2);
                    window.localStorage.setItem("duration2Store", intDuration2);
                    //var secondTB = document.getElementById('secondTB');
                    //var tableBody = '#taperTBody';
                    //var tableBodyPrint = '#taperTBody2Print';
                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        headers: {
                            'Content-Type': 'application/json', 
                            'Accept': '*/*',
                            'Authorization': 'Bearer '+ authToken
                        },
                        data: JSON.stringify({"regimenDTOList":
                        [{
                        "sleepMedication" : med1,
                        "currentDose" : floatDosage,
                        "medicationDuration" : intDuration,
                        "conceptID" : conceptId1
                        },
                        {
                        "sleepMedication" : med2,
                        "currentDose" : floatDosage2,
                        "medicationDuration" : intDuration2,
                        "conceptID" : conceptId2
                        }]
                        
                    }),
                        success: function(result){
                            console.log(result);
                            
                            $(result.tapaschedules).each(function(i, taper){
                                document.getElementById(captionName).innerHTML  = taper.drugName;
                                document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                                window.localStorage.setItem("taperLength", taper.taperLength);
                                if(i > 0){
                                    window.localStorage.setItem("taperLength2", taper.taperLength);
                                }
                                //alert(taper.drugName);

                                $(taper.weeklyDose).each(function(i, def){

                                    window["td"+i+1]= document.createElement('td');
                                    window["td"+i+1].style.border = '1px solid #dddddd';
                                    window["td"+i+1].style.textAlign = 'center';
                                    window["td"+i+1].style.padding = '8px';

                                    window["td"+i+2] = document.createElement('td');
                                    window["td"+i+2].style.border = '1px solid #dddddd';
                                    window["td"+i+2].style.textAlign = 'center';
                                    window["td"+i+2].style.padding = '8px';

                                    window["td"+i+3] = document.createElement('td');
                                    window["td"+i+3].style.border = '1px solid #dddddd';
                                    window["td"+i+3].style.textAlign = 'left';
                                    window["td"+i+3].style.padding = '8px';
                                    window["td"+i+3].style.display = 'flex';

                                    window["td"+i+4] = document.createElement('td');
                                    window["td"+i+4].style.border = '1px solid #dddddd';
                                    window["td"+i+4].style.textAlign = 'center';
                                    window["td"+i+4].style.padding = '8px';

                                    const selectList = document.createElement("select");
                                    selectList.style.width = '180px';

                                    // const option = document.createElement("option");
                                    // option.value = 0;
                                    // option.text = "--Select--";
                                    // option.selected = false;
                                    // selectList.appendChild(option);

                                    const btnAssign = document.createElement("button");
                                    btnAssign.innerHTML = "Assign Dose";
                                    btnAssign.classList.add("btn-primary");
                                    btnAssign.classList.add("aprv");
                                    
                                    
                                    doCombi = def.dose_Combination;
                                    //doCombi.reverse();
                                    $(doCombi).each(function(i, drop){
                                        const option = document.createElement("option");
                                        option.value = drop;
                                        option.text = drop;
                                        option.selected = false;
                                        selectList.appendChild(option);
                                    })

                                    selectList.classList.add("medSelect");
                                    selectList.multiple = true;
                                    selectList.name = tableBody+i+3;
                                    
                                    
                                    window["td"+i+5] = document.createElement('td');
                                    window["td"+i+5].style.border = '1px solid #dddddd';
                                    window["td"+i+5].style.textAlign = 'center';
                                    window["td"+i+5].style.padding = '8px';
                                    

                                    $(tableBody).append($("<tr>")
                                    .append($(window["td"+i+1]).append(i + 1))
                                    // .append($(window["td"+i+2]).append(def.unrounded))
                                    .append($(window["td"+i+4]).append(def.newDose))
                                    .append($(window["td"+i+3]).append(selectList).append(btnAssign))
                                    .append($(window["td"+i+5]).append("")));

                                    selectList.style.flex = "1";
                                    btnAssign.style.flex = "1";
                                    btnAssign.style.marginTop = "0px";
                                    btnAssign.style.marginLeft = "5px";

                                    deselectMutiDropdown(selectList);
                                    btnAssign.addEventListener('click', multiSelectClickEvent);

                                    $(selectList).on('change', multiSelectClickEvent);


                                    window["tdp2"+i+1] = document.createElement('td');
                                    window["tdp2"+i+1].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+1].style.textAlign = 'center';
                                    window["tdp2"+i+1].style.padding = '8px';

                                    window["tdp2"+i+2] = document.createElement('td');
                                    window["tdp2"+i+2].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+2].style.textAlign = 'center';
                                    window["tdp2"+i+2].style.padding = '8px';

                                    window["tdp2"+i+4] = document.createElement('td');
                                    window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+4].style.textAlign = 'center';
                                    window["tdp2"+i+4].style.padding = '8px';

                                    window["tdp2"+i+3] = document.createElement('td');
                                    window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+3].style.textAlign = 'center';
                                    window["tdp2"+i+3].style.padding = '8px';

                                    const selectListPrint = document.createElement("select");
                                    selectListPrint.style.width = '150px';
                                    doCombi = def.dose_Combination;
                                    //doCombi.reverse();
                                    $(doCombi).each(function(i, dropPrint){
                                        const optionPrint = document.createElement("option");
                                        optionPrint.value = dropPrint;
                                        optionPrint.text = dropPrint;
                                        selectListPrint.appendChild(optionPrint);
                                    })

                                    $(tableBodyPrint).append($("<tr>")
                                    .append($(window["tdp2"+i+1]).append(i + 1))
                                    // .append($(window["tdp2"+i+2]).append(def.unrounded))
                                    .append($(window["tdp2"+i+4]).append(def.newDose))
                                    .append($(window["tdp2"+i+3]).append(selectListPrint)));
                                       

                                });
                                tableBody = '#taperTBody2';
                                tableBodyPrint ='#taperTable3Print';
                                captionName = 'drugNm2';
                                captionNamePrint = 'drugNmP2';
                            });
                            var weekNo1 = $('#taperTBody tr').length;
                            var weekNo2 = $('#taperTBody2 tr').length;
                            window.localStorage.setItem("weekNo1", weekNo1);
                            window.localStorage.setItem("weekNo2", weekNo2);

                            sampleUpdateAColumn("#taperTable tbody tr", "taperTable");
                            sampleUpdateAColumn("#taperTable2 tbody tr", "taperTable2");
                            //addAction('#taperTable tbody tr', 'taperTable');
                            //addAction('#taperTable2 tbody tr', 'taperTable2');

                            y.style.display = 'block';         
                            x.style.display = 'none';
                            secondTB.style.display = 'block';
                            window.localStorage.setItem("medQuantity", 2);

                            $('.medSelect').multiSelect(); //Calling the multi-select class plugin here
                        }, 
                        error: function(msg){
                            $("#errorContainer3").html("Unable to generate Taper Schedule for the two medications");
                            var content = "<span style='font-weight: bold'>Unable to generate Taper Schedule for the two medications.</span> <span>Please try again shortly.</span>";
                            swal({title: "", text: content, html: true});
                            //sweetAlert("Unable to generate Taper Schedule for the two medications","Please try again shortly","error");
                           console.log(JSON.stringify({"regimenDTOList":
                           [{
                           "sleepMedication" : med1,
                           "currentDose" : floatDosage,
                           "medicationDuration" : intDuration,
                           "conceptID" : conceptId1
                           },
                           {
                           "sleepMedication" : med2,
                           "currentDose" : floatDosage2,
                           "medicationDuration" : intDuration2,
                           "conceptID" : conceptId2
                           }]
                           
                       }));
                            // document.getElementById('drugNm').innerHTML  = 'Chlordiazepoxide';
                            // $(tableBody).append($("<tr>")
                            // .append($("<td>").append(1))
                            // .append($("<td>").append("5 X 1"))
                            // .append($("<td>").append("")));

                            // document.getElementById('drugNm2').innerHTML  = 'Lorazepam';
                            // tableBody = '#taperTBody2';
                            // $(tableBody).append($("<tr>")
                            // .append($("<td>").append(1))
                            // .append($("<td>").append("5 X 1"))
                            // .append($("<td>").append("")));

                            // var td = document.createElement('td');
                            // td.style.border = '1px solid #dddddd';
                            // td.style.textAlign = 'left';
                            // td.style.padding = '8px';
                            // var td2 = document.createElement('td');
                            // td2.style.border = '1px solid #dddddd';
                            // td2.style.textAlign = 'left';
                            // td2.style.padding = '8px';
                            // var td6 = document.createElement('td');
                            // td6.style.border = '1px solid #dddddd';
                            // td6.style.textAlign = 'left';
                            // td6.style.padding = '8px';

                            // var tdp = document.createElement('td');
                            // tdp.style.border = '1px solid #dddddd';
                            // tdp.style.textAlign = 'left';
                            // tdp.style.padding = '8px';
                            // var tdp2 = document.createElement('td');
                            // tdp2.style.border = '1px solid #dddddd';
                            // tdp2.style.textAlign = 'left';
                            // tdp2.style.padding = '8px';
                            // var tdp6 = document.createElement('td');
                            // tdp6.style.border = '1px solid #dddddd';
                            // tdp6.style.textAlign = 'left';
                            // tdp6.style.padding = '8px';

                            // document.getElementById('drugNmP1').innerHTML  = 'Chlordiazepoxide';
                            // $(tableBodyPrint).append($("<tr>")
                            // .append($(td).append(1))
                            // .append($(td2).append("(3.75mg,5mg) X 0"))
                            // .append($(td6).append("")));

                            // document.getElementById('drugNmP2').innerHTML  = 'Lorazepam';
                            // tableBodyPrint = '#taperTBody3Print';
                            // $(tableBodyPrint).append($("<tr>")
                            // .append($(tdp).append(1))
                            // .append($(tdp2).append("5mg X 1"))
                            // .append($(tdp6).append("")));
                            
                        }
                    });
                }else if(duration == 10 && duration2 == 10){
                    swal({
                        title: "Attention",
                         text: 'Your patient is taking two medications for less than 14 days. Please select either of these options to proceed: \n\nSelect “No, let me review the duration(s).” if you would like to change the duration(s) and re-submit the form. In this case, your patient will be assigned to the Health enSuite Insomnia and deprescribing study. \n\nSelect “Yes, reassign to the Health enSuite Insomnia Study.” if the duration you have entered is correct, and your patient is willing to stop their medication(s) right away or before beginning the CBT program for insomnia. In this case, your patient will be assigned to the Health enSuite Insomnia study, which is offered for patients who are not taking sleep medications.',
                        // type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#2087c8",
                        confirmButtonText: "Yes, reassign to the Health enSuite Insomnia Study.",
                        cancelButtonColor: "#01AA73",
                        cancelButtonText: "No, let me review the duration(s).",
                        closeOnConfirm: false,
                        closeOnCancel: false
                        },
                        function(isConfirm){
                        if (isConfirm) {
                            swal.close()
                            revertToTrialOne();
                        } else {
                            swal.close()
                        }
                    });
                    
                }else if(duration == 10 || duration2 == 10){

                    swal({
                        title: "Attention",
                         text: 'Your patient is taking at least one medication for less than 14 days. Please select either of these options to proceed: \n\nSelect “No, let me review the duration(s).” if you would like to change the duration(s) and re-submit the form. In this case, your patient will be assigned to the Health enSuite Insomnia and deprescribing study. \n\nSelect “Yes, continue.” if the duration you have entered is correct, and your patient is willing to stop the medication(s) they are taking for less than 14 days right away.  In this case, your patient will be assigned to the Health enSuite Insomnia and deprescribing study.',
                        // type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#2087c8",
                        confirmButtonText: "Yes, continue.",
                        cancelButtonColor: "#01AA73",
                        cancelButtonText: "No, let me review the duration(s).",
                        closeOnConfirm: false,
                        closeOnCancel: false
                        },
                        function(isConfirm){
                        if (isConfirm) {
                            swal.close()
                            //execute and generate either of the medications

                            var tableBodyPrint = '#taperTBody1Print';
                            var captionNamePrint = 'drugNmP';
                            tbIdentity = '#taperTable tbody tr';
                            let myJson = {"regimenDTOList":[{
                                            "sleepMedication" : med1,
                                            "currentDose" : floatDosage,
                                            "medicationDuration" : intDuration,
                                            "conceptID" : conceptId1
                                            }]
                                        };
                            if(duration == 10){
                                let conceptId2 = getConceptID(med2);
                                window.localStorage.setItem("conceptId1Store", conceptId2);//this was swapped
                                let floatDosage2 = parseFloat(dosage2);
                                window.localStorage.setItem("dosageStore", floatDosage2);//this was swapped
                                let intDuration2 = parseInt(duration2);
                                window.localStorage.setItem("durationStore", intDuration2);//this was swapped
                                window.localStorage.setItem("med1Store", med2);//this was swapped

                                myJson = {"regimenDTOList":[{
                                            "sleepMedication" : med2,
                                            "currentDose" : floatDosage2,
                                            "medicationDuration" : intDuration2,
                                            "conceptID" : conceptId2
                                            }]
                                        };
                            }

                            $.ajax({
                                url: url,
                                type: 'POST',
                                dataType: 'json',
                                headers: {
                                    'Content-Type': 'application/json', 
                                    'Accept': '*/*',
                                    'Authorization': 'Bearer '+ authToken
                                },
                                data: JSON.stringify(myJson),
                                success: function(result){
                                    console.log(result);
                                    $(result.tapaschedules).each(function(i, taper){
                                        document.getElementById(captionName).innerHTML  = taper.drugName;
                                        document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                                        window.localStorage.setItem("taperLength", taper.taperLength);
                                        //alert(taper.drugName);

                                        $(taper.weeklyDose).each(function(i, def){

                                            window["td"+i+1]= document.createElement('td');
                                            window["td"+i+1].style.border = '1px solid #dddddd';
                                            window["td"+i+1].style.textAlign = 'center';
                                            window["td"+i+1].style.padding = '8px';

                                            window["td"+i+2] = document.createElement('td');
                                            window["td"+i+2].style.border = '1px solid #dddddd';
                                            window["td"+i+2].style.textAlign = 'center';
                                            window["td"+i+2].style.padding = '8px';

                                            window["td"+i+3] = document.createElement('td');
                                            window["td"+i+3].style.border = '1px solid #dddddd';
                                            window["td"+i+3].style.textAlign = 'left';
                                            window["td"+i+3].style.padding = '8px';
                                            window["td"+i+3].style.display = 'flex';

                                            window["td"+i+4] = document.createElement('td');
                                            window["td"+i+4].style.border = '1px solid #dddddd';
                                            window["td"+i+4].style.textAlign = 'center';
                                            window["td"+i+4].style.padding = '8px';

                                            const selectList = document.createElement("select");
                                            selectList.style.width = '150px';

                                            // const option = document.createElement("option");
                                            // option.value = 0;
                                            // option.text = "--Select--";
                                            // selectList.appendChild(option);

                                            doCombi = def.dose_Combination;
                                            //doCombi.reverse();
                                            $(doCombi).each(function(i, drop){
                                                const option = document.createElement("option");
                                                option.value = drop;
                                                option.text = drop;
                                                selectList.appendChild(option);
                                            })

                                            selectList.classList.add("medSelect");
                                            selectList.multiple = true;
                                            selectList.name = tableBody+i+3;

                                            window["td"+i+5] = document.createElement('td');
                                            window["td"+i+5].style.border = '1px solid #dddddd';
                                            window["td"+i+5].style.textAlign = 'center';
                                            window["td"+i+5].style.padding = '8px';

                                            const btnAssign = document.createElement("button");
                                            btnAssign.innerHTML = "Assign Dose";
                                            btnAssign.classList.add("btn-primary");
                                            btnAssign.classList.add("aprv");

                                            //selectList.onchange = function(){UpdateDropDownValues(tbIdentity)};

                                            $(tableBody).append($("<tr>")
                                            .append($(window["td"+i+1]).append(i + 1))
                                            // .append($(window["td"+i+2]).append(def.unrounded))
                                            .append($(window["td"+i+4]).append(def.newDose))
                                            .append($(window["td"+i+3]).append(selectList).append(btnAssign))
                                            .append($(window["td"+i+5]).append("")));

                                            selectList.style.flex = "1";
                                            btnAssign.style.flex = "1";
                                            btnAssign.style.marginTop = "0px";
                                            btnAssign.style.marginLeft = "5px";

                                            deselectMutiDropdown(selectList);
                                            btnAssign.addEventListener('click', multiSelectClickEvent);

                                            $(selectList).on('change', multiSelectClickEvent);


                                            window["tdp2"+i+1] = document.createElement('td');
                                            window["tdp2"+i+1].style.border = '1px solid #dddddd';
                                            window["tdp2"+i+1].style.textAlign = 'center';
                                            window["tdp2"+i+1].style.padding = '8px';

                                            window["tdp2"+i+2] = document.createElement('td');
                                            window["tdp2"+i+2].style.border = '1px solid #dddddd';
                                            window["tdp2"+i+2].style.textAlign = 'center';
                                            window["tdp2"+i+2].style.padding = '8px';

                                            window["tdp2"+i+3] = document.createElement('td');
                                            window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                            window["tdp2"+i+3].style.textAlign = 'center';
                                            window["tdp2"+i+3].style.padding = '8px';

                                            window["tdp2"+i+4] = document.createElement('td');
                                            window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                            window["tdp2"+i+4].style.textAlign = 'center';
                                            window["tdp2"+i+4].style.padding = '8px';

                                            const selectListPrint = document.createElement("select");
                                            selectListPrint.style.width = '150px';
                                            doCombi = def.dose_Combination;
                                            //doCombi.reverse();
                                            $(doCombi).each(function(i, dropPrint){
                                                const optionPrint = document.createElement("option");
                                                optionPrint.value = dropPrint;
                                                optionPrint.text = dropPrint;
                                                selectListPrint.appendChild(optionPrint);
                                            })
                                            

                                            $(tableBodyPrint).append($("<tr>")
                                            // .append($(window["tdp2"+i+1]).append(i + 1))
                                            .append($(window["tdp2"+i+2]).append(def.unrounded))
                                            .append($(window["tdp2"+i+4]).append(def.newDose))
                                            .append($(window["tdp2"+i+3]).append(selectListPrint)));
                                        });
                
                                    });

                                    sampleUpdateAColumn("#taperTable tbody tr", "taperTable");
                                    //addAction('#taperTable tbody tr', 'taperTable');
                                    var weekNo1 = $('#taperTBody tr').length;
                                    window.localStorage.setItem("weekNo1", weekNo1);
                                    y.style.display = 'block';         
                                    x.style.display = 'none';
                                    secondTB.style.display = 'none';
                                    window.localStorage.setItem("medQuantity", 1);

                                    $('.medSelect').multiSelect(); //Calling the multi-select class plugin here
                                }, 
                                error: function(msg){
                                    $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                                    var content = "<span style='font-weight: bold'>Unable to generate Taper Schedule for the medication.</span> <span>Please try again shortly.</span>";
                                    swal({title: "", text: content, html: true});
                                    //sweetAlert("Unable to generate Taper Schedule for the medication","Please try again shortly","error");
                                }
                            });
                            
                            oneMedicationReturned = true;

                        } else {
                            swal.close()
                        }
                    });//end of swal function to confirm from the provider before proceeding with one medication generation

                }//end of two medications generation
            }else{
                if(duration != 10){
                    var tableBodyPrint = '#taperTBody1Print';
                    var captionNamePrint = 'drugNmP';
                    tbIdentity = '#taperTable tbody tr';

                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        headers: {
                            'Content-Type': 'application/json', 
                            'Accept': '*/*',
                            'Authorization': 'Bearer '+ authToken
                        },
                        data: JSON.stringify({"regimenDTOList":
                        [{
                            "sleepMedication" : med1,
                            "currentDose" : floatDosage,
                            "medicationDuration" : intDuration,
                            "conceptID" : conceptId1
                        }]
                    }),
                        success: function(result){
                            console.log(result);
                            $(result.tapaschedules).each(function(i, taper){
                                document.getElementById(captionName).innerHTML  = taper.drugName;
                                document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                                window.localStorage.setItem("taperLength", taper.taperLength);
                                //alert(taper.drugName);

                                $(taper.weeklyDose).each(function(i, def){

                                    window["td"+i+1]= document.createElement('td');
                                    window["td"+i+1].style.border = '1px solid #dddddd';
                                    window["td"+i+1].style.textAlign = 'center';
                                    window["td"+i+1].style.padding = '8px';

                                    window["td"+i+2] = document.createElement('td');
                                    window["td"+i+2].style.border = '1px solid #dddddd';
                                    window["td"+i+2].style.textAlign = 'center';
                                    window["td"+i+2].style.padding = '8px';

                                    window["td"+i+3] = document.createElement('td');
                                    window["td"+i+3].style.border = '1px solid #dddddd';
                                    window["td"+i+3].style.textAlign = 'left';
                                    window["td"+i+3].style.padding = '8px';
                                    window["td"+i+3].style.display = 'flex';

                                    window["td"+i+4] = document.createElement('td');
                                    window["td"+i+4].style.border = '1px solid #dddddd';
                                    window["td"+i+4].style.textAlign = 'center';
                                    window["td"+i+4].style.padding = '8px';

                                    const selectList = document.createElement("select");
                                    selectList.style.width = '150px';

                                    // const option = document.createElement("option");
                                    // option.value = 0;
                                    // option.text = "--Select--";
                                    // selectList.appendChild(option);

                                    doCombi = def.dose_Combination;
                                    //doCombi.reverse();
                                    $(def.dose_Combination).each(function(i, drop){
                                        const option = document.createElement("option");
                                        option.value = drop;
                                        option.text = drop;
                                        selectList.appendChild(option);
                                    })

                                    selectList.classList.add("medSelect");
                                    selectList.multiple = true;
                                    selectList.name = tableBody+i+3;

                                    const btnAssign = document.createElement("button");
                                    btnAssign.innerHTML = "Assign Dose";
                                    btnAssign.classList.add("btn-primary");
                                    btnAssign.classList.add("aprv");

                                    window["td"+i+5] = document.createElement('td');
                                    window["td"+i+5].style.border = '1px solid #dddddd';
                                    window["td"+i+5].style.textAlign = 'center';
                                    window["td"+i+5].style.padding = '8px';

                                    //selectList.onchange = function(){UpdateDropDownValues(tbIdentity)};

                                    $(tableBody).append($("<tr>")
                                    .append($(window["td"+i+1]).append(i + 1))
                                    // .append($(window["td"+i+2]).append(def.unrounded))
                                    .append($(window["td"+i+4]).append(def.newDose))
                                    .append($(window["td"+i+3]).append(selectList).append(btnAssign))
                                    .append($(window["td"+i+5]).append("")));

                                    selectList.style.flex = "1";
                                    btnAssign.style.flex = "1";
                                    btnAssign.style.marginTop = "0px";
                                    btnAssign.style.marginLeft = "5px";

                                    deselectMutiDropdown(selectList);
                                    btnAssign.addEventListener('click', multiSelectClickEvent);

                                    $(selectList).on('change', multiSelectClickEvent);

                                    window["tdp2"+i+1] = document.createElement('td');
                                    window["tdp2"+i+1].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+1].style.textAlign = 'center';
                                    window["tdp2"+i+1].style.padding = '8px';

                                    window["tdp2"+i+2] = document.createElement('td');
                                    window["tdp2"+i+2].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+2].style.textAlign = 'center';
                                    window["tdp2"+i+2].style.padding = '8px';

                                    window["tdp2"+i+3] = document.createElement('td');
                                    window["tdp2"+i+3].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+3].style.textAlign = 'center';
                                    window["tdp2"+i+3].style.padding = '8px';

                                    window["tdp2"+i+4] = document.createElement('td');
                                    window["tdp2"+i+4].style.border = '1px solid #dddddd';
                                    window["tdp2"+i+4].style.textAlign = 'center';
                                    window["tdp2"+i+4].style.padding = '8px';

                                    const selectListPrint = document.createElement("select");
                                    selectListPrint.style.width = '150px';
                                    doCombi = def.dose_Combination;
                                    //doCombi.reverse();
                                    $(doCombi).each(function(i, dropPrint){
                                        const optionPrint = document.createElement("option");
                                        optionPrint.value = dropPrint;
                                        optionPrint.text = dropPrint;
                                        selectListPrint.appendChild(optionPrint);
                                    })
                                    

                                    $(tableBodyPrint).append($("<tr>")
                                    .append($(window["tdp2"+i+1]).append(i + 1))
                                    // .append($(window["tdp2"+i+2]).append(def.unrounded))
                                    .append($(window["tdp2"+i+4]).append(def.newDose))
                                    .append($(window["tdp2"+i+3]).append(selectListPrint)));
                                });
        
                            });

                            sampleUpdateAColumn("#taperTable tbody tr", "taperTable");
                            //addAction('#taperTable tbody tr', 'taperTable');
                            var weekNo1 = $('#taperTBody tr').length;
                            window.localStorage.setItem("weekNo1", weekNo1);
                            y.style.display = 'block';         
                            x.style.display = 'none';
                            secondTB.style.display = 'none';
                            window.localStorage.setItem("medQuantity", 1);

                            $('.medSelect').multiSelect(); //Calling the multi-select class plugin here
                        }, 
                        error: function(msg){
                            $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                            var content = "<span style='font-weight: bold'>Unable to generate Taper Schedule for the medication.</span> <span>Please try again shortly.</span>";
                            swal({title: "", text: content, html: true});
                            //sweetAlert("Unable to generate Taper Schedule for the medication","Please try again shortly","error");
                        }
                    });
                }else{
                    swal({
                        title: "Attention",
                         text: 'Your patient is taking one medication for less than 14 days. Please select either of these options to proceed: \n\nSelect “No, let me review the duration.” if you would like to change the duration and re-submit the form. In this case, your patient will be assigned to the Health enSuite Insomnia and deprescribing study. \n\nSelect “Yes, reassign to the Health enSuite Insomnia Study.” if the duration you have entered is correct, and your patient is willing to stop their medication right away or before beginning the CBT program for insomnia. In this case, your patient will be assigned to the Health enSuite Insomnia study, which is offered for patients who are not taking sleep medications.',
                        // type: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#2087c8",
                        confirmButtonText: "Yes, reassign to the Health enSuite Insomnia Study.",
                        cancelButtonColor: "#01AA73",
                        cancelButtonText: "No, let me review the duration.",
                        closeOnConfirm: false,
                        closeOnCancel: false
                        },
                        function(isConfirm){
                        if (isConfirm) {
                            swal.close()
                            revertToTrialOne();
                        } else {
                            swal.close()
                        }
                    });
                }  

            }
    });


    //Reset Tapering Generation Med 1
    $('#btnReset').on('click', function(event){
        event.preventDefault();

        document.getElementById("tpLength").value = "";

        var medQT = window.localStorage.getItem("medQuantity");
        var tableBodyPrint = ''; var captionNamePrint = '';
        $("#taperTable").find("tbody").empty(); //clear all the content from tbody here.
        //$("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.
        if(medQT == 1){
            $("#taperTable1Print").find("tbody").empty();
            tableBodyPrint = '#taperTable1Print';
            captionNamePrint = 'drugNmP';
        }
        if(medQT == 2){
            $("#taperTable2Print").find("tbody").empty();
            tableBodyPrint = '#taperTable2Print';
            captionNamePrint = 'drugNmP1';
        }

        //$("#taperTable3Print").find("tbody").empty(); //clear all the content from tbody here.

        var med1 = window.localStorage.getItem("med1Store");

        let conceptId1 = window.localStorage.getItem("conceptId1Store");
        
        let url = urlDomain + 'insomnia/v1/tapper/create';
        //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
        let authToken = window.localStorage.getItem("token");
        //alert(authToken);
        var x = document.getElementById('screen3');
        var y = document.getElementById('screen4');
        var tableBody = '#taperTBody';
        //var secondTB = document.getElementById('secondTB');
        var captionName = 'drugNm';
        let floatDosage = window.localStorage.getItem("dosageStore");
        let intDuration = window.localStorage.getItem("durationStore");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({"regimenDTOList":
            [{
                "sleepMedication" : med1,
                "currentDose" : floatDosage,
                "medicationDuration" : intDuration,
                "conceptID" : conceptId1
            }]
        }),
            success: function(result){
                console.log(result);
                $(result.tapaschedules).each(function(i, taper){
                    document.getElementById(captionName).innerHTML  = taper.drugName;
                    document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                    //window.localStorage.setItem("taperLength1", originalTpLenth);
                    //alert(taper.drugName);

                    $(taper.weeklyDose).each(function(i, def){

                        window["td"+i+1]= document.createElement('td');
                        window["td"+i+1].style.border = '1px solid #dddddd';
                        window["td"+i+1].style.textAlign = 'center';
                        window["td"+i+1].style.padding = '8px';

                        window["td"+i+2] = document.createElement('td');
                        window["td"+i+2].style.border = '1px solid #dddddd';
                        window["td"+i+2].style.textAlign = 'center';
                        window["td"+i+2].style.padding = '8px';

                        window["td"+i+3] = document.createElement('td');
                        window["td"+i+3].style.border = '1px solid #dddddd';
                        window["td"+i+3].style.textAlign = 'left';
                        window["td"+i+3].style.padding = '8px';
                        window["td"+i+3].style.display = 'flex';

                        window["td"+i+4] = document.createElement('td');
                        window["td"+i+4].style.border = '1px solid #dddddd';
                        window["td"+i+4].style.textAlign = 'center';
                        window["td"+i+4].style.padding = '8px';

                        const selectList = document.createElement("select");
                        selectList.style.width = '150px';

                        // const option = document.createElement("option");
                        // option.value = 0;
                        // option.text = "--Select--";
                        // selectList.appendChild(option);

                        doCombi = def.dose_Combination;
                        //doCombi.reverse();
                        $(doCombi).each(function(i, drop){
                            const option = document.createElement("option");
                            option.value = drop;
                            option.text = drop;
                            selectList.appendChild(option);
                        })

                        selectList.classList.add("medSelect");
                        selectList.multiple = true;
                        selectList.name = tableBody+i+3;

                        const btnAssign = document.createElement("button");
                        btnAssign.innerHTML = "Assign Dose";
                        btnAssign.classList.add("btn-primary");
                        btnAssign.classList.add("aprv");

                        window["td"+i+5] = document.createElement('td');
                        window["td"+i+5].style.border = '1px solid #dddddd';
                        window["td"+i+5].style.textAlign = 'center';
                        window["td"+i+5].style.padding = '8px';

                        //selectList.onchange = function(){UpdateDropDownValues(tbIdentity)};

                        $(tableBody).append($("<tr>")
                        .append($(window["td"+i+1]).append(i + 1))
                        // .append($(window["td"+i+2]).append(def.unrounded))
                        .append($(window["td"+i+4]).append(def.newDose))
                        .append($(window["td"+i+3]).append(selectList).append(btnAssign))
                        .append($(window["td"+i+5]).append("")));

                        selectList.style.flex = "1";
                        btnAssign.style.flex = "1";
                        btnAssign.style.marginTop = "0px";
                        btnAssign.style.marginLeft = "5px";

                        deselectMutiDropdown(selectList);
                        btnAssign.addEventListener('click', multiSelectClickEvent);

                        $(selectList).on('change', multiSelectClickEvent);

                        window["tdp2"+i+1] = document.createElement('td');
                        window["tdp2"+i+1].style.border = '1px solid #dddddd';
                        window["tdp2"+i+1].style.textAlign = 'center';
                        window["tdp2"+i+1].style.padding = '8px';

                        window["tdp2"+i+2] = document.createElement('td');
                        window["tdp2"+i+2].style.border = '1px solid #dddddd';
                        window["tdp2"+i+2].style.textAlign = 'center';
                        window["tdp2"+i+2].style.padding = '8px';

                        window["tdp2"+i+3] = document.createElement('td');
                        window["tdp2"+i+3].style.border = '1px solid #dddddd';
                        window["tdp2"+i+3].style.textAlign = 'center';
                        window["tdp2"+i+3].style.padding = '8px';

                        window["tdp2"+i+4] = document.createElement('td');
                        window["tdp2"+i+4].style.border = '1px solid #dddddd';
                        window["tdp2"+i+4].style.textAlign = 'center';
                        window["tdp2"+i+4].style.padding = '8px';

                        const selectListPrint = document.createElement("select");
                        selectListPrint.style.width = '150px';
                        doCombi = def.dose_Combination;
                        //doCombi.reverse();
                        $(doCombi).each(function(i, dropPrint){
                            const optionPrint = document.createElement("option");
                            optionPrint.value = dropPrint;
                            optionPrint.text = dropPrint;
                            selectListPrint.appendChild(optionPrint);
                        })

                        $(tableBodyPrint).append($("<tr>")
                        .append($(window["tdp2"+i+1]).append(i + 1))
                        // .append($(window["tdp2"+i+2]).append(def.unrounded))
                        .append($(window["tdp2"+i+4]).append(def.newDose))
                        .append($(window["tdp2"+i+3]).append(selectListPrint)));
                    });

                });

                sampleUpdateAColumn("#taperTable tbody tr", "taperTable");
                //addAction('#taperTable tbody tr', 'taperTable');
                var weekNo1 = $('#taperTBody tr').length;
                window.localStorage.setItem("weekNo1", weekNo1);
                y.style.display = 'block';         
                x.style.display = 'none';
                //secondTB.style.display = 'none';
                //window.localStorage.setItem("medQuantity", 1);

                $('.medSelect').multiSelect(); //Calling the multi-select class plugin here
            }, 
            error: function(msg){
                $("#errorContainer3").html("Unable to reset Taper Schedule generated for the medication");
                var content = "<span style='font-weight: bold'>Unable to reset Taper Schedule generated for the medication.</span> <span>Please try again shortly.</span>";
                swal({title: "", text: content, html: true});
                //sweetAlert("Unable to reset Taper Schedule generated for the medication","Please try again shortly","error");
            }
        }); 
            //}
        
    });


    //Reset Tapering Generation Med 2
    $('#btnReset2').on('click', function(event){
        event.preventDefault();

        var tableBodyPrint = ''; var captionNamePrint = '';
        $("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.

        $("#taperTable3Print").find("tbody").empty();
        tableBodyPrint = '#taperTable3Print';
        captionNamePrint = 'drugNmP2';

        document.getElementById("tpLength2").value = "";

        var med2 = window.localStorage.getItem("med2Store");
        let conceptId2 = window.localStorage.getItem("conceptId2Store");
        let floatDosage2 = window.localStorage.getItem("dosage2Store");
        let intDuration2 = window.localStorage.getItem("duration2Store");
        
        let url = urlDomain + 'insomnia/v1/tapper/create';
        //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
        let authToken = window.localStorage.getItem("token");
        //alert(authToken);
        var x = document.getElementById('screen3');
        var y = document.getElementById('screen4');
        var tableBody = '#taperTBody2';
        var secondTB = document.getElementById('accordion-two');
        var captionName = 'drugNm2';

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({"regimenDTOList":
            [{
                "sleepMedication" : med2,
                "currentDose" : floatDosage2,
                "medicationDuration" : intDuration2,
                "conceptID" : conceptId2
            }]
        }),
            success: function(result){
                console.log(result);
                $(result.tapaschedules).each(function(i, taper){
                    document.getElementById(captionName).innerHTML  = taper.drugName;
                    document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                    //window.localStorage.setItem("taperLength1", originalTpLenth);
                    //alert(taper.drugName);

                    $(taper.weeklyDose).each(function(i, def){

                        window["td"+i+1]= document.createElement('td');
                        window["td"+i+1].style.border = '1px solid #dddddd';
                        window["td"+i+1].style.textAlign = 'center';
                        window["td"+i+1].style.padding = '8px';

                        window["td"+i+2] = document.createElement('td');
                        window["td"+i+2].style.border = '1px solid #dddddd';
                        window["td"+i+2].style.textAlign = 'center';
                        window["td"+i+2].style.padding = '8px';

                        window["td"+i+3] = document.createElement('td');
                        window["td"+i+3].style.border = '1px solid #dddddd';
                        window["td"+i+3].style.textAlign = 'left';
                        window["td"+i+3].style.padding = '8px';
                        window["td"+i+3].style.display = 'flex';

                        window["td"+i+4] = document.createElement('td');
                        window["td"+i+4].style.border = '1px solid #dddddd';
                        window["td"+i+4].style.textAlign = 'center';
                        window["td"+i+4].style.padding = '8px';

                        const selectList = document.createElement("select");
                        selectList.style.width = '150px';

                        // const option = document.createElement("option");
                        // option.value = 0;
                        // option.text = "--Select--";
                        // selectList.appendChild(option);

                        $(def.dose_Combination).each(function(i, drop){
                            const option = document.createElement("option");
                            option.value = drop;
                            option.text = drop;
                            selectList.appendChild(option);
                        })

                        selectList.classList.add("medSelect");
                        selectList.multiple = true;
                        selectList.name = tableBody+i+3;

                        const btnAssign = document.createElement("button");
                        btnAssign.innerHTML = "Assign Dose";
                        btnAssign.classList.add("btn-primary");
                        btnAssign.classList.add("aprv");

                        window["td"+i+5] = document.createElement('td');
                        window["td"+i+5].style.border = '1px solid #dddddd';
                        window["td"+i+5].style.textAlign = 'center';
                        window["td"+i+5].style.padding = '8px';

                        $(tableBody).append($("<tr>")
                        .append($(window["td"+i+1]).append(i + 1))
                        // .append($(window["td"+i+2]).append(def.unrounded))
                        .append($(window["td"+i+4]).append(def.newDose))
                        .append($(window["td"+i+3]).append(selectList).append(btnAssign))
                        .append($(window["td"+i+5]).append("")));

                        selectList.style.flex = "1";
                        btnAssign.style.flex = "1";
                        btnAssign.style.marginTop = "0px";
                        btnAssign.style.marginLeft = "5px";

                        deselectMutiDropdown(selectList);
                        btnAssign.addEventListener('click', multiSelectClickEvent);

                        $(selectList).on('change', multiSelectClickEvent);

                        window["tdp2"+i+1] = document.createElement('td');
                        window["tdp2"+i+1].style.border = '1px solid #dddddd';
                        window["tdp2"+i+1].style.textAlign = 'center';
                        window["tdp2"+i+1].style.padding = '8px';

                        window["tdp2"+i+2] = document.createElement('td');
                        window["tdp2"+i+2].style.border = '1px solid #dddddd';
                        window["tdp2"+i+2].style.textAlign = 'center';
                        window["tdp2"+i+2].style.padding = '8px';

                        window["tdp2"+i+3] = document.createElement('td');
                        window["tdp2"+i+3].style.border = '1px solid #dddddd';
                        window["tdp2"+i+3].style.textAlign = 'center';
                        window["tdp2"+i+3].style.padding = '8px';

                        window["tdp2"+i+4] = document.createElement('td');
                        window["tdp2"+i+4].style.border = '1px solid #dddddd';
                        window["tdp2"+i+4].style.textAlign = 'center';
                        window["tdp2"+i+4].style.padding = '8px';

                        const selectListPrint = document.createElement("select");
                        selectListPrint.style.width = '150px';
                        doCombi = def.dose_Combination;
                        //doCombi.reverse();
                        $(doCombi).each(function(i, dropPrint){
                            const optionPrint = document.createElement("option");
                            optionPrint.value = dropPrint;
                            optionPrint.text = dropPrint;
                            selectListPrint.appendChild(optionPrint);
                        })

                        $(tableBodyPrint).append($("<tr>")
                        .append($(window["tdp2"+i+1]).append(i + 1))
                        // .append($(window["tdp2"+i+2]).append(def.unrounded))
                        .append($(window["tdp2"+i+4]).append(def.newDose))
                        .append($(window["tdp2"+i+3]).append(selectListPrint)));
                    });

                });

                sampleUpdateAColumn("#taperTable2 tbody tr", "taperTable2");
                //addAction('#taperTable2 tbody tr', 'taperTable2');
                var weekNo2 = $('#taperTBody2 tr').length;
                window.localStorage.setItem("weekNo2", weekNo2);
                y.style.display = 'block';         
                x.style.display = 'none';
                secondTB.style.display = 'block';
                //window.localStorage.setItem("medQuantity", 1);

                $('.medSelect').multiSelect(); //Calling the multi-select class plugin here
            }, 
            error: function(msg){
                $("#errorContainer3").html("Unable to reset Taper Schedule generated for the medication");
                var content = "<span style='font-weight: bold'>Unable to reset Taper Schedule generated for the medication.</span> <span>Please try again shortly.</span>";
                swal({title: "", text: content, html: true});
                //sweetAlert("Unable to reset Taper Schedule generated for the medication","Please try again shortly","error");
            }
        }); 
            //}
        
    });


    //Recompute Tapering Generation Med 1
    $('#btnRecompute').on('click', function(event){
        event.preventDefault();

        var medQT = window.localStorage.getItem("medQuantity");
        var tableBodyPrint = ''; var captionNamePrint = '';
        $("#taperTable").find("tbody").empty(); //clear all the content from tbody here.
        //$("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.
        if(medQT == 1){
            $("#taperTable1Print").find("tbody").empty();
            $("#taperTable2Print").find("tbody").empty();
            tableBodyPrint = '#taperTable1Print';
            captionNamePrint = 'drugNmP';
        }
        if(medQT == 2){
            $("#taperTable2Print").find("tbody").empty();
            $("#taperTable1Print").find("tbody").empty();
            tableBodyPrint = '#taperTable2Print';
            captionNamePrint = 'drugNmP1';
        }

        //$("#taperTable3Print").find("tbody").empty(); //clear all the content from tbody here.

        var med1 = window.localStorage.getItem("med1Store");

        //var med2 = window.localStorage.getItem("med2Store");
        
        var tpLength = document.getElementById("tpLength").value;
        var oldWeek1 = window.localStorage.getItem("weekNo1");
        let originalTpLenth = parseInt(tpLength);

        let intTpLength = parseInt(tpLength) + parseInt(oldWeek1);

        let conceptId1 = window.localStorage.getItem("conceptId1Store");
        
        let url = urlDomain + 'insomnia/v1/tapper/create';
        //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
        let authToken = window.localStorage.getItem("token");
        //alert(authToken);
        var x = document.getElementById('screen3');
        var y = document.getElementById('screen4');
        var tableBody = '#taperTBody';
        //var secondTB = document.getElementById('secondTB');
        var captionName = 'drugNm';
        let floatDosage = window.localStorage.getItem("dosageStore");
        let intDuration = window.localStorage.getItem("durationStore");

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({"regimenDTOList":
            [{
                "sleepMedication" : med1,
                "currentDose" : floatDosage,
                "medicationDuration" : intDuration,
                "taperLength" : intTpLength,
                "conceptID" : conceptId1
            }]
        }),
            success: function(result){
                console.log(result);
                $(result.tapaschedules).each(function(i, taper){
                    document.getElementById(captionName).innerHTML  = taper.drugName;
                    document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                    //window.localStorage.setItem("taperLength1", originalTpLenth);
                    //alert(taper.drugName);

                    $(taper.weeklyDose).each(function(i, def){

                        window["td"+i+1]= document.createElement('td');
                        window["td"+i+1].style.border = '1px solid #dddddd';
                        window["td"+i+1].style.textAlign = 'center';
                        window["td"+i+1].style.padding = '8px';

                        window["td"+i+2] = document.createElement('td');
                        window["td"+i+2].style.border = '1px solid #dddddd';
                        window["td"+i+2].style.textAlign = 'center';
                        window["td"+i+2].style.padding = '8px';

                        window["td"+i+3] = document.createElement('td');
                        window["td"+i+3].style.border = '1px solid #dddddd';
                        window["td"+i+3].style.textAlign = 'left';
                        window["td"+i+3].style.padding = '8px';
                        window["td"+i+3].style.display = 'flex';

                        window["td"+i+4] = document.createElement('td');
                        window["td"+i+4].style.border = '1px solid #dddddd';
                        window["td"+i+4].style.textAlign = 'center';
                        window["td"+i+4].style.padding = '8px';

                        const selectList = document.createElement("select");
                        selectList.style.width = '150px';

                        // const option = document.createElement("option");
                        // option.value = 0;
                        // option.text = "--Select--";
                        // selectList.appendChild(option);

                        doCombi = def.dose_Combination;
                        //doCombi.reverse();
                        $(doCombi).each(function(i, drop){
                            const option = document.createElement("option");
                            option.value = drop;
                            option.text = drop;
                            selectList.appendChild(option);
                        })

                        selectList.classList.add("medSelect");
                        selectList.multiple = true;
                        selectList.name = tableBody+i+3;

                        const btnAssign = document.createElement("button");
                        btnAssign.innerHTML = "Assign Dose";
                        btnAssign.classList.add("btn-primary");
                        btnAssign.classList.add("aprv");

                        window["td"+i+5] = document.createElement('td');
                        window["td"+i+5].style.border = '1px solid #dddddd';
                        window["td"+i+5].style.textAlign = 'center';
                        window["td"+i+5].style.padding = '8px';

                        $(tableBody).append($("<tr>")
                        .append($(window["td"+i+1]).append(i + 1))
                        // .append($(window["td"+i+2]).append(def.unrounded))
                        .append($(window["td"+i+4]).append(def.newDose))
                        .append($(window["td"+i+3]).append(selectList).append(btnAssign))
                        .append($(window["td"+i+5]).append("")));

                        selectList.style.flex = "1";
                        btnAssign.style.flex = "1";
                        btnAssign.style.marginTop = "0px";
                        btnAssign.style.marginLeft = "5px";

                        deselectMutiDropdown(selectList);
                        btnAssign.addEventListener('click', multiSelectClickEvent);

                        $(selectList).on('change', multiSelectClickEvent);

                        window["tdp2"+i+1] = document.createElement('td');
                        window["tdp2"+i+1].style.border = '1px solid #dddddd';
                        window["tdp2"+i+1].style.textAlign = 'center';
                        window["tdp2"+i+1].style.padding = '8px';

                        window["tdp2"+i+2] = document.createElement('td');
                        window["tdp2"+i+2].style.border = '1px solid #dddddd';
                        window["tdp2"+i+2].style.textAlign = 'center';
                        window["tdp2"+i+2].style.padding = '8px';

                        window["tdp2"+i+3] = document.createElement('td');
                        window["tdp2"+i+3].style.border = '1px solid #dddddd';
                        window["tdp2"+i+3].style.textAlign = 'center';
                        window["tdp2"+i+3].style.padding = '8px';

                        window["tdp2"+i+4] = document.createElement('td');
                        window["tdp2"+i+4].style.border = '1px solid #dddddd';
                        window["tdp2"+i+4].style.textAlign = 'center';
                        window["tdp2"+i+4].style.padding = '8px';

                        const selectListPrint = document.createElement("select");
                        selectListPrint.style.width = '150px';
                        doCombi = def.dose_Combination;
                        //doCombi.reverse();
                        $(doCombi).each(function(i, dropPrint){
                            const optionPrint = document.createElement("option");
                            optionPrint.value = dropPrint;
                            optionPrint.text = dropPrint;
                            selectListPrint.appendChild(optionPrint);
                        })

                        $(tableBodyPrint).append($("<tr>")
                        .append($(window["tdp2"+i+1]).append(i + 1))
                        // .append($(window["tdp2"+i+2]).append(def.unrounded))
                        .append($(window["tdp2"+i+4]).append(def.newDose))
                        .append($(window["tdp2"+i+3]).append(selectListPrint)));
                    });

                });

                sampleUpdateAColumn("#taperTable tbody tr", "taperTable");
                //addAction('#taperTable tbody tr', 'taperTable');
                var weekNo1 = $('#taperTBody tr').length;
                window.localStorage.setItem("weekNo1", weekNo1);
                y.style.display = 'block';         
                x.style.display = 'none';
                //secondTB.style.display = 'none';
                //window.localStorage.setItem("medQuantity", 1);

                $('.medSelect').multiSelect(); //Calling the multi-select class plugin here
            }, 
            error: function(msg){
                $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                var content = "<span style='font-weight: bold'>Unable to generate Taper Schedule for the medication.</span> <span>Please try again shortly.</span>";
                swal({title: "", text: content, html: true});
                //sweetAlert("Unable to generate Taper Schedule for the medication","Please try again shortly","error");
            }
        }); 
            //}
        
    });

    //Recompute Tapering Generation Med 2
    $('#btnRecompute2').on('click', function(event){
        event.preventDefault();

        var tableBodyPrint = ''; var captionNamePrint = '';
        $("#taperTable2").find("tbody").empty(); //clear all the content from tbody here.

        $("#taperTable3Print").find("tbody").empty();
        tableBodyPrint = '#taperTable3Print';
        captionNamePrint = 'drugNmP2';

        var med2 = window.localStorage.getItem("med2Store");

        
        var tpLength = document.getElementById("tpLength2").value;
        var oldWeek2 = window.localStorage.getItem("weekNo2");
        let originalTpLenth = parseInt(tpLength);

        let intTpLength2 = parseInt(tpLength) + parseInt(oldWeek2);
        let conceptId2 = window.localStorage.getItem("conceptId2Store");
        let floatDosage2 = window.localStorage.getItem("dosage2Store");
        let intDuration2 = window.localStorage.getItem("duration2Store");
        
        let url = urlDomain + 'insomnia/v1/tapper/create';
        //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
        let authToken = window.localStorage.getItem("token");
        //alert(authToken);
        var x = document.getElementById('screen3');
        var y = document.getElementById('screen4');
        var tableBody = '#taperTBody2';
        var secondTB = document.getElementById('accordion-two');
        var captionName = 'drugNm2';

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({"regimenDTOList":
            [{
                "sleepMedication" : med2,
                "currentDose" : floatDosage2,
                "medicationDuration" : intDuration2,
                "taperLength" : intTpLength2,
                "conceptID" : conceptId2
            }]
        }),
            success: function(result){
                console.log(result);
                $(result.tapaschedules).each(function(i, taper){
                    document.getElementById(captionName).innerHTML  = taper.drugName;
                    document.getElementById(captionNamePrint).innerHTML  = taper.drugName;
                    window.localStorage.setItem("taperLength1", originalTpLenth);
                    //alert(taper.drugName);

                    $(taper.weeklyDose).each(function(i, def){

                        window["td"+i+1]= document.createElement('td');
                        window["td"+i+1].style.border = '1px solid #dddddd';
                        window["td"+i+1].style.textAlign = 'center';
                        window["td"+i+1].style.padding = '8px';

                        window["td"+i+2] = document.createElement('td');
                        window["td"+i+2].style.border = '1px solid #dddddd';
                        window["td"+i+2].style.textAlign = 'center';
                        window["td"+i+2].style.padding = '8px';

                        window["td"+i+3] = document.createElement('td');
                        window["td"+i+3].style.border = '1px solid #dddddd';
                        window["td"+i+3].style.textAlign = 'left';
                        window["td"+i+3].style.padding = '8px';
                        window["td"+i+3].style.display = 'flex';

                        window["td"+i+4] = document.createElement('td');
                        window["td"+i+4].style.border = '1px solid #dddddd';
                        window["td"+i+4].style.textAlign = 'center';
                        window["td"+i+4].style.padding = '8px';

                        const selectList = document.createElement("select");
                        selectList.style.width = '150px';

                        // const option = document.createElement("option");
                        // option.value = 0;
                        // option.text = "--Select--";
                        // selectList.appendChild(option);

                        doCombi = def.dose_Combination;
                        //doCombi.reverse();
                        $(doCombi).each(function(i, drop){
                            const option = document.createElement("option");
                            option.value = drop;
                            option.text = drop;
                            selectList.appendChild(option);
                        })

                        selectList.classList.add("medSelect");
                        selectList.multiple = true;
                        selectList.name = tableBody+i+3;

                        const btnAssign = document.createElement("button");
                        btnAssign.innerHTML = "Assign Dose";
                        btnAssign.classList.add("btn-primary");
                        btnAssign.classList.add("aprv");

                        window["td"+i+5] = document.createElement('td');
                        window["td"+i+5].style.border = '1px solid #dddddd';
                        window["td"+i+5].style.textAlign = 'center';
                        window["td"+i+5].style.padding = '8px';

                        $(tableBody).append($("<tr>")
                        .append($(window["td"+i+1]).append(i + 1))
                        // .append($(window["td"+i+2]).append(def.unrounded))
                        .append($(window["td"+i+4]).append(def.newDose))
                        .append($(window["td"+i+3]).append(selectList).append(btnAssign))
                        .append($(window["td"+i+5]).append("")));

                        selectList.style.flex = "1";
                        btnAssign.style.flex = "1";
                        btnAssign.style.marginTop = "0px";
                        btnAssign.style.marginLeft = "5px";

                        deselectMutiDropdown(selectList);
                        btnAssign.addEventListener('click', multiSelectClickEvent);

                        $(selectList).on('change', multiSelectClickEvent);

                        window["tdp2"+i+1] = document.createElement('td');
                        window["tdp2"+i+1].style.border = '1px solid #dddddd';
                        window["tdp2"+i+1].style.textAlign = 'center';
                        window["tdp2"+i+1].style.padding = '8px';

                        window["tdp2"+i+2] = document.createElement('td');
                        window["tdp2"+i+2].style.border = '1px solid #dddddd';
                        window["tdp2"+i+2].style.textAlign = 'center';
                        window["tdp2"+i+2].style.padding = '8px';

                        window["tdp2"+i+3] = document.createElement('td');
                        window["tdp2"+i+3].style.border = '1px solid #dddddd';
                        window["tdp2"+i+3].style.textAlign = 'center';
                        window["tdp2"+i+3].style.padding = '8px';

                        window["tdp2"+i+4] = document.createElement('td');
                        window["tdp2"+i+4].style.border = '1px solid #dddddd';
                        window["tdp2"+i+4].style.textAlign = 'center';
                        window["tdp2"+i+4].style.padding = '8px';

                        const selectListPrint = document.createElement("select");
                        selectListPrint.style.width = '150px';
                        doCombi = def.dose_Combination;
                        //doCombi.reverse();
                        $(doCombi).each(function(i, dropPrint){
                            const optionPrint = document.createElement("option");
                            optionPrint.value = dropPrint;
                            optionPrint.text = dropPrint;
                            selectListPrint.appendChild(optionPrint);
                        })

                        $(tableBodyPrint).append($("<tr>")
                        .append($(window["tdp2"+i+1]).append(i + 1))
                        // .append($(window["tdp2"+i+2]).append(def.unrounded))
                        .append($(window["tdp2"+i+4]).append(def.newDose))
                        .append($(window["tdp2"+i+3]).append(selectListPrint)));
                    });

                });

                sampleUpdateAColumn("#taperTable2 tbody tr", "taperTable2");
                //addAction('#taperTable2 tbody tr', 'taperTable2');
                var weekNo2 = $('#taperTBody2 tr').length;
                window.localStorage.setItem("weekNo2", weekNo2);
                y.style.display = 'block';         
                x.style.display = 'none';
                secondTB.style.display = 'block';
                //window.localStorage.setItem("medQuantity", 1);

                $('.medSelect').multiSelect(); //Calling the multi-select class plugin here
            }, 
            error: function(msg){
                $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                var content = "<span style='font-weight: bold'>Unable to generate Taper Schedule for the medication.</span> <span>Please try again shortly.</span>";
                swal({title: "", text: content, html: true});
                //sweetAlert("Unable to generate Taper Schedule for the medication","Please try again shortly","error");
            }
        }); 
            //}
        
    });


    


    //Final Submit of Trial 2
    $('#btnSubmitTrial2').on('click', function(event){
        event.preventDefault();

        var patID = window.localStorage.getItem("patientID");
        var med2 = window.localStorage.getItem("med2Store").trim();       
        var tpLength1 = window.localStorage.getItem("weekNo1");
        var tpLength2 = window.localStorage.getItem("weekNo2");
        var tapperStartDate = window.localStorage.getItem("tapperStartDate");
        //var tapperStartDate = $("#datepicker").val();
        
            let url = urlDomain + 'insomnia/v1/tapper/save';
            //let url = 'http://health.us-east-2.elasticbeanstalk.com//insomnia/v1/provider/check01';
            let authToken = window.localStorage.getItem("token");
            var med1 = window.localStorage.getItem("med1Store");
            let floatDosage = window.localStorage.getItem("dosageStore");
            let intDuration = window.localStorage.getItem("durationStore");
            let conceptId1 = window.localStorage.getItem("conceptId1Store");

            if(med2 != ''){
                var firstDoses = getTableDoses('#taperTable tbody tr', 'taperTable');

                if(oneMedicationReturned){
                    UpdateSelectedSingle('taperTable1Print');

                    var concateTaperInfo = tapperStartDate+"_RMS_"+med1+"_RM_ "+firstDoses
                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        headers: {
                            'Content-Type': 'application/json', 
                            'Accept': '*/*',
                            'Authorization': 'Bearer '+ authToken
                        },
                        data: JSON.stringify({"patientID": patID, "regimenDTOList":
                        [{
                            "sleepMedication" : med1,
                            "currentDose" : floatDosage,
                            "medicationDuration" : intDuration,
                            "taperLength" : tpLength1,
                            "taperStartDate": tapperStartDate, 
                            "conceptID" : conceptId1
                        }],
                        "taperSchedule": concateTaperInfo,
                    }),
                        success: function(result){
                            console.log(result);
                            if (result) {
                                displayPrintPreview();
                            } else{
                                $("#errorFinalContainer").html("Unable to submit final medication");
                            }
                            console.log(JSON.stringify({"patientID": patID, "regimenDTOList":
                            [{
                            "sleepMedication" : med1,
                            "currentDose" : floatDosage,
                            "medicationDuration" : intDuration,
                            "taperLength" : tpLength1,
                            "taperStartDate": tapperStartDate, 
                            "conceptID" : conceptId1
                            }],
                            "taperSchedule": concateTaperInfo,
                        }));
                        }, 
                        error: function(msg){
                            $("#errorFinalContainer").html("Unable to submit final medication, please try again shortly");
                            var content = "<span style='font-weight: bold'>Unable to submit final medication.</span> <span>Please try again shortly.</span>";
                            swal({title: "", text: content, html: true});
                            //sweetAlert("Unable to submit final medication","Please try again shortly","error");
                        }
                    });
                }//End of when 1 out of the 2 medications was returned
                else{
                    let conceptId2 = window.localStorage.getItem("conceptId2Store");
                    let floatDosage2 = window.localStorage.getItem("dosage2Store");
                    let intDuration2 = window.localStorage.getItem("duration2Store");

                    // var source = document.getElementById('taperTable');
                    // var destination = document.getElementById('taperTable2Print');
                    // var copy = source.cloneNode(true);
                    // copy.setAttribute('id', 'taperTable2Print');
                    // destination.parentNode.replaceChild(copy, destination);
                    UpdateSelectedSingle('taperTable2Print');
                    UpdateSelectedDouble('taperTable3Print')
                    var secondDoses = getTableDoses('#taperTable2 tbody tr', 'taperTable2');
                    var concateTaperInfo = tapperStartDate+"_RMS_"+med1+"_RM_ "+firstDoses+"_RMS_"+med2+" _RM_ "+secondDoses

                    $.ajax({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        headers: {
                            'Content-Type': 'application/json', 
                            'Accept': '*/*',
                            'Authorization': 'Bearer '+ authToken
                        },
                        data: JSON.stringify({"patientID": patID, "regimenDTOList":
                        [{
                        "sleepMedication" : med1,
                        "currentDose" : floatDosage,
                        "medicationDuration" : intDuration,
                        "taperLength" : tpLength1,
                        "taperStartDate": tapperStartDate, 
                        "conceptID" : conceptId1
                        },
                        {
                        "sleepMedication" : med2,
                        "currentDose" : floatDosage2,
                        "medicationDuration" : intDuration2,
                        "taperLength" : tpLength2,
                        "taperStartDate": tapperStartDate, 
                        "conceptID" : conceptId2
                        }],
                        "taperSchedule": concateTaperInfo,
                
                    }),
                        success: function(result){
                            console.log(result);
                            if (result) {
                                displayPrintPreview();
                            } else{
                                $("#errorFinalContainer").html("Unable to submit final medication");
                            }

                            console.log(JSON.stringify({"patientID": patID, "regimenDTOList":
                            [{
                            "sleepMedication" : med1,
                            "currentDose" : floatDosage,
                            "medicationDuration" : intDuration,
                            "taperLength" : tpLength1,
                            "taperStartDate": tapperStartDate, 
                            "conceptID" : conceptId1
                            },
                            {
                            "sleepMedication" : med2,
                            "currentDose" : floatDosage2,
                            "medicationDuration" : intDuration2,
                            "taperLength" : tpLength2,
                            "taperStartDate": tapperStartDate, 
                            "conceptID" : conceptId2
                            }],
                            "taperSchedule": concateTaperInfo,
                            
                        }));
                            
                        }, 
                        error: function(msg){
                            $("#errorFinalContainer").html("Unable to submit final medication, please try again shortly");
                            var content = "<span style='font-weight: bold'>Unable to submit final medication.</span> <span>Please try again shortly.</span>";
                            swal({title: "", text: content, html: true});
                            //sweetAlert("Unable to submit final medication","Please try again shortly","error");
                        }
                    });
                }

            }else{
                //UpdateSelectedData('taperTable');
                var firstDoses = getTableDoses('#taperTable tbody tr', 'taperTable');
                var concateTaperInfo = tapperStartDate+"_RMS_"+med1+"_RM_ "+firstDoses
                UpdateSelectedSingle('taperTable1Print');
                $.ajax({
                    url: url,
                    type: 'POST',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Accept': '*/*',
                        'Authorization': 'Bearer '+ authToken
                    },
                    data: JSON.stringify({"patientID": patID, "regimenDTOList":
                    [{
                        "sleepMedication" : med1,
                        "currentDose" : floatDosage,
                        "medicationDuration" : intDuration,
                        "taperLength" : tpLength1,
                        "taperStartDate": tapperStartDate, 
                        "conceptID" : conceptId1
                    }],
                    "taperSchedule": concateTaperInfo,
                }),
                    success: function(result){
                        console.log(result);
                        if (result) {
                            displayPrintPreview();
                        } else{
                            $("#errorFinalContainer").html("Unable to submit final medication");
                        }
                        console.log(JSON.stringify({"patientID": patID, "regimenDTOList":
                            [{
                            "sleepMedication" : med1,
                            "currentDose" : floatDosage,
                            "medicationDuration" : intDuration,
                            "taperLength" : tpLength1,
                            "taperStartDate": tapperStartDate, 
                            "conceptID" : conceptId1
                            }],
                            "taperSchedule": concateTaperInfo,
                            
                        }));
                    }, 
                    error: function(msg){
                        $("#errorFinalContainer").html("Unable to submit final medication, please try again shortly");
                        var content = "<span style='font-weight: bold'>Unable to submit final medication.</span> <span>Please try again shortly.</span>";
                        swal({title: "", text: content, html: true});
                        //sweetAlert("Unable to submit final medication","Please try again shortly","error");
                    }
                }); 
            }
        
    });

    function displayPrintPreview() {
        var x = document.getElementById('screen5');
        var y = document.getElementById('printAreaWithOneMed');
        var z = document.getElementById('printAreaWithTwoMed');
    
        var medicationQuantity = window.localStorage.getItem("medQuantity");
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
    
        today = dd + '/' + mm + '/' + yyyy;
    
        if(medicationQuantity == 1){
            document.getElementById('provName').innerHTML =  window.localStorage.getItem("providerName");
            document.getElementById('provAdd').innerHTML =  window.localStorage.getItem("providerAddress");
            document.getElementById('provPh').innerHTML =  window.localStorage.getItem("providerPhone");
            document.getElementById('patiName').innerHTML =  window.localStorage.getItem("patientName");
            document.getElementById('myDate').innerHTML =  today;
            document.getElementById('patiName3').innerHTML =  window.localStorage.getItem("patientName");
            document.getElementById('myDate3').innerHTML =  today;
            z.style.display = 'none';         
            x.style.display = 'none';
            y.style.display = 'block';
        }else if(medicationQuantity == 2){
            document.getElementById('provName2').innerHTML =  window.localStorage.getItem("providerName");
            document.getElementById('provAdd2').innerHTML =  window.localStorage.getItem("providerAddress");
            document.getElementById('provPh2').innerHTML =  window.localStorage.getItem("providerPhone");
            document.getElementById('patiName2').innerHTML =  window.localStorage.getItem("patientName");
            document.getElementById('myDate2').innerHTML = today;
            document.getElementById('patiName32').innerHTML =  window.localStorage.getItem("patientName");
            document.getElementById('myDate32').innerHTML =  today;
            z.style.display = 'block';         
            x.style.display = 'none';
            y.style.display = 'none';
        }
    
    }


 });