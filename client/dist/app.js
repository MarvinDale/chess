"use strict";
const boardElement = document.getElementById("board");
const chessBoard = document.getElementById("chess-board");
let selectedPiece;
createBoard();
addPiecesToBoard();
function createBoard() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("data-color", (i + j) % 2 === 0 ? "black" : "white");
            square.addEventListener("click", () => {
                if (selectedPiece == null || square.children.length > 0) {
                    return;
                }
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
        let square = squares[i];
        var row = (i / 8) | 0;
        if (row === 1 || row === 6) {
            var piece = document.createElement("div");
            piece.classList.add("piece");
            piece.addEventListener("click", (event) => {
                selectedPiece = event.target;
            });
            square.appendChild(piece);
        }
        else if (row === 0 || row === 7) {
        }
    }
}
//# sourceMappingURL=app.js.map