class Carousel {

  constructor(element, options = {}) {
    this.element = element;
    this.options = Object.assign({}, {
      slidesToScroll: 1,
      slidesVisible: 1,
      loop: false
    }, options);
    let children = [].slice.call(element.children);
    this.isMobile = false
    this.cuurentItem = 0
    this.moveCallbacks = []

    // DOM
    this.root = this.createDivWithClass('carousel')
    this.carouselContainer = this.createDivWithClass('carousel__container')
    this.root.setAttribute('tabindex', '0')
    this.root.appendChild(this.carouselContainer)
    this.element.appendChild(this.root);
    this.items = children.map((child) => {
      let item = this.createDivWithClass('carousel__item')
      item.appendChild(child)
      this.carouselContainer.appendChild(item)
      return item;
    })
    this.setStyle()
    this.createNavigation()

    // Event
    this.onWindowResize()
    this.moveCallbacks.forEach(cb => cb(0))
    window.addEventListener('resize', this.onWindowResize.bind(this))
    this.root.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Right' /* for IE or Edge compatibility */) {
        this.next()
      } else if (e.key === 'ArrowLeft' || e.key === 'Left' /* for IE or Edge compatibility */) {
        this.prev() 
      }
    })
  }

  setStyle() {
    let ratio = this.items.length / this.slidesVisible;
    this.carouselContainer.style.width = (ratio * 100) + "%";
    this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%");
  }

  createNavigation() {
    let nextButton = this.createDivWithClass('carousel__next')
    let prevButton = this.createDivWithClass('carousel__prev')
    this.root.appendChild(nextButton)
    this.root.appendChild(prevButton)
    nextButton.addEventListener('click', this.next.bind(this))
    prevButton.addEventListener('click', this.prev.bind(this))
    if (this.options.loop === true) {
      return
    }
    this.onMove(index => {
      if (index === 0) {
        prevButton.classList.add('carousel__prev--hidden')
      } else {
        prevButton.classList.remove('carousel__prev--hidden')
      }
      if (this.items[this.cuurentItem + this.slidesVisible] === undefined) {
        nextButton.classList.add('carousel__next--hidden')
      } else {
        nextButton.classList.remove('carousel__next--hidden')

      }
    })
  }

  next () {
    this.gotoItem(this.cuurentItem + this.slidesToScroll)
  }

  prev () {
    this.gotoItem(this.cuurentItem - this.slidesToScroll)
  }

  gotoItem (index) {
    if (index < 0) {
      if (this.options.loop) {
        index = this.items.length - this.slidesVisible;

      } else {
        return
      }
    } else if (index >= this.items.length || (this.items[this.cuurentItem + this.slidesVisible] === undefined && index > this.cuurentItem)) {
      if (this.options.loop) {
        index = 0;
      } else {
        return
      }
    }
    let translateX = index * -100 / this.items.length
    this.carouselContainer.style.transform = 'translate3d(' + translateX + '%,0,0)'
    this.cuurentItem = index;
    this.moveCallbacks.forEach(cb => cb(index))
  }

  onMove (cb) {
    this.moveCallbacks.push(cb)
  }

  onWindowResize () {
    let mobile = window.innerWidth < 700
    if (mobile !== this.isMobile) {
      this.isMobile = mobile
      this.setStyle()
      this.moveCallbacks.forEach(cb => cb(this.cuurentItem))
    }
  }
  
  createDivWithClass (className) {
    let div = document.createElement('div');
    div.setAttribute('class', className);
    return div;
  }

  get slidesToScroll () {
    return this.isMobile ? 1 : this.options.slidesToScroll;
  }

  get slidesVisible () {
    return this.isMobile ? 1 : this.options.slidesVisible;
  }
}




document.addEventListener('DOMContentLoaded', function() {
  // 3 by 3
  new Carousel(document.getElementById('carousel1'), {
    slidesVisible: 3,
    slidesToScroll: 2,
    loop: true
  })

  // 2 by 2
  new Carousel(document.getElementById('carousel2'), {
    slidesVisible: 2,
    slidesToScroll: 2
  })

  // Default 1 by 1
  new Carousel(document.getElementById('carousel3'))
})