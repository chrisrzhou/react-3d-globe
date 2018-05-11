import React from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

import Globe from './lib/Globe';
import * as options from './lib/options';

import globeTexture from './textures/globe.jpg';
import backgroundTexture from './textures/background.jpg';

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
    globeTexture,
    backgroundTexture,
  };

  componentDidMount() {
    const {radius, markers, globeTexture, backgroundTexture} = this.props;
    this.renderGlobe(radius, markers, globeTexture, backgroundTexture);
  }

  componentDidUpdate() {
    this.cleanup();
    const {radius, globeTexture, backgroundTexture, markers} = this.props;
    this.renderGlobe(radius, markers, globeTexture, backgroundTexture);
  }

  renderGlobe(radius, markers, globeTexture, backgroundTexture) {
    this.globe = new Globe(radius, globeTexture, backgroundTexture, options);
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
