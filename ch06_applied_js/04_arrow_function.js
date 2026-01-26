// 04_arrow_function.js

// 함수 선언식(가장 기초적인 함수 정의 방식)
function hello1(name) {
  return `Hello ${name}`;
}
// 함수 표현식(종종 쓰는데 화살표 함수랑 합쳐져서 더 많이 쓰입니다.)
const hello2 = function (name) {
  return `오하요 ${name}`;
}
// 화살표 함수의 정의 방식들 -> 람다식 때도 다양한 방법으로 정의했었습니다.

// 모든 소(중)괄호가 다 표기된 화살표 함수
const hello3 = (name) => {return `안녕하세요 ${name}`};

// 매개변수가 하나일 때는 소괄호 생략
const hello4 = name => {return `또 안녕하세요 ${name}`};

// 실행문이 한 줄일 경우에는 중괄호 생략 / 근데 return문일 경우 return도 생략
const hello5 = name => `또또 안녕하세요 ${name}`;

// 매개변수가 아예 없으면 비어있는 소괄호 사용
const helloEveryone = (name='여러분') => `안녕하세요 ${name}`;