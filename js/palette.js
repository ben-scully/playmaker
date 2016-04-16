"use strict"

function drawPalette (x, y, width, height) {
  var palette = new createjs.Shape()
  palette.graphics.beginFill("Blue").drawRect(x, y, width, height)
  return palette
}

function addSwatches (palette, ...swatches) {
  swatches.forEach( function (each) {
    palette.addChild(each)
  })
}

module.exports = {
  drawPalette: drawPalette,
  addSwatches: addSwatches
}
