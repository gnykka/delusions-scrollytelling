document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const section = document.querySelector('section.bikes');

  const text = section.querySelector('.content');
  const texts = text.querySelectorAll('div');
  const svg = section.querySelector('svg');

  const height = body.clientHeight;
  const svgPadding = parseFloat(window.getComputedStyle(section, null).getPropertyValue('padding-top'));

  const onScroll = () => {
    const scroll = window.scrollY;
    const { top, bottom } = section.getBoundingClientRect();
    const isInside = top <= 0 && bottom > height;

    svg.classList.toggle('fixed', isInside);
    svg.classList.toggle('bottom', bottom < height);

    const phase2 = texts[1].getBoundingClientRect().top <= 0;
    const phase3 = texts[2].getBoundingClientRect().top <= 0;

    svg.classList.toggle('phase-1', !phase2);
    svg.classList.toggle('phase-2', phase2 && !phase3);
    svg.classList.toggle('phase-3', phase3);
  }

  window.addEventListener('scroll', onScroll);

  svg.style.height = `${height - svgPadding * 2}px`;
});
