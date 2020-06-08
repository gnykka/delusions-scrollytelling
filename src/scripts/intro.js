document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const section = document.querySelector('section.intro');

  const text = section.querySelector('.content');
  const svg = section.querySelector('svg');

  const svgBackground = svg.querySelector('g.background');
  const svgGroups = svg.querySelectorAll('g.group');
  const svgDetails  = svg.querySelectorAll('g.details');

  const height = body.clientHeight;
  const svgPadding = parseFloat(window.getComputedStyle(section, null).getPropertyValue('padding-top'));

  const animationHeight = text.querySelector('div').clientHeight;
  const animationDistance = Math.round(animationHeight / svgGroups.length);

  const hideSvg = () => {
    svgBackground.style.opacity = 0;
    svgGroups.forEach((gr, i) => {
      gr.style.opacity = 0;
    });
  };

  let prevScroll = window.scrollY;

  const morphingHeight = text.clientHeight - animationHeight;
  const morphingDistance = Math.round(morphingHeight / 6);

  const headElement = svg.querySelector('#head');
  const circleElement = svg.querySelector('#circle');
  const eyeElement = svg.querySelector('#eye');
  const lineElement = svg.querySelector('#line');
  const eyeCenterElement = svg.querySelector('#eye-center');
  const humanElement = svg.querySelector('#fall-01');
  const waterElement = svg.querySelector('#fall-02');
  const human2Element = svg.querySelector('#fall-03');

  const onScroll = () => {
    const scroll = window.scrollY;
    const { top, bottom } = section.getBoundingClientRect();
    const svgTop = top + scroll - height + svgPadding;
    const svgBottom = bottom + scroll - height;
    const isInside = scroll >= svgTop && scroll < svgBottom;

    svg.classList.toggle('fixed', isInside);
    svg.classList.toggle('bottom', scroll >= svgBottom);

    const animationStart = svgTop + animationHeight;
    const morph1 = animationStart + morphingDistance;
    const morph2 = animationStart + morphingDistance * 2;
    const morph3 = animationStart + morphingDistance * 3;
    const morph4 = animationStart + morphingDistance * 4;
    const morph5 = animationStart + morphingDistance * 5;

    if (isInside) {
      if (scroll <= animationStart) {
        if (prevScroll > animationStart) {
          circleElement.style.transform = 'scale(0)';
          headElement.style.transform = 'scale(1)';
        }

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

        // первый морфинг — из головы в круг
        if (prevScroll <= animationStart) {
          circleElement.style.transform = 'scale(1)'
          headElement.style.transform = 'scale(0)';
        }

        // второй морфинг — из круга в глаз
        if (scroll > morph1 && prevScroll <= morph1) {
          circleElement.style.transform = 'scale(0)';
          eyeElement.style.opacity = 1;
          eyeCenterElement.style.transform = 'scale(0.9)';
        }
        if (scroll <= morph1 && prevScroll > morph1) {
          circleElement.style.transform = 'scale(1)';
          eyeElement.style.opacity = 0;
          eyeCenterElement.style.transform = 'scale(0)';
        }

        // третий морфинг — из глаза в линию
        if (scroll > morph2 && prevScroll <= morph2) {
          eyeCenterElement.style.transform = 'scale(0)';
          eyeElement.style.opacity = 0;
          lineElement.style.opacity = 1;
        }
        if (scroll <= morph2 && prevScroll > morph2) {
          eyeCenterElement.style.transform = 'scale(0.9)';
          eyeElement.style.opacity = 1;
          lineElement.style.opacity = 0;
        }

        // четвертый морфинг — из линии в человека
        if (scroll > morph3 && prevScroll <= morph3) {
          lineElement.style.opacity = 0;
          humanElement.style.opacity = 1;
        }
        if (scroll <= morph3 && prevScroll > morph3) {
          lineElement.style.opacity = 1;
          humanElement.style.opacity = 0;
        }

        // пятый морфинг — из человека в воду
        if (scroll > morph4 && prevScroll <= morph4) {
          humanElement.style.opacity = 0;
          waterElement.style.transform = 'scaleY(1)';
          waterElement.style.opacity = 1;
        }
        if (scroll <= morph4 && prevScroll > morph4) {
          humanElement.style.opacity = 1;
          waterElement.style.transform = 'scaleY(0)';
          waterElement.style.opacity = 0;
        }

        // шестой морфинг — из воды в человека
        if (scroll > morph5 && prevScroll <= morph5) {
          waterElement.style.transform = 'scaleY(0)'
          waterElement.style.opacity = 0
          human2Element.style.opacity = 1;
        }
        if (scroll <= morph5 && prevScroll > morph5) {
          waterElement.style.transform = 'scaleY(1)';
          waterElement.style.opacity = 1;
          human2Element.style.opacity = 0;
        }
      }
    } else if (scroll < svgTop) {
      hideSvg();
    }

    prevScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll);

  svg.style.height = `${height - svgPadding * 2}px`;
  hideSvg();
});
