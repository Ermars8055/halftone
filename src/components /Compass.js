import React, { useState, useEffect } from 'react';
import './Compass.css';
import { calculateDegreeToPoint } from '../Utlis/compassUtils'; // Import your utility function

const Compass = ({ latitude, longitude, destinationLatitude, destinationLongitude, onGoBack }) => {
  const [pointDegree, setPointDegree] = useState(null);
  const [direction, setDirection] = useState('');
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(locationHandler);
    window.addEventListener('deviceorientation', handler, true);
  }, []);

  useEffect(() => {
    if (latitude && longitude && destinationLatitude && destinationLongitude) {
      const degree = calculateDegreeToPoint(latitude, longitude, destinationLatitude, destinationLongitude);
      setPointDegree(degree < 0 ? degree + 360 : degree);

      const dist = calculateDistance(latitude, longitude, destinationLatitude, destinationLongitude);
      setDistance(dist);

      setDirection(getDirection(degree));
    }
  }, [latitude, longitude, destinationLatitude, destinationLongitude]);

  const locationHandler = (position) => {
    const { latitude: currentLatitude, longitude: currentLongitude } = position.coords;
    const degree = calculateDegreeToPoint(currentLatitude, currentLongitude, destinationLatitude, destinationLongitude);
    setPointDegree(degree < 0 ? degree + 360 : degree);

    const dist = calculateDistance(currentLatitude, currentLongitude, destinationLatitude, destinationLongitude);
    setDistance(dist);

    setDirection(getDirection(degree));
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 1000; // Distance in meters
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const getDirection = (degree) => {
    if (degree >= 0 && degree < 45) {
      return 'North';
    } else if (degree >= 45 && degree < 135) {
      return 'East';
    } else if (degree >= 135 && degree < 225) {
      return 'South';
    } else if (degree >= 225 && degree < 315) {
      return 'West';
    } else {
      return 'North';
    }
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

  return (
    <div className="compass-container">
      <div className="compass">
        <div className="arrow"></div>
        <div className="compass-circle"></div>
        <div className="my-point"></div>
      </div>
      <div className="compass-direction">
        {direction && <p>Direction: {direction}</p>}
        {distance && <p>Distance: {distance.toFixed(2)} meters</p>}
      </div>
      <button className="go-back" onClick={onGoBack}>
        Go Back
      </button>
    </div>
  );
};

export default Compass;
