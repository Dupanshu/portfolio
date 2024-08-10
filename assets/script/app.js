'use strict';

const body = document.querySelector('body');
const themeButton = document.querySelector('.theme');
const header = document.querySelector('header');
const footerBg = document.querySelector('footer');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
const h2 = document.querySelector('.header h2');
const footerI = document.querySelector('footer .go-up i');

// light and dark theme changer
themeButton.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');

  const className = body.className;
  if(className.includes("light-theme")){
    themeButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    themeButton.style.color = "#42806E";
  } else {
    themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    themeButton.style.color = "#f90";
  }
})

//header scroll design changer
document.addEventListener('scroll', () => {
  // Check the scroll position
  if (window.scrollY > 0) {
      // User has scrolled down
      header.classList.add('scrolled');
  } else {
      // User has scrolled back to the top
      if (window.scrollY === 0) {
          header.classList.remove('scrolled');
      }
  }
})


//navbar active state event listener
document.addEventListener('scroll', () => {
  let index = sections.length;

  while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
  
  navLinks.forEach((link) => link.classList.remove('active'));
  navLinks[index].classList.add('active');

  if(window.scrollY === 0){
    navLinks[index].classList.remove('active');
  }
})


// go to the top function
h2.addEventListener('click', () => {
  window.scrollTo(0, 0);
})

footerI.addEventListener('click', () => {
  window.scrollTo(0, 0);
})
