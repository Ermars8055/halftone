import React, { useState } from 'react';
import Chatbot from './components /Chatbot';
import Compass from './components /Compass';
import './App.css';

function App() {
  const [coordinates, setCoordinates] = useState(null);

  const handleCoordinatesSubmit = (coords) => {
    setCoordinates(coords);
  };

  const handleGoBack = () => {
    setCoordinates(null);
  };

  return (
    <div className="App">
      {coordinates ? (
        <Compass
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
          onGoBack={handleGoBack}
        />
      ) : (
        <Chatbot onCoordinatesSubmit={handleCoordinatesSubmit} />
      )}
    </div>
  );
}

export default App;
