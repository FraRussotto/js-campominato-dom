//1. Dopo aver creato la griglia, al click di play dobbiamo generare le bombe.

//2. Cliccando le celle dobbiamo scoprire se è una bomba o meno.

//3. Facendo riferimento a positionBombs, creo una funzione che mi ritorni una array con gli indici delle celle che saranno bombe.

//4. Modifico l'eventListener della cell, inserendo il controllo sulla presenza della bomba, e quindi terminare il gioco, o se andare avanti aumentando il puntaggio.

//5. Una volta stabilite le opzioni al click della cella, creo la funzione che finalizza il gioco a seconda dell'esito del click.


const main = document.getElementById('game_wrapper');
const playBtn = document.querySelector('#play')
const levelSelected = document.querySelector('#level');
const levels = [100, 81, 49]
let numberSquare;

let positionBombs = [];
const numBombs = 16;
const endGameMessagge = document.querySelector('#endGameMessagge');

let points = 0;

playBtn.addEventListener('click', play);


// ----- Function ----- //

function play(){
  numberSquare = levels[levelSelected.value]
  reset();
  generatePlayGrid();
  positionBombs = generateBomb();
}

function generatePlayGrid(){

  const grid = document.createElement('div');
  grid.classList.add('grid') 

  for(let i = 0; i < numberSquare; i++) {
    const square = createSquare(i);
    grid.append(square)
  }
  main.append(grid)
}

function createSquare(index){
  const square = document.createElement('div');
  square.className = 'square';
  square.classList.add('square' + numberSquare);
  square._squareID = index;
  square.addEventListener('click', hendlerClickSquare)
  return square;
}

//4.

function hendlerClickSquare(){

  if(positionBombs.includes(this._squareID)) endGame(false);
  else {
    this.classList.add('clicked');
    points++;
    if(points === numberSquare - numBombs) endGame(true);
  }
  this.removeEventListener('click', hendlerClickSquare);

}

//3.

function generateBomb(){
  const bombs = [];
  while(bombs.length < numBombs){
    const bomb = Math.ceil(Math.random() * numberSquare);
    if(!bombs.includes(bomb)) bombs.push(bomb);
  }
  console.log(bombs);
  return bombs;
}

//5.
function endGame(isWin){
  revealBombs();
  //7. A fine gioco, "blocco" il gioco tramite un elemento creato e "appeso" al game_wrapper.
  const stop = document.createElement('div');
  stop.className = 'stop';
  main.append(stop);
  endGameMessagge.innerHTML = `Hai totalizzato ${points} punti!`
  stop.append(endGameMessagge);
  endGameMessagge.classList.add(endGameMessagge)

}

//6. Creo una funzione da utilizzare in endGame che mi fa visualizzare tutte le bombe, ciclando tutte le celle e verificando se il loro index è contenuto in positionBombs.

function revealBombs(){
  const squares = document.getElementsByClassName('square')
  for(let i = 0; i < squares.length; i++){
    const square = squares[i];
    if(positionBombs.includes(square._squareID)) square.classList.add('bomb')
  }
}


function reset(){
  main.innerHTML = '';
  positionBombs = [];
}