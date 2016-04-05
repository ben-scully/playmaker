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
      console.log("Should this be here?: ", oneIcon)
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

    if (e.layerX > oneIcon.x && e.layerX < (oneIcon.x + oneIcon.size)) {
      if (e.layerY > oneIcon.y && e.layerY < (oneIcon.y + oneIcon.size)) {

        index = icon
        break
      }
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

    placedIcons.push(oneIcon)
  }
  else {
    console.log("No icon held.")
  }
}



function paintOneIcon (ctx, oneIcon) {
  // "Paint" the square
  ctx.fillStyle = "#00ff00"
  ctx.fillRect( oneIcon.x, oneIcon.y, oneIcon.size, oneIcon.size )
  // Add the symbol X's, O's, A's
  ctx.fillStyle = 'blue'
  ctx.font = '12pt Calibri'
  ctx.fillText( oneIcon.symbol, oneIcon.x, oneIcon.y + oneIcon.size )
}


function paintOneArrow (ctx, oneIcon) {
  console.log("Paint ARROW called: ", oneIcon)
  ctx.beginPath()
  ctx.moveTo(oneIcon.x, oneIcon.y)
  ctx.lineTo(oneIcon.x + 5, oneIcon.y - 20)
  ctx.closePath()
  ctx.stroke()
}



$(init)

function init () {
  setupIcons()
  reRender()

  document.getElementById("myCanvas").addEventListener("click", function (e) {

    if ( !hasClickedPalette(e) )
      if ( !hasClickedExisting(e) )
        placeNewIcon(e)

    reRender()

    console.log( "Array of PlaceIcons: ")
    placedIcons.map( function (each) {
      console.log(each)
    })
  })
}
