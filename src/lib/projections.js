import * as THREE from 'three';

export const latLongToVector = (lat, lon, radius, height = 0) => {
  const phi = lat * Math.PI / 180;
  const theta = (lon - 180) * Math.PI / 180;

  const x = -(radius + height) * Math.cos(phi) * Math.cos(theta);
  const y = (radius + height) * Math.sin(phi);
  const z = (radius + height) * Math.cos(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};
