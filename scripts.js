let stressNo = 103;

class MainClass {
  constructor(id, name, img) {
    this.id = id;
    this.name = name;
    this.img = img;
  }
}

let one1 = new MainClass(11, "one", "./images/icons8-1-48.png");
let one2 = new MainClass(12, "one", "./images/icons8-1-48.png");
let one3 = new MainClass(13, "one", "./images/icons8-1-48.png");
let zero = new MainClass(0, "zero", "./images/icons8-0-48.png");
let stress1 = new MainClass(101, "stress", "./images/icons8-stress-48.png");
let stress2 = new MainClass(102, "stress", "./images/icons8-stress-48.png");
let stress3 = new MainClass(103, "stress", "./images/icons8-stress-48.png");

let two1 = new MainClass(21, "two", "./images/icons8-2-48.png");
let two2 = new MainClass(22, "two", "./images/icons8-2-48.png");
let two3 = new MainClass(23, "two", "./images/icons8-2-48.png");

let three1 = new MainClass(31, "three", "./images/icons8-3-48.png");
let three2 = new MainClass(32, "three", "./images/icons8-3-48.png");
let three3 = new MainClass(33, "three", "./images/icons8-3-48.png");

let four1 = new MainClass(41, "four", "./images/icons8-mir-4-48.png");
let four2 = new MainClass(42, "four", "./images/icons8-mir-4-48.png");
let four3 = new MainClass(43, "four", "./images/icons8-mir-4-48.png");

let five = new MainClass(55, "five", "./images/icons8-5-48.png");

let heat1 = new MainClass("h1", "heat", "./images/icons8-fire-48.png");
let heat2 = new MainClass("h2", "heat", "./images/icons8-fire-48.png");
let heat3 = new MainClass("h3", "heat", "./images/icons8-fire-48.png");
let heat4 = new MainClass("h4", "heat", "./images/icons8-fire-48.png");
let heat5 = new MainClass("h5", "heat", "./images/icons8-fire-48.png");
let heat6 = new MainClass("h6", "heat", "./images/icons8-fire-48.png");
let heat7 = new MainClass("h7", "heat", "./images/icons8-fire-48.png");

let mainDeck = [
  zero,
  one1,
  one2,
  one3,
  two1,
  two2,
  two3,
  three1,
  three2,
  three3,
  four1,
  four2,
  four3,
  five,
  heat1,
  stress2,
  stress1,
  stress3,
];
let heatDeck = [heat2, heat3, heat4, heat5, heat6, heat7];
let handDeck = [];
let discardDeck = [];

let boardElement = document.getElementById("board");
let heatElement = document.getElementById("heat");
let handElement = document.getElementById("hand");
let discardElement = document.getElementById("discard");
let probabilityElement = document.getElementById("probabilityDiv");

function boardFunction(arr) {
  boardElement.innerHTML = "";
  probabilityElement.innerHTML = "";
  for (let element of arr) {
    const html = `
            <li class="flex gap-1 my-3 items-center border-2 rounded-xl">
            <img src = '${element.img}' > 
            
            <button class="btn btn-outline btn-xs mr-1" onclick="handFunction('${element.id}', this)"> Draw </button>
            </li>
            
        `;

    //  probability(arr)

    boardElement.insertAdjacentHTML("beforeend", html);
  }
  let [heat, stress, zero, one, two, three, four, five] =
    probabilityFunction(arr);

  const html2 = `
  ${zero ? `<div class="flex items-center gap-1 font-bold justify-evenly"><img src="./images/icons8-0-48.png"> ${zero.toFixed(2)} %</div>` : ""}
    ${one ? `<div class="flex items-center gap-1 font-bold justify-evenly"><img src="./images/icons8-1-48.png"> ${one.toFixed(2)} %</div>` : ""}
    ${two ? `<div class="flex items-center gap-1 font-bold justify-evenly"><img src="./images/icons8-2-48.png"> ${two.toFixed(2)}%</div>` : ""}
    ${three ? `<div class="flex items-center gap-1 font-bold justify-evenly"><img src="./images/icons8-3-48.png"> ${three.toFixed(2)}%</div>` : ""}
    ${four ? `<div class="flex items-center gap-1 font-bold justify-evenly"><img src="./images/icons8-mir-4-48.png"> ${four.toFixed(2)}%</div>` : ""}
    ${five ? `<div class="flex items-center gap-1 font-bold justify-evenly"><img src="./images/icons8-5-48.png"> ${five.toFixed(2)}%</div>` : ""}
    ${heat ? `<div class="flex items-center gap-1 font-bold justify-evenly"><img src="./images/icons8-fire-48.png"> ${heat.toFixed(2)}%</div>` : ""}
    ${stress ? `<div class="flex items-center gap-1 font-bold justify-evenly"><img src="./images/icons8-stress-48.png"> ${stress.toFixed(2)}%</div>` : ""}

      
  `;
  probabilityElement.insertAdjacentHTML("beforeend", html2);
}

