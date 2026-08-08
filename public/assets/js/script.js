/* ------------------
  hassei script.js (完全版)
------------------ */

// メニューの開閉制御（menu-item-has-children 対応）
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (clickedElement.matches('.menu-item-has-children > a')) {
      event.preventDefault();
      const subMenu = clickedElement.nextElementSibling;
      if (subMenu) {
        toggleSubMenu(subMenu);
        closeOtherSubMenus(subMenu);
      }
    } else {
      closeAllSubMenus();
    }
  });
});

function toggleSubMenu(subMenu) {
  const parentMenuItem = subMenu.parentElement;
  if (subMenu.classList.contains('open')) {
    subMenu.classList.remove('open');
    subMenu.classList.add('close');
    parentMenuItem.classList.remove('current');
  } else {
    subMenu.classList.remove('close');
    subMenu.classList.add('open');
    parentMenuItem.classList.add('current');
  }
}

function closeAllSubMenus() {
  document.querySelectorAll('.sub-menu.open').forEach((subMenu) => {
    subMenu.classList.remove('open');
    subMenu.classList.add('close');
    subMenu.parentElement.classList.remove('current');
  });
}

function closeOtherSubMenus(currentSubMenu) {
  document.querySelectorAll('.sub-menu.open').forEach((subMenu) => {
    if (subMenu !== currentSubMenu) {
      subMenu.classList.remove('open');
      subMenu.classList.add('close');
      subMenu.parentElement.classList.remove('current');
    }
  });
}


// モーダルメニュー（menu-item-74）
/* === works-slider 共通初期化（1箇所に集約） === */
function initWorksSlider($slider, maxItems) {
  if (!$slider || !$slider.length) return;

  // 画面幅から枚数自動決定（maxItems未指定なら）
  if (typeof maxItems === 'undefined') {
    const w = jQuery(window).width();
    maxItems = w > 1440 ? 5 : w >= 1025 ? 4 : w >= 768 ? 3 : w >= 541 ? 2 : 1;
  }

  if ($slider.hasClass('slick-initialized')) {
    $slider.slick('unslick');
  }

  $slider.slick({
    slidesToShow: maxItems,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    // 矢印は絶対パス推奨
    prevArrow:
      '<button type="button" class="slick-prev"><img src="/uploads/icon_arrow-left-1.svg" alt="Previous"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="/uploads/icon_arrow-right-1.svg" alt="Next"></button>',
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: Math.min(4, maxItems) } },
      { breakpoint: 1024, settings: { slidesToShow: Math.min(3, maxItems) } },
      { breakpoint: 767, settings: { slidesToShow: Math.min(2, maxItems) } },
      { breakpoint: 540, settings: { slidesToShow: 1 } },
    ],
  });
}

/* === メニュー開閉（menu-item-74）+ 初回初期化 === */
jQuery(function ($) {
  // home.php（投稿一覧ページ）用：ページ読み込み時に自動初期化
  if (document.body.classList.contains('blog')) {
    const $slider = $('#menu-item-74-wrap .works-slider');
    setTimeout(function () {
      initWorksSlider($slider);
    }, 150);
  }
  // クリックでメガメニュー開閉
  $(document).on('click', '#menu-item-74 > a', function (e) {
    e.preventDefault();

    const $wrap = $('#menu-item-74-wrap'); // ラッパ（IDはページ内で一意に）
    const $slider = $wrap.find('.works-slider');

    // 他の .sub-menu を閉じる（74番以外）
    $('.sub-menu.open').each(function () {
      $(this).removeClass('open').addClass('close');
      $(this).parent().removeClass('current');
    });

    if (!$wrap.hasClass('open')) {
      $wrap.addClass('open');
      $('#menu-item-74').addClass('current');
      $('.sub-menu-background').addClass('active');

      // 初回/再表示どちらでもOKに（崩れ回避のため少し遅らせて初期化）
      setTimeout(function () {
        initWorksSlider($slider);
        $slider.slick('setPosition');
      }, 150);
    } else {
      $wrap.removeClass('open');
      $('#menu-item-74').removeClass('current');
      $('.sub-menu-background').removeClass('active');
    }
  });

  // 閉じるボタン
  $(document).on('click', '.close-btn', function (e) {
    e.preventDefault();
    $('#menu-item-74-wrap').removeClass('open');
    $('#menu-item-74').removeClass('current');
    $('.sub-menu-background').removeClass('active');
  });

  // メニュー外クリックで閉じる
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#menu-item-74, #menu-item-74-wrap').length) {
      $('#menu-item-74-wrap').removeClass('open');
      $('#menu-item-74').removeClass('current');
      $('.sub-menu-background').removeClass('active');
    }
  });

  // スクロールしたら閉じる（既存仕様踏襲）
  $(window).on('scroll', function () {
    if ($('#menu-item-74-wrap').hasClass('open')) {
      $('#menu-item-74-wrap').removeClass('open');
      $('#menu-item-74').removeClass('current');
      $('.sub-menu-background').removeClass('active');
    }
  });
});


