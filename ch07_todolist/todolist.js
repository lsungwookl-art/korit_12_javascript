const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
// 메서드의 결과값을 변수에 대입했습니다.
/**
 * 이상의 코드들에서 중요한 것은 document가 html 문서의 영역들을 나타내는 거라고 했습니다.
 * document.write('내용'); 쓰면 내용이 나왔었습니다.
 * .getElementById(argument); 태그들 중 특정 argument를 가지는 html 요소를 JavaScript의 객체명으로 불러낼 수 있다는 것을 의미합니다.
 */
// 처음 페이지에 들어갔을 때 localStorage에 저장된 기존의 todo가 있는지 확인하겠습니다.
// 그러면 이하의 코드가 현재 localStorage에 todos key를 가지고 있으면 오류가 안나겠지만, 맨 처음에 아무것도 없다면 오류가 발생할겁니다.
let todos = JSON.parse(localStorage.getItem('todos')) || [];
console.log(todos);

// todos 키가 있으면 그 value를 todos 변수에 넣고, 없으면 빈 배열을 todos 변수에 넣겠다는 의미.
/**
 * 배열로 한 건 임의적으로 한겁니다. todo들이 여러개 있으니까 일단 배열로 잡았습니다. 그렇다면 내부 element의 자료형은 무엇이 되는게 가장 적절할까요. 현재 제가 브리핑한 방식으로는 true/false를 감지할 수 있어야하고, todo 내용이 string으로 표시되어야하니 적어도 boolean과 string이 있는 JS 객체가 element가 되어야할 것 같습니다.
 */
/**
 * 근데 이상의 코드는 기본적으로 js에서만 움직이지 html에서 보이는게 없습니다. 그래서 JavaScript 배열인 todos를 HTML로 그려내는 과정이 필요할 것 같습니다.
 */

function renderTodos() {
  // 기존 todo list를 초기화 -> 추가했을 때 누적 안되게 할겁니다. 추후 보여드릴겁니다.
  todoList.innerHTML = '';    // todos가 아니라 todoList입니다. 둘 차이 확인하셔야 합니다. -> todos는 localStorage 내부의 value에 해당.
  // todoList는 ul 태그가 포함된 HTML element에 해당.

  // todos를 반복 돌려가지고 html 요소로 만들어줄 겁니다.
  todos.forEach((todo, index) => {
    /**
     * todos의 반복을 돌면 내부 element가 존재할겁니다.
     */
    // 이건 그냥 li 태그를 만들겠다는 의미입니다.
    const li = document.createElement('li');
    // 태그만 만들었지 css 적용시키려면 클래스 이름을 정하는게 좋겠네요.
    li.className = 'todo-item'; // field 값 대입하는 방식입니다.
    if(todo.completed) {
      /**
       * localStorage의 todos key의 내부를 확인하면 배열로 저장이 되어있을겁니다. 거기의 element는 객체인데, 내부에 completed key를 가지는 boolean 자료형이 있을겁니다(체크박스로 통제할거고). 걔가 true일때의 css와 false일때의 css를 별개로 나누기 위해, true라면 이하처럼 completed라는 class를 추가해줬습니다.
       */
      li.classList.add('completed');
    }
    // li태그를 만들긴 했는데 li 태그 내부에도 저희 특정 html 요소를 집어넣기로 했었습니다.
    const checkbox = document.createElement('input');
    // 그냥 생성하면 type=text였으니까
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;//아직 저희 반복문내부에있습니다.

    // 텍스트 생성해야하는데, checkbox랑 같은 줄에 있어야하니까 span태그를 쓰겠습니다.
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text; // 지금 completed와 text라는 key를 가지겠네요. 

    // 삭제 버튼 - button 태그
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn'; // todo 하나마다 있어야하기 때문에 반복문 내에 있습니다. add-btn과의 차이점을 꼭 학습하세요.
    deleteBtn.innerHTML = '&times'; // x 기호에 해당합니다.

    // 위에서 만든 checkbox / span / button을 li 변수에 추가해야합니다.
    li.append(checkbox);  // li 태그 내에 checkbox를 추가하는 겁니다.
    li.append(span);
    li.append(deleteBtn);

    todoList.appendChild(li);

    // 체크박스 버튼 눌렀을 때 todo.completed의 값이 true->false / false->true로 변경이 일어나야 합니다.
    checkbox.addEventListener('change', () => {
      todos[index].completed = checkbox.checked;
      // 완료 상태가 됐을 때 CSS를 서로 다르게 적용할겁니다.
      li.classList.toggle('completed', checkbox.checked);
      saveTodos();  // 아직 정의안했습니다. true-false로 toggle이 일어나면 그 상태를 저장할 함수가 필요해보여서 지금 만들겠다고 결정했습니다.
    });
    // 삭제 버튼 클릭 이벤트
    deleteBtn.addEventListener('click', () => {
      const itemText = span.textContent;
  
      const itemIndex = todos.findIndex(todo => todo.text === itemText);
      // 이제 인덱스가 일치하는 거 삭제할겁니다.
      if(itemIndex !== -1) {  // 일치하는 인덱스가 없으면 -1이라서
        todos.splice(itemIndex, 1); // splice() 복습해야겠죠.
        // 이상의 코드는 배열에서 특정 element인 객체를 삭제하는겁니다.
        // li 태그랑은 상관이 없기 때문에 추가로 삭제가 필요합니다.
        li.remove();
        // 지우기만 하고 브라우저에 반영 안되면 안되니까
        saveTodos();
      }
  });



  })
}

function saveTodos() {
  // 아까 체크박스 변동 일어났을 때 상태 저장하는 함수였습니다.
  // -> 어디에? localStorage
  localStorage.setItem('todos', JSON.stringify(todos));
  // 1 번 매개변수 - key 이름 / 2 번 매개변수 - value를 집어넣습니다.
  // localStorage에는 string 밖에 못들어가니까 JSON.stringify를 통해서
  // 배열을 string으로 바꿔줘서 저장
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if(todoText === '') {
    alert('내용을 입력하세요');
    return;       // 메서드를 종료시킨다는 의미
  }
  const newTodo = {
    text: todoText,
    completed: false,   // 초기 생성시에 false로 고정한다는 의미입니다.
  }

  // 위에서 생성된 newTodo 객체는 todos의 element가 되어야합니다.
  todos.push(newTodo);
  // 추가한 이후에 input 태그 내에 작성된 text를 날려야합니다.(주석처리해보세요)
  todoInput.value = '';
  // renderTodos();  // 추가 버튼 누르고 나면 localStorage에 추가된 배열을 가지고 와야 합니다.
  saveTodos();  // 저장도 해야합니다.
  renderTodos();
}
// 이상의 부분이 todo list에 사용되는 함수들을 정의한거라고 볼 수 있습니다.
// 그런데 특정 행위가 일어났을 때 이 함수들이 호출되어야 합니다.

// 추가 버튼을 눌렀을 때 addTodo() 함수가 호출되도록 정의할 예정.
// 버튼 태그에 딸려있는 메서드를 써야합니다(사실상 매번 이루어지는 방식)
addBtn.addEventListener('click', addTodo);  // 근데 addTodo()가 아니라 addTodo입니다. addTodo()는 함수의 결과값이 들어간 거고, addTodo는 함수 자체를 넣은겁니다.

// 엔터키 입력 이벤트
todoInput.addEventListener('keydown', event => {
  if(event.key === 'Enter') {
    addTodo();
  }
});


// 새로고침 했을 때, 혹은 페이지 들어갔을 때 renderTodos()가 일단 한 번 호출이 되어야 할 것 같습니다.
window.onload = renderTodos();