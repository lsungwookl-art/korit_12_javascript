let age = 12;
let busFare = 0;

if (age < 7) {
  busFare = 0;
} else if ( age >= 7 && age < 13 ) {
  busFare = 450;
} else if ( age >= 13 && age < 19 ) {
  busFare = 720;
} else if ( age >= 19 && age <= 70) {
  busFare = 1200;
} else if ( age > 70 ) {
  busFare = 0;
}

console.log(busFare + " 원");

// bmi 지수 계산 관련한 부분을 JavaScript로 작성하시오.
let height = 172;
let weight = 68;
height = 172 * 0.01;

let bmi = 0;        // 몸무게를 키(m)의 제곱으로 나눈 값
bmi = weight / height**2;
bmi = bmi.toFixed(2);   // 소수점 둘째 자리까지만 표기하기 위해 number 자료형의 .toFixed() 메서드 호출 -> argument로 정수 입력하면
/*
2 라고 입력한다면 소수점 셋째 자리에서 반올림하여 2째자리까지 표기해줍니다.+
*/ 
console.log(bmi);

let grade = '';

if (bmi < 18.5) grade = '저체중';
else if (bmi < 22.9) grade = '정상';
else if ( bmi < 24.9 ) grade = '비만전단계';
else if ( bmi < 29.9 ) grade = '1단계 비만';
else if ( bmi < 34.9 ) grade = '2단계 비만';
else grade = '3단계 비만';

console.log("당신의 bmi 지수는 " + bmi + "이고 " + grade + "입니다.");

// 02_switch.js