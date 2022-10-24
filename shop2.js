function getStored(savedFile) {
  return JSON.parse(localStorage.getItem(savedFile)) || [];
}
function emptyArray(Array) {
  arrayLength = Array.length;
  for (i = 0; i < arrayLength + 1; i++) {
    Array.shift();
    console.log(Array.length);
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

function addToList(inputValue, savedBought, savedBoughtString, createElements) {
  let i = 0;
  console.log("BBBBBBBB");
  if (inputValue === "") {
    return console.error();
  }
  createElements(i, inputValue);
  i++;
  savedBought.push(inputValue);
  localStorage.setItem(savedBoughtString, JSON.stringify(savedBought));
  input.value = "";
  console.log(saved);
  console.log("bbb");
}

function createBoughtElement(nameIndex, paraText) {
  const BoughtDiv = document.createElement("div");
  BoughtDiv.setAttribute("id", "div" + nameIndex);
  BoughtDiv.setAttribute("class", "row");
  BoughtDiv.classList.add("newDiv");
  cart.appendChild(BoughtDiv);
  function createBoughtParagraph() {
    const newItem = document.createElement("p");
    const newDivP = document.createElement("div");
    newItem.innerHTML = paraText;
    newItem.classList.add("newP");
    newDivP.setAttribute("class", "col");
    newItem.setAttribute("id", "para" + nameIndex);
    newItem.ondblclick = () => {
      addToList(paraText, saved, "saved", createRowElements);
      deleter(BoughtDiv, nameIndex, "savedBought", savedBought);
    };
    newDivP.appendChild(newItem);
    BoughtDiv.appendChild(newDivP);
  }
  function createDeletionButton() {
    const newDivButtonP = document.createElement("div");
    const newButton = document.createElement("button");
    const newSpan = document.createElement("span");
    newSpan.innerHTML = "&times";
    newDivButtonP.setAttribute("class", "col");
    newButton.setAttribute("id", "button" + nameIndex);
    newButton.setAttribute("type", "button");
    newButton.setAttribute("class", "btn btn-danger newButton");
    newSpan.setAttribute("aria-hidden", "true");
    newButton.onclick = () => {
      deleter(BoughtDiv, nameIndex, "savedBought", savedBought);
    };
    BoughtDiv.appendChild(newDivButtonP);
    newDivButtonP.appendChild(newButton);
    newButton.appendChild(newSpan);
  }
  createDeletionButton();
  createBoughtParagraph();
}

function createRowElements(nameIndex, paraText) {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "div" + nameIndex);
  newDiv.setAttribute("class", "row");
  bought.appendChild(newDiv);
  function createNewParagraph() {
    const newItem = document.createElement("p");
    const newDivP = document.createElement("div");
    newItem.innerHTML = paraText;
    newItem.classList.add("newP");
    newDiv.classList.add("newDiv");
    newDivP.setAttribute("class", "col");
    newItem.setAttribute("id", "para" + nameIndex);
    newItem.ondblclick = () => {
      addToList(paraText, savedBought, "savedBought", createBoughtElement);
      deleter(newDiv, nameIndex, "saved", saved);
    };
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

function setStored(array, createElements) {
  arrayLength = array.length;
  for (i = 0; i < arrayLength; i++) {
    createElements(i, array[i]);
  }
}

setStored(savedBought, createBoughtElement);
setStored(saved, createRowElements);

button.onclick = function () {
  addToList(input.value, saved, "saved", createRowElements);
};
input.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    addToList(input.value, saved, "saved", createRowElements);
  }
});

reset.onclick = function () {
  x = window.confirm("Listeyi sıfırlamak istediğine emin misin?");
  if (x) {
    emptyArray(saved);
    localStorage.setItem("saved", JSON.stringify(saved));
    document.querySelectorAll(".newP").forEach((e) => e.remove());
    document.querySelectorAll(".newButton").forEach((e) => e.remove());
  } else {
    return;
  }
};
