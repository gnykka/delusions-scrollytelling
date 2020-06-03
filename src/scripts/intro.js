document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const section = document.querySelector('section.intro');

  const text = section.querySelector('.content');
  const svg = section.querySelector('svg');

  const svgBackground = svg.querySelector('g.background');
  const svgGroups = svg.querySelectorAll('g.group');
  const svgDetails  = svg.querySelectorAll('g.details');

  const height = body.clientHeight;
  const { top, bottom } = section.getBoundingClientRect();
  const { scrollY } = window;

  const svgPadding = parseFloat(window.getComputedStyle(section, null).getPropertyValue('padding-top'));
  // svg появляется, как только становится виден текст внизу
  // и исчезает, как только скролл дошёл до конца контейнера с текстом
  const svgTop = top + scrollY - height + svgPadding;
  const svgBottom = bottom + scrollY - height;

  const animationHeight = text.querySelector('div').clientHeight;
  const animationDistance = Math.round(animationHeight / svgGroups.length);

  const hideSvg = () => {
    svgBackground.style.opacity = 0;
    svgGroups.forEach((gr, i) => {
      gr.style.opacity = 0;
    });
  };

  const onScroll = () => {
    const scroll = window.scrollY;
    const isInside = scroll >= svgTop && scroll < svgBottom;

    svg.classList.toggle('fixed', isInside);
    svg.classList.toggle('bottom', scroll >= svgBottom);

    if (isInside) {
      if (scroll <= svgTop + animationHeight) {
        const value = (scroll - svgTop) / animationDistance;
        const index = Math.floor(value);

        svgBackground.style.opacity = 1;
        svgDetails.forEach(gr => { gr.style.opacity = 1; });

        svgGroups.forEach((gr, i) => {
          gr.style.opacity = i === index ? 1 : 0;
        });
      } else {
        svgDetails.forEach(gr => { gr.style.opacity = 0; });
        svgGroups.forEach(gr => { gr.style.opacity = 0; });
      }
    } else if (scroll < svgTop) {
      hideSvg();
    }
  }

  window.addEventListener('scroll', onScroll);

  svg.style.height = `${height - svgPadding * 2}px`;
  hideSvg();
});
