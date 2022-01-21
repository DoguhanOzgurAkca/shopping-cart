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
const saved = getStored();
const input = document.getElementById("input");
const button = document.getElementById("button");
const cart = document.getElementById("shoppingCart");
function createRowElements(nameIndex, paraText) {
  const newDiv = document.createElement("div");
  const newItem = document.createElement("p");
  const newButton = document.createElement("button");
  newItem.innerHTML = paraText;
  newItem.classList.add("newP");
  newDiv.classList.add("newDiv");
  newButton.classList.add("newButton");
  newButton.setAttribute("id", "button" + nameIndex);
  newButton.setAttribute("type", "button");
  newButton.setAttribute("class", "btn btn-close");
  newButton.setAttribute("aria-label", "Close");
  newItem.setAttribute("id", "para" + nameIndex);
  newDiv.setAttribute("id", "div" + nameIndex);
  cart.appendChild(newDiv);
  newDiv.appendChild(newButton);
  newDiv.appendChild(newItem);
}
function setStored(array) {
  arrayLength = array.length;
  for (i = 0; i < arrayLength; i++) {
    createRowElements(i, array[i]);
  }
}
setStored(saved);
button.onclick = function () {
  let i = 0;
  if (input.value === "") return;
  createRowElements(i, input.value);
  i++;
  saved.push(input.value);
  localStorage.setItem("saved", JSON.stringify(saved));
  input.value = "";
  console.log(saved);
};
const reset = document.getElementById("reset");
reset.onclick = function () {
  x = window.confirm("Listeyi sıfırlamak istediğine eminmisin?");
  if (x) {
    emptyArray(saved);
    localStorage.setItem("saved", JSON.stringify(saved));
    document.querySelectorAll(".newP").forEach((e) => e.remove());
  } else {
    return;
  }
};
