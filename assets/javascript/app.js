$(document).ready(function () {
      // Create a function that creates the start button and initial screen
      var clickSound = new Audio("assets/sound/buttonclick.mp3");
      (function initialScreen() {
        startScreen =
          "<h1 id='title' class='text-center'>Trivial Game</h1><p class='text-center main-button-container'><a class='btn btn-warning btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".startQuizArea").html(startScreen);
      })();

      var startScreen;
      var renderThisHTML;
      var counter = 30;
      var questionCounter = 0;
      var selectedAnswer;
      var theClock;
      var correctTally = 0;
      var incorrectTally = 0;
      var unansweredTally = 0;
      //Array of questions to be displayed to the user
      var questionArray = [
        "Who created JavaScript?",
        "Who wrote the Javascript Language?",
        "Is JavaScript and Java basically the same?",
        "Is JavaScript dynamically typed or statically typed?",
        "Which of the following is not a reserved word in JavaScript?",
        "How long did Brendan Eich take to write the JavaScript programming language",
      ];

      var answerArray = [
        ["Microsoft", "Oracle", "Netscape", "Sun Microystems"],
        ["Steve Jobs", "Al Gore", "US Department of Defense", "Brendan Eich"],
        ["No", "I think so", "Maybe", "Yes"],
        ["Static", "Both", "Dynamic", "DynaStatic"],
        ["default", "finally", "throw", "undefined"],
        ["10 days", "Two Weeks", "2 Months", "6 weeks"],
      ];

      var correctAnswers = [
        "C. Netscape",
        "D. Brendan Eich",
        "A. No",
        "C. Dynamic",
        "D. undefined",
        "A. 10 days",
      ];
});