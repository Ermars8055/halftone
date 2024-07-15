// src/utils/compassUtils.js
export const calculateDegreeToPoint = (latitude, longitude, destinationLatitude, destinationLongitude) => {
    const phiK = (destinationLatitude * Math.PI) / 180.0;
    const lambdaK = (destinationLongitude * Math.PI) / 180.0;
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
  