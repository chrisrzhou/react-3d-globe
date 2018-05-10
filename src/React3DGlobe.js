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
    this.globe.addMarkers([
      {
        lat: 37.7541438,
        long: -122.4830205,
        value: 10,
      },
      {
        lat: 40.7062599,
        long: -74.2115742,
        value: 10,
      },
    ]);
    this.globe.render();
    this.mount.appendChild(this.globe.renderer.domElement);
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
