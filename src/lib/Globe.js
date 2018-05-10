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
    this.frameId = null;
  }

  addMarkers(markers) {
    // the geometry that will contain all our cubes
    const geom = new THREE.Geometry();
    const cubeMat = new THREE.MeshLambertMaterial({
      color: 0x000000,
      opacity: 0.6,
      emissive: 0xffffff,
    });
    markers.forEach(marker => {
      const position = latLongToVector(marker.lat, marker.long, 600, 2);
      let cube = new THREE.Mesh(
        new THREE.CubeGeometry(5, 5, 1 + marker.value / 8, 1, 1, 1, cubeMat),
      );
      cube.position.set(position);
      cube.lookAt(new THREE.Vector3(0, 0, 0));
      THREE.GeometryUtils.merge(geom, cube);
    });

    // create a new mesh, containing all the other meshes.
    const total = new THREE.Mesh(geom, new THREE.MeshFaceMaterial());
    this.scene.add(total);
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
