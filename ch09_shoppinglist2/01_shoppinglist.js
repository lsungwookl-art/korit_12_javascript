const itemInput = document.getElementById('item-input');
const priceInput = document.getElementById('price-input');
const addBtn = document.getElementById('add-btn');
const shoppingList = document.getElementById('shopping-list');

const shoppingItems = JSON.parse(localStorage.getItem('shopping-items')) || [];
console.log(shoppingItems);

function renderShoppingList() {
  shoppingList.innerHTML = '';

  shoppingItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'shopping-item';
    if(item.completed) {
      li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;

    const itemTextSpan = document.createElement('span');
    itemTextSpan.className = 'item-text';
    itemTextSpan.textContent = item.text;

    const priceSpan = document.createElement('span');
    priceSpan.className = 'price';
    // 가격을 모르면 입력 안할 수도 있게끔 하겠습니다(필수연산되면 필요없는 부분)
    priceSpan.textContent = item.price ? `${item.price} 원` : '';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times';

    li.append(checkbox);
    li.append(itemTextSpan);
    li.append(priceSpan);
    li.append(deleteBtn);

    shoppingList.appendChild(li);

    checkbox.addEventListener('click', () => {
      shoppingItems[index].completed = checkbox.checked;
      li.classList.toggle('completed', checkbox.checked);
      saveShoppingItems();
    });

    deleteBtn.addEventListener('click', () => {
      shoppingItems.splice(index, 1);
      saveShoppingItems();
      renderShoppingList();
    });
  });
}

function saveShoppingItems() {
  localStorage.setItem('shopping-items', JSON.stringify(shoppingItems));
}

// function addShoppingItem() {
//   const itemText = itemInput.value.trim();
//   const itemPrice = priceInput.value.trim();

//   if (itemText === '') {
//     alert('구매할 물품을 입력해주세요 ! 😂');
//     return;
//   }
//   const newShoppingItem = {
//     text: itemText,
//     price: itemPrice,
//     completed: false,
//   };
//   shoppingItems.push(newShoppingItem);
//   // shoppingItems.push({
//   //   text: itemText,
//   //   price: itemPrice,
//   //   completed: false,
//   // });
//   itemInput.value = '';
//   priceInput.value = '';

//   renderShoppingList();
//   saveShoppingItems();
// }

// addBtn.addEventListener('click', addShoppingItem)
// 근데 addShoppingItem 함수의 재사용성이 없다면, 콜백함수 적용 예시
addBtn.addEventListener('click', () => {
  const itemText = itemInput.value.trim();
  const itemPrice = priceInput.value.trim();

  if (itemText === '') {
    alert('구매할 물품을 입력해주세요 ! 😂');
    return;
  }
  const newShoppingItem = {
    text: itemText,
    price: itemPrice,
    completed: false,
  };
  shoppingItems.push(newShoppingItem);
  // shoppingItems.push({
  //   text: itemText,
  //   price: itemPrice,
  //   completed: false,
  // });
  itemInput.value = '';
  priceInput.value = '';

  renderShoppingList();
  saveShoppingItems();
});

window.onload = renderShoppingList();