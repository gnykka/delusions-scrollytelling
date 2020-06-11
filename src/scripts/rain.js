document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const fullHeight = body.clientHeight;
  const { scrollY } = window;

  const rainSvg = document.querySelector('svg.rain');
  const menGroup = rainSvg.querySelector('g');

  const height = rainSvg.clientHeight;
  const bottom = rainSvg.getBoundingClientRect().bottom + scrollY - height;

  const onScroll = () => {
    const scroll = window.scrollY;
    const isInside = scroll >= bottom && scroll <= bottom + height * 1.5;

    if (isInside) {
      // translateY from 0 to 50%
      const translate = ((scroll - bottom) / height) * 50;
      menGroup.style.transform = `translateY(${translate}%) scale(1.5)`;
    }
  };

  window.addEventListener('scroll', onScroll);
});
