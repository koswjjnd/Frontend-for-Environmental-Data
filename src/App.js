import React, { useState } from 'react';
import ChartComponent from './ChartComponent';
import Button from '@material-ui/core/Button';

function App() {
  const [showCharts, setShowCharts] = useState(false);
  if (showCharts) {
    return (
      <div className="App">
        <h1>Consumption Data Charts</h1>
        <ChartComponent />
  
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img src="https://static.vecteezy.com/system/resources/previews/010/925/820/non_2x/colorful-welcome-design-template-free-vector.jpg" alt="Welcome" style={{ width: '50%', height: 'auto' }} />
      <h1>Welcome to Factory Environmental Data</h1>
      <p>Explore comprehensive environmental data across various factory operations.</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowCharts(true)}
      >
        View Consumption Data Charts
      </Button>
    </div>
  );

}

export default App;
