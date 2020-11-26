const input = document.querySelectorAll ('input');
const addBtn = document.querySelector('.butt__add');
let divBlock = document.querySelector('.new__plan');
var newDiv;


addBtn.addEventListener('click', () => {
    input.forEach(element => {
    console.log(element.value);
    });
    
    newDiv = document.createElement('div');
    newDiv.className = "info__div";
    newDiv.innerHTML = `<div class="info_div-block"><div class="info__div-name"><h2 class="info__div-head">${input}</h2></div><div class="info__div-earned"><span class="info__div-span">Доход</span><span class="info__div-spanValue">10 407.60 ₽</span></div><hr class="line"/><div class="info__div-monthly"><span class="info__div-span">Ежемесечный взнос</span><span class="info__div-spanValue">22 597.03 ₽</span></div><hr class="line" /><div class="info__div-fullsumm"><span class="info__div-span">Конечная сумма</span><span class="info__div-spanValue">240 407.60 ₽</span></div><hr class="line"/><div class="info__div-days"><span class="info__div-span">Всего дней</span><span class="info__div-spanValue">365</span></div><hr class="line"/><div class="info__div-days"><span class="info__div-span">Процентная ставка</span><span class="info__div-spanValue">7.76% годовых</span></div></div>`;
    divBlock.appendChild(newDiv);
});
