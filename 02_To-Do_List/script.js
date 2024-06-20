const inputBox = document.getElementById('input-box')
const listContainer = document.getElementById("list-container")

function addTask() {
    if(inputBox.value === '') {
        alert("Write something!")
    } else {
        let li = document.createElement('li')
        li.innerHTML = inputBox.value
        listContainer.append(li)

        let span = document.createElement("span")
        span.innerHTML = "\u00d7" // x
        li.append(span)

    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener('click', function(element) {
    if(element.target.tagName === 'LI') {
        element.target.classList.toggle("checked")
        saveData();
    } else if(element.target.tagName === 'SPAN') {
        element.target.parentElement.remove()
        saveData()
    }
}, false)

function saveData() {
    localStorage.setItem("data",listContainer.innerHTML) // save tasks
}
function showTasks() {
    listContainer.innerHTML = localStorage.getItem("data") // load save's tasks when reload or open browser
}
showTasks()