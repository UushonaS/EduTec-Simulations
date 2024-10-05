const questions = [
    {
        question: "What is the speed of sound in air at room temperature?",
        choices: ["A. 123 m/s", "B. 343 m/s", "C. 500 m/s", "D. 700 m/s"],
        correct: "B"
    },
    {
        question: "Which of the following factors does NOT affect the speed of sound?",
        choices: ["A. Temperature", "B. Medium", "C. Frequency", "D. Pressure"],
        correct: "C"
    },
    {
        question: "In which medium does sound travel the fastest?",
        choices: ["A. Air", "B. Water", "C. Steel", "D. Vacuum"],
        correct: "C"
    },
    {
        question: "What happens to the frequency of a sound wave if its wavelength increases?",
        choices: ["A. It decreases", "B. It stays the same", "C. It increases", "D. It disappears"],
        correct: "A"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let isAnswerSelected = false;
let score = 0;

function showQuestion(index) {
    const questionData = questions[index];
    document.getElementById('question').innerText = questionData.question;
    document.getElementById('options').innerHTML = questionData.choices.map((choice, i) =>
        `<button class="choice-button" onclick="selectAnswer('${String.fromCharCode(65 + i)}')">${choice}</button>`
    ).join('');
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('prevButton').style.display = index > 0 ? 'inline-block' : 'none';
    document.getElementById('nextButton').style.display = isAnswerSelected && index < questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('seeAnswersButton').style.display = index === questions.length - 1 ? 'inline-block' : 'none';
}

function selectAnswer(answer) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (answer === correctAnswer) {
        document.getElementById('feedback').innerHTML = `<span class="correct">Correct!</span>`;
        score++;
    } else {
        document.getElementById('feedback').innerHTML = `<span class="incorrect">Incorrect.</span>`;
    }
    userAnswers[currentQuestionIndex] = answer;
    isAnswerSelected = true;
    document.getElementById('nextButton').style.display = 'inline-block';
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        isAnswerSelected = false;
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function showCorrectAnswers() {
    const answersHtml = questions.map((question, index) => {
        return `
            <div>
                <p><strong>Question ${index + 1}:</strong> ${question.correct}</p>
            </div>
        `;
    }).join('');
    document.getElementById('question').innerHTML = `<p><strong>Your Score: ${score} / ${questions.length}</strong></p>`;
    document.getElementById('options').innerHTML = '';
    document.getElementById('feedback').innerHTML = answersHtml;
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('prevButton').style.display = 'none';
    document.getElementById('seeAnswersButton').style.display = 'none';
}

function goBack() {
    window.history.back();
}

showQuestion(currentQuestionIndex);
