const nameInput = document.getElementById('itemName');
const priceInput = document.getElementById('itemPrice');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('shoppingList');
const totalPriceDisplay = document.getElementById('totalPrice');

// 모든 항목의 (가격 * 수량)을 계산해 하단에 표시하는 함수
function calculateTotal() {
    let total = 0;
    const allItems = list.querySelectorAll('li');
    
    allItems.forEach(item => {
        const price = parseInt(item.dataset.price);
        const qty = parseInt(item.querySelector('.qty-val').textContent);
        total += price * qty;
    });
    
    totalPriceDisplay.textContent = total.toLocaleString();
}

// 새로운 장보기 항목을 리스트에 추가하는 함수
function addItem() {
    const name = nameInput.value.trim();
    const price = priceInput.value.trim();

    if (!name || !price) {
        alert("품목과 가격을 모두 입력해주세요!");
        return;
    }

    const li = document.createElement('li');
    li.dataset.price = price; // 계산을 위해 원본 가격 저장

    li.innerHTML = `
        <div class="item-info">
            <b>${name}</b>
            <span>${Number(price).toLocaleString()}원</span>
        </div>
        <div class="controls">
            <button class="qty-btn minus">-</button>
            <span class="qty-val">1</span>
            <button class="qty-btn plus">+</button>
            <button class="delete-btn">삭제</button>
        </div>
    `;

    // 수량 증가 버튼
    li.querySelector('.plus').onclick = () => {
        const qtySpan = li.querySelector('.qty-val');
        qtySpan.textContent = parseInt(qtySpan.textContent) + 1;
        calculateTotal();
    };

    // 수량 감소 버튼
    li.querySelector('.minus').onclick = () => {
        const qtySpan = li.querySelector('.qty-val');
        let currentQty = parseInt(qtySpan.textContent);
        if (currentQty > 1) {
            qtySpan.textContent = currentQty - 1;
            calculateTotal();
        }
    };

    // 삭제 버튼
    li.querySelector('.delete-btn').onclick = () => {
        if(confirm("이 항목을 삭제할까요?")) {
            li.remove();
            calculateTotal();
        }
    };

    list.appendChild(li);
    calculateTotal(); // 추가 직후 총액 갱신

    // 입력창 초기화
    nameInput.value = "";
    priceInput.value = "";
    nameInput.focus();
}

// 이벤트 리스너 연결
addBtn.addEventListener('click', addItem);

// 가격 입력창에서 엔터 눌러도 추가되게 설정
priceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});