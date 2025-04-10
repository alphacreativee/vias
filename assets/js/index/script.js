import { preloadImages } from "../../libs/utils.js";
let lenis;
Splitting();

function header() {
  ScrollTrigger.refresh();

  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      self.progress === 0 ? $("header").removeClass("header--scroll") : "";
      // self.direction === 1 ? $("header").addClass("header--scroll") : "";

      if (self.progress > 0.004) {
        $("header").addClass("header--scroll");
      } else {
        $("header").removeClass("header--scroll");
      }

      if (self.progress < 0.0017 || self.progress > 0.069) {
        $(".cta-mess").addClass("hide");
      } else {
        $(".cta-mess").removeClass("hide");
      }
    }
  });
}

function footer() {
  gsap.fromTo(
    ".data-zoom-in-footer",
    { scale: 1.1 },
    {
      scale: 1,
      duration: 0.5,
      ease: "none",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "body",
        start: "bottom bottom-=200",
        toggleActions: "play reverse play reverse"
        // markers: true
      }
    }
  );
}

function hero() {
  if ($("section.hero").length < 1) return;

  $(".hero-slider").each(function () {
    let $slider = $(this);

    let $dataSpeed;
    let $dataLoop = $slider.attr("data-loop");
    let $dataAutoplay = $slider.data("autoplay")
      ? { delay: $slider.data("autoplay") }
      : $slider.data("autoplay");
    if ($slider.is("[data-speed]")) {
      $dataSpeed = $slider.data("speed");
    } else {
      $dataSpeed = 900; // by default
    }

    new Swiper($slider[0], {
      direction: "vertical",
      speed: $dataSpeed,
      loop: $dataLoop,
      autoplay: $dataAutoplay,
      preloadImages: true,
      parallax: true,
      lazy: {
        loadPrevNext: true
      },
      pagination: {
        el: ".hero .swiper-pagination",
        clickable: false,
        renderBullet: function (i, className) {
          return `
            <button class="${className}">
            <svg class="progress" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle class="circle-origin" cx="14" cy="14" r="13" stroke="white"/>
            </svg>
            </button>`;
        }
      },
      navigation: {
        nextEl: ".hero .swiper-button-next",
        prevEl: ".hero .swiper-button-prev"
      },
      on: {
        init: function () {
          let $this = this;
          $($this.slides[$this.activeIndex]);
        }
      }
    });
  });
}

function discover() {
  if ($(".section-discover").length < 1) return;

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

function customDropdown() {
  const $dropdowns = $(".dropdown-custom");

  $dropdowns.each(function () {
    const $dropdown = $(this);
    const $btnDropdown = $dropdown.find(".dropdown-custom__btn");
    const $dropdownMenu = $dropdown.find(".dropdown-custom__menu");
    const $dropdownItems = $dropdown.find(".dropdown-custom__item");
    const $textDropdown = $dropdown.find(".dropdown-custom__text");

    $btnDropdown.on("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns($dropdown);
      $dropdownMenu.toggleClass("dropdown--active");
      $btnDropdown.toggleClass("--active");
    });

    $(document).on("click", function () {
      closeAllDropdowns();
    });

    $dropdownItems.on("click", function (e) {
      e.stopPropagation();
      const $item = $(this);
      let tmpText = $textDropdown.text();
      const tmpImgSrc = $textDropdown.find("img").attr("src"); // Get the current image src if present
      const $img = $item.find("img"); // Check if the clicked item contains an img

      // Swap text content
      $textDropdown.text($item.text());

      // If the item has an image, swap the img src
      if ($img.length) {
        $textDropdown.html($item.html()); // Swap the entire HTML, including the img

        if ($item.hasClass("language__item")) {
          tmpText = `<span>${tmpText}</span>`;
        }

        $item.html(
          `${tmpImgSrc ? `<img src="${tmpImgSrc}" />` : ""} ${tmpText}`
        ); // Swap img and text back to the item
      } else if ($item.hasClass("language__item")) {
        $item.text(tmpText);
      }

      closeAllDropdowns();
    });

    function closeAllDropdowns(exception) {
      $(".dropdown-custom__btn").removeClass("active");
      $dropdowns.each(function () {
        const $menu = $(this).find(".dropdown-custom__menu");
        const $ic = $(this).find(".dropdown-custom__btn");
        if (!exception || !$(this).is(exception)) {
          $menu.removeClass("dropdown--active");
          $ic.removeClass("--active");
        }
      });
    }
  });
}

function animation() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".data-fade-in").forEach((element, i) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
          end: "bottom 70%"
          // markers: true
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power1.out",
        stagger: 0.1
      }
    );
  });

  gsap.utils.toArray(".data-zoom-in").forEach((element, i) => {
    gsap.fromTo(
      element,
      {
        scale: 1.1
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
          end: "bottom 70%"
        },
        scale: 1,
        duration: 0.5,
        ease: "none",
        stagger: 0.1
      }
    );
  });
}

function sectionImage() {
  if ($(".section-image").length < 1) return;

  gsap.fromTo(
    ".section-image .image-wrapper",
    {
      clipPath: "inset(0% 0% 0% 0%)"
    },
    {
      scrollTrigger: {
        trigger: ".section-image",
        start: "top 70%",
        end: "bottom 70%",
        scrub: 1
      },
      clipPath: () => {
        const viewportWidth = window.innerWidth;
        const targetWidth = viewportWidth - 160;
        const widthClipPercentage =
          ((viewportWidth - targetWidth) / 2 / viewportWidth) * 100;

        const image = document.querySelector(".section-image");
        const currentHeight = image.offsetHeight;
        const targetHeight = currentHeight - 100;
        const heightClipPixels = (currentHeight - targetHeight) / 2;
        const heightClipPercentage = (heightClipPixels / currentHeight) * 100;

        return `inset(${heightClipPercentage}% ${widthClipPercentage}% ${heightClipPercentage}% ${widthClipPercentage}%)`;
      },
      duration: 0.4,
      ease: "power2.out"
    }
  );

  gsap.fromTo(
    ".section-image .image-wrapper img",
    {
      scale: 1
    },
    {
      scrollTrigger: {
        trigger: ".section-image",
        start: "top 70%",
        end: "bottom 70%",
        scrub: 1
      },
      scale: 1.1,
      duration: 0.4,
      ease: "power2.out"
    }
  );
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  header();
  footer();
  hero();
  discover();
  customDropdown();
  animation();
  sectionImage();
};
preloadImages("img").then(() => {
  // Once images are preloaded, remove the 'loading' indicator/class from the body

  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
