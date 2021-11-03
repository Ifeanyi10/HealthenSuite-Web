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
                    //window.location.href = "provider-dashboard.html";
                }
                );
}

function infoAlert(){
    swal({title: "Select the OPPOSITE!", text: "Please select the opposite of what you selected to continue.", type: "info"},
                function(){ 
                    //window.location.href = "provider-dashboard.html";
                }
                );
}


function hideDispaly1() {
    var x = document.getElementById('firstQ');
    var y = document.getElementById('secondQ1');
    var z = document.getElementById('thirdQ2');

    if (document.getElementById('prescYes').checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
        z.style.display = 'none';  
        $('input[name=optradio2]').prop("checked",false); 
        $('input[name=optradio3]').prop("checked",false);

        document.getElementById('thirdQ1').style.display = 'none';     
        $('input[name=good]').prop("checked",false); 

        document.getElementById('trial1Demo').style.display = 'none';

        document.getElementById('fourthQ1').style.display = 'none';
        $('input[name=optradio6]').prop("checked",false); 

        document.getElementById('fifthQ1').style.display = 'none';
        $('input[name=optradio7]').prop("checked",false); 

        document.getElementById('trial2Demo').style.display = 'none';

    } else if (document.getElementById('prescNo').checked){
        //x.style.display = 'none';

        //infoAlert();
        //uncomment below

        y.style.display = 'none';
        z.style.display = 'block'; 
        //$('input[name=optradio1]').prop("checked",false);
        $('input[name=optradio2]').prop("checked",false);
        $('input[name=optradio3]').prop("checked",false);

        document.getElementById('thirdQ1').style.display = 'none';
        $('input[name=good]').prop("checked",false);  

        document.getElementById('trial1Demo').style.display = 'none';

        document.getElementById('fourthQ1').style.display = 'none';
        $('input[name=optradio6]').prop("checked",false); 

        document.getElementById('fifthQ1').style.display = 'none';
        $('input[name=optradio7]').prop("checked",false); 

        document.getElementById('trial2Demo').style.display = 'none';


        //notEligibleAlert();
    }
}

function hideDispaly2() {
    var x = document.getElementById('secondQ1');
    var y = document.getElementById('thirdQ1');
    var z = document.getElementById('thirdQ2');

    if (document.getElementById('forSleepYes').checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
        z.style.display = 'none';   
        $('input[name=optradio4]').prop("checked",false);
        $('input[name=optradio3]').prop("checked",false);  
        //$('input[name=optradio2]').prop("checked",false);

        document.getElementById('trial1Demo').style.display = 'none';

        document.getElementById('fourthQ1').style.display = 'none';
        $('input[name=optradio6]').prop("checked",false); 

        document.getElementById('fifthQ1').style.display = 'none';
        $('input[name=optradio7]').prop("checked",false); 

        document.getElementById('trial2Demo').style.display = 'none';

    } else if (document.getElementById('forSleepNo').checked){
        //x.style.display = 'none';
        //infoAlert();
        //uncomment below
        y.style.display = 'none';
        z.style.display = 'block'; 
        $('input[name=optradio4]').prop("checked",false);
        $('input[name=optradio3]').prop("checked",false); 

        document.getElementById('trial1Demo').style.display = 'none';

        document.getElementById('fourthQ1').style.display = 'none';
        $('input[name=optradio6]').prop("checked",false); 

        document.getElementById('fifthQ1').style.display = 'none';
        $('input[name=optradio7]').prop("checked",false); 

        document.getElementById('trial2Demo').style.display = 'none';
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
        //x.style.display = 'none';
        y.style.display = 'block'; 

        document.getElementById("patFName").value = "";
        document.getElementById("patLName").value = "";
        document.getElementById("patAge").value = "";
        document.getElementById("patEmail").value = "";

        document.getElementById('fourthQ1').style.display = 'none';
        $('input[name=optradio6]').prop("checked",false); 

        document.getElementById('fifthQ1').style.display = 'none';
        $('input[name=optradio7]').prop("checked",false); 

        document.getElementById('trial2Demo').style.display = 'none';
           
    } else if (document.getElementById('notForSleepYes').checked){
        //x.style.display = 'none';
        notEligibleAlert();
        y.style.display = 'none'; 
        $('input[name=optradio3]').prop("checked",false); 

        document.getElementById('fourthQ1').style.display = 'none';
        $('input[name=optradio6]').prop("checked",false); 

        document.getElementById('fifthQ1').style.display = 'none';
        $('input[name=optradio7]').prop("checked",false); 

        document.getElementById('trial2Demo').style.display = 'none';
    }
}

