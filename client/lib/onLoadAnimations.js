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