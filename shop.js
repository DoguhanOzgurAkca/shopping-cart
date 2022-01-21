function getStored() {
  return JSON.parse(localStorage.getItem("saved")) || [];
}
function emptyArray(Array) {
  arrayLength = Array.length;
  for (i = 0; i < arrayLength + 1; i++) {
    Array.shift();
    console.log(Array.length);
  }
}

const deleter = (element) => {
  element.remove();
};

const saved = getStored();
const input = document.getElementById("input");
const button = document.getElementById("button-addon2");
const cart = document.getElementById("shoppingCart");
const reset = document.getElementById("reset");

function createRowElements(nameIndex, paraText) {
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", "div" + nameIndex);
  newDiv.setAttribute("class", "row");

  const newItem = document.createElement("p");
  const newButton = document.createElement("button");
  const newSpan = document.createElement("span");
  const newDivButton = document.createElement("div");
  const newDivP = document.createElement("div");
  newItem.innerHTML = paraText;
  newSpan.innerHTML = "&times";

  newItem.classList.add("newP");

  newDiv.classList.add("newDiv");

  newButton.setAttribute("id", "button" + nameIndex);
  newButton.setAttribute("type", "button");
  newButton.setAttribute("class", "btn btn-danger newButton");
  newButton.onclick = () => {
    deleter(newDiv);
  };

  newItem.setAttribute("id", "para" + nameIndex);

  newDivButton.setAttribute("class", "col");
  newDivP.setAttribute("class", "col");
  newSpan.setAttribute("aria-hidden", "true");
  cart.appendChild(newDiv);

  newDiv.appendChild(newDivButton);
  newDiv.appendChild(newDivP);
  newDivP.appendChild(newItem);
  newDivButton.appendChild(newButton);
  newButton.appendChild(newSpan);
}

function setStored(array) {
  arrayLength = array.length;
  for (i = 0; i < arrayLength; i++) {
    createRowElements(i, array[i]);
  }
}

setStored(saved);
function addToList() {
  let i = 0;
  if (input.value === "") {
    return console.error();
  }
  createRowElements(i, input.value);
  i++;
  saved.push(input.value);
  localStorage.setItem("saved", JSON.stringify(saved));
  input.value = "";
  console.log(saved);
}
button.onclick = function () {
  addToList();
};
input.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    addToList();
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
