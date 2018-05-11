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
        id: 1,
        lat: 37.7576948,
        long: -122.4726193,
        value: 1000,
      },
      {
        id: 2,
        lat: 40.6971494,
        long: -74.2598621,
        value: 2000,
      },
    ],
    options,
    globeTexture,
    backgroundTexture,
  };

  componentDidMount() {
    const {radius, markers, globeTexture, backgroundTexture, options} = this.props;
    this.renderGlobe(radius, markers, globeTexture, backgroundTexture, options);
  }

  componentDidUpdate() {
    this.cleanup();
    const {radius, markers, globeTexture, backgroundTexture, options} = this.props;
    this.renderGlobe(radius, markers, globeTexture, backgroundTexture, options);
  }

  onMarkerClick(marker) {
    console.log(marker);
    this.globe.focus(marker.lat, marker.long);
  }

  renderGlobe(radius, markers, globeTexture, backgroundTexture, options) {
    this.globe = new Globe(
      radius,
      this.onMarkerClick.bind(this),
      globeTexture,
      backgroundTexture,
      options,
    );
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
