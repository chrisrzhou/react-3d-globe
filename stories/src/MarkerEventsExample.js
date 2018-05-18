import React from 'react';

import DefaultGlobe from './DefaultGlobe';
import GlobeOverlay from './GlobeOverlay';

export default class MarkerEventsExample extends React.PureComponent {
  state = {
    clickedMarker: null,
    hoveredMarker: null,
    mouseEvent: null,
  };

  render() {
    const {markers} = this.props;
    const {clickedMarker, hoveredMarker, mouseEvent} = this.state;
    return (
      <GlobeOverlay
        globe={
          <DefaultGlobe
            markers={markers}
            onMarkerMouseover={this.handleMarkerMouseover}
            onMarkerMouseout={this.handleMarkerMouseout}
            onMarkerClick={this.handleMarkerClick}
          />
        }
        overlayContents={
          <div>
            <p>
              <b>Clicked Marker: </b>
            </p>
            <pre>{JSON.stringify(clickedMarker, null, 2)}</pre>
            <p>
              <b>Hovered Marker: </b>
            </p>
            <pre>{JSON.stringify(hoveredMarker, null, 2)}</pre>
            <p>
              <b>Mouse Event (x, y): </b>
            </p>
            <pre>
              {mouseEvent ? `x: ${mouseEvent.x}, y: ${mouseEvent.y}` : 'null'}
            </pre>
          </div>
        }
      />
    );
  }

  handleMarkerMouseover = (mouseEvent, hoveredMarker) => {
    this.setState({hoveredMarker, mouseEvent});
  };

  handleMarkerMouseout = mouseEvent => {
    this.setState({hoveredMarker: null, mouseEvent});
  };

  handleMarkerClick = (mouseEvent, clickedMarker) => {
    this.setState({clickedMarker, mouseEvent});
  };
}
