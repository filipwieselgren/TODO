class Todo {
  constructor(todo, deadline) {
    this.todoItem = todo;
    this.deadline = deadline;
    this.done = false;
  }
}

let newTodo = [];
let btnTxt = false;
let date = new Date();
const addTodo = document.getElementById("addTodo");
const inputTodo = document.getElementById("inputTodo");
const inputDate = document.getElementById("datepicker");
const spanDate = document.getElementById("spanDate");
const listTodo = document.getElementById("listTodo");
const setDeadLine = document.querySelector(".btnDeadline");

const dateID = document.getElementById("date");
const arrowUp = document.querySelector(".arrowUpContainer");
const arrowDown = document.querySelector(".arrowDownContainer");

window.onload = function () {
  start();
};

if (localStorage.getItem("newTodo") != null) {
  let localStorageArray = localStorage.getItem("newTodo");

  newTodo = JSON.parse(localStorageArray);
} else {
}

//setDeadLine.placeholder = "Set a deadline";
// flatpickr(inputDate, {
//   enableTime: true,
//   dateFormat: "Y-m-d H:i",
// });

function start() {
  addTodo.addEventListener("click", addTodoBtn);
  createHtml();
}

jQuery(function ($) {
  $("#datepicker").datetimepicker();
});

setDeadLine.addEventListener("click", (event) => {
  event.preventDefault();

  btnTxt = !btnTxt;

  setBtnTxt();
});

function setBtnTxt() {
  if (btnTxt === false) {
    setDeadLine.innerHTML = "Set deadline ";
  } else {
    setDeadLine.innerHTML = "Close";
  }
}

function addTodoBtn(event) {
  event.preventDefault();
  console.log("inputDate:", inputDate.value);
  let dateDeadline = inputDate.value;
  // dateDeadline = dateDeadline.replace("T", " ");
  let todoItem = new Todo(inputTodo.value, dateDeadline);

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
    const todoSpan = document.createElement("div");
    const todoDeadline = document.createElement("div");
    const todoItemContainer = document.createElement("div");
    const todaysDate = new Date();
    const inputD = new Date(newTodo[i].deadline);
    const tomorrow = new Date(todaysDate);
    const yesterday = new Date(todaysDate);

    tomorrow.setDate(tomorrow.getDate() + 1);
    yesterday.setDate(yesterday.getDate() - 1);

    todoSpan.innerText = newTodo[i].todoItem;

    // todoDeadline.innerText = `Deadline: ${newTodo[i].deadline} `;
    todoDeadline.innerText =
      inputD.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)
        ? `Deadline: Today at ${newTodo[i].deadline.split(" ")[1]}`
        : inputD == "Invalid Date"
        ? "No deadline"
        : inputD.setHours(0, 0, 0, 0) == tomorrow.setHours(0, 0, 0, 0)
        ? `Deadline: Tomorrow at ${newTodo[i].deadline.split(" ")[1]}`
        : inputD.setHours(0, 0, 0, 0) <= yesterday.setHours(0, 0, 0, 0)
        ? `Deadline: The deadline has passed`
        : `Deadline: ${newTodo[i].deadline} `;
    todoSpan.classList.add("todoSpan");
    todoDeadline.classList.add("todoDeadline");
    todoItemContainer.classList.add("todoItemContainer");
    todoLi.appendChild(todoItemContainer);
    todoItemContainer.appendChild(todoSpan);
    todoItemContainer.appendChild(todoDeadline);

    const btnDone = document.createElement("button");
    btnDone.classList.add("btnDone");
    btnDone.innerHTML = "<i class='fas fa-check'></i>";
    btnDone.addEventListener("click", (e) => {
      done(e, i);
    });
    todoLi.appendChild(btnDone);

    const btnTrash = document.createElement("button");
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

  inputDate.value = "";
  inputTodo.value = "";
}

function remove(e, i) {
  newTodo.splice(i, 1);
  createHtml();
}

function done(e, i) {
  console.log("klick 1");
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

function sortNoDeadline() {
  let noDeadline = newTodo.filter((n) => {
    return n.deadline === "";
  });
  let deadline = newTodo.filter((n) => {
    return n.deadline !== "";
  });

  return (newTodo = deadline.concat(noDeadline));
}

arrowUp.addEventListener("click", () => {
  newTodo = sortNoDeadline();
  newTodo.sort((a, b) => {
    return Date.parse(a.deadline) - Date.parse(b.deadline);
  });

  createHtml();
});

arrowDown.addEventListener("click", () => {
  newTodo = sortNoDeadline();

  newTodo.sort((a, b) => {
    return Date.parse(b.deadline) - Date.parse(a.deadline);
  });

  createHtml();
});
