"use strict";
const chessBoard = document.getElementById("chess-board");
const PGNDisplay = document.getElementById("PGN");
const startingPositionFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const testFEN = "8/8/8/4p1K1/2k1P3/8/8/8";
const boardCoordinates = [
    ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
    ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
    ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
    ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
    ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
    ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
    ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
    ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"]
];
let FENStringPosition = 0;
let selectedPiece;
let PGN = "";
let colorsTurn = "white";
let turnNumber = 1;
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
function squareClickHandler(square) {
    console.log("square clicked");
    if (selectedPiece === null || selectedPiece === undefined || selectedPiece.getAttribute("selected") === "false") {
        return;
    }
    movePiece(selectedPiece, square, false);
}
function addPiecesToBoard() {
    const squares = document.querySelectorAll(".square");
    for (let i = 0; i < squares.length; i++) {
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
    let piece = document.createElement("div");
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
    if ((selectedPiece === null || selectedPiece === void 0 ? void 0 : selectedPiece.getAttribute("selected")) === "true") {
        handleClick(clickedPiece);
    }
    else {
        if (isWhite(clickedPiece) && colorsTurn === "white") {
            handleClick(clickedPiece);
        }
        else if (!isWhite(clickedPiece) && colorsTurn == "black") {
            handleClick(clickedPiece);
        }
    }
}
function handleClick(clickedPiece) {
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
            movePiece(selectedPiece, clickedPieceSquare, true);
        }
    }
}
function movePiece(piece, squareToMoveTo, isCapture) {
    let startingSquare = selectedPiece.parentElement.id;
    deselectPiece(selectedPiece);
    squareToMoveTo.appendChild(selectedPiece);
    generatePGN(piece.getAttribute("piece-type"), squareToMoveTo.id, startingSquare, isCapture);
}
function generatePGN(pieceType, squareMovedTo, squareMovedFrom, isCapture) {
    if (colorsTurn === "white") {
        PGN = PGN + turnNumber + ".";
        colorsTurn = "black";
    }
    else {
        turnNumber++;
        colorsTurn = "white";
    }
    if (pieceType !== "p" && pieceType !== "P") {
        PGN = PGN + pieceType;
    }
    else if (isCapture) {
        PGN = PGN + squareMovedFrom.charAt(0);
    }
    if (isCapture) {
        PGN = PGN + "x";
    }
    PGN = PGN + squareMovedTo + " ";
    PGNDisplay.textContent = PGN;
}
function deselectPiece(piece) {
    piece.setAttribute("selected", "false");
}
function selectPiece(piece) {
    piece.setAttribute("selected", "true");
}
function isSameColor(piece1, piece2) {
    let isPiece1White;
    let isPiece2White;
    if (isWhite(piece1)) {
        isPiece1White = true;
    }
    else {
        isPiece1White = false;
    }
    if (isWhite(piece2)) {
        isPiece2White = true;
    }
    else {
        isPiece2White = false;
    }
    if (isPiece1White === isPiece2White) {
        return true;
    }
    return false;
}
function isWhite(piece) {
    return piece.getAttribute("piece-type").toUpperCase() === piece.getAttribute("piece-type");
}
//# sourceMappingURL=app.js.map