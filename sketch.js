let frequencySlider, amplitudeSlider, waveTypeSelector, mediumSelector;
let amplitude = 0.5;
let audioContext, oscillator, gainNode, isPlaying = false, waveType = 'sine', medium = 'Gas';
let speedOfSound = { 'Gas': 346, 'Liquid': 1500, 'Solid': 6000 };

function setup() {
    const canvas = createCanvas(600, 450);
    canvas.parent('container');

    frequencySlider = select('#frequencySlider');
    amplitudeSlider = select('#amplitudeSlider');
    waveTypeSelector = select('#waveType');
    mediumSelector = select('#medium');

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(amplitude, audioContext.currentTime);
    gainNode.connect(audioContext.destination);

    select('#playButton').mousePressed(playSound);
    select('#pauseButton').mousePressed(pauseSound);

    loadSettings();
    frameRate(30);
    setupTooltips();
}

function draw() {
    background(30);
    drawWave();
    updateFrequency();
    updateAmplitude();
    updateWaveType();
    updateMedium();
    displayCalculations();
}

function drawWave() {
    const centerY = height / 2;
    let waveSpeed = speedOfSound[medium] / speedOfSound['Gas'];
    let frequency = frequencySlider.value();
    let amplitude = amplitudeSlider.value();
    let waveLengthValue = speedOfSound[medium] / frequency;

    let gradient = drawingContext.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(255, 150, 150, 0.7)');
    gradient.addColorStop(1, 'rgba(150, 255, 255, 0.7)');
    drawingContext.strokeStyle = gradient;

    drawingContext.shadowColor = 'rgba(255, 255, 255, 0.5)';
    drawingContext.shadowBlur = 10;

    noFill();
    strokeWeight(2);

    beginShape();
    for (let x = 0; x < width; x++) {
        let y;
        if (waveType === 'sine') {
            y = centerY + amplitude * 100 * sin(TWO_PI * (x / waveLengthValue) + frameCount * 0.1 * waveSpeed);
        } else if (waveType === 'triangle') {
            y = centerY + amplitude * 100 * (2 / PI * asin(sin(TWO_PI * (x / waveLengthValue) + frameCount * 0.1 * waveSpeed)));
        }
        vertex(x, y);
    }
    endShape();
}

function updateFrequency() {
    let frequency = frequencySlider.value();
    if (isPlaying) {
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    }
    select('#frequencyOutput').html(frequency);
}

function updateAmplitude() {
    amplitude = amplitudeSlider.value();
    if (isPlaying) {
        gainNode.gain.setValueAtTime(amplitude, audioContext.currentTime);
    }
}

function updateWaveType() {
    waveType = waveTypeSelector.value();
    if (isPlaying) {
        oscillator.type = waveType;
    }
}

function updateMedium() {
    medium = mediumSelector.value();
    if (isPlaying) {
        oscillator.frequency.setValueAtTime(frequencySlider.value() * getMediumFactor(), audioContext.currentTime);
    }
}

function getMediumFactor() {
    return speedOfSound[medium] / speedOfSound['Gas'];
}

function displayCalculations() {
    let frequency = frequencySlider.value();
    let speed = speedOfSound[medium];
    let wavelength = speed / frequency;

    select('#frequencyOutput').html(frequency);
    select('#speedOutput').html(speed);
    select('#wavelengthOutput').html(wavelength.toFixed(2));
}

function playSound() {
    if (isPlaying) {
        oscillator.stop();
    }
    oscillator = audioContext.createOscillator();
    oscillator.type = waveType;
    oscillator.frequency.setValueAtTime(frequencySlider.value(), audioContext.currentTime);
    oscillator.connect(gainNode);
    oscillator.start();
    isPlaying = true;
}

function pauseSound() {
    if (isPlaying) {
        oscillator.stop();
        isPlaying = false;
    }
}

function loadSettings() {
    displayCalculations();
}

function setupTooltips() {
    frequencySlider.mouseOver(() => showTooltip('#frequencyTooltip'));
    frequencySlider.mouseOut(() => hideTooltip('#frequencyTooltip'));

    amplitudeSlider.mouseOver(() => showTooltip('#amplitudeTooltip'));
    amplitudeSlider.mouseOut(() => hideTooltip('#amplitudeTooltip'));
}

function showTooltip(selector) {
    select(selector).addClass('show');
}

function hideTooltip(selector) {
    select(selector).removeClass('show');
}

const questions = [
    {
        question: "What is the speed of sound in air?",
        options: ["346 m/s", "1500 m/s", "6000 m/s"],
        answer: "346 m/s"
    },
    {
        question: "What does amplitude control?",
        options: ["Pitch", "Volume", "Wavelength"],
        answer: "Volume"
    }
];

let currentQuestionIndex = 0;

function startQuiz() {
    document.getElementById('quizSection').style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    const question = questions[currentQuestionIndex];
    const resultDiv = document.getElementById('quizResults');
    if (selected === question.answer) {
        resultDiv.innerText = 'Correct!';
    } else {
        resultDiv.innerText = 'Incorrect!';
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        document.getElementById('backButton').style.display = 'block';
    }
}

function goBack() {
    document.getElementById('quizSection').style.display = 'none';
    currentQuestionIndex = 0;
    document.getElementById('quizResults').innerText = '';
    document.getElementById('backButton').style.display = 'none';
}
