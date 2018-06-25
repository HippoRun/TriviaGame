var questionArray = [
    {
        question: "Huns special civilization bonus is?",
        answerList: ["Cheap Knights", "No Houses Needed", "Starts With Extra Villagers"],
        correct: 1,
    },
    {
        question: "Chinese special civilization bunos is?",
        answerList: ["Starts with Extra Villagers", "Starts with Extra Food", "Eats Berries Faster"],
        correct: 0,
    },
    {
        question: "Goth's special civilization bonus is?",
        answerList: ["Villagers Build Faster", "Villagers Kill Boar Faster", "Archer Bonus"],
        correct: 1,
    },
    {
        question: "Mongol's special civilization bonus is?",
        answerList: ["Villagers cut wood faster", "Cheaper Upgrades", "Further Lign of Sight"],
        correct: 2,
    },
    {
        question: "Aztec's Special Unit is?",
        answerList: ["Paladins", "Plumed Archers", "Jaguar Worriers"],
        correct: 2,
    },
    {
        question: "If your enemy is Koreans you can expect",
        answerList: ["Scout Rush", "Monk Rush", "Trush"],
        correct: 2,

    }
];
        var displayArray = ["WoW 2k! You Must be the Viper!", "Wrong Answer Noob", "You're not 2k", "Final Score"]
        var gifArray = ["https://i.giphy.com/media/9SFfztiHjZCmI/giphy.webp", "https://vignette.wikia.nocookie.net/diepio/images/5/5d/Noob.gif/revision/latest?cb=20160928201008", "https://media1.tenor.com/images/56b70b269d0d297ed0f0f8245990c320/tenor.gif?itemid=3685476","https://mir-s3-cdn-cf.behance.net/project_modules/disp/73b98e27006967.5635ee6a6e87c.gif"] 
        var currentQuestion = 0;
        var questionNum = 0;
        var correctAns = 0;
        var incorrectAns = 0;
        var unaswered = 0;
        var clicked = true;
        var time;
        var seconds;
        var userSelect;
        var newGif = $("<img>");
        $("#restart").hide();
// Starting Game
        $("#startGame").on("click", function() {
            startGame();
        });
//restart
        $("#restart").on("click", function(){
            startGame();
        });

// start game fnc
        function startGame() {
            $("#startGame").hide();
            $("#restart").hide();
            $("#message").empty();
            $("#timer").empty();
            $("#question").empty();
            $("#choices").empty();
            $("#correct").empty();
            $("#incorrect").empty();
            $("#unaswered").empty();
            $("#gif").empty();
            currentQuestion = 0;
            correctAns = 0;
            incorrectAns = 0;
            unaswered = 0;
            loadQuestion();
        };

// Timer fnc
function startTimer(){
    seconds = 15;
    $("#timer").html("Time Remaining: " + seconds);
    time = setInterval(countDown, 1000);
};

// countdown fnc
function countDown() {
    seconds--;
    $("#timer").html("Time Remaining: " + seconds);
    if (seconds <= 0) {
        clicked = false;
        evalAnswer();
        clearInterval(time);
    }
};

//load questions fnc --> answer .onclick fnc
function loadQuestion() {
    $("message").empty();
    $("#gif").empty();

// push random Q from array --> if state
if (currentQuestion <= questionArray.length - 1) {
    questionNum = currentQuestion + 1;
    $("#question").text("Question #" + questionNum + ": " + questionArray[currentQuestion].question);
    for (i = 0; i < questionArray[currentQuestion].answerList.length; i++) {
        var newButton = $("<button>");
        newButton.text (questionArray[currentQuestion].answerList[i]);
        newButton.addClass("choiceList");
        newButton.attr("data-listNum", i);
        $("#choices").append("<br>")
        $("#choices").append(newButton);
        $("#choices").append("<br>")
    };

// timer call 
        startTimer();
        $(".choiceList").on("click", function () {
            clicked = true;
            userSelect = $(this).attr("data-listNum");
            evalAnswer();
            clearInterval(time);
    });
}
    else {
        finalScore();
    }
};

// eval guess
        function evalAnswer() {
            $("#timer").empty();
            $("#question").empty();
            $("#choices").empty();

        if (userSelect == questionArray[currentQuestion].correct && clicked == true) {
            correctAns++;
            $("#message").text(displayArray[0]);
            newGif.attr("src",gifArray[0]);
            $("#gif").append(newGif);
            setTimeout(loadQuestion, 5000);
        }
        else if (userSelect != questionArray[currentQuestion].correct && clicked == true) {
            incorrectAns++;
            $("#message").text(displayArray[1]);
            $("#question").text("The Correct answer is: " + questionArray[currentQuestion].answerList[questionArray[currentQuestion].correct]);
            newGif.attr("src",gifArray[1]);
            $("#gif").append(newGif);
            setTimeout(loadQuestion, 5000);
        }
        else {
            unaswered++;
            $("#question").text("The correct answer is:" + questionArray[currentQuestion].answerList[questionArray[currentQuestion].correct]);
            newGif.attr("src",gifArray[2]);
            $("#gif").append(newGif);
            setTimeout(loadQuestion, 5000);
        };
        currentQuestion++;
        console.log(currentQuestion);
        };
// fnc final score
        function finalScore() {
            $("#gif").empty();
            $("#question").empty();
            $("#timer").empty();
            $("#choices").empty();
            clearInterval(time);

            newGif.attr("src",gifArray[3]);
            $("#gif").append(newGif);
            $("#message").text(displayArray[3])
            $("#correct").text("Correct Answer:"+ correctAns);
            $("#incorrect").text("Incorrect Answers:"+ incorrectAns);
            $("#unaswered").text("Unanswered:" + unaswered);
            $("#restart").show();
        };