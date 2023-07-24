import React from 'react';
import Weather from './Weather';

const App = () => {
  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Adjust the height based on your requirement
  };
  return (
    <div style={divStyle}>
      <div>
        <h1>My Weather App</h1>
        <Weather />
      </div>
    </div>
  );
};

export default App;
