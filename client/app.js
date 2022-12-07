// Make the DIV element draggable:
dragElement(document.getElementById("piece"));

function dragElement(piece) {
  var newXPos = 0,
    newYPos = 0,
    currentXPos = 0,
    currentYPos = 0;

  piece.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    currentXPos = e.clientX;
    currentYPos = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    newXPos = currentXPos - e.clientX;
    newYPos = currentYPos - e.clientY;
    currentXPos = e.clientX;
    currentYPos = e.clientY;
    // set the element's new position:
    piece.style.top = piece.offsetTop - newYPos + "px";
    piece.style.left = piece.offsetLeft - newXPos + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
