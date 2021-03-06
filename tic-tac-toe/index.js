/**
 * Tic Tac Toe Game Functionality:
 * 
 * 1. Generate the spaces
 * 2. When you click on a space a token appears
 * 3. It checks if the player has won
 * 4. It changes token depending on who's turn it is and shows who's turn it is
 * 5. Shows the winning container if a person has won
 * 6. When you click the play again button it clears the board and restarts for a new game
 * 
 */

const tokens = [
  {
    name: "Beemo",
    img: "beemo-token.png",
  },
  {
    name: "Princess Bubblegum",
    img: "bubble-token.png",
  }
]

let player1 = {
  token: 0
}

let player2 = {
  token: 1
}

let gameboard = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]; // array representation of gameboard
let currentPlayer = 1; // indicates who's turn it is
let numTurn = 0; // counts the num of turns made
leaderboard = document.getElementById("leaderboard");
leaderboard.classList.add("hidden");
leaderboard2 = document.getElementById("leaderboard2");
leaderboard.classList.add("hidden");


let pn1 = "";
let pn2 = "";

while (pn1 == "" || pn1 == null) {
  pn1 = prompt("What is Player 1's Name");
}
while (pn2 == "" || pn2 == null) {
  pn2 = prompt("What is Player 2's Name");
}

// Populates the spaces for the gameboard
function populateSpace() {
  let rows = document.querySelectorAll(".row")
  //it adds 9 spaces 3  on each row
  //it adds a id to each of th 9 spaces, e.g. 0-0, 0-1
  //it adds eventlistener to each of the 9 spaces

  for (let rowNum = 0; rowNum < rows.length; rowNum++) {
    let row = rows[rowNum]
    for (let col = 0; col < 3; col++) {
      let space = document.createElement("div");
      space.innerHTML = "&nbsp"
      space.classList.add("space");
      space.id = rowNum + "-" + col;
      space.addEventListener("click", playerTurn);
      row.appendChild(space);
    }
  }
}
populateSpace();
// Implements functionality when a player turn is made
function playerTurn(event) {
  let spacecontent = event.target;
  let location = spacecontent.id.split("-");
  let row = location[0];
  let col = location[1];
  placeToken(row, col);
  updateGameboard();
  numTurn++;
  let won = checkWon();
  if (won) {
    reportWinner();
    return
  }
  if (numTurn == 9) {
    reportTie();
    return
  }
  updateTurn();
}

// Updates the gameboard variable to indicate a token was placed at a specific row, col
function placeToken(row, col) {
  if (gameboard[row][col] == -1) {
    if (currentPlayer == 1) {
      gameboard[row][col] = 1;
    } else {
      gameboard[row][col] = 2;
    }
  }
}

// Update who's turn it is
function updateTurn() {
  if (currentPlayer == 1) {
    currentPlayer = 2;
  } else {
    currentPlayer = 1;
  }
  let turn = document.querySelector("span");
  turn.textContent = "Player " + currentPlayer;
}


// Updates the gameboard generating the tokens based on the gameboard values
function updateGameboard() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      let space = document.getElementById(row + "-" + col);
      space.innerHTML = ""
      if (gameboard[row][col] == 1) {
        let token = makeToken(player1);
        space.appendChild(token);
      } else if (gameboard[row][col] == 2) {
        let token = makeToken(player2);
        space.appendChild(token);
      }
    }
  }
}


// Creates and returns the token DOM element of the given player
function makeToken(player) {
  let token = document.createElement("img");
  token.classList.add("token");
  token.src = "./img/tokens/" + tokens[player.token].img;
  token.alt = tokens[player.token].name;
  return token;
}

// Updates win-container reporting a tie
function reportTie() {
  let win_page = document.getElementById("win-container");
  let game_page = document.getElementById("gameboard");
  win_page.classList.remove("hidden");
  game_page.classList.add("hidden");
  let text = document.querySelector("#win-container h2");
  text.textContent = "It's a Tie!";
  leaderboard = document.getElementById("leaderboard");
  leaderboard.classList.remove("hidden");
  leaderboard2 = document.getElementById("leaderboard2");
  leaderboard.classList.remove("hidden");
  result1 = "tie";
  result2 = "tie";
  console.log(result2);
  console.log(result1);
  (async () => {
    const rawResponse = await fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ player1name: pn1, score1: result1, player2name: pn2, score2: result2 })
    });
    const response = await rawResponse.json();
    console.log(response);
    displayLeaderboard(response.body);
  })();

}

