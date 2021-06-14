
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    function returnValidate(){

    }
    $('.validate-form').on('submit',function(event){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }else{
                event.preventDefault();
                var refCode = $('refCode');
                let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/authentication/login';
                $.ajax({
                    url: url,
                    type: 'POST',
                    contentType: "application/json",
                    data: JSON.stringify({"refcode": refCode.val()}),
                    success: function(result){
                        let fName = result[0].name;
                        let sName = result[1].surname;
                        $.session.set('firstName', fName);
                        $.session.set('lastName', sName);
                        window.location.href = "patientInfo.html";
                    }, 
                    error: function(msg){
                        //$("#errorContainer").html("Incorrect Username or Password");
                        sweetAlert("Oops...","Invalid Refernce Code!!","error");
                    }
                });
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);