// Count of rounds to play
const maxRounds = 5;

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
// Human makes your's choice
//
function getHumanChoice (round) {
   for (;;) {
      let choice = prompt (`Round ${round} of ${maxRounds}\nMake your choice:`).trim ().toLowerCase ();
      if (choice === 'rock' || choice === 'paper' || choice === 'scissors')
         return choice;

      alert (`Choice '${choice}' is inappropriate. Please enter 'rock', 'paper' or 'scissors'`);
   }
}


//
// Capitalize first letter in string
//
function makeStringCapital (str) {
   return str.charAt (0).toUpperCase () + str.slice (1);
}

//
// Main function of the game
//
function playGame () {
   // Initial score is 0:0
   let humanScore = 0;
   let computerScore = 0;

   // Play one game round
   function playRound (humanChoice, computerChoice) {
      
      // Check equality of choices
      if (humanChoice === computerChoice) {
         console.log ('Both choices are equal, please try again');
         return;
      }

      // Formulate criterion of human's winning 
      let humanWin = (humanChoice === 'rock' && computerChoice === 'scissors') ||
                     (humanChoice === 'paper' && computerChoice === 'rock') ||
                     (humanChoice === 'scissors' && computerChoice === 'paper');

      // Show result of current round
      if (humanWin) {
         console.log (`You win! ${makeStringCapital (humanChoice)} beats ${computerChoice}.`);
         ++humanScore;
      }
      else {
         console.log (`You lose! ${makeStringCapital (computerChoice)} beats ${humanChoice}.`);
         ++computerScore;
      }

      console.log (`Actual score "computer vs. human" is ${computerScore} : ${humanScore}`);
   }

   // Play N rounds
   for (let i = 0; i < maxRounds; ++i) {
      console.log (`---=== Round ${i + 1} ===---`);
      playRound (getHumanChoice (i + 1), getComputerChoice ());
   }

   let result = `The score is ${computerScore} : ${humanScore}. `;

    // Show results of game
    if (computerScore > humanScore)
      result = result.concat ("Computer wins!");
   else if (humanScore > computerScore)
      result = result.concat ("Human wins!");
   else
      result = result.concat ("Tie!");

   console.log (result);
}

playGame ();