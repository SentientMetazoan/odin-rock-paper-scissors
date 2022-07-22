/**
* Randomly makes the computer choice
* 
* @returns String representing the computer choice
*/
function getComputerChoice() {
  let rnd = Math.floor(Math.random()*3);
  return rnd === 0? 'rock' : rnd === 1? 'paper' : 'scissors';
}

function playRound(playerSelection, computerSelection){
  let ps = playerSelection.toLowerCase();
  let cs = computerSelection.toLowerCase();
  
  if(ps === cs){
    return `Both chose ${ps}, it's a tie!`
  } else if(ps === 'rock') {
    return (cs === 'paper')?
    `Computer chose ${cs} and player ${ps}. Computer wins!`
    : `Player chose ${ps} and computer ${cs}. Player wins!`
  } else if(ps === 'paper') {
    return (cs === 'scissors')?
    `Computer chose ${cs} and player ${ps}. Computer wins!`
    : `Player chose ${ps} and computer ${cs}. Player wins!`
  } else if(ps === 'scissors') {
    return (cs === 'rock')?
    `Computer chose ${cs} and player ${ps}. Computer wins!`
    : `Player chose ${ps} and computer ${cs}. Player wins!`
  }
}


function game(maxRounds, bo5=true){
  let done = false;
  let roundsDone = 0;
  let pWins=0, cWins=0;
  while(!done){
    let choice = prompt('Choose! (rock/paper/scissors/quit)');
    choice = choice.toLowerCase();
    
    if(choice === 'quit' || roundsDone >= maxRounds){
      done = true;
    } else {
      if(choice === 'rock' || choice === 'paper' || choice === 'scissors'){
        let res = playRound(choice,getComputerChoice())
        let winner = res.split(' ')[0].toLowerCase()
        console.log(`Round ${roundsDone+1}:\n\n${res}`)
        alert(`Round ${roundsDone+1}:\n\n${res}`)
        if(winner === 'player') pWins++;
        else if(winner === 'computer') cWins++;
        else if(bo5) roundsDone--;
        roundsDone++;
        if(pWins>=3 && bo5 || cWins>=3 && bo5){
          done = true;
        }
      } else {
        console.log('Choose a valid option!')
      }
    }
  }
  
  alert(`Final score:\n\nPlayer ${pWins} - ${cWins} Computer`)
}

game(5)