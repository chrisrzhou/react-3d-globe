import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

import Globe from './lib/Globe';

export default class React3DGlobe extends React.Component {
  static defaultProps = {
    radius: 600,
    textureUrl:
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57735/land_ocean_ice_cloud_2048.jpg',
  };

  componentDidMount() {
    this._start();
  }

  componentWillUnmount() {
    this._stop();
    this.mount.removeChild(this.globe.renderer.domElement);
  }

  componentDidUpdate() {
    this.mount.removeChild(this.globe.renderer.domElement);
    this._start();
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
    const {radius, textureUrl} = this.props;
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this._update);
    }
    this.globe = new Globe(radius, textureUrl);
    this.mount.appendChild(this.globe.renderer.domElement);
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
