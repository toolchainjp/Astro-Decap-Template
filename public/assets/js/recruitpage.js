
// accordion panel
document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.js-accordion');

  accordions.forEach((accordion) => {
    const trigger = accordion.querySelector('.c-accordion__trigger');
    const panel = accordion.querySelector('.c-accordion__panel');

    trigger.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('is-open');

      // triggerにis-openクラスの付け外し
      trigger.classList.toggle('is-open', isOpen);
    });
  });
});



//scrollup追従エフェクト
gsap.registerPlugin(ScrollTrigger);

// layer 透過
gsap.to('.c-reveal-gate__layer', {
  opacity: 0,
  scrollTrigger: {
    trigger: '.c-reveal-gate__content',
    start: 'top top',
    end: 'bottom top',
    scrub: 2,
    // markers: true,
  },
});
// ✅ background blur（追加）
ScrollTrigger.matchMedia({
  // 767px以下のときだけこのアニメーションを有効にする
  '(max-width: 767px)': function () {
    gsap.to('.c-reveal-gate__background', {
      filter: 'blur(6px)',
      scrollTrigger: {
        trigger: '.c-reveal-gate__content',
        start: 'top bottom',
        end: 'top top',
        scrub: 2,
        // markers: true,
      },
    });
  },
});
// ✅ background 透過（追加）
gsap.to('.c-reveal-gate__background', {
  opacity: 0,
  scrollTrigger: {
    trigger: '.l-section-recruit__leader',
    start: 'top bottom', // leaderが見え始めたら透過開始
    end: 'top top',
    scrub: 2,
    // markers: true,
  },
});

// layer 固定
ScrollTrigger.create({
  trigger: '.c-reveal-gate',
  start: 'top top',
  endTrigger: '.c-reveal-gate__content',
  end: 'bottom top',
  pin: '.c-reveal-gate__layer',
  pinSpacing: true,
  scrub: 2,
  onLeave: () => {
    gsap.set('.c-reveal-gate__layer', { clearProps: 'transform' });
    gsap.set('.c-reveal-gate', { zIndex: -1 });
  },
  onEnterBack: () => {
    gsap.set('.c-reveal-gate', { zIndex: '' }); // 戻ってきたらデフォルトに戻す
  },
});




gsap.registerPlugin(ScrollTrigger);

(function setupBox3() {
  const BOX = '.box3';
  const WRAPPER = '.box3-pin-wrapper';
  const CONTENT = '.box3 .content';
  const OVERLAY = '.box3 .overlay';

  // 初期スタイル設定
  gsap.set(CONTENT, { y: window.innerHeight });
  gsap.set(OVERLAY, { opacity: 1 });
  gsap.set(BOX, { maxWidth: '100%', borderRadius: 0 });

  // 全体スクロール距離
  const SCROLL_LEN = window.innerHeight * 3.6;
  const RADIUS_LEN = 1000; // ピン解除後に使う追加スクロール距離

  // ピン + テキストアニメ + pin解除後に角丸
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: WRAPPER,
      start: 'top top',
      end: () => '+=' + (SCROLL_LEN + RADIUS_LEN),
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // markers: true,
    },
  });

  // ========== 1. テキストのスクロール ==========
  tl.to(
    CONTENT,
    {
      y: () => -1.6 * window.innerHeight,
      ease: 'none',
      duration: SCROLL_LEN / (SCROLL_LEN + RADIUS_LEN), // 総進行の何割か
    },
    0
  );

  // オーバーレイのフェード
  tl.to(
    OVERLAY,
    {
      opacity: 0,
      ease: 'none',
      duration: SCROLL_LEN / (SCROLL_LEN + RADIUS_LEN),
    },
    0
  );

  // ========== 2. ピン解除後の角丸・横幅（残りの scroll で） ==========
  const mq = window.matchMedia;

  let targetMaxWidth = '1260px';
  if (mq('(min-width: 1001px) and (max-width: 1280px)').matches) {
    targetMaxWidth = '960px';
  } else if (mq('(min-width: 768px) and (max-width: 1000px)').matches) {
    targetMaxWidth = '760px';
  }

  // スクロールに連動して角丸＋横幅
  tl.to(
    BOX,
    {
      borderRadius: '40px',
      maxWidth: targetMaxWidth,
      ease: 'power2.out',
      duration: RADIUS_LEN / (SCROLL_LEN + RADIUS_LEN),
    },
    SCROLL_LEN / (SCROLL_LEN + RADIUS_LEN)
  ); // ← 進行率でタイミング指定
})();

gsap.registerPlugin(ScrollTrigger);

