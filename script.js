const maxWins = 5; // Count of wins
let actualRound = 1; // Number of actual round
let humanScore = 0;
let computerScore = 0;

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

function isHumanWins (humanChoice, computerChoice) {
   return (humanChoice === 'rock' && computerChoice === 'scissors') ||
          (humanChoice === 'paper' && computerChoice === 'rock') ||
          (humanChoice === 'scissors' && computerChoice === 'paper');
}

function updateScore () {
   document.querySelector ("#score_human").textContent = `0${humanScore}`;
   document.querySelector ("#score_computer").textContent = `0${computerScore}`;

   let canPlay = true;
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

   if (!canPlay) {
      const areas = document.querySelectorAll ("area");
      for (let ar of areas)
         ar.removeEventListener ('click', processHumanChoice);
   }

   return canPlay;
}


function processHumanChoice (ev) {
   ev.preventDefault ();

   const humanChoice = ev.currentTarget.alt;
   const computerChoice = getComputerChoice ();

   const log = document.querySelector ('#log_data');

   const elemList = document.createElement ('ul');
   const elemHuman = document.createElement ('li');
   elemHuman.textContent = `Human's choice: ${makeStringCapital (humanChoice)}`;
   elemHuman.classList.add ('li_human');
   elemList.appendChild (elemHuman);
   
   const elemComputer = document.createElement ('li');
   elemComputer.textContent = `Computer's choice: ${makeStringCapital (computerChoice)}`;
   elemComputer.classList.add ('li_computer');
   elemList.appendChild (elemComputer);

   const elem = document.createElement ('li');
   if (humanChoice === computerChoice) {
      elem.textContent = 'Both choices are equal, tie!'
      elem.classList.add ('li_tie');
   }
   else {
      if (isHumanWins (humanChoice, computerChoice)) {
         elem.textContent = 'Human wins!';
         elem.classList.add ('li_human');
         ++humanScore;
      }
      else {
         elem.textContent = 'Computer wins!';
         elem.classList.add ('li_computer');
         ++computerScore;
      }
   }

   elemList.appendChild (elem);

   log.appendChild (elemList);

   if (updateScore ())
      startNewRound ();
}

function startNewRound () {
   const log = document.querySelector ('#log_data');
   
   const elemRound = document.createElement ('p');
   elemRound.textContent = `Round ${actualRound++} beginns`;
   elemRound.classList.add ("round_text");
   log.appendChild (elemRound);
}

function startGame () {
   const areas = document.querySelectorAll ("area");
   for (let ar of areas)
      ar.addEventListener ('click', processHumanChoice);

   startNewRound ();
}

startGame ();
