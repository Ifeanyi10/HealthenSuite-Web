var urlDomain = window.localStorage.getItem("urlDomain");
var sleepReporttObj = '';
var myChart1, myChart2, myChart3, myChart4;

function formatTime(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return  rhours + " hour(s) and " + rminutes + " minute(s).";
}

function PrintReportDiv() {  
    var patName =  "Health enSuite Sleep Report - " + window.localStorage.getItem("newDStart") + ' -To- ' + window.localStorage.getItem("newDEnd")  + '-' + window.localStorage.getItem("patientLastName");
    var divContents = document.getElementById("printDivContentReport").innerHTML;  
    var printWindow = window.open('', '', 'height=800,width=800');  

    var imgData = document.getElementById('container').toDataURL('image/png', 1.0);
    var imgData2 = document.getElementById('container2').toDataURL('image/png', 1.0);
    var imgData3 = document.getElementById('container3').toDataURL('image/png', 1.0);
    var imgData4 = document.getElementById('container4').toDataURL('image/png', 1.0);

        var windowContent = '<div>' + divContents + '</div>';
        windowContent += '<div style="display: block; page-break-after: always;"><img src="' + imgData + '"></div><br>';
        //windowContent += '<div style="display: block; "><div><h4>All Awakenings Report</h4></div><div><img src="' + imgData2 + '"></div></div><br>';
        windowContent += '<div style="display: block; "><img src="' + imgData2 + '"></div><br>';
        windowContent += '<div style="display: block; "><img src="' + imgData3 + '"></div><br>';
        windowContent += '<div style="display: block; page-break-inside: avoid;"><img src="' + imgData4 + '"></div><br>';
        // windowContent += '<div style="align-items: center; display: flex; justify-content: center; page-break-after: always;"><h4>All Bed Time Report</h4><img src="' + imgData + '"></div><br>';
        // windowContent += '<div style="align-items: center; display: flex; justify-content: center; page-break-after: always;"><h4>All Awakenings Report</h4><img src="' + imgData2 + '"></div><br>';
        // windowContent += '<img src="' + imgData + '"><br>';
        // windowContent += '<img src="' + imgData2 + '">';


    printWindow.document.write('<html><head><title>');  
    printWindow.document.write(patName); 
    printWindow.document.write('</title>'); 
    printWindow.document.write('</head><body>');  
    //printWindow.document.write(divContents);  
    printWindow.document.write(windowContent);  
    printWindow.document.write('</body></html>');  
    printWindow.document.close();  
    printWindow.print();  
} 

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


function confirmShareReport(){

    var providerName = window.localStorage.getItem("patientProviderName");

    swal({
        title: "",
        text: "You have selected to Share your Sleep Progress Report with your healthcare provider '<strong>'"+providerName+"'</strong>'. Please re-confirm by clicking on Yes or select Cancel to go back.",
        // type: "info",
        html: true,
        showCancelButton: true,
        confirmButtonColor: "#2087c8",
        confirmButtonText: "Yes",
        cancelButtonColor: "#01AA73",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: false
        },
        function(isConfirm){
        if (isConfirm) {
            shareReport();    
        } else {
            swal.close();
        }
    });
}

//Patient SLeep Report Sharing Submission
function shareReport(){
    event.preventDefault();

    let authToken = window.localStorage.getItem("patientToken");
    let url = urlDomain + 'insomnia/v1/dashboard/sharereport';

    var providerName = window.localStorage.getItem("patientProviderName");

    if(sleepReporttObj != null){
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: sleepReporttObj,
            success: function(result){
                console.log(result);
                swal({title: "", text: "Your sleep progress report has been shared with your healthcare provider '<strong>'"+providerName+"'</strong>'.", html: true}
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to set sleep clock");
                var content = "<span style='font-weight: bold'>Unable to share your sleep report.</span> <span>Please try again shortly.</span>";
                swal({title: "", text: content, html: true});
                //sweetAlert("Unable to share your sleep report!","Please try again shortly","error");
            }
        });
    }else{
        var content = "<span style='font-weight: bold'>No sleep report to share.</span> <span>Please try again shortly.</span>";
        swal({title: "", text: content, html: true});
        //sweetAlert("No sleep report to share!","Please try again shortly","error");
    }
}