function hideDispaly4() {
    var x = document.getElementById('thirdQ1');
    var y = document.getElementById('fourthQ1');

    if (document.getElementById('good').checked || document.getElementById('good2').checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
        if(document.getElementById('good').checked ){window.localStorage.setItem("howMany", 1);}
        if(document.getElementById('good2').checked ){window.localStorage.setItem("howMany", 2);}
                   
    } else if (document.getElementById('bad').checked){
        //x.style.display = 'none';
        notEligibleAlert();
        $('input[name=optradio4]').prop("checked",false); 

        document.getElementById('trial1Demo').style.display = 'none';

        document.getElementById('fourthQ1').style.display = 'none';
        $('input[name=optradio6]').prop("checked",false); 

        document.getElementById('fifthQ1').style.display = 'none';
        $('input[name=optradio7]').prop("checked",false); 

        document.getElementById('trial2Demo').style.display = 'none';
    }
}

function hideDispaly5() {
    var x = document.getElementById('fourthQ1');
    var y = document.getElementById('fifthQ1');

    if (document.getElementById('willingYes').checked) {
        //x.style.display = 'none';
        y.style.display = 'block'; 
                   
    } else if (document.getElementById('willingNo').checked){
        //x.style.display = 'none';
        notEligibleAlert();
        $('input[name=optradio6]').prop("checked",false); 

        document.getElementById('trial1Demo').style.display = 'none'

        document.getElementById('fifthQ1').style.display = 'none';
        $('input[name=optradio7]').prop("checked",false); 

        document.getElementById('trial2Demo').style.display = 'none';
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
        //x.style.display = 'none';
        document.getElementById("pat2FName").value = "";
        document.getElementById("pat2LName").value = "";
        document.getElementById("pat2Age").value = "";
        document.getElementById("pat2Email").value = "";

        y.style.display = 'block'; 
           
    } else if (document.getElementById('t2NotForSleepYes').checked){
        //x.style.display = 'none';
        notEligibleAlert();
        $('input[name=optradio7]').prop("checked",false); 

        document.getElementById('trial1Demo').style.display = 'none'

        document.getElementById('trial2Demo').style.display = 'none';
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



function validateStartDate(btnSDate){
    var bt = document.getElementById(btnSDate);
    var stDate = $("#datepicker").val();
    window.localStorage.setItem("tapperStartDate", stDate);

    if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength,padString) {
            targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
            padString = String((typeof padString !== 'undefined' ? padString : ' '));
            if (this.length > targetLength) {
                return String(this);
            }
            else {
                targetLength = targetLength-this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
                }
                return padString.slice(0,targetLength) + String(this);
            }
        };
    }

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

checkboxes = document.forms['medForm'].elements['medCAT']; //select all checkboxes
checkboxes2 = document.forms['medForm2'].elements['medCAT']; //select all checkboxes

