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
    textureUrl:
      'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57735/land_ocean_ice_cloud_2048.jpg',
  };

  componentDidMount() {
    const {radius, markers, textureUrl, options} = this.props;
    this.renderGlobe(radius, markers, textureUrl, options);
  }

  componentDidUpdate() {
    this.cleanup();
    const {radius, textureUrl, markers, options} = this.props;
    this.renderGlobe(radius, markers, textureUrl, options);
  }

  onMarkerClick(marker) {
    console.log(marker);
    this.globe.focus(marker.lat, marker.long);
  }

  renderGlobe(radius, markers, textureUrl, options) {
    options.onMarkerClick = this.onMarkerClick.bind(this);
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
