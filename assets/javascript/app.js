$(document).ready(function () {
  // Create the start button and initial screen
  var clickSound = new Audio("assets/sound/buttonclick.mp3");
  (function initialScreen() {
    startScreen =
      "<h1 id='title' class='text-center'>Trivial Game</h1><p class='text-center main-button-container'><a class='btn btn-warning btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".startQuizArea").html(startScreen);
  })();

  //Listen for the click on the start-button click
  $("body").on("click", ".start-button", function (event) {
    event.preventDefault();
    $(this).hide(); //hide the Start Button
    clickSound.play();
    document.getElementById('questions').style.visibility = "visible";
    generateQuestionsHTMLArea();
    timerWrapper();
  });

  //Listen for the answer click
  $("body").on("click", ".answer", function (event) {
    //As soon as a click has been registered, disable all possible answers
    $(".answer").addClass('deactivate');
    clickSound.play();
    selectedAnswer = $(this).text(); //Grab the text from the selected answer
    if (selectedAnswer === correctAnswers[questionCounter]) {
      //alert("correct");
      clearInterval(theClock);
      displayWin();
    } else {
      //alert("wrong answer!");
      clearInterval(theClock);
      displayLoss();
    }
  });

  $("body").on("click", ".reset-button", function (event) {
    clickSound.play();
    resetGame();
  }); // Closes reset-button click
}); //  Closes jQuery wrapper

function generateQuestionsHTMLArea() {
  renderQuestions =
    questionArray[questionCounter] +
    "</p><p class='first-answer answer'>A. " +
    answerArray[questionCounter][0] +
    "</p><p class='answer'>B. " +
    answerArray[questionCounter][1] +
    "</p><p class='answer'>C. " +
    answerArray[questionCounter][2] +
    "</p><p class='answer'>D. " +
    answerArray[questionCounter][3] +
    "</p>";
  timerHTML = "<p class='text-center timer-only'><span class='timer'>30</span></p><p class='text-center'>";
  //Send my variable to JQuery Object
  $("#questions").html(renderQuestions);
  $(".timer").html(timerHTML);
}


  //Variables to be used across the game
  var startScreen;
  var renderQuestions;
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
