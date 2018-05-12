import React from 'react';
import ReactResizeDetector from 'react-resize-detector';

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

  getSnapshotBeforeUpdate(prevProps, prevState) {
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

  onMarkerClick = marker => {};

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
        style={{height: '100%', width: '100%'}}
        ref={mount => {
          this.mount = mount;
        }}>
        <ReactResizeDetector
          handleHeight
          handleWidth
          onResize={this.onResize}
        />
      </div>
    );
  }

  onResize = (width, height) => {
    // do not resize if change is small
    console.log(width, height);
    this.setState(prevState => {
      if (
        (!this.props.width && Math.abs(prevState.width - width) > 10) ||
        (!this.props.height && Math.abs(prevState.height - height) > 10)
      ) {
        return {
          height,
          width,
        };
      }
    });
  };
}
