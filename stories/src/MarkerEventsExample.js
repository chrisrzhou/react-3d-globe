import React from 'react';

import DefaultGlobe from './DefaultGlobe';

export default class MarkerEventsExample extends React.PureComponent {
  state = {
    clickedMarker: null,
    hoveredMarker: null,
  };

  render() {
    const {markers} = this.props;
    const {clickedMarker, hoveredMarker} = this.state;
    return (
      <div style={{position: 'relative', height: 600}}>
        <DefaultGlobe
          markers={markers}
          onMarkerMouseover={this.handleMarkerMouseover}
          onMarkerClick={this.handleMarkerClick}
        />
        <div
          style={{
            background: 'white',
            bottom: 0,
            fontSize: 12,
            opacity: 0.7,
            padding: 8,
            position: 'absolute',
            right: 0,
            top: 0,
            width: 200,
          }}>
          <p>
            <b>Clicked Marker: </b>
            <pre>{JSON.stringify(clickedMarker, null, 2)}</pre>
          </p>
          <p>
            <b>Hovered Marker: </b>
            <pre>{JSON.stringify(hoveredMarker, null, 2)}</pre>
          </p>
        </div>
      </div>
    );
  }

  handleMarkerMouseover = hoveredMarker => {
    this.setState({hoveredMarker});
  };

  handleMarkerClick = clickedMarker => {
    this.setState({clickedMarker});
  };
}
