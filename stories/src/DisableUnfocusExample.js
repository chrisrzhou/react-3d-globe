import React from 'react';
import {Flex, Button} from 'rebass';

import DefaultGlobe from './DefaultGlobe';

export default class DisableUnfocusExample extends React.PureComponent {
  state = {
    disableUnfocus: null,
  };

  render() {
    const {markers} = this.props;
    const {disableUnfocus} = this.state;
    return (
      <div style={{position: 'relative', height: '100%', width: '100%'}}>
        <div style={{height: '100%', width: '100%'}}>
          <DefaultGlobe
            disableUnfocus={disableUnfocus}
            markers={markers}
            onMarkerClick={this.handleMarkerClick}
          />
        </div>
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            bottom: 0,
            fontSize: 12,
            padding: 8,
            position: 'absolute',
            right: 0,
            top: 0,
            width: 200,
          }}>
          <Flex direction="column">
            <Button
              children="Back to Globe"
              disabled={!disableUnfocus}
              onClick={this.handleUnfocus}
            />
          </Flex>
        </div>
      </div>
    );
  }

  handleMarkerClick = (mouseEvent, clickedMarker) => {
    this.setState({disableUnfocus: true});
  };

  handleUnfocus = () => {
    this.setState({disableUnfocus: false});
  };
}
