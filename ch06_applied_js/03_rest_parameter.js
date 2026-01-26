//03_rest_parameter.js
function sum1(x1, x2) {
  let y = x1 + x2;
  return y;
}

console.log(sum1(5, 7));

function sum2(x1, x2, x3, x4) {
  let y = x1 + x2 + x3 + x4;
  return y;
}

console.log(sum2(5, 7, 1, 3));
/**
 * 일반적인 함수 정의는 매개변수를 몇 개 선언할지 미리 지정해두게 됩니다. 2 개 지정하면 무조건 argument가 두 개 필요하고 4 개 지정하면 4 개의 argument가 필요하겠네요.
 * 즉 정해진 argument를 충족하는 선에서 개발자가 머리 써서 몇 번 호출할지를 고민해야합니다. 범위를 벗어나게 되면 계산 자체가 불가능할 수도 있겠네요.
 * 
 * -> 이상의 문제를 해결하기 위한 것이 Rest Parameter의 개념입니다. 몇 개의 매개변수가 전달될지 모르는 경우에 사용.
 */
function sum3(...args) {  // 매개변수를 이렇게 설정하면, 함수 호출 시 매개변수 개수에 상관없이 할당이 가능하고, 이렇게 지정된 값은 '배열'로 저장됨.
  let total = 0;
  for(let x of args) {
    total += x;
  }
  return total;
}

console.log(sum3(1,2,3,4,5,6,7,8,9,10));
console.log(sum3(1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,));