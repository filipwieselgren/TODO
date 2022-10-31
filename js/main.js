class Todo {
  constructor(todo) {
    this.todoItem = todo;
    this.done = false;
  }
}

let newTodo = [];

window.onload = function () {
  start();
};

if (localStorage.getItem("newTodo") != null) {
  let localStorageArray = localStorage.getItem("newTodo");

  newTodo = JSON.parse(localStorageArray);
} else {
}

let addTodo = document.getElementById("addTodo");
let inputTodo = document.getElementById("inputTodo");
let listTodo = document.getElementById("listTodo");

function start() {
  addTodo.addEventListener("click", addTodoBtn);
  createHtml();
}

function addTodoBtn(event) {
  event.preventDefault();

  let todoItem = new Todo(inputTodo.value);

  newTodo.push(todoItem);

  createHtml();
}

function createHtml() {
  let ul = document.getElementById("listTodo");
  ul.innerHTML = "";

  for (let i = 0; i < newTodo.length; i++) {
    let todoLi = document.createElement("li");
    todoLi.classList.add("todoLi");
    let todoSpan = document.createElement("span");
    todoSpan.innerText = newTodo[i].todoItem;
    todoSpan.classList.add("todoSpan");
    todoLi.appendChild(todoSpan);
    console.log(newTodo[i].todoItem);

    let btnDone = document.createElement("button");
    btnDone.classList.add("btnDone");
    btnDone.innerHTML = "<i class='fas fa-check'></i>";
    btnDone.addEventListener("click", (e) => {
      done(e, i);
    });
    todoLi.appendChild(btnDone);

    let btnTrash = document.createElement("button");
    btnTrash.classList.add("btnTrash");
    btnTrash.innerHTML = "<i class='far fa-trash-alt'></i>";
    btnTrash.addEventListener("click", (e) => {
      remove(e, i);
    });
    todoLi.appendChild(btnTrash);

    ul.appendChild(todoLi);

    if (newTodo[i].done === true) {
      todoLi.classList.add("mystyle");
    }
  }

  localStorage.setItem("newTodo", JSON.stringify(newTodo));

  inputTodo.value = "";
}

function remove(e, i) {
  newTodo.splice(i, 1);
  createHtml();
}

function done(e, i) {
  e.target.parentElement.classList.toggle("mystyle");
  let taskText = e.target.parentElement.firstChild.textContent;
  console.log(taskText);

  let todos = JSON.parse(localStorage.getItem("newTodo"));
  console.log(todos);

  todos.forEach((todo) => {
    if (todo.todoItem === taskText) {
      todo.done = true;
    }
  });
  console.log(todos);

  localStorage.setItem("newTodo", JSON.stringify(todos));
}
