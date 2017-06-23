require('./styles/app.scss')
const onLoadAnimations = require('./lib/onLoadAnimations')
const twinkleStars = require('./lib/twinkleStars')

// Executing things for our app :) 
// - Since this isn't too complicated of an app... let's excute things here
twinkleStars(document.getElementById('bg'))
onLoadAnimations()
