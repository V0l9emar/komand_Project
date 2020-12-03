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
    this.canvas.height = width / 2;
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
    this.legend.style.margin = '15px auto';
    this.legend.style.display = 'flex';
    this.legend.style.flexDirection = 'column';
    this.legend.style.alignItems = 'baseline'
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
      li.style.fontSize = this.width / 20 + 'px';
      li.style.padding = '1px';
      li.style.justifyContent = "center"
      li.style.marginBottom = "5px";
      li.style.textTransform = 'uppercase';
      li.style.alignItems = 'center'
      this.legend.appendChild(li);
    }
    makeLi(this.colors.percent, 'Погашено процентами: ' + (object.percentSumm).toFixed(2));
    makeLi(this.colors.all, 'Собственные средства: ' + (object.paySumm - object.first).toFixed(2));
    makeLi(this.colors.first, 'Начальный платёж: ' + (object.first).toFixed(2));
    const li = document.createElement('li');
    return this.legend
  }

  makeColumn(text) {
    const em = document.createElement('p');
    if (text) { em.innerText = text };
    em.style.width = '25%';
    em.style.justifyContent = 'center';
    em.style.alignItems = 'center';
    em.style.display = 'flex';
    em.style.padding = "0 10px";
    return em;
  }

  makeHeader() {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.fontSize = this.width / 35 + 'px'
    li.style.padding = '1px';
    li.style.alignItems = 'center';
    li.style.justifyContent = 'space-between';
    li.style.marginBottom = '5px';
    li.style.textTransform = 'uppercase';
    li.style.padding = '2px 5px';
    li.style.backgroundColor = '#5b5b5e';
    li.style.color = 'white';
    const monthBlock = this.makeColumn('Период');
    monthBlock.style.width = '15%';
    const currentBlock = this.makeColumn('Текущий');
    const percentsBlock = this.makeColumn('Проценты');
    const nextBlock = this.makeColumn('Платёж');
    const sumBlock = this.makeColumn('Итог');
    li.appendChild(monthBlock);
    li.appendChild(currentBlock);
    li.appendChild(percentsBlock);
    // li.appendChild(nextBlock);
    li.appendChild(sumBlock);
    return li;
  }


  makeList(object) {
    this.list = this.recreateUl('list');
    this.list.style.marginTop = '15px'
    this.list.style.display = 'flex'
    this.list.style.flexDirection = 'column'
    this.list.style.width = '100%';
    this.list.appendChild(this.makeHeader());
    object.payments.forEach((month, i) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.fontSize = this.width / 25 + 'px'
      li.style.padding = '1px';
      li.style.alignItems = "center"
      li.style.justifyContent = "space-between"
      li.style.marginBottom = "5px";
      li.style.textTransform = 'uppercase';
      li.style.padding = "2px 5px";
      if (i % 2 === 0) {
        li.style.backgroundColor = '#757E9F';
        li.style.color = '#E6E6E6'
      }
      const monthBlock = this.makeColumn(month.month);
      monthBlock.style.width = '15%';
      const currentBlock = this.makeColumn(month.curconto.toFixed(2));
      const percentsBlock = this.makeColumn(month.percents.toFixed(2));
      const nextBlock = this.makeColumn(month.count.toFixed(2));
      const sumBlock = this.makeColumn(month.payUp.toFixed(2));
      li.appendChild(monthBlock);
      li.appendChild(currentBlock);
      li.appendChild(percentsBlock);
      li.appendChild(nextBlock);
      // li.appendChild(sumBlock);
      this.list.appendChild(li);
    });
    return this.list;
  }

  draw(object) {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const maxPay = Math.max(...object.payments.map(e => e.count));
    const aspect = this.canvas.height / maxPay;
    const margin = 4;
    const barWidth = (this.width / object.payments.length) - margin;
    let x = 0;
    object.payments.forEach(month => {
      ctx.fillStyle = this.colors.percent;
      ctx.fillRect(x, this.canvas.height, barWidth, -(month.count * aspect));
      ctx.fillStyle = this.colors.all;
      ctx.fillRect(x, this.canvas.height, barWidth, -((month.count - month.percents) * aspect));
      ctx.fillStyle = this.colors.first;
      ctx.fillRect(x, this.canvas.height, barWidth, -(object.first * aspect));
      x += barWidth + margin;
    });
  }

  drawGraph(t) {
    this.draw(t);
    this.makeLegend(t);
    this.makeList(t);
  }
}



class Dlg {
  calcPay(cost, rate, term, first) {
    return ((cost - first) * rate / 100 / ((1 + rate / 100) ** term - 1)) - (first * rate / 100);
  }

  calc(cost, rate, term, first, name = 'noname') {
    const oneRate = rate / 100;
    const trate = 1 + oneRate
    let payUp = this.calcPay(cost, rate, term, first);
    let count = first;
    let percentSumm = 0;
    let paySumm = first + (payUp * term);
    const payments = [];
    for (let month = 1; month <= term; month++) {
      const percents = count * oneRate;
      const curconto = count;
      count += percents;
      count += payUp;
      percentSumm += percents;
      payments.push({ curconto, count, month, percents, payUp });
    }
    return { payments, cost, payUp, first, percentSumm, paySumm, term, 'rate': oneRate * 100, name };
  }

