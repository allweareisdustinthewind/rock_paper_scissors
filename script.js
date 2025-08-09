const maxWins = 5;     // Count of wins
let actualRound = 1;   // Number of actual round
let humanScore = 0;    // Count of human's points
let computerScore = 0; // Count of computer's points
let canPlay = true;    // When false, then the game is finished

//
// Computer makes your's choice
//
function getComputerChoice () {
   let choice = Math.floor (Math.random () * 3);

   switch (choice) {
      case 0:
         return 'rock';

      case 1:
         return 'paper';

      default:
         return 'scissors';
   }
}

//
// Capitalize first letter in string
//
function makeStringCapital (str) {
   return str.charAt (0).toUpperCase () + str.slice (1);
}

//
// If true then human has won actual round
//
function isHumanWins (humanChoice, computerChoice) {
   return (humanChoice === 'rock' && computerChoice === 'scissors') ||
          (humanChoice === 'paper' && computerChoice === 'rock') ||
          (humanChoice === 'scissors' && computerChoice === 'paper');
}

//
// Make update in representation of actual score
//
function updateScore () {
   document.querySelector ("#score_human").textContent = `0${humanScore}`;
   document.querySelector ("#score_computer").textContent = `0${computerScore}`;

   if (humanScore === maxWins) {
      const res = document.querySelector ('#result');
      res.textContent = "Human wins!";
      res.classList.add ('human_wins');
      canPlay = false;
   } else if (computerScore === maxWins) {
      const res = document.querySelector ('#result');
      res.textContent = "Computer wins!";
      res.classList.add ('computer_wins');
      canPlay = false;
   }
}

//
// Callback to call by click on paper, rock or scissor image
//
function processHumanChoice (ev) {
   ev.preventDefault ();

   if (!canPlay)
      return;

   const humanChoice = ev.currentTarget.alt;
   const computerChoice = getComputerChoice ();

   const log = document.querySelector ('#log_data');

   // Add node with human's choice
   const elemList = document.createElement ('ul');
   const elemHuman = document.createElement ('li');
   elemHuman.textContent = `Human's choice: ${makeStringCapital (humanChoice)}`;
   elemHuman.classList.add ('li_human');
   elemList.appendChild (elemHuman);
   
   // Add node with computer's choice
   const elemComputer = document.createElement ('li');
   elemComputer.textContent = `Computer's choice: ${makeStringCapital (computerChoice)}`;
   elemComputer.classList.add ('li_computer');
   elemList.appendChild (elemComputer);

   // Get the winner in actual round and append node with winner to game's log
   const elem = document.createElement ('li');
   if (humanChoice === computerChoice) {
      elem.textContent = 'Both choices are equal, tie!'
      elem.classList.add ('li_tie');
   }
   else {
      if (isHumanWins (humanChoice, computerChoice)) {
         elem.textContent = 'Human wins!';
         elem.classList.add ('li_human_wins');
         ++humanScore;
      }
      else {
         elem.textContent = 'Computer wins!';
         elem.classList.add ('li_computer_wins');
         ++computerScore;
      }
   }

   elemList.appendChild (elem);

   log.appendChild (elemList);

   updateScore ();

   if (canPlay)
      startNewRound ();
}

//
// Appen node woth next round to game's log
//
function startNewRound () {
   const log = document.querySelector ('#log_data');
   
   const elemRound = document.createElement ('p');
   elemRound.textContent = `Round ${actualRound++} beginns`;
   elemRound.classList.add ("round_text");
   log.appendChild (elemRound);
}

//
// Main function to start the game
//
function startGame () {
   const areas = document.querySelectorAll ("area");
   for (let ar of areas)
      ar.addEventListener ('click', processHumanChoice);

   startNewRound ();
}

startGame ();
