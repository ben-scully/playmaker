var paletteIcons = []
var placedIcons = []
var selectedIcon = {}


function setupIcons () {
    paletteIcons.push( createX(100, 50) )
    paletteIcons.push( createO(300, 50) )
    paletteIcons.push( createA(500, 50) )

    selectedIcon = createSelected()
}

function createX (xCoord, yCoord) {
  return {
    x: xCoord,
    y: yCoord,
    size: 20,
    symbol: "X"
  }
}

function createO (xCoord, yCoord) {
  return {
    x: xCoord,
    y: yCoord,
    size: 20,
    symbol: "O"
  }
}

function createA (xCoord, yCoord) {
  return {
    x: xCoord,
    y: yCoord,
    size: 20,
    symbol: "A"
  }
}

function createSelected () {
  return {
    x: 10,
    y: 10,
    size: 20,
    symbol: "-"
  }
}



function reRender () {
  var canvas = document.getElementById('myCanvas')
  var ctx = canvas.getContext('2d')

	ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (var icon in paletteIcons) {
    var oneIcon = paletteIcons[icon]
    paintOneIcon(ctx, oneIcon)
  }

  for (var icon in placedIcons) {
    var oneIcon = placedIcons[icon]

    if (oneIcon.symbol === "A") {
      paintOneArrow(ctx, oneIcon)
    }

    paintOneIcon(ctx, oneIcon)
  }

  paintOneIcon(ctx, selectedIcon)
}



function hasClickedPalette (e) {

  for (var icon in paletteIcons) {
    var oneIcon = paletteIcons[icon]

    if (e.layerX > oneIcon.x && e.layerX < (oneIcon.x + oneIcon.size)) {
      if (e.layerY > oneIcon.y && e.layerY < (oneIcon.y + oneIcon.size)) {

        selectedIcon.symbol = oneIcon.symbol
        return true
      }
    }
  }
  return false
}



function hasClickedExisting (e) {
  var index = -1

  for (var icon in placedIcons) {
    var oneIcon = placedIcons[icon]

    if ( inBounds(e, oneIcon) ) {
      index = icon
      break
    }
  }

  if (index !== -1) {
    placedIcons.splice(index, 1)
    return true
  }

  return false
}



function placeNewIcon (e) {

  if ( selectedIcon.symbol !== "-" ) {
    var oneIcon = {
      x: e.layerX,
      y: e.layerY,
      size: 20,
      symbol: selectedIcon.symbol
    }

    if (selectedIcon.symbol === "A") {
      oneIcon = createArrow( e.layerX, e.layerY )
    }

    placedIcons.push(oneIcon)
  }
  else {
    console.log("No icon held.")
  }
}



function paintOneIcon (ctx, oneIcon, color ) {
  // "Paint" the square
  ctx.fillStyle = color || "#00ff00"
  ctx.fillRect( oneIcon.x, oneIcon.y, oneIcon.size, oneIcon.size )
  // Add the symbol X's, O's, A's
  ctx.fillStyle = 'blue'
  ctx.font = '12pt Calibri'
  ctx.fillText( oneIcon.symbol, oneIcon.x, oneIcon.y + oneIcon.size )
}


function paintOneArrow (ctx, oneIcon, color) {
  ctx.beginPath()
  ctx.moveTo(oneIcon.start.x, oneIcon.start.y)
  ctx.lineTo(oneIcon.end.x, oneIcon.end.y)
  ctx.closePath()
  ctx.strokeStyle = color || "#000000"
  ctx.stroke()

  paintOneIcon(ctx, oneIcon.startHandle, color)
  paintOneIcon(ctx, oneIcon.endHandle, color)
}


var dragging = false
var justDragged = false
var dragObj

$(init)

function init () {
  setupIcons()
  reRender()

  document.getElementById("myCanvas").addEventListener("mousedown", function (e) {
    console.log("mousedown")
    dragging = true

    for (var i in placedIcons) {
      if ( placedIcons[i].symbol === "A" ) {
        var start = placedIcons[i].startHandle
        var end = placedIcons[i].endHandle
        if ( inBounds(e, start) ) {
          dragObj = [placedIcons[i], "start"]
          console.log("start ! @ !")
        }
        if ( inBounds(e, end) ) {
          dragObj = [placedIcons[i], "end"]
          console.log("end ! @ !")
        }
      }
    }
  })

  document.getElementById("myCanvas").addEventListener("mouseup", function (e) {
    console.log("mouseup")
    dragging = false
    if ( dragObj ) {
      justDragged = true
    } else {
      justDragged = false
    }
    dragObj = undefined
  })

  document.getElementById("myCanvas").addEventListener("mousemove", function (e) {

    if (dragging) {
      console.log("draggin :)")

      if (dragObj[1] === "start") {
        dragObj[0].start.x = e.layerX
        dragObj[0].start.y = e.layerY
        dragObj[0].startHandle.x = e.layerX
        dragObj[0].startHandle.y = e.layerY
      }
      else {
        dragObj[0].end.x = e.layerX
        dragObj[0].end.y = e.layerY
        dragObj[0].endHandle.x = e.layerX
        dragObj[0].endHandle.y = e.layerY
      }

      reRender()
    }
    for (var i in placedIcons) {
      if ( placedIcons[i].symbol === "A" ) {
        var start = placedIcons[i].startHandle
        var end = placedIcons[i].endHandle
        if ( inBounds(e, start) || inBounds(e, end) ) {
          var ctx = this.getContext('2d')

          paintOneArrow(ctx, placedIcons[i], "red")
        }
      }
    }
  })

  document.getElementById("myCanvas").addEventListener("click", function (e) {

    if ( !hasClickedPalette(e) )
      if ( !hasClickedExisting(e) )
        if ( !justDragged )
          placeNewIcon(e)

    reRender()

    console.log( "Array of PlaceIcons: ")
    placedIcons.map( function (each) {
      console.log(each)
    })
  })
}


function createArrow (xCoord, yCoord) {
  return {
    symbol: "A",
    start: {
      x: xCoord,
      y: yCoord
    },
    end: {
      x: xCoord + 10,
      y: yCoord - 10
    },
    startHandle: {
      x: xCoord,
      y: yCoord,
      size: 5,
      symbol: ""
    },
    endHandle: {
      x: xCoord + 10,
      y: yCoord - 10,
      size: 5,
      symbol: ""
    }
  }
}



function inBounds (e, rect) {
  if (e.layerX > rect.x && e.layerX < (rect.x + rect.size)) {
    if (e.layerY > rect.y && e.layerY < (rect.y + rect.size)) {
      return true
    }
  }
  return false
}
