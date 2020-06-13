document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const section = document.querySelector('section.illusions');

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

    const phase1 = top > 0;
    const phase2 = top <= 0;

    const childTop = texts[2].getBoundingClientRect().top;
    const childLength = (childTop - top) / 3;

    const phase3 = top + childLength <= 0;
    const phase4 = top + childLength * 2 <= 0;
    // end of child

    const phase5 = childTop <= 0;
    const phase6 = texts[3].getBoundingClientRect().top <= 0;

    svg.classList.toggle('phase-1', phase1);
    svg.classList.toggle('phase-2', phase2 && !phase3);
    svg.classList.toggle('phase-3', phase3 && !phase4);
    svg.classList.toggle('phase-4', phase4 && !phase5);
    svg.classList.toggle('phase-5', phase5 && !phase6);
    svg.classList.toggle('phase-6', phase6);
  }

  window.addEventListener('scroll', onScroll);

  svg.style.height = `${height - svgPadding * 2}px`;
});

// первые 2 абзаца:
// phase1 - сначала child-1
// phase2 - когда стал fixed - child-2, вместо arc появился ellipse
// phase3 - child-3, ellipse пропал
// phase4 - child-4, сверху появляется круг

// phase5 - третий абзац — исчезает ребёнок, появляется голова
// phase6 - четвёртый абзац — исчезает голова, появляются сначала бык, потом сразу человек
