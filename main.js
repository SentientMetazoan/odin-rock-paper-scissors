/**
* INITIALISATION
*/

const
ROCK_ICON = "fa fa-hand-fist",
PAPER_ICON = "fa fa-hand",
SCISSORS_ICON = "fa fa-hand-scissors";

let currentRound = 1;
let game_over = false;
let player_score = 0;
let computer_score = 0;

let sb; //scoreboard element



function init_page(){
  sb = document.querySelector(".scoreboard")

  document.querySelectorAll(".btn-choice")
  .forEach(el => el.addEventListener('click', () =>
  (game_over)?
  alert(`Game is over! Please start a new one!`)
  : playRound(el.getAttribute('value'),getComputerChoice())))
  
  document.querySelector("#btn-start").addEventListener('click', () => init_game() )
}

function init_game(){
  game_over = false;
  currentRound = 1;
  player_score = 0;
  computer_score = 0;
  
  document.querySelector(".tbl-results tbody").innerHTML = ""
  document.querySelectorAll(".score").forEach(el => el.innerHTML = "<span>?</span>")
  sb.innerHTML = `<span>New game!</span>`
}

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
  let result = {
    "player": ps,
    "computer": cs
  };
  
  if(ps === cs){
    result["result"] = "tie";
  } else if(ps === 'rock') {
    result["result"] = (cs === 'paper')? "cwin": "pwin";
  } else if(ps === 'paper') {
    result["result"] = (cs === 'scissors')? "cwin": "pwin";
  } else if(ps === 'scissors') {
    result["result"] = (cs === 'rock')? "cwin": "pwin";
  }
  
  updateScoreboard(result)
}

function updateScoreboard(r){
  let res_tr = document.createElement("tr");
  let ps = r.player === "rock"? ROCK_ICON : r.player === "paper"? PAPER_ICON : SCISSORS_ICON;
  let pwin = r.result==="pwin"? "win" : r.result==="cwin"? "loss" : "tie";
  let cs = r.computer === "rock"? ROCK_ICON : r.computer === "paper"? PAPER_ICON : SCISSORS_ICON;
  let cwin = r.result==="cwin"? "win" : r.result==="pwin"? "loss" : "tie";
  
  res_tr.innerHTML = `<td>${currentRound}</td><td><button class="result ${pwin}"><span class="${ps}"></span></button></td><td><button class="result ${cwin}"><span class="${cs}"></span></button></td>`
  
  document.querySelector("tbody").prepend(res_tr)
  currentRound++;
  
  let ps_icon = document.querySelector("#player-choice span")
  ps_icon.className = ps;
  ps_icon.textContent = "";
  let cs_icon = document.querySelector("#computer-choice span")
  cs_icon.className = cs;
  cs_icon.textContent = ""

  if(pwin === "win") player_score++;
  else if(cwin === "win") computer_score++;
  game_over = (player_score >= 5 || computer_score >= 5)
  
  let str = "";
  if(game_over) {
    str += `<span style="color:${player_score > computer_score ? `green;">Player` : `red;">Computer`} wins the match!</span>`
  }
  sb.innerHTML = `<span>Player ${player_score}-${computer_score} Computer</span>${str}`
  
  
}





/* function game(maxRounds, first_to_5=true){
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
        done = first_to_5 && (pWins>=5 || cWins>=5)
      } else {
        console.log('Choose a valid option!')
      }
    }
  }
  
  alert(`Final score:\n\nPlayer ${pWins} - ${cWins} Computer`)
} */

