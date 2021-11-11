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

/*------IDn FRÅN INDEX.HTML ------*/
let addTodo = document.getElementById("addTodo");
let inputTodo = document.getElementById("inputTodo");
let listTodo = document.getElementById("listTodo");

/*-----ADD TASK FUNCTION-------*/

function start() {
  //lyssnar efter ett klick på ADD TASK-knappen
  addTodo.addEventListener("click", addTodoBtn);
  createHtml();
}

function addTodoBtn(event) {
  // Stoppar form från submitting
  event.preventDefault();

  let todoItem = new Todo(inputTodo.value);

  // lägger till värdet från input i arrayn newTodo
  newTodo.push(todoItem);
  console.log(newTodo);
  createHtml();
}

function createHtml() {
  // Skapar en div-behållare och en class för min lista
  let ul = document.getElementById("listTodo");
  ul.innerHTML = "";

  for (let i = 0; i < newTodo.length; i++) {
    let todoLi = document.createElement("li");
    todoLi.classList.add("todoLi");
    let todoSpan = document.createElement("span");
    todoSpan.innerText = newTodo[i].todoItem;
    todoSpan.classList.add("todoSpan");
    todoLi.appendChild(todoSpan);

    // Knappen för att markera att man är klar med ett task
    let btnDone = document.createElement("button");
    btnDone.classList.add("btnDone");
    btnDone.innerHTML = "<i class='fas fa-check'></i>";
    btnDone.addEventListener("click", (e) => {
      done(e, i);
    });
    todoLi.appendChild(btnDone);
    // Knappen för att kasta ett task
    let btnTrash = document.createElement("button");
    btnTrash.classList.add("btnTrash");
    btnTrash.innerHTML = "<i class='far fa-trash-alt'></i>";
    btnTrash.addEventListener("click", (e) => {
      remove(e, i);
    });
    todoLi.appendChild(btnTrash);
    // Lägger till min todoLi in min todoContainer
    ul.appendChild(todoLi);

    if (newTodo[i].done === true) {
      todoLi.classList.add("mystyle");
    }
  }

  localStorage.setItem("newTodo", JSON.stringify(newTodo));

  //Rensa inputTodo value
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
  // update the todo object in localStorage
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
