/*
  *  announcement get data from inputs
  */
let newName = document.querySelector(".new-name");
let finalAmount = document.querySelector(".final-amount");
let termOfDeposit = document.querySelector(".new-date");
let haveAmount = document.querySelector(".have-amount");
let newPercent = document.querySelector(".new-percent");
let form = document.querySelector("form");
// let input = document.querySelectorAll("input");
let card;

let btnclicked = false;

let earnedByPercent = document.querySelector("#earnedByPercent");
let byMonth = document.querySelector("#byMonth");
let finalSumm = document.querySelector("#finalSumm");
let month = document.querySelector("#month");
let percent = document.querySelector("#percent");
let curPercnt = document.querySelector("#curPercnt");

/*
  *  announcement button for create elements
  */
let buttonCreate = document.querySelector(".butt__add");

/*
  *  announcement new block for new elements
  */
let newInfoDiv = document.querySelector(".info__div");
let newBlock = document.querySelector(".new__elm-block");

// function count() {
//   let earnedAmount =
//     (haveAmount.value / 100) * newPercent.value * (termOfDeposit.value / 12);
//   let byEachMonth =
//     (finalAmount.value - haveAmount.value - earnedAmount) /
//     termOfDeposit.value;

//   card = {
//     "Прибыль по %:": `${earnedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
//     "Ежемесечный взнос:": ` ${byEachMonth.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
//     "Конечная сумма:": `${finalAmount.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
//     "Всего месяцев:": `${termOfDeposit.value} мес.`,
//     "Процентная ставка:": `${newPercent.value}% в год`,
//   };
// }
// count();


function calc(cost, rate, term, first, name = newName.value) {
  rate = rate / 100;
  const trate = 1 + rate
  rows = ((cost - first) * rate * (1 / (trate ** term - 1))) - (first * rate);
  let payUp = rows;
  let count = first;
  let percentSumm = 0;
  let paySumm = first + (payUp * term);
  const payments = [];
  for (let month = 1; month <= term; month++) {
    const percents = count * rate;
    curconto = count;
    count += percents;
    count += payUp;
    // if (count <= cost) {
    //     payments.push({ curconto, count, month, percents, payUp });
    // } else {
    //     payments.push({ curconto, 'count': cost, month, percents, 'payUp': payUp - (count - cost) });
    // }
    percentSumm += percents;
    payments.push({ curconto, count, month, percents, payUp });
  }
  return { payments, cost, payUp, first, percentSumm, paySumm, term, 'rate': rate * 100, name };
}


class makeGraph {
  constructor(mainCls, width = '375', height = '50', colors = ['red', 'green', 'blue']) {
    this.colors = {};
    this.colors.percent = colors[1];
    this.colors.all = colors[0];
    this.colors.first = colors[2];
    this.width = width;
    this.height = height;
    // this.div = document.querySelector(mainCls);
    this.div = mainCls;
    this.div.style.position = 'relative';
    this.div.style.width = width + 'px'
    this.div.style.height = "100%"
    this.canvas = document.createElement('canvas');
    this.canvas.height = height;
    this.canvas.width = width;
    this.div.appendChild(this.canvas);
  }

  recreateUl(em) {
    if (this[em]) {
      this[em].querySelectorAll('li').forEach(e => e.remove());
    } else {
      this[em] = document.createElement('ul');
      this.div.appendChild(this[em]);
    }
    return this[em];
  }

  makeLegend(object) {
    this.legend = this.recreateUl('legend');
    this.legend.style.marginTop = '30px';
    this.legend.style.display = 'flex';
    this.legend.style.flexDirection = 'column';
    this.legend.style.justifyContent = "center"
    this.legend.style.width = '100%';
    const makeLi = (color, text) => {
      const li = document.createElement('li');
      const colorBlock = document.createElement('div');
      colorBlock.style.backgroundColor = color;
      colorBlock.style.width = 30 + 'px';
      colorBlock.style.height = 30 + 'px';
      colorBlock.style.marginRight = '5px';
      const textBlock = document.createElement('p');
      textBlock.style.textAlign = 'left';
      textBlock.innerText = text;
      li.appendChild(colorBlock);
      li.appendChild(textBlock);
      li.style.display = 'flex';
      li.style.fontSize = this.width / 45 + 'px';
      li.style.padding = '1px';
      li.style.justifyContent = "center"
      li.style.marginBottom = "5px";
      li.style.textTransform = 'uppercase';
      this.legend.appendChild(li);
    }
    makeLi(this.colors.percent, 'Погашено процентами: ' + (object.percentSumm).toFixed(2));
    makeLi(this.colors.all, 'Собственные средства: ' + (object.paySumm).toFixed(2));
    makeLi(this.colors.first, 'Начальный платёж: ' + (object.first).toFixed(2));
    const li = document.createElement('li');
    return this.legend
  }

