const wrapper = document.querySelectorAll('.wrapper')
const carousel = document.querySelector('.carousel')
const arrowBtns = document.querySelectorAll('.wrapper i')
const firstCardWidth = carousel.querySelector('.card').offsetWidth
const carouselChildrens = [...carousel.children]

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId // false faz parar

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

arrowBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    console.log(btn.id)
    carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth
  })
})

const dragStart = e => {
  isDragging = true // faz funcinar
  carousel.classList.add('dragging') //adiciona a class dragging
  // registra o cursor inicial e a posição de rolagem do carrossel
  startX = e.pageX
  startScrollLeft = carousel.scrollLeft
}

const dragging = e => {
  if (!isDragging) return //se isDragging for false retorne aqui
  //   Atualiza a posição de rolagem do carrossel com base no movimento do cursor
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStop = () => {
  isDragging = false // faz parar
  carousel.classList.remove('dragging') // remove a class dragging
}

const autoPlay = () => {
  if(window.innerWidth < 800) return
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500)
}

autoPlay()

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add('no-transition')
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth
    carousel.classList.remove('no-transition')
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add('no-transition')
    carousel.scrollLeft = carousel.scrollWidth
    carousel.classList.remove('no-transition')
  }

  clearTimeout(timeoutId)
  if(!wrapper.matches(":hover")) autoPlay()
}

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dragging)

document.addEventListener('mouseup', dragStop)
carousel.addEventListener('scroll', infiniteScroll)

wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId))
wrapper.addEventListener('mouseleave', autoPlay)


