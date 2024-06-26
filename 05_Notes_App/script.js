const notesContainer = document.querySelector(".notes-container")
const createBtn = document.querySelector(".btn")
let notes = document.querySelectorAll(".input-box")

// loading saved notes
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes")
}
showNotes()

// save notes in localStorage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML)
}

// STEP 1. Create new window of note
createBtn.addEventListener('click', () => {
    let inputBox = document.createElement("p")
    inputBox.className = "input-box"
    inputBox.setAttribute("contenteditable", "true")

    let img = document.createElement("img")
    img.src = "./img/delete.png"
    notesContainer.appendChild(inputBox).append(img)
})

// STEP 2. Push on free space and write text 
notesContainer.addEventListener('click', function(e) {
    if(e.target.tagName === "IMG"){
        e.target.parentElement.remove()
        updateStorage()
    } else if(e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box")
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage()
            }
        })
        }
    }
)
// STEP 2.1. save correct post, if you use enter, when you write
document.addEventListener("keydown", event => {
    if(event.key === "Enter") {
        document.execCommand("insertLineBreak")
        event.preventDefault()
    }
})