function drawLineChart2(dt1, dt2, xValues, yValues, containerID, chatTag, yAxesTitle){

    var highestVal = Math.max(...yValues);
    let maxValue = parseInt(highestVal) + 1;

    if (window.myChart2 != null) {
        window.myChart2.destroy();
    }

    window.myChart2 = new Chart(containerID, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
            fill: false,
            lineTension: 0,
            // backgroundColor: "#2087c8",
            // backgroundColor: "#ffff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "#01AA73",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                xAxes: [{
                    scaleLabel: {
                        fontSize: 12,
                        fontFamily: "sans-serif", 
                        display: true,
                        labelString: dt1 + " - " + dt2
                        // labelString: "Selected Date Range"
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0, 
                        max: maxValue,
                        beginAtZero: true,
                        callback: function(value) {if (value % 1 === 0) {return value;}}
                    },
                    scaleLabel: {
                        fontSize: 12,
                        fontFamily: "sans-serif", 
                        display: true,
                        labelString: yAxesTitle
                    }
                }],
            },
            title: {
            fontSize: 12,
            fontFamily: "sans-serif", 
            display: true,
            text: chatTag
            // text: chatTag + " " + dt1 + " To " + dt2
            }
        }
    });   
}


function drawLineChart3(dt1, dt2, xValues, yValues, containerID, chatTag, yAxesTitle){

    var highestVal = Math.max(...yValues);
    let maxValue = parseInt(highestVal) + 1;

    if (window.myChart3 != null) {
        window.myChart3.destroy();
    }

    window.myChart3 = new Chart(containerID, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
            fill: false,
            lineTension: 0,
            // backgroundColor: "#2087c8",
            // backgroundColor: "#ffff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "#01AA73",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                xAxes: [{
                    scaleLabel: {
                        fontSize: 12,
                        fontFamily: "sans-serif", 
                        display: true,
                        labelString: dt1 + " - " + dt2
                        // labelString: "Selected Date Range"
                    }
                }],
                yAxes: [{
                    ticks: {min: 0, max: maxValue},
                    scaleLabel: {
                        fontSize: 12,
                        fontFamily: "sans-serif", 
                        display: true,
                        labelString: yAxesTitle
                    }
                }],
            },
            title: {
            fontSize: 12,
            fontFamily: "sans-serif", 
            display: true,
            text: chatTag
            // text: chatTag + " " + dt1 + " To " + dt2
            }
        }
    });   
}


function drawLineChart4(dt1, dt2, xValues, yValues, containerID, chatTag, yAxesTitle){

    var highestVal = Math.max(...yValues);
    let maxValue = parseInt(highestVal) + 1;

    if (window.myChart4 != null) {
        window.myChart4.destroy();
    }

    window.myChart4 = new Chart(containerID, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
            fill: false,
            lineTension: 0,
            // backgroundColor: "#2087c8",
            // backgroundColor: "#ffff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "#01AA73",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
            }]
        },
        options: {
            legend: {display: false},
            scales: {
                xAxes: [{
                    scaleLabel: {
                        fontSize: 12,
                        fontFamily: "sans-serif", 
                        display: true,
                        labelString: dt1 + " - " + dt2
                        // labelString: "Selected Date Range"
                    }
                }],
                yAxes: [{
                    ticks: {min: 0, max: maxValue},
                    scaleLabel: {
                        fontSize: 12,
                        fontFamily: "sans-serif", 
                        display: true,
                        labelString: yAxesTitle
                    }
                }],
            },
            title: {
            fontSize: 12,
            fontFamily: "sans-serif", 
            display: true,
            text: chatTag
            // text: chatTag + " " + dt1 + " To " + dt2
            }
        }
    });   
}

function formatTimeArray(b){
    var a = []; 

    for (var i = 0; i < b.length; i++) {
        c = b[i];
        d = c.toString().replace(/^\s+|\s+$/gm,'');
        e = d.split(".", 1);
        a.push(e);
    }
    return a;
}

function formatLongDate(myDates){
    return moment(myDates).format("YYYY-MM-DD");
}
function formatLongTime(myDates){
    return moment(myDates).format("hh:mm a");
}

