document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const section = document.querySelector('section.start');

  const header = section.querySelector('.header');
  const svg = section.querySelector('svg');
  const anchor = section.querySelector('.anchor');
  const ellipse = svg.querySelector('ellipse');

  const width = body.clientWidth;
  const height = body.clientHeight;
  const maxRadius = Math.ceil(Math.sqrt(Math.pow(0.5 * height, 2) + Math.pow(0.5 * width, 2)));

  const speed = 1; // pixels increase in radius for one pixel of scroll

  // first part of animation
  const rxRange = { min: 25, max: 250 };
  const rxDomain = {
    min: (rxRange.max - rxRange.min) * speed,
    max: 0,
  };

  // second part of animation
  const rRange = { min: 25, max: maxRadius };
  const rDomain = {
    min: rxDomain.min,
    max: (rRange.max - rRange.min) * speed,
  };

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;

    if (scroll <= rxDomain.min) {
      const rx = rxRange.min + ((scroll - rxDomain.min) / (rxDomain.max - rxDomain.min)) *
        (rxRange.max - rxRange.min);

      svg.style.transform = `translateY(0)`;
      header.style.transform = `translateY(0)`;

      ellipse.setAttribute('rx', rx);
      ellipse.setAttribute('ry', rRange.min);
    } else {
      const rx = rRange.min + ((scroll - rDomain.min) / (rDomain.max - rDomain.min)) *
        (rRange.max - rRange.min);

      section.classList.toggle('dark', rx >= Math.max(width, height) * 0.5);

      if (scroll >= maxRadius) {
        svg.style.transform = `translateY(-${scroll - maxRadius}px)`;
      }

      if (scroll >= height - header.clientHeight + maxRadius) {
        header.style.transform = `translateY(-${scroll - maxRadius - height + header.clientHeight}px)`;
      }

      ellipse.setAttribute('rx', rx);
      ellipse.setAttribute('ry', rx);
    }
  });
  anchor.style.height = `${height + maxRadius}px`;
});
