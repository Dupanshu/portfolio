'use strict';

const body = document.querySelector('body');
const themeButton = document.querySelector('.theme');
const header = document.querySelector('header');
const footerBg = document.querySelector('footer');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
const h2 = document.querySelector('.header h2');
const footerI = document.querySelector('.middle-fa i');
const bannerH1 = document.querySelector('.banner .overlay1 .banner-txt h1');
const bannerText = document.querySelector('.banner .overlay1 .banner-txt p');
const myForm = document.getElementById('my-form');
const thankyouPart = document.querySelector('.get-in-touch .thankyou-msg');
const myFormPara = document.querySelector('.get-in-touch p');
const projectContainer = document.querySelector('.projects .inside-projects .project-container');


//system preferences theme
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Check if the user prefers light mode
const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;

window.addEventListener('load', () => {
  if (prefersDarkMode) {
    body.classList.toggle('dark-theme');
    themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    themeButton.style.color = "#f90";
  } else if (prefersLightMode) {
    body.classList.toggle('light-theme');
  } else {
    body.classList.toggle('light-theme');
  }

  // banner text animations
  bannerH1.classList.add('animateH1');
  bannerText.classList.add('textAnimate');
  header.classList.add('animateH1');
});

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
});

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
});


// hover effect for the nav bar changes at 0 scroll
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    if (window.scrollY === 0) {
      link.classList.add('hovered');
    }
  });

  link.addEventListener('mouseleave', () => {
    link.classList.remove('hovered');
  });
});

//navbar active state event listener
document.addEventListener('scroll', () => {
  let index = sections.length;

  while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
  
  navLinks.forEach((link) => link.classList.remove('active'));
  navLinks[index].classList.add('active');

  if(window.scrollY === 0){
    navLinks[index].classList.remove('active');
  }
});


// go to the top function
h2.addEventListener('click', () => {
  window.scrollTo(0, 0);
});

footerI.addEventListener('click', () => {
  window.scrollTo(0, 0);
});


//handle form submition
myForm.addEventListener('submit', async (event) => {
  // Prevent the default form submission
  event.preventDefault();

  let formData = new FormData(event.target);

  try {
    const response = await fetch(event.target.action, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      setTimeout(() => {
        myForm.classList.add('remove-display');
        thankyouPart.classList.add('show-display');
        myFormPara.style.display = 'none';
        thankyouPart.classList.add('textAnimate');
      }, 100);
    } else {
      // Handle response errors
      console.error('Form submission error:', response.status, 
        response.statusText);
    }
  } catch (error) {
    // Handle fetch errors
    console.error('Error in form section:', error);
  }
});


/* ----------------------------------------------------------------------
------------------------------carousel-----------------------------------
------------------------------------------------------------------------ */

// Function to set the position of slides
const setSlidePosition = (slide, index) => {
  const slideWidth = slide.getBoundingClientRect().width;
  slide.style.left = slideWidth * index + 'px';
};

// Function to move to a specific slide
const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current_slide');
  targetSlide.classList.add('current_slide');
};

// Function to initialize carousels
const initializeCarousels = () => {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel_track');
    const slides = Array.from(track.children);
    const previousButton = carousel.querySelector('.carousel_button--left');
    const nextButton = carousel.querySelector('.carousel_button--right');

    // Set positions of the slides
    slides.forEach(setSlidePosition);

    // Attach event listeners to buttons
    previousButton.addEventListener('click', () => {
      const currentSlide = track.querySelector('.current_slide');
      const prevSlide = currentSlide.previousElementSibling;

      if (prevSlide) {
        moveToSlide(track, currentSlide, prevSlide);
      }
    });

    nextButton.addEventListener('click', () => {
      const currentSlide = track.querySelector('.current_slide');
      const nextSlide = currentSlide.nextElementSibling;

      if (nextSlide) {
        moveToSlide(track, currentSlide, nextSlide);
      }
    });
  });
};

// Method to fetch projects from the CDN link
const URL = 'https://cdn.jsdelivr.net/gh/dupanshu/cdn-projects/projects.json';

