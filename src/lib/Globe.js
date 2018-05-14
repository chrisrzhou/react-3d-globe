import * as THREE from 'three';
import * as d3 from "d3";
import OrbitControls from 'three-orbitcontrols';
import {latLongToVector} from './projections';
import {scaleLinear} from "d3-scale";
const TWEEN = require('@tweenjs/tween.js');

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
    this.isFocused = false;
    this.preFocusX = 0;
    this.preFocusY = 0;
    this.preFocusZ = 0;
    this.setupScene();
  }

  setupScene() {
    // build elements
    this.renderer = this._createRenderer();
    this.scene = this._createScene();
    this.camera = this._createCamera();
    this.light = this._createLight();
    this.backlight = this._createBacklight();
    this.controls = this._createOrbitControls();
    this.space = this._createSpace();
    this.globe = this._createGlobe();
    this.markers = this._createMarkers();
    this.raycaster = this._createRaycaster();
    this.mouse = this._createMouse();

    // Add to scenes
    this.camera.add(this.light);
    this.camera.add(this.backlight);
    this.backlight.position.set(-this.radius * 6, 0, -this.radius * 8);
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
    // clear before adding
    this.markers.children.forEach(child => {
      this.markers.remove(child);
    });
    const minVal = d3.min(markers, marker => marker.value || 10);
    const maxVal = d3.max(markers, marker => marker.value || 10);
    const barScale = d3.scaleLinear()
      .domain([minVal, maxVal])
      .range([50, 500]);
    const pointScale = d3.scaleLinear()
      .domain([minVal, maxVal])
      .range([10, 20]);
    markers.forEach(marker => {
      const color = marker.color || 0xffffff;
      let position = latLongToVector(marker.lat, marker.long, this.radius, 2);
      let mesh = null;
      switch (marker.type) {
        case 'bar':
          let size = barScale(marker.value) || 10;
          let material = new THREE.MeshLambertMaterial({
            color: marker.color || 0x000000,
            opacity: 0.6,
            transparent: true,
            wireframe: true,
          });
          mesh = new THREE.Mesh(
            new THREE.CubeGeometry(7, 7, size, 1, 1, 1, material),
          );
          break;
        case 'point':
          size = pointScale(marker.value) || 10;
          position = latLongToVector(marker.lat, marker.long, this.radius, size);
          material = new THREE.MeshBasicMaterial({
            color: marker.color || 0x000000,
            opacity: 0.6,
            transparent: true,
          });
          mesh = new THREE.Mesh(
            new THREE.SphereGeometry(size, size, size / 2),
            material,
          );
          break;
        default:
          throw new Error('Not supported marker type.');
      }
      mesh.material.color.setHex(color);
      mesh.position.set(position.x, position.y, position.z);
      mesh.lookAt(new THREE.Vector3(0, 0, 0));
      this.markerMap[mesh.uuid] = marker;
      this.markers.add(mesh);
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
    const {radiusScale} = this.options.camera;
    if (intersects.length > 0) {
      if (!this.isFocused) {
        this.preFocusX = this.camera.position.x;
        this.preFocusY = this.camera.position.y;
        this.preFocusZ = this.camera.position.z;
      }
      const to = {
        x: intersects[0].object.position.x * (radiusScale - 2),
        y: intersects[0].object.position.y * (radiusScale - 2),
        z: intersects[0].object.position.z * (radiusScale - 2),
      };
      this.focus(to);
      const marker = this.markerMap[intersects[0].object.uuid];
      this.onMarkerClick(marker);
    } else {
      if (!this.controls.autoRotate) {
        this.unFocus();
      }
    }
  };

  focus(to) {
    this.isFocused = true;
    this.controls.autoRotate = false;
    this.controls.minPolarAngle = Math.PI * 3 / 16;
    this.controls.maxPolarAngle = Math.PI * 10 / 16;
    const camera = this.camera;
    const from = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
    };
    new TWEEN.Tween(from)
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
    const self = this;
    self.isFocused = false;
    const cameraPosition = {
      x: self.camera.position.x,
      y: self.camera.position.y,
      z: self.camera.position.z,
    };
    new TWEEN.Tween(cameraPosition)
      .to({x: self.preFocusX, y: self.preFocusY, z: self.preFocusZ}, 600)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function() {
        self.camera.position.set(
          this._object.x,
          this._object.y,
          this._object.z,
        );
        self.camera.lookAt(new THREE.Vector3(0, 0, 0));
      })
      .onComplete(function() {
        self.camera.lookAt(new THREE.Vector3(0, 0, 0));
        self.controls.autoRotate = true;
        self.controls.minPolarAngle = self.options.orbitControls.minPolarAngle;
        self.controls.maxPolarAngle = self.options.orbitControls.maxPolarAngle;
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
    this.lastCameraPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };
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
    const light = new THREE.SpotLight(0xf5f5dc, 1, this.radius * 10);
    light.target.position.set(0, 0, 0);
    return light;
  }

  _createBacklight() {
    const light = new THREE.SpotLight(0xf5f5dc, 10, this.radius * 10);
    light.target.position.set(0, 0, 0);
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
    const sphereMaterial = new THREE.MeshLambertMaterial({
      map: THREE.ImageUtils.loadTexture(this.textures.globe),
    });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globe.position.set(0, 0, 0);
    return globe;
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
