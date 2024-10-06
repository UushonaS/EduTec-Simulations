const questions = [
    {
        question: "What is electrolysis?",
        choices: ["A. A chemical reaction", "B. The process of conducting electricity through a solution", "C. The splitting of a compound using heat", "D. The process of rusting"],
        correct: "B"
    },
    {
        question: "Which of the following is a common electrolyte used in electrolysis?",
        choices: ["A. Sodium chloride solution", "B. Distilled water", "C. Alcohol", "D. Sugar solution"],
        correct: "A"
    },
    {
        question: "What is produced at the cathode during the electrolysis of water?",
        choices: ["A. Oxygen", "B. Hydrogen", "C. Chlorine", "D. Carbon dioxide"],
        correct: "B"
    },
    {
        question: "What charge do ions have when attracted to the cathode?",
        choices: ["A. Positive", "B. Negative", "C. Neutral", "D. None of the above"],
        correct: "A"
    },
    {
        question: "Which type of ions are attracted to the anode during electrolysis?",
        choices: ["A. Cations", "B. Anions", "C. Electrons", "D. Neutrons"],
        correct: "B"
    },
    {
        question: "Which gas is produced at the anode during the electrolysis of water?",
        choices: ["A. Oxygen", "B. Hydrogen", "C. Nitrogen", "D. Carbon dioxide"],
        correct: "A"
    },
    {
        question: "What is the purpose of the electrolyte in electrolysis?",
        choices: ["A. To conduct electricity", "B. To dissolve the electrodes", "C. To prevent current flow", "D. To reduce heat"],
        correct: "A"
    },
    {
        question: "In electroplating, which object is connected to the cathode?",
        choices: ["A. The object to be plated", "B. The plating metal", "C. A salt solution", "D. Water"],
        correct: "A"
    },
    {
        question: "Which of these is NOT a product of electrolysis?",
        choices: ["A. Pure metals", "B. Hydrogen gas", "C. Salt", "D. Oxygen gas"],
        correct: "C"
    },
    {
        question: "What is the primary requirement for electrolysis to occur?",
        choices: ["A. Heat", "B. Magnetic field", "C. Electric current", "D. Light"],
        correct: "C"
    },
    {
        question: "What happens to ions at the cathode during electrolysis?",
        choices: ["A. They lose electrons", "B. They gain electrons", "C. They remain neutral", "D. They combine with anions"],
        correct: "B"
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
