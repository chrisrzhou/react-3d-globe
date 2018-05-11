export const cameraOptions = {
  fieldOfView: 50,
  near: 1,
  positionX: 0,
  positionY: 0,
  radiusScale: 4,
};

export const controlOptions = {
  autoRotate: false,
  autoRotateSpeed: 0.05,
  rotateSpeed: 0.05,
  enableDamping: true,
  dampingFactor: 0.1,
  enablePan: false,
  enableZoom: true,
  zoomSpeed: 1,
  minPolarAngle: Math.PI * 7 / 16,
  maxPolarAngle: Math.PI * 9 / 16,
};

export const globeOptions = {
  segments: 50,
  rings: 50,
  rotationSpeed: 0.001,
  positionZ: 0,
};

export const rendererOptions = {
  antialias: true,
};

export const sceneOptions = {
  backgroundColor: null,
};
