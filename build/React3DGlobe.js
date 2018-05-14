'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _threeOrbitcontrols = require('three-orbitcontrols');

var _threeOrbitcontrols2 = _interopRequireDefault(_threeOrbitcontrols);

var _Globe = require('./lib/Globe');

var _Globe2 = _interopRequireDefault(_Globe);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React3DGlobe = function (_React$Component) {
  _inherits(React3DGlobe, _React$Component);

  function React3DGlobe() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, React3DGlobe);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = React3DGlobe.__proto__ || Object.getPrototypeOf(React3DGlobe)).call.apply(_ref, [this].concat(args))), _this), _this._start = function () {
      if (!_this.frameId) {
        _this.frameId = requestAnimationFrame(_this._update);
      }
    }, _this._stop = function () {
      cancelAnimationFrame(_this.frameId);
    }, _this._update = function () {
      _this.controls.update();
      _this.renderer.render(_this.scene, _this.camera);
      _this.frameId = window.requestAnimationFrame(_this._update);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(React3DGlobe, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          radius = _props.radius,
          textureURL = _props.textureURL,
          cameraOptions = _props.cameraOptions,
          controlsOptions = _props.controlsOptions,
          globeOptions = _props.globeOptions,
          pointLightOptions = _props.pointLightOptions,
          rendererOptions = _props.rendererOptions,
          sceneOptions = _props.sceneOptions;

      // create point light

      var pointLight = new THREE.PointLight(pointLightOptions.color);
      pointLight.position.set(pointLightOptions.positionX, pointLightOptions.positionY, pointLightOptions.positionZ);

      // create camera
      var cameraDistance = radius * cameraOptions.radiusScale;
      var camera = new THREE.PerspectiveCamera(cameraOptions.fieldOfView, 1, cameraOptions.near, cameraDistance);
      camera.position.set(cameraOptions.positionX, cameraOptions.positionY, cameraDistance);
      camera.add(pointLight);

      // create controls
      var controls = new _threeOrbitcontrols2.default(camera);
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
      var globe = new THREE.Group();
      var loader = new THREE.TextureLoader();
      loader.load(textureURL, function (texture) {
        var sphere = new THREE.SphereGeometry(radius, globeOptions.segments, globeOptions.rings);
        var material = new THREE.MeshPhongMaterial({
          map: texture
        });
        var mesh = new THREE.Mesh(sphere, material);
        globe.add(mesh);
      });
      globe.position.z = globeOptions.positionZ;

      // create scene
      var scene = new THREE.Scene();
      scene.background = new THREE.Color(sceneOptions.backgroundColor);
      scene.add(globe);
      scene.add(camera);

      // create renderer
      var renderer = new THREE.WebGLRenderer(rendererOptions);
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
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._stop();
      this.mount.removeChild(this.renderer.domElement);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', {
        ref: function ref(mount) {
          _this2.mount = mount;
        }
      });
    }
  }]);

  return React3DGlobe;
}(_react2.default.Component);

React3DGlobe.defaultProps = {
  radius: 600,
  textureURL: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57735/land_ocean_ice_cloud_2048.jpg',
  cameraOptions: {
    fieldOfView: 50,
    near: 1,
    positionX: 0,
    positionY: 0,
    radiusScale: 3
  },
  controlsOptions: {
    autoRotate: true,
    autoRotateSpeed: 0.2,
    enablePan: false,
    rotateSpeed: 0.4,
    enableDamping: true,
    enableZoom: true,
    dampingFactor: 0.8,
    zoomSpeed: 1
  },
  globeOptions: {
    segments: 50,
    rings: 50,
    rotationSpeed: 0.001,
    positionZ: 0
  },
  pointLightOptions: {
    color: 0xffffff,
    positionX: 0,
    positionY: 0,
    positionZ: 0
  },
  rendererOptions: {
    antialias: true
  },
  sceneOptions: {
    backgroundColor: null
  }
};
exports.default = React3DGlobe;