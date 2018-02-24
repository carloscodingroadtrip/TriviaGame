$(document).ready(function () {
  // Create the start button and initial screen
  (function initialScreen() {
    startScreen =
    "<h1 id='title' class='text-center'>Trivial Game</h1><p class='text-center main-button-container'><a class='btn btn-warning btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".startQuizArea").html(startScreen);
  })();
  //Listen for the click on the start-button click
  $("body").on("click", ".start-button", function (event) {
    event.preventDefault();
    $(this).hide(); //hide the Start Button
    document.getElementById('questions').style.visibility = "visible";
    generateQuestionsHTMLArea();
    timerWrapper();
  });
  //Listen for the answer click
  $("body").on("click", ".answer", function (event) {
    //As soon as a click has been registered, disable all possible answers
    $(".answer").addClass('deactivate');
    selectedAnswer = $(this).text(); //Grab the text from the selected answer
    if (selectedAnswer === correctAnswers[questionCounter]) {
      clearInterval(theClock);
      displayWin();
    } else {
      clearInterval(theClock);
      displayLoss();
    }
  });
  //Listen for the reset-button click
  $("body").on("click", ".reset-button", function (event) {
    resetGame();
  });
});

//Display the questions on the right hand side
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
  timerHTML = "<p class='text-center timer-only'><span class='timer'>5</span></p><p class='text-center'>";
  //Send my variable to JQuery Object
  $("#questions").html(renderQuestions);
  $(".timer").html(timerHTML);
}

//Display the WIN if we got the right answer
function displayWin() {
  correctTally++;
  toBeRendered =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center timer-p'>Correct!<br/> The answer is: <br/> " +
    correctAnswers[questionCounter];
  $(".timer").html(toBeRendered);
  setTimeout(goLookForQuestions, 4000);
}

//Display the LOSS if we got the right answer
function displayLoss() {
  incorrectTally++;
  toBeRendered =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center timer-p'>Wrong!<br/> The correct answer is:<br/>  " +
    correctAnswers[questionCounter] +
    "</p>";
  $(".timer").html(toBeRendered);
  setTimeout(goLookForQuestions, 4000);
}

//Display loss due to the timeout
function displayLossDueToTimeOut() {
  unansweredTally++;
  $(".answer").addClass('deactivate');
  toBeRendered =
    "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" +
    counter +
    "</span></p>" +
    "<p class='text-center timer-p'>You ran out of time! <br/>  The correct answer was: <br/> " +
    correctAnswers[questionCounter] + "</p>";
  $(".timer").html(toBeRendered);
  setTimeout(goLookForQuestions, 4000);
}

//The resetGame function
function resetGame() {
  questionCounter = 0;
  correctTally = 0;
  incorrectTally = 0;
  unansweredTally = 0;
  counter = 5;
  generateQuestionsHTMLArea();
  timerWrapper();
  document.getElementById('timer').style.visibility = "visible";
}

function goLookForQuestions() {
  if (questionCounter < 5) {
    questionCounter++;
    generateQuestionsHTMLArea();
    counter = 5;
    timerWrapper();
  } else {
    screenResults();
  }
}

function timerWrapper() {
  theClock = setInterval(thirtySeconds, 1000);
  function thirtySeconds() {
    //Evaluate if timer has expired
    if (counter === 0) {
      clearInterval(theClock);
      displayLossDueToTimeOut();
    }

    //Deduct 1 second from the timer, if there is still time left
    if (counter > 0) {
      counter--;
    }
    displayTimer = "<p id='counterCLock' class='text-center timer-only'>" + counter + "</p>"
    $(".timer").html(displayTimer);
  }
}

//To Display the Final results
function screenResults() {
  document.getElementById('timer').style.visibility = "hidden";
  renderThisHTML =
    "<p class='text-center'>All done, here's how you did!" +
    "</p>" +
    "<p class='summary-correct'>Correct Answers: " +
    correctTally +
    "</p>" +
    "<p>Wrong Answers: " +
    incorrectTally +
    "</p>" +
    "<p>Unanswered: " +
    unansweredTally +
    "</p>" +
    "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $("#questions").html(renderThisHTML);
}

//Variables to be used across the game
var startScreen;
var renderQuestions;
var counter = 5;
var toBeRendered;
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
