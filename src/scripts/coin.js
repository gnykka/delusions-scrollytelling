document.addEventListener('DOMContentLoaded', () => {
  const random = () => Math.floor(Math.random() * 2);

  const section = document.querySelector('section.coin');
  const button = section.querySelector('button');
  const eagleEl = section.querySelector('.eagle span');
  const tailsEl = section.querySelector('.tails span');
  const countEl = section.querySelector('.count');
  const coin = section.querySelector('.animation');

  const imgs = coin.querySelectorAll('img');

  let eagle = 0;
  let tails = 0;

  button.addEventListener('click', () => {
    button.classList.toggle('disabled', true);

    coin.classList.toggle('flip');
    coin.classList.add('toss');

    imgs.forEach(img => { img.style.opacity = 0; });

    setTimeout(() => {
      const res = random();

      if (res === 0) eagle += 1;
      else tails +=1;

      const count = eagle + tails;

      eagleEl.innerText = Math.round(eagle / count * 100);
      tailsEl.innerText = Math.round(tails / count * 100);

      if (count % 10 === 1 && count % 100 !== 11) countEl.innerText = `${count} бросок`;
      else if (count % 10 > 1 && count % 10 < 5 && !(count % 100 > 11 && count % 100 < 15)) countEl.innerText = `${count} броска`;
      else countEl.innerText = `${count} бросков`;

      button.classList.toggle('disabled', false);
      coin.classList.remove('toss');

      imgs[res].style.opacity = 1;
    }, 1000);
  });
});
