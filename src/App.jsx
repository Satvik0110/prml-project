// App.jsx
import React, { useState } from 'react';
import './Dashboard.css';

function App() {
  // State to track which algorithm and dataset combination is expanded
  const [expanded, setExpanded] = useState({});

  // Toggle expansion state for a specific algorithm and dataset
  const toggleExpand = (algorithm, dataset) => {
    const key = `${algorithm}-${dataset}`;
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Sample metrics data (would come from your backend in a real application)
  const metricsData = {
    knn: {
      'KDD Cup \'99': {
        custom: { accuracy: '-', precision: '-', recall: '-', f1Score: '-' },
        sklearn: { accuracy: 99.81, precision: 99.74, recall: 99.78, f1Score: 99.76 }
      },
      'NSL-KDD': {
        custom: { accuracy: '-', precision: '-', recall: '-', f1Score: '-' },
        sklearn: { accuracy: 78.87, precision: 97.36, recall: 64.64, f1Score: 77.69 }
      }
    },
    decisionTree: {
      'KDD Cup \'99': {
        custom: { accuracy: 95.6, precision: 94.7, recall: 96.2, f1Score: 95.4 },
        sklearn: { accuracy: 94.9, precision: 94.1, recall: 95.4, f1Score: 94.7 }
      },
      'NSL-KDD': {
        custom: { accuracy: 94.8, precision: 93.9, recall: 95.3, f1Score: 94.6 },
        sklearn: { accuracy: 94.2, precision: 93.1, recall: 94.7, f1Score: 93.9 }
      }
    },
    logisticRegression: {
      'KDD Cup \'99': {
        custom: { accuracy: 99.00, precision: 98.40, recall: 99.10, f1Score: 98.75 },
        sklearn: { accuracy: 99.07, precision: 98.55, recall: 99.11, f1Score: 98.83 }
      },
      'NSL-KDD': {
        custom: { accuracy: 72.26, precision: 92.63, recall: 55.70, f1Score: 69.57 },
        sklearn: { accuracy: 76.19, precision: 92.25, recall: 63.51, f1Score: 75.23 }
      }
    },
    svm: {
      'KDD Cup \'99': {
        custom: { accuracy: 93.8, precision: 93.1, recall: 92.5, f1Score: 92.8 },
        sklearn: { accuracy: 93.0, precision: 92.4, recall: 91.8, f1Score: 92.1 }
      },
      'NSL-KDD': {
        custom: { accuracy: 92.7, precision: 92.0, recall: 91.4, f1Score: 91.7 },
        sklearn: { accuracy: 92.0, precision: 91.3, recall: 90.7, f1Score: 91.0 }
      }
    },
    naiveBayes: {
      'KDD Cup \'99': {
        custom: { accuracy: 89.5, precision: 88.9, recall: 87.4, f1Score: 88.1 },
        sklearn: { accuracy: 88.9, precision: 88.2, recall: 86.7, f1Score: 87.4 }
      },
      'NSL-KDD': {
        custom: { accuracy: 88.6, precision: 87.7, recall: 86.3, f1Score: 87.0 },
        sklearn: { accuracy: 87.9, precision: 87.0, recall: 85.8, f1Score: 86.4 }
      }
    },
    randomForest: {
      'KDD Cup \'99': {
        custom: { accuracy: 99.97, precision: 99.99, recall: 99.98, f1Score: 99.98 },
        sklearn: { accuracy: 97.6, precision: 97.1, recall: 96.9, f1Score: 97.0 }
      },
      'NSL-KDD': {
        custom: { accuracy: 97.5, precision: 97.1, recall: 96.8, f1Score: 96.9 },
        sklearn: { accuracy: 96.8, precision: 96.4, recall: 96.1, f1Score: 96.2 }
      }
    },
    ann: {
      'KDD Cup \'99': {
        custom: { accuracy: 97.8, precision: 97.4, recall: 96.9, f1Score: 97.1 },
        sklearn: { accuracy: 97.1, precision: 96.7, recall: 96.2, f1Score: 96.4 }
      },
      'NSL-KDD': {
        custom: { accuracy: 96.9, precision: 96.5, recall: 96.0, f1Score: 96.2 },
        sklearn: { accuracy: 96.2, precision: 95.8, recall: 95.3, f1Score: 95.5 }
      }
    },
    XGBoost: {
      'KDD Cup \'99': {
        custom: { accuracy: 99.5, precision: 99.3, recall: 99.4, f1Score: 99.35 },
        sklearn: { accuracy: 99.3, precision: 99.1, recall: 99.2, f1Score: 99.15 }
      },
      'NSL-KDD': {
        custom: { accuracy: 98.3, precision: 98.0, recall: 97.9, f1Score: 97.95 },
        sklearn: { accuracy: 98.0, precision: 97.7, recall: 97.6, f1Score: 97.65 }
      }
    }
  };

  // Algorithm card data
  const algorithms = [
    {
      id: 'svm',
      name: 'Support Vector Machine',
      description: 'Finds optimal hyperplane for classification and is our best model',
      icon: '🔍',
      color: '#667eea',
      colabLink: 'https://colab.research.google.com/drive/1eYhKAwThZHkagpO5R51JAJKIvMsiah06?usp=sharing'
    },
    {
      id: 'decisionTree',
      name: 'Decision Tree',
      description: 'Tree-like model of decisions and their consequences',
      icon: '🌳',
      color: '#48bb78',
      colabLink: 'https://colab.research.google.com/drive/1BOgiS0MWGhL0lbDYjd4nHXcSjGIgpfXM?usp=sharing'
    },
    {
      id: 'XGBoost',
      name: 'XGboost',
      description: 'Ensemble learning method using decision trees',
      icon: '🔄',
      color: '#f56565',
      colabLink: 'https://colab.research.google.com/drive/xgboost-example'
    },
    {
      id: 'ann',
      name: 'Artificial Neural Network',
      description: 'Deep learning model inspired by the human brain',
      icon: '🧠',
      color: '#9f7aea',
      colabLink: 'https://colab.research.google.com/drive/1JHi1YIkdRzoDTfhcIiFOFdf1oSEfPkc4?usp=sharing'
    },
    {
      id: 'naiveBayes',
      name: 'Naive Bayes',
      description: 'Probabilistic classifier based on Bayes theorem',
      icon: '🔢',
      color: '#f687b3',
      colabLink: 'https://colab.research.google.com/drive/1yku9CqBrrxv96k9l8TuXhKTtw56Yy21Y?usp=sharing'
    },
    {
      id: 'knn',
      name: 'K-Nearest Neighbors',
      description: 'Classification based on proximity to known data points',
      icon: '📊',
      color: '#4299e1',
      colabLink: 'https://colab.research.google.com/drive/1mBoUunSIVIC1syGF94s6SK6lICDiNjXY?usp=sharing'
    },
    {
      id: 'randomForest',
      name: 'Random Forest',
      description: 'Ensemble learning method using decision trees',
      icon: '🌲',
      color: '#68d391',
      colabLink: 'https://colab.research.google.com/drive/180I6STLrAdEBjOmpWrAUuRHTncu-80zN?usp=sharing'
    },
    {
      id: 'logisticRegression',
      name: 'Logistic Regression',
      description: 'Statistical model for binary classification',
      icon: '📈',
      color: '#ed8936',
      colabLink: 'https://colab.research.google.com/drive/1N3kKUM9vxdUP1eA24GC1mPfeH6x8mkt2?usp=sharing'
    }
  ];

  const datasets = ['KDD Cup \'99', 'NSL-KDD'];

  // Function to determine the color class based on accuracy
  const getAccuracyClass = (accuracy) => {
    if (accuracy >= 95) return 'metric-high';
    if (accuracy >= 90) return 'metric-medium';
    return 'metric-low';
  };

  // Helper function to chunk the array into pairs
  const chunkArray = (array, size) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  // Group algorithms into pairs
  const algorithmPairs = chunkArray(algorithms, 2);

  return (
    <div className="dashboard">
      <div className="container">
        <header className="header">
          <div className="title-section">
            <h1>Network Intrusion Detection System</h1>
            <p>Algorithm Performance Comparison Dashboard</p>
          </div>
        </header>

        {algorithmPairs.map((pair, pairIndex) => (
          <div key={pairIndex} className="card-row">
            {pair.map((algorithm) => (
              <div 
                key={algorithm.id}
                className="algorithm-card"
                style={{'--card-accent-color': algorithm.color}}
              >
                <div className="card-header">
                  <div className="header-content">
                    <h2>{algorithm.name}</h2>
                    <span className="algorithm-icon">{algorithm.icon}</span>
                  </div>
                  <p>{algorithm.description}</p>
                  <a href={algorithm.colabLink} target="_blank" rel="noopener noreferrer" className="colab-link algorithm-colab-link">
                    <div className="link-icon">
                      <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.11 15.39l-3.88-3.89 3.88-3.89c.39-.39.39-1.02 0-1.41a.9959.9959 0 00-1.41 0l-4.59 4.59c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z" fill="#e8710a"/>
                        <path d="M12.11 15.39l3.88-3.89-3.88-3.89c-.39-.39-.39-1.02 0-1.41a.9959.9959 0 011.41 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z" fill="#f9ab00"/>
                        <path d="M16 6h-3c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1s-.45 1-1 1zM16 20h-3c-.55 0-1-.45-1-1s.45-1 1-1h3c.55 0 1 .45 1 1s-.45 1-1 1z" fill="#e8710a"/>
                      </svg>
                    </div>
                    <span>Google Colab</span>
                  </a>
                </div>

                <div className="card-content">
                  {datasets.map((dataset) => (
                    <div key={`${algorithm.id}-${dataset}`} className="dataset-section">
                      <button
                        onClick={() => toggleExpand(algorithm.id, dataset)}
                        className="dataset-button"
                      >
                        <span>{dataset}</span>
                        <span>{expanded[`${algorithm.id}-${dataset}`] ? '▲' : '▼'}</span>
                      </button>

                      {expanded[`${algorithm.id}-${dataset}`] && (
                        <div className="metrics-panel">
                          <div className="implementation-tabs">
                            <div className="implementation-section">
                              <h4 className="implementation-title">Custom Implementation</h4>
                              <div className="metrics-grid">
                                <div className={`metric ${getAccuracyClass(metricsData[algorithm.id][dataset].custom.accuracy)}`}>
                                  <div className="metric-label">Accuracy</div>
                                  <div className="metric-value">{metricsData[algorithm.id][dataset].custom.accuracy}%</div>
                                </div>
                                <div className="metric metric-precision">
                                  <div className="metric-label">Precision</div>
                                  <div className="metric-value">{metricsData[algorithm.id][dataset].custom.precision}%</div>
                                </div>
                                <div className="metric metric-recall">
                                  <div className="metric-label">Recall</div>
                                  <div className="metric-value">{metricsData[algorithm.id][dataset].custom.recall}%</div>
                                </div>
                                <div className="metric metric-f1">
                                  <div className="metric-label">F1 Score</div>
                                  <div className="metric-value">{metricsData[algorithm.id][dataset].custom.f1Score}%</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="implementation-section">
                              <h4 className="implementation-title">Scikit-learn Implementation</h4>
                              <div className="metrics-grid">
                                <div className={`metric ${getAccuracyClass(metricsData[algorithm.id][dataset].sklearn.accuracy)}`}>
                                  <div className="metric-label">Accuracy</div>
                                  <div className="metric-value">{metricsData[algorithm.id][dataset].sklearn.accuracy}%</div>
                                </div>
                                <div className="metric metric-precision">
                                  <div className="metric-label">Precision</div>
                                  <div className="metric-value">{metricsData[algorithm.id][dataset].sklearn.precision}%</div>
                                </div>
                                <div className="metric metric-recall">
                                  <div className="metric-label">Recall</div>
                                  <div className="metric-value">{metricsData[algorithm.id][dataset].sklearn.recall}%</div>
                                </div>
                                <div className="metric metric-f1">
                                  <div className="metric-label">F1 Score</div>
                                  <div className="metric-value">{metricsData[algorithm.id][dataset].sklearn.f1Score}%</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <footer className="footer">
        <p>PRML Project © 2025 | <a href="https://github.com/Shivam2Goyal/Network-Intrusion-Detector" target='_blank' className="footer-link">Github</a> </p>
      </footer>
    </div>
  );
}

export default App;