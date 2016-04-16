"use strict"

var createCanvas = require('./canvas')
var paletteJS = require('./palette')
var crossJS = require('./shape_cross')
var circleJS = require('./shape_circle')
// var arrowJS = requre('./shape_arrow')

// GLOBALS
var canvasID = "myCanvas" // HTML Canvas ID
var canvas                // stage
var palette
var swatchBox
var crossSize = 30
var circleSize = 20

$(init)

function init () {
  // Create stage from Canvas & set Ticker to refresh Canvas
  canvas = createCanvas(canvasID)

  var cross = crossJS.drawCross(50, 50, crossSize, crossSize)
  var circle = circleJS.drawCircle(200, 50, circleSize)
  // var arrow = arrowJS.drawArrow()

  swatchBox = new createjs.Container()
  swatchBox.addChild(cross)
  swatchBox.addChild(circle)
  // swatchBox.addChild(arrow)

  paletteBox = new createjs.Container()
  palette = paletteJS.drawPalette()



  canvas.addChild(palette)
}