// Updates win-container reporting a win
function reportWinner() {
  let win_page = document.getElementById("win-container");
  let game_page = document.getElementById("gameboard");
  win_page.classList.remove("hidden");
  game_page.classList.add("hidden");
  let text = document.querySelector("#win-container h2");
  text.textContent = "Congrats! Player " + currentPlayer + "!";
  leaderboard = document.getElementById("leaderboard");
  leaderboard.classList.remove("hidden");
  leaderboard2 = document.getElementById("leaderboard2");
  leaderboard.classList.remove("hidden");
  let winner = currentPlayer;
  let loser = 1;
  result1 = "lose";
  result2 = "win";
  if (currentPlayer == 1) {
    loser = 2;
    result1 = "win";
    result2 = "lose";
  }

  (async () => {
    const rawResponse = await fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ player1name: pn1, score1: result1, player2name: pn2, score2: result2 })
    });
    const response = await rawResponse.json();
    console.log(response);
    displayLeaderboard(response.body);
  })();

}

function displayLeaderboard(leaderData) {
  console.log("entered display data");
  console.log(leaderData.length);
  for (let i = 0; i < leaderData.length; i++) {

    leaderboard2 = document.getElementById("leaderboard2")
    leaderscore = leaderData[i];
    console.log(leaderscore);
    row = document.createElement("div");
    row.classList.add("row");
    leaderboard2.appendChild(row);

    Object.entries(leaderscore).forEach(([key, value]) => {
      console.log(key, value);
      col1 = document.createElement("div");
      col2 = document.createElement("div");
      col1.innerHTML = key;
      col2.innerHTML = value;
      row.appendChild(col1);
      row.appendChild(col2);
      col1.classList.add("leaderCol");
      col2.classList.add("leaderCol");
    });
    // for (let col = 0; col < 2; col++) {
    //   let div = document.createElement("div");
    //   div.innerHTML = leaderscore;
    //   div.classList.add("space");
    //   div.id = rowNum + "-" + col;
    //   div.addEventListener("click", playerTurn);
    //   row.appendChild(div);
    // }
  }

}

// Restarts and shows the gameboard to play again
function playAgain() {
  clearGameboard();
  let win_page = document.getElementById("win-container");
  let game_page = document.getElementById("gameboard");
  win_page.classList.add("hidden");
  game_page.classList.remove("hidden");
  numTurn = 0;
  let turn = document.querySelector("span");
  turn.textContent = "Player 1";
  pn1 = "";
  pn2 = "";
  while (pn1 == "" || pn1 == null) {
    pn1 = prompt("What is Player 1's Name");
  }
  while (pn2 == "" || pn2 == null) {
    pn2 = prompt("What is Player 2's Name");
  }
  leaderboard = document.getElementById("leaderboard");
  leaderboard.classList.add("hidden");
  leaderboard2 = document.getElementById("leaderboard2");
  leaderboard.classList.add("hidden");
}

// Clears the gameboard
function clearGameboard() {
  let rows = document.querySelectorAll(".row")
  for (let rowNum = 0; rowNum < rows.length; rowNum++) {
    let row = rows[rowNum];
    row.innerHTML = "";

  }
  gameboard = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
  populateSpace();
}

// Returns true/false if the current player who just made a move won
function checkWon() {
  // Horizontal
  for (let row = 0; row < 3; row++) {
    let count = 0;
    for (let col = 0; col < 3; col++) {
      if (gameboard[row][col] == currentPlayer) {
        count++;
      }
    }
    if (count == 3) {
      return true;
    }
    count = 0;
  }

  // Vertical
  for (let col = 0; col < 3; col++) {
    let count = 0;
    for (let row = 0; row < 3; row++) {
      if (gameboard[row][col] == currentPlayer) {
        count++;
      }
    }
    if (count == 3) {
      return true;
    }
    count = 0;
  }

  // Diagonal
  if (gameboard[0][0] == currentPlayer &&
    gameboard[1][1] == currentPlayer &&
    gameboard[2][2] == currentPlayer) {
    return true;
  }

  if (gameboard[0][2] == currentPlayer &&
    gameboard[1][1] == currentPlayer &&
    gameboard[2][0] == currentPlayer) {
    return true;
  }

  return false
}


