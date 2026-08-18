import React, { useState } from 'react';

const categories = [
  {
    label: 'Underweight',
    className: 'underweight',
    range: 'Below 18.5',
    min: 0,
    max: 18.5,
    note: 'Your BMI is below the healthy range.',
    advice: ['Add nutrient-rich meals', 'Include protein regularly', 'Consider strength training'],
  },
  {
    label: 'Healthy',
    className: 'healthy',
    range: '18.5 - 24.9',
    min: 18.5,
    max: 24.9,
    note: 'Your BMI is in the healthy range.',
    advice: ['Keep a balanced diet', 'Stay active most days', 'Maintain good sleep habits'],
  },
  {
    label: 'Overweight',
    className: 'overweight',
    range: '25 - 29.9',
    min: 25,
    max: 29.9,
    note: 'Your BMI is above the healthy range.',
    advice: ['Reduce processed foods', 'Increase daily movement', 'Track portions consistently'],
  },
  {
    label: 'Obesity',
    className: 'obesity',
    range: '30 and above',
    min: 30,
    max: 100,
    note: 'Your BMI is in the obesity range.',
    advice: ['Start with low-impact exercise', 'Prioritize vegetables and lean protein', 'Consult a healthcare professional'],
  },
];

function Calculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const getCategory = (bmi) => {
    if (bmi < 18.5) return categories[0];
    if (bmi < 25) return categories[1];
    if (bmi < 30) return categories[2];
    return categories[3];
  };

  const calculateBMI = () => {
    const weightValue = Number(weight);
    const heightValue = Number(height);

    if (!weightValue || !heightValue || weightValue <= 0 || heightValue <= 0) {
      setError('Enter a valid weight and height.');
      setResult(null);
      return;
    }

    const heightInMeters = heightValue / 100;
    const bmi = weightValue / (heightInMeters * heightInMeters);
    const roundedBmi = Number(bmi.toFixed(1));

    setResult({
      bmi: roundedBmi,
      category: getCategory(roundedBmi),
    });
    setError('');
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setResult(null);
    setError('');
  };

  const indicatorPosition = result
    ? Math.min(Math.max((result.bmi / 40) * 100, 3), 97)
    : 0;

  return (
    <main className="bmi-app">
      <section className="hero">
        <div>
          <p className="eyebrow">Health Tool</p>
          <h1>BMI Calculator</h1>
          <p className="hero-text">
            Check your body mass index and see simple, practical health guidance based on your result.
          </p>
        </div>

        <div className="hero-stats">
          <span>Metric</span>
          <span>Fast Result</span>
          <span>Responsive</span>
        </div>
      </section>

      <section className="calculator-layout">
        <div className="calculator-card">
          <div className="card-title">
            <p className="eyebrow">Your Details</p>
            <h2>Calculate BMI</h2>
          </div>

          <div className="input-grid">
            <label>
              <span>Weight</span>
              <div className="input-wrap">
                <input
                  type="number"
                  min="1"
                  placeholder="70"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                />
                <small>kg</small>
              </div>
            </label>

            <label>
              <span>Height</span>
              <div className="input-wrap">
                <input
                  type="number"
                  min="1"
                  placeholder="175"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                />
                <small>cm</small>
              </div>
            </label>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="actions">
            <button className="primary-btn" onClick={calculateBMI}>
              Calculate
            </button>
            <button className="secondary-btn" onClick={resetCalculator}>
              Reset
            </button>
          </div>
        </div>

        <div className={`result-card ${result ? result.category.className : ''}`}>
          {result ? (
            <>
              <p className="eyebrow">Your Result</p>
              <h2>{result.bmi}</h2>
              <h3>{result.category.label}</h3>
              <p>{result.category.note}</p>

              <div className="scale">
                <div className="scale-track">
                  <span className="underweight"></span>
                  <span className="healthy"></span>
                  <span className="overweight"></span>
                  <span className="obesity"></span>
                </div>
                <div className="scale-marker" style={{ left: `${indicatorPosition}%` }}></div>
              </div>

              <ul className="advice-list">
                {result.category.advice.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : (
            <div className="empty-result">
              <p className="eyebrow">Waiting</p>
              <h2>Enter your values</h2>
              <p>Your BMI result and health category will appear here.</p>
            </div>
          )}
        </div>
      </section>

      <section className="category-grid">
        {categories.map((category) => (
          <article key={category.label} className={`category-card ${category.className}`}>
            <h3>{category.label}</h3>
            <p>{category.range}</p>
          </article>
        ))}
      </section>

      <p className="disclaimer">
        BMI is a general screening tool and does not replace advice from a qualified healthcare professional.
      </p>
    </main>
  );
}

export default Calculator;