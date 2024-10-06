let current, voltage, electrolysisInterval;

// Setup sliders and buttons
function setup() {
    noCanvas();
    current = select('#currentSlider');
    voltage = select('#voltageSlider');

    select('#startButton').mousePressed(startElectrolysis);
    select('#stopButton').mousePressed(stopElectrolysis);
}

function updateElectrolysis() {
    let currentValue = current.value();
    let voltageValue = voltage.value();
    select('#currentOutput').html(currentValue);
    select('#voltageOutput').html(voltageValue);
}

// Create and animate bubbles with specific ions
function createBubble(ionLabel, color, electrode) {
    const bubble = createDiv(ionLabel);
    const size = random(20, 40); // Random size for ions
    bubble.class('bubble');
    bubble.style('width', `${size}px`);
    bubble.style('height', `${size}px`);
    bubble.style('left', `${random(10, 90)}%`);
    bubble.style('background-color', color); // Set the bubble color
    bubble.style('bottom', '0');
    bubble.style('color', 'black'); // Ion labels in black text
    bubble.style('text-align', 'center');
    bubble.parent(`#${electrode}`); // Attach bubble to the respective electrode

    bubble.elt.addEventListener('animationend', () => {
        bubble.remove(); // Remove bubble after it rises
    });
}

// Start electrolysis based on the selected solution
function startElectrolysis() {
    clearInterval(electrolysisInterval); // Clear any previous intervals

    const selectedSolution = select('#solution').value();
    updateElectrolysis();

    let intervalSpeed = Math.max(500 / (voltage.value() * current.value()), 200); // Faster bubbles with higher voltage/current

    if (selectedSolution === 'Molten Lead(II) Bromide') {
        electrolysisInterval = setInterval(() => {
            createBubble('Br₂', '#FFCC00', 'anode'); // Bromine at anode
            createBubble('Pb', '#B0AFAF', 'cathode'); // Lead at cathode
        }, intervalSpeed);
    } else if (selectedSolution === 'Dilute Sulfuric Acid') {
        electrolysisInterval = setInterval(() => {
            createBubble('O₂', '#4DB8FF', 'anode'); // Oxygen at anode
            createBubble('H₂', '#FF9999', 'cathode'); // Hydrogen at cathode
        }, intervalSpeed);
    } else if (selectedSolution === 'Concentrated Hydrochloric Acid') {
        electrolysisInterval = setInterval(() => {
            createBubble('Cl₂', '#00CC99', 'anode'); // Chlorine at anode
            createBubble('H₂', '#FF9999', 'cathode'); // Hydrogen at cathode
        }, intervalSpeed);
    } else if (selectedSolution === 'Concentrated Aqueous Sodium Chloride') {
        electrolysisInterval = setInterval(() => {
            createBubble('Cl₂', '#00CC99', 'anode'); // Chlorine at anode
            createBubble('H₂', '#FF9999', 'cathode'); // Hydrogen at cathode
        }, intervalSpeed);
    }
    console.log('Electrolysis started with', selectedSolution);
}

function stopElectrolysis() {
    clearInterval(electrolysisInterval); // Stop generating bubbles
    const bubbles = selectAll('.bubble'); // Select all bubbles
    bubbles.forEach(bubble => bubble.remove()); // Remove all existing bubbles
    console.log('Electrolysis stopped.');
}
function goToElectroplating() {
    window.location.href = 'electroplating.html'; // Navigate to electroplating page
}

let bubbleSpeed = Math.max(2000 - (voltage.value() * 100), 500); // Faster bubbles with higher voltage
let bubbleSize = Math.min(current.value() * 10, 50); // Larger bubbles with higher current


    function startQuiz() {
        window.location.href = 'quiz.html';  // Make sure quiz.html exists and is correctly linked
    }


    
    
    