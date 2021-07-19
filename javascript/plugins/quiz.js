const btn1 = document.querySelector('#btn-1')
const btn2 = document.querySelector('#btn-2')
const answer = document.querySelector('#answer')

const btnsArray = [btn1, btn2];

btnsArray.forEach(btn => {

   btn.addEventListener('click', ()=> {
    answer.style.visibility = 'visible';
    answer.style.transform = 'translateX(0)'

  });
});

btn1.addEventListener('click', ()=> {
  answer.style.background = 'green'
});

btn2.addEventListener('click', ()=> {
  answer.style.background = 'red'
});
