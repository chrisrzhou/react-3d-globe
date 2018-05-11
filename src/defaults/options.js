export default {
  camera: {
    fieldOfView: 50,
    near: 1,
    positionX: 0,
    positionY: 0,
    radiusScale: 4,
  },

  orbitControls: {
    autoRotate: true,
    autoRotateSpeed: 0.05,
    rotateSpeed: 0.05,
    enableDamping: true,
    dampingFactor: 0.1,
    enablePan: false,
    enableZoom: true,
    zoomSpeed: 1,
    minPolarAngle: Math.PI * 3 / 16,
    maxPolarAngle: Math.PI * 10 / 16,
  },
  globe: {
    segments: 50,
    rings: 50,
    rotationSpeed: 0.001,
    positionZ: 0,
  },
  renderer: {
    antialias: true,
  },
};
