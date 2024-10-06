const questions = [
    {
        question: "What is momentum?",
        choices: [
            "A. Mass times velocity",
            "B. Force times time",
            "C. Energy times distance",
            "D. Mass divided by velocity"
        ],
        correct: "A"
    },
    {
        question: "Which of the following correctly represents the formula for momentum?",
        choices: [
            "A. P = mv",
            "B. F = ma",
            "C. E = mc²",
            "D. v = d/t"
        ],
        correct: "A"
    },
    {
        question: "What happens to the momentum of an object if its mass doubles while its velocity remains constant?",
        choices: [
            "A. It halves",
            "B. It doubles",
            "C. It stays the same",
            "D. It quadruples"
        ],
        correct: "B"
    },
    {
        question: "If two objects collide and stick together, what happens to their total momentum?",
        choices: [
            "A. It is lost",
            "B. It increases",
            "C. It decreases",
            "D. It is conserved"
        ],
        correct: "D"
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
                <p><strong>Question ${index + 1}:</strong> Correct answer is ${question.correct}</p>
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