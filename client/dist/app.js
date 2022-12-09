"use strict";
const board = document.getElementById("board");
let originalXPos = "0";
let originalYPos = "0";
window.addEventListener("load", () => {
    let pieces = document.getElementsByClassName("piece");
    originalXPos = pieces.item(0).style.left;
    originalYPos = pieces.item(0).style.top;
});
board.addEventListener("mousedown", (event) => {
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