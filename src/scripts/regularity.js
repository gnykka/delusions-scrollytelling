document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const section = document.querySelector('section.regularity');

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

    const phase1 = texts[1].getBoundingClientRect().top - height * 0.25 <= 0;
    const phase2 = texts[1].getBoundingClientRect().top + height * 0.25 <= 0;

    const phase3 = texts[2].getBoundingClientRect().top - height * 0.1 <= 0;
    const phase4 = texts[3].getBoundingClientRect().top - height * 0.25 <= 0;
    const phase5 = texts[4].getBoundingClientRect().top - height * 0.25 <= 0;
    const phase6 = texts[5].getBoundingClientRect().top - height * 0.25 <= 0;

    svg.classList.toggle('phase-0', !phase1);
    svg.classList.toggle('phase-1', phase1 && !phase2);
    svg.classList.toggle('phase-2', phase2 && !phase3);
    svg.classList.toggle('phase-3', phase3 && !phase4);
    svg.classList.toggle('phase-4', phase4 && !phase5);
    svg.classList.toggle('phase-5', phase5 && !phase6);
    svg.classList.toggle('phase-6', phase6 || bottom < height);
  }

  window.addEventListener('scroll', onScroll);

  svg.style.height = `${height}px`;
});

// вначале — маска — первый абзац
// phase1 и phase2 (меняющаяся фигура) - второй абзац
// третий-шестой абзацы: phase3 (голова), phase4 (змеи), phase5 (обезьяны), phase6 (рука)
