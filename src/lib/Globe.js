import * as THREE from 'three';
import * as d3 from 'd3';
import {scaleLinear} from 'd3-scale';
import OrbitControls from 'three-orbitcontrols';
import * as TWEEN from 'es6-tween';

import {loadTexture} from './loaders';
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
    this.isFocused = false;
    (this.preFocus = {x: 0, y: 0, z: 0}), this.setupScene();
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
    const range = minVal != maxVal ? [50, 500] : [50, 50];
    const barScale = d3
      .scaleLinear()
      .domain([minVal, maxVal])
      .range(range);
    const pointScale = d3
      .scaleLinear()
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
          position = latLongToVector(
            marker.lat,
            marker.long,
            this.radius,
            size,
          );
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
    const {radiusScale} = this.options.camera;
    const intersections = this._getIntersections();
    if (intersections.length > 0) {
      const obj = intersections[0].object;
      if (!this.isFocused) {
        this.preFocus = {
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z,
        };
      }
      const to = {
        x: obj.position.x * (radiusScale - 2),
        y: obj.position.y * (radiusScale - 2),
        z: obj.position.z * (radiusScale - 2),
      };
      this.focus(to);
      const marker = this.markerMap[obj.uuid];
      this.onMarkerClick(marker);
    } else {
      if (!this.controls.autoRotate) {
        this.unFocus();
      }
    }
  };

  onMousemove = () => {
    event.preventDefault();
    const intersections = this._getIntersections();
    if (intersections.length > 0) {
      console.log('mouse over');
    } else {
      console.log('mouse out');
    }
  };

  focus(to) {
    const self = this;
    self.isFocused = true;
    const from = {
      x: self.camera.position.x,
      y: self.camera.position.y,
      z: self.camera.position.z,
    };
    new TWEEN.Tween(from)
      .to(to, 600)
      .easing(TWEEN.Easing.Linear.None)
      .on('update', function() {
        self.camera.position.set(this.object.x, this.object.y, this.object.z);
        self.camera.lookAt(new THREE.Vector3(0, 0, 0));
      })
      .on('complete', function() {
        self.camera.lookAt(new THREE.Vector3(0, 0, 0));
        self.controls.autoRotate = false;
        self.controls.minPolarAngle = Math.PI * 3 / 16;
        self.controls.maxPolarAngle = Math.PI * 10 / 16;
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
      .to(this.preFocus, 600)
      .easing(TWEEN.Easing.Linear.None)
      .on('update', function() {
        self.camera.position.set(this.object.x, this.object.y, this.object.z);
        self.camera.lookAt(new THREE.Vector3(0, 0, 0));
      })
      .on('complete', function() {
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

  _getIntersections() {
    const canvas = this.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    this.mouse.x =
      (event.pageX - rect.left - window.scrollX) / canvas.clientWidth * 2 - 1;
    this.mouse.y =
      -(event.pageY - rect.top - window.scrollY) / canvas.clientHeight * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    return this.raycaster.intersectObjects(this.markers.children);
  }

  _createRenderer() {
    const renderer = new THREE.WebGLRenderer(this.options.renderer);
    renderer.domElement.addEventListener('click', this.onClick);
    renderer.domElement.addEventListener('mousemove', this.onMousemove);
    renderer.domElement.addEventListener('mouseout', this.onMouseout);
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
          map: loadTexture(this.textures.space),
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
      map: loadTexture(this.textures.globe),
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
