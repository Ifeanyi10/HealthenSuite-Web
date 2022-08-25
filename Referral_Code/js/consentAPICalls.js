var urlDomain = 'https://api.healthensuite.com/';
// var urlDomain = 'https://apiv3.healthensuite.com/';

emailIsElligible = false;
var phoneInput = "";
var fullPhoneNumber = "";

function validateEmail(){
    //var bt = document.getElementById('btnConcentSubmit');
    var password = $("#patEmail").val();
    var confirm_password = $("#patEmailVer").val();
    var patientNum = $("#patLNum").val();
    // twoEmaildata = validateTwoEmails(password, confirm_password);
    // mobileNumberData = validateMobile(patientNum);
    // if( twoEmaildata && mobileNumberData){
    //     bt.disabled = false;
    // }else{
    //     bt.disabled = true;
    // } 
    if(password != ""){$("#emailError").html("");}
  }

  function validateTwoEmails(){
    var password = $("#patEmail").val();
    var confirm_password = $("#patEmailVer").val();
    var valid = false;
    if(password == confirm_password && isEmail(confirm_password)) {
        valid = true;
        $("#divCheckEmailMatch").html(" ");
    } else {
        valid = false;
        $("#divCheckEmailMatch").html("Please re-type the same email you provided above.");
    }
    return valid;
  }

  function validateMobile(){
    var patientNum = $("#patLNum").val();
    var mobileIsgood = false;
    if(patientNum != ''){
        var isValidNum = phoneInput.isValidNumber();
        // if(isMobile(patientNum)){
        if(isValidNum){
            mobileIsgood = true;
            $("#mobileNumberError").html(" ");
            fullPhoneNumber = phoneInput.getNumber();
            console.log('Full Phone phone number: '+fullPhoneNumber)
        }else{
            mobileIsgood = false;
            $("#mobileNumberError").html("Ensure you a valid mobile number.");
        }
    }else{$("#mobileNumberError").html("Please enter your mobile number.");}
    
    return mobileIsgood;
  }


  var radioState = false;
    function saveNotShare(element){
        if(radioState == false) {
            check();
            radioState = true;
        }else{
            uncheck();
            radioState = false;
        }
    }
    function check() {
        document.getElementById("doNotShare").checked = true;
    }
    function uncheck() {
        document.getElementById("doNotShare").checked = false;
    }

  function isEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
  };

  function isMobile(ph) {
    //var phoneno = /^\+?([1]{1})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var phoneno = /^[+]?[1]?[-. (]?([0-9]{3})[)-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(ph.match(phoneno)){
        return true;
    }else{
        return false;
    }
  }


  function validateEmailfrombackend(currentEmail){
    let url = urlDomain + 'insomnia/v1/patient/checkEmail';
    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': '*/*'
        },
        data: JSON.stringify({"code": currentEmail}),
        success: function(result){
            console.log(result);
            // Finally update the state for the current field
            if (!result) {
                emailIsElligible = true;
                $("#emailError").html("");
                $(this).css("border","1px solid #BCBCBC");
                console.log("This returned 1: "+result)
            } else{
                emailIsElligible = false;
                $("#emailError").html("Email address exist");
                //sweetAlert("Email address exist!","","error");
                var content = "<span style='font-weight: bold'>Email address exist.</span> <span>Please use another email address.</span>";
                swal({title: "", text: content, html: true});
                //bt.disabled = true;
                $(this).css("border","1px solid red");
                console.log("This returned 2: "+result)
            } 
            
        }, 
        error: function(msg){
            emailIsElligible = false;
            $("#emailError").html("Email address exist");
            //sweetAlert("Email address exist!","","error");
            var content = "<span style='font-weight: bold'>Email address exist.</span> <span>Please use another email address.</span>";
            swal({title: "", text: content, html: true});
            //bt.disabled = true;
            $(this).css("border","1px solid red");
            console.log("This returned 3: "+msg)
        }
    });
  }

 
 $(document).ready(function () {

    const phoneInputField = document.querySelector("#patLNum");
    phoneInput = window.intlTelInput(phoneInputField, {
            initialCountry: "CA",
            nationalMode: true,
            separateDialCode: true,
            preferredCountries: ["CA", "US"],
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });


    $('[data-toggle="tooltip"]').tooltip();

    //var bt = document.getElementById('btnConcentSubmit');
    //bt.disabled = true;

    $("#patEmailVer").keyup(validateTwoEmails);
    $("#patLNum").keyup(validateMobile);
    $("#patEmail").keyup(validateEmail);
    //$("#patEmail, #patEmailVer, #patLNum").keyup(validateEmail);

    //validate provider email
    $('#patEmail').on('blur', function(e) {
        //var bt = document.getElementById('btnConcentSubmit');
        // Current email input
        var currentEmail = e.target.value,
            $emailNode = $(this),
            isValid = true;

        // Validate email
        if(currentEmail != ""){
            if (!isEmail(currentEmail)){
                $("#emailError").html("Invalid email address. Enter a valid email address.");
                return;
            }
        }else{
            $("#emailError").html("Please enter an email address.");
            return;
        }
        
        validateEmailfrombackend(currentEmail);
        
        
        // Validate email
        // if (!isEmail(currentEmail)){
        //     $("#divCheckEmailMatch").html("Invalid email address pattern");
        //     bt.disabled = true;
        //     $(this).css("border","1px solid red");
        // }else{
        //     $(this).css("border","1px solid #BCBCBC");
        // }
        
    });


    $('#patLNum').on('blur', function(e) {
        //var bt = document.getElementById('btnConcentSubmit');
        var currentphone = e.target.value,
            $phNode = $(this),
            isValid = true;
        
        // Validate phone Number
        var isValidNum = phoneInput.isValidNumber();
        // if (!isMobile(currentphone)){
        if (!isValidNum){
            //bt.disabled = true;
            $("#mobileNumberError").html("Ensure you a valid mobile number.");
            $(this).css("border","1px solid red");
        }else{
            //bt.disabled = false;
            $("#mobileNumberError").html(" ");
            $(this).css("border",".5px solid #BCBCBC");
            fullPhoneNumber = phoneInput.getNumber();
            console.log('Full Phone phone number: '+fullPhoneNumber)
        }

    });


    //Submit Consent
    $('#btnConcentSubmit').on('click', function(event){
        event.preventDefault();
        var patEmail = document.getElementById('patEmail').value;
        // var patientNum = document.getElementById('patLNum').value;
        var patientToken = window.localStorage.getItem("patToken");
        let url = urlDomain + 'insomnia/v1/patient/consent';

        validateEmailfrombackend(patEmail);
        var emailsMatched = validateTwoEmails();
        var numberIsGood = validateMobile();

        if(emailIsElligible && emailsMatched && numberIsGood){
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*',
                    'Authorization': 'Bearer '+ patientToken             
                },
                data: JSON.stringify({"email": patEmail, "phoneNumber": fullPhoneNumber}),
                success: function(result){
                    var eligibitySubmitted = false;
                    window.localStorage.setItem("eligibitySubmitted", eligibitySubmitted);
                    swal({title: "Health enSuite Welcomes You", text: "Thank you for agreeing to participate in this study. Please check your email address within the next 2 business days. The email contains your participation confirmation, a copy of your completed consent form and information about the next steps.", type: "success"},
                    function(){ 
                        window.location.href = "referral.html";
                    }
                    );
                    
                }, 
                error: function(msg){
                    //$("#errorContainer").html("Incorrect Username or Password");
                    //sweetAlert("Unable to submit consent!","Please try again shortly","error");
                    var content = "<span style='font-weight: bold'>Unable to submit consent.</span> <span>Please try again shortly.</span>";
                    swal({title: "", text: content, html: true});
                }
            });
        }else{
            //sweetAlert("Email address exist!","Please use another email address","error");
            
            if(patEmail == ""){
                var content = "<span style='font-weight: bold'>Attention.</span> <span>Please enter an email address.</span>";
                swal({title: "", text: content, html: true});
                $("#emailError").html("Please enter an email address.");
            }
        }

        // html2canvas(document.querySelector("#consBody"), {
        //     onrendered: function(canvas) {
      
        //       var img = canvas.toDataURL("image/png");
        //       var doc = new jsPDF();
        //       doc.addImage(img, 'JPEG', 20, 20);
        //       doc.save('test.pdf');
        //     }
      
        //   });

        // var options = {};
        // var pdf = new jsPDF('p', 'pt', 'a4');
        // pdf.addHTML($("#consBody"), 15, 15, options, function() {
        //     pdf.save('pageContent.pdf');
        // });

        // var doc = new jsPDF();
        // var specialElementHandlers = {
        //     '#consBody': function (element, renderer) {
        //         return true;
        //     }
        // };

        // doc.fromHTML($('#consBody').html(), 15, 15, {
        //     'width': 170,
        //         'elementHandlers': specialElementHandlers
        // });
        // doc.save('sample-file.pdf');

        // var x = document.getElementById('consBody');
        // var y = document.getElementById('editor');

        // x.style.display = 'none';
        // y.style.display = 'block';
        

        //The code below is for arranging the consent page before download

        // $(".scrollit").css("overflow","hidden");
        // $(".scrollit").css("max-height","2000px");
        // $(".continue").css("display","none");
        // $(".empt").css("display","none");

        // $("#first").css("display","block");
        // $("#second").css("display","block");
        // $("#ans1").css("display","block");
        // $("#third").css("display","block");
        // $("#ans2").css("display","block");
        // $("#fourth").css("display","block");
        // $("#ans3").css("display","block");

        // $("#fifth").css("display","block");
        // $("#ans4").css("display","block");

        // $("#sixth").css("display","block");
        // $("#ans5").css("display","block");

        // $("#seventh").css("display","block");
        // $("#ans6").css("display","block");

        // $("#eight").css("display","block");
        // $("#ans7").css("display","block");
        
        // $("#nineth").css("display","block");
        // $("#ans8").css("display","block");

        // $("#tenth").css("display","block");
        
        // $("#eleventh").css("display","block");

        // $("#twelveth").css("display","block");
        // $("#ans9").css("display","block");

        // $("#thirteenth").css("display","block");
        // $("#ans10").css("display","block");

        // $("#fourteenth").css("display","block");

        // $("#fifteenth").css("display","block");

        // $("#sixteenth").css("display","block");

        // $("#seventeenth").css("display","block");

        // $("#eighteenth").css("display","block");

        // $("#nineteenth").css("display","block");

        // $("#twentieth").css("display","block");

        // $("#twentieth").css("margin-top","130px");

        //The code up is for arranging the consent page before download

        // var options = {};
        // var pdf = new jsPDF('p', 'pt', 'a4');
        // pdf.addHTML($("#consBody"), 15, 15, options, function() {
        //     pdf.save('pageContent.pdf');
        // });
        
        //makePDF();

    });

    // $('#btnExtract').on('click', function(event){
    //     event.preventDefault();
    //     makePDF();

    //     //PrintReportDiv();

    //     // var doc = new jsPDF();
    //     // var elementHTML = $('#editorConsentForm').html();
    //     // var specialElementHandlers = {
    //     //     '#elementH': function (element, renderer) {
    //     //         return true;
    //     //     }
    //     // };
    //     // doc.fromHTML(elementHTML, 15, 15, {
    //     //     'width': 170,
    //     //     'elementHandlers': specialElementHandlers
    //     // });

    //     // var doc = new jsPDF();
    //     // var specialElementHandlers = {
    //     //     '#editorConsentForm': function (element, renderer) {
    //     //         return true;
    //     //     }
    //     // };

    //     // doc.fromHTML($('#editorConsentForm').html(), 15, 15, {
    //     //     'width': 170,
    //     //         'elementHandlers': specialElementHandlers
    //     // });
    //     //doc.save('sample-file.pdf');
    // });

 });


//  function PrintReportDiv() {  
//     var patName =  "Health enSuite Consent Form";
//     var divContents = document.getElementById("editorConsentForm").innerHTML;  
//     var printWindow = window.open('', '', 'height=800,width=800');  
//     printWindow.document.write('<html><head><title>');  
//     printWindow.document.write(patName); 
//     printWindow.document.write('</title>'); 
//     printWindow.document.write('</head><body >');  
//     printWindow.document.write(divContents);  
//     printWindow.document.write('</body></html>');  
//     printWindow.document.close();  
//     printWindow.print();  
// } 
 

 function makePDF() {

    var quotes = document.getElementById('consBody');
    html2canvas(quotes, {
           onrendered: function(canvas) {
         //! MAKE YOUR PDF
         var pdf = new jsPDF('p', 'pt', 'letter');

         for (var i = 0; i <= quotes.clientHeight/980; i++) {
             //! This is all just html2canvas stuff
             var srcImg  = canvas;
             var sX      = 0;
             var sY      = 980*i; // start 980 pixels down for every new page
             var sWidth  = 900;
             var sHeight = 980;
             var dX      = 0;
             var dY      = 0;
             var dWidth  = 900;
             var dHeight = 980;

             window.onePageCanvas = document.createElement("canvas");
             onePageCanvas.setAttribute('width', 900);
             onePageCanvas.setAttribute('height', 980);
             var ctx = onePageCanvas.getContext('2d');
             // details on this usage of this function: 
             // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
             ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

             // document.body.appendChild(canvas);
             var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

             var width         = onePageCanvas.width;
             var height        = onePageCanvas.clientHeight;

             //! If we're on anything other than the first page,
             // add another page
             if (i > 0) {
                 pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
             }
             //! now we declare that we're working on that page
             pdf.setPage(i+1);
             //! now we add content to that page!
             pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));

         }
         //! after the for loop is finished running, we save the pdf.
         pdf.save('Test.pdf');

        }
     
   });
 }