// 02_default_function_parameter.js
// 함수 정의
function say(message) {
  if(message != undefined) console.log(message);
  else console.log('매개변수가 넘어오지 않았습니다.');
}

// 함수 호출
say();

/**
 * 이상의 코드에서 함수의 매개변수인 message 값을 전달하지 않으면 message는 undefined가 됩니다. 만약에 이 매개변수가 특정 기능을 구현하기 위해 반드시 값이 필요하다면 매개 변수 값이 비어있을 때는 오류가 발생하게 될겁니다. 그래서 say() 내에 값이 있는지 없는지를 체크하는 로직이 필수적으로 요구됩니다.
 * 
 * default function parameter는 함수 호출 시에 argument가 아예 없다면 미리 등록되어있는 값을 대입해주는 기능이라고 할 수 있습니다.
 */
function say2(message='매개변수가 넘어오지않았습니다2.') {
  console.log(message);
}
say2();
say2('argument에 값을 넣었습니다.');

//03_rest_parameter.js