import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

import Marker from './Marker';
import {latLongToVector} from './projections';

class Globe {
  constructor(radius, onMarkerClick, globeTexture, backgroundTexture, options) {
    // unpack options
    const {
      cameraOptions,
      controlOptions,
      globeOptions,
      rendererOptions,
      sceneOptions,
    } = options;

    // create light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);

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
    camera.add(ambientLight);

    // create controls
    const controls = new OrbitControls(camera);
    controls.enablePan = controlOptions.enablePan;
    controls.enableZoom = controlOptions.enableZoom;
    controls.zoomSpeed = controlOptions.zoomSpeed;
    controls.rotateSpeed = controlOptions.rotateSpeed;
    controls.enableDamping = controlOptions.enableDamping;
    controls.dampingFactor = controlOptions.dampingFactor;
    controls.autoRotate = controlOptions.autoRotate;
    controls.autoRotateSpeed = controlOptions.autoRotateSpeed;
    controls.maxDistance = cameraDistance;
    controls.minPolarAngle = controlOptions.minPolarAngle;
    controls.maxPolarAngle = controlOptions.maxPolarAngle;

    // create globe and texture
    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      globeOptions.segments,
      globeOptions.rings,
    );
    const sphereMaterial = new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture(globeTexture),
    });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // create scene
    const scene = new THREE.Scene();
    scene.add(globe);
    scene.add(camera);

    // create the background texture and scene
    const background = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2, 0),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture(backgroundTexture),
      }),
    );
    background.material.depthTest = false;
    background.material.depthWrite = false;
    const backgroundScene = new THREE.Scene();
    const backgroundCamera = new THREE.Camera();
    backgroundScene.add(backgroundCamera);
    backgroundScene.add(background);

    // create renderer
    const renderer = new THREE.WebGLRenderer(rendererOptions);
    renderer.domElement.addEventListener('click', this.onClick.bind(this));
    renderer.setSize(radius, radius);

    // bind class variables
    this.renderer = renderer;
    this.camera = camera;
    this.controls = controls;
    this.scene = scene;
    this.globe = globe;
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.frameId = null;
    this.backgroundScene = backgroundScene;
    this.backgroundCamera = backgroundCamera;

    this.markers = new THREE.Group();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.onMarkerClick = onMarkerClick;
    this.markerMap = {};
    this.isFocused = false;
    this.radius = radius;
  }

  onClick() {
    event.preventDefault();
    const canvas = this.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    this.mouse.x =
      (event.pageX - rect.left - window.scrollX) / canvas.clientWidth * 2 - 1;
    this.mouse.y =
      -(event.pageY - rect.top - window.scrollY) / canvas.clientHeight * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.markers.children);
    if (intersects.length > 0) {
      const marker = this.markerMap[intersects[0].object.uuid];
      const position = latLongToVector(marker.lat, marker.long, this.radius, 2);
      intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
      this.isFocused = true;
      this.camera.position.x = position.x;
      this.camera.position.y = position.y;
      this.camera.position.z = position.z;
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.onMarkerClick(this.markerMap[intersects[0].object.uuid]);
    }
  }

  addMarkers(markers) {
    const cubeMat = new THREE.MeshLambertMaterial({
      color: 0x000000,
      opacity: 0.6,
      emissive: 0xffffff,
    });
    markers.forEach(marker => {
      const position = latLongToVector(marker.lat, marker.long, this.radius, 2);
      let cube = new THREE.Mesh(
        new THREE.CubeGeometry(50, 50, 1 + marker.value / 8, 1, 1, 1, cubeMat),
      );
      cube.position.set(position.x, position.y, position.z);
      cube.lookAt(new THREE.Vector3(0, 0, 0));
      this.markers.add(cube);
      this.markerMap[cube.uuid] = marker;
    });
    this.scene.add(this.markers);
  }

  focus(lat, long) {
  }

  render() {
    if (!this.isFocused) {
      
      this.camera.position.x -= Math.sin(Math.PI * 2 / 180) * this.radius;
      this.camera.position.z -= this.radius - Math.cos(Math.PI * 2 / 180) * this.radius;
    }
    this.controls.update();
    this.renderer.autoClear = false; // render multiple scenes
    this.renderer.clear();
    this.renderer.render(this.backgroundScene, this.backgroundCamera);
    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.render.bind(this));
  }
	
  stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }
}

export default Globe;
