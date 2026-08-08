// recruit-fade.js
document.addEventListener('DOMContentLoaded', function () {
  const lines = document.querySelectorAll('.js-text-fadein-line');
  lines.forEach((line) => {
    const text = line.textContent.trim();
    line.textContent = '';
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.transitionDelay = `${index * 0.05}s`;
      span.classList.add('char');
      line.appendChild(span);
    });
  });

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '-70% 0px 0px 0px',
    }
  );

  lines.forEach((line) => {
    observer.observe(line);
  });
});

//バナー
window.addEventListener('scroll', function () {
  const banner = document.querySelector('.c-banner-recruit');
  if (!banner) return;

  const rect = banner.getBoundingClientRect();
  const scrollY = window.scrollY || window.pageYOffset;
  const offsetTop = banner.offsetTop;
  const speed = 0.3;

  const move = (scrollY - offsetTop) * speed;
  banner.style.setProperty('--parallax-move', `${move}px`);

  const bg = banner.querySelector('::before'); // 疑似要素には直接アクセスできないため次の手で↓
  banner.style.setProperty('--bg-translateY', `${move}px`);
});
