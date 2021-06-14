var urlDomain = 'http://healthensuit-env.eba-ippzhmtu.ca-central-1.elasticbeanstalk.com/';

function getQuestionValues(formID, elementName) {
    var abouts = document.forms[formID].elements[elementName];
    var aboutInfos = 0; 

    for (i = 0; i < abouts.length; i++) {    
        if(abouts[i].checked == true){        
            aboutInfos =  abouts[i].value;               
        } 
    }
    return aboutInfos;
}

function getCheckedValues(formID, elementName) {
    var abouts = document.forms[formID].elements[elementName];
    var aboutInfos = ""; 

    for (i = 0; i < abouts.length; i++) {    
        if(abouts[i].checked == true){        
            aboutInfos +=  abouts[i].value;               
        } 
    }
    return aboutInfos;
}

function getMultipleCheckedValues(formID, elementName) {
    var abouts = document.forms[formID].elements[elementName];
    var aboutInfos = ""; 

    for (i = 0; i < abouts.length; i++) {    
        if(abouts[i].checked == true){        
            aboutInfos +=  abouts[i].value + ", ";               
        } 
    }
    return aboutInfos;
}


$(document).ready(function () {

//Submit Baseline Questionnaire
    $('#btnSubmitBaseline').on('click', function(event){
        event.preventDefault();

        var diffAsleep = getQuestionValues('myBaselineForm', 'optFall');
        let difficulty_falling_asleep = parseInt(diffAsleep);
        var diffStay = getQuestionValues('myBaselineForm', 'optStay');
        let difficulty_staying_asleep = parseInt(diffStay);
        var probWake = getQuestionValues('myBaselineForm', 'optWake');
        let problem_waking_up_too_early = parseInt(probWake);
        var satSleep = getQuestionValues('myBaselineForm', 'optSat');
        let satisfied_with_your_current_sleep_pattern = parseInt(satSleep);
        var sleepAffect = getQuestionValues('myBaselineForm', 'optMuch');
        let how_does_your_sleeping_problem_affect_your_day = parseInt(sleepAffect);
        var sleepProb = getQuestionValues('myBaselineForm', 'optEffect');
        let how_visible_is_your_sleeping_problem = parseInt(sleepProb);
        var worriedSleep = getQuestionValues('myBaselineForm', 'optWorry');
        let worried_about_your_current_sleep_problem = parseInt(worriedSleep);
        var windDown = getQuestionValues('myBaselineForm', 'wind');
        let hard_to_wind_down = parseInt(windDown);
        var mouthDry = getQuestionValues('myBaselineForm', 'dry');
        let dryness_of_my_mouth = parseInt(mouthDry);
        var fellAtAll = getQuestionValues('myBaselineForm', 'feel');
        let experience_any_positive_feeling_at_all = parseInt(fellAtAll);
        var brathDiff = getQuestionValues('myBaselineForm', 'breath');
        let experienced_breathing_difficulty = parseInt(brathDiff);
        var workDiff = getQuestionValues('myBaselineForm', 'work');
        let found_it_difficult_to_work_up_the_initiative = parseInt(workDiff);
        var overRe = getQuestionValues('myBaselineForm', 'over');
        let tended_to_overreact_to_situations = parseInt(overRe);
        var expTremb = getQuestionValues('myBaselineForm', 'tremb');
        let experienced_trembling = parseInt(expTremb);
        var nerveEnergy = getQuestionValues('myBaselineForm', 'nerve');
        let using_a_lot_of_nervous_energy = parseInt(nerveEnergy);
        var sitWorried = getQuestionValues('myBaselineForm', 'panic');
        let worried_about_situations = parseInt(sitWorried);
        var nothingForward = getQuestionValues('myBaselineForm', 'forward');
        let felt_that_I_had_nothing_to_look_forward_to = parseInt(nothingForward);
        var foundAgit = getQuestionValues('myBaselineForm', 'agit');
        let found_myself_getting_agitated = parseInt(foundAgit);
        var diffRelax = getQuestionValues('myBaselineForm', 'relax');
        let found_it_difficult_to_relax = parseInt(diffRelax);
        var feltDown = getQuestionValues('myBaselineForm', 'down');
        let felt_down_hearted_and_blue = parseInt(feltDown);
        var intolAny = getQuestionValues('myBaselineForm', 'intol');
        let intolerant_of_anything = parseInt(intolAny);
        var closePanic = getQuestionValues('myBaselineForm', 'panics');
        let was_close_to_panic = parseInt(closePanic);
        var enthUnable = getQuestionValues('myBaselineForm', 'enth');
        let unable_to_become_enthusiastic = parseInt(enthUnable);
        var worthMuch = getQuestionValues('myBaselineForm', 'worth');
        let wasnt_worth_much = parseInt(worthMuch);
        var tch = getQuestionValues('myBaselineForm', 'torchy');
        let touchy = parseInt(tch);
        var heartAb = getQuestionValues('myBaselineForm', 'heart');
        let absence_of_physical_exertion = parseInt(heartAb);
        var anyGood = getQuestionValues('myBaselineForm', 'scared');
        let scared_without_any_good_reason = parseInt(anyGood);
        var meanLife = getQuestionValues('myBaselineForm', 'life');
        let life_was_meaningless = parseInt(meanLife);

        var been_diagnosed_with_any_chronic_health_condition = document.getElementById("diagnoseTxt").value;
        var list_all_medications = document.getElementById("medTxt").value;
        var drink_alcohol = document.getElementById("drinkTxt").value;
        var smoke_cigarettes = document.getElementById("cigTxt").value;
        var drink_caffeinated_beverages = document.getElementById("caffTxt").value;
        var participated_in_the_past = getCheckedValues('myBaselineForm', 'partcip');
        var highest_level_of_schooling = getCheckedValues('myBaselineForm', 'sch');
        var schOtherTxt = document.getElementById("schOtherTxt").value;
        if(highest_level_of_schooling == 'Other'){
            highest_level_of_schooling = schOtherTxt;
        }
        var current_employment_status = getMultipleCheckedValues('myBaselineForm', 'employ');
        var employOtherTxt = document.getElementById("employOtherTxt").value;
        if(current_employment_status == 'Other'){
            current_employment_status = employOtherTxt;
        }
        var gross_household_income = getCheckedValues('myBaselineForm', 'income');
        var born_in_Canada = getCheckedValues('myBaselineForm', 'born');
        var bornTxt = document.getElementById("bornTxt").value;
        if(born_in_Canada == 'Other'){
            born_in_Canada = bornTxt;
        }
        var living_in_Canada = getMultipleCheckedValues('myBaselineForm', 'race');
        var current_marital_status = getCheckedValues('myBaselineForm', 'marital');

        let authToken = window.localStorage.getItem("patientBaselineToken");
        //let authToken = 'Z3a6OQ+aLlcfHdMGSq10wLMvbKEIrAOuTRAU0YplEnY=';
        let url = urlDomain + 'insomnia/v1/patient/baseline';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
            },
            data: JSON.stringify({
                "difficulty_falling_asleep": difficulty_falling_asleep,
                "difficulty_staying_asleep": difficulty_staying_asleep,
                "problem_waking_up_too_early": problem_waking_up_too_early,
                "satisfied_with_your_current_sleep_pattern": satisfied_with_your_current_sleep_pattern,
                "how_does_your_sleeping_problem_affect_your_day": how_does_your_sleeping_problem_affect_your_day,
                "how_visible_is_your_sleeping_problem": how_visible_is_your_sleeping_problem,
                "worried_about_your_current_sleep_problem": worried_about_your_current_sleep_problem,
                "hard_to_wind_down": hard_to_wind_down,
                "dryness_of_my_mouth": dryness_of_my_mouth,
                "experience_any_positive_feeling_at_all": experience_any_positive_feeling_at_all,
                "experienced_breathing_difficulty": experienced_breathing_difficulty, 
                "found_it_difficult_to_work_up_the_initiative": found_it_difficult_to_work_up_the_initiative,
                "tended_to_overreact_to_situations": tended_to_overreact_to_situations,
                "experienced_trembling": experienced_trembling,
                "using_a_lot_of_nervous_energy": using_a_lot_of_nervous_energy,
                "worried_about_situations": worried_about_situations,
                "felt_that_I_had_nothing_to_look_forward_to": felt_that_I_had_nothing_to_look_forward_to,
                "found_myself_getting_agitated": found_myself_getting_agitated,
                "found_it_difficult_to_relax": found_it_difficult_to_relax,
                "felt_down_hearted_and_blue": felt_down_hearted_and_blue,
                "intolerant_of_anything": intolerant_of_anything,
                "was_close_to_panic": was_close_to_panic,
                "unable_to_become_enthusiastic": unable_to_become_enthusiastic,
                "wasnt_worth_much": wasnt_worth_much,
                "touchy": touchy,
                "absence_of_physical_exertion": absence_of_physical_exertion,
                "scared_without_any_good_reason": scared_without_any_good_reason,
                "life_was_meaningless": life_was_meaningless,
                "been_diagnosed_with_any_chronic_health_condition": been_diagnosed_with_any_chronic_health_condition,
                "list_all_medications": list_all_medications,
                "drink_alcohol": drink_alcohol,
                "smoke_cigarettes": smoke_cigarettes,
                "drink_caffeinated_beverages": drink_caffeinated_beverages,
                "participated_in_the_past": participated_in_the_past,
                "highest_level_of_schooling": highest_level_of_schooling,
                "current_employment_status": current_employment_status,
                "gross_household_income": gross_household_income,
                "born_in_Canada": born_in_Canada,
                "living_in_Canada": living_in_Canada,
                "current_marital_status": current_marital_status
                }),
            success: function(result){
                console.log(result);
                console.log("Baseline Token: " + authToken);
                swal({title: "Thanks!", text: "Your Baseline Questionnaire Has Been Submitted!", type: "success"},
                function(){ 
                    window.location.href = "baseline-completed.html";
                }
                );
            }, 
            error: function(msg){
                sweetAlert("Unable to submit your baseline questionnaire","Please try again shortly","error");
                console.log("Baseline Token: " + authToken);
                //sweetAlert("Token!", authToken, "info");
            }
            
        });
    });

});

