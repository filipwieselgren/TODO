class Todo {
  constructor(todo, deadline) {
    this.todoItem = todo;
    this.deadline = deadline;
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

const addTodo = document.getElementById("addTodo");
const inputTodo = document.getElementById("inputTodo");
const inputDate = document.getElementById("date");
const listTodo = document.getElementById("listTodo");

inputDate.min = new Date().toISOString().split("T")[0];
var date = new Date();
date.setSeconds(0, 0);
inputDate.value = date;

console.log(inputDate.start);

function start() {
  addTodo.addEventListener("click", addTodoBtn);
  createHtml();
}

let btnTxt = false;
const setDeadLine = document.querySelector(".btnDeadline");

const datePicker = document.querySelector(".datePicker");

setDeadLine.addEventListener("click", (event) => {
  event.preventDefault();
  datePicker.classList.toggle("datePickerShow");
  btnTxt = !btnTxt;

  setBtnTxt();
});

function setBtnTxt() {
  if (btnTxt === false) {
    setDeadLine.innerHTML = "Set deadline ";
    console.log(setDeadLine.innerHTML);
  } else {
    setDeadLine.innerHTML = "Close";
    console.log(setDeadLine.innerHTML);
  }
}

function addTodoBtn(event) {
  event.preventDefault();
  console.log("inputDate:", inputDate);
  let todoItem = new Todo(inputTodo.value, inputDate.value);

  datePicker.classList.remove("datePickerShow");
  btnTxt = false;
  setBtnTxt();

  if (todoItem.todoItem === "") {
    document.getElementById("inputTodo").classList.add("noTodo");
  } else {
    const placeholderTxt = document
      .getElementById("inputTodo")
      .classList.remove("noTodo");

    newTodo.push(todoItem);

    createHtml();
  }
}

function createHtml() {
  const ul = document.getElementById("listTodo");
  ul.innerHTML = "";

  for (let i = 0; i < newTodo.length; i++) {
    const todoLi = document.createElement("li");
    todoLi.classList.add("todoLi");
    let todoSpan = document.createElement("span");
    todoSpan.innerText = `${newTodo[i].todoItem} | Deadline: ${newTodo[i].deadline}`;
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

  let todos = JSON.parse(localStorage.getItem("newTodo"));

  todos.forEach((todo) => {
    if (todo.todoItem === taskText) {
      todo.done = true;
      document.querySelector(".btnDone").style.background = "transparent";
    }
  });

  localStorage.setItem("newTodo", JSON.stringify(todos));
}
