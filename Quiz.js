const quizQuestions = [
    {
        question: "What forms when Lead (Pb²⁺) reacts with H₂S?",
        answers: [
            "Blue precipitate of copper hydroxide",
            "White precipitate of aluminum hydroxide",
            "Black precipitate of lead sulfide (PbS)",
            "Yellow precipitate of barium chromate"
        ],
        correctAnswer: "Black precipitate of lead sulfide (PbS)",
        explanation: "Lead ions react with hydrogen sulfide to form insoluble lead sulfide (PbS)."
    },
    {
        question: "What is the product when Copper (Cu²⁺) reacts with NaOH?",
        answers: [
            "Black precipitate of lead sulfide",
            "Blue precipitate of copper hydroxide (Cu(OH)₂)",
            "Brown precipitate of iron hydroxide",
            "White precipitate of zinc hydroxide"
        ],
        correctAnswer: "Blue precipitate of copper hydroxide (Cu(OH)₂)",
        explanation: "Sodium hydroxide reacts with copper ions to form copper hydroxide (Cu(OH)₂)."
    },
    {
        question: "When Bismuth (Bi³⁺) reacts with H₂S, what precipitate forms?",
        answers: [
            "Brown-black precipitate of bismuth sulfide (Bi₂S₃)",
            "White precipitate of aluminum hydroxide",
            "Blue precipitate of copper hydroxide",
            "Deep blue solution of tetraamminecopper(II)"
        ],
        correctAnswer: "Brown-black precipitate of bismuth sulfide (Bi₂S₃)",
        explanation: "Bismuth ions react with hydrogen sulfide to form bismuth sulfide (Bi₂S₃)."
    },
    {
        question: "What occurs when Iron (Fe³⁺) reacts with NaOH?",
        answers: [
            "Formation of a blue precipitate",
            "Formation of a white precipitate",
            "Formation of a brown precipitate of iron(III) hydroxide (Fe(OH)₃)",
            "Formation of a deep blue solution"
        ],
        correctAnswer: "Formation of a brown precipitate of iron(III) hydroxide (Fe(OH)₃)",
        explanation: "Sodium hydroxide reacts with iron ions to form iron hydroxide (Fe(OH)₃)."
    },
    {
        question: "What happens when Chromium (Cr³⁺) reacts with NaOH?",
        answers: [
            "Formation of a yellow precipitate",
            "Formation of a brown-black precipitate",
            "Formation of a grey-green precipitate of chromium hydroxide (Cr(OH)₃)",
            "Formation of a blue precipitate of copper hydroxide"
        ],
        correctAnswer: "Formation of a grey-green precipitate of chromium hydroxide (Cr(OH)₃)",
        explanation: "Chromium ions react with sodium hydroxide, forming a grey-green precipitate of chromium hydroxide (Cr(OH)₃), which can dissolve in excess NaOH."
    }
];

function showQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = 'block'; // Make quiz visible
    quizContainer.innerHTML = '';

    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("quiz-question");
        questionDiv.innerHTML = `<strong>${index + 1}. ${q.question}</strong>`;
        q.answers.forEach((answer) => {
            const answerLabel = document.createElement("label");
            answerLabel.classList.add("quiz-answer");
            answerLabel.innerHTML = `<input type="radio" name="q${index}" value="${answer}"> ${answer}`;
            questionDiv.appendChild(answerLabel);
        });
        quizContainer.appendChild(questionDiv);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Quiz";
    submitButton.onclick = checkAnswers;
    quizContainer.appendChild(submitButton);
}

function checkAnswers() {
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;
    let feedbackHTML = '';

    quizQuestions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === q.correctAnswer) {
            score++;
            feedbackHTML += `<p><strong>Question ${index + 1}: ${q.question}</strong><br>`;
            feedbackHTML += `Your answer: ${selectedAnswer.value}<br>`;
            feedbackHTML += `Correct answer: ${q.correctAnswer}<br>`;
            feedbackHTML += `Explanation: ${q.explanation}</p><br>`;
        }
    });

    const resultMessage = score === quizQuestions.length
        ? "Congratulations! You got a perfect score!<br><br>"
        : `You scored ${score} out of ${quizQuestions.length}. Try again!<br><br>`;

    document.getElementById("quiz-container").innerHTML = resultMessage + feedbackHTML;

    // Ensure the user can click anywhere to go back only after showing feedback
    setTimeout(() => {
        document.body.onclick = () => {
            window.location.href = 'index.html'; // Replace with your home page URL
        };
    }, 10); // Delay to allow feedback to be visible
}

document.addEventListener('DOMContentLoaded', () => {
    const quizButton = document.getElementById('quiz-button');
    quizButton.addEventListener('click', showQuiz);
});
