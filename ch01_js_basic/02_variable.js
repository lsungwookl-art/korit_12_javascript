// 02_variable.js 생성
// 변수 선언 및 초기화
var x = 5;
var y = 6;
var z = x + y;
console.log(z);

var x = 7;
z = x + y;
console.log(z);

console.log(a);     // 얘가 오류가 안뜹니다
var a = '안녕하세요';
console.log(a);

/*
12번 라인에서 선언되지도 않은 a 라는 변수를 cosole에 찍을 것을 요구했음에도 오류 로그가 뜨지 않고 a 변수에 저장된 값이 undefined라고만 이야기해줍니다.

*/ 

// 03_let_variable.js