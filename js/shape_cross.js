"use strict"

function drawCross (x, y, size) {
  var cross = new createjs.Shape()
  cross.graphics.beginFill("Red").drawRect(x, y, size, size)
  return cross
}

function redrawCross (existing, x, y, size) {
  existing.x = x
  existing.y = y
  existing.graphics.beginFill("Red").drawRect(x, y, size, size)
  return true
}

module.exports = {
  drawCross: drawCross,
  redrawCross: redrawCross
}
