// 02_asyncawait.js

// fetch() / async 의 코드상 비교 관련 예시
function myFunction() {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => response.json())
  .then(json => console.log(json))
}
myFunction();
// 이상의 예시는 Get 요청을 해서 서버로부터 응답이 오면 콘솔에 찍는 함수입니다.

/**
 * 그런데 서버로 요청을 보내고 응답을 보낸 후에 응답받은 결과를 바탕으로 다시 서버로 요청을 보낸다고 가정해보겠습니다.
 */

function myFunction2() {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => response.json())
  .then(json => {
    console.log(json);
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "PUT",
      body: JSON.stringify({
        id: 1,
        title: '이제 슬슬 무슨 말하는지 모르겠다',
        body: '그냥 한 숨 잤으면 좋겠다',
        userId: 1,
      }),
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(response => response.json())
    .then(json => console.log(json));
  })
}
myFunction2()
/**
 * 이상의 코드는 결과적으로 GET 요청 이후에 결과값을 가지고 PUT요청을 새로 한 후에 PUT의 결과를 확인할 수 있도록 GET 요청을 다시 날린 형태라고 볼 수 있습니다. 가독성이 떨어집니다.
 * 
 * 하지만 async / await 을 사용하면 좀 더 간결하게 쓸 수 있습니다.
 */

async function myFunction3() {
  const res1 = await fetch("https://jsonplaceholder.typicode.com/posts/2");
  const res1Json = await res1.json();
  console.log(res1Json);
  // 이상은 GET 요청 부분에 해당합니다. async / await을 빼면 일반적인 JavaScript처럼 함수 실행하고 결과값을 변수에 담는 것처럼 보입니다.
  // 이런 형식을 보고 비동기적 코드를 동기적인 방식으로 작성한다고 표현합니다.

  const res2 = await fetch("https://jsonplaceholder.typicode.com/posts/2", {
    method: 'PUT',
    body: JSON.stringify({
      id: 2,
      title: '아 공부가 즐겁다',
      body: '계속하고 싶다 수업 계속 하고 싶다 진짜 하고 싶다 ',
      userId: 1,
    }),
    headers: {
      'content-type': 'application/json; charset=UTF-8',
    },
  });
  const res2Json = await res2.json();
  console.log(res2Json);
}
myFunction3()