
var urlDomain = window.localStorage.getItem("urlDomain");
var patientAccountID = "";

$(document).ready(function () {
    $("#nameSearch").keyup(populateTB);

    let authTokenPatient = '';

    $(window).focus(function () {
        //do something
        let authToken = window.localStorage.getItem("token");
        console.log("You are in this tab and the token is: "+authToken);
        authTokenPatient = window.localStorage.getItem("patientToken");
        if(authToken == null){
            //urlDomain = 'http://health.us-east-2.elasticbeanstalk.com/';
            //urlDomain = 'http://192.168.6.15:8083/';
            urlDomain = 'https://api.healthensuite.com/';
            window.localStorage.setItem("urlDomain", urlDomain);
            $('#loginModal').modal('show');
        }
    });

    //Provider Change Patient Taper Start date
    $('#btnReviseNow').on('click', function(event){
        event.preventDefault();

        var newTaperStartDate = document.getElementById("datepicker").value;
        let authToken = window.localStorage.getItem("token");

        let url = urlDomain + 'insomnia/v1/provider/updatetapperstartdate';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "id" : patientAccountID,
                "code" : newTaperStartDate
                }),
            success: function(result){
                console.log(result);
                swal({title: "Done!", text: "Your Patient’s Taper start date has been revised.", type: "success"},
                function(){ 
                    $('#exampleModalRevisePatient').modal('hide');
                    window.location.href = "patient-list.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Update not successful!","Please try again shortly.","error");
            }
        });
        console.log("Sending the Taper Date to back-end: "+newTaperStartDate);
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
                    sweetAlert("Incorrect username or password!","Please confirm your login credentials and try again.","error");
                }
            });
        }else{
            sweetAlert("Attention!","Please fill the fields properly and login","info");
        }
        
    });//end of quick login

    // var columnValue = document.getElementById('rev').rows[1].cells[1].innerHTML;
    // console.log('cell Value: '+columnValue)

    // addAction('#rev tbody tr');
})


// function addAction(tableId){
//     $(tableId).each(function(i, def) {
//             var $drop = $(this).find('select');
//             $drop.on("change", function(e) {
//                 UpdateSelectValues(tableId);
//             });
//     });
// }

// function UpdateSelectValues(tableId){
//     var seV = [];
//     let rowIndex = event.target.parentNode.parentNode.rowIndex;
//     var selection = '';
//     $(tableId).each(function(i, def) {
//         if(i == (rowIndex - 1)){
//             selection = $(this).find('td:last option:selected').index();
//             var drop = $(this).find('select');
//             drop.find('option').each(function(index,element){
//                 seV.push(element.value);
//             });
//         }
//     });

//     var newSeV = seV.splice(parseInt(selection))
//     $(tableId).each(function(i, def) {
//         console.log('My i: ' + i)
//         if (i > (rowIndex -1)){
//             var select = $(this).find('select');
//             select.empty();
//             var columnValue = document.getElementById('rev').rows[i + 1].cells[1].innerHTML;
//             $.each(newSeV, function(i, p) {
//                 select.append($('<option></option>').val(p).html(p));
//             });
//             select.append($('<option></option>').val(columnValue).html(columnValue));
//             // $("#test").html($("#test option").sort(function (a, b) {
//             //     return parseInt($(a).val()) == parseInt($(b).val()) ? 0 : parseInt($(a).val()) < parseInt($(b).val()) ? -1 : 1;
//             // }));
//             select.val(columnValue);
//         }
        
//     });
//     console.log('New array: '+newSeV)
//     console.log('Sel: '+selection)
//     console.log('Initial array: '+seV)
// }


const findUserById = (id, users) => {
    const [key, user] = Object.entries(users).find(([key, user]) => user.id === id);
    return user;
    }


function getCurrentTaperStartDate(){
    document.getElementById('datepicker').value = "";
    document.getElementById('btnReviseNow').disabled = true;
    document.getElementById('currentStDate').value= document.getElementById('paTapStDate').innerHTML;
    console.log("Patient ID: "+patientAccountID);
}

