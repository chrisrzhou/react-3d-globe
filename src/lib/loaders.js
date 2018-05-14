import * as THREE from 'three';

export const loadTexture = image => {
  const loader = new THREE.TextureLoader();
  if (image instanceof HTMLImageElement) {
    return loader.load(image.src);
  }
  return loader.load(image);
};
