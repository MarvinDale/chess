const chessBoard: HTMLElement = document.getElementById("chess-board")!;
const PGNDisplay: HTMLElement = document.getElementById("PGN")!;
const startingPositionFEN: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const testFEN: string = "8/8/8/4p1K1/2k1P3/8/8/8";

// prettier-ignore
const boardCoordinates: string[][] = [
  ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
  ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
  ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
  ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
  ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
  ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"]
]

let FENStringPosition: number = 0;
let selectedPiece: HTMLElement | null;
let PGN: string = "";
let colorsTurn: string = "white";
let turnNumber: number = 1;

createBoard();
addPiecesToBoard();

function createBoard() {
  for (let file = 0; file < 8; file++) {
    for (let rank = 0; rank < 8; rank++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.id = boardCoordinates[file][rank];
      square.setAttribute("data-color", (file + rank) % 2 === 0 ? "white" : "black");
      square.addEventListener("click", () => {
        squareClickHandler(square);
      });
      chessBoard.appendChild(square);
    }
  }
}

function squareClickHandler(square: HTMLDivElement) {
  // Check if there's a piece selected
  if (isNoPieceSelected()) {
    return;
  }
  movePiece(selectedPiece!, square, false);
}

function addPiecesToBoard() {
  const squares = document.querySelectorAll(".square");
  for (let i = 0; i < squares.length; i++) {
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
    setupPiecesOnBoard(square, FEN.charAt(FENStringPosition));
  }

  FENStringPosition++;
  return squareIndex;
}

function setupPiecesOnBoard(square: HTMLDivElement, FENChar: string) {
  let piece = document.createElement("div");
  piece.classList.add("piece");
  piece.setAttribute("piece-type", FENChar);
  piece.addEventListener("click", (event: Event) => {
    pieceClickHandler(event);
  });
  square.appendChild(piece);
}

function pieceClickHandler(event: Event) {
  event.stopPropagation(); // when you click a piece this stops the square being clicked too
  let clickedPiece = event.target as HTMLDivElement;

  if (selectedPiece?.getAttribute("selected") === "true") {
    handleClick(clickedPiece);
  } else if (
    (isWhitePiece(clickedPiece) && colorsTurn === "white") ||
    (!isWhitePiece(clickedPiece) && colorsTurn === "black")
  ) {
    handleClick(clickedPiece);
  }
}

function handleClick(clickedPiece: HTMLElement) {
  // if there are no pieces selected, select the clicked piece
  if (isNoPieceSelected()) {
    selectPiece(clickedPiece);
  } else {
    // if you clicked the selected piece again, deselect it
    if (selectedPiece === clickedPiece) {
      deselectPiece(selectedPiece);
      // otherwise replace the clicked piece with the selected piece and deselect
    } else if (isSameColor(selectedPiece!, clickedPiece)) {
      deselectPiece(selectedPiece!);
      selectPiece(clickedPiece);
    } else {
      movePiece(selectedPiece!, clickedPiece.parentElement!, true, clickedPiece);
    }
  }
}

function movePiece(piece: HTMLElement, squareToMoveTo: HTMLElement, isCapture: boolean, capturedPiece?: HTMLElement) {
  capturedPiece?.remove();

  let startingSquare = selectedPiece!.parentElement!.id;
  deselectPiece(selectedPiece!);
  squareToMoveTo.appendChild(selectedPiece!);
  generatePGN(piece.getAttribute("piece-type")!, squareToMoveTo.id, startingSquare, isCapture);
}

function generatePGN(pieceType: string, squareMovedTo: string, squareMovedFrom: string, isCapture: boolean) {
  if (colorsTurn === "white") {
    PGN += turnNumber + ".";
    colorsTurn = "black";
  } else {
    turnNumber++;
    colorsTurn = "white";
  }

  if (pieceType !== "p" && pieceType !== "P") {
    PGN += pieceType;
  } else if (isCapture) {
    PGN += squareMovedFrom.charAt(0);
  }

  if (isCapture) {
    PGN += "x";
  }

  PGN += squareMovedTo + " ";
  PGNDisplay.textContent = PGN;
}

function deselectPiece(piece: HTMLElement) {
  piece.setAttribute("selected", "false");
}

function selectPiece(piece: HTMLElement) {
  selectedPiece = piece;
  selectedPiece.setAttribute("selected", "true");
}

// used to check if FEN chars are the same case
// same case means the pieces are the same color
function isSameColor(piece1: HTMLElement, piece2: HTMLElement): boolean {
  let isPiece1White;
  let isPiece2White;

  isWhitePiece(piece1) ? (isPiece1White = true) : (isPiece1White = false);
  isWhitePiece(piece2) ? (isPiece2White = true) : (isPiece2White = false);

  return isPiece1White === isPiece2White;
}

function isWhitePiece(piece: HTMLElement): boolean {
  return piece.getAttribute("piece-type")!.toUpperCase() === piece.getAttribute("piece-type");
}

function isNoPieceSelected(): Boolean {
  return selectedPiece === null || selectedPiece === undefined || selectedPiece.getAttribute("selected") === "false";
}
