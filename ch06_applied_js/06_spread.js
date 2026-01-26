let arr1 = [ 4, 5, 6 ];
let arr2 = [ 1, 2, 3 ];
let arr3 = [ ...arr2, ...arr1 ];
console.log(arr3);  // 결과값 : [ 1, 2, 3, 4, 5, 6 ]
/*
배열, 문자열과 같이 iteration(반복가능자료형) 형태의 데이터를 element 하나하나로 분해해서 사용이 가능하다.
arr1, 2는 자료형이 배열이죠. -> ...arr1 / ...arr2는요, 자료형이 배열이 아닙니다.
4, 5, 6이라는 각각의 element와 1, 2, 3이라는 각각의 element입니다. 즉 자료형을 착각하기가 너무 쉽습니다.

아까전에 ...args라고 했을 때 spread 연산자가 도입되어있습니다.
*/


let cd = 'CD';
let alphabets = ['A', 'B', ...cd ];   // 그러면 그 와중에 스프레드 연산자의 작성 순서도 중요하네요.
console.log(alphabets);
/**
 * 그럼 alphabets 내부의 element를 소문자로 바꾸고 싶다면 내부로 들어가서 .toLowerCase()를 적용하면 되겠네요.
 */
// 기본 for문
for(let i = 0 ; i < alphabets.length ; i++){
  console.log(alphabets[i].toLowerCase());
}
// 어떤 for문을 쓸것인가 in / of
console.log('향상된 for-of문 사용');
for (let alphabet of alphabets) {
  console.log(alphabet.toLowerCase());
}