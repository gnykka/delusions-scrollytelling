document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const section = document.querySelector('section.intro');

  const text = section.querySelector('.content');
  const svg = section.querySelector('svg');

  const height = body.clientHeight;
  const { top, bottom } = section.getBoundingClientRect();
  const { scrollY } = window;

  const svgPadding = parseFloat(window.getComputedStyle(section, null).getPropertyValue('padding-top'));
  const svgTop = top + scrollY;
  const svgBottom = bottom + scrollY - height;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;

    svg.classList.toggle('fixed', scroll >= svgTop && scroll < svgBottom);
    svg.classList.toggle('bottom', scroll >= svgBottom);
  });

  svg.style.height = `${height - svgPadding * 2}px`;
});
