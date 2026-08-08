// home.js
jQuery(function ($) {
  // .top-slider（存在チェック）
  // const $topSlider = $('.top-slider');
  // if ($topSlider.length) {
  //   setTimeout(function () {
  //     if (!$topSlider.hasClass('slick-initialized')) {
  //       $topSlider.slick({
  //         autoplay: true,
  //         infinite: true,
  //         speed: 2000,
  //         fade: true,
  //         dots: false,
  //         arrows: false,
  //         cssEase: 'linear',
  //       });
  //     }
  //   }, 4000);
  // }

  // .topics-slider（存在チェック）
  const $topicsSlider = $('.topics-slider');
  if ($topicsSlider.length && !$topicsSlider.hasClass('slick-initialized')) {
    $topicsSlider
      .on('init reInit afterChange', function (event, slick, currentSlide) {
        const i = (currentSlide ? currentSlide : 0) + 1;
        $('.current-slide').text(i);
        $('.total-slides').text(slick.slideCount);
      })
      .on('beforeChange', function () {
        $('.slick-slide')
          .find('.topics-header, .topics-footer')
          .css('opacity', 0);
      })
      .on('afterChange', function () {
        $('.slick-current')
          .find('.topics-header, .topics-footer')
          .css('opacity', 1);
      })
      .slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow:
          '<button type="button" class="slick-prev link-prev"><span></span></button>',
        nextArrow:
          '<button type="button" class="slick-next link-next"><span></span></button>',
      });
  }

  // スクロール位置に応じて .active クラスを付け替え
  $(window).on('scroll', function () {
    const $bgVideo = $('#bg-video');
    if (!$bgVideo.length) return;

    if ($(this).scrollTop() < 900) {
      $bgVideo.removeClass('active');
    } else {
      $bgVideo.addClass('active');
    }
  });
});


// news-list view
$(window).on('scroll', function () {
  $('.p-news-list').each(function () {
    var $element = $(this);
    var windowHeight = $(window).height();
    var elementTop = $element.offset().top;
    var elementHeight = $element.height();
    var scrollTop = $(window).scrollTop();

    if (scrollTop + windowHeight * 0.9 > elementTop + elementHeight * 0.9) {
      $element.addClass('view');
    }
  });
});

// トップページのlead文を1文字ずつ表示する
document.addEventListener('DOMContentLoaded', function () {
  const lines = document.querySelectorAll('.lead span.line');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // 一度アニメーションが完了したら監視を停止
        }
      });
    },
    {
      rootMargin: '-70% 0px 0px 0px', // 要素がビューポートの下30%に来た時点でトリガー
    }
  );

  lines.forEach((line) => {
    observer.observe(line);
  });
});