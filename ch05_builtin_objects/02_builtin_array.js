// 1. toString() 생략
// 2. join()
let names = ['김영', '김일', '김이'];
console.log(names.join(' / '));
// 3. pop()
let scores = [100, 90, 80];
let lastScore = scores.pop(); // 배열 내에서 맨마지막 index의 값을 삭제하고 그 값을 return
console.log(scores);      // 결과값 : [ 100, 90 ]
console.log(lastScore);  // 결과값 : 80
// 4. push()
scores.push(70);      
console.log(scores);  // 결과값 : [ 100, 90, 70 ]
// 5. shift()
let firstScore = scores.shift();  // 첫 번째 element를 삭제하고 그 값을 return
console.log(scores);    // 결과값 : [ 90, 70 ]
console.log(firstScore); // 결과값 : 100
// 6. unshift()
let newIndex = scores.unshift(4.5); // 0 번지에 새 element 추가하고 +1 된 새로운 length를 return
console.log(scores);    // 결과값 : [ 4.5, 90, 70 ]
console.log(newIndex);  // 결과값 : 3
// 7. 배열 요소 변경
scores[2] = 'A+';
console.log(scores);  // 결과값 : [ 4.5, 90, 'A+' ]
// 8. splice()
scores.splice(1, 0, 'B+', '100점', 4.0);  // 1번지에 아무것도 삭제하지 않고(0), 'B+', '100점', 4.0이라는 3 개의 element를 scores 배열에 추가한다는 의미.
console.log(scores);  // 결과값 : [ 4.5, 'B+', '100점', 4, 90, 'A+' ]
// 9. concat()
let veges = ['토마토', '수박', '샐러리'];
let meats = ['닭고기', '소고기', '양고기'];
let fruits = ['사과', '딸기', '망고' ];
let newFoods = veges.concat(meats, fruits);
console.log(newFoods);
/**
 * [
  '토마토', '수박',
  '샐러리', '닭고기',
  '소고기', '양고기',
  '사과',   '딸기',
  '망고'
]
 */
// 12. filter()
let words = [ 'spray', 'limit', 'elite', 'extraordinary', 'destruction', 'present' ];
let result = words.filter(function(word) {
  return word.length > 6;
} )
console.log(result);  // 결과값 : [ 'extraordinary', 'destruction', 'present' ]

/*
  이번 예시는 배열 내에 객체가 있는데, 걔의 point가 80점 초과인 애들만 모아서 가져올겁니다.
*/
let persons = [
  {
    name: '김영',
    point: 78,
    city: '서울',
  },
  {
    name: '김일',
    point: 98,
    city: '서울',
  },
  {
    name: '김이',
    point: 76,
    city: '제주',
  },
  {
    name: '김삼',
    point: 81,
    city: '부산',
  },
];

let personResult = persons.filter(function(person) {
  return person.point > 80;
})
console.log(personResult);
/**
 * [
  { name: '김일', point: 98, city: '서울' },
  { name: '김삼', point: 81, city: '부산' }
]
 * 
 */

// 13. map()
let userList = [
  {
    fName: '영',
    lName: '김',
    email: 'b@test.com',
  },
  {
    fName: '일',
    lName: '김',
    email: 'c@test.com',
  },
  {
    fName: '이',
    lName: '김',
    email: 'd@test.com',
  },
  {
    fName: '삼',
    lName: '김',
    email: 'e@test.com',
  },
  {
    fName: '사',
    lName: '김',
    email: 'f@test.com',
  },
];

let modifiedUSerList = userList.map(function(user){
  return {
    fullName: user.lName + user.fName,
    lName: user.lName,
    fName: user.fName,
    email: user.email,
  };
})
console.log(modifiedUSerList);
console.log(userList);
/**
 * [
  { fullName: '김영', lName: '김', fName: '영', email: 'b@test.com' },
  { fullName: '김일', lName: '김', fName: '일', email: 'c@test.com' },
  { fullName: '김이', lName: '김', fName: '이', email: 'd@test.com' },
  { fullName: '김삼', lName: '김', fName: '삼', email: 'e@test.com' },
  { fullName: '김사', lName: '김', fName: '사', email: 'f@test.com' }
]

 */