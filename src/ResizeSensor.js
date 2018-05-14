import React from 'react';

export default class ResizeSensor extends React.PureComponent {
  render() {
    return (
      <iframe
        ref="sensorIframe"
        ref={ref => {
          this.ref = ref;
        }}
        style={{
          border: 'none',
          background: 'transparent',
          height: '100%',
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: -1,
        }}
      />
    );
  }

  componentDidMount() {
    this.ref.contentWindow.addEventListener('resize', this._handleResize);
  }

  componentWillUnmount() {
    this.ref.contentWindow.removeEventListener('resize', this._handleResize);
  }

  _handleResize = () => {
    window.requestAnimationFrame(this.props.onResize);
  };
}
