// Data for each step
const steps = [
    {
        title: "What is Hyperparameter Tuning?",
        text: "Imagine a machine learning model as a complex radio. <br><br>While the radio learns to play the music by itself (Model Parameters), the dials that tune to the correct frequency, adjust the volume, and set the bass are controlled by you. These dials are the <strong>Hyperparameters</strong>.",
        visual: `
            <div class="flex justify-center items-center h-48 w-full bg-indigo-50 rounded-xl border border-indigo-100 relative overflow-hidden">
                <div class="flex gap-8 items-center">
                    <!-- Radio Dial 1 -->
                    <div class="flex flex-col items-center gap-3">
                        <div class="w-20 h-20 rounded-full border-4 border-indigo-200 bg-white flex items-center justify-center shadow-inner relative transform rotate-45 transition-transform hover:rotate-90 cursor-pointer">
                            <div class="w-2 h-8 bg-indigo-600 rounded-full absolute top-2"></div>
                            <div class="w-4 h-4 rounded-full bg-indigo-800"></div>
                        </div>
                        <span class="text-sm font-semibold text-indigo-800">Learning Rate</span>
                    </div>
                    <!-- Radio Dial 2 -->
                    <div class="flex flex-col items-center gap-3">
                        <div class="w-20 h-20 rounded-full border-4 border-indigo-200 bg-white flex items-center justify-center shadow-inner relative transform -rotate-12 transition-transform hover:rotate-45 cursor-pointer">
                            <div class="w-2 h-8 bg-indigo-600 rounded-full absolute top-2"></div>
                            <div class="w-4 h-4 rounded-full bg-indigo-800"></div>
                        </div>
                        <span class="text-sm font-semibold text-indigo-800">Tree Depth</span>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "Parameters vs. Hyperparameters",
        text: "It is crucial in ML Engineering to separate these two concepts. You <em>train</em> parameters, but you <em>tune</em> hyperparameters.",
        visual: `
            <div class="grid grid-cols-2 gap-4 h-48 w-full">
                <div class="bg-blue-50 rounded-xl p-4 border border-blue-100 flex flex-col justify-center items-center text-center">
                    <div class="text-blue-500 mb-2">
                        <svg class="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    </div>
                    <h3 class="font-bold text-blue-900">Model Parameters</h3>
                    <p class="text-xs text-blue-700 mt-2">Learned automatically during training.<br>(e.g., Neural Network Weights)</p>
                </div>
                <div class="bg-purple-50 rounded-xl p-4 border border-purple-100 flex flex-col justify-center items-center text-center">
                    <div class="text-purple-500 mb-2">
                        <svg class="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <h3 class="font-bold text-purple-900">Hyperparameters</h3>
                    <p class="text-xs text-purple-700 mt-2">Set manually <em>before</em> training.<br>(e.g., Epochs, Batch Size)</p>
                </div>
            </div>
        `
    },
    {
        title: "Search Strategies: Grid vs. Random",
        text: "To find the best settings, ML Engineers use search algorithms to explore the 'Search Space'. <br><br><strong>Grid Search</strong> tests every combination on a strict grid. <strong>Random Search</strong> tests random combinations, which is often faster and finds better results because it tests more unique values per parameter.",
        visual: `
            <div class="grid grid-cols-2 gap-6 w-full mt-2">
                <!-- Grid Search -->
                <div class="flex flex-col items-center">
                    <span class="text-sm font-semibold text-gray-600 mb-2">Grid Search</span>
                    <div class="w-40 h-40 bg-white border-2 border-gray-200 rounded-lg bg-grid relative shadow-sm">
                        <!-- Dots for Grid -->
                        <div class="absolute w-2 h-2 bg-red-500 rounded-full top-[18px] left-[18px]"></div>
                        <div class="absolute w-2 h-2 bg-red-500 rounded-full top-[18px] left-[78px]"></div>
                        <div class="absolute w-2 h-2 bg-red-500 rounded-full top-[18px] left-[138px]"></div>
                        <div class="absolute w-2 h-2 bg-red-500 rounded-full top-[78px] left-[18px]"></div>
                        <div class="absolute w-2 h-2 bg-red-500 rounded-full top-[78px] left-[78px]"></div>
                        <div class="absolute w-2 h-2 bg-red-500 rounded-full top-[78px] left-[138px]"></div>
                        <div class="absolute w-2 h-2 bg-red-500 rounded-full top-[138px] left-[18px]"></div>
                        <div class="absolute w-2 h-2 bg-red-500 rounded-full top-[138px] left-[78px]"></div>
                        <div class="absolute w-2 h-2 bg-red-500 rounded-full top-[138px] left-[138px]"></div>
                    </div>
                </div>
                <!-- Random Search -->
                <div class="flex flex-col items-center">
                    <span class="text-sm font-semibold text-gray-600 mb-2">Random Search</span>
                    <div class="w-40 h-40 bg-white border-2 border-gray-200 rounded-lg relative shadow-sm">
                        <!-- Dots for Random -->
                        <div class="absolute w-2 h-2 bg-green-500 rounded-full top-[10px] left-[40px]"></div>
                        <div class="absolute w-2 h-2 bg-green-500 rounded-full top-[35px] left-[120px]"></div>
                        <div class="absolute w-2 h-2 bg-green-500 rounded-full top-[60px] left-[15px]"></div>
                        <div class="absolute w-2 h-2 bg-green-500 rounded-full top-[85px] left-[90px]"></div>
                        <div class="absolute w-2 h-2 bg-green-500 rounded-full top-[110px] left-[55px]"></div>
                        <div class="absolute w-2 h-2 bg-green-500 rounded-full top-[140px] left-[135px]"></div>
                        <div class="absolute w-2 h-2 bg-green-500 rounded-full top-[130px] left-[20px]"></div>
                        <div class="absolute w-2 h-2 bg-green-500 rounded-full top-[45px] left-[70px]"></div>
                        <div class="absolute w-2 h-2 bg-green-500 rounded-full top-[95px] left-[115px]"></div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "The Mathematical Equation",
        text: "Formally, Hyperparameter Tuning is a mathematical optimization problem. We want to find the specific set of hyperparameters that minimizes the error of our model on new data.",
        visual: `
            <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-inner text-center w-full">
                <div class="text-xl sm:text-2xl text-indigo-900 mb-6 font-serif">
                    $$ \\lambda^* = \\underset{\\lambda \\in \\Lambda}{\\arg\\min} \\; \\mathcal{V}(\\mathcal{L}, \\mathcal{A}_\\lambda, \\mathcal{D}_{train}, \\mathcal{D}_{valid}) $$
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-left px-4">
                    <div class="bg-white p-3 rounded shadow-sm border border-gray-100"><span class="font-bold text-indigo-600">$\\lambda^*$</span> : The best, optimal hyperparameters.</div>
                    <div class="bg-white p-3 rounded shadow-sm border border-gray-100"><span class="font-bold text-indigo-600">$\\lambda \\in \\Lambda$</span> : A specific setup inside our search space.</div>
                    <div class="bg-white p-3 rounded shadow-sm border border-gray-100"><span class="font-bold text-indigo-600">$\\mathcal{V}$</span> : The validation error (e.g., loss function).</div>
                    <div class="bg-white p-3 rounded shadow-sm border border-gray-100"><span class="font-bold text-indigo-600">$\\mathcal{A}_\\lambda$</span> : The ML algorithm using settings $\\lambda$.</div>
                </div>
            </div>
        `
    },
    {
        title: "Advanced: Bayesian Optimization",
        text: "Instead of searching randomly, modern Production systems use <strong>Bayesian Optimization</strong>. It uses probability to guess where the best hyperparameters are, learning from past tests to avoid wasting time on bad configurations.",
        visual: `
            <div class="w-full h-48 bg-white border border-gray-200 rounded-xl shadow-sm relative overflow-hidden flex flex-col items-center justify-center p-4">
                    <div class="w-full h-full relative">
                    <!-- Simulated Gaussian Process Plot -->
                    <svg viewBox="0 0 100 40" class="w-full h-full preserve-3d">
                        <!-- True function hidden -->
                        <path d="M 0 30 Q 25 10 50 25 T 100 5" fill="none" stroke="#e5e7eb" stroke-width="1" stroke-dasharray="2 2" />

                        <!-- Surrogate Model (Mean) -->
                        <path d="M 0 35 Q 20 20 40 25 T 70 15 T 100 10" fill="none" stroke="#4f46e5" stroke-width="1.5" />

                        <!-- Uncertainty Area (Variance) -->
                        <path d="M 0 35 Q 20 20 40 25 T 70 15 T 100 10 L 100 0 Q 70 5 40 15 T 20 10 T 0 25 Z" fill="#4f46e5" fill-opacity="0.1" />

                        <!-- Sampled Points -->
                        <circle cx="20" cy="24" r="1.5" fill="#ef4444" />
                        <circle cx="40" cy="25" r="1.5" fill="#ef4444" />
                        <circle cx="70" cy="15" r="1.5" fill="#ef4444" />

                        <!-- Next acquisition point -->
                        <line x1="85" y1="0" x2="85" y2="40" stroke="#10b981" stroke-width="0.5" stroke-dasharray="1 1" />
                        <circle cx="85" cy="11.5" r="1.5" fill="#10b981" class="animate-pulse" />
                    </svg>
                    </div>
                    <div class="absolute bottom-2 right-2 text-[10px] text-gray-500 bg-white/80 px-2 py-1 rounded">
                    <span class="text-red-500 font-bold">•</span> Tested &nbsp;&nbsp; <span class="text-green-500 font-bold">•</span> Next Guess
                    </div>
            </div>
        `
    },
    {
        title: "Cross-Validation & Production",
        text: "To ensure our chosen hyperparameters ($\\lambda^*$) aren't just 'lucky' on a specific dataset, we use <strong>K-Fold Cross-Validation</strong>. We split the data into chunks, train/test multiple times, and average the score before deploying to Production.",
        visual: `
            <div class="flex flex-col gap-2 w-full max-w-sm mx-auto mt-4">
                <div class="flex gap-1">
                    <div class="h-6 w-1/5 bg-indigo-500 rounded text-xs text-white flex items-center justify-center">Test</div>
                    <div class="h-6 w-4/5 bg-gray-200 rounded text-xs text-gray-600 flex items-center justify-center">Train Data</div>
                </div>
                <div class="flex gap-1">
                    <div class="h-6 w-1/5 bg-gray-200 rounded"></div>
                    <div class="h-6 w-1/5 bg-indigo-500 rounded text-xs text-white flex items-center justify-center">Test</div>
                    <div class="h-6 w-3/5 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">Train Data</div>
                </div>
                <div class="flex gap-1">
                    <div class="h-6 w-2/5 bg-gray-200 rounded"></div>
                    <div class="h-6 w-1/5 bg-indigo-500 rounded text-xs text-white flex items-center justify-center">Test</div>
                    <div class="h-6 w-2/5 bg-gray-200 rounded"></div>
                </div>
                <div class="flex gap-1">
                    <div class="h-6 w-3/5 bg-gray-200 rounded"></div>
                    <div class="h-6 w-1/5 bg-indigo-500 rounded text-xs text-white flex items-center justify-center">Test</div>
                    <div class="h-6 w-1/5 bg-gray-200 rounded"></div>
                </div>
                <div class="flex justify-center mt-2">
                    <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200 shadow-sm">
                        🚀 Ready for Production Deployment
                    </span>
                </div>
            </div>
        `
    }
];

