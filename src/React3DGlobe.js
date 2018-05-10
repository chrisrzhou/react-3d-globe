import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

import Globe from './lib/Globe';

export default class React3DGlobe extends React.Component {
  static defaultProps = {
    radius: 600,
    textureURL:
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57735/land_ocean_ice_cloud_2048.jpg',
  };

  componentDidMount() {
    const {radius, textureURL} = this.props;
    this.globe = new Globe(radius, textureURL);
    this.mount.appendChild(this.globe.renderer.domElement);
    this._start();
  }

  componentWillUnmount() {
    this._stop();
    this.mount.removeChild(this.globe.renderer.domElement);
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
    this.globe.controls.update();
    this.globe.renderer.render(this.globe.scene, this.globe.camera);
    this.frameId = window.requestAnimationFrame(this._update);
  };
}