function heatFunction(arr) {
  heatElement.innerHTML = "";
  for (element of arr) {
    html = `
        <li class="flex gap-5 my-3 items-center"> 
        <button class="btn btn-success btn-xs" onclick="heatBack('${element.id}', this)"> Back </button>           
            <img src = '${element.img}' > 
            <button class="btn btn-neutral btn-xs" onclick="heatToDiscard('${element.id}', this)"> Play </button>
        </li>`;
    heatElement.insertAdjacentHTML("beforeend", html);
  }
}

function handEntryFunction(arr) {
  handElement.innerHTML = "";
  for (element of arr) {
    html = `
        <li class="flex gap-5 my-3 items-center">
            <button class="btn btn-success btn-xs" onclick="handBack('${
              element.id
            }')"> Back </button>
            <img src = '${element.img}' > 
            
            ${
              element.name == "heat"
                ? `<button class="btn btn-info btn-xs" onclick="heatDeal('${element.id}', this)">Cool</button>`
                : `<button class="btn btn-neutral btn-xs" onclick="discardFunction('${element.id}', this)"> Play/Discard </button>`
            }
        </li>`;
    handElement.insertAdjacentHTML("beforeend", html);
  }
}

function discardEntryFunction(arr) {
  discardElement.innerHTML = "";
  for (element of arr) {
    html = `
        <li class="flex gap-5 my-3 items-center">
            <button class="btn btn-success btn-xs" onclick="discardBack('${element.id}', this)"> Back</button>
            <img src = '${element.img}' > 
            
        </li>`;
    discardElement.insertAdjacentHTML("beforeend", html);
  }
}

function handFunction(id, element) {
  let selectedItem = mainDeck.filter((e) => e.id == id);
  let result = mainDeck.filter((e) => e.id != id);
  mainDeck = result;
  handDeck.push(selectedItem[0]);

  handEntryFunction(handDeck.sort((a, b) => a.id - b.id));
  boardFunction(mainDeck.sort((a, b) => a.id - b.id));
}

function discardFunction(id) {
  let selectedItem = handDeck.filter((e) => e.id == id);
  let result = handDeck.filter((e) => e.id != id);
  handDeck = result;
  discardDeck.push(selectedItem[0]);
  discardEntryFunction(discardDeck.sort((a, b) => a.id - b.id));
  handEntryFunction(handDeck.sort((a, b) => a.id - b.id));
}

function heatDeal(id) {
  let selectedItem = handDeck.filter((e) => e.id == id);
  let result = handDeck.filter((e) => e.id != id);
  handDeck = result;
  heatDeck.push(selectedItem[0]);
  heatFunction(heatDeck);
  handEntryFunction(handDeck.sort((a, b) => a.id - b.id));
}

document.getElementById("shuffle").addEventListener("click", () => {
  mainDeck = mainDeck.concat(discardDeck);

  discardDeck = [];
  boardFunction(mainDeck.sort((a, b) => a.id - b.id));
  discardEntryFunction(discardDeck.sort((a, b) => a.id - b.id));
});

function heatToDiscard(id) {
  let selectedItem = heatDeck.filter((e) => e.id == id);
  let result = heatDeck.filter((e) => e.id != id);
  heatDeck = result;
  discardDeck.push(selectedItem[0]);
  discardEntryFunction(discardDeck.sort((a, b) => a.id - b.id));
  heatFunction(heatDeck);
}

function handBack(id) {
  let selectedItem = handDeck.filter((e) => e.id == id);
  let result = handDeck.filter((e) => e.id != id);
  handDeck = result;
  mainDeck.push(selectedItem[0]);
  handEntryFunction(handDeck.sort((a, b) => a.id - b.id));
  boardFunction(mainDeck.sort((a, b) => a.id - b.id));
}

function heatBack(id) {
  //   handle(id, heatDeck, handDeck, heatFunction, handEntryFunction);
  let selectedItem = heatDeck.filter((e) => e.id == id);
  let result = heatDeck.filter((e) => e.id != id);
  heatDeck = result;
  handDeck.push(selectedItem[0]);
  heatFunction(heatDeck);
  handEntryFunction(handDeck.sort((a, b) => a.id - b.id));
}

function discardBack(id) {
  let selectedItem = discardDeck.filter((e) => e.id == id);
  let result = discardDeck.filter((e) => e.id != id);
  discardDeck = result;
  if (selectedItem[0].name == "heat") {
    heatDeck.push(selectedItem[0]);
    heatFunction(heatDeck.sort((a, b) => a.id - b.id));
    discardEntryFunction(discardDeck.sort((a, b) => a.id - b.id));
  } else {
    handDeck.push(selectedItem[0]);
    handEntryFunction(handDeck.sort((a, b) => a.id - b.id));
    discardEntryFunction(discardDeck.sort((a, b) => a.id - b.id));
  }
}

function addStress() {
  stressNo = stressNo + 1;
  let stress4 = new MainClass(
    stressNo,
    "stress",
    "./images/icons8-stress-48.png"
  ); 
  mainDeck.push(stress4);
  boardFunction(mainDeck.sort((a, b) => a.id - b.id));
}

boardFunction(mainDeck.sort((a, b) => a.id - b.id));
heatFunction(heatDeck);
