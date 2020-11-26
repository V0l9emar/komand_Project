window.addEventListener('load', () => {
  /*
   *  announcement get data from inputs
  */
  let newName = document.querySelector('.new-name');
  let neededCost = document.querySelector('.needed-cost');
  let newDate = document.querySelector('.new-date');
  let haveCost = document.querySelector('.have-cost');
  let newPercent = document.querySelector('.new-percent');



  /*
   *  announcement button for create elements
  */
  let buttonCreate = document.querySelector('.butt__add');

  /*
   *  announcement new block for new elements
  */
  let newInfoDiv = document.querySelector('.info__div');
  let newBlock = document.querySelector('.new__elm-block');

  /*
   *  Array with names
  */
  let infoValue = [ 'Название', 'Доход:', 'Ежемесечный взнос:', 'Конечная сумма:', 'Всего дней:','Процентная ставка:'];
  let dataValue = [];

  // function newCard(){

  // }


  /*
   *    Click to create new card
  */
  buttonCreate.addEventListener('click', function(){

    dataValue.push(newName.value, neededCost.value, newDate.value, haveCost.value, newPercent.value)

    console.log(dataValue);

    infoValue.forEach(elm => {

      let newCreatedName = document.createElement('div');
      let newCreatedSpanName = document.createElement('span');
      let newCreatedSpanValue = document.createElement('span');
      let hr = document.createElement('hr');


      newCreatedName.classList.add('info__div-add-data');
      newCreatedSpanName.classList.add('info__div-span');
      newCreatedSpanValue.classList.add('info__div-spanValue');
      hr.classList.add('line');

      newCreatedSpanName.innerHTML = elm;
      // newCreatedSpanValue.innerHTML =



      newBlock.append(newCreatedName);
      newCreatedName.append(newCreatedSpanName);
      newBlock.append(hr);
      // console.log(newCreatedName.childNodes[0])
      console.log(newCreatedName)
    });
    let buttonsBlock = document.createElement('div')
    let delButoon = document.createElement('button');
    let editButoon = document.createElement('button');

    buttonsBlock.classList.add('info__div-buttons-block')
    delButoon.classList.add('info__div-delete');
    editButoon.classList.add('info__div-edit');

    delButoon.innerHTML = 'Delete';
    editButoon.innerHTML = 'Edit';

    newBlock.append(buttonsBlock);
    buttonsBlock.append(delButoon);
    buttonsBlock.append(editButoon);
  })
})

