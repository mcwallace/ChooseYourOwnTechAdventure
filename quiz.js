// Quiz result options in a separate object for flexibility
var index_map = {   games : 0,
                    frontend : 1,
                    backend : 2 
                };
var career_map = ["games","frontend", "backend"];

var results_arr = [
                [3, 5, 4, 1], 
                [2, 1, 5, 4],
                [2, 4, 2, 1]
                ];

var resultOptions = [
    {   title: "Frontend Developer",
        desc: "Frontend developers work with Javascript, HTML, and CSS to make the wireframe created by the backend developers palettable to human eyes and hands. It's similar to UX/UI.",
        pros: "You'll be working heavily with your team of developers, as well as your clients. There's incredible opportunity for creativity in this field, and your work is seen by clients and customers.",
        cons: "You'll have to interact with clients."
    },
    {   title: "Frontend Developer",
        desc: "Frontend developers work with Javascript, HTML, and CSS to make the wireframe created by the backend developers palettable to human eyes and hands. It's similar to UX/UI.",
        pros: "You'll be working heavily with your team of developers, as well as your clients. There's incredible opportunity for creativity in this field, and your work is seen by clients and customers.",
        cons: "You'll have to interact with clients."
    },
    {   title: "Frontend Developer",
        desc: "Frontend developers work with Javascript, HTML, and CSS to make the wireframe created by the backend developers palettable to human eyes and hands. It's similar to UX/UI.",
        pros: "You'll be working heavily with your team of developers, as well as your clients. There's incredible opportunity for creativity in this field, and your work is seen by clients and customers.",
        cons: "You'll have to interact with clients."
    },
    {   title: "Frontend Developer",
        desc: "Frontend developers work with Javascript, HTML, and CSS to make the wireframe created by the backend developers palettable to human eyes and hands. It's similar to UX/UI.",
        pros: "You'll be working heavily with your team of developers, as well as your clients. There's incredible opportunity for creativity in this field, and your work is seen by clients and customers.",
        cons: "You'll have to interact with clients."
    },
    {   title: "Frontend Developer",
        desc: "Frontend developers work with Javascript, HTML, and CSS to make the wireframe created by the backend developers palettable to human eyes and hands. It's similar to UX/UI.",
        pros: "You'll be working heavily with your team of developers, as well as your clients. There's incredible opportunity for creativity in this field, and your work is seen by clients and customers.",
        cons: "You'll have to interact with clients."
    },
    {   title: "Frontend Developer",
        desc: "Frontend developers work with Javascript, HTML, and CSS to make the wireframe created by the backend developers palettable to human eyes and hands. It's similar to UX/UI.",
        pros: "You'll be working heavily with your team of developers, as well as your clients. There's incredible opportunity for creativity in this field, and your work is seen by clients and customers.",
        cons: "You'll have to interact with clients."
    },
    {   title: "Frontend Developer",
        desc: "Frontend developers work with Javascript, HTML, and CSS to make the wireframe created by the backend developers palettable to human eyes and hands. It's similar to UX/UI.",
        pros: "You'll be working heavily with your team of developers, as well as your clients. There's incredible opportunity for creativity in this field, and your work is seen by clients and customers.",
        cons: "You'll have to interact with clients."
    },
    {   title: "Frontend Developer",
        desc: "Frontend developers work with Javascript, HTML, and CSS to make the wireframe created by the backend developers palettable to human eyes and hands. It's similar to UX/UI.",
        pros: "You'll be working heavily with your team of developers, as well as your clients. There's incredible opportunity for creativity in this field, and your work is seen by clients and customers.",
        cons: "You'll have to interact with clients."
    },
    {   title: "Frontend Developer",
        desc: "Frontend developers work with Javascript, HTML, and CSS to make the wireframe created by the backend developers palettable to human eyes and hands. It's similar to UX/UI.",
        pros: "You'll be working heavily with your team of developers, as well as your clients. There's incredible opportunity for creativity in this field, and your work is seen by clients and customers.",
        cons: "You'll have to interact with clients."
    },
    {   title: "Frontend Developer",
        desc: "Frontend developers work with Javascript, HTML, and CSS to make the wireframe created by the backend developers palettable to human eyes and hands. It's similar to UX/UI.",
        pros: "You'll be working heavily with your team of developers, as well as your clients. There's incredible opportunity for creativity in this field, and your work is seen by clients and customers.",
        cons: "You'll have to interact with clients."
    },
];