function getXValue(xObject, isTime){
    xObject.sort(function(a, b){return new Date(a.date) - new Date(b.date)});
    xVal = [];
    $.each(xObject, function(i, def) {
        if(isTime){
            xVal.push(def.date);
        }else{
            var newDVal = moment(def.date).format("MM-DD");
            xVal.push(newDVal);
        }
    });
    console.log("New Block Tomorrow's date is : "+xVal)
    return xVal;
}


function getYValue(yObject){
    yVal = [];
    $.each(yObject, function(i, def) {
        yVal.push(def.value);
    });
    console.log("New Block Tomorrow's Value is : "+yVal)
    return yVal;
}

function getYTimeValue(yObject){
    yVal = [];
    $.each(yObject, function(i, def) {
        yVal.push(def.time);
    });
    console.log("New Block Tomorrow's Time is : "+yVal)
    return yVal;
}


// function prepareSelectedDateArray(dt1, dt2, isTime){
//     dateArray = [];
//     let myDate1 = dt1.toString().replace(/^\s+|\s+$/gm,'');
//     var startDate = moment(myDate1).format("YYYY-MM-DD");

//     let myDate2 = dt2.toString().replace(/^\s+|\s+$/gm,'');
//     var endDate = moment(myDate2).format("YYYY-MM-DD");

//     while(startDate <= endDate){
//         dateArray.push(startDate);
//         startDate = moment(startDate).add(1, 'days').format("YYYY-MM-DD");
//         //dateArray.push(startDate);
//     }

//     if(isTime){
//         console.log("Tomorrow's date is : "+dateArray)
//         return dateArray;
//     }else{
//         dateArray2 = [];
//         for(i = 0; i < dateArray.length; i++){
//             dVal = dateArray[i];
//             var newDVal = moment(dVal).format("MM-DD");
//             dateArray2.push(newDVal);
//         }
//         console.log("Tomorrow's date is : "+dateArray2)
//         return dateArray2;
//     }
    
// }