  makeEm(cls, tag = 'div', text = null, id = null) {
    const em = document.createElement(tag);
    em.classList.add(cls);
    if (id) { em.id = id; }
    if (text) { em.innerText = text; }
    return em;
  }

  constructor(id) {
    this.body = document.querySelector('body');
    this.wraper = this.makeEm();
    this.wraper.style.position = "absolute";
    this.wraper.style.top = "0";
    this.wraper.style.left = "0";
    this.wraper.style.width = "100vw";
    this.wraper.style.height = "100vh";
    this.wraper.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.wraper.style.zIndex = '999';
    this.wraper.style.display = 'none';
    this.wraper.style.justifyContent = "center";
    this.curem = {};
    this.dlg = this.makeEm();
    this.wraper.appendChild(this.dlg);
    this.body.appendChild(this.wraper);
  }

  lockScroll() {
    this.wraper.style.display = 'flex';
    this.body.style.overflow = "hidden";
  }

  lockUnScroll() {
    this.wraper.style.display = 'none';
    this.body.style.overflow = "visible";
  }
  setInputDefault(input, place = '') {
    input.placeholder = place;
    input.style.margin = '5px';
    input.style.padding = '5px';
    input.style.backgroundColor = "#cfcfcf"
    input.style.fontSize = '24px'
    input.style.textAlign = 'center';
    input.type = "number";
    input.style.borderRadius = "10px";
    input.addEventListener('keyup', e => { this.validate() }, true)
    input.addEventListener('change', e => { this.validate() }, true)
    return input;
  }

  validate() {
    const cost = parseFloat(this.costIn.value);
    const rate = parseFloat(this.rateIn.value);
    const term = parseFloat(this.termIn.value);
    const first = parseFloat(this.firstIn.value);
    const name = this.nameIn.value;
    const v = (cost > 10) && (rate > 0) && (rate < 100) && (term > 1) && (term < 1200) && (first < cost) && (first > 0) && name.length;
    if (v) {
      if (this.calcPay(cost, rate, term, first) > 0) {
        this.curem = this.calc(cost, rate, term, first, name);
        this.dlg.graph.div.style.display = 'block';
        this.confirmBtn.style.display = 'block'
        this.confirmBtn.disabled = false;
        this.dlg.graph.drawGraph(this.curem);
        this.confirmBtn.innerHTML = `${this.confirmBtn.dataset.name}<br/><small>Ежемесячный взнос</small> ${(this.curem.payUp).toFixed(2)}`;
        this.confirmBtn.style.backgroundColor = "green";
      }
      else {
        this.confirmBtn.disabled = true;
        this.confirmBtn.style.display = 'block'
        this.dlg.graph.div.style.display = 'none';
        this.confirmBtn.style.backgroundColor = "red";
        this.confirmBtn.innerHTML = 'Это невозможно<br/> платёж будет отрицательный';
      }
    } else if (!(cost && rate && term && first && name)) {
      this.confirmBtn.style.display = 'none'
      this.dlg.graph.div.style.display = 'none';
    }
    else {
      this.confirmBtn.disabled = true;
      this.confirmBtn.style.display = 'bloc'
      this.dlg.graph.div.style.display = 'none';
      this.confirmBtn.style.backgroundColor = "red";
      this.confirmBtn.innerHTML = "Введённые данные не полны<br/> или не верны";
    }
  }

  defaultPlaceholder(place = '') {
    const em = this.makeEm();
    em.innerText = place;
    em.style.fontSize = '12px';
    em.style.fontWeight = 'bold';
    return em;
  }
  new(exitFunc) {
    this.change(null, null, null, null, null, exitFunc);
  }

