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
    enablePan: true,
    enableZoom: false,
    enableRotate: true,
    zoomSpeed: 1,
    minPolarAngle: Math.PI * 7 / 16,
    maxPolarAngle: Math.PI * 9 / 16,
  },
  globe: {
    isFocused: true,
    widthSegments: 50,
    heightSegments: 50,
    type: 'low-poly',
  },
  space: {
    radius: 5000,
    widthSegments: 50,
    heightSegments: 50,
  },
  renderer: {
    antialias: true,
  },
};
