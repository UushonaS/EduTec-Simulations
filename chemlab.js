document.addEventListener('DOMContentLoaded', () => {
   const quizButton = document.querySelector('#quiz-button'); // Correct ID
   if (quizButton) {
       quizButton.addEventListener('click', (event) => {
           event.preventDefault();  // Prevent any default action like highlighting
           showQuiz();  // Call showQuiz function to display the quiz
       });
   }
});

// Function to display quiz questions
function showQuiz() {
   const quizContainer = document.getElementById("quiz-container");

   // Example quiz content
   const quizHTML = `
       <div class="quiz-question">
           <p>1.What is the formula for momentum?</p>
           <label class="quiz-answer"><input type="radio" name="q1" value="a"> Force × Acceleration</label>
           <label class="quiz-answer"><input type="radio" name="q1" value="b"> Mass × Velocity</label>
           <label class="quiz-answer"><input type="radio" name="q1" value="c"> Mass ÷ Time</label>
       </div>
       <div class="quiz-question">
           <p>2.What is the unit of momentum?</p>
           <label class="quiz-answer"><input type="radio" name="q2" value="a"> kg · m/s</label>
           <label class="quiz-answer"><input type="radio" name="q2" value="b"> m/s²</label>
           <label class="quiz-answer"><input type="radio" name="q2" value="c"> Newton</label>
       </div>
       <button onclick="submitQuiz()">Submit Quiz</button>
   `;

   // Insert the quiz into the container and display it
   quizContainer.innerHTML = quizHTML;
   quizContainer.style.display = 'block';  // Make the quiz container visible
}

// Function to handle quiz submission (optional, add more functionality if needed)
function submitQuiz() {
   // Process the quiz answers here
   alert('Quiz submitted!');
}
 function ShowResult() {
   var result = document.getElementById("resulthidden");

   if (result.style.display === "none") {
      result.style.display = "block";
   } else {
      result.style.display = "none";
   }
}

var added_water = false;
var shaken = false;
var Concentrated = false;
var Heated = false;
var Cooled = false;
var Boiled = false;

var fillPortion = -20;

var addedNH4Cl = false;
var addedNH4OH = false;
var addedNH4CO3 = false;
var Grp3Separated = false;

var addedAceticAcid = false;
var addedPotChromate = false;

function water() {
   var filled = document.querySelector('.fill');
   var transform = 'translate(0,' + fillPortion + 'px)';

   filled.style.WebkitTransform = transform;
   filled.style.backgroundColor = 'cyan';

   fillPortion -= 20;

   added_water = true;
}

function Reagentselected() {
   // Fill test tube
   var filled = document.querySelector('.fill');
   var transform = 'translate(0,' + fillPortion + 'px)';
   filled.style.WebkitTransform = transform;
   fillPortion -= 20;

   // Record which reagents are selected
   if (document.getElementById("NH4Cl").checked) {
      addedNH4Cl = true;
   }

   if (document.getElementById("NH4OH").checked) {
      addedNH4OH = true;
   }

   if (document.getElementById("NH4CO3").checked) {
      addedNH4CO3 = true;
   }

   if (document.getElementById("Acetic").checked) {
      addedAceticAcid = true;
   }

   if (document.getElementById("Chromate").checked) {
      addedPotChromate = true;
   }

   /* Pouring potassium chromate */
   if (document.getElementById("Chromate").checked) {
      var filled = document.querySelector('.fill')
      var box = document.getElementsByClassName("greyboxhidden");

      filled.style.backgroundColor = 'yellow';
      box[0].innerHTML = "Yellow precipitate is formed.";
   }

   if (document.getElementById("Iodide").checked) {
      var filled = document.querySelector('.fill')
      var box = document.getElementsByClassName("greyboxhidden");

      filled.style.backgroundColor = 'yellow';
      box[0].innerHTML = "Yellow precipitate";
   }

   /* Hide the division */
   var x = document.getElementsByClassName("ReagentShowOptions");
   x[0].className = "ReagentHideOptions";
}

function CationShowOptions() {
   var x = document.getElementsByClassName("CationHideOptions");
   x[0].className = "CationShowOptions";
}

function CationHideOptions() {
   var x = document.getElementsByClassName("CationShowOptions");
   x[0].className = "CationHideOptions";
}

function ReagentShowOptions() {
   var x = document.getElementsByClassName("ReagentHideOptions");
   x[0].className = "ReagentShowOptions";
}

function cationselected() {
   const cation = document.getElementById("cation");
   if (cation.style.display === "none") {
      cation.style.display = "block";
   }
}

