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
        custom: { accuracy: 99.42, precision: 99.87, recall: 96.85, f1Score: 99.26 },
        sklearn: { accuracy: 99.89, precision: 99.89, recall: 99.84, f1Score: 99.87 }
      },
      'NSL-KDD': {
        custom: { accuracy: 81.46, precision: 96.57, recall: 69.92, f1Score: 81.11 },
        sklearn: { accuracy: 82.23, precision: 96.85, recall: 71.09, f1Score: 81.99 }
      }
    },
    logisticRegression: {
      'KDD Cup \'99': {
        custom: { accuracy: 99.00, precision: 98.40, recall: 99.10, f1Score: 98.75 },
        sklearn: { accuracy: 99.07, precision: 98.55, recall: 99.11, f1Score: 98.83 }
      },
      'NSL-KDD': {
        custom: { accuracy: 72.26, precision: 92.60, recall: 59.65, f1Score: 72.56 },
        sklearn: { accuracy: 76.19, precision: 92.25, recall: 63.51, f1Score: 75.23 }
      }
    },
    svm: {
      'KDD Cup \'99': {
        custom: { accuracy: 98.91, precision: 99.19, recall: 98.05, f1Score: 98.62 },
        sklearn: { accuracy: 99.74, precision: 99.75, recall: 99.59, f1Score: 99.67 }
      },
      'NSL-KDD': {
        custom: { accuracy: 90.09, precision: 92.44, recall: 89.94, f1Score: 91.17 },
        sklearn: { accuracy: 85.39, precision: 96.49, recall: 77.14, f1Score: 85.74 }
      }
    },
    naiveBayes: {
      'KDD Cup \'99': {
        custom: { accuracy: 97.37, precision: 97.81, recall: 95.52, f1Score: 96.65 },
        sklearn: { accuracy: 97.37, precision:98.83, recall: 95.04, f1Score: 96.65 }
      },
      'NSL-KDD': {
        custom: { accuracy: 81.11, precision: 99.51, recall: 61.07, f1Score: 75.69 },
        sklearn: { accuracy: 88.68, precision:97.98, recall: 78.09, f1Score: 86.91 }
      }
    },
    randomForest: {
      'KDD Cup \'99': {
        custom: { accuracy: 99.99, precision: 99.99, recall: 99.98, f1Score: 99.98 },
        sklearn: { ccuracy: 99.99, precision: 99.99, recall: 99.98, f1Score: 99.98 }
      },
      'NSL-KDD': {
        custom: { accuracy: 78.16, precision: 96.13, recall: 64.22, f1Score: 77.00 },
        sklearn: { accuracy: 78.57, precision: 98.86, recall: 64.44, f1Score: 77.39 }
      }
    },
    ann: {
      'KDD Cup \'99': {
        custom: { accuracy: '-', precision: '-', recall: '-', f1Score: '-' },
        pytorch: { accuracy: 99.70, precision: 99.76, recall: 99.50, f1Score: 99.63 }
      },
      'NSL-KDD': {
        custom: { accuracy: '-', precision: '-', recall: '-', f1Score: '-' },
        pytorch: { accuracy: 79.98, precision: 97.5, recall: 66.53, f1Score: 79.09 }
      }
    },
    XGBoost: {
      'KDD Cup \'99': {
        custom: { accuracy: '-', precision: '-', recall: '-', f1Score: '-' },
        sklearn: { accuracy: 99.94, precision: 99.97, recall: 99.89, f1Score: 99.93 }
      },
      'NSL-KDD': {
        custom: { accuracy: '-', precision: '-', recall: '-', f1Score: '-'},
        sklearn: { accuracy: 80.74, precision: 96.89, recall: 68.36, f1Score: 80.16 }
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
      id: 'naiveBayes',
      name: 'Naive Bayes',
      description: 'Probabilistic classifier based on Bayes theorem',
      icon: '🔢',
      color: '#f687b3',
      colabLink: 'https://colab.research.google.com/drive/1yku9CqBrrxv96k9l8TuXhKTtw56Yy21Y?usp=sharing'
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
      icon: '🌲',
      color: '#f56565',
      colabLink: 'https://colab.research.google.com/drive/1a2Cwb1uRFtbH-hm3un1iH93DTVqmv-8N?usp=sharing'
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
            <p>Algorithm Performance Comparison Dashboard </p>
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
                      
                    </div>
                    <span>Open in Colab</span>
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