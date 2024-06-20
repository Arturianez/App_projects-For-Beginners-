const questions = [
    {
        question: "How many countries on the planet?", 
        answers: [
            {text: 160, correct: false},
            {text: 193, correct: true},
            {text: 220, correct: false},
            {text: 138, correct: false},
        ]
    },
    {
        question: "The highest mountain?", 
        answers: [
            {text: "Fuji", correct: false},
            {text: "K2", correct: false},
            {text: "Denali", correct: false},
            {text: "Everest", correct: true},
        ]
    },
    {
        question: "Sacred animal of ancient Egypt?", 
        answers: [
            {text: "Dog", correct: false},
            {text: "Cat", correct: true},
            {text: "Elephant", correct: false},
            {text: "Snake", correct: false},
        ]
    },
    {
        question: "How many continents??", 
        answers: [
            {text: 4, correct: false},
            {text: 5, correct: false},
            {text: 6, correct: false},
            {text: 7, correct: true},
        ]
    }
];

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0


// STEP 1. Turn on Test and start of score
function startTest() { 
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}


// STEP 2. Count index of questions, 
function showQuestion() {  
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)

        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
    })
}

// STEP 2.1. Hidden button "Next", clears previous actions(choose answers)
function resetState() {
    nextButton.style.display = "none"
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


// STEP 3. Select answer, change colors answers and block wrong answers
function selectAnswer(e) {
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === 'true'
    if(isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    })
    nextButton.style.display = "block"

}


// STEP 5. Finally result of test and show score
function showScore() {
    resetState()
    questionElement.innerHTML = `You have ${score} right answer of ${questions.length}.`
    nextButton.innerHTML = 'Try Again'
    nextButton.style.display = "block"
}


// STEP 4(repeat n-questions times). Turn on next question or show result after all questions
function handleNextButton() {
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}


// STEP 3.1. Button change questions, next page(next question) and finally restart test
nextButton.addEventListener('click', function() {
    if(currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startTest()
    }
})

startTest()