  makeList(object) {
    this.list = this.recreateUl('list');
    this.list.style.marginTop = '30px'
    this.list.style.display = 'flex'
    this.list.style.flexDirection = 'column'
    this.list.style.width = '100%';
    object.payments.forEach(month => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.fontSize = this.width / 45 + 'px'
      li.style.padding = '1px';
      li.style.alignItems = "center"
      li.style.justifyContent = "space-between"
      li.style.marginBottom = "5px";
      li.style.textTransform = 'uppercase';
      const monthBlock = document.createElement('p');
      const currentBlock = document.createElement('p');
      const percentsBlock = document.createElement('p');
      const nextBlock = document.createElement('p');
      const sumBlock = document.createElement('p');
      li.appendChild(monthBlock);
      li.appendChild(currentBlock);
      li.appendChild(percentsBlock);
      li.appendChild(nextBlock);
      li.appendChild(sumBlock);
      monthBlock.innerText = month.month;
      currentBlock.innerText = month.curconto.toFixed(2);
      percentsBlock.innerText = month.percents.toFixed(2);
      sumBlock.innerText = month.count.toFixed(2);
      nextBlock.innerText = month.payUp.toFixed(2);
      this.list.appendChild(li);
    });
    return this.list;
  }

  draw(object) {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const maxPay = Math.max(...object.payments.map(e => e.count));
    const aspect = this.height / maxPay;
    const margin = 2;
    const barWidth = (this.width / object.payments.length) - margin;
    let x = 0;
    object.payments.forEach(month => {
      ctx.fillStyle = this.colors.percent;
      ctx.fillRect(x, this.height, barWidth, -(month.count * aspect));
      ctx.fillStyle = this.colors.all;
      ctx.fillRect(x, this.height, barWidth, -((month.count - month.percents) * aspect));
      ctx.fillStyle = this.colors.first;
      ctx.fillRect(x, this.height, barWidth, -(object.first * aspect));
      x += barWidth + margin;
    });
  }

  drawGraph(t) {
    this.draw(t);
    this.makeLegend(t);
    this.makeList(t);
  }
}



