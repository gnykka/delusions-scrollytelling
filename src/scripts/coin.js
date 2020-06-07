document.addEventListener('DOMContentLoaded', () => {
  const random = () => Math.floor(Math.random() * 2);

  const section = document.querySelector('section.coin');
  const button = section.querySelector('button');
  const resultEl = section.querySelector('.result');
  const countEl = section.querySelector('.count span');
  const eagleEl = section.querySelector('.eagle span');
  const tailsEl = section.querySelector('.tails span');
  const coin = section.querySelector('.animation');

  const imgs = coin.querySelectorAll('img');

  let count = 0;
  let eagle = 0;
  let tails = 0;

  button.addEventListener('click', () => {
    button.classList.toggle('disabled', true);

    coin.classList.toggle('flip');
    coin.classList.add('toss');

    imgs.forEach(img => { img.style.opacity = 0; });

    setTimeout(() => {
      const res = random();

      count += 1;
      if (res === 0) eagle += 1;
      else tails +=1;

      countEl.innerText = count;
      eagleEl.innerText = `${Math.round(eagle * 100 / count)}%`;
      tailsEl.innerText = `${Math.round(tails * 100 / count)}%`;
      resultEl.innerText = `Выпал${res === 0 ? ' орёл' : 'а решка'}`;

      button.classList.toggle('disabled', false);
      coin.classList.remove('toss');

      imgs[res].style.opacity = 1;
    }, 1000);
  });
});
