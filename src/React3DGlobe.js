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
    const {radius, textureUrl} = this.props;
    this.globe = new Globe(radius, textureUrl);
    this.mount.appendChild(this.globe.renderer.domElement);
    this.globe.render();
  }

  componentDidUpdate() {
    const {radius, textureUrl} = this.props;
    this.globe.stop();
    this.mount.removeChild(this.globe.renderer.domElement);
    this.globe = new Globe(radius, textureUrl);
    this.mount.appendChild(this.globe.renderer.domElement);
    this.globe.render();
  }

  componentWillUnmount() {
    this.globe.stop();
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
}
