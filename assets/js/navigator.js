

$(document).ready(function () {

    //Navigate to Provider Login Page
    $('.btnProvider').on('click', function(event){
        event.preventDefault();
        
        window.location.href = "./Providers/provider-login.html";
        
    });

    //Navigate to Patient Login Page
    $('.btnPatient').on('click', function(event){
        event.preventDefault();
        
        window.location.href = "./Insomnia/patient-login.html";
        
    });


});