function getPatDetatail(){
    var x = document.getElementById('patientListTB');
    var y = document.getElementById('patientSpace');
    var z = document.getElementById('printSampleRecov');
    let rowId = event.target.parentNode.parentNode.id; 
    let rowIndex = event.target.parentNode.parentNode.rowIndex;
    var patObj = window.localStorage.getItem("providerPatientsObj");
    let users = JSON.parse(patObj);
    console.log('The row index is: '+ rowIndex);
    let userObj = findUserById(parseInt(rowId), users);

    
    patientAccountID = userObj.id;
    document.getElementById('paName').innerHTML = userObj.firstName + ' ' + userObj.lastName;
    document.getElementById('paAge').innerHTML = userObj.age;
    var myGend = "";
    if(userObj.gender == "MALE"){
        myGend = "Male";
    }else if(userObj.gender == "FEMALE"){
        myGend = "Female";
    }else if(userObj.gender == "OTHER"){
        myGend = "Other";
    }
    document.getElementById('paGender').innerHTML= myGend;
    var phoneN = userObj.phoneNumber;
    if(phoneN == '' || phoneN == null){
        document.getElementById('paPhone').innerHTML = 'Not provided';
    }else{
        document.getElementById('paPhone').innerHTML = phoneN;
        //document.getElementById('phDiv').style.display = 'block';
    }

    document.getElementById('paRecDate').innerHTML= userObj.appRecommendationDate;

    var tapStD = userObj.regimen;
    //var tapStD = userObj.tapperStartDate;
    if(tapStD == '' || tapStD == null){
        document.getElementById('paTapStDate').innerHTML = 'Not applicable';
        document.getElementById('btnStDate').style.display = 'none';
    }else{
        tapStD = userObj.regimen[0].taperStartDate;
        document.getElementById('paTapStDate').innerHTML = tapStD;
        
    }

    var spDiaLength = userObj.sleepDiaries.length;
    if(spDiaLength == '' || spDiaLength == null){
        // document.getElementById('spDiaryDiv').style.display = 'none';
        // if(document.getElementById('noSpDiaryDiv').style.display == 'none'){
        //     document.getElementById('noSpDiaryDiv').style.display = 'block';
        // }
        document.getElementById('spDFilled').innerHTML = 'No Sleep Diary yet';
        console.log(spDiaLength)
    }else{
        let recVal = 0;
        let pt = userObj.sleepDiaries;
        for (let key in pt) {
            if (pt[key].bedTime != null) {
                recVal++;
            }
        }
        // document.getElementById('spDFilled').innerHTML = recVal;
        // document.getElementById('spDTotal').innerHTML = spDiaLength;
        // if(document.getElementById('spDiaryDiv').style.display == 'none'){
        //     document.getElementById('spDiaryDiv').style.display = 'block';
        // }
        // document.getElementById('noSpDiaryDiv').style.display = 'none';

        document.getElementById('spDFilled').innerHTML = recVal + ' out of ' + spDiaLength + ' filled';
    }

    var spRepLength = userObj.sharedreports.length;
    if(spRepLength == '' || spRepLength == null){
        //document.getElementById('spReportDiv').style.display = 'none';
        //document.getElementById('noSpReportDiv').style.display = 'block';
    }else{
        
        $(userObj.sharedreports).each(function(i, def){

            window["td"+i+1]= document.createElement('td');
            window["td"+i+1].style.border = '1px solid #dddddd';
            window["td"+i+1].style.textAlign = 'left';
            window["td"+i+1].style.padding = '8px';
        
            window["td"+i+2] = document.createElement('td');
            window["td"+i+2].style.border = '1px solid #dddddd';
            window["td"+i+2].style.textAlign = 'center';
            window["td"+i+2].style.padding = '8px';
        
            window["td"+i+3] = document.createElement('td');
            window["td"+i+3].style.border = '1px solid #dddddd';
            window["td"+i+3].style.textAlign = 'center';
            window["td"+i+3].style.padding = '8px';
        
            window["td"+i+4] = document.createElement('td');
            window["td"+i+4].style.border = '1px solid #dddddd';
            window["td"+i+4].style.textAlign = 'center';
            window["td"+i+4].style.padding = '8px';

            window["td"+i+5]= document.createElement('td');
            window["td"+i+5].style.border = '1px solid #dddddd';
            window["td"+i+5].style.textAlign = 'left';
            window["td"+i+5].style.padding = '8px';
        
            window["td"+i+6] = document.createElement('td');
            window["td"+i+6].style.border = '1px solid #dddddd';
            window["td"+i+6].style.textAlign = 'center';
            window["td"+i+6].style.padding = '8px';
        
            window["td"+i+7] = document.createElement('td');
            window["td"+i+7].style.border = '1px solid #dddddd';
            window["td"+i+7].style.textAlign = 'center';
            window["td"+i+7].style.padding = '8px';
        
            window["td"+i+8] = document.createElement('td');
            window["td"+i+8].style.border = '1px solid #dddddd';
            window["td"+i+8].style.textAlign = 'center';
            window["td"+i+8].style.padding = '8px';

            window["td"+i+9] = document.createElement('td');
            window["td"+i+9].style.border = '1px solid #dddddd';
            window["td"+i+9].style.textAlign = 'center';
            window["td"+i+9].style.padding = '8px';
        
            window["td"+i+10] = document.createElement('td');
            window["td"+i+10].style.border = '1px solid #dddddd';
            window["td"+i+10].style.textAlign = 'center';
            window["td"+i+10].style.padding = '8px';
                
            $('#spTBody').append($("<tr>")
            .append($(window["td"+i+1]).append(i + 1))
            .append($(window["td"+i+2]).append(def.startDate))
            .append($(window["td"+i+3]).append(def.endDate))
            .append($(window["td"+i+4]).append(def.averageBedtime))
            .append($(window["td"+i+5]).append(formatTime(def.sleeplatency)))
            .append($(window["td"+i+6]).append(def.averagenumberofawakenings))
            .append($(window["td"+i+7]).append(formatTime(def.waso)))
            .append($(window["td"+i+8]).append(formatTime(def.tib)))
            .append($(window["td"+i+9]).append(formatTime(def.tst)))
            .append($(window["td"+i+10]).append(def.se)));
        
        });

        document.getElementById('spReportDiv').style.display = 'block';
    }

    y.style.display = 'block';
    x.style.display = 'none';
    z.style.display = 'none';
    
}//end of function getPatDetail

