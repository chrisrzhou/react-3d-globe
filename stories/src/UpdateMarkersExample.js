import React from 'react';
import {Flex, Button, Text} from 'rebass';

import DefaultGlobe from './DefaultGlobe';
import GlobeOverlay from './GlobeOverlay';
import {getMockData} from './../src/mockData';

const barMarkers = getMockData(0xfc64ba, 'bar');

const getRandomValue = () => {
  // favor lower values
  return Math.floor(Math.random() * 10) > 8
    ? Math.floor(Math.random() * 10000)
    : Math.floor(Math.random() * 200);
};

export default class UpdateMarkersExample extends React.PureComponent {
  state = {
    markers: barMarkers,
  };

  render() {
    const {markers} = this.state;
    return (
      <GlobeOverlay
        globe={<DefaultGlobe markers={markers} />}
        overlayContents={
          <Flex direction="column">
            <Button
              children="Update Markers"
              onClick={this.handleUpdateMarkers}
            />
          </Flex>
        }
      />
    );
  }

  handleUpdateMarkers = () => {
    const markers = this.state.markers.map(marker => ({
      ...marker,
      value: getRandomValue(),
    }));
    this.setState({markers});
  };
}
