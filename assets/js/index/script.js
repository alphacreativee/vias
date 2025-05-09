import { preloadImages } from "../../libs/utils.js";
// let lenis;

const lenis = new Lenis({
  smooth: true,
  lerp: 0.1,
  smoothTouch: true,
  normalizeWheel: true
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

Splitting();

("use strict");
$ = jQuery;

function header() {
  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      const scrollY = self.scroll();

      if (scrollY >= 100) {
        $("header").addClass("header--scroll");
      } else {
        $("header").removeClass("header--scroll");
      }

      if (self.direction === 1) {
        $(".cta-mess").addClass("hide");
      } else {
        $(".cta-mess").removeClass("hide");
      }
    }
  });
}

function footer() {
  const viewportWidth = window.innerWidth;
  const scaleStart = viewportWidth > 991 ? 1.3 : 1.3;

  gsap.fromTo(
    ".footer-main .data-zoom-in-footer",
    { scale: scaleStart, "will-change": "transform" },
    {
      scale: 0.8,
      duration: 0.4,
      ease: "none",
      scrollTrigger: {
        trigger: ".footer-ovl .data-zoom-in-footer",
        start: "top 90%",
        scrub: true
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

  const fxTitle = document.querySelectorAll("[data-splitting][effect-title]");
  fxTitle.forEach((element) => {
    const isMobile = window.innerWidth < 768;
    const disableMobile = element.hasAttribute("data-disable-mobile");

    if (isMobile && disableMobile) return;

    const chars = element.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      {
        "will-change": "opacity, transform",
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        scrollTrigger: {
          trigger: element,
          start: "top 60%",
          end: "bottom 60%"
          // markers: true,
        }
      }
    );
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
    parallax: true,
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

function sectionTestimonials() {
  if ($(".section-testimonials").length < 1) return;

  var swiperTestimonials = new Swiper(".testimonials-slider", {
    slidesPerView: 4,
    loop: false,
    speed: 1000,
    spaceBetween: 24,
    loopAdditionalSlides: 8,
    parallax: false,
    navigation: {
      nextEl: ".testimonials-arrow .swiper-button-next",
      prevEl: ".testimonials-arrow .swiper-button-prev"
    },
    breakpoints: {
      991: {
        slidesPerView: 4,
        spaceBetween: 24
      }
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
  gsap.utils.toArray(".data-fade-in").forEach((element) => {
    const isMobile = window.innerWidth < 768;
    const disableMobile = element.hasAttribute("data-disable-mobile");

    if (isMobile && disableMobile) return;

    let posOffset = element.getAttribute("data-offset") || "70%";

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element,
          start: `top ${posOffset}`,
          end: `bottom ${posOffset}`
          // toggleActions: "play none none reverse"
          // markers: true
        }
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
        let targetWidth = viewportWidth - 32;
        if (viewportWidth > 991) {
          targetWidth = viewportWidth - 160;
        } else if (viewportWidth > 767) {
          targetWidth = viewportWidth - 80;
        } else {
          targetWidth = viewportWidth - 32;
        }

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
  ScrollTrigger.refresh();

  header();
  footer();
  hero();
  discover();
  customDropdown();
  animation();
  sectionImage();
  sectionTestimonials();
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