function drawChartForTime(dt1, dt2, years, times, containerID, chatTag){

    if (window.myChart1 != null) {
        window.myChart1.destroy();
    }

    let data = years.map((year, index) => ({
        x: moment(`${year}`), 
        y: moment(`1970-02-01 ${times[index]}`).valueOf()
    }));
    
    let bckColors = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#565452", "#321456", "#129864", "#326812", "#215984"];
    
    window.myChart1 = new Chart(containerID, {
        type: 'line',
        data: {
            datasets: [
                {
                    //label: "Time",
                    fill: false,
                    // backgroundColor: "#ffff",
                    lineTension: 0,
                    pointBackgroundColor: "#01AA73",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: data,
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            scales: {
                xAxes: [
                {
                    type: 'time',
                    position: 'bottom',
                    time: {
                    displayFormats: {
                        day: 'MM-DD'
                    },
                    unit: 'day'
                    }, 
                    // ticks: {
                    //     callback: function(tick) {
                    //         console.log('Data Dates here: '+tick)
                    //         return formatLongDate(tick);
                    //     }
                    // },
                    scaleLabel: {
                        fontSize: 12,
                        fontFamily: "sans-serif", 
                        display: true,
                        labelString: dt1 + " - " + dt2
                        // labelString: "Selected Date Range"
                    }
                }
                ],
                yAxes: [
                {
                    type: 'linear',
                    position: 'left',
                    ticks: {
                    min: moment('1970-02-01 00:00:00').valueOf(),
                    max: moment('1970-02-01 23:59:59').valueOf(),
                    stepSize: 3.6e+6,
                    beginAtZero: false,
                    callback: value => {
                        let date = moment(value);
                        if(date.diff(moment('1970-02-01 23:59:59'), 'minutes') === 0) {
                        return null;
                        }
                        
                        return date.format('h A');
                        //return date.format('hh:mm a');
                    }
                    },
                    scaleLabel: {
                        fontSize: 12,
                        fontFamily: "sans-serif", 
                        display: true,
                        labelString: "Time (Hours)"
                    }
                }
                ]
            },
            tooltips: {
                callbacks: {
                    title: function() {
                        return '';
                    },
                      beforeLabel: function(tooltipItem, data) { 
                        //return formatted date
                        return formatLongDate(tooltipItem.xLabel);
                    },
                    label: function (tti, data) {
                        // Here is the trick: the second argument has the dataset label
                        return formatLongTime(tti.yLabel);
                    }
                }
            },
            title: {
            fontSize: 12,
            fontFamily: "sans-serif", 
            display: true,
            text: chatTag
            // text: chatTag + " " + dt1 + " To " + dt2
            },
            legend: {display: false},
        }
    });
}


$(document).ready(function () {

    //Patient SLeep Report Generation
    $('#btnGenReport').on('click', function(event){
        event.preventDefault();
    
        var reportDisplay = document.getElementById("reportDisplay");
        var dStart = document.getElementById("dStart").value;
        var dEnd = document.getElementById("dEnd").value;
        var newDStart = moment(dStart, "MM/DD/YYYY").format("YYYY-MM-DD")
        var newDEnd = moment(dEnd, "MM/DD/YYYY").format("YYYY-MM-DD")
        var tbID = document.getElementById("patReportTB");
        var tbPrintID = document.getElementById("patReportTBPrint");
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        if (dStart != '' && dEnd != '')  {
            let authToken = window.localStorage.getItem("patientToken");
            let url = urlDomain + 'insomnia/v1/dashboard/mysleepreport';
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*',
                    'Authorization': 'Bearer '+ authToken
                },
                data: JSON.stringify({
                    "startDate" : newDStart,
                    "endDate" : newDEnd
                    }),
                success: function(result){
                    console.log(result);
                    sleepReporttObj = JSON.stringify(result);
                    // let xValues = prepareSelectedDateArray(newDStart, newDEnd, false);
                    // let xValues2 = prepareSelectedDateArray(newDStart, newDEnd, true);
                    // let yValues = result.allAwakenings;
                    // let yValues3 = result.allTimeinBed;
                    // let yValues4 = result.allSleepHours;
                    // let times = result.allbedTime;

                    let xValues = getXValue(result.allAwakenings, false);
                    let yValues = getYValue(result.allAwakenings);
                    let yValues3 = getYValue(result.allTimeinBed);
                    let xValues3 = getXValue(result.allTimeinBed, false);
                    let yValues4 = getYValue(result.allSleepHours);
                    let xValues4 = getXValue(result.allSleepHours, false);
                    let timesX = getXValue(result.allbedTime, true);
                    let timesY = getYTimeValue(result.allbedTime)

                    // let yValues = [1.23,5.45,8.20,14.56,18.48,21.10, 23.63, 32.13];
                    // let yValues3 = [3.23,7.45,10.20,14.56,24.48,29.10, 41.63, 48.13];
                    // let yValues4 = [13.23,19.45,24.20,34.56,38.48,47.10, 56.63, 74.13];

                    // let arrayTimes = ["21:46:07.45", "21:41:14.245", "22:55:26.278", "01:14:58.214", "20:54:55.782", "23:14:04.142", "00:28:29.247", "02:35:18.214"];
                    // let times = formatTimeArray(arrayTimes);

                    drawLineChart2(newDStart, newDEnd, xValues, yValues, "container2", "All Awakenings", "No. Of Awakenings");
                    drawLineChart3(newDStart, newDEnd, xValues3, yValues3, "container3", "Total Time In Bed (TTIB)", "TTIB (Hours)");
                    drawLineChart4(newDStart, newDEnd, xValues4, yValues4, "container4", "Total Sleep Time (TST)", "TST (Hours)");
                    drawChartForTime(newDStart, newDEnd, timesX, timesY, "container", "All Bed Time");

                    // document.getElementById('repAvBedTime').innerHTML  = result.averageBedtime;
                    // document.getElementById('repAvSleepLat').innerHTML  = formatTime(result.sleeplatency);
                    // document.getElementById('repAvAwakes').innerHTML  = result.averagenumberofawakenings;
                    // document.getElementById('repAvDurationAwakes').innerHTML  = formatTime(result.waso);
                    // document.getElementById('repAvTib').innerHTML  = formatTime(result.tib);
                    // document.getElementById('repTotSpTime').innerHTML  = formatTime(result.tst);
                    // document.getElementById('repSpEfficiency').innerHTML  = result.se;
                    reportDisplay.style.display = 'block';

                    bTi = '1970-02-01 '+result.averageBedtime;
                    
                    tbID.rows[1].cells[1].innerHTML = moment(bTi).format("hh:mm A"); 
                    tbID.rows[2].cells[1].innerHTML = formatTime(result.sleeplatency);
                    tbID.rows[3].cells[1].innerHTML = result.averagenumberofawakenings;
                    tbID.rows[4].cells[1].innerHTML = formatTime(result.waso);
                    tbID.rows[5].cells[1].innerHTML = formatTime(result.tib);
                    tbID.rows[6].cells[1].innerHTML = formatTime(result.tst);
                    tbID.rows[7].cells[1].innerHTML = result.se;

                    tbPrintID.rows[1].cells[1].innerHTML = result.averageBedtime;
                    tbPrintID.rows[2].cells[1].innerHTML = formatTime(result.sleeplatency);
                    tbPrintID.rows[3].cells[1].innerHTML = result.averagenumberofawakenings;
                    tbPrintID.rows[4].cells[1].innerHTML = formatTime(result.waso);
                    tbPrintID.rows[5].cells[1].innerHTML = formatTime(result.tib);
                    tbPrintID.rows[6].cells[1].innerHTML = formatTime(result.tst);
                    tbPrintID.rows[7].cells[1].innerHTML = result.se;

                    var pName = result.firstName + ' ' + result.lastName;
                    //window.localStorage.setItem("patientsN", pName);
                    window.localStorage.setItem("newDStart", newDStart);
                    window.localStorage.setItem("newDEnd", newDEnd);

                    document.getElementById('patiName').innerHTML  = pName;
                    document.getElementById('dateGen').innerHTML  = today;
                    document.getElementById('stDate').innerHTML  = newDStart;
                    document.getElementById('enDate').innerHTML  = newDEnd;

                }, 
                error: function(msg){
                    //alert(msg)
                    $("#errorContainer").html("Unable to generate");
                    var content = "<span style='font-weight: bold'>Sleep report generation failed.</span> <span>Please try again shortly.</span>";
                    swal({title: "", text: content, html: true});
                    //sweetAlert("Sleep report generation failed!","Please try again shortly","error");
                }
            });
        }else{
            var content = "<span style='font-weight: bold'>Date intervals are required.</span> <span>Please enter date intervals to generate your sleep report.</span>";
            swal({title: "", text: content, html: true});
            //sweetAlert("Date Intervals Required!","Please enter date intervals to generate your sleep report","info");
        }
    });


    //Patient SLeep Clock Submission
    $('#btnConfirmClock').on('click', function(event){
        event.preventDefault();
    
        //var revisedbedtime = document.getElementById("clockBedTime").value;
        var revisedbedtime = reformatTime('pickBedeHour', 'pickBedMinute', 'bedAmPm');
        //var revisedrisetime = document.getElementById("clockRiseTime").value;
        var revisedrisetime = reformatTime('pickRiseHour', 'pickRiseMinute', 'riseAmPm');
        var clockBedTime =  window.localStorage.getItem("yBedTime");
        var clockRiseTime = window.localStorage.getItem("yRiseTime");

        let authToken = window.localStorage.getItem("patientToken");
        let url = urlDomain + 'insomnia/v1/dashboard/saveleepwindow';
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
                "revisedrisetime" : revisedrisetime
                }),
            success: function(result){
                console.log(result);
                swal({title: "Done", text: "Your Next Week Sleep Clock Has Been Set.", type: "success"},
                function(){ 
                    window.location.href = "patient-dashboard.html";
                }
                );
            }, 
            error: function(msg){
                if(msg.status == "511"){
                    displayQuickAlert();
                }else{
                    $("#errorContainer").html("Unable to set sleep clock");
                    var content = "<span style='font-weight: bold'>Unable to set your sleep clock for next week.</span> <span>Please try again shortly.</span>";
                    swal({title: "", text: content, html: true});
                }
                
                //sweetAlert("Unable to set your sleep clock for next week!","Please try again shortly","error");
            }
        });
    });


    // //Patient SLeep Report Sharing Submission
    // $('#btnShareReport').on('click', function(event){
        
        
    // });


});