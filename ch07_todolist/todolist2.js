const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {

    const li = document.createElement('li');

    li.className = 'todo-item';
    if(todo.completed) {
      li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn'; 
    deleteBtn.innerHTML = '&times'; 
    li.append(checkbox);  
    li.append(span);
    li.append(deleteBtn);

    todoList.appendChild(li);

    checkbox.addEventListener('change', () => {
      todos[index].completed = checkbox.checked;
      li.classList.toggle('completed', checkbox.checked);
      saveTodos(); 
    });
    deleteBtn.addEventListener('click', () => {
      const itemText = span.textContent;
      const itemIndex = todos.findIndex(todo => todo.text === itemText);
      if(itemIndex !== -1) {
        todos.splice(itemIndex, 1);
        li.remove();
        saveTodos();
      }
  });
  })
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if(todoText === '') {
    alert('내용을 입력하세요');
    return; 
  }
  const newTodo = {
    text: todoText,
    completed: false,
  }

  todos.push(newTodo);
  todoInput.value = '';
  saveTodos();
  renderTodos();
}

addBtn.addEventListener('click', addTodo);  // 
todoInput.addEventListener('keydown', event => {
  if(event.key === 'Enter') {
    addTodo();
  }
});

window.onload = renderTodos();