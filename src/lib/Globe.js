import * as THREE from 'three';
import * as d3 from 'd3';
import OrbitControls from 'three-orbitcontrols';
import * as TWEEN from 'es6-tween';

import {loadTexture} from './loaders';
import {latLongToVector} from './projections';

class Globe {
  constructor(
    width,
    height,
    options,
    textures,
    disableUnfocus,
    onMarkerClick,
    onMarkerMouseover,
    onMarkerMouseout,
  ) {
    this.options = options;
    // Bind class variables this.options = options;
    this.textures = textures;
    this.aspect = width / height;
    this.radius = Math.min(width, height);
    this.width = width;
    this.height = height;
    this.onMarkerClick = onMarkerClick;
    this.onMarkerMouseover = onMarkerMouseover;
    this.onMarkerMouseout = onMarkerMouseout;
    this.markerMap = {};
    this.isFocused = false;
    this.mouseoverObj = null;
    this.tweenMap = {};
    this.preFocus = {x: 0, y: 0, z: 0};
    this.disableUnfocus = disableUnfocus || false;
    this.setupScene();
  }

  setupScene() {
    // build elements
    this.renderer = this._createRenderer();
    this.scene = this._createScene();
    this.camera = this._createCamera();
    this._createLight();
    this.controls = this._createOrbitControls();
    this.space = this._createSpace();
    this.globe = this._createGlobe();
    this.cloud = this._createCloud();
    this.markers = this._createMarkers();
    this.raycaster = this._createRaycaster();
    this.mouse = this._createMouse();

    // Add to scenes
    this.scene.add(this.camera);
    this.scene.add(this.space);
    this.scene.add(this.globe);
    this.scene.add(this.cloud);
  }

