// Quiz result options in a separate object for flexibility
var index_map = {   software : 0,
                    backend : 1,
                    frontend : 2, 
                    games : 3,
                    ux : 4,
                    apps : 5,
                    projman : 6,
                    sysadmin : 7,
                    nottech : 8
                };
var career_map = ["Software Engineer","Backend Developer", "Frontend Developer", "Game Developer", "UX/UI Designer", "App Developer", "Project Manager", "System Administrator", "Non-Tech Job"];

var results_arr = [
                [2, 5, 2, 1], 
                [2, 4, 2, 1],
                [2, 1, 5, 4],
                [3, 5, 4, 1],
                [3, 1, 5, 4],
                [2, 5, 5, 2],
                [5, 3, 2, 5],
                [1, 4, 2, 1],
                [4, 1, 2, 4]
                ];

var resultOptions = [
    {   title: "Software Engineer",
        desc: "These are tools for making other tools! Software is huge and slick and complicated. Hope you're prepared to keep updating this for months or years. The work is very focused and you'll spend a lot of time staring at your computer screen.",
        pros: "There is a huge variation of projects: for example, you can work on operating systems, programming languages, or physics rendering engines -- on your own or as part of a team.",
        cons: "This is probably the most difficult field to get started in, out of all the options."
        image: "software.jpg"
    },
    {   title: "Backend Developer",
        desc: "Backend development involves setting up databases and figuring out how to best manipulate your data to create websites and applications.",
        pros: "You have to work with your development team, but thankfully not clients. You'll have loads of problem-solving opportunities.",
        cons: "Your work isn't seen or appreciated by the client, and you don't get to create a lot of 'pretty' things."
        image: "backend.jpg"
    },
    {   title: "Frontend Developer",
        desc: "Frontend developers work with Javascript, HTML, and CSS to make the wireframe created by the backend developers palettable to human eyes and hands. It's similar to UX/UI.",
        pros: "You'll be working heavily with your team of developers, as well as your clients. There's incredible opportunity for creativity in this field, and your work is seen by clients and customers.",
        cons: "You'll have to interact with clients."
        image: "front.png"
    },
    {   title: "Game Developer",
        desc: "Game development actually takes more work than you might think. It involves tons of logic. The computing power needed ranks up there with most scientific endeavors (so get a very good computer). This field is at the forefront of animation as well; it's less pretty than movies but more complicated.",
        pros: "You're making games. There's lots of problem solving and lots of creativity. It's easy to explain what you do, and you don't have to deal with clients if you don't want to.",
        cons: "It takes years to develop a good game. The culture can be hostile to female developers. Employment and income can be unstable."
        image: "game.png"
    },
    {   title: "UX/UI Designer",
        desc: "Developers don't like making interfaces. You do. Take their (probably ugly) output and make something that users will not only use, but will WANT to use.",
        pros: "You don't have to deal with a lot of code, and your work can be very pretty.",
        cons: "You'll have to interact with clients and developers."
        image: "uiux.jpg"
    },
    {   title: "App Developer",
        desc: "This field is new and exciting and changes faster than you can blink, so you're quick to adapt and make snarly projects that Work Well Enough (I'll patch it soon promise). You're making mini-software used by many people. You'll need a large variety of skills (or a team). There's lots of variety here, based on what type of app you want to make. Please also browse our entries for software design, UI design, backend web development or games.",
        pros: "Everyone uses and loves apps. You could build an entire company around a single app if you wanted. There is tons of room for growth, as this is a new medium.",
        cons: "Everyone can make apps, so there's lots of competition. You'd better have a really good idea.  This is a field where you need to keep up with emerging developments in mobile tech."
        image: "apps.png"
    },
    {   title: "Project Manager",
        desc: "There's not a lot of actual coding, so you'll need to know more theory than skills. For large projects, though, you're incredibly important because you'll be organizing the code monkeys (developers) and ensuring on-time delivery. You focus on the big picture but keep your eye on the deadlines. You're good at nuturing relationships with clients.",
        pros: "You can make big bucks without having really in-depth tech skills.",
        cons: "You don't really get to code. It's more of a manager job than a tech job."
        image: "projectmana.jpg"
    },
    {   title: "System Administrator",
        desc: "You deal with servers and databases: basically system maintenance. There's not much programming. A lot of command-line work, though. You're going to learn to love Linux and this thing [insert picture of command line shell].",
        pros: "You need to be very technical and detail-oriented, but you don't have to spend a lot of time actually writing code.",
        cons: "Sometimes people wake you up at 5 AM because the servers got hacked/caught on fire. (In other words, you're on call 24/7.)"
        image: "systemadmin.jpg"
    },
    {   title: "Non-Tech Job",
        desc: "The majority of companies can benefit from people who like tech but know other things. Maybe you don't want to spend all your time coding, but you can still make simple tools or even a website. You can do amazing things with the Microsoft Office Suite (or some equivalent).",
        pros: "",
        cons: ""
        image: "nontech.jpg"
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
        var m = compare_results(ans_array);
                console.log(m); 


      
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
    var returned = 0 ;
  for(var i = 0 ; i < results_arr.length ; i ++  ){
        var arr = results_arr[i] ;  
        if( arr == answer ) {
            var j = results_arr.indexOf(arr) ; 
            returned = 1 ; 
            return career_map[j] ; 
        } else {
            
        }
    }
    if(returned == 0){
       return other_results(answer) ;
       } 
}

function other_results(answer) {
    var maybe_list = [0]; 
    for(var i=0; i < results_arr.length ; i++) {
        var arr = results_arr[i] ; 
        var maybe_this = 1 ; 
        for(j=0; j < arr.length ; j ++) {
            if(arr[j] > answer[j]) {
                maybe_this -= 1 ;
            }
        }
        if(maybe_this > 0) {
            var k = results_arr.indexOf(arr);
            maybe_list.push(k);
        }
    }
    return maybe_list[-1] ; 
}

    