function retrieveRefCode(){
    var x = document.getElementById('patientListTB');
    var y = document.getElementById('printSampleRecov');
    var z = document.getElementById('patientSpace');
    var rowId = event.target.parentNode.parentNode.id; 
    //this gives id of tr whose button was clicked 
    var data = document.getElementById(rowId).querySelectorAll("td");    
    /*returns array of all elements  within the row with given id*/ 
    //var pID = data[0].innerHTML; 
    //console.log(rowId)
    //console.log(pID)
    //alert("Patient ID: " + pID); 
    let url = urlDomain + 'insomnia/v1/patient/retrieveRefcode/'+ rowId;  

    let authToken = window.localStorage.getItem("token");
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
            
            document.getElementById('refCodeRecov').innerHTML = result.referalCode;
            // document.getElementById('usName').innerHTML = result.userName;
            // document.getElementById('ps').innerHTML= result.password;
            y.style.display = 'block';         
            x.style.display = 'none';
            z.style.display = 'none';
        }, 
        error: function(msg){
            sweetAlert("Unable to retrieve Referral Code!","Please try again shortly","error");
        }
    });

}

function PrintDivRecov() {  
    var divContents = document.getElementById("printdivcontentRecovery").innerHTML;  
    var printWindow = window.open('', '', 'height=800,width=800');  
    printWindow.document.write('<html><head><title>Health enSuite Team</title>');  
    printWindow.document.write('</head><body >');  
    printWindow.document.write(divContents);  
    printWindow.document.write('</body></html>');  
    printWindow.document.close();  
    printWindow.print();  
} 

