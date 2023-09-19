const main = document.querySelector('.game_wrapper');
const playBtn = document.querySelector('#play')

const levelSelected = document.querySelector('#level');

const levels = [100, 81, 49]
let numberSquare;


playBtn.addEventListener('click', play);

let positionBomb = [];

// ----- Function ----- //

function play(){
  numberSquare = levels[levelSelected.value]
  reset();
  generatePlayGrid();
}

function generatePlayGrid(){
  const grid = document.createElement('div');
  grid.classList.add('grid')

  const positionBomb = randomListBomb(numberSquare);
  console.log(positionBomb);

  for(let i = 0; i < numberSquare; i++) {
    const square = createSquare(i);
    if(positionBomb.includes(i)){
      square.classList.add('bomb')
    } 
    console.log(square)
    grid.append(square)
  }

  main.append(grid)
}

function createSquare(index){
  const square =  document.createElement('div');
  square.className = 'square';
  square.classList.add('square' + numberSquare);
  square._squareID = index;
  square.addEventListener('click', hendlerClickSquare)

  return square;
}

function hendlerClickSquare(){

  let flag = true;
  let point = 0;
  do{
    if(this.classList.contains('bomb')){
      console.log('hai perso')
      flag = false;
    }else{
      this.classList.add('clicked');
      this.removeEventListener('click', hendlerClickSquare);
      point++;
    }

  }
  while(flag === false)
}

function reset(){
  main.innerHTML = '';
  positionBomb = [];
}

function randomListBomb(index){
  while(positionBomb.length < 16){
    let randomNum = Math.ceil(Math.random() * index);
    if(!positionBomb.includes(randomNum)) {
      positionBomb.push(randomNum);
    } 

  }
  return positionBomb;
}