function TestTube1() {
   var btn1 = document.getElementById("t1btn");
   var btn2 = document.getElementById("t2btn");
   btn1.style.backgroundColor = "ghostwhite";
   btn2.style.backgroundColor = "white";
}

function TestTube2() {
   var btn1 = document.getElementById("t1btn");
   var btn2 = document.getElementById("t2btn");
   btn1.style.backgroundColor = "white";
   btn2.style.backgroundColor = "ghostwhite";

   var filled = document.querySelector('.fill');
   var transform = 'translate(0,' + -20 + 'px)';
   filled.style.WebkitTransform = transform;
   filled.style.backgroundColor = 'cyan';
   fillPortion = -40;
}

var rotation = 20;

function shake() {
   shaken = true;
   var cation = document.getElementById("cation");
   if (cation.style.display === "block") {
      cation.style.display = "none";
   }
   var x = document.getElementById("testtube");
   x.style.WebkitTransform = 'rotate(' + 20 + 'deg)';
}

function changeshake() {
   rotation = -20;
   var x = document.getElementById("testtube");
   x.style.WebkitTransform = 'rotate(' + rotation + 'deg)';
}

function changeshake2() {
   rotation = 0;
   var x = document.getElementById("testtube");
   x.style.WebkitTransform = 'rotate(' + rotation + 'deg)';
}

function filtered() {
   var filled = document.querySelector('.fill');
   var transform = 'translate(0,' + -20 + 'px)';
   filled.style.WebkitTransform = transform;
   fillPortion = -40;

   var cation = document.getElementById("cation");
   if (cation.style.display === "block") {
      cation.style.display = "none";
   }

   /* Pb + H₂S */
   if (document.getElementById("H2S").checked && document.getElementById("Pb").checked) {
      var filled = document.querySelector('.fill');
      filled.style.backgroundColor = 'black';
      var box = document.getElementsByClassName("greyboxhidden");
      box[0].innerHTML = "Black precipitate";
      var result = document.getElementById("resulthidden");
      result.innerHTML = "Residue: Lead sulfide (PbS) - Group 2 present";
   }

   /* Cu + NaOH */
   if (document.getElementById("NaOH").checked && document.getElementById("Cu").checked) {
      var filled = document.querySelector('.fill');
      filled.style.backgroundColor = 'blue';
      var box = document.getElementsByClassName("greyboxhidden");
      box[0].innerHTML = "Blue precipitate";
      var result = document.getElementById("resulthidden");
      result.innerHTML = "Copper hydroxide (Cu(OH)₂) - Group 2 present";
   }

   /* Bi + H₂S */
   if (document.getElementById("H2S").checked && document.getElementById("Bi").checked) {
      var filled = document.querySelector('.fill');
      filled.style.backgroundColor = 'brown';
      var box = document.getElementsByClassName("greyboxhidden");
      box[0].innerHTML = "Brown-black precipitate";
      var result = document.getElementById("resulthidden");
      result.innerHTML = "Bismuth sulfide (Bi₂S₃) - Group 2 present";
   }

   /* Fe + NaOH */
   if (document.getElementById("NaOH").checked && document.getElementById("Fe").checked) {
      var filled = document.querySelector('.fill');
      filled.style.backgroundColor = 'brown';
      var box = document.getElementsByClassName("greyboxhidden");
      box[0].innerHTML = "Brown precipitate";
      var result = document.getElementById("resulthidden");
      result.innerHTML = "Iron(III) hydroxide (Fe(OH)₃) - Group 3 present";
   }

   /* Cr + NaOH */
   if (document.getElementById("NaOH").checked && document.getElementById("Cr").checked) {
      var filled = document.querySelector('.fill');
      filled.style.backgroundColor = 'green';
      var box = document.getElementsByClassName("greyboxhidden");
      box[0].innerHTML = "Grey-green precipitate";
      var result = document.getElementById("resulthidden");
      result.innerHTML = "Chromium hydroxide (Cr(OH)₃) - Group 3 present";
   }

   /* Al + NaOH */
   if (document.getElementById("NaOH").checked && document.getElementById("Al").checked) {
      var filled = document.querySelector('.fill');
      filled.style.backgroundColor = 'white';
      var box = document.getElementsByClassName("greyboxhidden");
      box[0].innerHTML = "White precipitate";
      var result = document.getElementById("resulthidden");
      result.innerHTML = "Aluminum hydroxide (Al(OH)₃) - Group 3 present";
   }

   /* Zn + NaOH */
   if (document.getElementById("NaOH").checked && document.getElementById("Zn").checked) {
      var filled = document.querySelector('.fill');
      filled.style.backgroundColor = 'white';
      var box = document.getElementsByClassName("greyboxhidden");
      box[0].innerHTML = "White precipitate";
      var result = document.getElementById("resulthidden");
      result.innerHTML = "Zinc hydroxide (Zn(OH)₂) - Group 4 present";
   }

   /* Ba + Acetic Acid + K₂CrO₄ */
   if (addedAceticAcid && addedPotChromate && document.getElementById("Ba").checked) {
      var filled = document.querySelector('.fill');
      filled.style.backgroundColor = 'yellow';
      var box = document.getElementsByClassName("greyboxhidden");
      box[0].innerHTML = "Yellow precipitate";
      var result = document.getElementById("resulthidden");
      result.innerHTML = "Barium chromate (BaCrO₄) - Group 5 present";
   }

   /* Sr + Acetic Acid + K₂CrO₄ */
   if (addedAceticAcid && addedPotChromate && document.getElementById("Sr").checked) {
      var filled = document.querySelector('.fill');
      filled.style.backgroundColor = 'yellow';
      var box = document.getElementsByClassName("greyboxhidden");
      box[0].innerHTML = "Yellow precipitate";
      var result = document.getElementById("resulthidden");
      result.innerHTML = "Strontium chromate (SrCrO₄) - Group 5 present";
   }
}


