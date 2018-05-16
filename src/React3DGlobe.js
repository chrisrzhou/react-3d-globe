import React from 'react';

import ResizeSensor from './ResizeSensor';
import Globe from './lib/Globe';
import options from './defaults/options';
import textures from './defaults/textures';

const MIN_HEIGHT = 600;
const MIN_WIDTH = 600;

export default class React3DGlobe extends React.PureComponent {
  static defaultProps = {
    disableUnfocus: false,
    markers: [],
    options,
    globeTexture: textures.globe,
    spaceTexture: textures.space,
    cloudTexture: textures.space,
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
    if (this.props.disableUnfocus !== prevProps.disableUnfocus) {
      this.globe.setDisableUnfocus(this.props.disableUnfocus);
    }
    if (this.props.markers !== prevProps.markers) {
      this.globe.setMarkers(this.props.markers);
    }
    if (this.state !== prevState) {
      this.globe.updateSize(width, height);
    }
    return;
  }

  onMarkerClick = (event, marker) => {
    this.props.onMarkerClick && this.props.onMarkerClick(event, marker);
  };

  onMarkerMouseover = (event, marker) => {
    this.props.onMarkerMouseover && this.props.onMarkerMouseover(event, marker);
  };

  onMarkerMouseout = event => {
    this.props.onMarkerMouseout && this.props.onMarkerMouseout(event);
  };

  renderGlobe() {
    const {
      disableUnfocus,
      options,
      globeTexture,
      spaceTexture,
      cloudTexture,
      markers,
    } = this.props;
    // compute height and width with priority: props > parent > minValues
    const {height, width} = this.state;
    const textures = {
      globe: globeTexture,
      space: spaceTexture,
      cloud: cloudTexture,
    };
    this.globe = new Globe(
      width,
      height,
      options,
      textures,
      disableUnfocus,
      this.onMarkerClick,
      this.onMarkerMouseover,
      this.onMarkerMouseout,
    );
    this.globe.setMarkers(markers);
    this.mount.appendChild(this.globe.getRendererDomElement());
    this.globe.render();
  }

  cleanup() {
    if (this.globe) {
      this.globe.stop();
      this.mount.removeChild(this.globe.getRendererDomElement());
    }
  }

  componentWillUnmount() {
    this.globe.stop();
    this.mount.removeChild(this.globe.getRendererDomElement());
  }

  render() {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
        }}
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
