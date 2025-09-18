import React, { useState } from 'react';

function Calculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const getBMIInfo = (bmiValue) => {
    if (bmiValue < 18.5) {
      return {
        category: 'Underweight',
        className: 'underweight',
        emoji: '📈',
        description: 'Your BMI indicates you may be underweight.',
        tips: [
          '🍽️ Eat nutrient-dense, calorie-rich foods',
          '🥑 Include healthy fats like nuts, avocados, and olive oil',
          '💪 Consider strength training to build muscle mass',
          '🥛 Add protein shakes or smoothies to your diet',
          '👩‍⚕️ Consult a healthcare provider for personalized advice'
        ],
        healthRisks: [
          'Weakened immune system',
          'Increased risk of infections',
          'Bone loss and fractures',
          'Delayed wound healing'
        ]
      };
    } else if (bmiValue < 24.9) {
      return {
        category: 'Normal Weight',
        className: 'normal',
        emoji: '💚',
        description: 'Great job! Your BMI is in the healthy range.',
        tips: [
          '🥗 Maintain a balanced diet with fruits and vegetables',
          '🏃‍♀️ Stay active with regular exercise',
          '💧 Drink plenty of water throughout the day',
          '😴 Get 7-9 hours of quality sleep',
          '🧘‍♀️ Manage stress through relaxation techniques'
        ],
        healthRisks: [
          'Lowest risk for weight-related health issues',
          'Optimal cardiovascular health',
          'Better insulin sensitivity',
          'Reduced inflammation'
        ]
      };
    } else if (bmiValue < 29.9) {
      return {
        category: 'Overweight',
        className: 'overweight',
        emoji: '⚠️',
        description: 'Your BMI indicates you may be overweight.',
        tips: [
          '🍎 Focus on whole foods and reduce processed foods',
          '🚶‍♀️ Increase daily physical activity gradually',
          '📏 Practice portion control',
          '📝 Keep a food diary to track eating habits',
          '⏰ Consider intermittent fasting (consult doctor first)'
        ],
        healthRisks: [
          'Increased risk of heart disease',
          'Higher chance of type 2 diabetes',
          'Sleep apnea risk',
          'Joint problems'
        ]
      };
    } else {
      return {
        category: 'Obesity',
        className: 'obesity',
        emoji: '🚨',
        description: 'Your BMI indicates obesity. Consider consulting a healthcare professional.',
        tips: [
          '👩‍⚕️ Consult with a healthcare provider or nutritionist',
          '🏋️‍♂️ Start with low-impact exercises like walking',
          '🥬 Focus on vegetables and lean proteins',
          '💧 Increase water intake and reduce sugary drinks',
          '🎯 Set realistic, small goals for sustainable change'
        ],
        healthRisks: [
          'Significantly increased risk of heart disease',
          'High risk of type 2 diabetes',
          'Stroke risk',
          'Certain types of cancer',
          'Sleep disorders'
        ]
      };
    }
  };

  const calculateBMI = () => {
    if (!weight || !height) {
      alert('Please enter both weight and height');
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    setBmi(bmiValue);
    setCategory(getBMIInfo(parseFloat(bmiValue)));
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="bmi-app">
      <div className="container">
        <div className="header">
          <h1>BMI Health Calculator</h1>
          <p>Calculate your Body Mass Index and get personalized health insights</p>
        </div>

        <div className="calculator-card">
          <div className="input-container">
            <div className="input-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Height (cm)</label>
              <input
                type="number"
                placeholder="Enter your height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="button-container">
            <button onClick={calculateBMI} className="btn btn-primary">
              Calculate BMI
            </button>
            {bmi && (
              <button onClick={resetCalculator} className="btn btn-secondary">
                Reset
              </button>
            )}
          </div>
        </div>

        {bmi && category && (
          <div className={`results-card ${category.className}`}>
            {/* BMI Result Header */}
            <div className="result-header">
              <div className="emoji">{category.emoji}</div>
              <h2 className="bmi-value">Your BMI: {bmi}</h2>
              <p className="bmi-category">{category.category}</p>
              <p className="bmi-description">{category.description}</p>
            </div>

            {/* BMI Scale Visual */}
            <div className="bmi-scale-section">
              <h3>BMI Scale</h3>
              <div className="bmi-scale">
                <div className="scale-bar">
                  <div className="scale-segment underweight-bg">
                    <span>Underweight<br/>&lt;18.5</span>
                  </div>
                  <div className="scale-segment normal-bg">
                    <span>Normal<br/>18.5-24.9</span>
                  </div>
                  <div className="scale-segment overweight-bg">
                    <span>Overweight<br/>25-29.9</span>
                  </div>
                  <div className="scale-segment obesity-bg">
                    <span>Obesity<br/>≥30</span>
                  </div>
                </div>
                <div 
                  className={`bmi-indicator ${category.className}`}
                  style={{ 
                    left: `${Math.min(Math.max((parseFloat(bmi) / 40) * 100, 2), 98)}%`
                  }}
                />
              </div>
            </div>

            <div className="info-grid">
              {/* Health Tips */}
              <div className="info-card">
                <div className="card-header">
                  <span className="icon">🍎</span>
                  <h3>Health Tips</h3>
                </div>
                <ul className="tip-list">
                  {category.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Health Information */}
              <div className="info-card">
                <div className="card-header">
                  <span className="icon">❤️</span>
                  <h3>Health Information</h3>
                </div>
                <ul className="info-list">
                  {category.healthRisks.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lifestyle Recommendations */}
            <div className="lifestyle-section">
              <h3>Recommended Daily Habits</h3>
              <div className="lifestyle-grid">
                <div className="lifestyle-item">
                  <span className="lifestyle-icon">💧</span>
                  <p className="lifestyle-label">Drink Water</p>
                  <p className="lifestyle-detail">8-10 glasses/day</p>
                </div>
                <div className="lifestyle-item">
                  <span className="lifestyle-icon">💪</span>
                  <p className="lifestyle-label">Exercise</p>
                  <p className="lifestyle-detail">30 min/day</p>
                </div>
                <div className="lifestyle-item">
                  <span className="lifestyle-icon">🍎</span>
                  <p className="lifestyle-label">Healthy Food</p>
                  <p className="lifestyle-detail">5 servings fruits/veg</p>
                </div>
                <div className="lifestyle-item">
                  <span className="lifestyle-icon">😴</span>
                  <p className="lifestyle-label">Sleep</p>
                  <p className="lifestyle-detail">7-9 hours</p>
                </div>
              </div>
            </div>

            <div className="disclaimer">
              <p>
                <strong>Disclaimer:</strong> BMI is a general indicator and may not account for muscle mass, bone density, and other factors. 
                Always consult with healthcare professionals for personalized health advice.
              </p>
            </div>
          </div>
        )}

        {!bmi && (
          <div className="empty-state">
            <div className="empty-icon">🏃‍♂️</div>
            <p className="empty-title">Enter your weight and height to get started!</p>
            <p className="empty-subtitle">Get personalized health insights based on your BMI</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calculator;