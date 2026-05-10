// <!-- Application Logic -->
// Data structure defining each step of the serialization process
const steps = [
    {
        title: "1. The Trained Model (In-Memory)",
        desc: "After hours of training, your Machine Learning model has finally converged! Right now, all its learned patterns (weights, biases, and architecture) exist as active objects in the computer's temporary RAM. <b>If the Python script stops or the server restarts now, the entire model is lost.</b>",
        icon: `<svg class="w-32 h-32 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path><circle cx="12" cy="9" r="2" stroke="currentColor" stroke-width="1.5"></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 11v2m-2-3h-2m6 0h2"></path></svg>`
    },
    {
        title: "2. Serialization (The 'Freezing' Process)",
        desc: "To save the model, we use <b>Serialization</b>. This process translates the complex in-memory programming objects into a flat, standardized byte-stream. Think of it as taking apart a LEGO castle and writing down the exact blueprint and pieces into a file (like <code>.pkl</code>, <code>.onnx</code>, or <code>.h5</code>).",
        icon: `<svg class="w-32 h-32 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>`
    },
    {
        title: "3. The Math & Abstraction behind Serialization",
        desc: `While serialization is an engineering task, mathematically we can view a model as a function $\\hat{y} = f(X; \\theta)$, where $\\theta$ represents all learned weights.<br><br>
        Serialization ($\\mathcal{S}$) maps these parameters into a byte array $B$:
        <div class="text-center my-2 bg-slate-100 rounded p-2 border border-slate-200">$$ B = \\mathcal{S}(\\theta) $$</div>
        Deserialization ($\\mathcal{S}^{-1}$) reconstructs them for production:
        <div class="text-center my-2 bg-slate-100 rounded p-2 border border-slate-200">$$ \\theta \\approx \\mathcal{S}^{-1}(B) $$</div>
        <i class="text-sm text-blue-600 text-center block mt-2"><b>MLOps Tip:</b> We use $\\approx$ (approximately equal) because ML Engineers often apply <b>Quantization</b> during serialization (e.g., converting 32-bit floats to 8-bit integers) to make the file smaller and faster for production!</i>`,
        icon: `<svg class="w-32 h-32 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`
    },
    {
        title: "4. Artifact Storage (The Model Registry)",
        desc: "Once the model is serialized into a file, it is no longer bound to the machine that trained it. We upload this file to an <b>Artifact Store</b> or <b>Model Registry</b> (like AWS S3, Google Cloud Storage, or MLflow). It sits here safely, version-controlled, waiting to be deployed.",
        icon: `<svg class="w-32 h-32 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>`
    },
    {
        title: "5. Deserialization (Loading to Production)",
        desc: "A production environment (like a Flask/FastAPI server or a cloud microservice) starts up. It downloads the serialized file from storage and performs <b>Deserialization</b>. This reads the file and reconstructs the live model objects back into the production server's RAM.",
        icon: `<svg class="w-32 h-32 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>`
    },
    {
        title: "6. Inference (Ready for Users!)",
        desc: "The model is fully restored and operational! When a user sends new data (like an image or a text prompt), the production server feeds it into the deserialized model. The model computes the math using its restored weights $\\theta$ and returns the final prediction. The lifecycle is complete.",
        icon: `<svg class="w-32 h-32 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`
    }
];

let currentStep = 0;

// Initialize UI on load
window.onload = () => {
    renderDots();
    updateUI();
};

function renderDots() {
    const dotsContainer = document.getElementById('progress-dots');
    dotsContainer.innerHTML = '';
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300 ${index === 0 ? 'bg-white text-blue-600 border-white' : 'bg-blue-600 text-blue-200 border-blue-400'
            }`;
        dot.id = `dot-${index}`;
        dot.innerText = index + 1;
        dotsContainer.appendChild(dot);
    });
}

function updateUI() {
    const contentDiv = document.getElementById('step-content');

    // Animation reset
    contentDiv.classList.remove('fade-enter-active');

    // Allow browser to render removing the class before adding it back
    requestAnimationFrame(() => {
        // Update text and visual content
        document.getElementById('step-title').innerHTML = steps[currentStep].title;
        document.getElementById('step-desc').innerHTML = steps[currentStep].desc;
        document.getElementById('step-icon').innerHTML = steps[currentStep].icon;

        // Trigger animation
        contentDiv.classList.add('fade-enter-active');

        // If MathJax is loaded, tell it to render the new equations dynamically
        if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
            MathJax.typesetPromise([document.getElementById('step-desc')]).catch(function (err) {
                console.log('MathJax rendering error: ' + err.message);
            });
        }
    });

    // Update footer controls
    document.getElementById('btn-back').disabled = currentStep === 0;

    const btnNext = document.getElementById('btn-next');
    if (currentStep === steps.length - 1) {
        btnNext.disabled = true;
        btnNext.innerHTML = "Finish &check;";
        btnNext.classList.replace('bg-blue-600', 'bg-emerald-500');
        btnNext.classList.replace('hover:bg-blue-700', 'hover:bg-emerald-600');
    } else {
        btnNext.disabled = false;
        btnNext.innerHTML = "Next Step &rarr;";
        btnNext.classList.replace('bg-emerald-500', 'bg-blue-600');
        btnNext.classList.replace('hover:bg-emerald-600', 'hover:bg-blue-700');
    }

    document.getElementById('step-counter').innerText = `Step ${currentStep + 1} of ${steps.length}`;

    // Update Progress Bar
    const progressPercent = (currentStep / (steps.length - 1)) * 100;
    document.getElementById('progress-fill').style.width = `${progressPercent}%`;

    // Update Progress Dots
    steps.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index <= currentStep) {
            dot.className = "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300 bg-white text-blue-600 border-white shadow-[0_0_10px_rgba(255,255,255,0.8)]";
        } else {
            dot.className = "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300 bg-blue-600 text-blue-200 border-blue-400";
        }
    });
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
    }
}