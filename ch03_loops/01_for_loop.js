let brands = ["애플", "구글", "메타", "아마존", "삼성"];
console.log(brands);
console.log(brands[0]);
console.log(brands[1]);
console.log(brands[2]);
console.log(brands[3]);
console.log(brands[4]);
/*
for ( 시작값 ; 한계값 ; 증감값 ) {
  반복실행문
}
*/
console.log('반복문 부분입니다.');
for ( let i = 0 ; i < brands.length ; i++ ) {
  console.log(brands[i]);
}

let productList = [
  {
    name: '솔의눈',
    price: 700,
  },
  {
    name: '커피',
    price: 700,
  },
  {
    name: '파워에이드',
    price: 1200,
  },
  {
    name: '오렌지주스',
    price: 1000,
  },
  {
    name: '보리차',
    price: 1200,
  },
  {
    name: '콜라',
    price: 800,
  },  
]

// 음료의 이름들만 뽑아내보시오.
/*
실행 예
솔의눈
커피
파워에이드
오렌지주스
보리차
콜라
*/
for ( let i = 0 ; i < productList.length ; i++ ) {
  console.log(productList[i].name);
}

let inputCoin = 800;
let outputList = []; // 내가 가지고 있는 돈을 가지고 살 수 있는 음료들을 저장할 빈 배열을 선언 -> .push()
for ( let i = 0 ; i < productList.length ; i++ ) {
  if(productList[i].price <= inputCoin) {
    // 음료 가격이 투입 금액보다 작거나 같으면
    outputList.push(productList[i].name);
  }
}
console.log('구매 가능한 음료 목록은 ' + outputList + '입니다.');

// 지금 Scanner에 해당하는 애를 전혀 안쓰고 있는데, 이 부분은 브라우저 상에서 input 태그를 통해서 값을 입력 받게 되면 연산을 해서 결과값을 보여주도록 할 겁니다.

// 02_for_in.js