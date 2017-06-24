require('./styles/app.scss')

const onLoadAnimations = require('./lib/onLoadAnimations')
const twinkleStars = require('./lib/twinkleStars')
const orientationClass = require('./lib/orientationClass')

// Executing things for our app :)
// Since this is a landing page... let's execute here:
twinkleStars(document.getElementById('bg'))
onLoadAnimations()
orientationClass()
