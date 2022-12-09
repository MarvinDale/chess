"use strict";
const boardElement = document.getElementById("board");
const boardCoordinates = [
    "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
    "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
    "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
    "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
    "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
    "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
    "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
    "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"
];
let originalXPos = "0";
let originalYPos = "0";
window.onload = () => {
    for (let i = 0; i < boardCoordinates.length; i++) {
        let square = document.createElement("div");
        square.className = "tile";
        square.innerHTML = `<div id="${boardCoordinates[i]}" class="piece white-pawn"></div>`;
        boardElement.appendChild(square);
    }
};
window.addEventListener("load", () => {
    let pieces = document.getElementsByClassName("piece");
    originalXPos = pieces.item(0).style.left;
    originalYPos = pieces.item(0).style.top;
});
boardElement.addEventListener("mousedown", (event) => {
    let target = event === null || event === void 0 ? void 0 : event.target;
    console.log(target.id);
    if (target.id != "board") {
        dragPiece(document.getElementById(target.id));
    }
});
function dragPiece(piece) {
    let newXPos = 0;
    let newYPos = 0;
    let currentXPos = 0;
    let currentYPos = 0;
    let pieceBoundingRect = piece.getBoundingClientRect();
    currentXPos = (pieceBoundingRect.left + pieceBoundingRect.right) / 2;
    currentYPos = (pieceBoundingRect.top + pieceBoundingRect.bottom) / 2;
    document.onmouseup = dropPiece;
    document.onmousemove = movePiece;
    function movePiece(mouseEvent) {
        mouseEvent = mouseEvent || window.event;
        mouseEvent.preventDefault();
        newXPos = currentXPos - mouseEvent.clientX;
        newYPos = currentYPos - mouseEvent.clientY;
        currentXPos = mouseEvent.clientX;
        currentYPos = mouseEvent.clientY;
        piece.style.top = piece.offsetTop - newYPos + "px";
        piece.style.left = piece.offsetLeft - newXPos + "px";
    }
    function dropPiece() {
        document.onmouseup = null;
        document.onmousemove = null;
        piece.style.top = originalYPos;
        piece.style.left = originalXPos;
    }
}
//# sourceMappingURL=app.js.map