var ans_array = [5, 5, 5, 5] ; 
    
// global variables
var quizSteps = $('#quizzie .quiz-step'),
    totalScore = 0;

// for each step in the quiz, add the selected answer value to the total score
// if an answer has already been selected, subtract the previous value and update total score with the new selected answer value
// toggle a visual active state to show which option has been selected
quizSteps.each(function () {
    var currentStep = $(this),
        ansOpts = currentStep.children('.quiz-answer'); 
    // for each option per step, add a click listener
    // apply active class and calculate the total score
    ansOpts.each(function () {
        var eachOpt = $(this);
        eachOpt[0].addEventListener('click', check, false);
        function check() {
            var $this = $(this),
                trait = $this.attr('data-quizIndex'),
                trait_mod = parseInt($this.attr('data-quizModifier')),
                answerScore = parseInt(trait);
            // check to see if an answer was previously selected
 
            if (currentStep.children('.active').length > 0) {
                var wasActive = currentStep.children('.active'),
                    oldScoreValue = wasActive.attr('data-quizIndex'),
                    oldScore = parseInt(oldScoreValue);
                // handle visual active state
                currentStep.children('.active').removeClass('active');
                $this.addClass('active');
                // handle the score calculation
                totalScore -= oldScoreValue;
                totalScore += answerScore;
                
                calcResults(totalScore);
            } else {
                // handle visual active state
                $this.addClass('active');
                ans_array[trait-1] += trait_mod;

              //handle score calculation
                totalScore += answerScore;
                calcResults(totalScore);
                // handle current step
                updateStep(currentStep);
            }
        }
    });
});

// show current step/hide other steps
function updateStep(currentStep) {
    if(currentStep.hasClass('current')){
       currentStep.removeClass('current');
       currentStep.next().addClass('current');
    }
}

// display scoring results
function calcResults(totalScore) {
    // only update the results div if all questions have been answered
    if (quizSteps.find('.active').length == quizSteps.length){
        var resultsTitle = $('#results h1'),
            resultsDesc = $('#results .desc');
        
        // calc lowest possible score
        var lowestScoreArray = $('#quizzie .low-value').map(function() {
            return $(this).attr('data-quizIndex');
        });
        var minScore = 0;
        for (var i = 0; i < lowestScoreArray.length; i++) {
            minScore += lowestScoreArray[i] << 0;
        }
        // calculate highest possible score
        var highestScoreArray = $('#quizzie .high-value').map(function() {
            return $(this).attr('data-quizIndex');
        });
        var maxScore = 0;
        for (var i = 0; i < highestScoreArray.length; i++) {
            maxScore += highestScoreArray[i] << 0;
        }
        // calc range, number of possible results, and intervals between results
        var range = maxScore - minScore,
            numResults = resultOptions.length,
            interval = range / (numResults - 1),
            increment = '',
            n = 0; //increment index
        // incrementally increase the possible score, starting at the minScore, until totalScore falls into range. then match that increment index (number of times it took to get totalScore into range) and return the corresponding index results from resultOptions object
        while (n < numResults) {
            increment = minScore + (interval * n);
            if (totalScore <= increment) {
                // populate results
                resultsTitle.replaceWith("<h1>" + resultOptions[n].title + "</h1>");
                resultsDesc.replaceWith("<p class='desc'>" + resultOptions[n].desc + "</p>" + "<p>" + compare_results([2,4,2,1]) + "</p>");
              
                return;
            } else {
                n++;
            }
        }
    }
}

function compare_results(answer) {
    //compares the answer traits to jobs we have
    console.log(answer) ;
  for(var i = 0 ; i < results_arr.length ; i ++  ){
        var arr = results_arr[i] ; 
        console.log(arr) ;  
        if( arr == answer ) {
            var j = results_arr.indexOf(arr) ; 
            return career_map[j] ; 
        } else {
            return other_results(answer) ; 
        }
    }
}

function other_results(answer) {
    var maybe_list = ""; 
    for(var i=0; i < results_arr.length ; i++) {
        var arr = results_arr[i] ; 
        var maybe_this = 1 ; 
        for(j=0; j < arr.length ; j ++) {
            if(arr[j] > answer[j]) {
                maybe_this -= 1 ;
                console.log 
            }
        }
        if(maybe_this > 0) {
            var k = results_arr.indexOf(arr);
            maybe_list = maybe_list + " " + career_map[k] + "," ;
        }
    }
    return maybe_list ; 
}