async function getProjects(endpoint) {
  try {
    const result = await fetch(endpoint);

    if (!result.ok) {
      throw new Error(`${result.statusText} (${result.status})`);
    }

    const data = await result.json();
    for (let i = 0; i < data.results.length; i++) {
      const project = data.results[i];

      const images = project.images[0] || {};
      const tags = project.tags[0] || {};
      const buttons = project.buttons[0] || {};

      /* images */
      const image1 = images.image1 || '';
      const image2 = images.image2 || '';
      const image3 = images.image3 || '';
      const image4 = images.image4 || '';

      const name = project.name || '';

      /* tags */
      const tag1 = tags.tag1 || '';
      const tag2 = tags.tag2 || '';
      const tag3 = tags.tag3 || '';
      const tag4 = tags.tag4 || '';

      /* buttons */
      const demo = buttons.demo || '';
      const source = buttons.source || '';

      /* Create and display the project */
      displayProjects(image1, image2, image3, image4, name, tag1, tag2, tag3, tag4, demo, source);
    };

    // Initialize carousels after projects are added
    initializeCarousels();
  } catch (error) {
    console.log(error.message);
  }
}

// Method to create a div for multiple project elements
function displayProjects(image1, image2, image3, image4, name, tag1, tag2, tag3, tag4, demo, source) {
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('project-div');

  // Build the HTML for the project
  let carouselSlides = '';
  let showLeftButton = false;
  let showRightButton = false;
  
  // Count the number of images
  let imageCount = 0;
  
  // Add a slide for each image if it exists
  if (image1) {
    carouselSlides += `
      <li class="carousel_slide current_slide">
        <img class="carousel_image" src="${image1}" alt="project_img">
      </li>`;
    imageCount++;
  }
  if (image2) {
    carouselSlides += `
      <li class="carousel_slide">
        <img class="carousel_image" src="${image2}" alt="project_img">
      </li>`;
    imageCount++;
  }
  if (image3) {
    carouselSlides += `
      <li class="carousel_slide">
        <img class="carousel_image" src="${image3}" alt="project_img">
      </li>`;
    imageCount++;
  }
  if (image4) {
    carouselSlides += `
      <li class="carousel_slide">
        <img class="carousel_image" src="${image4}" alt="project_img">
      </li>`;
    imageCount++;
  }

  // Determine if buttons should be shown
  showLeftButton = imageCount > 1;
  showRightButton = imageCount > 1;

  let demoButton = '';
  let sourceButton = '';
  if(demo) {
    demoButton += `
    <a href="${demo}" target="_blank"><button class="project-btn">Demo</button></a>
    `
  }
  if(source) {
    sourceButton += `
    <a href="${source}" target="_blank"><button class="project-btn">Source</button></a>
    `
  }

    //tags
    let tagList = '';
    if (tag1) {
      tagList+= `
        <p>${tag1}</p>
      `
    }
    if (tag2) {
      tagList+= `
        <p>${tag2}</p>
      `
    }
    if (tag3) {
      tagList+= `
        <p>${tag3}</p>
      `
    }
    if (tag4) {
      tagList+= `
        <p>${tag4}</p>
      `
    }

  projectDiv.innerHTML = `    
    <!-- carousel -->
    <div class="carousel">
      <button class="carousel_button carousel_button--left ${showLeftButton ? '' : 'hidden'}">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <div class="flex flex-row carousel_track-container">
        <ul class="carousel_track">
          ${carouselSlides}
        </ul>
      </div>
      <button class="carousel_button carousel_button--right ${showRightButton ? '' : 'hidden'}">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>

    <div class="flex flex-row space-between hat">
      <h3 style="font-size: clamp(15px, 1vw, 20px);">${name}</h3>
      <div class="flex flex-row hatp gap-5">
        ${tagList}
      </div>
    </div>

    <div class="flex flex-row gap">
    ${demoButton}
    ${sourceButton}
    </div>
  `;
  projectContainer.appendChild(projectDiv);
}


// Fetch and display projects
getProjects(URL);
