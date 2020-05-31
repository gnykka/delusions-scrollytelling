document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const section = document.querySelector('section.intro');

  const text = section.querySelector('.content');
  const svg = section.querySelector('svg');

  const svgBackground = svg.querySelector('g.background');
  const svgGroups = svg.querySelectorAll('g.group');

  const height = body.clientHeight;
  const { top, bottom } = section.getBoundingClientRect();
  const { scrollY } = window;

  const svgPadding = parseFloat(window.getComputedStyle(section, null).getPropertyValue('padding-top'));
  const svgTop = top + scrollY;
  const svgBottom = bottom + scrollY - height;

  const svgHeight = svgBottom - svgTop;
  const animationDistance = Math.round(svgHeight / svgGroups.length);

  const hideSvg = () => {
    svgBackground.style.opacity = 0;
    svgGroups.forEach((gr, i) => {
      gr.style.opacity = 0;
    });
  };

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const isInside = scroll >= svgTop && scroll < svgBottom;

    svg.classList.toggle('fixed', isInside);
    svg.classList.toggle('bottom', scroll >= svgBottom);

    if (isInside) {
      const value = (scroll - svgTop) / animationDistance;
      const index = Math.floor(value);
      const opacity = value - index;

      svgBackground.style.opacity = 1;

      svgGroups.forEach((gr, i) => {
        if (i === index) {
          gr.style.opacity = opacity;
        } else if (index > 0 && i === index - 1) {
          gr.style.opacity = 1;
        } else {
          gr.style.opacity = 0;
        }
      });
    } else if (scroll < svgTop) {
      hideSvg();
    }
  });

  svg.style.height = `${height - svgPadding * 2}px`;
  hideSvg();
});
