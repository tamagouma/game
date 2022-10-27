const cards = [];
const suits = ["S", "D", "H", "C"];
let n = 0;

function Card(suit, num) {
  this.suit = suit;
  this.num = num;
  this.front = `${this.suit}${(this.num)}.png`;
}

for (let i = 0; i < suits.length; i++) {
    for (let j = 1; j <= 13; j++) {
        let card = new Card(suits[i], j);
        cards.push(card);
    }
}

function shuffle(arrays) {
  const array = arrays.slice();
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

const newgames = shuffle(cards);

for (const element of newgames) {
  console.log(element);
}

// 1枚目のカードの変数を宣言 最初はnull
let firstCard = null;
// setTimeoutを格納する変数
let flipTimerId = NaN;

function flipTest(e){
  let flipedCard = e.target;
  console.log(flipedCard)
  if (!flipedCard.classList.contains("back")) {
    console.log("2");
    return; //表のカードをクリックしても何も反応させない。
  }
  flipedCard.classList.remove("back");
  if (firstCard === null) {
    firstCard = flipedCard;
console.log("1");
  }else{
    if (flipedCard.id === firstCard.id) {
      firstCard = null
      console.log("3");
      n++;
      counter.innerHTML = n;
    }
    else{
      flipTimerId = setTimeout(function (){
      firstCard.classList.add("back");
      flipedCard.classList.add("back");
      flipTimerId = NaN;
      firstCard = null;
      n++;
      counter.innerHTML = n;
    },1300)
    }
  }
}

//const table = document.getElementById("table");
const table = document.querySelector(".table");
function shufflecard() {
  const shuffled = shuffle(cards);
  for (let i = 0; i < suits.length; i++) {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    for (let j = 0; j < 13; j++) {
      const td = document.createElement("td");
      td.clientWidth = 100;
      td.clientHeight = 100;
      //td.innerHTML = shuffled[i*13+j].suit + "" + shuffled[i*13+j].num;
      td.innerHTML = "　　　　<br /><br /><br /><br />";
      td.classList.add("card", "back");
      td.onclick = flipTest;
      td.style.backgroundImage = `url(img/${newgames[i * 13 + j].front}`;
      td.style.backgroundSize = "75px 113px";
      td.setAttribute('id',newgames[i * 13 + j].num);
//console.log(`url(img/${newgames[i * 13 + j].front}`);
      tr.appendChild(td);
    }
  }
}
shufflecard();

