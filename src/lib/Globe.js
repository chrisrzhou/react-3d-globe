import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import {latLongToVector} from './projections';
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
  constructor(radius, textureUrl) {
    this.radius = radius || 600;
    this.textureUrl =
      textureUrl ||
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
    loader.load(textureUrl, texture => {
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

    this.markers = new THREE.Group();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  onClick() {
    event.preventDefault();
    const canvas = this.renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    this.mouse.x = (event.pageX - rect.left - window.scrollX) / canvas.clientWidth * 2 - 1;
    this.mouse.y = -(event.pageY - rect.top - window.scrollY) / canvas.clientHeight * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.markers.children);
    if (intersects.length > 0) {
      intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    }
  }

  addMarkers(markers) {
    const cubeMat = new THREE.MeshLambertMaterial({
      color: 0x000000,
      opacity: 0.6,
      emissive: 0xffffff,
    });
    markers.forEach(marker => {
      const position = latLongToVector(marker.lat, marker.long, 600, 2);
      let cube = new THREE.Mesh(
        new THREE.CubeGeometry(50, 50, 1 + marker.value / 8, 1, 1, 1, cubeMat),
      );
      cube.position.set(position.x, position.y, position.z);
      cube.lookAt(new THREE.Vector3(0, 0, 0));
      this.markers.add(cube);
    });

    this.scene.add(this.markers);
  }

  render() {
    this.controls.update();
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
