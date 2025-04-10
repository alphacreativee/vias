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
    }
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
    ".section-image",
    {
      scale: 1
    },
    {
      scrollTrigger: {
        trigger: ".section-image",
        start: "top 70%",
        end: "bottom 70%",
        scrub: 1 // Thêm scrub để scale mượt mà theo scroll
      },
      scale: () => {
        // Tính toán scale dựa trên viewport width
        const viewportWidth = window.innerWidth;
        const targetWidth = viewportWidth - 160; // 100vw - 160px
        const scaleFactor = targetWidth / viewportWidth; // Tỷ lệ scale
        return scaleFactor;
      },
      duration: 0.4,
      ease: "power2.out"
    }
  );
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  header();
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
