import React from 'react';

import Globe from './lib/Globe';
import options from './defaults/options';
import textures from './defaults/textures';

console.log(textures.globeGlow);
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
    globeTexture: textures.globe,
    globeGlowTexture: textures.globeGlow,
    spaceTexture: textures.space,
  };

  componentDidMount() {
    this.renderGlobe();
  }

  componentDidUpdate() {
    this.cleanup();
    this.renderGlobe();
  }

  onMarkerClick = marker => {
    console.log(marker);
  };

  renderGlobe() {
    const {
      options,
      globeTexture,
      globeGlowTexture,
      spaceTexture,
      radius,
      markers,
    } = this.props;
    const textures = {
      globe: globeTexture,
      globeGlow: globeGlowTexture,
      space: spaceTexture,
    };
    this.globe = new Globe(options, textures, radius, this.onMarkerClick);
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
