/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const onLoadAnimations = () => {
  window.onload = () => {
    const anim = document.getElementsByClassName('anim')
    for (let i = 0, len = anim.length; i < len; i++) {
      anim[i].classList.add('anim-' + i)
    }
    document.body.classList.add('loaded')
  }
}

module.exports = onLoadAnimations

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)
const onLoadAnimations = __webpack_require__(0)
const twinkleStars = __webpack_require__(1)

// Executing things for our app :) 
// - Since this isn't too complicated of an app... let's excute things here
twinkleStars(document.getElementById('bg'))
onLoadAnimations()


/***/ })
/******/ ]);