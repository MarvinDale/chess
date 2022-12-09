const board: string[] = [];

let originalXPos: string = "0";
let originalYPos: string = "0";

window.addEventListener("load", () => {
  let pieces = document.getElementsByClassName(
    "piece"
  ) as HTMLCollectionOf<HTMLElement>;
  originalXPos = pieces.item(0)!.style.left;
  originalYPos = pieces.item(0)!.style.top;
});

// Make the DIV element draggable:
dragElement(document.getElementsByClassName("piece").item(0) as HTMLElement);

function dragElement(piece: HTMLElement) {
  var newXPos = 0,
    newYPos = 0,
    currentXPos = 0,
    currentYPos = 0;

  piece.onmousedown = dragMouseDown;

  function dragMouseDown(mouseEvent: MouseEvent) {
    mouseEvent = mouseEvent || window.event;
    mouseEvent.preventDefault();
    // get the mouse cursor position at startup:
    currentXPos = mouseEvent.clientX;
    currentYPos = mouseEvent.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(mouseEvent: MouseEvent) {
    mouseEvent = mouseEvent || window.event;
    mouseEvent.preventDefault();
    // calculate the new cursor position:
    newXPos = currentXPos - mouseEvent.clientX;
    newYPos = currentYPos - mouseEvent.clientY;
    currentXPos = mouseEvent.clientX;
    currentYPos = mouseEvent.clientY;
    // set the element's new position:
    piece.style.top = piece.offsetTop - newYPos + "px";
    piece.style.left = piece.offsetLeft - newXPos + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    piece.style.top = originalYPos;
    piece.style.left = originalXPos;
  }
}
