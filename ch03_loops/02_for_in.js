let person = { lName: '김', fName: '영', age: 20, score: 4.5, }
// for-in 구문 형식
/**
 * for (const 변수명 in 반복가능객체) {
 *  반복실행문
 * }
 */
for (const key in person ) {
  console.log(key);   // 객체에 대고 for-in 돌리면 key값이 나옴.
}
/**
 * 그러면 value값을 뽑아내고 싶으면 어떡해야 하는가
 */
for (const key in person) {
  console.log(person.key);
}
/**
 * 이상의 코드가 불가능합니다. 왜냐하면 person의 key는 lName / fName / age / score가 있지 person.key라고하는 속성은 없으니까요.
 */
for (const key in person) {
  console.log(person[key]);
}
/**
 * 그래서 이상의 코드만 가능합니다. key가 변수로 선언되어 있고 거기의 값에 반복문 시점 마다 'lName'이라는 string 자료형이 들어가있기 때문에 person[key]로는 value의 호출이 가능합니다.
 */