function validateMedCheck(){
    var btnMed = document.getElementById('btnMedSelect');
    var btnMed2 = document.getElementById('btnChangePass');
    if (limit < 1){
        btnMed2.disabled = true;
        console.log("Limit Inside: "+limit);
    }else{
        btnMed2.disabled = false;
    }
    for (i = 0; i < checkboxes.length; i++) {    
        if(checkboxes[i].checked == true){
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



    var medSet = [];
    
    $("input[name='medCAT']").change(function() {
    var checked = $(this).val();
      if ($(this).is(':checked')) {
        medSet.push(checked);
      }else{
      medSet.splice($.inArray(checked, medSet),1);
      }
      console.log("Medset: "+ medSet)
      console.log("Limit: "+limit);
    });

var firstValue = "";
var secondValue = "";  

function fillMedCheck(){
    var meds = document.forms['medForm2'].elements['medCAT'];
    var initialCount = 0;
    firstValue = "";
    secondValue = "";
    for (i = 0; i < checkboxes2.length; i++) { 
        checkboxes2[i].checked = false;
    }

    if(medSet.length < 1){
        return
    }else{
        for (i = 0; i < medSet.length; i++) {    
            if(initialCount < 2){
                if(initialCount == 0){                   
                    firstValue = medSet[i];
                } 
                if(initialCount == 1){
                    secondValue = medSet[i];
                }    
                initialCount += 1;                            
            } 
        }  
    }

    for (i = 0; i < checkboxes2.length; i++) {  
        if(checkboxes2[i].value == firstValue){
            checkboxes2[i].checked = true;
        }  
        if(checkboxes2[i].value == secondValue){
            checkboxes2[i].checked = true;
        } 
    }
    console.log("First: "+firstValue+" Second: "+secondValue);
    console.log("Meds: "+medSet);
}

function updateInitialMedCheck(){
    var meds = document.forms['medForm'].elements['medCAT'];

    for (i = 0; i < checkboxes.length; i++) { 
        checkboxes[i].checked = false;
    }

    for (i = 0; i < checkboxes.length; i++) {  
        if(checkboxes[i].value == firstValue){
            checkboxes[i].checked = true;
        }  
        if(checkboxes[i].value == secondValue){
            checkboxes[i].checked = true;
        } 
    }
}

function updateCheckboxDetails(){
    document.getElementById("dosage").value = "";
    document.getElementById("dosage2").value = "";
    var val = "Duration of medication (e.g less than 14 days)";
    $('#inputDuration option:contains(' + val + ')').prop({selected: true});
    $('#inputDuration2 option:contains(' + val + ')').prop({selected: true});
    
    displaySreeen3();
    console.log("First: "+firstValue+" Second: "+secondValue);
    updateInitialMedCheck();
    console.log("Limit: "+limit);
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


function displaySreeen3() {
    var x = document.getElementById('screen2');
    var y = document.getElementById('screen3');
    var z = document.getElementById('med2');
    firstValue = "";
    secondValue = "";
    //var meds = document.forms['medForm'].elements['medCAT'];
    var firstSelectedValue = ""; 
    var secondSelectedValue = "";
    var initialCount = 0;
    let drugOptions1 = "idMedications1";
    let drugOptions2 = "idMedications2";
    let howMany = window.localStorage.getItem("howMany");

    for (i = 0; i < medSet.length; i++) {    
            if(initialCount < 2){
                if(initialCount == 0){
                    firstSelectedValue =  medSet[i];
                    firstValue = medSet[i];
                } 
                if(initialCount == 1){
                    secondSelectedValue =  medSet[i];
                    secondValue = medSet[i];
                }    
                initialCount += 1;                            
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
    }else{
        z.style.display = 'none';
    }

    checkDuration();
    console.log("display runs2: "+limit);
    if(howMany == limit){
        y.style.display = 'block';  
        x.style.display = 'none';
    } else if(howMany == 1 && limit == 2){
        swal({
            title: "",
             text: "You indicated that your patient is currently taking 1 benzodiazepines and/or Z-drugs earlier but you selected 2 BZRA medication(s) here.",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#2087c8",
            confirmButtonText: "Yes, I am aware. Continue",
            cancelButtonColor: "#01AA73",
            cancelButtonText: "Ok, Let me deselect 1 BZRA Medication",
            closeOnConfirm: false,
            closeOnCancel: false
            },
            function(isConfirm){
            if (isConfirm) {
                window.localStorage.setItem("howMany", 2);
                swal.close()
                y.style.display = 'block';  
                x.style.display = 'none';
            } else {
                swal.close();
            }
            console.log("Limit: "+limit);
        });

    } else if(howMany == 2 && limit == 1){
        swal({
            title: "",
             text: "You indicated that your patient is currently taking 2 benzodiazepines and/or Z-drugs earlier but you selected 1 BZRA medication(s) here.",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#2087c8",
            confirmButtonText: "Yes, I am aware. Continue",
            cancelButtonColor: "#01AA73",
            cancelButtonText: "Ok, Let me add 1 BZRA Medication",
            closeOnConfirm: false,
            closeOnCancel: false
            },
            function(isConfirm){
            if (isConfirm) {
                window.localStorage.setItem("howMany", 1);
                swal.close()
                y.style.display = 'block';  
                x.style.display = 'none';
            } else {
                swal.close()
            }
            console.log("Limit: "+limit);
        });
    }

    
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


//Go back to screen 2
$('#btnBackScreen5').on('click', function(event){
    event.preventDefault();
    var x = document.getElementById('screen4');
    var y = document.getElementById('screen5');

    y.style.display = 'none';         
    x.style.display = 'block';
});

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
        if(limit < 1){
            sweetAlert("Attention!","Please click on the Add/Remove Medication button to add medication before you go back.","info");
        }else{
            var y = document.getElementById('screen3');
            y.style.display = 'none';
            var z = document.getElementById('screen2');
            z.style.display = 'block';
        }  
    });

    //Go back to screen 1
    $('#btnBackScreen2').on('click', function(event){
        event.preventDefault();
        var y = document.getElementById('screen2');
        y.style.display = 'none';
        var z = document.getElementById('screen1');
        z.style.display = 'block';
        var x = document.getElementById('trial2Demo');
        x.style.display = 'block';
    });


 });


 function PrintDiv() {  
    var patName =  "Health enSuite Team - " + window.localStorage.getItem("patientName");
    var divContents = document.getElementById("printdivcontent").innerHTML;  
    var printWindow = window.open('', '', 'height=800,width=800');  
    printWindow.document.write('<html><head><title>');  
    printWindow.document.write(patName); 
    printWindow.document.write('</title>'); 
    printWindow.document.write('</head><body >');  
    printWindow.document.write(divContents);  
    printWindow.document.write('</body></html>');  
    printWindow.document.close();  
    printWindow.print();  
} 


function PrintDiv2() {  
    var patName =  "Health enSuite Team - " + window.localStorage.getItem("patientName");
    var divContents = document.getElementById("printOneNow").innerHTML;  
    var printWindow = window.open('', '', 'height=800,width=800');  
    printWindow.document.write('<html><head><title>');  
    printWindow.document.write(patName); 
    printWindow.document.write('</title>');  
    printWindow.document.write('</head><body >');  
    printWindow.document.write(divContents);  
    printWindow.document.write('</body></html>');  
    printWindow.document.close();  
    printWindow.print();  
} 

function PrintDiv3() {  
    var patName =  "Health enSuite Team - " + window.localStorage.getItem("patientName");
    var divContents = document.getElementById("printTwoNow").innerHTML;  
    var printWindow = window.open('', '', 'height=800,width=800');  
    printWindow.document.write('<html><head><title>');  
    printWindow.document.write(patName); 
    printWindow.document.write('</title>'); 
    printWindow.document.write('</head><body >');  
    printWindow.document.write(divContents);  
    printWindow.document.write('</body></html>');  
    printWindow.document.close();  
    printWindow.print();  
} 


function cancelApplication(){
    window.location.href = "provider-dashboard.html";
}


function checkMedicationLimit() {

    var meds = document.forms['medForm'].elements['medCAT'];

    var initialCount = 0;

    for (i = 0; i < checkboxes.length; i++) {    
        if(checkboxes[i].checked == true){
            if(initialCount < 2){
                if(initialCount == 0){
                    firstSelectedValue =  checkboxes[i].value;
                } 
                if(initialCount == 1){
                    secondSelectedValue =  checkboxes[i].value;
                }    
                initialCount += 1;                            
            }
        } 
    }

}


limit = 0; //set limit



function checker(elem) {
  if (elem.checked) { //if checked, increment counter
    limit++;
  } else {
    limit--; //else, decrement counter
  }

  for (i = 0; i < checkboxes.length; i++) { // loop through all 

    if (limit == 2) {
      if (!checkboxes[i].checked) {
        checkboxes[i].disabled = true; // and disable unchecked checkboxes
        checkboxes2[i].disabled = true; // and disable unchecked checkboxes
      }

    } else { //if limit is less than two

      if (!checkboxes[i].checked) {
        checkboxes[i].disabled = false; // enable unchecked checkboxes
        checkboxes2[i].disabled = false; // enable unchecked checkboxes
      }

    }
  }
  console.log("Checker Limit: "+limit);
}

for (i = 0; i < checkboxes.length; i++) {
  checkboxes[i].onclick = function() { //call function on click and send current element as param
    checker(this);
  }
}



function checker2(elem) {
  if (elem.checked) { //if checked, increment counter
    limit++;
  } else {
    limit--; //else, decrement counter
  }


  for (i = 0; i < checkboxes2.length; i++) { // loop through all 

    if (limit == 2) {
      if (!checkboxes2[i].checked) {
        checkboxes2[i].disabled = true; // and disable unchecked checkboxes
        checkboxes[i].disabled = true;
      }

    } else { //if limit is less than two

      if (!checkboxes2[i].checked) {
        checkboxes2[i].disabled = false; // enable unchecked checkboxes
        checkboxes2[i].disabled = false;
      }

    }
  }

}

for (i = 0; i < checkboxes2.length; i++) {
    checkboxes2[i].onclick = function() { //call function on click and send current element as param
    checker2(this);
  }

}


$('#bzra').tooltip({
    title: "BZRAs are benzodiazepine receptor agonists and include the benzodiazepines and Z-drugs. Patients taking over-the-counter medications (e.g., Gravol, Benedryl, Sleep-Eze, Advil, Tylenol, and other night time formulations), tricyclic antidepressants (e.g., Amitriptyline) and other medications like Seroquel, Trazodone are eligible to use this tool. However, these medications cannot be tapered using this tool.",
    placement: "right",
    trigger: 'hover' 
})

$('#regimen').tooltip({
    title: "Some BZRAs are not easily tapered due to dosage formulation limitations. This includes capsules (chlordiazepoxide, clorazepate, flurazepam, temazepam) and specially formulated tablets (zolpidem orally disintegrating tablets). You may wish to switch to an equivalent dose of an alternative BZRA available in multiple tablet strengths that can be further split into smaller doses. Taper schedules are available for shorter (oxazepam), intermediate (lorazepam), and longer (clonazepam) half-life BZRAs.",
    placement: "right",
    trigger: 'hover'
})


$('#tipTapLength').tooltip({
    title: "Increase the total number of weeks and click 'Recompute'",
    placement: "right",
    trigger: 'hover'
})

$('#tipTapLength2').tooltip({
    title: "Increase the total number of weeks and click 'Recompute'",
    placement: "right",
    trigger: 'hover'
})

$('#tipReset').tooltip({
    title: "Click 'Reset' to return to the original computer generated taper schedule for medication 1",
    placement: "right",
    trigger: 'hover'
})

$('#tipReset2').tooltip({
    title: "Click 'Reset' to return to the original computer generated taper schedule for medication 2",
    placement: "right",
    trigger: 'hover'
})

$('.tipCol1').tooltip({
    title: "This represents the taper week as determined by the application logic based on the number of reductions in the current dose in weeks.",
    placement: "right",
    trigger: 'hover'
})

$('.tipCol2').tooltip({
    title: "This is the final taper dose for this particular week as determined by the application logic.",
    placement: "right",
    trigger: 'hover'
})


$('.tipCol4').tooltip({
    title: "Drop-down option will assist you with modification of the taper dose recommended by the application for a particular week. This allows Multi-Select of available dose combinations and the recommended dose will be the summed-up value. Please also note that the taper dose value for each week must be lower than or equal to previous week.",
    placement: "right",
    trigger: 'hover'
})

$('.tipCol5').tooltip({
    title: "This is the final taper dose for this particular week by the Provider",
    placement: "right",
    trigger: 'hover'
})

//tipStartDate

// $('#tipStartDate').tooltip({
//     title: "Select a start date for this taper schedule within the next 2 weeks. ",
//     placement: "right",
//     trigger: 'hover'
// })

$('#tipGoBack').tooltip({
    title: "Click Back button to adjust medication taper values",
    placement: "right",
    trigger: 'hover'
})
