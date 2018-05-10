import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

import Marker from './Marker';
import {
  cameraOptions,
  controlsOptions,
  globeOptions,
  pointLightOptions,
  rendererOptions,
  sceneOptions,
} from './options';

class Globe {
  constructor(radius, textureURL) {
    this.radius = radius || 600;
    this.textureURL =
      textureURL ||
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57735/land_ocean_ice_cloud_2048.jpg';

    // create point light
    const pointLight = new THREE.PointLight(pointLightOptions.color);
    pointLight.position.set(
      pointLightOptions.positionX,
      pointLightOptions.positionY,
      pointLightOptions.positionZ,
    );

    // create camera
    const cameraDistance = radius * cameraOptions.radiusScale;
    const camera = new THREE.PerspectiveCamera(
      cameraOptions.fieldOfView,
      1,
      cameraOptions.near,
      cameraDistance,
    );
    camera.position.set(
      cameraOptions.positionX,
      cameraOptions.positionY,
      cameraDistance,
    );
    camera.add(pointLight);

    // create controls
    const controls = new OrbitControls(camera);
    controls.enablePan = controlsOptions.enablePan;
    controls.enableZoom = controlsOptions.enableZoom;
    controls.rotateSpeed = controlsOptions.rotateSpeed;
    controls.zoomSpeed = controlsOptions.zoomSpeed;
    controls.enableDamping = controlsOptions.enableDamping;
    controls.dampingFactor = controlsOptions.dampingFactor;
    controls.autoRotate = controlsOptions.autoRotate;
    controls.autoRotateSpeed = controlsOptions.autoRotateSpeed;
    controls.maxDistance = cameraDistance;

    // create globe and texture
    const globe = new THREE.Group();
    const loader = new THREE.TextureLoader();
    loader.load(textureURL, texture => {
      const sphere = new THREE.SphereGeometry(
        radius,
        globeOptions.segments,
        globeOptions.rings,
      );
      const material = new THREE.MeshPhongMaterial({
        map: texture,
      });
      const mesh = new THREE.Mesh(sphere, material);
      globe.add(mesh);
    });
    globe.position.z = globeOptions.positionZ;

    // create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(sceneOptions.backgroundColor);
    scene.add(globe);
    scene.add(camera);

    // create renderer
    const renderer = new THREE.WebGLRenderer(rendererOptions);
    renderer.setSize(radius, radius);

    // bind class variables
    this.renderer = renderer;
    this.camera = camera;
    this.controls = controls;
    this.scene = scene;
    this.globe = globe;
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
  }
}

export default Globe;
