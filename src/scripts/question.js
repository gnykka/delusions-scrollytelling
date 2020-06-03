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

      hint.querySelector(isOk ? '.right' : '.wrong').classList.remove('hidden');
      hint.classList.remove('hidden');

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
});
