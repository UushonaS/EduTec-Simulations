let current, voltage, electroplatingInterval;

function setup() {
    noCanvas();
    current = select('#currentSlider');
    voltage = select('#voltageSlider');

    // Event listeners for the Start and Stop buttons
    select('#startButton').mousePressed(startElectroplating);
    select('#stopButton').mousePressed(stopElectroplating);
}

// Update current and voltage output (optional but useful for feedback)
function updateElectroplating() {
    let currentValue = current.value();
    let voltageValue = voltage.value();
    console.log(`Current: ${currentValue} A, Voltage: ${voltageValue} V`);
}

// Function to create bubbles
function createBubble(ionLabel, color, electrode) {
    const bubble = createDiv(ionLabel);
    const size = random(20, 40); // Random size for ions
    bubble.class('bubble');
    bubble.style('width', `${size}px`);
    bubble.style('height', `${size}px`);
    bubble.style('left', `${random(10, 90)}%`);
    bubble.style('background-color', color); // Set ion color
    bubble.style('bottom', '0');
    bubble.style('color', 'black'); // Ion label text
    bubble.style('text-align', 'center');
    bubble.parent(`#${electrode}`); // Attach bubble to respective electrode

    // Animate bubbles moving upwards
    bubble.elt.animate(
        [
            { transform: 'translateY(0px)' },
            { transform: `translateY(-${random(200, 400)}px)` } // Move up
        ],
        {
            duration: random(2000, 4000), // Random duration
            easing: 'ease-out',
            iterations: 1,
            fill: 'forwards'
        }
    );

    // Remove bubble after animation
    bubble.elt.addEventListener('animationend', () => {
        bubble.remove();
    });
}

// Start electroplating process
function startElectroplating() {
    clearInterval(electroplatingInterval); // Stop any existing intervals

    const selectedElectrode = select('#electrodeType').value(); // Get the selected electrode
    updateElectroplating(); // Log the current and voltage for feedback

    // Interval for bubble generation speed, affected by voltage and current
    let intervalSpeed = Math.max(500 / (voltage.value() * current.value()), 200);

    if (selectedElectrode === 'Copper') {
        // Using Copper electrodes: Cu²⁺ forms at anode, copper deposits on cathode
        electroplatingInterval = setInterval(() => {
            createBubble('Cu²⁺', '#FF6600', 'anode'); // Cu²⁺ ions at anode
            createBubble('Cu', '#FF6600', 'cathode'); // Copper deposit at cathode
        }, intervalSpeed);
    } else if (selectedElectrode === 'Carbon') {
        // Using Carbon electrodes: Oxygen forms at anode, copper deposits on cathode
        electroplatingInterval = setInterval(() => {
            createBubble('O₂', '#4DB8FF', 'anode'); // Oxygen at anode
            createBubble('Cu²⁺', '#FF6600', 'cathode'); // Cu²⁺ ions at cathode
        }, intervalSpeed);
    }

    console.log('Electroplating started with', selectedElectrode, 'electrodes');
}

// Stop the electroplating process
function stopElectroplating() {
    clearInterval(electroplatingInterval); // Stop generating bubbles
    const bubbles = selectAll('.bubble'); // Select all bubbles
    bubbles.forEach(bubble => bubble.remove()); // Remove all bubbles
    console.log('Electroplating stopped.');
}

// Navigate back to the electrolysis page
function goBack() {
    window.location.href = 'index.html'; // Navigate back to the electrolysis page
}
let bubbleSpeed = Math.max(2000 - (voltage.value() * 100), 500); // Faster bubbles with higher voltage
let bubbleSize = Math.min(current.value() * 10, 50); // Larger bubbles with higher current


