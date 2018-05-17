'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var THREE = require('three');
require('d3');
var OrbitControls = _interopDefault(require('three-orbitcontrols'));
var TWEEN = require('es6-tween');

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var ResizeSensor = function (_React$PureComponent) {
  inherits(ResizeSensor, _React$PureComponent);

  function ResizeSensor() {
    var _temp, _this, _ret;

    classCallCheck(this, ResizeSensor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this._handleResize = function () {
      window.requestAnimationFrame(_this.props.onResize);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  ResizeSensor.prototype.render = function render() {
    var _this2 = this,
        _React$createElement;

    return React.createElement('iframe', (_React$createElement = {
      ref: 'sensorIframe'
    }, _React$createElement['ref'] = function ref(_ref) {
      _this2.ref = _ref;
    }, _React$createElement.style = {
      border: 'none',
      background: 'transparent',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: -1
    }, _React$createElement));
  };

  ResizeSensor.prototype.componentDidMount = function componentDidMount() {
    this.ref.contentWindow.addEventListener('resize', this._handleResize);
  };

  ResizeSensor.prototype.componentWillUnmount = function componentWillUnmount() {
    this.ref.contentWindow.removeEventListener('resize', this._handleResize);
  };

  return ResizeSensor;
}(React.PureComponent);

var loadTexture = function loadTexture(image) {
  var loader = new THREE.TextureLoader();
  if (image instanceof HTMLImageElement) {
    return loader.load(image.src);
  }
  return loader.load(image);
};

var latLongToVector = function latLongToVector(lat, lon, radius) {
  var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var phi = lat * Math.PI / 180;
  var theta = (lon - 180) * Math.PI / 180;

  var x = -(radius + height) * Math.cos(phi) * Math.cos(theta);
  var y = (radius + height) * Math.sin(phi);
  var z = (radius + height) * Math.cos(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

var Globe = function () {
  function Globe(width, height, options, textures, disableUnfocus, onMarkerClick, onMarkerMouseover, onMarkerMouseout) {
    classCallCheck(this, Globe);

    _initialiseProps.call(this);

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
    this.preFocus = { x: 0, y: 0, z: 0 };
    this.disableUnfocus = disableUnfocus || false;
    this.setupScene();
  }

  Globe.prototype.setupScene = function setupScene() {
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
  };

  Globe.prototype.updateSize = function updateSize(width, height) {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  };

  Globe.prototype._blink = function _blink(markerMesh, from, to, recursive, initial, isInitialBlink) {
    var self = this;
    var tweenFrom = isInitialBlink ? initial : from;
    var _from = _extends({}, from);
    var _to = _extends({}, to);
    var duration = Math.floor(Math.random() * 1000) + 500;
    new TWEEN.Tween(tweenFrom).to(to, duration).easing(TWEEN.Easing.Linear.None).on('update', function () {
      markerMesh.scale.x = this.object.scale;
      markerMesh.scale.y = this.object.scale;
      markerMesh.scale.z = this.object.scale;
    }).on('complete', function () {
      if (recursive && markerMesh.uuid in self.markerMap) {
        self._blink(markerMesh, _to, _from, recursive, initial, false);
      }
    }).start();
  };

  Globe.prototype.focus = function focus(to) {
    var self = this;
    self.isFocused = true;
    self.controls.autoRotate = false;
    self.controls.enableRotate = false;
    self.controls.minPolarAngle = Math.PI * 3 / 16;
    self.controls.maxPolarAngle = Math.PI * 13 / 16;
    var from = {
      x: self.camera.position.x,
      y: self.camera.position.y,
      z: self.camera.position.z
    };
    new TWEEN.Tween(from).to(to, 600).easing(TWEEN.Easing.Linear.None).on('update', function () {
      self.camera.position.set(this.object.x, this.object.y, this.object.z);
      self.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }).on('complete', function () {
      self.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }).start();
  };

  Globe.prototype.unfocus = function unfocus() {
    var self = this;
    self.isFocused = false;
    var cameraPosition = {
      x: self.camera.position.x,
      y: self.camera.position.y,
      z: self.camera.position.z
    };
    new TWEEN.Tween(cameraPosition).to(this.preFocus, 600).easing(TWEEN.Easing.Linear.None).on('update', function () {
      self.camera.position.set(this.object.x, this.object.y, this.object.z);
      self.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }).on('complete', function () {
      self.camera.lookAt(new THREE.Vector3(0, 0, 0));
      self.controls.autoRotate = true;
      self.controls.enableRotate = true;
      self.controls.minPolarAngle = self.options.orbitControls.minPolarAngle;
      self.controls.maxPolarAngle = self.options.orbitControls.maxPolarAngle;
    }).start();
  };

  Globe.prototype.stop = function stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  };

  Globe.prototype._getIntersectedObject = function _getIntersectedObject() {
    var canvas = this.renderer.domElement;
    var rect = canvas.getBoundingClientRect();
    this.mouse.x = (event.pageX - rect.left - window.scrollX) / canvas.clientWidth * 2 - 1;
    this.mouse.y = -(event.pageY - rect.top - window.scrollY) / canvas.clientHeight * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    var all = [this.globe].concat(this.markers.children);
    var objects = this.raycaster.intersectObjects(all);
    if (objects.length > 0) {
      // This is to filter out the globe.
      // If we don't have this check, user would be able to click through the
      // earth and hit the marker on the back side of the globe
      if (objects[0].object.uuid !== this.globe.uuid) {
        return objects[0].object;
      }
    }
    return null;
  };

  Globe.prototype._createRenderer = function _createRenderer() {
    var renderer = new THREE.WebGLRenderer(this.options.renderer);
    renderer.domElement.addEventListener('click', this.onClick);
    renderer.domElement.addEventListener('mousemove', this.onMousemove);
    renderer.setSize(this.width, this.height);
    return renderer;
  };

  Globe.prototype._createScene = function _createScene() {
    return new THREE.Scene();
  };

  Globe.prototype._createCamera = function _createCamera() {
    var _options$camera = this.options.camera,
        far = _options$camera.far,
        near = _options$camera.near,
        positionX = _options$camera.positionX,
        positionY = _options$camera.positionY,
        radiusScale = _options$camera.radiusScale,
        viewAngle = _options$camera.viewAngle;

    var camera = new THREE.PerspectiveCamera(viewAngle, this.aspect, near, far);
    camera.position.set(positionX, positionY, this.radius * radiusScale);
    this.lastCameraPos = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
    camera.lookAt(this.scene.position);
    return camera;
  };

  Globe.prototype._createOrbitControls = function _createOrbitControls() {
    var _options$orbitControl = this.options.orbitControls,
        enablePan = _options$orbitControl.enablePan,
        enableZoom = _options$orbitControl.enableZoom,
        enableRotate = _options$orbitControl.enableRotate,
        zoomSpeed = _options$orbitControl.zoomSpeed,
        rotateSpeed = _options$orbitControl.rotateSpeed,
        enableDamping = _options$orbitControl.enableDamping,
        dampingFactor = _options$orbitControl.dampingFactor,
        autoRotate = _options$orbitControl.autoRotate,
        autoRotateSpeed = _options$orbitControl.autoRotateSpeed,
        minPolarAngle = _options$orbitControl.minPolarAngle,
        maxPolarAngle = _options$orbitControl.maxPolarAngle;

    var orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
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
  };

  Globe.prototype._createLight = function _createLight() {
    if (!this.camera) {
      throw new Error('Camera needs to be created before creating light.');
    }

    // scenelight
    var sceneLight = new THREE.AmbientLight(this.options.light.sceneLightColor, this.options.light.sceneLightIntensity);
    this.scene.add(sceneLight);
    // front light
    var frontLight = new THREE.SpotLight(this.options.light.frontLightColor, this.options.light.frontLightIntensity, this.radius * 10);
    frontLight.target.position.set(0, 0, 0);
    this.camera.add(frontLight);
    // back light
    var backLight = new THREE.SpotLight(this.options.light.backLightColor, this.options.light.backLightIntensity, this.radius * 10);
    backLight.target.position.set(0, 0, 0);
    this.camera.add(backLight);
    backLight.position.set(-this.radius * 6, 0, -this.radius * 8);
  };

  Globe.prototype._createSpace = function _createSpace() {
    return new THREE.Mesh(new THREE.SphereGeometry(Math.min(this.options.space.radius, this.radius * 6), this.options.space.widthSegments, this.options.space.heightSegments), new THREE.MeshBasicMaterial({
      map: loadTexture(this.textures.space),
      side: THREE.BackSide
    }));
  };

  Globe.prototype._createGlobe = function _createGlobe() {
    var sphereMaterial = new THREE.MeshLambertMaterial({
      map: loadTexture(this.textures.globe)
    });
    var geometry = null;
    switch (this.options.globe.type) {
      case 'low-poly':
        geometry = new THREE.DodecahedronGeometry(this.radius, 2);
        geometry.computeFlatVertexNormals();
        sphereMaterial.flatShading = true;
        break;
      case 'real':
        geometry = new THREE.SphereGeometry(this.radius, this.options.globe.widthSegments, this.options.globe.heightSegments);
        break;
      default:
        throw new Error('Not supported globe type.');
    }
    var globe = new THREE.Mesh(geometry, sphereMaterial);
    globe.position.set(0, 0, 0);
    return globe;
  };

  Globe.prototype._createCloud = function _createCloud() {
    var sphereMaterial = new THREE.MeshLambertMaterial({
      map: loadTexture(this.textures.cloud),
      transparent: true,
      side: THREE.DoubleSide
    });
    var geometry = new THREE.SphereGeometry(this.radius * 1.04, this.options.globe.widthSegments, this.options.globe.heightSegments);
    var cloud = new THREE.Mesh(geometry, sphereMaterial);
    cloud.position.set(0, 0, 0);
    return cloud;
  };

  Globe.prototype._createMarkers = function _createMarkers() {
    return new THREE.Group();
  };

  Globe.prototype._createRaycaster = function _createRaycaster() {
    return new THREE.Raycaster();
  };

  Globe.prototype._createMouse = function _createMouse() {
    return new THREE.Vector2();
  };

  return Globe;
}();

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.setMarkers = function (markers) {
    _this.markers.children = []; // clear before adding
    _this.markerMap = {};
    markers.forEach(function (marker) {
      if (_this.options.globe.type === 'low-poly') {
        marker.long = (marker.long + 180) % 180;
      }
      var color = marker.color || 0xffffff;
      var position = latLongToVector(marker.lat, marker.long, _this.radius, 2);
      var mesh = null;
      switch (marker.type) {
        case 'bar':
          var size = marker.size || 100;
          var material = new THREE.MeshLambertMaterial({
            color: color,
            opacity: 0.9,
            transparent: true,
            wireframe: true
          });
          mesh = new THREE.Mesh(new THREE.CubeGeometry(7, 7, size, 1, 1, 1, material));
          _this._blink(mesh, { scale: 0.1 }, { scale: 1 }, false);
          break;
        case 'point':
          size = marker.size || 5;
          position = latLongToVector(marker.lat, marker.long, _this.radius, size);
          material = new THREE.MeshBasicMaterial({ color: color });
          mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 10, 10), material);
          _this._blink(mesh, { scale: 0.5 }, { scale: 1 }, true, { scale: 2 }, true);
          break;
        default:
          throw new Error('Not supported marker type.');
      }
      mesh.material.color.setHex(color);
      mesh.position.set(position.x, position.y, position.z);
      mesh.lookAt(new THREE.Vector3(0, 0, 0));
      _this.markerMap[mesh.uuid] = marker;
      _this.markers.add(mesh);
    });
    _this.scene.add(_this.markers);
  };

  this.getRendererDomElement = function () {
    return _this.renderer.domElement;
  };

  this.setDisableUnfocus = function (disableUnfocus) {
    _this.disableUnfocus = disableUnfocus;
    if (!_this.disableUnfocus && _this.isFocused) {
      _this.unfocus();
    }
  };

  this.onClick = function () {
    event.preventDefault();
    var radiusScale = _this.options.camera.radiusScale;

    var obj = _this._getIntersectedObject();
    if (obj) {
      if (!_this.isFocused) {
        _this.preFocus = {
          x: _this.camera.position.x,
          y: _this.camera.position.y,
          z: _this.camera.position.z
        };
      }
      var to = {
        x: obj.position.x * (radiusScale - 1),
        y: obj.position.y * (radiusScale - 1),
        z: obj.position.z * (radiusScale - 1)
      };
      _this.focus(to);
      var marker = _this.markerMap[obj.uuid];
      _this.onMarkerClick && _this.onMarkerClick(event, marker);
    } else {
      // we will use globe.isFocused to override internal focus state
      if (!_this.disableUnfocus && _this.isFocused) {
        _this.unfocus();
      }
    }
  };

  this.onMousemove = function () {
    event.preventDefault();
    var self = _this;
    var obj = _this._getIntersectedObject();
    if (obj) {
      // do nothing when the mouse hasn't moved out of the current object
      if (self.mouseoverObj === obj) {
        return;
      }
      var marker = _this.markerMap[obj.uuid];
      _this.onMarkerMouseover && _this.onMarkerMouseover(event, marker);
      // when mouse moving from one object direct to another
      // we should reset the previous mouseover object
      if (self.mouseoverObj) {
        self.tweenMap[self.mouseoverObj.uuid].stop();
        self.mouseoverObj.scale.x = 1;
        self.mouseoverObj.scale.y = 1;
        self.mouseoverObj.scale.z = 1;
      }

      self.mouseoverObj = obj;
      var from = { scale: 1 };
      var to = { scale: 2 };
      self.tweenMap[obj.uuid] = new TWEEN.Tween(from).to(to, 300).easing(TWEEN.Easing.Linear.None).on('update', function () {
        if (self.mouseoverObj == obj) {
          obj.scale.x = this.object.scale;
          obj.scale.y = this.object.scale;
          obj.scale.z = this.object.scale;
        } else {
          obj.scale.x = 1;
          obj.scale.y = 1;
          obj.scale.z = 1;
        }
      }).start();
    } else {
      if (self.mouseoverObj) {
        _this.onMarkerMouseout && _this.onMarkerMouseout(event);
        self.mouseoverObj.scale.x = 1;
        self.mouseoverObj.scale.y = 1;
        self.mouseoverObj.scale.z = 1;
        self.mouseoverObj = null;
      }
    }
  };

  this.render = function () {
    TWEEN.update();
    _this.cloud.rotation.y += 0.0002;
    _this.controls.update();
    _this.renderer.render(_this.scene, _this.camera);
    _this.frameId = window.requestAnimationFrame(_this.render);
  };
};

var options = {
  camera: {
    far: 20000,
    near: 1,
    positionX: 0,
    positionY: 0,
    radiusScale: 3,
    viewAngle: 45
  },
  orbitControls: {
    autoRotate: true,
    autoRotateSpeed: 0.02,
    rotateSpeed: 0.05,
    enableDamping: true,
    dampingFactor: 0.1,
    enablePan: true,
    enableZoom: false,
    enableRotate: true,
    zoomSpeed: 1,
    minPolarAngle: Math.PI * 7 / 16,
    maxPolarAngle: Math.PI * 9 / 16
  },
  globe: {
    isFocused: true,
    widthSegments: 50,
    heightSegments: 50,
    type: 'real'
  },
  space: {
    radius: 5000,
    widthSegments: 50,
    heightSegments: 50
  },
  renderer: {
    antialias: true
  },
  light: {
    sceneLightColor: 0xf5f5dc,
    sceneLightIntensity: 0.7,
    frontLightColor: 0xf5f5dc,
    frontLightIntensity: 2,
    backLightColor: 0xf5f5dc,
    backLightIntensity: 10
  }
};

var textures = {
  globe: 'https://raw.githubusercontent.com/chrisrzhou/react-3d-globe/master/src/textures/globe.jpg',
  space: 'https://raw.githubusercontent.com/chrisrzhou/react-3d-globe/master/src/textures/space.jpg'
};

var MIN_HEIGHT = 600;
var MIN_WIDTH = 600;

var React3DGlobe = function (_React$PureComponent) {
  inherits(React3DGlobe, _React$PureComponent);

  function React3DGlobe() {
    var _temp, _this, _ret;

    classCallCheck(this, React3DGlobe);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
      height: MIN_HEIGHT,
      width: MIN_WIDTH
    }, _this.onMarkerClick = function (event, marker) {
      _this.props.onMarkerClick && _this.props.onMarkerClick(event, marker);
    }, _this.onMarkerMouseover = function (event, marker) {
      _this.props.onMarkerMouseover && _this.props.onMarkerMouseover(event, marker);
    }, _this.onMarkerMouseout = function (event) {
      _this.props.onMarkerMouseout && _this.props.onMarkerMouseout(event);
    }, _this.onResize = function () {
      // if neither width nor height is provided via props
      if (!_this.props.width) {
        _this.setState({
          width: _this.mount.clientWidth
        });
      }
      if (!_this.props.height) {
        _this.setState({
          height: _this.mount.clientHeight
        });
      }
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  React3DGlobe.prototype.componentDidMount = function componentDidMount() {
    this.renderGlobe();
    this.setState({
      height: this.props.height || this.mount.clientHeight,
      width: this.props.width || this.mount.clientWidth
    });
  };

  React3DGlobe.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _state = this.state,
        height = _state.height,
        width = _state.width;

    if (this.props.disableUnfocus !== prevProps.disableUnfocus) {
      this.globe.setDisableUnfocus(this.props.disableUnfocus);
    }
    if (this.props.markers !== prevProps.markers) {
      this.globe.setMarkers(this.props.markers);
    }
    if (this.state !== prevState) {
      this.globe.updateSize(width, height);
    }
    return;
  };

  React3DGlobe.prototype.renderGlobe = function renderGlobe() {
    var _props = this.props,
        disableUnfocus = _props.disableUnfocus,
        options$$1 = _props.options,
        globeTexture = _props.globeTexture,
        spaceTexture = _props.spaceTexture,
        cloudTexture = _props.cloudTexture,
        markers = _props.markers;
    // compute height and width with priority: props > parent > minValues

    var _state2 = this.state,
        height = _state2.height,
        width = _state2.width;

    var textures$$1 = {
      globe: globeTexture,
      space: spaceTexture,
      cloud: cloudTexture
    };
    this.globe = new Globe(width, height, options$$1, textures$$1, disableUnfocus, this.onMarkerClick, this.onMarkerMouseover, this.onMarkerMouseout);
    this.globe.setMarkers(markers);
    this.mount.appendChild(this.globe.getRendererDomElement());
    this.globe.render();
  };

  React3DGlobe.prototype.cleanup = function cleanup() {
    if (this.globe) {
      this.globe.stop();
      this.mount.removeChild(this.globe.getRendererDomElement());
    }
  };

  React3DGlobe.prototype.componentWillUnmount = function componentWillUnmount() {
    this.globe.stop();
    this.mount.removeChild(this.globe.getRendererDomElement());
  };

  React3DGlobe.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      {
        style: {
          height: '100%',
          width: '100%'
        },
        ref: function ref(mount) {
          _this2.mount = mount;
        } },
      React.createElement(ResizeSensor, { onResize: this.onResize })
    );
  };

  return React3DGlobe;
}(React.PureComponent);

React3DGlobe.defaultProps = {
  disableUnfocus: false,
  markers: [],
  options: options,
  globeTexture: textures.globe,
  spaceTexture: textures.space,
  cloudTexture: textures.space
};

var getDefaultOptions = function getDefaultOptions() {
  return options;
};

exports.default = React3DGlobe;
exports.getDefaultOptions = getDefaultOptions;
