import { preloadImages } from "../../libs/utils.js";
// let lenis;
let isSafari =
  navigator.userAgent.indexOf("Safari") > -1 &&
  navigator.userAgent.indexOf("Chrome") === -1;

if (!isSafari) {
  Splitting();
}
const lenis = new Lenis({
  smooth: true,
  lerp: 0.1,
  smoothTouch: true,
  normalizeWheel: true,
  gestureOrientation: "vertical",
  touchMultiplier: 1.5,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

("use strict");
$ = jQuery;

function header() {
  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      const scrollY = self.scroll();

      // Header scroll effect
      if (scrollY >= 100) {
        $("header").addClass("header--scroll");
      } else {
        $("header").removeClass("header--scroll");
      }

      // Check if cta-mess touches footer
      checkCtaMessFooterCollision();

      // Original commented code for scroll direction
      // if (self.direction === 1) {
      //   $(".cta-mess").addClass("hide");
      // } else {
      //   $(".cta-mess").removeClass("hide");
      // }
    },
  });
  $(".back-top").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });

  // Function to check collision between cta-mess and footer
  function checkCtaMessFooterCollision() {
    const ctaMess = $(".cta-mess");
    const footer = $("footer"); // hoặc selector footer của bạn

    if (ctaMess.length && footer.length) {
      const ctaMessRect = ctaMess[0].getBoundingClientRect();
      const footerRect = footer[0].getBoundingClientRect();

      // Check if cta-mess bottom touches or overlaps footer top
      const isColliding = ctaMessRect.bottom >= footerRect.top;

      if (isColliding) {
        ctaMess.addClass("touching-footer");
        // Có thể thêm logic khác khi chạm footer
        console.log("CTA Mess is touching footer!");
      } else {
        ctaMess.removeClass("touching-footer");
      }
    }
  }

  // Alternative: Sử dụng ScrollTrigger riêng cho footer detection
  ScrollTrigger.create({
    trigger: "footer", // hoặc selector footer của bạn
    start: "top bottom", // khi top của footer chạm bottom của viewport
    end: "bottom top", // khi bottom của footer chạm top của viewport
    onEnter: () => {
      $(".cta-mess").addClass("near-footer");
      console.log("CTA Mess entered footer area");
    },
    onLeave: () => {
      $(".cta-mess").removeClass("near-footer");
      console.log("CTA Mess left footer area");
    },
    onEnterBack: () => {
      $(".cta-mess").addClass("near-footer");
    },
    onLeaveBack: () => {
      $(".cta-mess").removeClass("near-footer");
    },
  });

  // Menu functionality
  let btnMenu = $(".hamburger");
  let subMenu = $(".header-sub-menu");
  let body = $("body");

  btnMenu.on("click", function () {
    $(this).toggleClass("active");
    subMenu.toggleClass("active");
    body.toggleClass("overflow-hidden");
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
        scrub: true,
        // markers: true
      },
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
        loadPrevNext: true,
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
        },
      },
      navigation: {
        nextEl: ".hero .swiper-button-next",
        prevEl: ".hero .swiper-button-prev",
      },
      on: {
        init: function () {
          let $this = this;
          $($this.slides[$this.activeIndex]);
        },
      },
    });
  });
  if (!isSafari) {
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
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          scrollTrigger: {
            trigger: element,
            start: "top 60%",
            end: "bottom 60%",
            // markers: true,
          },
        }
      );
    });
  } else {
    gsap.utils.toArray("[effect-title]").forEach((element) => {
      gsap.fromTo(
        element,
        {
          "will-change": "opacity, transform",
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 2,
        }
      );
    });
  }
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
      prevEl: ".section-discover .swiper-button-prev",
    },
    pagination: {
      el: ".section-discover .swiper-pagination",
      type: "progressbar",
    },
    breakpoints: {
      991: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    },
  });

  ScrollTrigger.create({
    trigger: ".section-discover",
    start: "top 40%",
    end: "bottom 60%",
    toggleClass: {
      targets: "body, main",
      className: "discover-active",
    },
    // markers: true,
    scrub: false,
  });
}

function sectionTestimonials() {
  if ($(".section-testimonials").length < 1) return;

  var swiperTestimonials = new Swiper(".testimonials-slider", {
    slidesPerView: 1,
    loop: false,
    speed: 1000,
    spaceBetween: 24,
    parallax: false,
    navigation: {
      nextEl: ".testimonials-arrow .swiper-button-next",
      prevEl: ".testimonials-arrow .swiper-button-prev",
    },
    pagination: {
      el: ".section-testimonials .swiper-pagination",
      type: "progressbar",
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      767: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    },
  });
}

