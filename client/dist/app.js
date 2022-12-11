"use strict";
const chessBoard = document.getElementById("chess-board");
const startingPositionFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const testFEN = "8/8/8/4p1K1/2k1P3/8/8/8";
let FENStringPosition = 0;
let selectedPiece;
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
function squareClickHandler(square) {
    console.log("square clicked");
    if (selectedPiece === null || selectedPiece === undefined || selectedPiece.getAttribute("selected") === "false") {
        return;
    }
    deselectPiece(selectedPiece);
    square.appendChild(selectedPiece);
}
function addPiecesToBoard() {
    const squares = document.querySelectorAll(".square");
    for (var i = 0; i < squares.length; i++) {
        let square = squares[i];
        i = parseFEN(startingPositionFEN, i, square);
    }
}
function parseFEN(FENString, squareIndex, square) {
    let FEN = FENString.replace(/\//g, "");
    if (!isNaN(+FEN.charAt(FENStringPosition))) {
        squareIndex = squareIndex + +FEN.charAt(FENStringPosition) - 1;
    }
    else {
        placePiece(square, FEN.charAt(FENStringPosition));
    }
    FENStringPosition++;
    return squareIndex;
}
function placePiece(square, FENChar) {
    var piece = document.createElement("div");
    piece.classList.add("piece");
    piece.setAttribute("piece-type", FENChar);
    piece.addEventListener("click", (event) => {
        pieceClickHandler(event);
    });
    square.appendChild(piece);
}
function pieceClickHandler(event) {
    event.stopPropagation();
    let clickedPiece = event.target;
    console.log("piece clicked: " + clickedPiece);
    if (selectedPiece === null || selectedPiece === undefined || selectedPiece.getAttribute("selected") === "false") {
        selectedPiece = clickedPiece;
        selectPiece(selectedPiece);
    }
    else if (selectedPiece.getAttribute("selected") === "true") {
        if (selectedPiece === clickedPiece) {
            deselectPiece(selectedPiece);
        }
        else if (isSameColor(selectedPiece, clickedPiece)) {
            deselectPiece(selectedPiece);
            selectedPiece = clickedPiece;
            selectPiece(selectedPiece);
        }
        else {
            let clickedPieceSquare = clickedPiece.parentElement;
            clickedPiece.remove();
            clickedPieceSquare === null || clickedPieceSquare === void 0 ? void 0 : clickedPieceSquare.appendChild(selectedPiece);
            deselectPiece(selectedPiece);
        }
    }
}
function deselectPiece(piece) {
    piece.setAttribute("selected", "false");
}
function selectPiece(piece) {
    piece.setAttribute("selected", "true");
}
function isSameColor(piece1, piece2) {
    let isPiece1UpperCase;
    let isPiece2UpperCase;
    piece1.getAttribute("piece-type");
    piece2.getAttribute("piece-type");
    if (piece1.getAttribute("piece-type").toUpperCase() === piece1.getAttribute("piece-type")) {
        isPiece1UpperCase = true;
    }
    else {
        isPiece1UpperCase = false;
    }
    if (piece2.getAttribute("piece-type").toUpperCase() === piece2.getAttribute("piece-type")) {
        isPiece2UpperCase = true;
    }
    else {
        isPiece2UpperCase = false;
    }
    if (isPiece1UpperCase === isPiece2UpperCase) {
        return true;
    }
    return false;
}
//# sourceMappingURL=app.js.map