'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const h1 = document.querySelector('h1');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLink=document.querySelector('.nav__link');
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const tabContainer = document.querySelector('.operations__tab-container');
const allSections = document.querySelectorAll('section')



////////////////////////////////////////////////////////////
//slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////
////////////////////////////////////////////////////////////
//reveal sections

const revealSection =function(entries,observer){
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
})

allSections.forEach(function (s){
sectionObserver.observe(s);
s.classList.add('section--hidden');
})

///////////////////////////////////////////////////////////
tabContainer.addEventListener('click', function (e) {
  const click = e.target.closest('.operations__tab');
  
  //guard clause
  if (!click) return

  const dataNo = click.getAttribute('data-tab');
  
  const activeTab = document.querySelector('.operations__tab--active').closest('.operations__tab');
  activeTab.classList.remove('operations__tab--active');
  click.classList.add('operations__tab--active');

  const activeContent=document.querySelector('.operations__content--active').closest('.operations__content');
  activeContent.classList.remove('operations__content--active')
  document.querySelector(`.operations__content--${dataNo}`).classList.add('operations__content--active');
})

///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
//sticky navigation
// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
///////////////////////////////////////
//Lazy loading images
const imageTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries,observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //Replacing src with datasrc
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  });

  observer.unobserve(entry.target);
}


const imgObserver = new IntersectionObserver(loadImg,
  {
    root: null,
    threshold: 0,
    rootMargin: '200px'
  })

  imageTargets.forEach(img=>imgObserver.observe(img))

///////////////////////////////////////
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const alertH1 = (e)=>{
  alert('addEventlistener: You are reading the heading :D')

  h1.removeEventListener('mouseenter', alertH1);
}

h1.addEventListener('mouseenter',alertH1);

/*
h1.onmouseenter = (e)=>{
  alert('onmouseenter: You are reading the heading :D');
}
*/
//scrolling


btnScrollTo.addEventListener('click',(e)=>{
  const s1coords = section1.getBoundingClientRect();
  //console.log(s1coords);

  //console.log(e.target.getBoundingClientRect());

  //console.log('Current scroll (X/Y)', window. pageXOffset, window.pageYOffset);

  //console.log('height/width viewport',
  document.documentElement.clientHeight,
  document.documentElement.clientWidth;

  //scrolling
/*  window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top + window.pageYOffset);
*/
/*
window.scrollTo({
  left: s1coords.left + window.pageXOffset,
  top: s1coords.top + window.pageYOffset,
  behavior: 'smooth',
  
})
*/
section1.scrollIntoView({behavior: 'smooth'});
})

///////////////////////////////////////////////////////////////

//navigation
/*
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
         e.preventDefault();
      const id = this.getAttribute('href');
     console.log(id);
     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
   });
 });
  */
 nav.addEventListener('click',function (e){
   e.preventDefault();

   if (e.target.classList.contains('nav__link')) {
     const id = e.target.getAttribute('href');
     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
   }
 })

/*
const randomInt = (min, max)=>Math.trunc(Math.random() * (max-min+1)+min);
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

navLink.addEventListener(
  'click', function (e) {
    this.style.backgroundColor = randomColor();
    console.log(e.target===this)
  });
  
navLinks.addEventListener(
  'click', function (e) {
    this.style.backgroundColor = randomColor();
  });
nav.addEventListener(
  'click', function (e) {
    this.style.backgroundColor = randomColor();
  });
  */
  
  ////////////////////////////////////////////////////////////////


//////////////////////////////////////
//creating and inserting elements

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved fumctionality and analytics';
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

//header.prepend(message);
header.append(message);
//header.append(message.cloneNode(true));

//delete elements
document.querySelector('.btn--close--cookie').addEventListener('click',()=> {
  message.remove();
})


// Styles
message.style.backgroundColor = '#37303d';
message.style.width = '128%'

message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 30 + 'px'; 

document.documentElement.style.setProperty('--color-primary','purple'); 

const logo = document.querySelector('.nav__logo');
//only works on standard atrributes
//console.log(logo.alt);
//console.log(logo.src);
//console.log(logo.className);

logo.alt = 'beautiful minimalist logo';


/*
// for non standard we can use get attribute.
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

const link = document.querySelector('.nav__link')
console.log(link.href);
console.log(link.getAttribute('href'));

//Data atributes
console.log(logo.dataset.versionNumber);

//classes
logo.classList.add();
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();

//dont use logo.className ='Jonas'-it overwrights all other classes
*/

//going down
//console.log(h1.querySelectorAll('highlight'));
//console.log(h1.childNodes);
//console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'purple';

//going up
//console.log(h1.parentNode);
//console.log(h1.parentElement);

h1.closest('header').style.background = 'var(--gradient-primary)';

//going sideways siblings
//console.log(h1.previousSibling);
//console.log(h1.nextSibling);
//console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(el){
  if(el!== h1) el.style.color = 'orangered';
});


