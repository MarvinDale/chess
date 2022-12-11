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
        // Check if there is already a piece on this square
        if (selectedPiece == null || square.children.length > 0) {
          return;
        }
        // Move the selected piece to this square
        selectedPiece.setAttribute("selected", "false");
        square.appendChild(selectedPiece);
        selectedPiece = null;
      });

      chessBoard.appendChild(square);
    }
  }
}

function addPiecesToBoard() {
  const squares = document.querySelectorAll(".square");
  for (var i = 0; i < squares.length; i++) {
    let square = squares[i] as HTMLDivElement;
    i = parseFEN(startingPositionFEN, i, square);
  }
}

function parseFEN(
  FENString: string,
  squareIndex: number,
  square: HTMLDivElement
) {
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
    if (selectedPiece !== null && selectedPiece !== undefined) {
      selectedPiece.setAttribute("selected", "false");
    }

    selectedPiece = event.target as HTMLDivElement;
    selectedPiece.setAttribute("selected", "true");
  });
  square.appendChild(piece);
}
