const board: HTMLElement = document.getElementById("board")!;

let originalXPos: string = "0";
let originalYPos: string = "0";

window.addEventListener("load", () => {
  let pieces = document.getElementsByClassName(
    "piece"
  ) as HTMLCollectionOf<HTMLElement>;
  originalXPos = pieces.item(0)!.style.left;
  originalYPos = pieces.item(0)!.style.top;
});

board.addEventListener("mousedown", (event: MouseEvent) => {
  let target = event?.target as HTMLElement;
  console.log(target.id);
  if (target.id != "board") {
    dragPiece(document.getElementById(target.id)!);
  }
});

// Make the DIV element draggable:
//dragElement(document.getElementsByClassName("piece").item(0) as HTMLElement);

function dragPiece(piece: HTMLElement) {
  let newXPos = 0;
  let newYPos = 0;
  let currentXPos = 0;
  let currentYPos = 0;
  let pieceBoundingRect = piece.getBoundingClientRect();

  currentXPos = (pieceBoundingRect.left + pieceBoundingRect.right) / 2;
  currentYPos = (pieceBoundingRect.top + pieceBoundingRect.bottom) / 2;

  document.onmouseup = dropPiece;
  document.onmousemove = movePiece;

  function movePiece(mouseEvent: MouseEvent) {
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

  function dropPiece() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    piece.style.top = originalYPos;
    piece.style.left = originalXPos;
  }
}