(function setupBox2() {
  const BOX = '.box2';
  const WRAPPER = '.box2-pin-wrapper';
  const CONTENT = '.box2 .content';
  const OVERLAY = '.box2 .overlay';

  // 初期スタイル設定
  gsap.set(CONTENT, { y: window.innerHeight });
  gsap.set(OVERLAY, { opacity: 1 });
  gsap.set(BOX, { maxWidth: '100%', borderRadius: 0 });

  // 全体スクロール距離
  const SCROLL_LEN = window.innerHeight * 3.6;
  const RADIUS_LEN = 1000; // ピン解除後に使う追加スクロール距離

  // ピン + テキストアニメ + pin解除後に角丸
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: WRAPPER,
      start: 'top top',
      end: () => '+=' + (SCROLL_LEN + RADIUS_LEN),
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // markers: true,
    },
  });

  // ========== 1. テキストのスクロール ==========
  tl.to(
    CONTENT,
    {
      y: () => -1.6 * window.innerHeight,
      ease: 'none',
      duration: SCROLL_LEN / (SCROLL_LEN + RADIUS_LEN),
    },
    0
  );

  // オーバーレイのフェード
  tl.to(
    OVERLAY,
    {
      opacity: 0,
      ease: 'none',
      duration: SCROLL_LEN / (SCROLL_LEN + RADIUS_LEN),
    },
    0
  );

  // ========== 2. ピン解除後の角丸・横幅アニメーション ==========
  const mq = window.matchMedia;

  let targetMaxWidth = '1260px';
  if (mq('(min-width: 1001px) and (max-width: 1280px)').matches) {
    targetMaxWidth = '960px';
  } else if (mq('(min-width: 768px) and (max-width: 1000px)').matches) {
    targetMaxWidth = '760px';
  }

  tl.to(
    BOX,
    {
      borderRadius: '40px',
      maxWidth: targetMaxWidth,
      ease: 'power2.out',
      duration: RADIUS_LEN / (SCROLL_LEN + RADIUS_LEN),
    },
    SCROLL_LEN / (SCROLL_LEN + RADIUS_LEN)
  );
})();

gsap.registerPlugin(ScrollTrigger);

(function setupBox1() {
  const BOX = '.box1';
  const WRAPPER = '.box1-pin-wrapper';
  const CONTENT = '.box1 .content';
  const OVERLAY = '.box1 .overlay';
  const BG_IMG = '.box1 .bg-img';

  // 初期スタイル設定
  gsap.set(CONTENT, { y: window.innerHeight });
  gsap.set(OVERLAY, { opacity: 1 });

  // スクロール距離
  const SCROLL_LEN = window.innerHeight * 3.6;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: WRAPPER,
      start: 'top top',
      end: () => '+=' + SCROLL_LEN,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // markers: true,
    },
  });

  // ========== テキストスクロール ==========
  tl.to(
    CONTENT,
    {
      y: () => -1.6 * window.innerHeight,
      ease: 'none',
      duration: 1,
    },
    0
  );

  // ========== オーバーレイのフェードアウト ==========
  tl.to(
    OVERLAY,
    {
      opacity: 0,
      ease: 'none',
      duration: 1,
    },
    0
  );
})();


// modal video
document.addEventListener('DOMContentLoaded', function () {
  const modalTriggers = document.querySelectorAll('.c-modal-trigger');
  const modals = document.querySelectorAll('.c-modal__target');
  const body = document.body;
  let scrollY = 0;

  // 画面サイズに応じて動画サイズ調整クラスを付与
  function adjustModalSize(modal) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const screenRatio = width / height;
    const content = modal.querySelector('.c-modal__content');

    if (!content) return;

    // クラスを一旦リセット
    content.classList.remove('is-width-constrained', 'is-height-constrained');

    if (screenRatio < (16 / 9)) {
      // 幅が足りない → 高さを縮める
      content.classList.add('is-width-constrained');
    } else {
      // 高さが足りない → 幅を縮める
      content.classList.add('is-height-constrained');
    }
  }

  // モーダルを開く
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-modal');
      const modal = document.getElementById(targetId);
      if (modal) {
        scrollY = window.scrollY;

        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.classList.add('is-fixed');

        // クラス調整
        adjustModalSize(modal);

        // モーダル表示
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('is-open');

        // iframe 読み込み
        const iframe = modal.querySelector('iframe.js-modal-video');
        if (iframe && iframe.dataset.src) {
          iframe.src = iframe.dataset.src;
        }
      }
    });
  });

  // モーダルを閉じる
  modals.forEach(modal => {
    const overlay = modal.querySelector('.c-modal__overlay');
    const closeBtn = modal.querySelector('.c-modal__button-close');

    const closeModal = () => {
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('is-open');
      body.classList.remove('is-fixed');
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';

      // iframe の再生を停止・初期化
      const iframe = modal.querySelector('iframe.js-modal-video');
      if (iframe) {
        iframe.src = '';
      }

      // スクロール戻す
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    };

    if (overlay) overlay.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
  });

  // リサイズ時に動画サイズ再調整（任意）
  window.addEventListener('resize', () => {
    const openModal = document.querySelector('.c-modal__target.is-open');
    if (openModal) {
      adjustModalSize(openModal);
    }
  });
});