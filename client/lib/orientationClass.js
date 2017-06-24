const addOrientation = () => {
  const vertClass = 'vertical'
  const width = window.innerWidth
  const height = window.innerHeight
  let classes = document.body.className
  if (height > width) {
    if (classes.indexOf(vertClass) === -1) {
      document.body.className = vertClass + ' ' + classes
    }
  } else {
    if (classes.indexOf(vertClass) !== -1) {
      document.body.className = classes.replace(`${vertClass} `, '')
    }
  }
}

const orientationClass = () => {
  addOrientation()
  window.addEventListener('resize', () => {
    addOrientation()
  })
}

module.exports = orientationClass
