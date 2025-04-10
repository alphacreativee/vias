import { preloadImages } from "../../libs/utils.js";
let lenis;
Splitting();

function discover() {
  if ($(".section-discover").length < 1) return;

  console.log("true");

  var swiperDiscover = new Swiper(".swiper-discover", {
    slidesPerView: 2,
    slidesPerGroup: 2,
    loop: true,
    speed: 1500,
    spaceBetween: 24,
    loopAdditionalSlides: 8,
    navigation: {
      nextEl: ".swiper-discover .swiper-button-next",
      prevEl: ".swiper-discover.swiper-button-prev"
    }
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  discover();
};
preloadImages("img").then(() => {
  // Once images are preloaded, remove the 'loading' indicator/class from the body

  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});