// mega menu scroll shutdown
$(window).scroll(function () {
  if ($(window).width() >= 320) {
    if ($('#menu-item-74-wrap').hasClass('open')) {
      $('#menu-item-74-wrap').removeClass('open');
      $('#menu-item-74').removeClass('current');
      $('.sub-menu-background').removeClass('active');
    }
    if ($('.sub-menu').hasClass('open')) {
      $('.sub-menu').removeClass('open');
    }
  }
});


// hamburger menu
jQuery(document).ready(function ($) {
  $('.sp-nav').click(function () {
    $('#gNav').toggleClass('open');
    $(this).toggleClass('active');
    $('.sp-overlay').fadeToggle(300);
    if ($('html').css('overflow') === 'hidden') {
      $('html, body').css('overflow', '');
    } else {
      $('html, body').css('overflow', 'hidden');
    }
    $('#menu-item-74-wrap').removeClass('open');
    return false; // バブリング防止
  });

  // メニュー以外の場所をクリックしたときにメニューを閉じる（home & 1024px以下は .modal-sub-menu を除外）
  $(document).click(function (event) {
    if (
      document.body.classList.contains('home') &&
      window.matchMedia('(max-width: 1024px)').matches
    ) {
      // ナビ内・トグル・モーダル内クリックは閉じない
      if ($(event.target).closest('#gNav, .sp-nav, .modal-sub-menu').length) {
        return;
      }
    } else {
      // それ以外の画面では従来どおり
      if ($(event.target).closest('#gNav, .sp-nav').length) return;
    }

    // ここから閉じる処理
    if ($('#gNav').hasClass('open')) {
      $('#gNav').removeClass('open');
      $('.sp-nav').removeClass('active');
      $('.sp-overlay').fadeOut(300);
      $('html, body').css('overflow', '');
      $('#menu-item-74-wrap').removeClass('open');
    }
  });

  $('.sp-overlay').click(function () {
    $('#gNav').removeClass('open');
    $('.sp-nav').removeClass('active');
    $(this).fadeOut(300);
    $('html, body').css('overflow', '');
    $('#menu-item-74-wrap').removeClass('open');
  });
});




// page-top
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 600) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });

  $('#back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
  });
});





// ロゴを最初だけ大きく, スクロールに合わせて元のサイズに拡大縮小;
function resizeLogo() {
  const logo = document.querySelector('.home .logo');
  if (!logo) return;

  const minSize = 160;
  const scrollRange = 200;

  let w = window.innerWidth;
  let maxSize; // Declare maxSize outside the conditional blocks

  if (w > 1440) {
    maxSize = 600;
  } else if (w > 1240) {
    maxSize = 480;
  } else if (w > 1140) {
    maxSize = 390;
  } else if (w > 1024) {
    maxSize = 280;
  } else if (w > 992) {
    maxSize = 250;
  } else {
    maxSize = 160;
  }

  const scrollY = window.scrollY;
  let newSize = maxSize - (maxSize - minSize) * (scrollY / scrollRange);

  if (newSize < minSize) {
    newSize = minSize;
  } else if (newSize > maxSize) {
    newSize = maxSize;
  }

  logo.style.width = `${newSize}px`;
}

window.addEventListener('scroll', resizeLogo);
window.addEventListener('resize', resizeLogo);
document.addEventListener('DOMContentLoaded', resizeLogo);

// トップページだけg-navの表示を遅らせる
document.addEventListener('DOMContentLoaded', () => {
  const isHome =
    document.body.classList.contains('home') ||
    document.body.classList.contains('front-page');

  if (!isHome) return;

  const nav = document.getElementById('top-line-wrap');
  if (!nav) return;

  setTimeout(() => {
    nav.classList.add('show-nav');
  }, 2000);
});






//トップラインの透過背景
document.addEventListener('DOMContentLoaded', function () {
  let header = document.querySelector('.l-header');
  let scrollTrigger;

  if (document.body.classList.contains('home')) {
    scrollTrigger = 460;
  } else {
    scrollTrigger = 150;
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY >= scrollTrigger) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});


//スクロールにあわせて、セクションがスクロールイン

document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.fadeInTrigger');
  if (!targets.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scrollIn');
        io.unobserve(entry.target); // 1回入ったら監視を外す
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -5% 0px', // だいたい outerHeight * 0.005 相当の“早め”調整
    threshold: 0
  });

  targets.forEach((el) => io.observe(el));
});

// Recent Post Slider (sidebar-recent-post.php)
jQuery(function ($) {
  if ($('.js-slider-recent-post').length > 0) {
    $('.js-slider-recent-post').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      infinite: true,
      autoplay: false,
      prevArrow: '<button type="button" class="slick-prev"><span>←</span></button>',
      nextArrow: '<button type="button" class="slick-next"><span>→</span></button>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
});