function populateTB(){
    var name = document.getElementById('nameSearch').value;
    let marchVal = 0;
    let p = 0;
    var patObj = window.localStorage.getItem("providerPatientsObj");
    let users = JSON.parse(patObj);
    $("#patTB").find("tbody").empty();

    //let pt = userObj.sleepDiaries;
    $.each(users, function(i, def) {
        /// do stuff
        if (def.lastName.toLowerCase().includes(name.toLowerCase())){
            if(def.trialType == 1){
                trialName = "Health enSuite Insomnia Study";
            }else{
                trialName = "Health enSuite Insomnia and deprescribing Study";
            }
    
            var myGend = "";
            if(def.gender == "MALE"){
                myGend = "Male";
            }else if(def.gender == "FEMALE"){
                myGend = "Female";
            }else if(def.gender == "OTHER"){
                myGend = "Other";
            }
    
            p++
            $("#patientTBody").append($("<tr>").attr({"id": def.id})
                .append($("<td class ='id_event'>").append(p))
                .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.firstName + "'/>"))
                .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.lastName + "'/>"))
                .append($("<td>").append(def.age))
                .append($("<td>").append(myGend))
                .append($("<td>").append(trialName))
                .append($("<td>").append(def.appRecommendationDate))
                .append($("<td>").append("<input type='button' class='btn-primary' value='Retrieve RefCode' onclick='retrieveRefCode()'/>")))
                    //console.log(def.lastName);
            marchVal++;
        }
        //console.log("Apend"+marchVal)
    });

    if(marchVal == 0){

        $.each(users, function(i, def) {
            /// do stuff
                if(def.trialType == 1){
                    trialName = "Health enSuite Insomnia Study";
                }else{
                    trialName = "Health enSuite Insomnia and deprescribing Study";
                }
        
                var myGend = "";
                if(def.gender == "MALE"){
                    myGend = "Male";
                }else if(def.gender == "FEMALE"){
                    myGend = "Female";
                }else if(def.gender == "OTHER"){
                    myGend = "Other";
                }
        
                $("#patientTBody").append($("<tr>").attr({"id": def.id})
                    .append($("<td class ='id_event'>").append(i + 1))
                    .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.firstName + "'/>"))
                    .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.lastName + "'/>"))
                    .append($("<td>").append(def.age))
                    .append($("<td>").append(myGend))
                    .append($("<td>").append(trialName))
                    .append($("<td>").append(def.appRecommendationDate))
                    .append($("<td>").append("<input type='button' class='btn-primary' value='Retrieve RefCode' onclick='retrieveRefCode()'/>")))
                        //console.log(def.lastName);
                //marchVal++;
        });
        //console.log("Apendes"+marchVal)

    }


    
    // let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/search/' + name;
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
    //         var data = result;
    //         $("#patTB").find("tbody").empty(); //clear all the content from tbody here.
            
    //         //$.each(result, function() {
                
    //             $(result).each(function(i, def) {
    //             /// do stuff
    //             //alert(def.firstName);
    //             $("#patientTBody").append($("<tr>").attr({"id": def.id})
    //                 .append($("<td class ='id_event'>").append(i + 1))
    //                 .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.firstName + "'/>"))
    //                 .append($("<td>").append("<input type='button' class='patNametxt' onclick='getPatDetatail()' value='" + def.lastName + "'/>"))
    //                 .append($("<td>").append(def.age))
    //                 .append($("<td>").append(myGend))
    //                 .append($("<td>").append(trialName))
    //                 .append($("<td>").append(def.appRecommendationDate))
    //                 .append($("<td>").append("<input type='button' class='btn-primary' value='Retrieve RefCode' onclick='retrieveRefCode()'/>")))
    //         });
            
    //         // });

    //     }, 
    //     error: function(msg){
    //         console.log("Loading Patient search details failed");
    //     }
    // });
}


function formatTime(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return  rhours + " hour(s) and " + rminutes + " minute(s).";
}


function backDisplay(one, two) {
    var x = document.getElementById(one);
    var y = document.getElementById(two);

    window.location.href = "patient-list.html";
}



