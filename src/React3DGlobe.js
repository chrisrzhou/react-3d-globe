import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

import Globe from './lib/Globe';
import * as options from './lib/options';

export default class React3DGlobe extends React.Component {
  static defaultProps = {
    radius: 600,
    markers: [
      {
        lat: 37.7576948,
        long: -122.4726193,
        value: 1000,
      },
    ],
    options,
    textureUrl:
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57735/land_ocean_ice_cloud_2048.jpg',
  };

  componentDidMount() {
    const {radius, markers, textureUrl} = this.props;
    this.renderGlobe(radius, markers, textureUrl);
  }

  componentDidUpdate() {
    this.cleanup();
    const {radius, textureUrl, markers} = this.props;
    this.renderGlobe(radius, markers, textureUrl);
  }

  renderGlobe(radius, markers, textureUrl) {
    this.globe = new Globe(radius, textureUrl, options);
    this.globe.addMarkers(markers);
    this.mount.appendChild(this.globe.renderer.domElement);
    this.globe.render();
  }

  cleanup() {
    if (this.globe) {
      this.globe.stop();
      this.mount.removeChild(this.globe.renderer.domElement);
    }
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
