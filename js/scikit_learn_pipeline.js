// <!-- Application Logic -->
// SVG Arrow for reuse
const arrowSvg = `
    <svg class="w-8 h-8 text-slate-300 mx-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
    </svg>
`;

// Definition of all steps
const steps = [
    {
        title: "1. The Raw Data Problem",
        html: `
            <div class="flex flex-col items-center py-4 space-y-8 fade-in">
                <div class="text-center max-w-2xl">
                    <h2 class="text-3xl font-bold text-slate-800 mb-4">Raw Data & Different Scales</h2>
                    <p class="text-slate-600 text-lg">In Machine Learning, real-world data is messy. Features often have entirely different scales. Feeding this raw data directly into an algorithm like Logistic Regression can lead to slow convergence or biased models.</p>
                </div>

                <div class="bg-white border border-slate-200 shadow-sm rounded-xl p-6 w-full max-w-xl">
                    <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b pb-2">Sample Dataset (Customer Data)</h3>
                    <table class="w-full text-left">
                        <thead>
                            <tr class="text-slate-500 text-sm">
                                <th class="pb-3">Age (Years)</th>
                                <th class="pb-3">Salary (USD)</th>
                                <th class="pb-3">Purchased (Target)</th>
                            </tr>
                        </thead>
                        <tbody class="text-slate-700 font-medium">
                            <tr class="border-t border-slate-100"><td class="py-3">22</td><td class="py-3 text-red-500">24,000</td><td class="py-3">0</td></tr>
                            <tr class="border-t border-slate-100"><td class="py-3">45</td><td class="py-3 text-red-500">110,000</td><td class="py-3">1</td></tr>
                            <tr class="border-t border-slate-100"><td class="py-3">28</td><td class="py-3 text-red-500">45,000</td><td class="py-3">0</td></tr>
                        </tbody>
                    </table>
                    <p class="mt-4 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <strong>Issue:</strong> Salary values are massively larger than Age. The algorithm might incorrectly weigh Salary as strictly more important just because the raw numbers are bigger.
                    </p>
                </div>
            </div>
        `
    },
    {
        title: "2. Structuring the Pipeline",
        html: `
            <div class="flex flex-col items-center py-4 space-y-8 fade-in">
                <div class="text-center max-w-2xl">
                    <h2 class="text-3xl font-bold text-slate-800 mb-4">What is a Scikit-Learn Pipeline?</h2>
                    <p class="text-slate-600 text-lg">A Pipeline strictly chains multiple processing steps (Transformers) together with a final ML model (Estimator). This ensures code is clean and data flows systematically.</p>
                </div>

                <!-- Pipeline Diagram -->
                <div class="flex flex-wrap items-center justify-center w-full mt-8 gap-y-4">
                    <!-- Input -->
                    <div class="flex flex-col items-center">
                        <div class="bg-slate-100 text-slate-700 px-6 py-4 rounded-xl border border-slate-300 font-semibold shadow-sm text-center w-36">
                            Raw Data<br><span class="text-xs font-normal">(Age, Salary)</span>
                        </div>
                    </div>

                    ${arrowSvg}

                    <!-- Transformer -->
                    <div class="flex flex-col items-center">
                        <div class="bg-blue-50 text-blue-700 px-6 py-4 rounded-xl border border-blue-200 font-semibold shadow-sm text-center w-48 relative">
                            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Transformer</div>
                            StandardScaler
                        </div>
                    </div>

                    ${arrowSvg}

                    <!-- Estimator -->
                    <div class="flex flex-col items-center">
                        <div class="bg-indigo-50 text-indigo-700 px-6 py-4 rounded-xl border border-indigo-200 font-semibold shadow-sm text-center w-48 relative">
                            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Estimator</div>
                            LogisticRegression
                        </div>
                    </div>

                    ${arrowSvg}

                    <!-- Output -->
                    <div class="flex flex-col items-center">
                        <div class="bg-emerald-50 text-emerald-700 px-6 py-4 rounded-xl border border-emerald-200 font-semibold shadow-sm text-center w-36">
                            Prediction<br><span class="text-xs font-normal">(0 or 1)</span>
                        </div>
                    </div>
                </div>

                <div class="bg-slate-800 text-green-400 p-4 rounded-lg font-mono text-sm w-full max-w-3xl shadow-inner mt-8">
                    <span class="text-blue-400">from</span> sklearn.pipeline <span class="text-blue-400">import</span> Pipeline<br>
                    <span class="text-blue-400">from</span> sklearn.preprocessing <span class="text-blue-400">import</span> StandardScaler<br>
                    <span class="text-blue-400">from</span> sklearn.linear_model <span class="text-blue-400">import</span> LogisticRegression<br><br>
                    pipe = Pipeline([<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;(<span class="text-yellow-300">'scaler'</span>, StandardScaler()),<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;(<span class="text-yellow-300">'classifier'</span>, LogisticRegression())<br>
                    ])
                </div>
            </div>
        `
    },
    {
        title: "3. Training Phase: fit_transform",
        html: `
            <div class="flex flex-col items-center py-4 space-y-6 fade-in">
                <div class="text-center max-w-3xl mb-4">
                    <h2 class="text-3xl font-bold text-slate-800 mb-2">Training: The <code class="bg-slate-100 text-indigo-600 px-2 py-1 rounded">.fit()</code> Phase</h2>
                    <p class="text-slate-600 text-lg">When you call <code>pipe.fit(X_train, y_train)</code>, data cascades through the pipeline. Each step learns parameters from the data and passes the transformed data to the next step.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    <!-- Scaler Step -->
                    <div class="bg-white border-2 border-blue-100 rounded-xl p-6 relative shadow-sm">
                        <div class="absolute top-0 right-0 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">Step 1</div>
                        <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                            StandardScaler
                        </h3>
                        <ul class="space-y-3 text-slate-600 text-sm">
                            <li class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span><strong>Fits:</strong> Calculates the Mean ($\mu$) and Standard Deviation ($\sigma$) of the training data.</span>
                            </li>
                            <li class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                <span><strong>Transforms:</strong> Applies the formula to scale the data. Passes this <em>new</em> scaled data forward.</span>
                            </li>
                        </ul>
                        <div class="mt-4 bg-slate-50 p-3 rounded border border-slate-200 text-xs font-mono text-slate-600">
                            Saved State:<br>
                            scaler.mean_ = [35.0, 59666.6]<br>
                            scaler.scale_ = [11.5, 43211.3]
                        </div>
                    </div>

                    <!-- Model Step -->
                    <div class="bg-white border-2 border-indigo-100 rounded-xl p-6 relative shadow-sm">
                        <div class="absolute top-0 right-0 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">Step 2</div>
                        <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                            LogisticRegression
                        </h3>
                        <ul class="space-y-3 text-slate-600 text-sm">
                            <li class="flex items-start gap-2">
                                <svg class="w-5 h-5 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span><strong>Fits:</strong> Receives the <em>scaled</em> data. Calculates the optimal Weights ($W$) and Bias ($b$) to map features to the target variable.</span>
                            </li>
                            <li class="flex items-start gap-2 text-slate-400">
                                <svg class="w-5 h-5 text-slate-300 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                                <span><strong>Transforms:</strong> (N/A - Estimators do not transform data, they conclude the pipeline).</span>
                            </li>
                        </ul>
                        <div class="mt-4 bg-slate-50 p-3 rounded border border-slate-200 text-xs font-mono text-slate-600">
                            Saved State:<br>
                            model.coef_ = [[1.24, 2.51]]<br>
                            model.intercept_ = [-0.85]
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "4. The Applied Mathematics",
        html: `
            <div class="flex flex-col items-center py-4 space-y-4 fade-in">
                <div class="text-center max-w-3xl mb-2">
                    <h2 class="text-3xl font-bold text-slate-800 mb-2">Under the Hood: The Equations</h2>
                    <p class="text-slate-600">Here is the exact mathematical journey a single raw data vector $x$ takes as it flows through our Scikit-Learn Pipeline.</p>
                </div>

                <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 w-full max-w-4xl relative">
                    <div class="absolute -top-3 left-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">1. Transformer: StandardScaler</div>
                    <div class="flex flex-col md:flex-row items-center justify-between mt-2 gap-6">
                        <div class="flex-1 text-slate-700 text-sm">
                            <p class="mb-2">Standardization shifts the mean to 0 and variance to 1. It subtracts the learned mean ($\mu$) and divides by the learned standard deviation ($\sigma$).</p>
                            <ul class="list-disc list-inside text-blue-800 bg-blue-100/50 p-3 rounded-lg">
                                <li>$x$: Raw input feature vector</li>
                                <li>$z$: New Scaled feature vector</li>
                            </ul>
                        </div>
                        <div class="flex-1 bg-white p-4 rounded-lg shadow-sm border border-blue-100 text-center text-xl overflow-x-auto">
                            $$ z = \\frac{x - \\mu}{\\sigma} $$
                        </div>
                    </div>
                </div>

                <div class="flex justify-center w-full my-[-10px] relative z-10">
                    <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </div>

                <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-6 w-full max-w-4xl relative">
                    <div class="absolute -top-3 left-6 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">2. Estimator: Logistic Regression</div>
                    <div class="flex flex-col md:flex-row items-center justify-between mt-2 gap-6">
                        <div class="flex-1 text-slate-700 text-sm">
                            <p class="mb-2">The scaled data ($z$) is multiplied by learned weights ($W$), adding bias ($b$). Passed through a Sigmoid function ($\sigma$) to output a probability between 0 and 1.</p>
                            <ul class="list-disc list-inside text-indigo-800 bg-indigo-100/50 p-3 rounded-lg">
                                <li>$W, b$: Learned model parameters</li>
                                <li>$\\hat{y}$: Predicted probability</li>
                            </ul>
                        </div>
                        <div class="flex-1 bg-white p-4 rounded-lg shadow-sm border border-indigo-100 text-center text-lg overflow-x-auto">
                            $$ \\hat{y} = \\frac{1}{1 + e^{-(W^T z + b)}} $$
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "5. Production/Inference: predict",
        html: `
            <div class="flex flex-col items-center py-4 space-y-6 fade-in">
                <div class="text-center max-w-3xl mb-4">
                    <h2 class="text-3xl font-bold text-slate-800 mb-2">Inference: The <code class="bg-slate-100 text-emerald-600 px-2 py-1 rounded">.predict()</code> Phase</h2>
                    <p class="text-slate-600 text-lg">In production, new unseen data arrives. You call <code>pipe.predict(X_new)</code>. Crucially, the pipeline <strong>does not re-fit</strong>. It uses the parameters saved during training.</p>
                </div>

                <div class="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-8 w-full max-w-4xl relative shadow-sm">
                    <div class="absolute top-0 right-0 bg-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2 rounded-bl-xl rounded-tr-lg">Preventing Data Leakage</div>

                    <h3 class="text-xl font-bold text-emerald-900 mb-6 border-b border-emerald-200 pb-2">Flow of New Data:</h3>

                    <div class="space-y-6">
                        <div class="flex items-start gap-4">
                            <div class="bg-emerald-100 p-3 rounded-full shrink-0"><span class="font-bold text-emerald-700">1</span></div>
                            <div>
                                <h4 class="font-bold text-slate-800">New Data Input</h4>
                                <p class="text-slate-600 text-sm">A new customer arrives: Age 30, Salary $80,000.</p>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="bg-emerald-100 p-3 rounded-full shrink-0"><span class="font-bold text-emerald-700">2</span></div>
                            <div>
                                <h4 class="font-bold text-slate-800">StandardScaler (<span class="text-blue-600">transform only</span>)</h4>
                                <p class="text-slate-600 text-sm mb-2">The scaler uses the $\mu$ and $\sigma$ from the <em>training set</em> to scale this new data. It does <strong>not</strong> calculate a new mean.</p>
                                <div class="bg-white p-2 text-xs font-mono text-slate-500 rounded border border-emerald-100">
                                    z = (X_new - saved_mean) / saved_scale
                                </div>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div class="bg-emerald-100 p-3 rounded-full shrink-0"><span class="font-bold text-emerald-700">3</span></div>
                            <div>
                                <h4 class="font-bold text-slate-800">Logistic Regression (<span class="text-indigo-600">predict</span>)</h4>
                                <p class="text-slate-600 text-sm mb-2">The model applies its saved weights $W$ and bias $b$ to the scaled data to output the final prediction (0 or 1).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    {
        title: "6. Engineering Best Practices",
        html: `
            <div class="flex flex-col items-center py-4 space-y-8 fade-in">
                <div class="text-center max-w-3xl">
                    <h2 class="text-3xl font-bold text-slate-800 mb-4">Why Pipelines matter for MLOps</h2>
                    <p class="text-slate-600 text-lg">In ML Engineering, a model is rarely just an algorithm. It's the entire sequence of data transformations. Pipelines bridge the gap between Jupyter Notebooks and Production.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    <!-- Benefit 1 -->
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-slate-800 mb-2">Prevents Data Leakage</h3>
                        <p class="text-slate-600 text-sm">Using cross-validation without a pipeline leaks validation data into scaling parameters. Pipelines ensure <code>fit()</code> happens strictly inside cross-validation folds.</p>
                    </div>

                    <!-- Benefit 2 -->
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-slate-800 mb-2">Single Artifact Deployment</h3>
                        <p class="text-slate-600 text-sm">When exporting models via <code>joblib.dump(pipe, 'model.pkl')</code>, you save the scaler AND the model together. Production engineers only need to load one object.</p>
                    </div>

                    <!-- Benefit 3 -->
                    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                        </div>
                        <h3 class="text-lg font-bold text-slate-800 mb-2">Clean & Reproducible Code</h3>
                        <p class="text-slate-600 text-sm">Removes boilerplate code. Instead of manually applying transforms sequentially on training and test sets, you wrap it all into a single cohesive structure.</p>
                    </div>
                </div>

                <div class="mt-8 text-center text-slate-500 text-sm flex items-center gap-2">
                    <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    You have completed the Scikit-Learn Pipeline overview!
                </div>
            </div>
        `
    }
];

let currentStep = 0;

// DOM Elements
const contentArea = document.getElementById('content-area');
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const stepCounter = document.getElementById('step-counter');
const progressDots = document.getElementById('progress-dots');

// Initialize progress dots
function initDots() {
    steps.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `w-2.5 h-2.5 rounded-full transition-colors duration-300 ${idx === 0 ? 'bg-indigo-600' : 'bg-slate-200'}`;
        dot.id = `dot-${idx}`;
        progressDots.appendChild(dot);
    });
}

function updateDots() {
    steps.forEach((_, idx) => {
        const dot = document.getElementById(`dot-${idx}`);
        if (idx === currentStep) {
            dot.className = 'w-2.5 h-2.5 rounded-full transition-colors duration-300 bg-indigo-600';
        } else if (idx < currentStep) {
            dot.className = 'w-2.5 h-2.5 rounded-full transition-colors duration-300 bg-indigo-300';
        } else {
            dot.className = 'w-2.5 h-2.5 rounded-full transition-colors duration-300 bg-slate-200';
        }
    });
}

// Render current step
function renderStep() {
    // Update HTML
    contentArea.innerHTML = steps[currentStep].html;

    // Render Math using KaTeX auto-render extension
    if (window.renderMathInElement) {
        renderMathInElement(contentArea, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    } else {
        // If KaTeX hasn't loaded yet, try again slightly later
        setTimeout(() => {
            if (window.renderMathInElement) {
                renderMathInElement(contentArea, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false }
                    ]
                });
            }
        }, 100);
    }

    // Update UI Counters and Buttons
    stepCounter.textContent = `Step ${currentStep + 1} of ${steps.length}`;
    updateDots();

    // Button state
    btnBack.disabled = currentStep === 0;

    if (currentStep === steps.length - 1) {
        btnNext.innerHTML = `<span class="hidden sm:inline">Finish</span><span class="sm:hidden">Finish</span> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
        btnNext.classList.replace('bg-indigo-600', 'bg-emerald-600');
        btnNext.classList.replace('hover:bg-indigo-700', 'hover:bg-emerald-700');
        btnNext.disabled = true; // Optionally disable or handle completion
    } else {
        btnNext.innerHTML = `<span class="hidden sm:inline">Next Step</span><span class="sm:hidden">Next</span> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`;
        btnNext.classList.replace('bg-emerald-600', 'bg-indigo-600');
        btnNext.classList.replace('hover:bg-emerald-700', 'hover:bg-indigo-700');
        btnNext.disabled = false;
    }
}

// Event Listeners
btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

// Initialize App
initDots();
renderStep();