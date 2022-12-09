"use strict";
const board = [];
let originalXPos = "0";
let originalYPos = "0";
window.addEventListener("load", () => {
    let pieces = document.getElementsByClassName("piece");
    originalXPos = pieces.item(0).style.left;
    originalYPos = pieces.item(0).style.top;
});
dragElement(document.getElementsByClassName("piece").item(0));
function dragElement(piece) {
    var newXPos = 0, newYPos = 0, currentXPos = 0, currentYPos = 0;
    piece.onmousedown = dragMouseDown;
    function dragMouseDown(mouseEvent) {
        mouseEvent = mouseEvent || window.event;
        mouseEvent.preventDefault();
        currentXPos = mouseEvent.clientX;
        currentYPos = mouseEvent.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(mouseEvent) {
        mouseEvent = mouseEvent || window.event;
        mouseEvent.preventDefault();
        newXPos = currentXPos - mouseEvent.clientX;
        newYPos = currentYPos - mouseEvent.clientY;
        currentXPos = mouseEvent.clientX;
        currentYPos = mouseEvent.clientY;
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
