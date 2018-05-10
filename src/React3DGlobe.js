import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

import Globe from './lib/Globe';

export default class React3DGlobe extends React.Component {
  static defaultProps = {
    radius: 600,
    textureURL:
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57735/land_ocean_ice_cloud_2048.jpg',
    cameraOptions: {
      fieldOfView: 50,
      near: 1,
      positionX: 0,
      positionY: 0,
      radiusScale: 3,
    },
    controlsOptions: {
      autoRotate: true,
      autoRotateSpeed: 0.2,
      enablePan: false,
      rotateSpeed: 0.4,
      enableDamping: true,
      enableZoom: true,
      dampingFactor: 0.8,
      zoomSpeed: 1,
    },
    globeOptions: {
      segments: 50,
      rings: 50,
      rotationSpeed: 0.001,
      positionZ: 0,
    },
    pointLightOptions: {
      color: 0xffffff,
      positionX: 0,
      positionY: 0,
      positionZ: 0,
    },
    rendererOptions: {
      antialias: true,
    },
    sceneOptions: {
      backgroundColor: null,
    },
  };

  componentDidMount() {
    const {
      radius,
      textureURL,
      cameraOptions,
      controlsOptions,
      globeOptions,
      pointLightOptions,
      rendererOptions,
      sceneOptions,
    } = this.props;

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

    // attach renderer to DOM element
    this.mount.appendChild(this.renderer.domElement);
    this._start();
  }

  componentWillUnmount() {
    this._stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  render() {
    return (
      <div
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }

  _start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this._update);
    }
  };

  _stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  _update = () => {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this._update);
  };
}
