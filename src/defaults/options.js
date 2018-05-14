export default {
  camera: {
    far: 20000,
    near: 1,
    positionX: 0,
    positionY: 0,
    radiusScale: 4,
    viewAngle: 45,
  },
  orbitControls: {
    autoRotate: true,
    autoRotateSpeed: 0.05,
    rotateSpeed: 0.05,
    enableDamping: true,
    dampingFactor: 0.1,
    enablePan: false,
    enableZoom: false,
    enableRotate: true,
    zoomSpeed: 1,
    minPolarAngle: Math.PI * 4 / 16,
    maxPolarAngle: Math.PI * 6 / 16,
  },
  globe: {
    segments: 50,
    rings: 50,
  },
  renderer: {
    antialias: true,
  },
};
