import * as THREE from 'three';
const TWEEN = require('@tweenjs/tween.js');
import OrbitControls from 'three-orbitcontrols';

import Marker from './Marker';
import {latLongToVector} from './projections';

class Globe {
  constructor(width, height, options, textures, onMarkerClick) {
    // Bind class variables
    this.options = options;
    this.textures = textures;
    this.aspect = width / height;
    this.radius = Math.min(width, height);
    this.width = width;
    this.height = height;
    this.onMarkerClick = onMarkerClick;
    this.markerMap = {};
    this.cameraPosBeforeFocus = {};
    this.setupScene();
  }

  setupScene() {
    // build elements
    this.renderer = this._createRenderer();
    this.scene = this._createScene();
    this.camera = this._createCamera();
    this.light = this._createLight();
    this.controls = this._createOrbitControls();
    this.space = this._createSpace();
    this.globe = this._createGlobe();
    this.globeGlow = this._createGlobeGlow();
    this.markers = this._createMarkers();
    this.raycaster = this._createRaycaster();
    this.mouse = this._createMouse();

    // center glow around globe
    this.globe.add(this.globeGlow);

    // Add to scenes
    this.camera.add(this.light);
    this.scene.add(this.camera);
    this.scene.add(this.space);
    this.scene.add(this.globe);
  }

  updateSize(width, height) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
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

  onClick = () => {
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
      this.cameraPosBeforeFocus = {
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z,
      };
      const to = {
        x: intersects[0].object.position.x * 5,
        y: intersects[0].object.position.y * 5,
        z: intersects[0].object.position.z * 5,
      };
      this.focus(this.cameraPosBeforeFocus, to);
      const marker = this.markerMap[intersects[0].object.uuid];
      this.onMarkerClick(marker);
    } else {
      this.unFocus();
    }
  };

  focus(from, to) {
    this.controls.autoRotate = false;
    this.controls.minPolarAngle = Math.PI * 3 / 16;
    this.controls.maxPolarAngle = Math.PI * 10 / 16;
    const camera = this.camera;
    const tween = new TWEEN.Tween(from)
      .to(to, 600)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function() {
        camera.position.set(this._object.x, this._object.y, this._object.z);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      })
      .onComplete(function() {
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      })
      .start();
  }

  unFocus() {
    this.controls.autoRotate = true;
    this.controls.minPolarAngle = this.options.orbitControls.minPolarAngle;
    this.controls.maxPolarAngle = this.options.orbitControls.maxPolarAngle;
    const camera = this.camera;
    const cameraPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };
    console.log(this.cameraPosBeforeFocus);
    new TWEEN.Tween(cameraPosition)
      .to(this.cameraPosBeforeFocus, 600)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function() {
        camera.position.set(this._object.x, this._object.y, this._object.z);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      })
      .onComplete(function() {
        camera.lookAt(new THREE.Vector3(0, 0, 0));
      })
      .start();
  }

  render = () => {
    TWEEN.update();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.render);
  };

  stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }

  _createRenderer() {
    const renderer = new THREE.WebGLRenderer(this.options.renderer);
    renderer.domElement.addEventListener('click', this.onClick);
    renderer.setSize(this.width, this.height);
    return renderer;
  }

  _createScene() {
    return new THREE.Scene();
  }

  _createCamera() {
    const {
      far,
      near,
      positionX,
      positionY,
      radiusScale,
      viewAngle,
    } = this.options.camera;
    const camera = new THREE.PerspectiveCamera(
      viewAngle,
      this.aspect,
      near,
      far,
    );
    camera.position.set(positionX, positionY, this.radius * radiusScale);
    camera.lookAt(this.scene.position);
    return camera;
  }

  _createOrbitControls() {
    const {
      enablePan,
      enableZoom,
      zoomSpeed,
      rotateSpeed,
      enableDamping,
      dampingFactor,
      autoRotate,
      autoRotateSpeed,
      minPolarAngle,
      maxPolarAngle,
    } = this.options.orbitControls;
    const orbitControls = new OrbitControls(this.camera);
    orbitControls.enablePan = enablePan;
    orbitControls.enableZoom = enableZoom;
    orbitControls.zoomSpeed = zoomSpeed;
    orbitControls.rotateSpeed = rotateSpeed;
    orbitControls.enableDamping = enableDamping;
    orbitControls.dampingFactor = dampingFactor;
    orbitControls.autoRotate = autoRotate;
    orbitControls.autoRotateSpeed = autoRotateSpeed;
    orbitControls.minPolarAngle = minPolarAngle;
    orbitControls.maxPolarAngle = maxPolarAngle;
    return orbitControls;
  }

  _createLight() {
    const light = new THREE.PointLight(0xffffff);
    light.position.set(0, 0, this.radius * 3);
    return light;
  }

  _createSpace() {
    const spaceGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
    const spaceMaterials = [];
    for (var i = 0; i < 6; i++)
      spaceMaterials.push(
        new THREE.MeshBasicMaterial({
          map: THREE.ImageUtils.loadTexture(this.textures.space),
          side: THREE.BackSide,
        }),
      );
    const spaceMaterial = new THREE.MeshFaceMaterial(spaceMaterials);
    const space = new THREE.Mesh(spaceGeometry, spaceMaterial);
    return space;
  }

  _createGlobe() {
    const {segments, rings} = this.options.globe;
    const sphereGeometry = new THREE.SphereGeometry(
      this.radius,
      segments,
      rings,
    );
    const sphereMaterial = new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture(this.textures.globe),
    });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globe.position.set(0, 0, 0);
    return globe;
  }

  _createGlobeGlow() {
    const globeGlowMaterial = new THREE.SpriteMaterial({
      map: new THREE.ImageUtils.loadTexture(this.textures.globeGlow),
      color: 0x333300,
      transparent: false,
      blending: THREE.AdditiveBlending,
    });
    const globeGlow = new THREE.Sprite(globeGlowMaterial);
    globeGlow.scale.set(200, 200, 1.0);
    return globeGlow;
  }

  _createMarkers() {
    return new THREE.Group();
  }

  _createRaycaster() {
    return new THREE.Raycaster();
  }

  _createMouse() {
    return new THREE.Vector2();
  }
}

export default Globe;