function Concentrate() {
   Concentrated = true;

   /*decrease the water level*/
   var filled = document.querySelector('.fill');
   var transform = 'translate(0,' + -20 + 'px)';
   filled.style.WebkitTransform = transform;
   fillPortion = -40;

}

function Heat() {

   Heated = true;

   var x = document.getElementById("burner");
   if (x.style.display = "none") { x.style.display = "block" }

}

function StopHeat() {
   var x = document.getElementById("burner");
   if (x.style.display = "block") { x.style.display = "none" }
}


function Cool() {
   Cooled = true;

   var x = document.getElementById("burner");
   if (x.style.display = "none") { x.style.display = "block" }

}

function StopshowIcePlate() {
   var x = document.getElementById("burner");
   if (x.style.display = "block") { x.style.display = "none" }
}

function Boil() {
   Boiled = true;

   var x = document.getElementById("burner");
   if (x.style.display = "none") { x.style.display = "block" }


}

function StopBoil() {
   var x = document.getElementById("burner");
   if (x.style.display = "block") { x.style.display = "none" }
}

function Thermometer() {
   Thermometer = true;

   var x = document.getElementById("Thermometer");
   if (x.style.display = "none") { x.style.display = "block" }


}

function StopThermometer() {
   var x = document.getElementById("Thermometer");
   if (x.style.display = "block") { x.style.display = "none" }
}
function resetExperiment() {
   // Reset visual elements like color, display, etc.
   var filled = document.querySelector('.fill');
   filled.style.WebkitTransform = 'translate(0, 0px)';
   filled.style.backgroundColor = '';

   // Reset results and messages
   var result = document.getElementById("resulthidden");
   var box = document.getElementsByClassName("greyboxhidden");
   result.style.display = "none";
   result.innerHTML = "";
   box[0].innerHTML = "";

   // Reset checkboxes and buttons
   document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
       checkbox.checked = false;
   });
   
   // Reset the state of variables
   added_water = false;
   shaken = false;
   Concentrated = false;
   Heated = false;
   Cooled = false;
   Boiled = false;
   Thermometer = false;
   fillPortion = -20;
   addedNH4Cl = false;
   addedNH4OH = false;
   addedNH4CO3 = false;
   Grp3Separated = false;
   addedAceticAcid = false;
   addedPotChromate = false;
   
   // Reset test tubes or buttons background colors
   document.getElementById("t1btn").style.backgroundColor = "white";
   document.getElementById("t2btn").style.backgroundColor = "white";
   
   // Hide any other visible elements like burner, cation, etc.
   document.getElementById("burner").style.display = "none";
   document.getElementById("cation").style.display = "none";
   document.getElementById("Thermometer").style.display = "none";
   document.getElementById("IcePlate").style.display = "none";

   console.log("Experiment reset successfully.");
}


function Divide() {
   var workbench = document.getElementById("workbench");
   var dividebuttons = document.getElementById("dividebuttons");

   workbench.style.backgroundColor = "ghostwhite";
   if (dividebuttons.style.display = "none") { dividebuttons.style.display = "block" }

}

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function startSimulation() {
    document.getElementById('introSlides').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    document.getElementById('mainContent').style.display = 'none'; // Hide main content initially
});

function showIcePlate() {
   document.getElementById("IcePlate").style.display = "block";
}
function PlaySound() {
   
   // Play the ice sound
   var iceSound = document.getElementById("iceSound");
   iceSound.play();
  }
