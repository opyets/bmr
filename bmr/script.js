let glowDiv = document.createElement('div');
glowDiv.className = 'glow';
document.body.appendChild(glowDiv);

function calculate() {
    var weight = Number(document.getElementById("weight").value);
    var height = Number(document.getElementById("height").value);
    var weightUnit = document.getElementById("weight-unit").value;
    var heightUnit = document.getElementById("height-unit").value;
    var age = Number(document.getElementById("age").value);
    var gender = document.getElementById("gender").value;
    var activity = Number(document.getElementById("activity").value);

    if (!age || !weight || !height) {
        alert("Please fill out all fields.");
        return;
    }
    
    if (weightUnit === "lbs") {
        weight = weight / 2.20462; 
    }
    if (heightUnit === "ft") {
        height = height * 30.48; 
    }

    var heightMeters = height / 100;
    var bmi = (weight / (heightMeters * heightMeters)).toFixed(1);

    let bmr;
    if (gender === "male") {
        bmr = Math.round(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age));
    } else {
        bmr = Math.round(447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age));
    }

    function calculateCalories(bmr, activity, goal) {
        const tdee = Math.round(bmr * activity);
        switch(goal) {
            case 'weightLoss':
                return tdee - 500;
            case 'muscleGain':
                return tdee + 300;
            default:
                return tdee;
        }
    }

    const activitySelector = document.getElementById("activity-selector");
    const fitnessGoalSelect = document.getElementById("fitness-goal");

    function updateCalorieDisplay() {
        const currentActivity = Number(activitySelector.value);
        const currentGoal = fitnessGoalSelect.value;
        const calories = calculateCalories(bmr, currentActivity, currentGoal);
        document.getElementById("calorie-goal-value").textContent = calories.toLocaleString();
    }

    activitySelector.addEventListener("change", updateCalorieDisplay);
    fitnessGoalSelect.addEventListener("change", updateCalorieDisplay);

    const initialActivity = Number(activitySelector.value);
    const initialGoal = fitnessGoalSelect.value;
    const initialCalories = calculateCalories(bmr, initialActivity, initialGoal);
    document.getElementById("calorie-goal-value").textContent = initialCalories.toLocaleString();

    let category, backgroundColor, healthSuggestions;
    if (bmi < 18.5) {
        glowDiv.className = 'glow blue-glow';
        category = "Underweight";
        document.body.classList.add('result-underweight');
        healthSuggestions = `
            <div class="health-advice">
                <h4>Healthy Weight Gain Tips:</h4>
                <ul>
                    <li>Aim to gain 0.5-1 kg (1-2 lbs) per week</li>
                    <li>Eat nutrient-dense foods like nuts, avocados, and whole grains</li>
                    <li>Consider strength training to build muscle mass</li>
                    <li>Have regular meals with healthy snacks between</li>
                </ul>
                <p>For professional guidance, consult a registered dietitian.</p>
                <a href="https://www.nhs.uk/live-well/healthy-weight/managing-your-weight/healthy-ways-to-gain-weight/" target="_blank">Learn more about healthy weight gain</a>
            </div>`;
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        glowDiv.className = 'glow green-glow';
        category = "Normal Weight";
        backgroundColor = `linear-gradient(to bottom right, #A3D9A5, #4DB076)`;
        healthSuggestions = `
            <div class="health-advice">
                <h4>Maintaining Your Healthy Weight:</h4>
                <ul>
                    <li>Stay active with 150 minutes of moderate exercise weekly</li>
                    <li>Maintain a balanced diet rich in whole foods</li>
                    <li>Get adequate sleep (7-9 hours)</li>
                    <li>Stay hydrated with 8 glasses of water daily</li>
                </ul>
                <a href="https://www.who.int/news-room/fact-sheets/detail/healthy-diet" target="_blank">Learn more about healthy eating</a>
            </div>`;
    } else if (bmi >= 25 && bmi <= 29.9) {
        glowDiv.className = 'glow orange-glow';
        category = "Overweight";
        backgroundColor = `linear-gradient(to bottom right, #FFD19C, #FFB575)`;
        healthSuggestions = `
            <div class="health-advice">
                <h4>Weight Management Tips:</h4>
                <ul>
                    <li>Aim for a gradual weight loss of 0.5-1 kg (1-2 lbs) per week</li>
                    <li>Focus on portion control and mindful eating</li>
                    <li>Include 30 minutes of moderate exercise daily</li>
                    <li>Replace sugary drinks with water</li>
                </ul>
                <a href="https://www.cdc.gov/healthyweight/losing_weight/index.html" target="_blank">Learn more about healthy weight loss</a>
            </div>`;
    } else {
        glowDiv.className = 'glow red-glow';
        category = "Obese";
        backgroundColor = `linear-gradient(to bottom right, #F8B0B0, #F58C8C)`;
        healthSuggestions = `
            <div class="health-advice">
                <h4>Health Action Steps:</h4>
                <ul>
                    <li>Consider consulting a healthcare provider for personalized advice</li>
                    <li>Start with gentle exercises like walking or swimming</li>
                    <li>Focus on whole foods and reducing processed foods</li>
                    <li>Track your food intake using a food diary</li>
                </ul>
                <p>Small steps make a big difference! Even 5-10% weight loss can improve health.</p>
                <a href="https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity" target="_blank">Learn more about managing obesity</a>
            </div>`;
    }

    document.getElementById("bmr-value").textContent = bmi;
    document.getElementById("bmr-category").textContent = category;
    
    const existingHealthAdvice = document.querySelector('.health-advice');
    if (existingHealthAdvice) {
        existingHealthAdvice.remove();
    }
    
    const resultSection = document.querySelector('.result-sections');
    const healthAdviceSection = document.createElement('div');
    healthAdviceSection.className = 'result-section';
    healthAdviceSection.innerHTML = healthSuggestions;
    resultSection.appendChild(healthAdviceSection);

    document.querySelector('.calculate-form').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.calculate-form').style.display = 'none';
        document.querySelector('.result-form').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.result-form').style.opacity = '1';
        }, 50);
    }, 300);
}

function recalculate() {
    glowDiv.className = 'glow';
    document.querySelector('.result-form').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.result-form').style.display = 'none';
        document.querySelector('.calculate-form').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.calculate-form').style.opacity = '1';
        }, 50);
        
        document.getElementById("height").value = '';
        document.getElementById("height-unit").value = 'cm';
        document.getElementById("weight").value = '';
        document.getElementById("weight-unit").value = 'kg';
        document.getElementById("age").value = '';
        document.getElementById("gender").value = 'male';
        document.getElementById("activity").value = '1.2';
        
        const healthAdvice = document.querySelector('.health-advice');
        if (healthAdvice) {
            healthAdvice.remove();
        }
    }, 300);
}
