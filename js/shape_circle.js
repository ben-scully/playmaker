"use strict"

function drawCircle (x, y, size) {
  var cross = new createjs.Shape()
  cross.graphics.beginFill("Red").drawCircle(x, y, size)
  return cross
}

function redrawCircle (existing, x, y, size) {
  existing.x = x
  existing.y = y
  existing.graphics.beginFill("Red").drawCircle(x, y, size)
  return true
}

module.exports = {
  drawCircle: drawCircle,
  redrawCircle: redrawCircle
}
