class Todo {
  constructor(todo, deadline) {
    this.todoItem = todo;
    this.deadline = deadline;
    this.done = false;
  }
}

let newTodo = [];
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
  getFromLocal();
};

let localStorageArray;
function getFromLocal() {
  if (localStorage.getItem("newTodo") != null) {
    localStorageArray = localStorage.getItem("newTodo");

    newTodo = JSON.parse(localStorageArray);
  } else {
  }
}

if (localStorage.getItem("newTodo") != null) {
  localStorageArray = localStorage.getItem("newTodo");

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
  $("#datepicker").datetimepicker({
    controlType: "select",
    oneLine: true,
    timeFormat: "hh:mm tt",
  });

  $("#ui-datepicker-div").css("display", "block");
});

jQuery(function ($) {
  $("#ui-datepicker-div").css("display", "block");
});

$(document).bind("mobileinit", function (event) {
  $.extend($.mobile.zoom, { locked: false, enabled: true });
});

function addTodoBtn(event) {
  event.preventDefault();

  let dateDeadline = inputDate.value;

  let todoItem = new Todo(inputTodo.value, dateDeadline);

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

  let doneTodos = newTodo.filter((n) => n.done == true);
  let notDoneTodos = newTodo.filter((n) => n.done == false);

  newTodo = notDoneTodos.concat(doneTodos);

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

    todoSpan.innerText = `${newTodo[i].todoItem} `;

    const dead = newTodo.map((n) => n.deadline);

    const splitDead = dead.toString().split(" ");
    const amOrPM = splitDead.find((s) => s === "pm") ? "pm" : "am";
    const pm = splitDead.find((s) => s === "pm") ? "pm" : "";
    // todoDeadline.innerText = `Deadline: ${newTodo[i].deadline} `;
    todoDeadline.innerText =
      inputD.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)
        ? `Deadline: Today at ${newTodo[i].deadline.split(" ")[1]} ${amOrPM}`
        : inputD == "Invalid Date"
        ? "Deadline: Have none"
        : inputD.setHours(0, 0, 0, 0) == tomorrow.setHours(0, 0, 0, 0)
        ? `Deadline: Tomorrow at ${newTodo[i].deadline.split(" ")[1]} ${amOrPM}`
        : inputD.setHours(0, 0, 0, 0) <= yesterday.setHours(0, 0, 0, 0)
        ? `Deadline: The deadline has passed`
        : `Deadline: ${newTodo[i].deadline}`;
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
  e.target.parentElement.classList.toggle("mystyle");
  let taskText = e.target.parentElement.firstChild.textContent;
  let splitTaskText = taskText.split(" ");

  let index = splitTaskText.findIndex((s) => s == "Deadline:");

  taskText = splitTaskText.slice(0, index);

  let todos = JSON.parse(localStorage.getItem("newTodo"));

  todos.forEach((todo) => {
    if (todo.todoItem === taskText.join(" ")) {
      todo.done = true;
      document.querySelector(".btnDone").style.background = "transparent";
    }
  });

  localStorage.setItem("newTodo", JSON.stringify(todos));
  getFromLocal();
  createHtml();
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
