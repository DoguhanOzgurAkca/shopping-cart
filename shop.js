function getStored(value) {
  return JSON.parse(localStorage.getItem(value)) || [];
}
function emptyArray(Array) {
  arrayLength = Array.length;
  for (i = 0; i < arrayLength + 1; i++) {
    Array.shift();
    console.log(Array.length);
  }
}
const deleter = (element, index) => {
  element.remove();
  saved.splice(index, 1);
  localStorage.setItem("saved", JSON.stringify(saved));
};
const saved = getStored("saved");
const savedBought = getStored("savedBought");
const input = document.getElementById("input");
const button = document.getElementById("button-addon2");
const cart = document.getElementById("shoppingCart");
const bought = document.getElementById("boughtItems");
const reset = document.getElementById("reset");

function createRowElements(nameIndex, paraText) {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "div" + nameIndex);
  newDiv.setAttribute("class", "row");
  const BoughtDiv = document.createElement("div");
  BoughtDiv.setAttribute("id", "div" + nameIndex);
  BoughtDiv.setAttribute("class", "row");
  cart.appendChild(newDiv);
  bought.appendChild(BoughtDiv);
  function createNewParagraph() {
    const newItem = document.createElement("p");
    const newDivP = document.createElement("div");
    newItem.innerHTML = paraText;
    newItem.innerHTML = paraText;
    newItem.classList.add("newP");
    newDiv.classList.add("newDiv");
    newDivP.setAttribute("class", "col");
    newItem.setAttribute("id", "para" + nameIndex);
    newItem.ondblclick = () => {
      BoughtDiv.appendChild(newDivP);
      newDivP.appendChild(newItem);
      deleter(newDiv, nameIndex);
      newItem.ondblclick = () => {
        addToList(newItem.innerHTML);
        deleter(BoughtDiv, nameIndex);
      };
    };
    newDiv.appendChild(newDivP);
    newDivP.appendChild(newItem);
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
      deleter(newDiv, nameIndex);
    };
    newDiv.appendChild(newDivButton);
    newDivButton.appendChild(newButton);
    newButton.appendChild(newSpan);
    console.log("b");
  }
  createDeletionButton();
  createNewParagraph();
}

function setStored(array) {
  arrayLength = array.length;
  for (i = 0; i < arrayLength; i++) {
    createRowElements(i, array[i], cart);
  }
}

setStored(saved);
setStored(savedBought);
function addToList(pText) {
  let i = 0;
  if (pText === "") {
    return console.error();
  }
  createRowElements(i, pText, cart);
  i++;
  saved.push(pText);
  localStorage.setItem("saved", JSON.stringify(saved));
  pText = "";
  console.log(saved);
}
button.onclick = function () {
  addToList(input.value);
};
input.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    addToList(input.value);
  }
});

reset.onclick = function () {
  x = window.confirm("Listeyi sıfırlamak istediğine eminmisin?");
  if (x) {
    emptyArray(saved);
    localStorage.setItem("saved", JSON.stringify(saved));
    document.querySelectorAll(".newP").forEach((e) => e.remove());
    document.querySelectorAll(".newButton").forEach((e) => e.remove());
  } else {
    return;
  }
};
