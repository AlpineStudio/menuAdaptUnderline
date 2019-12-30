let nav = document.querySelector('.nav')
let navItems = document.querySelectorAll('.nav li')
const line = document.createElement('div')
line.className = 'line'
nav.append(line)

let commonLeft, lineWidth

function setLinedown(coords = {from: null, to: null}) {
  commonLeft = 0

  for(let i = 0; i < navItems.length; i++) {
    if(coords.to === null || coords.to >= navItems.length) {
      if(navItems[i].classList.contains('active')) {
        coords.to = i
        break
      }
      commonLeft += parseFloat(getComputedStyle(navItems[i]).width)
    } else {
      if(i < coords.to) {
        commonLeft += parseFloat(getComputedStyle(navItems[i]).width)
      }
    }
  }
  if(coords.from != null) {
    let diff = coords.to - coords.from
    let commonWidth = commonLeft = 0

    if(coords.to > coords.from) {
      //next

      for(let i = coords.from; i <= coords.to; i++) {
        commonWidth += parseFloat(getComputedStyle(navItems[i]).width)
      }
      //add spaces
      setTimeout(() => {
        const navStyles = getComputedStyle(navItems[coords.to])
        line.style.width = parseFloat(navStyles.width) + 'px'

        for(let i = 0; i < coords.to; i++) {
          commonLeft += parseFloat(getComputedStyle(navItems[i]).width)
        }
        commonLeft += parseInt(getComputedStyle(navItems[coords.to]).marginLeft) * (2 * coords.to + 1)

        line.style.left = parseFloat(commonLeft.toFixed(2)) + 'px'
      }, 300)

      commonWidth += 20 * 2 * diff
      line.style.width = commonWidth + 'px'

    } else {
      diff = -diff
      //prev
      for(let i = coords.from; i >= coords.to; i--) {
        commonWidth += parseFloat(getComputedStyle(navItems[i]).width)
      }
      for(let i = 0; i < coords.to; i++) {
        console.log(i)
        commonLeft += parseFloat(getComputedStyle(navItems[i]).width)
      }
      commonLeft += parseInt(getComputedStyle(navItems[coords.to]).marginLeft) * (2 * coords.to + 1)

      setTimeout(() => {
        line.style.width = parseFloat(getComputedStyle(navItems[coords.to]).width) + 'px'
      }, 300)

      commonWidth += 20 * 2 * diff
      line.style.width = commonWidth + 'px'
      line.style.left = commonLeft + 'px'
    }
  } else {
    const navStyles = getComputedStyle(navItems[coords.to])
    line.style.width = parseFloat(navStyles.width) + 'px'

    commonLeft += parseInt(getComputedStyle(navItems[coords.to]).marginLeft) * (2 * coords.to + 1)
    line.style.left = parseFloat(commonLeft.toFixed(2)) + 'px'
  }

}

setLinedown()

nav.addEventListener('click', function(e) {
  if(e.target.tagName.toLowerCase() === 'a') {
      e.preventDefault()

      const targetNode = e.target.parentNode
      // Get current menu item
      let crMenuItem = (function() {
        for(let i = 0; i < navItems.length; i++) {
          if(navItems[i].classList.contains('active')) return i
        }
        return false
      }())


      for(let i = 0; i < navItems.length; i++) {
        if(targetNode === navItems[i]) {


          setLinedown({
            from: crMenuItem,
            to: i
          })
          navItems[i].classList.add('active')
        } else {
          navItems[i].classList.remove('active')
        }
      }
  }
})