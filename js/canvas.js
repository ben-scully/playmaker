"use strict"

function createCanvas(id) {
  var canvas = new createjs.Stage(id)
  createjs.Ticker.addEventListener("tick", function (e) {
    canvas.update()
  })
  return canvas
}

module.exports = createCanvas
