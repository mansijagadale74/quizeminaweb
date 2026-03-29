let questions = [
    { question: "What is HTML?", answers: ["Programming Language", "Markup Language", "Database"], correct: 1 },
    { question: "Which is used for styling?", answers: ["HTML", "CSS", "Python"], correct: 1 },
    { question: "Which language is used for logic?", answers: ["JavaScript", "CSS", "HTML"], correct: 0 },
    { question: "What does CSS stand for?", answers: ["Creative Style Sheets", "Cascading Style Sheets", "Color Style Sheets"], correct: 1 }
];

let current = 0;
let score = 0;

function loadQuestion() {
    let q = questions[current];
    document.getElementById("question").innerText = q.question;

    let answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((ans, index) => {
        let btn = document.createElement("button");
        btn.innerText = ans;
        btn.classList.add("answer-btn");

        btn.onclick = () => selectAnswer(btn, index);
        answersDiv.appendChild(btn);
    });

    document.getElementById("nextBtn").disabled = true;
}

function selectAnswer(button, index) {
    let correctIndex = questions[current].correct;
    let buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach((btn, i) => {
        btn.disabled = true;

        if (i === correctIndex) {
            btn.innerHTML += " ✔";  // correct tick
            btn.classList.add("correct");
        }
    });

    if (index === correctIndex) {
        button.classList.add("selected");
        score++;
    } else {
        button.innerHTML += " ❌";  // wrong mark
        button.classList.add("wrong", "selected");
        showMessage("❌ Wrong Answer!");
    }

    document.getElementById("nextBtn").disabled = false;
}

function showMessage(msg) {
    let message = document.getElementById("message");
    message.innerText = msg;
}

function nextQuestion() {
    document.getElementById("message").innerText = "";

    current++;
    if (current < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.querySelector(".quiz-container").innerHTML = `
        <h2>Your Score: ${score}/${questions.length}</h2>
        <button onclick="location.reload()">Restart</button>
    `;
}

loadQuestion();