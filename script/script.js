const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("input");
// const btnSubmit = document.querySelector(".todo-submit");
const todos = document.querySelector(".list-ul");

function init () {
    todoForm.addEventListener("submit", createTodo);
};
init();

function createTodo (e) {
    e.preventDefault();
    const todo = todoInput.value;
    printTodo(todo);
    todoInput.value = "";
};