function loading() {
  if ($(".loading").length < 1) return;
  const tl = gsap.timeline({
    defaults: { duration: 2, ease: "power2.inOut" },
  });

  tl.fromTo(
    ".loading",
    { clipPath: "inset(0% 0% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 100% 0%)",
      onComplete: () => {
        document.querySelector(".loading").classList.add("d-none");
      },
    }
  );
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
    $(window).on("scroll", function () {
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
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element,
          start: `top ${posOffset}`,
          end: `bottom ${posOffset}`,
          // toggleActions: "play none none reverse"
          // markers: true
        },
      }
    );
  });

  gsap.utils.toArray(".data-zoom-in").forEach((element, i) => {
    gsap.fromTo(
      element,
      {
        scale: 1.1,
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "top 70%",
          end: "bottom 70%",
          onEnter: () => {
            element.classList.add("done");
          },
          // markers: true
        },
        scale: 1,
        duration: 0.5,
        ease: "none",
        stagger: 0.1,
      }
    );
  });

  gsap.utils.toArray(".parallax-trigger").forEach((container) => {
    const img = container.querySelector("img");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: true,
        pin: false,
        // markers: true
      },
    });

    tl.fromTo(
      img,
      {
        yPercent: -10,
        ease: "none",
      },
      {
        yPercent: 10,
        ease: "none",
      }
    );
  });

  const viewportWidth = window.innerWidth;
  if (viewportWidth < 1024) return;

  gsap.utils.toArray(".intro-content").forEach((container) => {
    const box = container.querySelector(".box");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: true,
        pin: false,
        // markers: true,
      },
    });

    tl.fromTo(
      box,
      {
        yPercent: -10,
        ease: "none",
      },
      {
        yPercent: 10,
        ease: "none",
      }
    );
  });
}

function sectionImage() {
  if ($(".section-image").length < 1) return;

  gsap.fromTo(
    ".section-image .image-wrapper",
    {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    {
      scrollTrigger: {
        trigger: ".section-image",
        start: "top 70%",
        end: "bottom 70%",
        scrub: 1,
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
      ease: "power2.out",
    }
  );

  gsap.fromTo(
    ".section-image .image-wrapper img",
    {
      scale: 1,
    },
    {
      scrollTrigger: {
        trigger: ".section-image",
        start: "top 70%",
        end: "bottom 70%",
        scrub: 1,
      },
      scale: 1.1,
      duration: 0.4,
      ease: "power2.out",
    }
  );
}
function sliderParallax() {
  if ($(".swiper-parallax-img").length < 1) return;
  const interleaveOffset = 0.9;
  var swiperParallaxImg = new Swiper(".swiper-parallax-img", {
    // loop: true,
    speed: 1500,
    grabCursor: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
    navigation: {
      nextEl: ".slider-parallax .swiper-button-next",
      prevEl: ".slider-parallax .swiper-button-prev",
    },
    pagination: {
      el: ".slider-parallax-pagination",
      type: "progressbar",
    },
    on: {
      progress: function (swiper) {
        swiper.slides.forEach(function (slide) {
          var slideProgress = slide.progress || 0;
          var innerOffset = swiper.width * interleaveOffset;
          var innerTranslate = slideProgress * innerOffset;
          // Kiểm tra nếu innerTranslate không phải là NaN
          if (!isNaN(innerTranslate)) {
            var slideInner = slide.querySelector(".slider-parallax-img");
            if (slideInner) {
              slideInner.style.transform =
                "translate3d(" + innerTranslate + "px, 0, 0)";
            }
          }
        });
      },
      touchStart: function (swiper) {
        swiper.slides.forEach(function (slide) {
          slide.style.transition = "";
        });
      },
      setTransition: function (swiper, speed) {
        var easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
        swiper.slides.forEach(function (slide) {
          slide.style.transition = speed + "ms " + easing;
          var slideInner = slide.querySelector(".slider-parallax-img");
          if (slideInner) {
            slideInner.style.transition = speed + "ms " + easing;
          }
        });
      },
    },
  });
}
function gallery() {
  if (!document.querySelector(".animated-thumb")) return;
  document.querySelectorAll(".animated-thumb").forEach((gallery) => {
    lightGallery(gallery, {
      selector: ".thumb-img",
      thumbnail: true,
      download: false,
      height: "100%",
      width: "100%",
      iframeMaxWidth: "100%",
      // subHtmlSelectorRelative: true,
      showCloseIcon: true,
      mobileSettings: {
        controls: true,
        showCloseIcon: true,
        download: false,
      },
    });
  });
}
function filterGalleryMobile() {
  const filterContainer = document.querySelector(".fitler-mobile");
  if (!filterContainer) return;

  const filterValue = filterContainer.querySelector(".filter-value-select");
  const filterHead = filterContainer.querySelector(".filter-head");
  const filterBody = filterContainer.querySelector(".filter-body");
  const filterButtons = filterBody.querySelectorAll(".nav-link");

  if (!filterValue || !filterHead || !filterBody || filterButtons.length === 0)
    return;

  // Toggle filter list visibility
  filterValue.addEventListener("click", () => {
    filterHead.classList.toggle("active");
    filterBody.classList.toggle("active");
  });

  // Handle option click
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const titleEl = btn.querySelector(".title");
      if (!titleEl) return;

      const selectedText = titleEl.textContent.trim();
      filterValue.textContent = selectedText;

      // Close dropdown
      filterHead.classList.remove("active");
      filterBody.classList.remove("active");
    });
  });
}

