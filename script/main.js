window.addEventListener("load", () => {
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

  let earnedByPercent = document.querySelector("#earnedByPercent");
  let byMonth = document.querySelector("#byMonth");
  let finalSumm = document.querySelector("#finalSumm");
  let month = document.querySelector("#month");
  let percent = document.querySelector("#percent");
  let curPercnt = document.querySelector("#curPercnt");
  // console.log(curPercnt.innerHTML)

  // percent.addEventListener('keyup', (event) => {
  //   let res = `${curPercnt.innerHTML}% годовых`;
  //   res += event.key;
  //   // console.log(event.key)
  // })

  /*
   *  announcement button for create elements
   */
  let buttonCreate = document.querySelector(".butt__add");

  /*
   *  announcement new block for new elements
   */
  let newInfoDiv = document.querySelector(".info__div");
  let newBlock = document.querySelector(".new__elm-block");

  /*
   *  Object with names
   */

  // let card = {
  //   'Доход:': '5',
  //   'Ежемесечный взнос:': '1',
  //   'Конечная сумма:': finalAmount.value,
  //   'Всего дней:': termOfDeposit.value,
  //   'Процентная ставка:': newPercent.value,
  // }
  // for(let key in card){
  //   console.log(key)
  //   console.log(card[key])
  // }
  //

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


  function count(){
    let earnedAmount =
    (haveAmount.value / 100) * newPercent.value * (termOfDeposit.value / 12);
  let byEachMonth =
    (finalAmount.value - haveAmount.value - earnedAmount) /
    termOfDeposit.value;

    card = {
      "Прибыль по %:": `${earnedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
      "Ежемесечный взнос:": ` ${byEachMonth.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
      "Конечная сумма:": `${finalAmount.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
      "Всего месяцев:": `${termOfDeposit.value} мес.`,
      "Процентная ставка:": `${newPercent.value}% в год`,
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
    // let card = {
    //   "Прибыль по %:": `${earnedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
    //   "Ежемесечный взнос:": ` ${byEachMonth.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
    //   "Конечная сумма:": `${finalAmount.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`,
    //   "Всего месяцев:": `${termOfDeposit.value} мес.`,
    //   "Процентная ставка:": `${newPercent.value}% в год`,
    // };
    // console.log(newPercent.value)

    // for (let key in card) {
    //   console.log(key);
    //   console.log(card[key]);
    // }

    // dataValue.push(
    //   finalAmount.value,
    //   termOfDeposit.value,
    //   haveAmount.value,
    //   newPercent.value
    // );
    // console.log(dataValue);

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

    /*
     *    Delete button click
     */
    delButoon.addEventListener("click", (event) => {
      newCreatedBlock.remove();
      // delButoon.remove
      // delButoon
    });


    let editableElm = document.querySelectorAll(".info__div-spanValue");
    editButoon.addEventListener("click", (event) => {
      console.log(editableElm);
      // switch(editableElm){
      //   case false:
      //     element.contentEditable = true;
      //     editButoon.innerHTML = 'Edit';
      //     break;
      //   case true:
      //     element.contentEditable = false;
      //     editButoon.innerHTML = 'Accept';
      //   break;
      // }

      let clicked = true;
      if (clicked) {
        editableElm.contentEditable = true;
        editButoon.innerHTML = "Accept";
        clicked = false;
      } else if (clicked) {
        editableElm.contentEditable = false;
        editButoon.innerHTML = "Edit";
      }
      editableElm.contentEditable = true;
      editButoon.innerHTML = 'Accept'
    });

    // editableElm.forEach((element) => {
    //   editButoon.addEventListener("click", (event) => {
    //     console.log(editableElm);
    //     // switch(editableElm){
    //     //   case false:
    //     //     element.contentEditable = true;
    //     //     editButoon.innerHTML = 'Edit';
    //     //     break;
    //     //   case true:
    //     //     element.contentEditable = false;
    //     //     editButoon.innerHTML = 'Accept';
    //     //   break;
    //     // }

    //     // let clicked = true;
    //     // if (clicked) {
    //     //   element.contentEditable = true;
    //     //   editButoon.innerHTML = "Accept";
    //     //   clicked = false;
    //     // } else if (clicked) {
    //     //   element.contentEditable = false;
    //     //   editButoon.innerHTML = "Edit";
    //     // }
    //     // element.contentEditable = true;
    //     // editButoon.innerHTML = 'Accept'
    //   });
    // });
    form.reset();
  });
});
