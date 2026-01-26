let brands = ['애플', '구글', '메타', '아마존', '삼성'];
for (const brand in brands ){
  console.log(brand);   // 이렇게 뽑았을 때는 인덱스 넘버가 나옵니다.
  console.log(brands[brand]); // 그래서 이렇게 불편하게 써야 합니다.
}
console.log('이하는 for-of 반복문입니다.');
for (const brand of brands ) {
  console.log(brand); // 이때는 값만 나옵니다.
}

/**
 * for-of문은 Array, Map, String 등 iterable(반복가능객체)에서 사용가능한 반복문에 해당합니다.
 * for-in은 key를 뽑아내기 때문에 보통 JS 객체에서 사용되는 편이고, 일반 배열에서 돌리게 될 경우에는 index 넘버가 추출됩니다.
 * 하지만 for-of를 쓸 경우 value가 그대로 나온다는 차이점이 있습니다.
 */

let language = "JavaScript";
for (const indexNumber in language) {   // in인지
  console.log(indexNumber);
}
for (const letter of language) {        // of인지 구분하시면 됩니다.
  console.log(letter);
}

// 04_while.js