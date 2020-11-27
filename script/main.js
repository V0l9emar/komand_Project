window.addEventListener("load", () => {
  /*
   *  announcement get data from inputs
   */
  let newName = document.querySelector(".new-name");
  let neededCost = document.querySelector(".needed-cost");
  let newDate = document.querySelector(".new-date");
  let haveCost = document.querySelector(".have-cost");
  let newPercent = document.querySelector(".new-percent");
  let form = document.querySelector("form");
  let input = document.querySelectorAll("input");

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
  //   'Конечная сумма:': neededCost.value,
  //   'Всего дней:': newDate.value,
  //   'Процентная ставка:': newPercent.value,
  // }
  // for(let key in card){
  //   console.log(key)
  //   console.log(card[key])
  // }

  // function newCard(){

  // }

  console.log(new Date());
  /*
   *    Click to create new card
   */
  buttonCreate.addEventListener("click", function () {
    let card = {
      "Доход:": "5",
      "Ежемесечный взнос:": "1",
      "Конечная сумма:": neededCost.value,
      "Всего дней:": newDate.value,
      "Процентная ставка:": newPercent.value,
    };
    // for (let key in card) {
    //   console.log(key);
    //   console.log(card[key]);
    // }

    dataValue.push(
      neededCost.value,
      newDate.value,
      haveCost.value,
      newPercent.value
    );
    console.log(dataValue);

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
      // console.log(newCreatedName.childNodes[0])
      console.log(newCreatedName);
    };
    console.log(newBlock);

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
      console.log(delButoon);
      // delButoon.remove
      delButoon.removeChild();
    });

    editButoon.addEventListener("click", (event) => {
      console.log(newCreatedSpanValue);
    });
    form.reset();
  });
});
