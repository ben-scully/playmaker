"use strict"

function createArrow (x, y) {
  var arrow = new createjs.Shape()
  arrow.graphics.setStrokeStyle(5).beginStroke('Red')
  arrow.graphics.moveTo(x, y).lineTo(x+50, y+200)
  arrow.graphics.endStroke()

  return arrow
}

function createHandle (x, y) {
  var arrowHandle = new createjs.Shape()
  arrowHandle.graphics.beginFill("Purple")
  arrowHandle.graphics.drawRect(x, y, 30, 30)

  return arrowHandle
}