  change(cost, rate, term, first, name, exitFunc) {
    this.dlg.innerHTML = '';
    this.wraper.style.top = window.pageYOffset + 'px';
    this.lockScroll();
    this.dlg.style.display = 'flex';
    this.dlg.style.maxHeight = "100vh"
    this.dlg.style.borderRadius = '10px';
    this.dlg.style.margin = "20px 20px";
    this.dlg.style.flexDirection = "column";
    this.dlg.style.backgroundColor = "white"
    this.dlg.style.maxWidth = "600px";
    this.dlg.style.width = "100%"
    this.dlg.style.alignItems = "center";
    this.dlg.style.paddingTop = "20px";
    this.dlg.style.position = "relative";
    this.dlg.style.overflow = "auto";

    this.nameIn = this.makeEm('name_input', 'input');
    this.costIn = this.makeEm('cost_input', 'input');
    this.rateIn = this.makeEm('rate_input', 'input');
    this.termIn = this.makeEm('term_input', 'input');
    this.firstIn = this.makeEm('first_input', 'input');

    const namePlace = this.defaultPlaceholder('Цель')
    this.setInputDefault(this.nameIn, 'Цель');
    this.nameIn.type = 'text';
    if (name) { this.nameIn.value = name };
    const costPlace = this.defaultPlaceholder('Цена')
    this.setInputDefault(this.costIn, 'Цена');
    this.costIn.value = cost;
    const ratePlace = this.defaultPlaceholder('Ставка')
    this.setInputDefault(this.rateIn, 'Ставка');
    this.rateIn.value = rate;
    const termPlace = this.defaultPlaceholder('Период')
    this.setInputDefault(this.termIn, 'Период');
    this.termIn.value = term;
    const firstPlace = this.defaultPlaceholder('Взнос')
    this.setInputDefault(this.firstIn, 'Взнос');
    this.firstIn.value = first;

    const closeBtn = this.makeEm('closeBtn', 'span', 'X');
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "15px";
    closeBtn.style.right = "25px";
    closeBtn.style.padding = "10px";
    closeBtn.style.cursor = "pointer"
    closeBtn.addEventListener('click', e => {
      exitFunc(false, this);
      this.hide();
    })
    this.confirmBtn = this.makeEm('closeBtn', 'button', 'Изменить');
    this.confirmBtn.style.cursor = "pointer"
    this.confirmBtn.style.minWidth = "250px";
    this.confirmBtn.style.margin = '10px 0';
    this.confirmBtn.style.padding = '12px 15px';
    this.confirmBtn.style.backgroundColor = "#cfcfcf"
    this.confirmBtn.style.fontSize = '24px'
    this.confirmBtn.style.textAlign = 'center';
    this.confirmBtn.style.borderRadius = "10px";
    this.confirmBtn.style.display = 'none';
    this.confirmBtn.style.color = "white";
    this.confirmBtn.dataset.name = (name) ? 'Изменить' : 'Добавить';
    this.confirmBtn.addEventListener('click', e => {
      exitFunc((name) ? 'change' : 'add', this);
      this.hide();
    })

    this.dlg.appendChild(namePlace);
    this.dlg.appendChild(this.nameIn);
    this.dlg.appendChild(costPlace);
    this.dlg.appendChild(this.costIn);
    this.dlg.appendChild(ratePlace);
    this.dlg.appendChild(this.rateIn);
    this.dlg.appendChild(termPlace);
    this.dlg.appendChild(this.termIn);
    this.dlg.appendChild(firstPlace);
    this.dlg.appendChild(this.firstIn);
    this.dlg.appendChild(closeBtn);
    this.dlg.appendChild(this.confirmBtn);


    const graph = this.makeEm('graph_dlg');
    this.dlg.graph = new makeGraph(graph, (this.dlg.offsetWidth > 550) ? 500 : (this.dlg.offsetWidth * 3 / 4))
    this.dlg.appendChild(graph);
    this.validate();
  }

  hide() {
    this.wraper.style.display = "none";
    this.lockUnScroll();
  }
}

const dlg = new Dlg('lazydlg');

window.addEventListener("load", () => {

  // function count() {
  //   let res = calc(parseFloat(finalAmount.value), parseFloat(newPercent.value), parseFloat(termOfDeposit.value), parseFloat(haveAmount.value));
  //   card = {
  //     "Прибыль по %:": `${res.percentSumm.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
  //     "Ежемесечный взнос:": ` ${res.payUp.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
  //     "Конечная сумма:": `${finalAmount.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
  //     "Всего месяцев:": `${termOfDeposit.value} мес.`,
  //     "Процентная ставка:": `${newPercent.value}% в мес.`,
  //   };
  // }
  // count();


  console.log(new Date());
  let res;
  /*
   *    Click to create new card
   */
  buttonCreate.addEventListener("click", function () {
    //Dialog
    dlg.new(e => {
      if (e === "add") {
        res = dlg.curem;
        card = {
          "Прибыль по %:": `${res.percentSumm.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
          "Ежемесечный взнос:": ` ${res.payUp.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
          "Конечная сумма:": `${res.cost.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
          "Всего месяцев:": `${res.term} мес.`,
          "Процентная ставка:": `${res.rate}% в мес.`,
        }
        create();
      }
    });


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
    // count();
    // calc();
    function create() {
      let newCreatedBlock = document.createElement("div");
      let newCreatedHeaderName = document.createElement("h2");
      newCreatedHeaderName.innerHTML = res.name;
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
      function makeGraphEm(cost, rate, term, first, name = 'test') {
        const graphDiv = document.createElement("div");

        graphDiv.classList.add('graph');
        graphDiv.style.margin = "0 auto";
        newCreatedBlock.appendChild(graphDiv);
        const td = calc(cost, rate, term, first, name);
        const graph = new makeGraph(graphDiv, newCreatedBlock.offsetWidth * 3 / 5, 200);
        graph.drawGraph(td);
        return graphDiv;
      }
      const graphDiv = makeGraphEm(parseFloat(res.cost), parseFloat(res.rate * 100), parseFloat(res.term), parseFloat(res.first));
      graphDiv.classList.add('graphBlock')



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
        for (let i = 0; i < editableElm.length; i++) {
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
      //form.reset();
    }
  });
});