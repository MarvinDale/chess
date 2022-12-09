const boardElement: HTMLElement = document.getElementById("board")!;

// prettier-ignore
const boardCoordinates: string[] = [
  "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
  "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
  "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
  "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
  "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
  "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
  "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
  "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"
]

let originalXPos: string = "0";
let originalYPos: string = "0";

window.onload = () => {
  for (let i = 0; i < boardCoordinates.length; i++) {
    let square = document.createElement("div");
    //square.className = "tile";
    square.className = `piece white-pawn ${boardCoordinates[i]}`;
    square.id = boardCoordinates[i];
    //square.innerHTML = `<div id="${boardCoordinates[i]}" class="piece white-pawn b8"></div>`;
    boardElement.appendChild(square);
  }
};

window.addEventListener("load", () => {
  let pieces = document.getElementsByClassName(
    "piece"
  ) as HTMLCollectionOf<HTMLElement>;
  originalXPos = pieces.item(0)!.style.left;
  originalYPos = pieces.item(0)!.style.top;
});

boardElement.addEventListener("mousedown", (event: MouseEvent) => {
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
