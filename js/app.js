const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
const editMessage = document.getElementById('message-edit')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')
//JSON 
let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : [];

if (todos.length) { showTodos() };

// setItem Todos 
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}
// show todos 
function showTodos() {
    listGroupTodo.innerHTML = "";
    let todo = JSON.parse(localStorage.getItem('list'));
    todo.forEach((element, i) => {
        listGroupTodo.innerHTML += `

        <li ondblclick="setComplited(${i})"
        class=" list-group-item d-flex  align-items-center justify-content-between  ${element.completed == true ? 'completed' : ''}">
          <p class="mb-0">${element.text} </p>
        <div id="todo-icon">
            <span class="opacity-25  ">${element.time}</span>
            <img class="ms-2" onclick="editTodo(${i})" src="./img/edit.svg" alt="edit icon" width="25" height="25"
              data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="./img/delete.svg" onclick="deleteTodo(${i})" alt="delete icon" width="25" height="25">
          </div>
      </li>
    
    `
    });

}

// show error
function setMessage(where) {
    where.textContent = "Please enter some text..."
    setTimeout(() => { where.textContent = "" }, 2500)
}
//time 
function getTime() {
    let now = new Date()
    let day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    let month = now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
    let year = now.getFullYear();
    let seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
    let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
    let hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month_title = now.getMonth()

    hourEl.textContent = hours;
    minuteEl.textContent = minutes;
    secondEl.textContent = seconds;

    fullDay.textContent = `${day} ${months[month_title]} ${year}`
    return `${hours}:${minutes}, ${day}.${month}.${year} `
}

setInterval(getTime, 1000)

//create todo
formCreate.addEventListener('submit', (e) => {
    e.preventDefault();

    let todoText = e.target[0].value.trim();

    if (todoText.length > 0) {
        todos.push({
            id: Date.now(),
            text: e.target[0].value,
            completed: false,
            time: getTime()
        })
        setTodos()
        showTodos()
    } else {
        setMessage(messageCreate)
    }

    e.target.reset();
});

//delete todo 
function deleteTodo(id) {

    todos = todos.filter((item, i) => {
        return i !== id
    })

    setTodos()
    showTodos()
}

//todo complited
function setComplited(id) {
    const completedTodo = todos.map((item, i) => {

        if (id == i) {
            return { ...item, completed: item.completed == true ? false : true }
        } else {
            return { ...item }
        }
    })
    todos = completedTodo;
    setTodos()
    showTodos()
}
let editId;
//edit todo 
function editTodo(id) {
    editId = id;
    const editTodos = todos.filter((item, i) => {
        return id == i
    })
    editTodos

}

formEdit.addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target[0].value.trim()) {
        todos[editId].text = e.target[0].value;
        setTodos()
        showTodos()
    } else {
        setMessage(editMessage)
    }
    e.target.reset();
})

// form edit 


