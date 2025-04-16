import { preloadImages } from "../../libs/utils.js";
let lenis;
Splitting();

("use strict");
$ = jQuery;

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

      // self.progress === 0 ? $(".cta-mess").removeClass("hide") : "";
      self.direction === 1
        ? $(".cta-mess").addClass("hide")
        : $(".cta-mess").removeClass("hide");
    }
  });
}

function footer() {
  ScrollTrigger.refresh();

  const viewportWidth = window.innerWidth;
  const scaleStart = viewportWidth > 991 ? 1.3 : 1.2;

  gsap.fromTo(
    ".footer-main .data-zoom-in-footer",
    { scale: scaleStart, "will-change": "transform" },
    {
      scale: 1,
      duration: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: ".footer-ovl .data-zoom-in-footer",
        start: "top 75%",
        scrub: true
        // markers: true
      }
    }
  );

  // ScrollTrigger.create({
  //   trigger: ".footer-ovl .data-zoom-in-footer",
  //   start: "top 80%",
  //   end: "bottom 20%",
  //   toggleClass: {
  //     targets: ".footer-ovl .data-zoom-in-footer",
  //     className: "active"
  //   },
  //   markers: true,
  //   scrub: false
  // });
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
      allowTouchMove: false,
      simulateTouch: false,
      mousewheel: false,
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
    slidesPerView: 1,
    loop: false,
    speed: 1000,
    spaceBetween: 16,
    loopAdditionalSlides: 8,
    navigation: {
      nextEl: ".section-discover .swiper-button-next",
      prevEl: ".section-discover .swiper-button-prev"
    },
    breakpoints: {
      991: {
        slidesPerView: 2,
        spaceBetween: 24
      }
    }
  });

  ScrollTrigger.create({
    trigger: ".section-discover",
    start: "top 40%",
    end: "bottom 60%",
    toggleClass: {
      targets: "body, main",
      className: "discover-active"
    },
    // markers: true,
    scrub: false
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
          // markers: true
        },
        scale: 1,
        duration: 0.5,
        ease: "none",
        stagger: 0.1
      }
    );
  });

  gsap.utils.toArray(".parallax-trigger").forEach((container) => {
    const img = container.querySelector("img");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: true,
        pin: false
        // markers: true
      }
    });

    tl.fromTo(
      img,
      {
        yPercent: -10,
        ease: "none"
      },
      {
        yPercent: 10,
        ease: "none"
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
        const targetWidth =
          viewportWidth > 991 ? viewportWidth - 160 : viewportWidth - 32;
        const widthClipPercentage =
          ((viewportWidth - targetWidth) / 2 / viewportWidth) * 100;

        const image = document.querySelector(".section-image");
        const currentHeight = image.offsetHeight;
        const targetHeight =
          viewportWidth > 991 ? currentHeight - 100 : currentHeight;
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

  // const lenis = new Lenis({
  //   lerp: 0.09
  // });

  // lenis.on("scroll", ScrollTrigger.update);

  // gsap.ticker.add((time) => {
  //   lenis.raf(time * 1000);
  // });

  header();
  footer();
  hero();
  discover();
  customDropdown();
  animation();
  sectionImage();
  ScrollTrigger.refresh();
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
