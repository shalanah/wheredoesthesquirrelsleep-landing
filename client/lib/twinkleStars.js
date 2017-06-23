const getNightSkyDim = (canvas) => {
  // Win
  const width = window.innerWidth
  const height = window.innerHeight
  // Canvas
  canvas.width = width
  canvas.height = height
  // Return
  return {
    width,
    height
  }
}

const randomInt = (a, b) => ( Math.floor(Math.random() * (b - a + 1) + a) )

const totalItemsInArea = ({
  width,
  height,
  density
}) => (
  Math.round(width * height * density)
)

const twinkleStars = (canvas) => {
  /* Credits: http://www.html5canvastutorials.com/advanced/html5-canvas-animation-stage/ */
  window.requestAnimFrame = ((callback) => {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 30)
    }
  })()

  const drawCircle = ({
    id,
    cx,
    cy,
    radius,
    opacity
  }) => {
    /* Clear background pixels... has to be a square, and extra space to prevent halos */
    ctx.beginPath()
    ctx.clearRect(cx - radius - 1, cy - radius - 1, radius * 2 + 2, radius * 2 + 2)
    ctx.closePath()

    /* Draw circle */
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = `rgba(111,168,207,${opacity})`
    ctx.fill()
    return { // return so we only need to go through loop 1x for the push
      cx,
      cy,
      radius,
      opacity
    }
  }

  const getBlinkOpacityAndIncrease = ({opacity, increase, step, opacityMin, opacityMax}) => {
    if (increase) {
      if (opacity > opacityMax - step) {
        increase = false
        opacity = opacity - step
      } else {
        opacity = opacity + step
      }
    } else {
      if (opacity < opacityMin + step) {
        increase = true
        opacity = opacity + step
      } else {
        opacity = opacity - step
      }
    }
    return {opacity, increase}
  }

  // Only made for one time use... need to expand if you want many different blinks
  const blink = ({percent, step, opacityMin, opacityMax}) => {
    // Since the stars placement is random, we do not need to randomize which stars we pick
    for (let i = 0, len = Math.floor(stars.length * percent); i < len; i++) {
      let item = stars[i] // for easy ref
      let {opacity} = item
      let increase = item.increase !== undefined ? item.increase : randomInt(0, 1) === 1
      stars[i] = Object.assign(
        {},
        drawCircle(item), 
        getBlinkOpacityAndIncrease({opacity, increase, step, opacityMin, opacityMax})
      )
    }
    requestAnimFrame(() => {
      blink({percent, step, opacityMin, opacityMax})
    })
  }

  const drawStars = ({width, height, density}) => {
    // Star stats
    let arr = []
    const numStars = totalItemsInArea({width, height, density})
    for (let i = 0; i < numStars; i++) {
      arr.push(
        drawCircle({
          cx: randomInt(0, width),
          cy: randomInt(0, height),
          radius: Math.max(randomInt(0, 3), 1),
          opacity: Math.max(Math.random(), .1)
        })
      )
    }
    return arr
  }

  // Start
  let ctx = canvas.getContext('2d')
  let {width: winWidth, height: winHeight} = getNightSkyDim(canvas)
  let stars = drawStars({
    width: winWidth,
    height: winHeight,
    density: 3 / (100 * 100) // 3 per square 100px
  })
  blink({
    percent: .75,
    step: .027,
    opacityMin: 0,
    opacityMax: 1
  })

  // On resize
  window.addEventListener('resize', () => {
    let {width: _winWidth, height: _winHeight} = getNightSkyDim(canvas)

    // Only redraw if we have to... if width or height is larger
    if (_winWidth > winWidth || _winHeight > winHeight ) {
      winHeight = _winHeight
      winWidth = _winWidth

      stars = []

      // Let's clear everything
      ctx.clearRect(0, 0, winWidth, winHeight)

      stars = drawStars({
        width: winWidth,
        height: winHeight,
        density: 3 / 10000 // 3 per square 100px
      })
    }
  })
}

module.exports = twinkleStars