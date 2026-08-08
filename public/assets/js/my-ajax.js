// 施工事例メガメニューの絞り込み。
// 元テーマは WordPress の admin-ajax（action: filter_works）を叩いていたが、
// 静的サイトには ajax_object / エンドポイントが存在せず ReferenceError で止まっていた。
// マークアップ済みの .item を data-classification で絞り込む方式に置き換える。
jQuery(function ($) {
  const $slider = $("#menu-item-74-wrap .works-slider");
  if (!$slider.length) return;

  // slick が DOM を書き換える前に、元の並び順のまま全件を控えておく
  const $allItems = $slider.children(".item").clone();

  function slidesToShow() {
    const w = $(window).width();
    return w > 1440 ? 5 : w >= 1025 ? 4 : w >= 768 ? 3 : w >= 541 ? 2 : 1;
  }

  $(document).on("click", ".modal-sub-menu .works-filter li a", function (e) {
    e.preventDefault();  // href="#" でトップへ飛ぶ（＝スクロール判定でメニューが閉じる）のを防ぐ
    e.stopPropagation(); // 外側クリック判定に伝播させない

    const $li = $(this).parent("li");
    const filter = String($li.data("filter") || "all");

    $li.addClass("is-active").siblings().removeClass("is-active");

    const maxItems = slidesToShow();
    const $items =
      filter === "all"
        ? $allItems.clone()
        : $allItems.filter('[data-classification="' + filter + '"]').clone();

    if ($slider.hasClass("slick-initialized")) $slider.slick("unslick");

    $slider.empty().append($items);
    for (let i = $items.length; i < maxItems; i++) {
      $slider.append('<div class="item empty"></div>');
    }

    $slider.slick({
      slidesToShow: maxItems, slidesToScroll: 1, arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="/uploads/icon_arrow-left-1.svg" alt="Previous"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="/uploads/icon_arrow-right-1.svg" alt="Next"></button>',
      responsive: [
        { breakpoint: 1440, settings: { slidesToShow: Math.min(4, maxItems) } },
        { breakpoint: 1024, settings: { slidesToShow: Math.min(3, maxItems) } },
        { breakpoint: 767, settings: { slidesToShow: Math.min(2, maxItems) } },
        { breakpoint: 540, settings: { slidesToShow: 1 } }
      ]
    });
    $slider.slick("setPosition");
  });
});