window.addEventListener("load", () => {
  //  /*
  //  *  announcement get data from inputs
  //  */
  // let newName = document.querySelector(".new-name");
  // let finalAmount = document.querySelector(".final-amount");
  // let termOfDeposit = document.querySelector(".new-date");
  // let haveAmount = document.querySelector(".have-amount");
  // let newPercent = document.querySelector(".new-percent");
  // let form = document.querySelector("form");
  // // let input = document.querySelectorAll("input");
  // let card;
  // let btnclicked = false;

  // let earnedByPercent = document.querySelector("#earnedByPercent");
  // let byMonth = document.querySelector("#byMonth");
  // let finalSumm = document.querySelector("#finalSumm");
  // let month = document.querySelector("#month");
  // let percent = document.querySelector("#percent");
  // let curPercnt = document.querySelector("#curPercnt");

  // /*
  //  *  announcement button for create elements
  //  */
  // let buttonCreate = document.querySelector(".butt__add");

  // /*
  //  *  announcement new block for new elements
  //  */
  // let newInfoDiv = document.querySelector(".info__div");
  // let newBlock = document.querySelector(".new__elm-block");

  /*
   *  Object with names
   */

  //   function calc(cost, rate, term, first, name = 'test') {
  //     rate = rate / 100;
  //     const trate = 1 + rate
  //     rows = ((cost - first) * rate * (1 / (trate ** term - 1))) - (first * rate);
  //     let payUp = rows;
  //     let count = first;
  //     let percentSumm = 0;
  //     let paySumm = first + (payUp * term);
  //     const payments = [];
  //     for (let month = 1; month <= term; month++) {
  //         const percents = count * rate;
  //         curconto = count;
  //         count += percents;
  //         count += payUp;
  //         // if (count <= cost) {
  //         //     payments.push({ curconto, count, month, percents, payUp });
  //         // } else {
  //         //     payments.push({ curconto, 'count': cost, month, percents, 'payUp': payUp - (count - cost) });
  //         // }
  //         percentSumm += percents;
  //         payments.push({ curconto, count, month, percents, payUp });
  //     }
  //     return { payments, cost, payUp, first, percentSumm, paySumm, term, 'rate': rate * 100, name, first };
  // }


  function count() {
    // let earnedAmount =
    //   (haveAmount.value / 100) * newPercent.value * (termOfDeposit.value / 12);
    // let byEachMonth =
    //   (finalAmount.value - haveAmount.value - earnedAmount) /
    //   termOfDeposit.value;


    let res = calc(parseFloat(finalAmount.value), parseFloat(newPercent.value), parseFloat(termOfDeposit.value), parseFloat(haveAmount.value));
    card = {
      "Прибыль по %:": `${res.percentSumm.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
      "Ежемесечный взнос:": ` ${res.payUp.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
      "Конечная сумма:": `${finalAmount.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
      "Всего месяцев:": `${termOfDeposit.value} мес.`,
      "Процентная ставка:": `${newPercent.value}% в мес.`,
    };
  }
  count();


  console.log(new Date());
  /*
   *    Click to create new card
   */
  buttonCreate.addEventListener("click", function () {
    // console.log(newName.value)
    // if(newName.value == '' || finalAmount.value == '' || termOfDeposit.value == '' || haveAmount.value == '' || newPercent.value == ''){
    //   buttonCreate.removeEventListener('click',)
    //   form.reset();
    // }
    // let earnedAmount =
    //   (haveAmount.value / 100) * newPercent.value * (termOfDeposit.value / 12);
    // let byEachMonth =
    //   (finalAmount.value - haveAmount.value - earnedAmount) /
    //   termOfDeposit.value;

    // console.log(earnedAmount)
    count();
    // calc();

    let newCreatedBlock = document.createElement("div");
    let newCreatedHeaderName = document.createElement("h2");
    newCreatedHeaderName.innerHTML = newName.value;
    newCreatedBlock.classList.add("info__created-block");
    newCreatedHeaderName.classList.add("info__div-named");

    newBlock.append(newCreatedBlock);
    newCreatedBlock.append(newCreatedHeaderName);

    /*
     *  Pereberayem elementi
     */

    // infoValue.forEach((elm) => {
    for (let key in card) {
      let newCreatedName = document.createElement("div");
      let newCreatedSpanName = document.createElement("span");
      let newCreatedSpanValue = document.createElement("span");
      let hr = document.createElement("hr");

      newCreatedName.classList.add("info__div-add-data");
      newCreatedSpanName.classList.add("info__div-span");
      newCreatedSpanValue.classList.add("info__div-spanValue");

      if (key !== "Конечная сумма:") {
        newCreatedSpanValue.classList.add("info__div-editSwitch");
      }
      hr.classList.add("line");

      // newCreatedSpanName.contentEditable = true;

      newCreatedSpanName.innerHTML = key;
      newCreatedSpanValue.innerHTML = card[key];

      newCreatedBlock.append(newCreatedName);
      newCreatedName.append(newCreatedSpanName);
      newCreatedName.append(newCreatedSpanValue);
      newCreatedBlock.append(hr);
    }

    let buttonsBlock = document.createElement("div");
    let delButoon = document.createElement("button");
    let editButoon = document.createElement("button");

    buttonsBlock.classList.add("info__div-buttons-block");
    delButoon.classList.add("info__div-delete");
    editButoon.classList.add("info__div-edit");

    delButoon.innerHTML = "Delete";
    editButoon.innerHTML = "Edit";

    newCreatedBlock.append(buttonsBlock);
    buttonsBlock.append(delButoon);
    buttonsBlock.append(editButoon);

    // Graph block
    // function makeGraphEm(cost, rate, term, first, name = 'test') {
    //   const graphDiv = document.createElement("div");

    //   graphDiv.classList.add('graph');
    //   graphDiv.style.margin = "0 auto";
    //   newCreatedBlock.appendChild(graphDiv);
    //   const td = calc(cost, rate, term, first, name);
    //   const graph = new makeGraph(graphDiv, newCreatedBlock.offsetWidth * 2 / 3, 200);
    //   graph.drawGraph(td);
    //   return graphDiv;
    // }

    // makeGraphEm(parseFloat(finalAmount.value), parseFloat(newPercent.value), parseFloat(termOfDeposit.value), parseFloat(haveAmount.value));



    // const graphButton = document.createElement("button");
    // newCreatedBlock.appendChild(graphButton);
    // graphButton.classList.add("info__div-delete");
    // graphButton.innerHTML = 'График';
    // graphButton.addEventListener('click', e => {
    //   const g = makeGraph(1000, 1, 5, 100)
    //   newCreatedBlock.appendChild(g);
    // });

    // const graphDiv = document.createElement("div");
    // graphDiv.classList.add('graph');
    // newCreatedBlock.appendChild(graphDiv);
    // const td = calc(parseFloat(finalAmount.value), parseFloat(newPercent.value), parseFloat(termOfDeposit.value), parseFloat(haveAmount.value));
    // const graph = new makeGraph('.graph', 200);
    // graph.drawGraph(td);
    /*
     *    Delete button click
     */
    delButoon.addEventListener("click", (event) => {
      newCreatedBlock.remove();
      // delButoon.remove
      // delButoon
    });
    // editableElm.contentEditable = true;
    let btnclicked = false;
    let editableElm = document.querySelectorAll(".info__div-editSwitch");
    editButoon.addEventListener("click", (event) => {
      console.log(editableElm.innerHTML);
      // console.log(btnclicked);
      if (!btnclicked) {
        editButoon.innerHTML = "Accept";
      } else {
        editButoon.innerHTML = "Edit";
      }
      editableElm.forEach(e => e.contentEditable = !btnclicked)
      btnclicked = !btnclicked;
      console.log(editableElm.values)
      for(let i=0; i<editableElm.length; i++){
        const editElm = calc(parseFloat(finalAmount.value), parseFloat(newPercent.value), parseFloat(termOfDeposit.value), parseFloat(haveAmount.value));
        // if(editElm.payUp < 0){
        //   editButoon.disabled = true;
        // }else{
        //   editButoon.disabled = false;
        // }
        console.log(editElm.payUp.value)
      }

      // editableElm.contentEditable = true;
    });
    form.reset();
  });
});