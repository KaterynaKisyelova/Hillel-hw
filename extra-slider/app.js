const slider = document.querySelector(".container");
const [...imgs] = document.querySelectorAll(".slider__img");
let activeIndex = 0;
showContent(activeIndex);

slider.addEventListener("click", onSliderClick);

function onSliderClick(e) {
  if (e.target.classList.contains("left")) {
    hideContent(activeIndex);
    activeIndex === 0 ? (activeIndex = imgs.length - 1) : (activeIndex -= 1);
    showContent(activeIndex);
  }
  if (e.target.classList.contains("right")) {
    hideContent(activeIndex);
    activeIndex === imgs.length - 1 ? (activeIndex = 0) : (activeIndex += 1);
    showContent(activeIndex);
  }
}

function hideContent(index) {
  imgs[index].classList.remove("active");
}

function showContent(index) {
  imgs[index].classList.add("active");
}
