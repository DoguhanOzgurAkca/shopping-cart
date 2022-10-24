function getStored(savedFile) {
  return JSON.parse(localStorage.getItem(savedFile)) || [];
}
const saved1 = [
  {
    text: "",
    id: "",
    place: "",
  },
];
function getFromLocale() {
  const text = getStored("text");
  const id = getStored("id");
  const place = getStored("place");

  for (let i = 0; i < text.length; i++) {
    const temp = [
      {
        text: text[i],
        id: id[i],
        place: place[i],
      },
    ];
    saved1[i] = temp;
  }
}
getFromLocale();
console.log(saved1);
const id = saved1.length;
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
  console.log("BBBBBBBB");
  if (inputValue === "") {
    return console.error();
  }
  createElements(inputValue);
  saved[id].push(inputValue);
  localStorage.setItem("text", JSON.stringify(saved1.text));
  localStorage.setItem("id", JSON.stringify(saved1.id));
  localStorage.setItem("place", JSON.stringify(saved1.place));

  if (savedBought === saved) {
    input.value = "";
  }
  console.log(saved);
  console.log("bbb");
}

function createBoughtElement(nameIndex, paraText) {
  const BoughtDiv = document.createElement("div");
  BoughtDiv.setAttribute("id", "div" + nameIndex);
  BoughtDiv.setAttribute("class", "row");
  BoughtDiv.classList.add("newDiv");
  bought.appendChild(BoughtDiv);
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
  cart.appendChild(newDiv);
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
    newButton.setAttribute("id", "button" + id);
    newButton.setAttribute("type", "button");
    newButton.setAttribute("class", "btn btn-danger newButton");
    newSpan.setAttribute("aria-hidden", "true");
    newButton.onclick = () => {
      deleter(newDiv, id, "saved", saved);
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
  x = window.confirm("Are you sure you wanna reset the shopping list?");
  if (x) {
    emptyArray(saved);
    localStorage.setItem("saved", JSON.stringify(saved));
    document.querySelectorAll(".newP").forEach((e) => e.remove());
    document.querySelectorAll(".newButton").forEach((e) => e.remove());
  } else {
    return;
  }
};
