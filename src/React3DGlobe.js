import React from 'react';

import ResizeSensor from './ResizeSensor';
import Globe from './lib/Globe';
import options from './defaults/options';
import textures from './defaults/textures';

const MIN_HEIGHT = 600;
const MIN_WIDTH = 600;

export default class React3DGlobe extends React.Component {
  static defaultProps = {
    markers: [],
    options,
    globeTexture: textures.globe,
    globeGlowTexture: textures.globeGlow,
    spaceTexture: textures.space,
  };

  state = {
    height: MIN_HEIGHT,
    width: MIN_WIDTH,
  };

  componentDidMount() {
    this.renderGlobe();
    this.setState({
      height: this.props.height || this.mount.clientHeight,
      width: this.props.width || this.mount.clientWidth,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {height, width} = this.state;
    if (prevProps !== this.props) {
      this.cleanup();
      this.renderGlobe();
    }
    if (this.state !== prevState) {
      this.globe.updateSize(width, height);
    }
    return;
  }

  onMarkerClick = marker => {
    console.log(marker);
  };

  onMouseoverMarker = marker => {
    console.log(marker);
  };

  renderGlobe() {
    const {
      options,
      globeTexture,
      globeGlowTexture,
      spaceTexture,
      markers,
    } = this.props;
    // compute height and width with priority: props > parent > minValues
    const {height, width} = this.state;
    const textures = {
      globe: globeTexture,
      globeGlow: globeGlowTexture,
      space: spaceTexture,
    };
    this.globe = new Globe(
      width,
      height,
      options,
      textures,
      this.onMarkerClick,
      this.onMouseoverMarker,
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
        style={{position: 'absolute', height: '100%', width: '100%'}}
        ref={mount => {
          this.mount = mount;
        }}>
        <ResizeSensor onResize={this.onResize} />
      </div>
    );
  }

  onResize = () => {
    // if neither width nor height is provided via props
    if (!this.props.width) {
      this.setState({
        width: this.mount.clientWidth,
      });
    }
    if (!this.props.height) {
      this.setState({
        height: this.mount.clientHeight,
      });
    }
  };
}
