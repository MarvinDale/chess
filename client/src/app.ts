const startingPositionFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
let FENStringPosition = 0;
const boardElement: HTMLElement = document.getElementById("board")!;

const chessBoard = document.getElementById("chess-board")!;
let selectedPiece: HTMLElement | null;

createBoard();
addPiecesToBoard();

function createBoard() {
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("data-color", (i + j) % 2 === 0 ? "black" : "white");
      square.addEventListener("click", () => {
        // Check if there is already a piece on this square
        if (selectedPiece == null || square.children.length > 0) {
          return;
        }
        // Move the selected piece to this square
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
    i = parseFEN(i, square);
  }
}

function parseFEN(i: number, square: HTMLDivElement) {
  let FEN = startingPositionFEN.replace(/\//g, "");

  if (!isNaN(+FEN.charAt(FENStringPosition))) {
    i = i + +FEN.charAt(FENStringPosition) - 1;
  } else {
    placePiece(square, FEN.charAt(FENStringPosition));
  }

  FENStringPosition++;
  return i;
}

function placePiece(square: HTMLDivElement, FENChar: string) {
  var piece = document.createElement("div");
  piece.classList.add("piece");
  piece.setAttribute("piece-type", FENChar);

  piece.addEventListener("click", (event: Event) => {
    selectedPiece = event.target as HTMLDivElement;
  });
  square.appendChild(piece);
}
