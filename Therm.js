document.getElementById("thermometer-button").addEventListener("click", function() {
    const thermometer = document.getElementById("Thermometer");
    if (thermometer.style.display === "none" || thermometer.style.display === "") {
        thermometer.style.display = "block"; // Show the thermometer
    } else {
        thermometer.style.display = "none";  // Hide the thermometer if it's already shown
    }
});
// Function to insert the thermometer into the test tube
function insertThermometer() {
    // Show the thermometer in the test tube
    const thermometer = document.getElementById('Thermometer');
    thermometer.style.display = 'block';

    // Simulate temperature reading based on actions (Heat, Cool, Boil)
    let temperature = 25; // Default room temperature in Celsius

    // Check if test tube is being heated, cooled, or boiled
    if (document.getElementById('burner').style.display === 'block') {
        temperature = 100; // Boiling temperature
    } else if (document.getElementById('testtube').classList.contains('cooling')) {
        temperature = 10; // Cooling temperature
    }

    // Display the temperature reading
    const temperatureDisplay = document.getElementById('temperature-display');
    temperatureDisplay.textContent = `Temperature: ${temperature} °C`;
}

// Function to simulate heating
function Heat() {
    const burner = document.getElementById('burner');
    burner.style.display = 'block';
    document.getElementById('testtube').classList.remove('cooling');
    // Call the thermometer function to update the temperature if the thermometer is in the test tube
    insertThermometer();
}

// Function to simulate cooling
function Cool() {
    const burner = document.getElementById('burner');
    burner.style.display = 'none';
    document.getElementById('testtube').classList.add('cooling');
    // Update the thermometer temperature
    insertThermometer();
}

// Function to simulate boiling
function Boil() {
    Heat();
    setTimeout(() => {
        // Simulate reaching boiling point
        insertThermometer();
    }, 1.5); // Assuming 1.5 seconds to reach boiling point
}
