let scene, camera, renderer, ballA, ballB;
let massA = 0, velocityA = 0, momentumA;
let massB = 0, velocityB = 0, momentumB;
let animationFrameId;
let isPlaying = false;
const friction = 0.99; 
const boundary = 25; 

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 800 / 400, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(800, 400);
    document.getElementById('renderer-container').appendChild(renderer.domElement);

    scene.background = new THREE.Color(0xe0e0e0);

    const ballSize = 2; 

    // Create Ball A
    const geometryA = new THREE.SphereGeometry(ballSize, 32, 32);
    const materialA = new THREE.MeshStandardMaterial({ color: 0xff5722 });
    ballA = new THREE.Mesh(geometryA, materialA);
    ballA.position.set(-10, 0, 0);  
    scene.add(ballA);

    const geometryB = new THREE.SphereGeometry(ballSize, 32, 32);
    const materialB = new THREE.MeshStandardMaterial({ color: 0x2196F3 });
    ballB = new THREE.Mesh(geometryB, materialB);
    ballB.position.set(10, 0, 0);  
    scene.add(ballB);

    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        createText(font, 'A', -10, 2.2);
        createText(font, 'B', 10, 2.2);
    });

    
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(ambientLight);
    scene.add(directionalLight);

    camera.position.set(0, 5, 20);  
    camera.lookAt(0, 0, 0);
}

function createText(font, text, x, y) {
    const textGeometry = new THREE.TextGeometry(text, {
        font: font,
        size: 0.5,
        height: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 3
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(x, y, 0);
    textMesh.name = `text${text}`;
    scene.add(textMesh);
}


function updateMomentumDisplay() {
    momentumA = massA * velocityA;
    momentumB = massB * velocityB;

    document.getElementById('momentumDisplayA').innerText = `Ball A: ${momentumA.toFixed(2)} kg·m/s`;
    document.getElementById('momentumDisplayB').innerText = `Ball B: ${momentumB.toFixed(2)} kg·m/s`;
}

function updateBallPositions() {
    ballA.position.x += velocityA * 0.01;
    ballB.position.x += velocityB * 0.01;

    const textA = scene.getObjectByName('textA');
    const textB = scene.getObjectByName('textB');
    if (textA) {
        textA.position.x = ballA.position.x;
        textA.position.y = ballA.position.y + 2;
    }
    if (textB) {
        textB.position.x = ballB.position.x;
        textB.position.y = ballB.position.y + 2;
    }

    const distance = ballA.position.distanceTo(ballB.position);
    const minDistance = 4; 

    if (distance < minDistance) {
        const totalMass = massA + massB;
        const newVelocityA = ((massA - massB) / totalMass) * velocityA + ((2 * massB) / totalMass) * velocityB;
        const newVelocityB = ((2 * massA) / totalMass) * velocityA + ((massB - massA) / totalMass) * velocityB;

        velocityA = newVelocityA;
        velocityB = newVelocityB;

        changeBallColors(); 

        const overlap = minDistance - distance;
        const direction = new THREE.Vector3().subVectors(ballB.position, ballA.position).normalize();
        ballA.position.sub(direction.clone().multiplyScalar(overlap / 2));
        ballB.position.add(direction.clone().multiplyScalar(overlap / 2));
    }

    if (ballA.position.x <= -boundary || ballA.position.x >= boundary) {
        velocityA = -velocityA;
        changeBallColors();
    }

    if (ballB.position.x <= -boundary || ballB.position.x >= boundary) {
        velocityB = -velocityB;
        changeBallColors();
    }

    if (Math.abs(velocityA) < 0.01 && Math.abs(velocityB) < 0.01) {
        stopSimulation();
    }
}

function changeBallColors() {
    ballA.material.color.set(0xffb74d);
    ballB.material.color.set(0x64b5f6);
}

function animate() {
    animationFrameId = requestAnimationFrame(animate);

    if (!isPlaying) return;

    velocityA *= friction;
    velocityB *= friction;

    updateBallPositions();
    updateMomentumDisplay();
    renderer.render(scene, camera);
}

function startSimulation() {
    massA = parseFloat(document.getElementById('massA').value);
    velocityA = parseFloat(document.getElementById('velocityA').value);
    massB = parseFloat(document.getElementById('massB').value);
    velocityB = parseFloat(document.getElementById('velocityB').value);

    if (isNaN(massA) || isNaN(velocityA) || isNaN(massB) || isNaN(velocityB)) {
        alert("Please enter valid values for mass and velocity.");
        return;
    }

    if (!isPlaying) {
        isPlaying = true;
        animate();
        document.getElementById('play').disabled = true;
        document.getElementById('stop').disabled = false;
    }
}

function stopSimulation() {
    if (isPlaying) {
        isPlaying = false;
        cancelAnimationFrame(animationFrameId);
        document.getElementById('play').disabled = false;
        document.getElementById('stop').disabled = true;
    }
}

document.getElementById('update').addEventListener('click', () => {
    massA = Math.max(parseFloat(document.getElementById('massA').value), 0.1);
    velocityA = parseFloat(document.getElementById('velocityA').value);
    massB = Math.max(parseFloat(document.getElementById('massB').value), 0.1);
    velocityB = parseFloat(document.getElementById('velocityB').value);
    updateMomentumDisplay();
});

document.getElementById('play').addEventListener('click', startSimulation);
document.getElementById('stop').addEventListener('click', stopSimulation);
document.getElementById('restart').addEventListener('click', () => {
    document.getElementById('massA').value = '';
    document.getElementById('velocityA').value = '';
    document.getElementById('massB').value = '';
    document.getElementById('velocityB').value = '';
    stopSimulation();
    ballA.position.set(-10, 0, 0);
    ballB.position.set(10, 0, 0);
    velocityA = 0;
    velocityB = 0;
    updateMomentumDisplay();
});

init();
