const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("input");
const todos = document.querySelector(".list-ul");

const TODOLIST = "todoList";
let todoList = [];



function printTodo(todo, isDone) {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const btnDel = document.createElement("button");
    span.innerHTML = todo;
    btnDel.innerHTML = "삭제";
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add('done');
    checkbox.id = isDone;
    if(isDone == 1) {
        checkbox.checked = true;
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnDel);
        li.id = todoList.length + 1;
        li.classList.add('done');
        todos.appendChild(li);
    } else if (isDone == 0) {
        checkbox.checked = false;
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnDel);
        li.id = todoList.length + 1;
        todos.appendChild(li);
    }
    btnDel.addEventListener("click", delTodo);
    checkbox.addEventListener("change", checkTodo)
}

function saveTodoList() {
    localStorage.setItem(TODOLIST, JSON.stringify(todoList));
};

function saveTodo(todo, checked) {
    const todoObj = {
        text: todo,
        id: todoList.length + 1,
        isDone: checked,
    };
    todoList.push(todoObj);
    saveTodoList();
}

function delTodo(e) {
    const {target: button} = e;
    const li = button.parentNode;
    todos.removeChild(li);
    todoList = todoList.filter(todo => todo.id !== Number(li.id));
    saveTodoList();
};

function checkTodo(e) {
    const {target: input} = e;
    const li = input.parentNode;
    if(input.checked) {
        li.classList.add('done');
        todoList.forEach(todo => {
            if(todo.id === Number(li.id)) todo.isDone = 1;
        });
    } else {
        li.classList.remove('done');
        todoList.forEach(todo => {
            if(todo.id === Number(li.id)) todo.isDone = 0;
        });
    }
    saveTodoList();
}

function createTodo(e) {
    e.preventDefault();
    const todo = todoInput.value;
    const checked = 0;
    printTodo(todo, checked);
    saveTodo(todo, checked);
    todoInput.value = "";
};

function loadTodoList() {
    const loadedTodoList = localStorage.getItem(TODOLIST);
    if(loadedTodoList !== null) {
        const parsedTodoList = JSON.parse(loadedTodoList);
        for(let todo of parsedTodoList) {
            const { text } = todo;
            const { isDone } = todo;
            printTodo(text, isDone);
            saveTodo(text, isDone);
        }
    }
};

function init() {
    loadTodoList();
    todoForm.addEventListener("submit", createTodo);
};

init();