function contactForm() {
  if ($(".contact-form").length < 1) return;

  const contactForm = $("#contact-form");
  const nameField = contactForm.find("input[name='name']");
  const emailField = contactForm.find("input[name='email']");
  const phoneField = contactForm.find("input[name='phone']");
  const messageField = contactForm.find("textarea[name='message']");
  const submitButton = contactForm.find("button[type='submit']");

  contactForm.on("submit", function (e) {
    e.preventDefault();

    // contactForm.find(".error-message").remove();
    contactForm.find("input, textarea").removeClass("error");

    let isValid = true;

    if (!nameField.val().trim()) {
      nameField.addClass("error");
      isValid = false;
    }

    if (!emailField.val().trim()) {
      emailField.addClass("error");
      isValid = false;
    }

    if (!phoneField.val().trim()) {
      phoneField.addClass("error");
      isValid = false;
    }

    if (!isValid) return;

    $.ajax({
      type: "POST",
      url: ajaxUrl,
      data: {
        action: "submit_contact_form",
        name: nameField.val().trim(),
        email: emailField.val().trim(),
        phone: phoneField.val().trim(),
        messageNote: messageField.val().trim(),
      },
      beforeSend: function () {
        // $(".contact-message").remove();
      },
      success: function (res) {
        // $(".contact-message").remove();
        contactForm[0].reset();
        contactForm.find(".noti-success").removeClass("d-none");

        setTimeout(() => {
          contactForm.find(".noti-success").addClass("d-none");
        }, 5000);
      },
      error: function (xhr, status, error) {
        console.error("Lỗi khi gửi form:", error);
        $(".contact-message").remove();
        contactForm.append(
          '<span class="contact-message" style="color: red;">Có lỗi xảy ra, vui lòng thử lại sau.</span>'
        );
      },
    });
  });
}

function getNewletter() {
  $("#form-newletter").on("submit", function (e) {
    e.preventDefault();

    const thisForm = $(this);
    const emailField = thisForm.find("input[type='email']");

    emailField.removeClass("error");
    thisForm.siblings("span").remove();

    if (!emailField.length) {
      console.error("Không tìm thấy input email trong form.");
      return;
    }

    const email = emailField.val() ? emailField.val().trim() : "";

    if (!email) {
      emailField.addClass("error");
      return;
    }

    $.ajax({
      type: "POST",
      url: ajaxUrl,
      data: {
        action: "vias_receive_newletter",
        email: email,
      },
      beforeSend: function () {
        console.log("Đang gửi dữ liệu...");
      },
      success: function (res) {
        thisForm[0].reset();
        thisForm.addClass("d-none");
        thisForm.after(
          '<span class="contact-message b3-font d-block color-white" style=" max-width: 235px; margin-top: 16px;">We have received your information, thank you for registering.</span>'
        );

        setTimeout(() => {
          thisForm.siblings(".contact-message").remove();
          thisForm.removeClass("d-none");
        }, 5000);
      },
      error: function (xhr, status, error) {
        console.error("Lỗi khi gửi form:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      },
    });
  });
}

function swiperNews() {
  if ($(".swiper-news").length < 1) return;
  var swiper = new Swiper(".swiper-news", {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: ".news-related .swiper-button-next",
      prevEl: ".news-related .swiper-button-prev",
    },
    pagination: {
      el: ".news-related .swiper-pagination",
      type: "progressbar",
    },
    breakpoints: {
      767: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
}
const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  swiperNews();
  loading();
  // RevealLoad();
  header();
  footer();
  hero();
  discover();
  customDropdown();
  animation();
  sectionImage();
  sliderParallax();
  sectionTestimonials();
  gallery();
  filterGalleryMobile();
  contactForm();
  getNewletter();
  ScrollTrigger.refresh();
};
preloadImages("img").then(() => {
  // Once images are preloaded, remove the 'loading' indicator/class from the body

  init();
});
$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
});