  updateSize(width, height) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }

  setMarkers = markers => {
    this.markers.children = []; // clear before adding
    const minVal = d3.min(markers, marker => marker.value || 2);
    const maxVal = d3.max(markers, marker => marker.value || 2);
    const barScale = d3
      .scaleLinear()
      .domain([minVal, maxVal])
      .range([2, 1000]);
    const pointScale = d3
      .scaleLinear()
      .domain([minVal, maxVal])
      .range([2, 10]);
    markers.forEach(marker => {
      if (this.options.globe.type === 'low-poly') {
        marker.long = (marker.long + 180) % 180;
      }
      const color = marker.color || 0xffffff;
      let position = latLongToVector(marker.lat, marker.long, this.radius, 2);
      let mesh = null;
      switch (marker.type) {
        case 'bar':
          let size = barScale(marker.value) || 10;
          let material = new THREE.MeshLambertMaterial({
            color: marker.color || 0x000000,
            opacity: 0.9,
            transparent: true,
            wireframe: true,
          });
          mesh = new THREE.Mesh(
            new THREE.CubeGeometry(7, 7, size, 1, 1, 1, material),
          );
          this._blink(mesh, {scale: 0.1}, {scale: 1}, false);
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
          });
          mesh = new THREE.Mesh(
            new THREE.SphereGeometry(size, 10, 10),
            material,
          );
          this._blink(mesh, {scale: 0.5}, {scale: 1}, true);
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
  };
 
  _blink(markerMesh, from, to, recursive) {
    const self = this;
    const _from = {...from};
    const _to = {...to};
    const duration = Math.floor(Math.random() * 500) + 500;
    new TWEEN.Tween(from)
      .to(to, duration)
      .easing(TWEEN.Easing.Linear.None)
      .on('update', function() {
        markerMesh.scale.x = this.object.scale;
        markerMesh.scale.y = this.object.scale;
        markerMesh.scale.z = this.object.scale;
      })
      .on('complete', function() {
        if (recursive) {
          self._blink(markerMesh, _to, _from, recursive);
        }
      })
      .start();
  }

  getRendererDomElement = () => {
    return this.renderer.domElement;
  };

  setDisableUnfocus = disableUnfocus => {
    this.disableUnfocus = disableUnfocus;
    if (!this.disableUnfocus && this.isFocused) {
      this.unfocus();
    }
  };

  onClick = () => {
    event.preventDefault();
    const {radiusScale} = this.options.camera;
    const obj = this._getIntersectedObject();
    if (obj) {
      if (!this.isFocused) {
        this.preFocus = {
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z,
        };
      }
      const to = {
        x: obj.position.x * (radiusScale - 1),
        y: obj.position.y * (radiusScale - 1),
        z: obj.position.z * (radiusScale - 1),
      };
      this.focus(to);
      const marker = this.markerMap[obj.uuid];
      this.onMarkerClick && this.onMarkerClick(event, marker);
    } else {
      // we will use globe.isFocused to override internal focus state
      if (!this.disableUnfocus && this.isFocused) {
        this.unfocus();
      }
    }
  };

  onMousemove = () => {
    event.preventDefault();
    const self = this;
    const obj = this._getIntersectedObject();
    if (obj) {
      // do nothing when the mouse hasn't moved out of the current object
      if (self.mouseoverObj === obj) {
        return;
      }
      const marker = this.markerMap[obj.uuid];
      this.onMarkerMouseover && this.onMarkerMouseover(event, marker);
      // when mouse moving from one object direct to another
      // we should reset the previous mouseover object
      if (self.mouseoverObj) {
        self.tweenMap[self.mouseoverObj.uuid].stop();
        self.mouseoverObj.scale.x = 1;
        self.mouseoverObj.scale.y = 1;
        self.mouseoverObj.scale.z = 1;
      }

      self.mouseoverObj = obj;
      const from = {scale: 1};
      const to = {scale: 2};
      self.tweenMap[obj.uuid] = new TWEEN.Tween(from)
        .to(to, 300)
        .easing(TWEEN.Easing.Linear.None)
        .on('update', function() {
          if (self.mouseoverObj == obj) {
            obj.scale.x = this.object.scale;
            obj.scale.y = this.object.scale;
            obj.scale.z = this.object.scale;
          } else {
            obj.scale.x = 1;
            obj.scale.y = 1;
            obj.scale.z = 1;
          }
        })
        .start();
    } else {
      if (self.mouseoverObj) {
        this.onMarkerMouseout && this.onMarkerMouseout(event);
        self.mouseoverObj.scale.x = 1;
        self.mouseoverObj.scale.y = 1;
        self.mouseoverObj.scale.z = 1;
        self.mouseoverObj = null;
      }
    }
  };

  focus(to) {
    const self = this;
    self.isFocused = true;
    self.controls.autoRotate = false;
    self.controls.enableRotate = false;
    self.controls.minPolarAngle = Math.PI * 3 / 16;
    self.controls.maxPolarAngle = Math.PI * 13 / 16;
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
      })
      .start();
  }

  unfocus() {
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
        self.controls.enableRotate = true;
        self.controls.minPolarAngle = self.options.orbitControls.minPolarAngle;
        self.controls.maxPolarAngle = self.options.orbitControls.maxPolarAngle;
      })
      .start();
  }

  render = () => {
    TWEEN.update();
    this.cloud.rotation.y += 0.0002;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.render);
  };

  stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }

  _getIntersectedObject() {
    const canvas = this.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    this.mouse.x =
      (event.pageX - rect.left - window.scrollX) / canvas.clientWidth * 2 - 1;
    this.mouse.y =
      -(event.pageY - rect.top - window.scrollY) / canvas.clientHeight * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const all = [this.globe, ...this.markers.children];
    const objects = this.raycaster.intersectObjects(all);
    if (objects.length > 0) {
      // This is to filter out the globe.
      // If we don't have this check, user would be able to click through the
      // earth and hit the marker on the back side of the globe
      if (objects[0].object.uuid !== this.globe.uuid) {
        return objects[0].object;
      }
    }
    return null;
  }

  _createRenderer() {
    const renderer = new THREE.WebGLRenderer(this.options.renderer);
    renderer.domElement.addEventListener('click', this.onClick);
    renderer.domElement.addEventListener('mousemove', this.onMousemove);
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
      enableRotate,
      zoomSpeed,
      rotateSpeed,
      enableDamping,
      dampingFactor,
      autoRotate,
      autoRotateSpeed,
      minPolarAngle,
      maxPolarAngle,
    } = this.options.orbitControls;
    const orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement,
    );
    orbitControls.enablePan = enablePan;
    orbitControls.enableZoom = enableZoom;
    orbitControls.enableRotate = enableRotate;
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
    if (!this.camera) {
      throw new Error('Camera needs to be created before creating light.');
    }

    // scenelight
    const sceneLight = new THREE.AmbientLight(
      this.options.light.sceneLightColor,
      this.options.light.sceneLightIntensity,
    );
    this.scene.add(sceneLight);
    // front light
    const frontLight = new THREE.SpotLight(
      this.options.light.frontLightColor,
      this.options.light.frontLightIntensity,
      this.radius * 10,
    );
    frontLight.target.position.set(0, 0, 0);
    this.camera.add(frontLight);
    // back light
    const backLight = new THREE.SpotLight(
      this.options.light.backLightColor,
      this.options.light.backLightIntensity,
      this.radius * 10,
    );
    backLight.target.position.set(0, 0, 0);
    this.camera.add(backLight);
    backLight.position.set(-this.radius * 6, 0, -this.radius * 8);
  }

  _createSpace() {
    return new THREE.Mesh(
      new THREE.SphereGeometry(
        Math.min(this.options.space.radius, this.radius * 6),
        this.options.space.widthSegments,
        this.options.space.heightSegments,
      ),
      new THREE.MeshBasicMaterial({
        map: loadTexture(this.textures.space),
        side: THREE.BackSide,
      }),
    );
  }

  _createGlobe() {
    const sphereMaterial = new THREE.MeshLambertMaterial({
      map: loadTexture(this.textures.globe),
    });
    let geometry = null;
    switch (this.options.globe.type) {
      case 'low-poly':
        geometry = new THREE.DodecahedronGeometry(this.radius, 2);
        geometry.computeFlatVertexNormals();
        sphereMaterial.flatShading = true;
        break;
      case 'real':
        geometry = new THREE.SphereGeometry(
          this.radius,
          this.options.globe.widthSegments,
          this.options.globe.heightSegments,
        );
        break;
      default:
        throw new Error('Not supported globe type.');
    }
    const globe = new THREE.Mesh(geometry, sphereMaterial);
    globe.position.set(0, 0, 0);
    return globe;
  }

  _createCloud() {
    const sphereMaterial = new THREE.MeshLambertMaterial({
      map: loadTexture(this.textures.cloud),
      transparent: true,
      side: THREE.DoubleSide,
    });
    const geometry = new THREE.SphereGeometry(
      this.radius * 1.04,
      this.options.globe.widthSegments,
      this.options.globe.heightSegments,
    );
    const cloud = new THREE.Mesh(geometry, sphereMaterial);
    cloud.position.set(0, 0, 0);
    return cloud;
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
