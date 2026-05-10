// <!-- Application Logic -->
const TOTAL_STEPS = 6;
let currentStep = 0;

// Data arrays to hold DOM elements
const majorityPoints = [];
const minorityPoints = [];
const oversampledPoints = [];
const smotePoints = [];

const arena = document.getElementById('arena');

// Helper to create a point element
function createPoint(typeClass, size = 'w-3 h-3') {
    const el = document.createElement('div');
    el.className = `data-point ${size} ${typeClass} fade-out`;
    arena.appendChild(el);
    return el;
}

// Initialize the dataset visually
function initData() {
    // 1. Generate Majority Class (Spread out, large numbers)
    // 50 points
    for (let i = 0; i < 50; i++) {
        const pt = createPoint('bg-blue-500');
        // Random position mostly on the left/top to create a cluster, but somewhat spread
        const x = 10 + Math.random() * 80;
        const y = 10 + Math.random() * 80;
        pt.style.left = `${x}%`;
        pt.style.top = `${y}%`;
        // Store base coordinates for resets
        pt.dataset.x = x;
        pt.dataset.y = y;
        majorityPoints.push(pt);
    }

    // 2. Generate Minority Class (Clustered, small numbers)
    // 5 points clustered in the bottom right
    const minCenters = [];
    for (let i = 0; i < 5; i++) {
        const pt = createPoint('bg-orange-500', 'w-4 h-4 z-10'); // slightly larger, higher z-index
        const x = 70 + Math.random() * 20;
        const y = 70 + Math.random() * 20;
        pt.style.left = `${x}%`;
        pt.style.top = `${y}%`;
        pt.dataset.x = x;
        pt.dataset.y = y;
        minCenters.push({ x, y });
        minorityPoints.push(pt);
    }

    // 3. Generate Oversampled Points (Stacked/slightly offset on minority)
    // 45 points to match majority (5 + 45 = 50)
    for (let i = 0; i < 45; i++) {
        const pt = createPoint('bg-orange-400'); // Slightly lighter orange
        const center = minCenters[Math.floor(Math.random() * minCenters.length)];
        // Slight jitter
        const x = center.x + (Math.random() - 0.5) * 2;
        const y = center.y + (Math.random() - 0.5) * 2;
        pt.style.left = `${x}%`;
        pt.style.top = `${y}%`;
        oversampledPoints.push(pt);
    }

    // 4. Generate SMOTE Points (Interpolated between minority centers)
    for (let i = 0; i < 45; i++) {
        const pt = createPoint('bg-emerald-400');
        // Pick two random minority points
        const idx1 = Math.floor(Math.random() * minCenters.length);
        let idx2 = Math.floor(Math.random() * minCenters.length);
        while (idx1 === idx2 && minCenters.length > 1) { idx2 = Math.floor(Math.random() * minCenters.length); }

        const c1 = minCenters[idx1];
        const c2 = minCenters[idx2];
        // Random interpolation factor
        const gap = Math.random();

        const x = c1.x + (c2.x - c1.x) * gap + (Math.random() - 0.5) * 3; // Small noise
        const y = c1.y + (c2.y - c1.y) * gap + (Math.random() - 0.5) * 3;

        pt.style.left = `${x}%`;
        pt.style.top = `${y}%`;
        smotePoints.push(pt);
    }

    setupProgressDots();
    renderState();
}

// Setup the UI dots at the bottom
function setupProgressDots() {
    const container = document.getElementById('progress-dots');
    for (let i = 0; i < TOTAL_STEPS; i++) {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${i === 0 ? 'bg-blue-600' : 'bg-slate-300'}`;
        dot.id = `dot-${i}`;
        container.appendChild(dot);
    }
}

// Navigation functions
function nextStep() {
    if (currentStep < TOTAL_STEPS - 1) {
        currentStep++;
        renderState();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderState();
    }
}

// Core visual logic renderer based on state
function renderState() {
    // Update UI buttons & dots
    document.getElementById('btn-prev').disabled = currentStep === 0;
    document.getElementById('btn-next').disabled = currentStep === TOTAL_STEPS - 1;

    for (let i = 0; i < TOTAL_STEPS; i++) {
        document.getElementById(`dot-${i}`).className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${i === currentStep ? 'bg-blue-600' : 'bg-slate-300'}`;

        // Toggle text panels
        const stepPanel = document.getElementById(`step-${i}`);
        if (i === currentStep) {
            stepPanel.classList.remove('hidden');
            stepPanel.classList.add('block');
        } else {
            stepPanel.classList.remove('block');
            stepPanel.classList.add('hidden');
        }
    }

    // Toggle legend synthetic color
    const legendSynth = document.getElementById('legend-synth');
    const legendSynthText = document.getElementById('legend-synth-text');
    if (currentStep === 3) {
        legendSynth.classList.replace('opacity-0', 'opacity-100');
        legendSynthText.classList.replace('opacity-0', 'opacity-100');
    } else {
        legendSynth.classList.replace('opacity-100', 'opacity-0');
        legendSynthText.classList.replace('opacity-100', 'opacity-0');
    }

    // Visual Data Point Logic
    resetPointStyles();

    switch (currentStep) {
        case 0: // Original Imbalanced
            showArray(majorityPoints, true);
            showArray(minorityPoints, true);
            showArray(oversampledPoints, false);
            showArray(smotePoints, false);
            break;

        case 1: // Undersampling (hide 45 majority points)
            showArray(majorityPoints, false);
            // Only show first 5 majority points
            for (let i = 0; i < 5; i++) {
                majorityPoints[i].classList.replace('fade-out', 'fade-in');
            }
            showArray(minorityPoints, true);
            showArray(oversampledPoints, false);
            showArray(smotePoints, false);
            break;

        case 2: // Oversampling
            showArray(majorityPoints, true);
            showArray(minorityPoints, true);
            showArray(oversampledPoints, true);
            showArray(smotePoints, false);
            break;

        case 3: // SMOTE
            showArray(majorityPoints, true);
            showArray(minorityPoints, true);
            showArray(oversampledPoints, false);
            showArray(smotePoints, true);
            break;

        case 4: // Class Weights (Highlight minority)
            showArray(majorityPoints, true);
            showArray(minorityPoints, true);
            showArray(oversampledPoints, false);
            showArray(smotePoints, false);
            // Add highlight pulse to minority points
            minorityPoints.forEach(pt => pt.classList.add('highlight-weight'));
            break;

        case 5: // Evaluation Metrics (Show clear split visual)
            showArray(majorityPoints, true);
            showArray(minorityPoints, true);
            showArray(oversampledPoints, false);
            showArray(smotePoints, false);
            break;
    }
}

// Utilities
function showArray(arr, isVisible) {
    arr.forEach(pt => {
        if (isVisible) {
            pt.classList.replace('fade-out', 'fade-in');
        } else {
            pt.classList.replace('fade-in', 'fade-out');
        }
    });
}

function resetPointStyles() {
    minorityPoints.forEach(pt => pt.classList.remove('highlight-weight'));
}

// Boot up
window.onload = () => {
    initData();
};