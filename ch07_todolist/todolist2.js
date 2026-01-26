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
            li.classList.add('todo-item--completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-item__checkbox';
        checkbox.checked = todo.completed;

        const span = document.createElement('span');
        span.className = 'todo-item__text'; 
        span.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'todo-item__delete'; 
        deleteBtn.innerHTML = '&times;';

        li.append(checkbox, span, deleteBtn);
        todoList.appendChild(li);
        checkbox.addEventListener('change', () => {
            todos[index].completed = checkbox.checked;
            li.classList.toggle('todo-item--completed', checkbox.checked);
            saveTodos();
        });

        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            renderTodos();
            saveTodos();
        });
    });
}

todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});

window.onload = renderTodos;