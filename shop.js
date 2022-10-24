function getStored(savedFile) {
  return JSON.parse(localStorage.getItem(savedFile)) || [];
}
function emptyArray(Array) {
  arrayLength = Array.length;
  for (c = 0; c < arrayLength + 1; c++) {
    Array.shift();
    console.log(Array.length);
  }
}
class Item {
  constructor(text, id, place) {
    this.text = text;
    this.id = id;
    this.place = place;
  }
}

const deleter = (element, index, boughtOrNew, boughtOrNew2) => {
  element.remove();
  boughtOrNew2.splice(index, 1);
  localStorage.setItem(boughtOrNew, JSON.stringify(boughtOrNew2));
  console.log(boughtOrNew2);
};
const saved = getStored("saved");
const savedBought = getStored("savedBought");
const input = document.getElementById("input");
const button = document.getElementById("button-addon2");
const cart = document.getElementById("shoppingCart");
const bought = document.getElementById("boughtItems");
const reset = document.getElementById("reset");

function addToList(inputValue, savedBought, savedBoughtString, place) {
  let i = 0;
  if (inputValue === "") {
    return console.error();
  }
  createRowElements(i, inputValue, place);
  console.log(i);
  i++;
  savedBought.push(inputValue);
  localStorage.setItem(savedBoughtString, JSON.stringify(savedBought));
  input.value = "";
  console.log(saved);
  console.log("bbb");
}

function createRowElements(nameIndex, paraText, place) {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "div" + nameIndex);
  newDiv.setAttribute("class", "row");
  place.appendChild(newDiv);
  function createNewParagraph() {
    const newItem = document.createElement("p");
    const newDivP = document.createElement("div");
    newItem.innerHTML = paraText;
    newItem.classList.add("newP");
    newDiv.classList.add("newDiv");
    newDivP.setAttribute("class", "col");
    newItem.setAttribute("id", "para" + nameIndex);
    if (place === cart) {
      newItem.ondblclick = () => {
        addToList(paraText, savedBought, "savedBought", bought);
        deleter(newDiv, nameIndex, "saved", saved);
      };
    } else if (place === bought) {
      newItem.ondblclick = () => {
        addToList(paraText, saved, "saved", cart);
        deleter(newDiv, nameIndex, "savedBought", savedBought);
      };
    }
    newDivP.appendChild(newItem);
    newDiv.appendChild(newDivP);
  }
  function createDeletionButton() {
    const newDivButton = document.createElement("div");
    const newButton = document.createElement("button");
    const newSpan = document.createElement("span");
    newSpan.innerHTML = "&times";
    newDivButton.setAttribute("class", "col");
    newButton.setAttribute("id", "button" + nameIndex);
    newButton.setAttribute("type", "button");
    newButton.setAttribute("class", "btn btn-danger newButton");
    newSpan.setAttribute("aria-hidden", "true");
    newButton.onclick = () => {
      deleter(newDiv, nameIndex, "saved", saved);
    };
    newDiv.appendChild(newDivButton);
    newDivButton.appendChild(newButton);
    newButton.appendChild(newSpan);
  }
  createDeletionButton();
  createNewParagraph();
}

function setStored(array, place) {
  arrayLength = array.length;
  for (c = 0; c < arrayLength; c++) {
    createRowElements(c, array[c], place);
  }
}

setStored(savedBought, bought);
setStored(saved, cart);

button.onclick = function () {
  addToList(input.value, saved, "saved", cart);
};
input.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    addToList(input.value, saved, "saved", cart);
  }
});

reset.onclick = function () {
  x = window.confirm("Are you sure you wanna reset the shopping list?");
  if (x) {
    emptyArray(saved);
    emptyArray(savedBought);
    localStorage.setItem("saved", JSON.stringify(saved));
    document.querySelectorAll(".newP").forEach((e) => e.remove());
    document.querySelectorAll(".newButton").forEach((e) => e.remove());
  } else {
    return;
  }
};
