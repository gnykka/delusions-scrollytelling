document.addEventListener('DOMContentLoaded', () => {
  const questions = document.querySelectorAll('section.question');
  const results = JSON.parse(localStorage.getItem('results')) || {};

  questions.forEach(quest => {
    const answers = quest.querySelectorAll('.answers > button');
    const hint = quest.querySelector('.hint');

    const { name } = quest.dataset;
    const res = results[name];

    const selectAnswer = (index) => {
      const isOk = answers[index].classList.contains('ok');

      answers[index].classList.add('selected');
      answers.forEach(el => { el.disabled = true; });

      quest.classList.toggle('answered', true);
      hint.querySelector(isOk ? '.right' : '.wrong').classList.remove('hidden');

      results[name] = index;
      localStorage.setItem('results', JSON.stringify(results));
    };

    if (res) {
      selectAnswer(res);
    }

    answers.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        selectAnswer(index);
      });
    });
  });

  const body = document.querySelector('body');
  const height = body.clientHeight;
  const { scrollY } = window;

  const svgElements = document.querySelectorAll('.question .content svg');
  const svgs = [...svgElements].map(el => ({ el }));

  svgs.forEach(svg => {
    svg.height = svg.el.clientHeight;
    svg.bottom = svg.el.getBoundingClientRect().bottom + scrollY - height + svg.height;

    const animation = svg.el.querySelector('animateMotion') || svg.el.querySelector('animate');
    if (animation) {
      svg.animation = animation;
      svg.animated = false;
    }
  });

  const onScroll = () => {
    const scroll = window.scrollY;

    svgs.forEach(svg => {
      const isInside = scroll >= svg.bottom;

      svg.el.classList.toggle('shifted', isInside);

      if (svg.animation) {
        if (isInside && !svg.animated) {
          svg.animated = true;
          svg.animation.beginElement();
        } else if (!isInside && svg.animated) {
          svg.animated = false;
        }
      }
    });
  }

  window.addEventListener('scroll', onScroll);
});
