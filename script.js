// Key for local Storage
const storageKey = "todoStorage";


// Header - display todays date
const dateElement = document.getElementById("date");
const dateOptions = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", dateOptions);

// Helper functions
const convertStringToObj = (str) => JSON.parse(str) || []; // aways return an array
const convertObjToString = (obj) => JSON.stringify(obj) || ''; // always return a string

// Click listeners
const initClickListeners = () => {

  // Get the ToDo Items
  let items = Array.from(document.getElementsByClassName("list-group-item"));

  // Loop and add a click event listener to them
  items.forEach(item => {
    item.addEventListener("click", (_event) => {
      let todo = _event.target.innerText;

      // Confirm if ToDo is finished
      if (window.confirm("Have you completed: " + todo)) {
        // Completed todo - delete todo and redo display
        deleteToDo(todo);
        displayToDos();
      }
    });

  });

}

// ToDo basic functions
const getToDos = () => convertStringToObj(localStorage.getItem(storageKey)); // returns an array from the local storage
const addTodo = (todo) => localStorage.setItem(storageKey, convertObjToString([...getToDos(), todo]));
const deleteToDo = (todo) => localStorage.setItem(storageKey, convertObjToString(getToDos().filter(_todo => _todo !== todo)));

// ToDo Display
const buildTodoElement = (todo) => {
  // Create a list item element
  let element = document.createElement("li");

  // Give it a class
  element.classList.add("list-group-item");

  // Give it text
  element.innerText = todo;

  // Return the built element
  return element;
}

const appendListToDOM = (element) => {
  document.getElementById("todo-list-container").appendChild(element);
}
const clearToDoListDisplay = () => {
  document.getElementById("todo-list-container").innerHTML = "";
}

const clearInputBox = () => {
  document.getElementById("new-todo-input").value = "";
}

const displayToDos = () => {
  clearInputBox();
  clearToDoListDisplay();

  // Get the ToDos
  getToDos().forEach(_todo => {
    // Build the elements
    appendListToDOM(buildTodoElement(_todo));
  });

  initClickListeners();
}
// Re-display ToDos on refresh
document.addEventListener("DOMContentLoaded", () => displayToDos());

// Submit Todo - button click
document.getElementById("new-todo-submitbtn").addEventListener("click", (_event) => {
  const newToDoInput = document.getElementById("new-todo-input");

  // Check if the value is there
  if (newToDoInput.value) {
    submitToDo();
  }
});

// Submit Todo - input box on pressing enter key
document.getElementById("new-todo-input").addEventListener("keydown", (_event) => {
  if (_event.code === 'Enter') { // 13 = enter
    submitToDo();
  }
});

const submitToDo = () => {
  const newToDoInput = document.getElementById("new-todo-input");

  // Check if the value is there
  if (newToDoInput.value) {
    addTodo(newToDoInput.value.trim()); // trim will remove any white space
    displayToDos();// re-display the todos
  }
}


// Clearing Local Storage
/*
document.getElementById("reset-storage-btn").addEventListener("click", (_event) => {
  console.log("Clearing local storage");
  localStorage.removeItem(storageKey);
  displayToDos(); // refresh the screen
});
*/



