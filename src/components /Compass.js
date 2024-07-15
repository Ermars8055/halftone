import React, { useState, useEffect } from 'react';
import './Compass.css';

const Compass = ({ latitude, longitude, onGoBack }) => {
  const [pointDegree, setPointDegree] = useState(null);

  useEffect(() => {
    const locationHandler = (position) => {
      const { latitude: currentLatitude, longitude: currentLongitude } = position.coords;
      const degree = calcDegreeToPoint(currentLatitude, currentLongitude);
      setPointDegree(degree < 0 ? degree + 360 : degree);
    };

    const handler = (e) => {
      const compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      document.querySelector('.compass-circle').style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;

      if (
        (pointDegree < Math.abs(compass) && pointDegree + 15 > Math.abs(compass)) ||
        pointDegree > Math.abs(compass + 15) ||
        pointDegree < Math.abs(compass)
      ) {
        document.querySelector('.my-point').style.opacity = 0;
      } else if (pointDegree) {
        document.querySelector('.my-point').style.opacity = 1;
      }
    };

    navigator.geolocation.getCurrentPosition(locationHandler);
    window.addEventListener('deviceorientation', handler, true);

    return () => {
      window.removeEventListener('deviceorientation', handler, true);
    };
  }, [pointDegree]);

  const calcDegreeToPoint = (latitude, longitude) => {
    const phiK = (latitude * Math.PI) / 180.0;
    const lambdaK = (longitude * Math.PI) / 180.0;
    const phi = (latitude * Math.PI) / 180.0;
    const lambda = (longitude * Math.PI) / 180.0;
    const psi =
      (180.0 / Math.PI) *
      Math.atan2(
        Math.sin(lambdaK - lambda),
        Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
      );
    return Math.round(psi);
  };

  return (
    <div className="compass-container">
      <div className="compass">
        <div className="arrow"></div>
        <div className="compass-circle"></div>
        <div className="my-point"></div>
        <div className="direction-text">
          {/* Add your logic here to show directional guidance */}
          {/* Example: */}
          <p>Move forward towards the building</p>
        </div>
      </div>
      <button className="go-back" onClick={onGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default Compass;
