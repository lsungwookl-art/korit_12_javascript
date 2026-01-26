// 빈 객체 생성
let person = new Object();
// 멤버 설정
person.fName = '영';
person.lName = '김';
person.age = 20;
person.getFullName = function() {
  return this.lName + ' ' + this.fName;
}
console.log(person.getFullName());    // 결과값 : 김 영

let strExample = '안녕하세요, 제 이름은 김일입니다. My Name is Kim1. My age is 20 years old.';
let indexNum = strExample.indexOf('My');
console.log(indexNum);      // 결과값 : 20

/**
 * 실무 사용 사례
 * 전화번호 입력 받을 때 - 없어야 하면 걸러내야하기 때문에 '010-1234-5678'이라는 string 값(number라면 010이 불가능합니다)에 .indexOf('-')를 확인하여 -1이 return되면 다음 단계로, 3번지가 출력된다면 '-'을 제거하는 메서드로 넘길 수 있습니다.
 */
let lastIndexNum = strExample.lastIndexOf('My');
console.log(lastIndexNum);      // 결과값 : 37
/**
 * lastIndexOf()는 argument로 들어간 문자열이 둘 이상 반복되는 경우 마지막에 발견된 문자열을 리턴합니다.
 */

let strFruits = 'Apple, Banana, Kiwi';
let banana = strFruits.slice(7,13);
console.log(banana); // slice(시작값, 한계값); 입니다. 한계값 미만까지 출력됩니다.
let slicedFruits = strFruits.slice(7);  // 이러면 7번지부터 끝까지
console.log(slicedFruits);  // 결과값 : Banana, Kiwi
// python에서는 마이너스인덱스가 있기는 한데, JS에서는 없습니다. 하지만 slice()의 argument로 마이너스값을 넣어줄 수는 있습니다.
console.log(strFruits.slice(-12));  // 결과값 : Banana, Kiwi
/*
시작점이 -12번지고 그 다음이 -11, -10, ...-1(즉 끝)까지 추출하는 메서드였습니다.
근데 -1하니까 i가 짤리는데 이거 좀 나중에 처리하겠습니다.
*/
console.log(strFruits.substring(7, 13));  // 결과값 : Banana
/*
  그러면 substring() / slice()가 동일한 기능을하는 것 같이 보이는데, substring()은 음수값을 허용하지 않습니다.

*/
console.log(strFruits.substr(7, 6));  // 결과값 : Banana
/**
 * 얘는 7번지부터 6개의 문자 뽑아내겠다는 겁니다. B부터 시작해서 anana하면 전체 6개의 문자
 */

let welcomeSentence = 'Please visit Seoul and Seoul';
let modifiedSentence = welcomeSentence.replace('Seoul', 'Jeju');
console.log(modifiedSentence);  // 결과값 : Please visit Jeju and Seoul
/*
 argument와 일치하는 문자열 중 처음 발견된 것을 두 번째 argument로 대체함.
*/
let modifiedSentence2 = welcomeSentence.replace('SEOUL', 'Jeju');
console.log(modifiedSentence2); // 결과값 : Please visit Seoul and Seoul
let modifiedSentence3 = welcomeSentence.replace(/SEOUL/i, 'Jeju');
console.log(modifiedSentence3); // 결과값 : Please visit Jeju and Seoul
// SEOUL은 찾고자하는 문자열 i는 insensitive의 약자로 덜까다롭게 굴겠다는겁니다.
let modifiedSentence4 = welcomeSentence.replace(/Seoul/g, 'Jeju');
console.log(modifiedSentence4); // 결과값 : Please visit Jeju and Jeju
// /g는 처음 문자열이 아니라 일치하는 모든 문자열을 찾는다는 의미
// toUpperCase() / toLowerCase()

let text1 = "Hello";
let text2 = "World";
let text3 = text1.concat(' ', text2);
console.log(text3);
// concat()은 2 개 이상의 문자열을 하나로 합치는 함수
/**
 * 한국에서는 성이랑 이름 붙여서 쓰니까 별 문제가 없는데 영어권 애들은 이름 + 미들네임 + 성 이런식으로 공백이 포함되어있습니다.
 */
let fName = 'Jone';
let mName = 'Coffee';
let lName = 'Doe';
let fullName = fName.concat(' ', mName, ' ', lName);
console.log(fullName);
// .trim() - 공백 삭제 - 문자열의 앞 뒤 공백
let noSpaceName = '                Jane Moca Doe                       ';
console.log(noSpaceName);
noSpaceName = noSpaceName.trim();
console.log(noSpaceName);
// split() - slice()와 비슷한 기능이지만 return 자료형이 다릅니다.
let birthday = '1988-07-09';
let birtdayResult = birthday.split('-');
console.log(birtdayResult); // 결과값 : [ '1988', '07', '09' ]
/**
 * 즉 .split()의 결과값의 자료형은 Array에 해당됩니다. 즉 argument로 넣은 '-'를 만날 때마다 배열의 element로 집어넣는다고 볼 수 있습니다.
 * 02_builtin_nuber.js
 */