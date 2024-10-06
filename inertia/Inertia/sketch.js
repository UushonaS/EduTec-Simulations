let lengthSlider, dampingSlider, massSlider, driveAmplitudeSlider, driveFrequencySlider, gravitySlider;
let angle = Math.PI / 6; 
let angleVelocity = 0; 
let length, damping, mass, driveAmplitude, driveFrequency, gravity;

let isSimulating = false;
let time = 0;
let chart;

function setup() {
    const canvas = createCanvas(600, 450);
    canvas.parent('container');

    // Initialize the chart
    const ctx = document.getElementById('energyChart').getContext('2d');
    ctx.canvas.width = 300; 
    ctx.canvas.height = 300; 
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Energy (J)',
                data: [],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(75,192,192,1)',
            }]
        },
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Pendulum Energy Over Time'
                },
                tooltip: {
                    enabled: true,
                },
                legend: {
                    display: true,
                    position: 'top',
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (s)'
                    },
                    grid: {
                        display: true,
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Energy (J)'
                    },
                    beginAtZero: true,
                    grid: {
                        display: true,
                    }
                }
            }
        }
    });

    // Adding event listeners to buttons
    select('#startButton').mousePressed(startSimulation);
    select('#pauseButton').mousePressed(togglePause);
    select('#resetButton').mousePressed(resetSimulation);

    // Initialize sliders
    lengthSlider = select('#lengthSlider');
    dampingSlider = select('#dampingSlider');
    massSlider = select('#massSlider');
    driveAmplitudeSlider = select('#driveAmplitudeSlider');
    driveFrequencySlider = select('#driveFrequencySlider');
    gravitySlider = select('#gravitySlider');

    // Update slider values on change
    lengthSlider.changed(updateSliderValues);
    dampingSlider.changed(updateSliderValues);
    massSlider.changed(updateSliderValues);
    driveAmplitudeSlider.changed(updateSliderValues);
    driveFrequencySlider.changed(updateSliderValues);
    gravitySlider.changed(updateSliderValues);

    updateSliderValues(); // Initialize slider values display
}

function updateSliderValues() {
    select('#lengthValue').html(lengthSlider.value());
    select('#dampingValue').html(dampingSlider.value());
    select('#massValue').html(massSlider.value());
    select('#driveAmplitudeValue').html(driveAmplitudeSlider.value());
    select('#driveFrequencyValue').html(driveFrequencySlider.value());
    select('#gravityValue').html(gravitySlider.value());
}

function draw() { 
    clear(); 
    background(255); 
    stroke(0); 
    line(50, height - 50, width - 50, height - 50); 
    line(50, height - 50, 50, 50); 

    // Draw X and Y axis ticks
    for (let i = 0; i <= 10; i++) {
        line(50 + (i / 10) * (width - 100), height - 55,
             50 + (i / 10) * (width - 100), height - 45); 
        textAlign(CENTER);
        text(i.toFixed(1), (50 + (i / 10) * (width - 100)), height - 30);
    }

    for (let j = 0; j <= 10; j++) {
        line(45, height - 50 - (j / 10) * (height - 100),
             55, height - 50 - (j / 10) * (height - 100)); 
        textAlign(LEFT);
        text(j.toFixed(1), 60, height - 50 - (j / 10) * (height - 100)); 
    }

    if (isSimulating) {
        length = parseFloat(lengthSlider.value());
        damping = parseFloat(dampingSlider.value());
        mass = parseFloat(massSlider.value());
        gravity = parseFloat(gravitySlider.value());

        // Physics calculations
        let angleAcc = (-gravity / length) * sin(angle) - damping * angleVelocity;
        angleVelocity += angleAcc; 
        angle += angleVelocity;

        let scaleFactor = 20; 
        let pendulumX = length * sin(angle) * scaleFactor;
        let pendulumY = length * cos(angle) * scaleFactor;

        stroke(0);
        line(width / 2, 100, width / 2 + pendulumX, 100 + pendulumY); 
        fill(255, 0, 0);
        ellipse(width / 2 + pendulumX, 100 + pendulumY, mass * 20, mass * 20); 

        // Energy calculations
        let potentialEnergy = mass * gravity * (length * (1 - cos(angle))); 
        let kineticEnergy = 0.5 * mass * (length ** 2) * angleVelocity ** 2; 
        let totalEnergy = potentialEnergy + kineticEnergy;

        time += 0.033; 
        chart.data.labels.push(time.toFixed(2));
        chart.data.datasets[0].data.push(totalEnergy);
        if (chart.data.labels.length > 50) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }
        chart.update();

        let period = 2 * Math.PI * Math.sqrt(length / gravity);
        let amplitude = Math.abs(angle * (180 / Math.PI)); 

        // Update UI with values
        select('#energy').html("Energy: " + totalEnergy.toFixed(2) + " J");
        select('#time').html("Time: " + time.toFixed(2) + " s");
        select('#inertia').html("Moment of Inertia: " + (mass * length ** 2).toFixed(2) + " kg·m²");
        select('#period').html("Period: " + period.toFixed(2) + " s");
        select('#amplitude').html("Amplitude: " + amplitude.toFixed(2) + "°");
    } else {
        let scaleFactor = 20; 
        let pendulumX = length * scaleFactor * sin(angle);
        let pendulumY = length * scaleFactor * (1 - cos(angle));
        stroke(0);
        line(width / 2, height / 2, width / 2 + pendulumX, height / 2 + pendulumY); 
        fill(255, 0, 0);
        ellipse(width / 2 + pendulumX, height / 2 + pendulumY, mass * 20, mass * 20); 
    }
}

function startSimulation() {
    isSimulating = true;
    angleVelocity = 0; 
    loop(); 
}

function togglePause() {
    isSimulating = !isSimulating; 
    if (!isSimulating) {
        noLoop(); 
    } else {
        loop(); 
    }
}

function resetSimulation() {
    angle = Math.PI / 6; 
    angleVelocity = 0;
    time = 0; 
    isSimulating = false; 
    clear(); 
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.update(); 
}

function showQuiz() {
    const quizQuestions = [
        {
            question: "What is the formula for the period of a pendulum?",
            options: ["2π√(L/g)", "L/g", "g/L", "2πg"],
            answer: 0
        },
        {
            question: "What does damping do to a pendulum?",
            options: ["Increases its speed", "Decreases its amplitude", "Increases its length", "None of the above"],
            answer: 1
        },
        {
            question: "What effect does mass have on the period of a pendulum?",
            options: ["Increases period", "Decreases period", "No effect", "Doubles period"],
            answer: 2
        }
    ];

    let score = 0;

    // Ask each question in the quiz
    quizQuestions.forEach((q, index) => {
        const userAnswer = prompt(q.question + "\n" + q.options.map((opt, i) => `${i + 1}: ${opt}`).join("\n"));
        if (userAnswer - 1 === q.answer) {
            score++;
        }
    });

    alert(`You scored ${score} out of ${quizQuestions.length}`);
}