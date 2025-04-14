// AboutTab.jsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AboutTab({ metricsData, algorithms }) {
  const [activeTab, setActiveTab] = useState('about'); // 'about', 'datasets', 'algorithms', 'comparison', 'detailed-comparison'
  const [expanded, setExpanded] = useState({});
  
  // Toggle expansion state for a specific algorithm and dataset
  const toggleExpand = (algorithm, dataset) => {
    const key = `${algorithm}-${dataset}`;
    setExpanded(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  // Extract F1 scores from metrics data for comparison charts
  const prepareF1ScoreData = () => {
    // For KDD Cup
    const kddF1Data = Object.keys(metricsData).map(algoId => {
      const algoData = metricsData[algoId]['KDD Cup \'99'];
      
      // Get the best F1 score (either custom or sklearn)
      const customF1 = algoData.custom?.f1Score !== '-' ? parseFloat(algoData.custom.f1Score) : 0;
      const sklearnF1 = algoData.sklearn?.f1Score !== '-' ? parseFloat(algoData.sklearn.f1Score) : 0;
      const bestF1 = Math.max(customF1, sklearnF1);
      
      // Get the algorithm name by converting camelCase to Title Case
      const algoName = algoId.replace(/([A-Z])/g, ' $1')
                             .replace(/^./, str => str.toUpperCase());
      
      return {
        name: algoName,
        f1Score: bestF1
      };
    });
    
    // For NSL-KDD
    const nslF1Data = Object.keys(metricsData).map(algoId => {
      const algoData = metricsData[algoId]['NSL-KDD'];
      
      // Get the best F1 score (either custom or sklearn)
      const customF1 = algoData.custom?.f1Score !== '-' ? parseFloat(algoData.custom.f1Score) : 0;
      const sklearnF1 = algoData.sklearn?.f1Score !== '-' ? parseFloat(algoData.sklearn.f1Score) : 0;
      const bestF1 = Math.max(customF1, sklearnF1);
      
      // Get the algorithm name by converting camelCase to Title Case
      const algoName = algoId.replace(/([A-Z])/g, ' $1')
                             .replace(/^./, str => str.toUpperCase());
      
      return {
        name: algoName,
        f1Score: bestF1
      };
    });
    
    return { kddF1Data, nslF1Data };
  };
  
  const { kddF1Data, nslF1Data } = prepareF1ScoreData();

  // Function to determine the color class based on accuracy
  const getAccuracyClass = (accuracy) => {
    if (accuracy === '-') return 'metric-low';
    if (parseFloat(accuracy) >= 95) return 'metric-high';
    if (parseFloat(accuracy) >= 90) return 'metric-medium';
    return 'metric-low';
  };

  // Function to show only desired implementation for certain algorithms
  const showImplementation = (algorithmId, implementationType) => {
    if (algorithmId === 'knn' || algorithmId === 'XGBoost') {
      return implementationType === 'sklearn';
    } else if (algorithmId === 'ann') {
      return implementationType === 'custom';
    }
    return true;
  };

  // Helper function to chunk the array into pairs
  const chunkArray = (array, size) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  };

  // Group algorithms into pairs for detailed comparison view
  const algorithmPairs = chunkArray(algorithms, 2);
  
  const datasets = ['KDD Cup \'99', 'NSL-KDD'];
  
  return (
    <div className="about-tab">
      <div className="about-header">
        <h1>Network Intrusion Detection System</h1>
        <p> Project on Machine Learning Approaches for Network Security</p>
      </div>
      
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          Project Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'datasets' ? 'active' : ''}`}
          onClick={() => setActiveTab('datasets')}
        >
          Datasets
        </button>
        <button 
          className={`tab-button ${activeTab === 'algorithms' ? 'active' : ''}`}
          onClick={() => setActiveTab('algorithms')}
        >
          Algorithms
        </button>
        <button 
          className={`tab-button ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          Performance Comparison
        </button>
        <button 
          className={`tab-button ${activeTab === 'detailed-comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('detailed-comparison')}
        >
          Detailed Comparison
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'about' && (
          <div className="about-content">
            <h2>About This Project</h2>
            <p>This Network Intrusion Detection System (NIDS) dashboard presents the results of our research project that explores various machine learning algorithms for detecting network intrusions. We've implemented and compared multiple algorithms on benchmark datasets to evaluate their effectiveness in identifying malicious network traffic.</p>
            
            <h3>Project Goals</h3>
            <ul>
              <li>Implement and evaluate multiple ML algorithms for network intrusion detection</li>
              <li>Compare performance on standard network security datasets</li>
              <li>Analyze both custom and scikit-learn implementations</li>
              <li>Identify the most effective approaches for practical NIDS applications</li>
            </ul>
            
            <h3>Methodology</h3>
            <p>Our approach involves preprocessing the datasets, extracting relevant features, and training various machine learning models. For most algorithms, we implemented both custom versions from scratch and scikit-learn versions to compare the performance differences. We evaluated each algorithm using standard metrics including accuracy, precision, recall, and F1-score.</p>
            
            <p>This dashboard serves as a comparison tool to showcase the results of our experiments and provide insights into which algorithms perform best for network intrusion detection tasks.</p>
          </div>
        )}
        
        {activeTab === 'datasets' && (
          <div className="datasets-content">
            <h2>Datasets Used</h2>
            
            <div className="dataset-card">
              <h3>KDD Cup '99</h3>
              <p>The KDD Cup '99 dataset is a widely used benchmark dataset for network intrusion detection systems. It was created based on the 1998 DARPA Intrusion Detection Evaluation Program and contains a standard set of data that includes a wide variety of intrusions simulated in a military network environment.</p>
              
              <h4>Dataset Characteristics:</h4>
              <ul>
                <li><strong>Size:</strong> Approximately 4.9 million connection records</li>
                <li><strong>Features:</strong> 41 features per connection</li>
                <li><strong>Attack Types:</strong> 4 main categories (DoS, R2L, U2R, and Probing) with 24 specific attack types</li>
                <li><strong>Year:</strong> 1999</li>
              </ul>
              
              <p>Despite its age, KDD Cup '99 remains a standard benchmark in the research community, allowing for comparison with established results.</p>
            </div>
            
            <div className="dataset-card">
              <h3>NSL-KDD</h3>
              <p>NSL-KDD is a refined version of the original KDD Cup '99 dataset, created to address some of the inherent problems in the original dataset. It eliminates redundant records and balances the distribution of attack types to provide a more representative sample for training and testing.</p>
              
              <h4>Dataset Characteristics:</h4>
              <ul>
                <li><strong>Size:</strong> Significantly reduced from KDD Cup '99, removing redundant records</li>
                <li><strong>Features:</strong> Same 41 features as KDD Cup '99</li>
                <li><strong>Balance:</strong> Better distribution of attack types and normal traffic</li>
                <li><strong>Year:</strong> 2009</li>
              </ul>
              
              <p>NSL-KDD presents a more challenging and realistic testing ground for intrusion detection systems, as it addresses some of the criticisms of the original KDD dataset.</p>
            </div>
            
            <h3>Data Preprocessing</h3>
            <p>For both datasets, we applied the following preprocessing steps:</p>
            <ul>
              <li>Handling duplicate values</li>
              <li>Feature scaling and normalization</li>
              <li>Encoding categorical variables</li>
              <li>Feature selection to identify the most relevant attributes</li>
              <li>Train-test splitting with stratification to maintain class distribution</li>
            </ul>
          </div>
        )}
        
        {activeTab === 'algorithms' && (
          <div className="algorithms-content">
            <h2>Algorithms Implemented</h2>
            <p>We implemented and evaluated the following machine learning algorithms for network intrusion detection:</p>
            
            <div className="algorithm-grid">
              <div className="algorithm-item">
                <h3>Support Vector Machine (SVM)</h3>
                <p>SVM finds the optimal hyperplane for separating normal and intrusive network traffic. It's particularly effective for high-dimensional data and can handle complex decision boundaries.</p>
                <p><strong>Implementation:</strong> Both custom (from scratch) and scikit-learn</p>
              </div>
              
              <div className="algorithm-item">
                <h3>Naive Bayes</h3>
                <p>A probabilistic classifier based on Bayes' theorem that assumes feature independence. It's computationally efficient and works well with high-dimensional data.</p>
                <p><strong>Implementation:</strong> Both custom (from scratch) and scikit-learn</p>
              </div>
              
              <div className="algorithm-item">
                <h3>Decision Tree</h3>
                <p>A non-parametric supervised learning method used for classification that creates a model that predicts the value of a target variable by learning simple decision rules inferred from data features.</p>
                <p><strong>Implementation:</strong> Both custom (from scratch) and scikit-learn</p>
              </div>
              
              <div className="algorithm-item">
                <h3>K-Nearest Neighbors (KNN)</h3>
                <p>Classification based on proximity to known data points. KNN determines the class of a data point based on the classes of its k nearest neighbors.</p>
                <p><strong>Implementation:</strong> scikit-learn</p>
              </div>
              
              <div className="algorithm-item">
                <h3>Random Forest</h3>
                <p>An ensemble learning method using multiple decision trees to improve classification performance and reduce overfitting.</p>
                <p><strong>Implementation:</strong> Both custom (from scratch) and scikit-learn</p>
              </div>
              
              <div className="algorithm-item">
                <h3>Logistic Regression</h3>
                <p>A statistical model that uses a logistic function to model a binary dependent variable. Despite its simplicity, it can be effective for intrusion detection.</p>
                <p><strong>Implementation:</strong> Both custom (from scratch) and scikit-learn</p>
              </div>
              
              <div className="algorithm-item">
                <h3>Artificial Neural Network (ANN)</h3>
                <p>A deep learning model inspired by the human brain, consisting of interconnected nodes organized in layers that can learn complex patterns in data.</p>
                <p><strong>Implementation:</strong> Custom PyTorch implementation</p>
              </div>
              
              <div className="algorithm-item">
                <h3>XGBoost</h3>
                <p>An optimized distributed gradient boosting library that implements machine learning algorithms under the Gradient Boosting framework, known for its high performance.</p>
                <p><strong>Implementation:</strong> scikit-learn</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'comparison' && (
          <div className="comparison-content">
            <h2>Performance Comparison</h2>
            <p>The charts below compare the F1-score performance of different algorithms on both the KDD Cup '99 and NSL-KDD datasets. F1-score is chosen as the primary metric as it balances precision and recall, providing a comprehensive measure of each algorithm's effectiveness.</p>
            
            <div className="chart-container">
              <h3>KDD Cup '99 - F1 Score Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={kddF1Data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                  />
                  <YAxis 
                    domain={[90, 100]} 
                    label={{ value: 'F1 Score (%)', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'F1 Score']} />
                  <Legend verticalAlign="top" />
                  <Bar dataKey="f1Score" name="F1 Score" fill="#4285F4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart-container">
              <h3>NSL-KDD - F1 Score Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={nslF1Data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                  />
                  <YAxis 
                    domain={[70, 95]} 
                    label={{ value: 'F1 Score (%)', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip formatter={(value) => [`${value.toFixed(2)}%`, 'F1 Score']} />
                  <Legend verticalAlign="top" />
                  <Bar dataKey="f1Score" name="F1 Score" fill="#34A853" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="findings">
              <h3>Key Findings</h3>
              <ul>
                <li>Random Forest and XGBoost demonstrate the highest F1 scores on the KDD Cup '99 dataset, approaching 99.98%</li>
                <li>Support Vector Machine (SVM) performs best on the NSL-KDD dataset with an F1 score of 91.17% (custom implementation)</li>
                <li>The NSL-KDD dataset presents a more challenging classification task overall, with consistently lower performance across all algorithms</li>
                <li>Decision Trees and ensemble methods (Random Forest, XGBoost) show strong performance across both datasets</li>
                <li>For most algorithms, the scikit-learn implementations outperform the custom implementations, though the performance gap is small in many cases</li>
              </ul>
          
            </div>
          </div>
        )}

        {activeTab === 'detailed-comparison' && (
          <div className="detailed-comparison-content">
            <h2>Detailed Algorithm Comparison</h2>
            <p>This section provides detailed performance metrics for each algorithm across both datasets. You can expand each algorithm to view its specific performance on each dataset.</p>
            
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
                                {showImplementation(algorithm.id, 'custom') && (
                                  <div className="implementation-section">
                                    <h4 className="implementation-title">
                                      {algorithm.id === 'ann' ? 'PyTorch Implementation' : 'Custom Implementation'}
                                    </h4>
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
                                )}
                                
                                {showImplementation(algorithm.id, 'sklearn') && (
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
                                )}
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
        )}
      </div>
    </div>
  );
}

export default AboutTab;