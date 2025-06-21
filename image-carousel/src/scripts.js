export default eventHandler;

const carouselUI = document.querySelector(".image-carousel");
const imageContainer = document.querySelector(".image-container");
//Create an array for image info so current slide can be tracked from the array index
//A dynamic approach to track the number of slides there are and what the current slide is
//would be to find out how many images are in the container first
const imgNodes = imageContainer.querySelectorAll("img");
const imgArr = Array.from(imgNodes);
const imgArrLen = imgArr.length;

function carousel() {
  let currentSlideIndex = 0;

  //next and previous slide function
  //Boundary conditions are the first and last slide
  //Picking previous when current slide is the first slide will go to the last slide
  //Picking next when current slide is last
  function nextSlide() {
    if (currentSlideIndex !== imgArrLen - 1) {
      currentSlideIndex += 1;
    } else {
      currentSlideIndex = 0;
    }
    displayImage();
  }

  function previousSlide() {
    if (currentSlideIndex !== 0) {
      currentSlideIndex -= 1;
    } else {
      currentSlideIndex = imgArrLen - 1;
    }
    displayImage();
  }

  function displayImage(slideNum = currentSlideIndex) {
    //remove display attribute from old slide
    imgNodes.forEach((imgNode) => {
      if (imgNode.classList.contains("display")) {
        imgNode.classList.remove("display");
      }
    });
    //then assign the display attribute to the current slide
    imgNodes[slideNum].classList.add("display");
    currentSlideIndex = slideNum;
  }

  displayImage();

  return {
    nextSlide,
    previousSlide,
    displayImage,
  };
}

function eventHandler() {
  const imageCarousel = carousel();
  const sliderDOM = imageSliderDOM();

  window.addEventListener("load", () => {
    sliderDOM.addSliderDOM();
    sliderDOM.updateSliderStatus();
    setInterval(autoUpdateSlide, 5000);
  });

  function autoUpdateSlide() {
    imageCarousel.nextSlide();
    sliderDOM.updateSliderStatus();
  }

  function updateSlide(button) {
    if (button.classList.contains("previous")) {
      imageCarousel.previousSlide();
    } else if (button.classList.contains("next")) {
      imageCarousel.nextSlide();
    }
  }

  imageContainer.addEventListener("click", (e) => {
    updateSlide(e.target);
    sliderDOM.updateSliderStatus();
  });

  carouselUI.addEventListener("click", (e) => {
    const sliderDots = document.querySelectorAll(".dot");
    sliderDots.forEach((dot, index) => {
      if (e.target === dot) {
        imageCarousel.displayImage(index);
        sliderDOM.updateSliderStatus();
      }
    });
  });
}

function imageSliderDOM() {
  function addSliderDOM() {
    const sliderContainer = document.createElement("div");
    imageContainer.after(sliderContainer);
    for (let i = 0; i < imgArrLen; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      sliderContainer.appendChild(dot);
    }
  }

  function updateSliderStatus() {
    const sliderDots = document.querySelectorAll(".dot");
    //reset dot status
    sliderDots.forEach((dot) => {
      if (dot.classList.contains("active")) {
        dot.classList.remove("active");
      }
    });
    //assign active attribute for CSS
    imgNodes.forEach((imgNode, index) => {
      if (imgNode.classList.contains("display")) {
        sliderDots[index].classList.add("active");
      }
    });
  }

  return {
    addSliderDOM,
    updateSliderStatus,
  };
}
