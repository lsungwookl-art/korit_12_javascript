const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 로컬 스토리지에서 데이터 가져오기
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  todoList.innerHTML = '';
  
  todos.forEach((todo, index) => {
    // 1. li 생성 (Block Element)
    const li = document.createElement('li');
    li.className = 'todo-app__item';
    
    // 완료 상태일 때 Modifier 추가
    if (todo.completed) {
      li.classList.add('todo-app__item--completed');
    }

    // 2. 체크박스 생성
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-app__checkbox';
    checkbox.checked = todo.completed;

    // 3. 텍스트 생성
    const span = document.createElement('span');
    span.className = 'todo-app__text';
    span.textContent = todo.text;

    // 4. 삭제 버튼 생성
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'todo-app__delete-button';
    deleteBtn.innerHTML = '🗑️'; // 이모지로 더 귀엽게!

    // 조립하기
    li.append(checkbox, span, deleteBtn);
    todoList.appendChild(li);

    // --- 이벤트 리스너 ---

    // 토글 기능
    checkbox.addEventListener('change', () => {
      todos[index].completed = checkbox.checked;
      li.classList.toggle('todo-app__item--completed', checkbox.checked);
      saveTodos();
    });

    // 삭제 기능 (index를 바로 사용하면 더 정확해!)
    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos(); // 배열이 바뀌었으므로 다시 그림
    });
  });
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === '') {
    alert('할 일을 입력해줘! ✨');
    return;
  }
  
  const newTodo = {
    text: todoText,
    completed: false,
  };

  todos.push(newTodo);
  todoInput.value = '';
  saveTodos();
  renderTodos();
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

// 초기 실행
renderTodos();