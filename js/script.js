$(init)

function init () {


  // Create stage from Canvas & set Ticker to refresh Canvas
  var stage = new createjs.Stage("myCanvas")
  createjs.Ticker.addEventListener("tick", function (e) {
    stage.update()
  })



  // Add the initial 'elements to the Canvas'
  var palette = createPalette()
  stage.addChild(palette)

  var circle = createCircle()
  stage.addChild(circle)

  var cross = createCross()
  stage.addChild(cross)

  var arrow = createArrow(100, 100)
  var arrowStart = createHandle(100, 100)
  var arrowEnd = createHandle(100+50, 100+200)
  stage.addChild(arrow)
  stage.addChild(arrowStart)
  stage.addChild(arrowEnd)




  // listeners create functionality:
  // click on a Circle in the palette
  // it creates a clone of the Circle
  // then the clone Circle follows your mouse until you click
  // if your click is on the 'field' (the yellow bit): put it down on the 'field'
  // if your click is on the 'palette': destroy the cloned Circle

  // ALSO; add a listener to the cloned Circle so it is click & draggable
  // after it has been dropped on the 'field'
  circle.addEventListener("click", function (e) {
    var circle2 = createCircle("Green")
    stage.addChild(circle2)

    var firstClick = false
    circle2.addEventListener("click", function (e) {
      firstClick = !firstClick
      circle2.addEventListener("mousedown", function (e) {
        if (firstClick) {
          stage.addEventListener("stagemousemove", followMouse)
        } else {
          if (palette.hitTest(stage.mouseX, stage.mouseY)) {
            stage.removeChild(circle2)
          }
          stage.removeEventListener("stagemousemove", followMouse)
        }
      })
    })

    stage.addEventListener("stagemousemove", followMouse)
    stage.addEventListener("stagemousedown", wrongPositionDestroy)

    function followMouse (e) {
      circle2.x = e.stageX - 100
      circle2.y = e.stageY - 50
    }

    function wrongPositionDestroy (e) {
      if (palette.hitTest(stage.mouseX, stage.mouseY)) {
        stage.removeChild(circle2)
      }
      stage.removeEventListener("stagemousemove", followMouse)
      stage.removeEventListener("stagemousedown", wrongPositionDestroy)
    }
  })

  var bool = false
  arrowEnd.addEventListener("click", function (e) {
    console.log("drunk")
    bool = !bool
    if (bool) {
      stage.addEventListener("stagemousemove", followMouse)
      stage.addEventListener("stagemousedown", stopDragging)

      console.log("Arrow: ", arrow)

      function followMouse (e) {
        arrow.graphics.clear()
        arrow.graphics.setStrokeStyle(5).beginStroke('Red')
        arrow.graphics.moveTo(100, 100).lineTo(e.stageX, e.stageY)
        arrow.graphics.endStroke()

        arrowEnd.graphics.clear()
        arrowEnd.graphics.beginFill("Purple").drawRect(e.stageX, e.stageY, 30, 30)
      }

      function stopDragging (e) {
        console.log("picnic")
        stage.removeEventListener("stagemousemove", followMouse)
      }
    }
  })

  var bool = false
  arrowStart.addEventListener("click", function (e) {
    console.log("drunk")
    bool = !bool
    if (bool) {
      stage.addEventListener("stagemousemove", followMouse)
      stage.addEventListener("stagemousedown", stopDragging)

      function followMouse (e) {
        arrow.graphics.clear()
        arrow.graphics.setStrokeStyle(5).beginStroke('Red')
        arrow.graphics.moveTo(100, 100).lineTo(e.stageX, e.stageY)
        arrow.graphics.endStroke()

        arrowEnd.graphics.clear()
        arrowEnd.graphics.beginFill("Purple").drawRect(e.stageX, e.stageY, 30, 30)
      }

      function stopDragging (e) {
        console.log("picnic")
        stage.removeEventListener("stagemousemove", followMouse)
      }
    }
  })
}



function createPalette () {
  var palette = new createjs.Shape()
  palette.graphics.beginFill("Blue")
  palette.graphics.drawRect(0, 0, 600, 100)

  return palette
}

function createCircle (color) {
  var circle = new createjs.Shape()
  circle.graphics.beginFill("DeepSkyBlue")

  if (color !== undefined)
    circle.graphics.beginFill(color)

  circle.graphics.drawCircle(100, 50, 20)
  return circle
}

function createCross (color) {
  var cross = new createjs.Shape()
  cross.graphics.beginFill("Red")

  if (color !== undefined)
    cross.graphics.beginFill(color)

  cross.graphics.drawRect(250, 50, 30, 30)
  return cross
}

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


















// cross.addEventListener("click", function (e) {
//   var cross2 = createCross("Green")
//   stage.addChild(cross2)
//
//   stage.addEventListener("stagemousemove", followMouse)
//   stage.addEventListener("stagemousedown", wrongPositionDestroy)
//
//   function followMouse (e) {
//     cross2.x = e.stageX - 250-15
//     cross2.y = e.stageY - 50-15
//   }
//
//   function wrongPositionDestroy (e) {
//     if (palette.hitTest(stage.mouseX, stage.mouseY)) {
//       stage.removeChild(cross2)
//     }
//     stage.removeEventListener("stagemousemove", followMouse)
//     stage.removeEventListener("stagemousedown", wrongPositionDestroy)
//   }
// })