let currentStep = 0;

// Initialize UI
function init() {
    createDots();
    renderStep();
}

// Generate dot indicators dynamically
function createDots() {
    const dotsContainer = document.getElementById('dots-container');
    dotsContainer.innerHTML = ''; // clear any existing
    steps.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-indigo-600' : 'bg-gray-200'}`;
        dot.id = `dot-${index}`;
        dotsContainer.appendChild(dot);
    });
}

// Change step based on direction (-1 for back, 1 for next)
function changeStep(direction) {
    currentStep += direction;
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= steps.length) currentStep = steps.length - 1;
    renderStep();

    // Scroll to top of content on change
    document.getElementById('step-container').scrollTop = 0;
}

// Render the content of the current step
function renderStep() {
    const stepData = steps[currentStep];
    const container = document.getElementById('step-container');

    // Fixed: Added my-auto so it auto-centers when there's space, but flows down if there isn't.
    container.innerHTML = `
        <div class="fade-in max-w-2xl mx-auto w-full my-auto py-4">
            <div class="mb-8 text-center">
                <div class="inline-block p-3 bg-indigo-50 rounded-2xl mb-4 border border-indigo-100 shadow-sm">
                    <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <h2 class="text-3xl font-bold text-gray-800 mb-4">${stepData.title}</h2>
                <p class="text-gray-600 text-lg leading-relaxed">${stepData.text}</p>
            </div>

            <div class="mt-8 flex justify-center w-full">
                ${stepData.visual}
            </div>
        </div>
    `;

    // Trigger MathJax to render equations in the newly injected HTML
    if (window.MathJax && MathJax.typesetPromise) {
        MathJax.typesetPromise([container]).catch(function (err) {
            console.error('MathJax rendering failed: ' + err.message);
        });
    }

    updateUI();
}

// Update progress bar, text, buttons, and dots
function updateUI() {
    // Update buttons
    document.getElementById('btn-prev').disabled = currentStep === 0;
    const btnNext = document.getElementById('btn-next');
    if (currentStep === steps.length - 1) {
        btnNext.disabled = true;
        btnNext.innerHTML = 'Finish <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
    } else {
        btnNext.disabled = false;
        btnNext.innerHTML = 'Next <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>';
    }

    // Update header text
    document.getElementById('progress-text').innerText = `Step ${currentStep + 1} of ${steps.length}`;

    // Update Progress bar
    const progressPercent = ((currentStep + 1) / steps.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;

    // Update dots
    steps.forEach((_, index) => {
        const dot = document.getElementById(`dot-${index}`);
        if (index === currentStep) {
            dot.className = 'w-2 h-2 rounded-full transition-colors duration-300 bg-indigo-600 transform scale-125';
        } else if (index < currentStep) {
            dot.className = 'w-2 h-2 rounded-full transition-colors duration-300 bg-indigo-300';
        } else {
            dot.className = 'w-2 h-2 rounded-full transition-colors duration-300 bg-gray-200';
        }
    });
}

// Run application on load
window.onload = init;