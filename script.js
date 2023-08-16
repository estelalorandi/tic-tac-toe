//primeiro vamos selecionar regiões importantes do tabuleiro
const boardRegions = document.querySelectorAll("#gameBoard span");
let VBoard = []; //tabuleiro virtual. Será utilizado para gerenciarmos a situação do tabuleiro real
let turnPlayer = ""; //começa vazia porque primeiramente não temos um jogador.

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

function initializeGame() {
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]; //mostrará no console a situação inicial do tabuleiro e, futuramente, verificaremos qual jogador venceu.
  turnPlayer = "player1"; //o jogador 1 que vai começar
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="turnPlayer"></span>'; //usamos essa propriedade porque vamos adicionar um texto fixo. Quando o jogo terminar, vamos modificar o HTML dentro desse elemento. Quando o jogo reiniciar, ele retornará para o valor de inner.HTML.
  updateTitle();
  boardRegions.forEach(function (element) {
    element.classList.remove("win"); //se já houver ocorrido uma vitória, garantiremos que a classe win não estará mais
    element.innerText = ""; //aqui limpamos o X ou o O do interior da célula.
    element.addEventListener("click", handleBoardClick);
    element.classList.add("cursor-pointer");
  });
}

function handleWin(regions) {
  regions.forEach(function (region) {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const playerName = document.getElementById(turnPlayer).value;
  document.querySelector("h2").innerHTML = playerName + " venceu!";
  document.getElementById("player1").value = "";
  document.getElementById("player2").value = "";
}

function disableRegion(element) {
  element.classList.remove("cursor-pointer");
  element.removeEventListener("click", handleBoardClick); //serve para clicarmos só uma vez
}

function handleBoardClick(ev) {
  const span = ev.currentTarget;
  const region = span.dataset.region; //vamos criar aqui a região que foi clicada. O currentTarget é o span, que é onde se clica. Através do dataset.region, podemos obter e separar os valores da região de cada span no HTML.
  const rowColumnPair = region.split("."); //com o split, dividimos uma string, transformando-a em um array. Escolhemos o ponto ".", pois onde ele estiver, o split quebrará a string em um array. ["N" , "N"]
  const row = rowColumnPair[0];
  const column = rowColumnPair[1];
  if (turnPlayer === "player1") {
    span.innerText = "X";
    vBoard[row][column] = "X";
  } else {
    span.innerText = "O";
    vBoard[row][column] = "O";
  }

  console.clear();
  console.table(vBoard); //pega dado/informação e o mostra como tabela.
  disableRegion(span);
  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    handleWin(winRegions);
  } else if (vBoard.flat().includes("")) {
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.querySelector("h2").innerHTML = "Empate!";
  }
}

function getWinRegions() {
  const winRegions = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2"); //se a posição 0.0 existe e se ela for igual a 0.1, e se for igual a 0.2, então temos um vencedor.
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

document.getElementById("start").addEventListener("click", initializeGame);
