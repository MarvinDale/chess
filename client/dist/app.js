"use strict";
const board = [];
let originalXPos = "0";
let originalYPos = "0";
window.addEventListener("load", (e) => {
    let pieces = document.getElementsByClassName("piece");
    originalXPos = pieces.item(0).style.left;
    originalYPos = pieces.item(0).style.top;
});
dragElement(document.getElementsByClassName("piece").item(0));
function dragElement(piece) {
    var newXPos = 0, newYPos = 0, currentXPos = 0, currentYPos = 0;
    piece.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        currentXPos = e.clientX;
        currentYPos = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        newXPos = currentXPos - e.clientX;
        newYPos = currentYPos - e.clientY;
        currentXPos = e.clientX;
        currentYPos = e.clientY;
        piece.style.top = piece.offsetTop - newYPos + "px";
        piece.style.left = piece.offsetLeft - newXPos + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        piece.style.top = originalYPos;
        piece.style.left = originalXPos;
    }
}
