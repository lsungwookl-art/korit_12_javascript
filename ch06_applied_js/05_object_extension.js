// 05_object_extension.js

let fName = 'Jone';   // 지금 얘는 임의적인 데이터값이고 FE상에서는
let lName = 'Doe';    // 브라우저의 입력을 받게 될 거기 때문에
// 변수의 선언과 값 대입이 반 필수적입니다.

let person = {
  firstName : fName,
  lastName : lName,
};
console.log(fName);
console.log(person.firstName);
console.log(person['firstName']); // key가 string이라는 것을 알 수 있는 예시겠네요.

/**
 * Object 상에서는 변수에 할당된 값을 key로 치환해서 사용하는 것은 불가능합니다.
 * 
 * 하지만 object literal syntax extension을 사용하면 object의 키로 변수에 할당된 '문자열' 값을 사용할 수 있습니다. 대괄호([])를 사용합니다.
 */

let type = 'student';
let score = {
  [type]: 'Jane',
  score: 95,
}

console.log(score.score);

console.log(score); // 결과값 : { student: 'Jane', score: 95 }
console.log(score.student);
/**
 * Object의 key를 동적으로 생성가능할 수 있다는 점 : input 태그를 통해서 객체의 key를 생성할 수 있겠네요.
 * 
 */