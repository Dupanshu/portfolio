'use strict';

const body = document.querySelector('body');
const themeButton = document.querySelector('.theme');
const header = document.querySelector('header');
const footerBg = document.querySelector('footer');

// light and dark theme changer
themeButton.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');

  let className = body.className;
  if(className.includes("light-theme")){
    themeButton.innerHTML = '<i class="fa-regular fa-moon"></i>';
    themeButton.style.color = "#4d36fe";
  } else {
    themeButton.innerHTML = '<i class="fa-regular fa-sun"></i>';
    themeButton.style.color = "#f90";
  }
})

//header scroll design changer
const hasScrolled = 0;
const handleScroll = () => {
  // Check the scroll position
  if (window.scrollY > 0) {
      // User has scrolled down
      if (!hasScrolled) {
          header.classList.add('scrolled');
          hasScrolled = true;
      }
  } else {
      // User has scrolled back to the top
      if (window.scrollY === 0) {
          header.classList.remove('scrolled');
          hasScrolled = false;
      }
  }
};

// Add the scroll event listener
document.addEventListener('scroll', handleScroll);

