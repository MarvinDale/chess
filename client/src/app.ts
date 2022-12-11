const chessBoard = document.getElementById("chess-board")!;
const startingPositionFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const testFEN = "8/8/8/4p1K1/2k1P3/8/8/8";

let FENStringPosition = 0;
let selectedPiece: HTMLElement | null;

createBoard();
addPiecesToBoard();

function createBoard() {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("data-color", (i + j) % 2 === 0 ? "white" : "black");
      square.addEventListener("click", () => {
        squareClickHandler(square);
      });
      chessBoard.appendChild(square);
    }
  }
}

function squareClickHandler(square: HTMLDivElement) {
  // Check if there's a piece selected
  // Check if there is already a piece on this square
  console.log("square clicked");
  if (selectedPiece === null || selectedPiece === undefined || selectedPiece.getAttribute("selected") === "false") {
    return;
  }
  //the selected piece to this square
  deselectPiece(selectedPiece);
  square.appendChild(selectedPiece);
}

function addPiecesToBoard() {
  const squares = document.querySelectorAll(".square");
  for (var i = 0; i < squares.length; i++) {
    let square = squares[i] as HTMLDivElement;
    i = parseFEN(startingPositionFEN, i, square);
  }
}

function parseFEN(FENString: string, squareIndex: number, square: HTMLDivElement) {
  let FEN = FENString.replace(/\//g, "");

  // FEN chars that are numbers are empty squares
  if (!isNaN(+FEN.charAt(FENStringPosition))) {
    // update squre index to skip empty squares
    squareIndex = squareIndex + +FEN.charAt(FENStringPosition) - 1;
  } else {
    placePiece(square, FEN.charAt(FENStringPosition));
  }

  FENStringPosition++;
  return squareIndex;
}

function placePiece(square: HTMLDivElement, FENChar: string) {
  var piece = document.createElement("div");
  piece.classList.add("piece");
  piece.setAttribute("piece-type", FENChar);

  piece.addEventListener("click", (event: Event) => {
    pieceClickHandler(event);
  });
  square.appendChild(piece);
}

function pieceClickHandler(event: Event) {
  // when you click a piece this stops the square being clicked too
  event.stopPropagation();
  let clickedPiece = event.target as HTMLDivElement;
  console.log("piece clicked: " + clickedPiece);
  // if there are no pieces selected, select the clicked piece
  if (selectedPiece === null || selectedPiece === undefined || selectedPiece.getAttribute("selected") === "false") {
    selectedPiece = clickedPiece;
    selectPiece(selectedPiece);
  }
  // if there is already a piece selected
  else if (selectedPiece.getAttribute("selected") === "true") {
    // if you clicked the selected piece again, deselect it
    if (selectedPiece === clickedPiece) {
      deselectPiece(selectedPiece);
      // otherwise replace the clicked piece with the selected piece and deselect
    } else if (
      isSameColor(selectedPiece.getAttribute("piece-type")!) === isSameColor(clickedPiece.getAttribute("piece-type")!)
    ) {
      deselectPiece(selectedPiece);
      selectedPiece = clickedPiece;
      selectPiece(selectedPiece);
    } else {
      let clickedPieceSquare = clickedPiece.parentElement;
      clickedPiece.remove();
      clickedPieceSquare?.appendChild(selectedPiece);
      deselectPiece(selectedPiece);
    }
  }
}

function deselectPiece(piece: HTMLElement) {
  piece.setAttribute("selected", "false");
}

function selectPiece(piece: HTMLElement) {
  piece.setAttribute("selected", "true");
}

// used to check if FEN chars are the same case
// same case means the pieces are the same color
function isSameColor(str: string): boolean {
  if (str.toUpperCase() === str) {
    return true;
  } else {
    return false;
  }
}
