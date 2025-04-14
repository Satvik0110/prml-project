// App.jsx
import React from 'react';
import './Dashboard.css';
import './AboutTab.css';
import AboutTab from './AboutTab';

function App() {
  // Metrics data remains the same
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
        custom: { accuracy: 99.00, precision: 99.10, recall: 98.40, f1Score: 98.75 },
        sklearn: { accuracy: 99.07, precision: 98.55, recall: 99.11, f1Score: 98.83 }
      },
      'NSL-KDD': {
        custom: { accuracy: 74.32, precision: 92.60, recall: 59.65, f1Score: 72.56 },
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
        sklearn: { accuracy: 97.37, precision: 98.33, recall: 95.04, f1Score: 96.65 }
      },
      'NSL-KDD': {
        custom: { accuracy: 81.11, precision: 99.51, recall: 61.07, f1Score: 75.69 },
        sklearn: { accuracy: 88.68, precision: 97.98, recall: 78.09, f1Score: 86.91 }
      }
    },
    randomForest: {
      'KDD Cup \'99': {
        custom: { accuracy: 99.99, precision: 99.99, recall: 99.98, f1Score: 99.98 },
        sklearn: { accuracy: 99.99, precision: 99.99, recall: 99.98, f1Score: 99.98 }
      },
      'NSL-KDD': {
        custom: { accuracy: 78.16, precision: 96.13, recall: 64.22, f1Score: 77.00 },
        sklearn: { accuracy: 78.57, precision: 96.86, recall: 64.44, f1Score: 77.39 }
      }
    },
    ann: {
      'KDD Cup \'99': {
        custom: { accuracy: 99.70, precision: 99.76, recall: 99.50, f1Score: 99.63 },
        sklearn: { accuracy: '-', precision: '-', recall: '-', f1Score: '-' }
      },
      'NSL-KDD': {
        custom: { accuracy: 79.98, precision: 97.5, recall: 66.53, f1Score: 79.09 },
        sklearn: { accuracy: '-', precision: '-', recall: '-', f1Score: '-' }
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
      colabLink: 'https://colab.research.google.com/drive/1oogHImE2xgGhQdkKggjW1EbAJbdaXMlg?usp=sharing'
    }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        {/* Pass both metrics data and algorithms to AboutTab */}
        <AboutTab metricsData={metricsData} algorithms={algorithms} />
      </div>
      <footer className="footer">
        <p>PRML Project © 2025 | <a href="https://github.com/Shivam2Goyal/Network-Intrusion-Detector" target="_blank" rel="noopener noreferrer" className="footer-link">Github</a></p>
      </footer>
    </div>
  );
}

export default App;