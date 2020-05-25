document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const section = document.querySelector('section.intro');

  const text = section.querySelector('div');
  const svg = section.querySelector('svg');

  const height = body.clientHeight;
  const svgPadding = parseFloat(window.getComputedStyle(svg, null).getPropertyValue('top'));
  const svgTop = section.getBoundingClientRect().top;

  window.addEventListener('scroll', () => {

  });

  svg.style.height = `${height - svgPadding * 2}px`;
});
